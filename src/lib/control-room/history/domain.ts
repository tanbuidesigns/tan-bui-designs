import "server-only";

import type { SearchDailyPoint, SearchDeviceRow, SearchMetricSet, SearchPageRow, SearchPerformanceSnapshot, SearchQueryRow } from "@/types/control-room-search";

export type CaptureSource = "pagespeed" | "search_console";
export type CaptureMode = "single" | "comparison_pair";
export type CaptureStatus = "running" | "complete" | "partial" | "empty" | "failed";
export type PeriodRole = "current" | "previous";
export type EvidenceSensitivity = "internal" | "restricted";

export type CaptureRun = {
  id: string;
  idempotencyKey: string;
  source: CaptureSource;
  captureMode: CaptureMode;
  status: CaptureStatus;
  targetKey: string;
  periodKey: "28d" | "90d" | null;
  startedAt: string;
  completedAt: string | null;
  providerGeneratedAt: string | null;
  requestCount: number;
  successfulRequestCount: number;
  failedRequestCount: number;
  warningCount: number;
  safeErrorCode: string | null;
  schemaVersion: number;
  workerVersionId: string | null;
  workerVersionTag: string | null;
  workerVersionCreatedAt: string | null;
  detailRetentionUntil: string | null;
};

export type CaptureRunDraft = Pick<CaptureRun, "id" | "idempotencyKey" | "source" | "captureMode" | "targetKey" | "periodKey" | "startedAt" | "workerVersionId" | "workerVersionTag" | "workerVersionCreatedAt" | "detailRetentionUntil">;
export type CaptureRunCompletion = Pick<CaptureRun, "id" | "status" | "completedAt" | "providerGeneratedAt" | "requestCount" | "successfulRequestCount" | "failedRequestCount" | "warningCount" | "safeErrorCode" | "detailRetentionUntil">;

export type StoredSearchPeriod = {
  role: PeriodRole;
  snapshot: SearchPerformanceSnapshot;
};

export type ChangeEventInput = {
  id: string;
  occurredAt: string;
  eventType: "deployment" | "technical" | "content" | "seo" | "design" | "analytics" | "security" | "other";
  title: string;
  summary: string;
  affectedPageId: string | null;
  affectedPath: string | null;
  gitCommit: string | null;
  workerVersionId: string | null;
  verificationState: "confirmed" | "inferred" | "requires_verification";
  lifecycleState: "planned" | "implemented" | "deployed" | "reverted" | "corrected";
  supersedesEventId: string | null;
  createdAt: string;
};

export type ActionEvidenceInput = {
  id: string;
  actionId: string;
  changeEventId: string | null;
  baselineRunId: string | null;
  followupRunId: string | null;
  metricFamily: "pagespeed" | "search" | "mixed" | "manual";
  expectedOutcome: string;
  observedOutcome: string;
  evaluationStatus: "pending" | "positive" | "negative" | "mixed" | "inconclusive";
  verificationState: "confirmed" | "inferred" | "requires_verification";
  supersedesEvidenceId: string | null;
  evaluatedAt: string | null;
  createdAt: string;
};

export type HistoryCursor = { startedAt: string; id: string };
export type HistoryPage = { runs: readonly CaptureRun[]; nextCursor: HistoryCursor | null };

export type RunDetail = {
  run: CaptureRun;
  warnings: readonly string[];
  pageSpeed: {
    targetId: string;
    strategy: "mobile" | "desktop";
    auditedUrl: string;
    finalUrl: string | null;
    performanceScore: number | null;
    accessibilityScore: number | null;
    bestPracticesScore: number | null;
    seoScore: number | null;
    fcpMs: number | null;
    lcpMs: number | null;
    clsMilli: number | null;
    tbtMs: number | null;
    speedIndexMs: number | null;
    capturedAt: string;
    diagnostics: readonly { auditId: string; title: string; displayValue: string | null; score: number | null }[];
    previousEquivalent: { runId: string; capturedAt: string; performanceScore: number | null; lcpMs: number | null; clsMilli: number | null } | null;
  } | null;
  searchPeriods: readonly {
    snapshotId: string;
    role: PeriodRole;
    propertyId: string;
    periodId: "28d" | "90d";
    startDate: string;
    endDate: string;
    totals: SearchMetricSet | null;
    states: { total: string; daily: string; query: string; page: string; device: string };
    daily: readonly SearchDailyPoint[];
    queries: readonly SearchQueryRow[];
    pages: readonly SearchPageRow[];
    devices: readonly SearchDeviceRow[];
    capturedAt: string;
  }[];
};

export type EvidenceReference = {
  type: "capture-run" | "change-event" | "action-evidence";
  id: string;
  sensitivity: EvidenceSensitivity;
};

export type ReportingEvidencePacketV1 = {
  schemaVersion: "reporting-evidence-v1";
  generatedAt: string;
  periodId: "28d" | "90d";
  current: { runId: string; startDate: string; endDate: string; totals: SearchMetricSet | null } | null;
  previous: { runId: string; startDate: string; endDate: string; totals: SearchMetricSet | null } | null;
  deltas: { clicks: number | null; impressions: number | null; ctr: number | null; averagePosition: number | null };
  recentPageSpeed: readonly {
    runId: string;
    targetId: string;
    strategy: "mobile" | "desktop";
    capturedAt: string;
    performanceScore: number | null;
    lcpValue: number | null;
    clsValue: number | null;
  }[];
  evidenceReferences: readonly EvidenceReference[];
  limitations: readonly string[];
};

export function metricDelta(current: number | null | undefined, previous: number | null | undefined): number | null {
  return current == null || previous == null ? null : current - previous;
}
