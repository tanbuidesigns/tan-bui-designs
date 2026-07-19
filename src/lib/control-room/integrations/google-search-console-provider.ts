import "server-only";

import type { IntegrationDescriptor, IntegrationErrorKind, ProviderSourceMetadata } from "@/types/control-room";
import type {
  SearchPanel,
  SearchComparisonProviderResult,
  SearchPerformanceProviderResult,
  SearchPerformanceRequest,
  SearchPerformanceSnapshot,
  SearchQueryId,
} from "@/types/control-room-search";

import type { SearchPerformanceProvider } from "./contracts";
import { getServiceAccountAccessToken } from "./google-service-account-token";
import { getSearchConsoleConfiguration } from "./search-console-config";
import { buildSearchQueryCatalogue, type SearchQueryDefinition } from "./search-console-query-catalogue";
import { parseSearchDaily, parseSearchDevices, parseSearchPages, parseSearchQueries, parseSearchTotals, type ParsedRows } from "./search-console-response";
import { resolvePreviousSearchPeriod, resolveSearchPeriod } from "../search/reporting-period";

const SEARCH_ANALYTICS_BASE = "https://www.googleapis.com/webmasters/v3/sites";
const SEARCH_TIMEOUT_MS = 30_000;
const MAX_SEARCH_RESPONSE_BYTES = 5 * 1024 * 1024;
const LIMITATIONS = [
  "Finalised Search Console data uses Pacific Time and excludes the most recent three calendar days.",
  "Search Console returns top rows and omits some queries for privacy.",
  "Page rows are aggregated by Google-selected canonical page and visible rows may not sum to property totals.",
  "Average position is an aggregate observation, not a fixed rank.",
  "Search Console clicks and analytics sessions use different measurement models.",
] as const;

type QueryFailure = { ok: false; id: SearchQueryId; kind: IntegrationErrorKind; message: string; retryable: boolean };
type QuerySuccess = { ok: true; id: SearchQueryId; data: unknown };
type QueryResult = QueryFailure | QuerySuccess;

function sourceFrom(descriptor: IntegrationDescriptor): ProviderSourceMetadata {
  return { integrationId: descriptor.id, displayName: descriptor.displayName, dataMode: descriptor.dataMode, freshness: descriptor.freshness };
}

function safeError(descriptor: IntegrationDescriptor, kind: IntegrationErrorKind, message: string, retryable: boolean): SearchPerformanceProviderResult {
  return { status: "error", error: { kind, message }, retryable, source: sourceFrom(descriptor) };
}

function comparisonError(descriptor: IntegrationDescriptor, kind: IntegrationErrorKind, message: string, retryable: boolean): SearchComparisonProviderResult {
  return { status: "error", error: { kind, message }, retryable, source: sourceFrom(descriptor) };
}

function descriptorForConfiguration(base: IntegrationDescriptor): IntegrationDescriptor {
  const configuration = getSearchConsoleConfiguration();
  const ready = configuration.status === "ready";
  return {
    ...base,
    lifecycleState: ready ? "ready" : "awaiting-configuration",
    dataMode: ready ? "live" : "disconnected",
    configurationState: ready ? "ready" : "missing",
    currentRefreshMode: ready ? "Manual on-demand reports only" : "Unavailable — configuration missing or invalid",
    nextTask: ready ? "Run one finalised 28-day report when search evidence is needed." : "Complete the registered server-only Search Console configuration.",
    verificationStatus: ready ? "confirmed" : "requires-verification",
  };
}

async function readBoundedResponse(response: Response): Promise<string | null> {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_SEARCH_RESPONSE_BYTES) return null;
  if (!response.body) {
    const text = await response.text();
    return new TextEncoder().encode(text).byteLength <= MAX_SEARCH_RESPONSE_BYTES ? text : null;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_SEARCH_RESPONSE_BYTES) { await reader.cancel(); return null; }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function httpFailure(id: SearchQueryId, status: number): QueryFailure {
  if (status === 400) return { ok: false, id, kind: "validation", message: "Search Console rejected a fixed report request.", retryable: false };
  if (status === 401) return { ok: false, id, kind: "authentication", message: "Search Console could not authenticate the service account.", retryable: false };
  if (status === 403) return { ok: false, id, kind: "authorization", message: "The service account needs Full user access to the registered Search Console property, and the API must be enabled.", retryable: false };
  if (status === 408) return { ok: false, id, kind: "timeout", message: "Search Console timed out before completing this panel.", retryable: true };
  if (status === 429) return { ok: false, id, kind: "quota", message: "Search Console quota is temporarily unavailable.", retryable: true };
  if (status >= 500) return { ok: false, id, kind: "upstream", message: "Search Console is temporarily unavailable.", retryable: true };
  return { ok: false, id, kind: "upstream", message: "Search Console returned an unsuccessful response.", retryable: false };
}

