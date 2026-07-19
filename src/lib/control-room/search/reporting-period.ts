import "server-only";

import type { SearchPeriod, SearchPeriodId } from "@/types/control-room-search";

export const SEARCH_REPORTING_TIMEZONE = "America/Los_Angeles" as const;
export const searchPeriodOptions = [
  { id: "28d", label: "28 days" },
  { id: "90d", label: "90 days" },
] as const satisfies readonly { id: SearchPeriodId; label: string }[];

function pacificCalendarDate(now: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SEARCH_REPORTING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: "year" | "month" | "day") => Number(parts.find((part) => part.type === type)?.value);
  const date = { year: value("year"), month: value("month"), day: value("day") };
  if (!Number.isInteger(date.year) || !Number.isInteger(date.month) || !Number.isInteger(date.day)) {
    throw new Error("The reporting calendar date could not be calculated safely.");
  }
  return date;
}

function isoDateFromUtc(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isSearchPeriodId(value: string): value is SearchPeriodId {
  return value === "28d" || value === "90d";
}

export function resolveSearchPeriod(periodId: SearchPeriodId, now = new Date()): SearchPeriod {
  if (!Number.isFinite(now.getTime())) throw new Error("The reporting clock is invalid.");
  const pacific = pacificCalendarDate(now);
  const pacificToday = new Date(Date.UTC(pacific.year, pacific.month - 1, pacific.day));
  const end = new Date(pacificToday.getTime() - 3 * 86_400_000);
  const length = periodId === "90d" ? 90 : 28;
  const start = new Date(end.getTime() - (length - 1) * 86_400_000);
  const startDate = isoDateFromUtc(start);
  const endDate = isoDateFromUtc(end);
  if (startDate > endDate) throw new Error("The reporting period is invalid.");
  return {
    id: periodId,
    label: periodId === "90d" ? "90 days" : "28 days",
    startDate,
    endDate,
    timezone: SEARCH_REPORTING_TIMEZONE,
    dataState: "final",
    searchType: "web",
  };
}

export function resolvePreviousSearchPeriod(period: SearchPeriod): SearchPeriod {
  const length = period.id === "90d" ? 90 : 28;
  const currentStart = new Date(`${period.startDate}T00:00:00.000Z`);
  if (!Number.isFinite(currentStart.getTime())) throw new Error("The current reporting period is invalid.");
  const end = new Date(currentStart.getTime() - 86_400_000);
  const start = new Date(end.getTime() - (length - 1) * 86_400_000);
  return { ...period, startDate: isoDateFromUtc(start), endDate: isoDateFromUtc(end) };
}
