import { WEBMASTER_ANALYSIS_BRIEF_SCHEMA_VERSION, type ActionEvidence, type ChangeEvidence, type ReportingEvidencePacket, type WebmasterAnalysisBriefV1 } from "./domain.ts";
import { resolveBriefEvidenceLinks } from "./evidence-links.ts";
import { boundedEvidenceText, safeLocalPagePath } from "./formatting.ts";
import { buildLimitations } from "./limitations.ts";
import { assertBriefSafe, assertPacketSafeForAnalysisBrief } from "./validation.ts";

const canonicalJson = (value: unknown) => JSON.stringify(value);
async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
const safeChange = (row: ChangeEvidence): ChangeEvidence => ({ ...row, title: boundedEvidenceText(row.title, 300), summary: boundedEvidenceText(row.summary), affectedPath: row.affectedPath === null ? null : safeLocalPagePath(row.affectedPath), gitCommit: row.gitCommit === null ? null : boundedEvidenceText(row.gitCommit, 12), workerVersionId: row.workerVersionId === null ? null : boundedEvidenceText(row.workerVersionId, 24) });
const safeAction = (row: ActionEvidence): ActionEvidence => ({ ...row, actionId: boundedEvidenceText(row.actionId, 200), expectedOutcome: boundedEvidenceText(row.expectedOutcome), observedOutcome: boundedEvidenceText(row.observedOutcome) });

export async function buildWebmasterAnalysisBrief(packet: ReportingEvidencePacket, options: { pageLevelEvidenceIncluded: boolean; generatedAt: string }): Promise<WebmasterAnalysisBriefV1> {
  assertPacketSafeForAnalysisBrief(packet);
  const sourcePacketHash = await sha256(canonicalJson(packet));
  const hasSearch = packet.current !== null || packet.previous !== null;
  const hasPageSpeed = packet.recentPageSpeed.length > 0;
  const latestPageSpeed = packet.recentPageSpeed[0] ?? null;
  const previousComparablePageSpeed = latestPageSpeed === null ? null : packet.recentPageSpeed.slice(1).find((item) => item.targetId === latestPageSpeed.targetId && item.strategy === latestPageSpeed.strategy) ?? null;
  const delta = (current: number | null, previous: number | null) => current === null || previous === null ? null : current - previous;
  const technicalComparison = latestPageSpeed && previousComparablePageSpeed ? { currentRunId: latestPageSpeed.runId, previousRunId: previousComparablePageSpeed.runId, performanceScoreDelta: delta(latestPageSpeed.performanceScore, previousComparablePageSpeed.performanceScore), lcpValueDelta: delta(latestPageSpeed.lcpValue, previousComparablePageSpeed.lcpValue), clsValueDelta: delta(latestPageSpeed.clsValue, previousComparablePageSpeed.clsValue) } : null;
  const pages = options.pageLevelEvidenceIncluded ? packet.pageEvidence.slice(0, 20).map((row) => ({ ...row, path: safeLocalPagePath(row.path) })) : [];
  const limitations = buildLimitations(packet, options.pageLevelEvidenceIncluded);
  return assertBriefSafe({
    schemaVersion: WEBMASTER_ANALYSIS_BRIEF_SCHEMA_VERSION,
    reportTitle: "Tan Bui Designs — Webmaster Analysis Brief",
    site: "Tan Bui Designs",
    generatedAt: options.generatedAt,
    reportPeriod: packet.periodId,
    sourcePacketGeneratedAt: packet.generatedAt,
    sourcePacketHash,
    restrictedEvidenceIncluded: false,
    pageLevelEvidenceIncluded: options.pageLevelEvidenceIncluded,
    evidenceCoverage: { latestPageSpeed: hasPageSpeed ? "available" : "unavailable", previousComparablePageSpeed: previousComparablePageSpeed ? "available" : "unavailable", searchComparison: hasSearch ? "available" : "unavailable", pageEvidence: options.pageLevelEvidenceIncluded ? pages.length ? "available" : "unavailable" : "not_applicable", deviceEvidence: packet.deviceEvidence.length ? "available" : "unavailable", changeEvents: packet.changeEvents.length ? "available" : "empty", actionEvidence: packet.actionEvidence.length ? "available" : "empty", warningCount: 0 },
    technicalPerformance: packet.recentPageSpeed,
    technicalComparison,
    searchPerformance: { current: packet.current, previous: packet.previous, deltas: packet.deltas },
    pagePerformance: { state: options.pageLevelEvidenceIncluded ? pages.length ? "available" : "unavailable" : "not_applicable", message: options.pageLevelEvidenceIncluded ? pages.length ? "Bounded returned top-row evidence." : "No page-level evidence is available." : "Page-level evidence was excluded by the webmaster.", rows: pages },
    devicePerformance: { state: packet.deviceEvidence.length ? "available" : "unavailable", message: packet.deviceEvidence.length ? "Current and previous device metrics where available." : "No device-level evidence is available.", rows: packet.deviceEvidence.slice(0, 3) },
    recordedChanges: packet.changeEvents.slice(0, 20).map(safeChange),
    actionEvidence: packet.actionEvidence.slice(0, 20).map(safeAction),
    dataQuality: limitations,
    limitations,
    evidenceReferences: resolveBriefEvidenceLinks(packet.evidenceReferences),
  });
}
