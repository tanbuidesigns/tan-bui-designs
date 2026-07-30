import type { AiAnalysisDraft, AiAnalysisRecord, AiAnalysisStatus } from "./domain";

export interface AiAnalysisRepository {
  list(limit: number): Promise<readonly AiAnalysisRecord[]>;
  create(input: { id: string; periodId: "28d" | "90d"; pageEvidenceIncluded: boolean; sourcePacketHash: string; sourcePacketGeneratedAt: string; model: string; draft: AiAnalysisDraft; evidenceReferences: AiAnalysisRecord["evidenceReferences"]; inputTokens: number | null; outputTokens: number | null; createdAt: string }): Promise<void>;
  review(input: { id: string; status: Exclude<AiAnalysisStatus, "draft">; reviewedAt: string }): Promise<boolean>;
}
