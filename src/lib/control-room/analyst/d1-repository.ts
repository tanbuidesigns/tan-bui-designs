import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import { AI_ANALYST_PROMPT_VERSION, parseAiAnalysisDraft, type AiAnalysisRecord } from "./domain";
import type { AiAnalysisRepository } from "./repository";

type AnalysisRow = { id: string; period_id: "28d" | "90d"; page_evidence_included: number; source_packet_hash: string; source_packet_generated_at: string; provider: "cloudflare-workers-ai"; model: string; prompt_version: 1; status: AiAnalysisRecord["status"]; draft_json: string; evidence_references_json: string; input_tokens: number | null; output_tokens: number | null; created_at: string; reviewed_at: string | null };

export class D1AiAnalysisRepository implements AiAnalysisRepository {
  constructor(private readonly db: D1DatabaseLike) {}

  async list(limit: number): Promise<readonly AiAnalysisRecord[]> {
    const result = await this.db.prepare("SELECT * FROM cr_ai_analyses ORDER BY created_at DESC, id DESC LIMIT ?").bind(Math.max(1, Math.min(20, limit))).all<AnalysisRow>();
    return result.results.map((row) => {
      const references = JSON.parse(row.evidence_references_json) as AiAnalysisRecord["evidenceReferences"];
      return { id: row.id, periodId: row.period_id, pageEvidenceIncluded: row.page_evidence_included === 1, sourcePacketHash: row.source_packet_hash, sourcePacketGeneratedAt: row.source_packet_generated_at, provider: row.provider, model: row.model, promptVersion: row.prompt_version, status: row.status, draft: parseAiAnalysisDraft(JSON.parse(row.draft_json), new Set(references.map((reference) => reference.id))), evidenceReferences: references, inputTokens: row.input_tokens, outputTokens: row.output_tokens, createdAt: row.created_at, reviewedAt: row.reviewed_at };
    });
  }

  async create(input: Parameters<AiAnalysisRepository["create"]>[0]): Promise<void> {
    await this.db.prepare("INSERT INTO cr_ai_analyses(id, period_id, page_evidence_included, source_packet_hash, source_packet_generated_at, provider, model, prompt_version, status, draft_json, evidence_references_json, input_tokens, output_tokens, created_at) VALUES (?, ?, ?, ?, ?, 'cloudflare-workers-ai', ?, ?, 'draft', ?, ?, ?, ?, ?)")
      .bind(input.id, input.periodId, input.pageEvidenceIncluded ? 1 : 0, input.sourcePacketHash, input.sourcePacketGeneratedAt, input.model, AI_ANALYST_PROMPT_VERSION, JSON.stringify(input.draft), JSON.stringify(input.evidenceReferences), input.inputTokens, input.outputTokens, input.createdAt).run();
  }

  async review(input: Parameters<AiAnalysisRepository["review"]>[0]): Promise<boolean> {
    const result = await this.db.prepare("UPDATE cr_ai_analyses SET status = ?, reviewed_at = ? WHERE id = ? AND status = 'draft'").bind(input.status, input.reviewedAt, input.id).run();
    return (result.meta.changes ?? 0) === 1;
  }
}
