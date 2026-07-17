import "server-only";

import { getPerformanceTargetById } from "@/lib/control-room/performance/targets";
import type {
  IntegrationDescriptor,
  IntegrationErrorKind,
  LabPerformanceRequest,
  LighthouseCategory,
  PerformanceStrategy,
  ProviderResult,
  ProviderSourceMetadata,
  LabPerformanceResult,
} from "@/types/control-room";

import type { PerformanceProvider } from "./contracts";
import { getPageSpeedConfiguration } from "./pagespeed-config";
import { parsePageSpeedResponse } from "./pagespeed-response";

const PAGESPEED_ENDPOINT = "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed";
const REQUEST_TIMEOUT_MS = 90_000;
// PageSpeed JSON is normally much smaller; this prevents unbounded parsing on a malformed response.
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024;
const REQUESTED_CATEGORIES: readonly LighthouseCategory[] = ["performance", "accessibility", "best-practices", "seo"];
const APPROVED_HOSTNAMES = new Set(["tanbuidesigns.com", "www.tanbuidesigns.com"]);

function sourceFrom(descriptor: IntegrationDescriptor): ProviderSourceMetadata {
  return {
    integrationId: descriptor.id,
    displayName: descriptor.displayName,
    dataMode: descriptor.dataMode,
    freshness: descriptor.freshness,
  };
}

function safeError(
  descriptor: IntegrationDescriptor,
  kind: IntegrationErrorKind,
  message: string,
  retryable: boolean,
): ProviderResult<LabPerformanceResult> {
  return { status: "error", error: { kind, message }, retryable, source: sourceFrom(descriptor) };
}

function validateTargetUrl(value: string): URL | null {
  try {
    const url = new URL(value);
    const path = url.pathname.toLowerCase();
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      (url.port && url.port !== "443") ||
      url.hash ||
      !APPROVED_HOSTNAMES.has(url.hostname.toLowerCase()) ||
      path === "/control-room" ||
      path.startsWith("/control-room/") ||
      path === "/api" ||
      path.startsWith("/api/") ||
      path === "/keystatic" ||
      path.startsWith("/keystatic/") ||
      path === "/playground" ||
      path.startsWith("/playground/")
    ) return null;
    return url;
  } catch {
    return null;
  }
}

function descriptorForConfiguration(base: IntegrationDescriptor): IntegrationDescriptor {
  const configured = getPageSpeedConfiguration().configured;
  return {
    ...base,
    lifecycleState: configured ? "ready" : "awaiting-configuration",
    dataMode: configured ? "live" : "disconnected",
    configurationState: configured ? "ready" : "missing",
    currentRefreshMode: configured ? "On demand only" : "Unavailable — configuration missing",
    nextTask: configured ? "Run one registered target manually when laboratory evidence is needed." : "Configure PAGESPEED_API_KEY server-side.",
    verificationStatus: configured ? "confirmed" : "requires-verification",
  };
}