async function runQuery(siteUrl: string, accessToken: string, query: SearchQueryDefinition): Promise<QueryResult> {
  const endpoint = `${SEARCH_ANALYTICS_BASE}/${encodeURIComponent(siteUrl)}/searchAnalytics/query`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), SEARCH_TIMEOUT_MS);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(query.body),
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return httpFailure(query.id, response.status);
    if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) return { ok: false, id: query.id, kind: "parsing", message: "Search Console returned an unexpected response format.", retryable: true };
    const text = await readBoundedResponse(response);
    if (text === null) return { ok: false, id: query.id, kind: "parsing", message: "Search Console returned more data than can be processed safely.", retryable: false };
    try { return { ok: true, id: query.id, data: JSON.parse(text) as unknown }; }
    catch { return { ok: false, id: query.id, kind: "parsing", message: "Search Console returned invalid JSON.", retryable: true }; }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === "AbortError") return { ok: false, id: query.id, kind: "timeout", message: "Search Console did not complete this panel within 30 seconds.", retryable: true };
    return { ok: false, id: query.id, kind: "network", message: "Search Console could not be reached from the server.", retryable: true };
  } finally { clearTimeout(timeout); }
}

function failedPanel(failure: QueryFailure): SearchPanel<never> {
  return { status: failure.kind === "authorization" ? "unavailable" : "error", errorKind: failure.kind, message: failure.message, retryable: failure.retryable };
}

function dataPanel<T>(rows: readonly T[], aggregationType: string | null): SearchPanel<T> {
  return rows.length ? { status: "success", data: rows, responseAggregationType: aggregationType } : { status: "empty", data: [], responseAggregationType: aggregationType, message: "Search Console returned no rows for this panel and period." };
}

async function loadPeriod(
  configuration: Extract<ReturnType<typeof getSearchConsoleConfiguration>, { status: "ready" }>,
  descriptor: IntegrationDescriptor,
  period: ReturnType<typeof resolveSearchPeriod>,
  accessToken: string,
): Promise<SearchPerformanceProviderResult> {
  const catalogue = buildSearchQueryCatalogue(period);
  const settled = await Promise.allSettled(catalogue.map((query) => runQuery(configuration.property.siteUrl, accessToken, query)));
  const results: QueryResult[] = settled.map((result, index) => result.status === "fulfilled" ? result.value : ({ ok: false, id: catalogue[index].id, kind: "unknown", message: "A Search Console panel failed safely.", retryable: false }));
  const byId = (id: SearchQueryId) => results.find((result) => result.id === id) ?? ({ ok: false, id, kind: "unknown", message: "A Search Console panel result is unavailable.", retryable: false } as const);
  const totalsResult = byId("totals");
  if (!totalsResult.ok) return safeError(descriptor, totalsResult.kind, totalsResult.message, totalsResult.retryable);
  const totals = parseSearchTotals(totalsResult.data);
  if (!totals.ok) return safeError(descriptor, totals.kind, totals.message, totals.retryable);
  const warnings: string[] = [];
  let successful = 1;
  const parsePanel = <T>(id: Exclude<SearchQueryId, "totals">, parse: (input: unknown) => ParsedRows<T>): SearchPanel<T> => {
    const result = byId(id);
    if (!result.ok) { warnings.push(`${id}: ${result.message}`); return failedPanel(result) as SearchPanel<T>; }
    const parsed = parse(result.data);
    if (!parsed.ok) { warnings.push(`${id}: ${parsed.message}`); return { status: "error", errorKind: parsed.kind, message: parsed.message, retryable: parsed.retryable }; }
    successful += 1;
    warnings.push(...parsed.warnings.map((warning) => `${id}: ${warning}`));
    return dataPanel(parsed.rows, parsed.aggregationType);
  };
  const daily = parsePanel("daily", (input) => parseSearchDaily(input, period));
  const queries = parsePanel("queries", parseSearchQueries);
  const pages = parsePanel("pages", parseSearchPages);
  const devices = parsePanel("devices", parseSearchDevices);
  const failed = 5 - successful;
  const generatedAt = new Date().toISOString();
  const snapshot: SearchPerformanceSnapshot = {
    property: { id: configuration.property.id, displayLabel: configuration.property.displayLabel, propertyType: configuration.property.propertyType, securityClassification: configuration.property.securityClassification },
    period, totals: totals.totals, daily, queries, pages, devices, totalsAggregationType: totals.aggregationType,
    providerGeneratedAt: generatedAt, requestCount: { requested: 5, successful, failed, partial: failed > 0 },
    warnings: warnings.slice(0, 10), limitations: LIMITATIONS, securityClassification: "internal",
  };
  return { status: "success", data: snapshot, source: { integrationId: descriptor.id, displayName: descriptor.displayName, dataMode: "live", freshness: { state: "current", generatedAt, lastSuccessfulUpdate: generatedAt, threshold: "One request-time finalised report", explanation: "This result is normalized before any approved persistence." } }, warnings: snapshot.warnings };
}

