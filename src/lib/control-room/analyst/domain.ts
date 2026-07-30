export const AI_ANALYST_MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast" as const;
export const AI_ANALYST_PROMPT_VERSION = 1 as const;

export type AiAnalysisStatus = "draft" | "approved" | "rejected";
export type AiAnalysisConfidence = "high" | "medium" | "low";
export type AiAnalysisPriority = "high" | "medium" | "low";

export type AiAnalysisDraft = {
  summary: string;
  findings: readonly {
    title: string;
    observation: string;
    confidence: AiAnalysisConfidence;
    evidenceIds: readonly string[];
    limitation: string;
  }[];
  recommendations: readonly {
    title: string;
    rationale: string;
    priority: AiAnalysisPriority;
    successMeasure: string;
    evidenceIds: readonly string[];
  }[];
  overallLimitation: string;
};

export type AiAnalysisRecord = {
  id: string;
  periodId: "28d" | "90d";
  pageEvidenceIncluded: boolean;
  sourcePacketHash: string;
  sourcePacketGeneratedAt: string;
  provider: "cloudflare-workers-ai";
  model: string;
  promptVersion: 1;
  status: AiAnalysisStatus;
  draft: AiAnalysisDraft;
  evidenceReferences: readonly { type: string; id: string; href: string; label: string }[];
  inputTokens: number | null;
  outputTokens: number | null;
  createdAt: string;
  reviewedAt: string | null;
};

const text = (value: unknown, maximum: number) => typeof value === "string" && value.trim().length > 0 && value.length <= maximum && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value);
const enumValue = <T extends string>(value: unknown, values: readonly T[]): value is T => typeof value === "string" && values.includes(value as T);
const evidenceIds = (value: unknown, allowedEvidenceIds: ReadonlySet<string>) => Array.isArray(value) && value.length <= 8 && value.every((id) => typeof id === "string" && id.length <= 120 && allowedEvidenceIds.has(id));

export function parseAiAnalysisDraft(value: unknown, allowedEvidenceIds: ReadonlySet<string>): AiAnalysisDraft {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid_ai_analysis");
  const draft = value as Record<string, unknown>;
  if (!text(draft.summary, 1200) || !text(draft.overallLimitation, 800) || !Array.isArray(draft.findings) || draft.findings.length > 5 || !Array.isArray(draft.recommendations) || draft.recommendations.length > 5) throw new Error("invalid_ai_analysis");
  const findings = draft.findings.map((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid_ai_analysis");
    const finding = value as Record<string, unknown>;
    if (!text(finding.title, 180) || !text(finding.observation, 900) || !enumValue(finding.confidence, ["high", "medium", "low"] as const) || !evidenceIds(finding.evidenceIds, allowedEvidenceIds) || !text(finding.limitation, 500)) throw new Error("invalid_ai_analysis");
    return { title: finding.title as string, observation: finding.observation as string, confidence: finding.confidence, evidenceIds: finding.evidenceIds as string[], limitation: finding.limitation as string };
  });
  const recommendations = draft.recommendations.map((value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid_ai_analysis");
    const recommendation = value as Record<string, unknown>;
    if (!text(recommendation.title, 180) || !text(recommendation.rationale, 900) || !enumValue(recommendation.priority, ["high", "medium", "low"] as const) || !text(recommendation.successMeasure, 500) || !evidenceIds(recommendation.evidenceIds, allowedEvidenceIds)) throw new Error("invalid_ai_analysis");
    return { title: recommendation.title as string, rationale: recommendation.rationale as string, priority: recommendation.priority, successMeasure: recommendation.successMeasure as string, evidenceIds: recommendation.evidenceIds as string[] };
  });
  return { summary: draft.summary as string, findings, recommendations, overallLimitation: draft.overallLimitation as string };
}

export function isAiAnalysisStatus(value: unknown): value is AiAnalysisStatus {
  return value === "draft" || value === "approved" || value === "rejected";
}

export const AI_ANALYSIS_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string", description: "A cautious overall assessment grounded only in supplied evidence." },
    findings: {
      type: "array",
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          observation: { type: "string" },
          confidence: { type: "string", enum: ["high", "medium", "low"] },
          evidenceIds: { type: "array", maxItems: 8, items: { type: "string" } },
          limitation: { type: "string" },
        },
        required: ["title", "observation", "confidence", "evidenceIds", "limitation"],
      },
    },
    recommendations: {
      type: "array",
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          rationale: { type: "string" },
          priority: { type: "string", enum: ["high", "medium", "low"] },
          successMeasure: { type: "string" },
          evidenceIds: { type: "array", maxItems: 8, items: { type: "string" } },
        },
        required: ["title", "rationale", "priority", "successMeasure", "evidenceIds"],
      },
    },
    overallLimitation: { type: "string" },
  },
  required: ["summary", "findings", "recommendations", "overallLimitation"],
} as const;
