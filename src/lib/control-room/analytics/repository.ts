import type { AnalyticsSnapshot, LeadAttributionRow, ServiceOutcomeRow } from "./domain";

export interface AnalyticsRepository {
  list(limit: number): Promise<readonly AnalyticsSnapshot[]>;
  create(input: AnalyticsSnapshot): Promise<void>;
  leadAttribution(): Promise<{ sources: readonly LeadAttributionRow[]; services: readonly ServiceOutcomeRow[] }>;
}
