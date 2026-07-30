export type AnalyticsSnapshot = {
  id: string; periodStart: string; periodEnd: string; pageViews: number; visits: number;
  lcpP75Ms: number | null; inpP75Ms: number | null; clsP75Milli: number | null; notes: string | null; createdAt: string;
};

export type LeadAttributionRow = { sourcePath: string; status: string; total: number };
export type ServiceOutcomeRow = { service: string; status: string; total: number };