export function createGoogleSearchConsoleProvider(baseDescriptor: IntegrationDescriptor): SearchPerformanceProvider {
  return {
    id: "search-console",
    descriptor: baseDescriptor,
    getStatus: () => descriptorForConfiguration(baseDescriptor),
    async loadSearchPerformance(request: SearchPerformanceRequest): Promise<SearchPerformanceProviderResult> {
      const descriptor = descriptorForConfiguration(baseDescriptor);
      const configuration = getSearchConsoleConfiguration();
      if (configuration.status === "missing") return { status: "unavailable", reason: `Missing server configuration: ${configuration.missingNames.join(", ")}.`, nextRequirement: "Configure the listed Search Console names server-side, then restart the local server.", source: sourceFrom(descriptor) };
      if (configuration.status === "invalid") return safeError(descriptor, "configuration", configuration.reason, false);

      let period;
      try { period = resolveSearchPeriod(request.periodId); }
      catch { return safeError(descriptor, "validation", "The finalised Search Console reporting period could not be calculated safely.", false); }

      const token = await getServiceAccountAccessToken(configuration);
      if (!token.ok) return safeError(descriptor, token.kind, token.message, token.retryable);

      return loadPeriod(configuration, descriptor, period, token.accessToken);
    },
    async loadSearchComparison(request: SearchPerformanceRequest): Promise<SearchComparisonProviderResult> {
      const descriptor = descriptorForConfiguration(baseDescriptor);
      const configuration = getSearchConsoleConfiguration();
      if (configuration.status === "missing") return { status: "unavailable", reason: `Missing server configuration: ${configuration.missingNames.join(", ")}.`, nextRequirement: "Configure the listed Search Console names server-side.", source: sourceFrom(descriptor) };
      if (configuration.status === "invalid") return comparisonError(descriptor, "configuration", configuration.reason, false);
      let currentPeriod;
      try { currentPeriod = resolveSearchPeriod(request.periodId); } catch { return comparisonError(descriptor, "validation", "The comparison periods could not be calculated safely.", false); }
      const previousPeriod = resolvePreviousSearchPeriod(currentPeriod);
      const token = await getServiceAccountAccessToken(configuration);
      if (!token.ok) return comparisonError(descriptor, token.kind, token.message, token.retryable);
      const [current, previous] = await Promise.all([
        loadPeriod(configuration, descriptor, currentPeriod, token.accessToken),
        loadPeriod(configuration, descriptor, previousPeriod, token.accessToken),
      ]);
      if (current.status !== "success") return current;
      if (previous.status !== "success") return previous;
      return { status: "success", data: { current: current.data, previous: previous.data, tokenExchangeCount: 1, searchRequestCount: 10 }, source: current.source, warnings: [...current.warnings, ...previous.warnings].slice(0, 20) };
    },
  };
}