async function readBoundedResponse(response: Response): Promise<string | null> {
  const declaredLength = response.headers.get("content-length");
  if (declaredLength) {
    const length = Number(declaredLength);
    if (Number.isFinite(length) && length > MAX_RESPONSE_BYTES) return null;
  }

  if (!response.body) {
    const text = await response.text();
    return new TextEncoder().encode(text).byteLength <= MAX_RESPONSE_BYTES ? text : null;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let received = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_RESPONSE_BYTES) {
      await reader.cancel();
      return null;
    }
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function mapHttpError(descriptor: IntegrationDescriptor, status: number): ProviderResult<LabPerformanceResult> {
  if (status === 400) return safeError(descriptor, "validation", "PageSpeed rejected the registered request.", false);
  if (status === 401) return safeError(descriptor, "authentication", "PageSpeed authentication is not configured correctly.", false);
  if (status === 403) return safeError(descriptor, "authorization", "PageSpeed access, API enablement or key restrictions require review.", false);
  if (status === 408) return safeError(descriptor, "timeout", "PageSpeed timed out before completing the test.", true);
  if (status === 429) return safeError(descriptor, "quota", "PageSpeed quota is temporarily unavailable. Try again later.", true);
  if (status >= 500) return safeError(descriptor, "upstream", "PageSpeed is temporarily unavailable.", true);
  return safeError(descriptor, "upstream", "PageSpeed returned an unsuccessful response.", false);
}

export function createPageSpeedLabProvider(baseDescriptor: IntegrationDescriptor): PerformanceProvider {
  return {
    id: "pagespeed-lab",
    descriptor: baseDescriptor,
    getStatus: () => descriptorForConfiguration(baseDescriptor),
    async loadLabPerformance(request: LabPerformanceRequest): Promise<ProviderResult<LabPerformanceResult>> {
      const descriptor = descriptorForConfiguration(baseDescriptor);
      const target = getPerformanceTargetById(request.targetId);
      if (!target || !target.enabled) return safeError(descriptor, "validation", "Select an enabled registered performance target.", false);

      const strategy: PerformanceStrategy = request.strategy ?? target.defaultStrategy ?? "mobile";
      if (!target.allowedStrategies.includes(strategy)) return safeError(descriptor, "validation", "Select a strategy allowed for this registered target.", false);

      const registeredUrl = validateTargetUrl(target.canonicalUrl);
      if (!registeredUrl) return safeError(descriptor, "validation", "The registered performance target failed the own-domain safety policy.", false);

      const configuration = getPageSpeedConfiguration();
      if (!configuration.configured) {
        return {
          status: "unavailable",
          reason: "The server-only PageSpeed key is not configured.",
          nextRequirement: "Configure PAGESPEED_API_KEY server-side to enable an on-demand laboratory run.",
          source: sourceFrom(descriptor),
        };
      }

      const requestUrl = new URL(PAGESPEED_ENDPOINT);
      requestUrl.searchParams.set("url", registeredUrl.toString());
      requestUrl.searchParams.set("strategy", strategy);
      requestUrl.searchParams.set("locale", "en-GB");
      for (const category of REQUESTED_CATEGORIES) requestUrl.searchParams.append("category", category);
      requestUrl.searchParams.set("key", configuration.apiKey);

      const controller = new AbortController();
      const timeout = windowlessSetTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      try {
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) return mapHttpError(descriptor, response.status);
        if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) {
          return safeError(descriptor, "parsing", "PageSpeed returned an unexpected response format.", true);
        }

        const text = await readBoundedResponse(response);
        if (text === null) return safeError(descriptor, "parsing", "PageSpeed returned more data than can be processed safely.", false);

        let unknownResponse: unknown;
        try {
          unknownResponse = JSON.parse(text) as unknown;
        } catch {
          return safeError(descriptor, "parsing", "PageSpeed returned invalid JSON.", true);
        }

        const parsed = parsePageSpeedResponse(unknownResponse);
        if (!parsed.ok) return safeError(descriptor, parsed.kind, parsed.message, parsed.retryable);
        const finalUrl = validateTargetUrl(parsed.data.finalUrl);
        if (!finalUrl) return safeError(descriptor, "validation", "PageSpeed resolved to a URL outside the approved website targets.", false);

        return {
          status: "success",
          data: {
            targetId: target.id,
            requestedUrl: registeredUrl.toString(),
            finalUrl: finalUrl.toString(),
            redirected: finalUrl.toString() !== registeredUrl.toString(),
            strategy,
            requestedCategories: REQUESTED_CATEGORIES,
            analysisTimestamp: parsed.data.analysisTimestamp,
            providerGeneratedAt: new Date().toISOString(),
            lighthouseVersion: parsed.data.lighthouseVersion,
            categoryScores: parsed.data.categoryScores,
            metrics: parsed.data.metrics,
            diagnostics: parsed.data.diagnostics,
            warnings: parsed.data.warnings,
          },
          source: {
            integrationId: descriptor.id,
            displayName: descriptor.displayName,
            dataMode: "live",
            freshness: {
              state: "current",
              generatedAt: new Date().toISOString(),
              lastSuccessfulUpdate: parsed.data.analysisTimestamp,
              threshold: "One request-time laboratory snapshot",
              explanation: "This result is not persisted and may vary on a later run.",
            },
          },
          warnings: parsed.data.warnings,
        };
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") return safeError(descriptor, "timeout", "PageSpeed did not respond within 90 seconds.", true);
        return safeError(descriptor, "network", "PageSpeed could not be reached from the server.", true);
      } finally {
        clearTimeout(timeout);
      }
    },
  };
}

function windowlessSetTimeout(callback: () => void, milliseconds: number): ReturnType<typeof setTimeout> {
  return setTimeout(callback, milliseconds);
}
