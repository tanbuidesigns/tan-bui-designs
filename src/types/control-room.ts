export type ReportingPeriod = {
  label: string;
  startDate: string;
  endDate: string;
  lastRefreshed: string;
};

export type MetricTrend = "up" | "down" | "neutral";

export type ControlRoomMetric = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: MetricTrend;
  description: string;
};

export type Priority = "High" | "Medium" | "Low";

export type RecommendedAction = {
  id: string;
  title: string;
  priority: Priority;
  affectedArea: string;
  reason: string;
  nextStep: string;
};

export type HealthState = "Healthy" | "Needs attention" | "Review" | "Missing";

export type PageHealthRecord = {
  path: string;
  label: string;
  indexability: HealthState;
  metadata: HealthState;
  openGraph: HealthState;
  mobilePerformance: number;
  issues: string;
  status: HealthState;
};

export type PerformanceHistoryEntry = {
  period: string;
  value: number;
};

export type ContentOpportunity = {
  id: string;
  query: string;
  matchingPage: string;
  currentPosition: number | "Not ranked";
  reason: string;
  recommendedAction: string;
  priority: Priority;
};

export type PlannedIntegration = {
  name: string;
  purpose: string;
};
