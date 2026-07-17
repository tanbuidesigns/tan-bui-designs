import "server-only";

import type { SearchPeriod, SearchQueryId } from "@/types/control-room-search";

type SearchAnalyticsBody = {
  startDate: string;
  endDate: string;
  dimensions: readonly ("date" | "query" | "page" | "device")[];
  type: "web";
  aggregationType: "byProperty" | "auto";
  rowLimit: number;
  startRow: 0;
  dataState: "final";
};

export type SearchQueryDefinition = {
  id: SearchQueryId;
  label: string;
  essential: boolean;
  body: SearchAnalyticsBody;
};

export function buildSearchQueryCatalogue(period: SearchPeriod): readonly SearchQueryDefinition[] {
  const shared = {
    startDate: period.startDate,
    endDate: period.endDate,
    type: "web" as const,
    startRow: 0 as const,
    dataState: "final" as const,
  };
  return [
    { id: "totals", label: "Property totals", essential: true, body: { ...shared, dimensions: [], aggregationType: "byProperty", rowLimit: 1 } },
    { id: "daily", label: "Daily trend", essential: false, body: { ...shared, dimensions: ["date"], aggregationType: "byProperty", rowLimit: period.id === "90d" ? 90 : 28 } },
    { id: "queries", label: "Top queries", essential: false, body: { ...shared, dimensions: ["query"], aggregationType: "byProperty", rowLimit: 50 } },
    { id: "pages", label: "Top pages", essential: false, body: { ...shared, dimensions: ["page"], aggregationType: "auto", rowLimit: 50 } },
    { id: "devices", label: "Device breakdown", essential: false, body: { ...shared, dimensions: ["device"], aggregationType: "byProperty", rowLimit: 10 } },
  ];
}
