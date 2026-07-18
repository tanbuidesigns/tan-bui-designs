import "server-only";

import { matchSearchPage } from "@/lib/control-room/search/page-matching";
import type { IntegrationErrorKind } from "@/types/control-room";
import type {
  SearchDailyPoint,
  SearchDevice,
  SearchDeviceRow,
  SearchMetricSet,
  SearchPageRow,
  SearchPeriod,
  SearchQueryRow,
} from "@/types/control-room-search";

type JsonRecord = Record<string, unknown>;
export type ParsedRows<T> = { ok: true; rows: readonly T[]; aggregationType: string | null; warnings: readonly string[] } | { ok: false; kind: IntegrationErrorKind; message: string; retryable: boolean };

function isRecord(value: unknown): value is JsonRecord { return typeof value === "object" && value !== null && !Array.isArray(value); }
function finite(value: unknown): number | null { return typeof value === "number" && Number.isFinite(value) ? value : null; }
function metrics(row: JsonRecord): SearchMetricSet | null {
  const clicks = finite(row.clicks); const impressions = finite(row.impressions); const ctr = finite(row.ctr); const averagePosition = finite(row.position);
  if (clicks === null || clicks < 0 || impressions === null || impressions < 0 || ctr === null || ctr < 0 || ctr > 1 || averagePosition === null || averagePosition < 0) return null;
  return { clicks, impressions, ctr, averagePosition };
}
function root(input: unknown): { rows: readonly unknown[]; aggregationType: string | null } | null {
  if (!isRecord(input)) return null;
  if (input.rows !== undefined && !Array.isArray(input.rows)) return null;
  return { rows: Array.isArray(input.rows) ? input.rows : [], aggregationType: typeof input.responseAggregationType === "string" ? input.responseAggregationType.slice(0, 80) : null };
}
function keys(row: JsonRecord): readonly unknown[] | null { return Array.isArray(row.keys) ? row.keys : row.keys === undefined ? [] : null; }

export function parseSearchTotals(input: unknown): { ok: true; totals: SearchMetricSet | null; aggregationType: string | null } | { ok: false; kind: IntegrationErrorKind; message: string; retryable: boolean } {
  const value = root(input);
  if (!value) return { ok: false, kind: "validation", message: "Search Console returned an unreadable totals response.", retryable: false };
  if (!value.rows.length) return { ok: true, totals: null, aggregationType: value.aggregationType };
  const row = value.rows[0];
  if (!isRecord(row) || (keys(row)?.length ?? -1) !== 0) return { ok: false, kind: "validation", message: "Search Console returned malformed property totals.", retryable: false };
  const totals = metrics(row);
  return totals ? { ok: true, totals, aggregationType: value.aggregationType } : { ok: false, kind: "validation", message: "Search Console returned malformed property totals.", retryable: false };
}

function parseOptionalRows<T>(input: unknown, map: (row: JsonRecord, index: number) => T | null): ParsedRows<T> {
  const value = root(input);
  if (!value) return { ok: false, kind: "validation", message: "Search Console returned an unreadable panel response.", retryable: false };
  const rows: T[] = [];
  let omitted = 0;
  value.rows.forEach((candidate, index) => {
    const parsed = isRecord(candidate) ? map(candidate, index) : null;
    if (parsed) rows.push(parsed); else omitted += 1;
  });
  return { ok: true, rows, aggregationType: value.aggregationType, warnings: omitted ? [`${omitted} malformed row${omitted === 1 ? " was" : "s were"} omitted from this panel.`] : [] };
}

export function parseSearchDaily(input: unknown, period: SearchPeriod): ParsedRows<SearchDailyPoint> {
  return parseOptionalRows(input, (row) => {
    const rowKeys = keys(row); const date = rowKeys?.[0]; const value = metrics(row);
    if (rowKeys?.length !== 1 || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || date < period.startDate || date > period.endDate || !value) return null;
    return { date, metrics: value };
  });
}

export function parseSearchQueries(input: unknown): ParsedRows<SearchQueryRow> {
  return parseOptionalRows(input, (row, index) => {
    const rowKeys = keys(row); const rawQuery = rowKeys?.[0]; const value = metrics(row);
    if (rowKeys?.length !== 1 || typeof rawQuery !== "string" || !value) return null;
    const query = rawQuery.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 180);
    return query ? { query, metrics: value, rankWithinReturnedRows: index + 1 } : null;
  });
}

export function parseSearchPages(input: unknown): ParsedRows<SearchPageRow> {
  return parseOptionalRows(input, (row, index) => {
    const rowKeys = keys(row); const rawPage = rowKeys?.[0]; const value = metrics(row);
    if (rowKeys?.length !== 1 || typeof rawPage !== "string" || !value) return null;
    const page = matchSearchPage(rawPage);
    return page ? { ...page, metrics: value, rankWithinReturnedRows: index + 1 } : null;
  });
}

export function parseSearchDevices(input: unknown): ParsedRows<SearchDeviceRow> {
  const devices = new Set<SearchDevice>(["DESKTOP", "MOBILE", "TABLET"]);
  return parseOptionalRows(input, (row) => {
    const rowKeys = keys(row); const device = rowKeys?.[0]; const value = metrics(row);
    if (rowKeys?.length !== 1 || typeof device !== "string" || !devices.has(device as SearchDevice) || !value) return null;
    return { device: device as SearchDevice, metrics: value };
  });
}
