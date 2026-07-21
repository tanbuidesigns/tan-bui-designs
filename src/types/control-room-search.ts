import type {
  IntegrationErrorKind,
  ProviderResult,
  SecurityClassification,
} from "@/types/control-room";

export type SearchPeriodId = "28d" | "90d";
export type SearchPropertyType = "domain" | "url-prefix";
export type SearchQueryId = "totals" | "daily" | "queries" | "pages" | "devices";
export type SearchDevice = "DESKTOP" | "MOBILE" | "TABLET";

export type SearchConsoleProperty = {
  id: string;
  siteUrl: string;
  displayLabel: string;
  propertyType: SearchPropertyType;
  expectedPublicHosts: readonly string[];
  enabled: boolean;
  securityClassification: "internal";
  accessRequirement: string;
  notes: string;
};

export type SearchPeriod = {
  id: SearchPeriodId;
  label: string;
  startDate: string;
  endDate: string;
  timezone: "America/Los_Angeles";
  dataState: "final";
  searchType: "web";
};

export type SearchMetricSet = {
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
};

export type SearchDailyPoint = { date: string; metrics: SearchMetricSet };
export type SearchQueryRow = { query: string; metrics: SearchMetricSet; rankWithinReturnedRows: number };
export type SearchPageRow = {
  pageUrl: string;
  displayPath: string;
  matchedLocalPageId: string | null;
  matchedLocalPageName: string | null;
  metrics: SearchMetricSet;
  rankWithinReturnedRows: number;
};
export type SearchDeviceRow = { device: SearchDevice; metrics: SearchMetricSet };

export type SearchPanel<T> =
  | { status: "success"; data: readonly T[]; responseAggregationType: string | null }
  | { status: "empty"; data: readonly T[]; responseAggregationType: string | null; message: string }
  | { status: "unavailable" | "error"; errorKind: IntegrationErrorKind; message: string; retryable: boolean };

export type SearchPerformanceSnapshot = {
  property: Pick<SearchConsoleProperty, "id" | "displayLabel" | "propertyType" | "securityClassification">;
  period: SearchPeriod;
  totals: SearchMetricSet | null;
  daily: SearchPanel<SearchDailyPoint>;
  queries: SearchPanel<SearchQueryRow>;
  pages: SearchPanel<SearchPageRow>;
  devices: SearchPanel<SearchDeviceRow>;
  totalsAggregationType: string | null;
  providerGeneratedAt: string;
  requestCount: { requested: 5; successful: number; failed: number; partial: boolean };
  warnings: readonly string[];
  limitations: readonly string[];
  securityClassification: SecurityClassification;
};

export type SearchPerformanceRequest = { periodId: SearchPeriodId };

export type SearchPerformanceProviderResult = ProviderResult<SearchPerformanceSnapshot>;
export type SearchComparisonProviderResult = ProviderResult<{
  current: SearchPerformanceSnapshot;
  previous: SearchPerformanceSnapshot;
  tokenExchangeCount: 1;
  searchRequestCount: 10;
}>;
