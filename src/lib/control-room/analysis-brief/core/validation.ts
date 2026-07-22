import type { ReportingEvidencePacket, WebmasterAnalysisBriefV1 } from "./domain.ts";

export const RESTRICTED_EVIDENCE_KEYS = Object.freeze([
  "query", "query_text", "normalized_query_hash", "search_query", "email", "user_email",
  "cookie", "authorization", "api_key", "apikey", "password", "credential", "credentials",
  "session", "access_token", "refresh_token",
] as const);

const forbiddenKeys = new Set<string>(RESTRICTED_EVIDENCE_KEYS);

export function containsRestrictedEvidence(value: unknown, key = ""): boolean {
  if (forbiddenKeys.has(key.toLowerCase())) return true;
  if (Array.isArray(value)) return value.some((item) => containsRestrictedEvidence(item));
  return Boolean(value && typeof value === "object" && Object.entries(value).some(([childKey, childValue]) => containsRestrictedEvidence(childValue, childKey)));
}

export function assertPacketSafeForAnalysisBrief<T extends ReportingEvidencePacket>(packet: T): T {
  if (containsRestrictedEvidence(packet)) throw new Error("restricted_evidence_detected");
  return packet;
}

export function assertBriefSafe<T extends WebmasterAnalysisBriefV1>(brief: T): T {
  if (brief.restrictedEvidenceIncluded !== false || containsRestrictedEvidence(brief)) throw new Error("restricted_evidence_detected");
  return brief;
}
