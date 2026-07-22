export const WEBMASTER_ANALYSIS_BRIEF_SCHEMA_VERSION = "webmaster-analysis-brief-v1" as const;
export const WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES = 96 * 1024;
export const WEBMASTER_ANALYSIS_BRIEF_MAX_MARKDOWN_BYTES = 128 * 1024;

export type ReportPeriod = "28d" | "90d";
export type BriefState = "available" | "unavailable" | "empty" | "partial" | "stale" | "not_applicable";
export type SearchMetricSet = { clicks: number; impressions: number; ctr: number; averagePosition: number };
export type EvidenceReference = { type: "capture-run" | "change-event" | "action-evidence"; id: string; sensitivity: "internal" | "restricted" };
export type PageSpeedEvidence = { runId: string; targetId: string; strategy: "mobile" | "desktop"; capturedAt: string; performanceScore: number | null; lcpValue: number | null; clsValue: number | null; lighthouseVersion?: string | null };
export type SearchPeriodEvidence = { runId: string; startDate: string; endDate: string; totals: SearchMetricSet | null };
export type PageEvidence = { path: string; current: SearchMetricSet | null; previous: SearchMetricSet | null; classification: "present_in_both_returned_sets" | "new_among_current_returned_top_rows" | "no_longer_present_in_current_returned_top_rows"; currentRunId: string | null; previousRunId: string | null };
export type DeviceEvidence = { device: "MOBILE" | "DESKTOP" | "TABLET"; current: SearchMetricSet | null; previous: SearchMetricSet | null; currentRunId: string | null; previousRunId: string | null };
export type ChangeEvidence = { id: string; occurredAt: string; type: "deployment" | "technical" | "content" | "seo" | "design" | "analytics" | "security" | "other"; title: string; summary: string; affectedPath: string | null; lifecycleState: "planned" | "implemented" | "deployed" | "reverted" | "corrected"; verificationState: "confirmed" | "inferred" | "requires_verification"; gitCommit: string | null; workerVersionId: string | null };
export type ActionEvidence = { id: string; actionId: string; expectedOutcome: string; observedOutcome: string; evaluationStatus: "pending" | "positive" | "negative" | "mixed" | "inconclusive"; verificationState: "confirmed" | "inferred" | "requires_verification"; baselineRunId: string | null; followupRunId: string | null };

export type ReportingEvidencePacket = {
  schemaVersion: "reporting-evidence-v1";
  generatedAt: string;
  periodId: ReportPeriod;
  current: SearchPeriodEvidence | null;
  previous: SearchPeriodEvidence | null;
  deltas: { clicks: number | null; impressions: number | null; ctr: number | null; averagePosition: number | null };
  recentPageSpeed: readonly PageSpeedEvidence[];
  pageEvidence: readonly PageEvidence[];
  deviceEvidence: readonly DeviceEvidence[];
  changeEvents: readonly ChangeEvidence[];
  actionEvidence: readonly ActionEvidence[];
  evidenceReferences: readonly EvidenceReference[];
  limitations: readonly string[];
};

export type BriefEvidenceReference = EvidenceReference & { label: string; href: string; timestamp: string | null };
export type WebmasterAnalysisBriefV1 = {
  schemaVersion: typeof WEBMASTER_ANALYSIS_BRIEF_SCHEMA_VERSION;
  reportTitle: "Tan Bui Designs — Webmaster Analysis Brief";
  site: "Tan Bui Designs";
  generatedAt: string;
  reportPeriod: ReportPeriod;
  sourcePacketGeneratedAt: string;
  sourcePacketHash: string;
  restrictedEvidenceIncluded: false;
  pageLevelEvidenceIncluded: boolean;
  evidenceCoverage: { latestPageSpeed: BriefState; previousComparablePageSpeed: BriefState; searchComparison: BriefState; pageEvidence: BriefState; deviceEvidence: BriefState; changeEvents: BriefState; actionEvidence: BriefState; warningCount: number };
  technicalPerformance: readonly PageSpeedEvidence[];
  technicalComparison: { currentRunId: string; previousRunId: string; performanceScoreDelta: number | null; lcpValueDelta: number | null; clsValueDelta: number | null } | null;
  searchPerformance: { current: SearchPeriodEvidence | null; previous: SearchPeriodEvidence | null; deltas: ReportingEvidencePacket["deltas"] };
  pagePerformance: { state: BriefState; message: string; rows: readonly PageEvidence[] };
  devicePerformance: { state: BriefState; message: string; rows: readonly DeviceEvidence[] };
  recordedChanges: readonly ChangeEvidence[];
  actionEvidence: readonly ActionEvidence[];
  dataQuality: readonly string[];
  limitations: readonly string[];
  evidenceReferences: readonly BriefEvidenceReference[];
};

export function parseReportPeriod(value: unknown): ReportPeriod {
  if (value === "28d" || value === "90d") return value;
  throw new Error("invalid_report_period");
}
