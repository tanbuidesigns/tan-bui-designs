import { WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES, type WebmasterAnalysisBriefV1 } from "./domain.ts";
import { byteLength } from "./formatting.ts";

const TRUNCATION_NOTICE = "Optional row detail was reduced to keep this JSON within the 96 KiB safety limit; aggregate metrics remain included.";

function reducedBrief(brief: WebmasterAnalysisBriefV1, count: number): WebmasterAnalysisBriefV1 {
  return { ...brief, technicalPerformance: brief.technicalPerformance.slice(0, count), pagePerformance: { ...brief.pagePerformance, rows: brief.pagePerformance.rows.slice(0, count) }, devicePerformance: { ...brief.devicePerformance, rows: brief.devicePerformance.rows.slice(0, count) }, recordedChanges: brief.recordedChanges.slice(0, count), actionEvidence: brief.actionEvidence.slice(0, count), evidenceReferences: brief.evidenceReferences.slice(0, count), dataQuality: [...brief.dataQuality, TRUNCATION_NOTICE], limitations: [...brief.limitations, TRUNCATION_NOTICE] };
}

export function formatBriefJson(brief: WebmasterAnalysisBriefV1): string {
  let json = `${JSON.stringify(brief, null, 2)}\n`;
  if (byteLength(json) <= WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES) return json;
  for (const count of [10, 5, 2, 0]) {
    json = `${JSON.stringify(reducedBrief(brief, count), null, 2)}\n`;
    if (byteLength(json) <= WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES) return json;
  }
  throw new Error("brief_json_aggregates_too_large");
}
