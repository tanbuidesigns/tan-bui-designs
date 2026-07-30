import assert from "node:assert/strict";
import test from "node:test";
import { AI_ANALYST_MODEL, parseAiAnalysisDraft } from "./domain.ts";
import { buildAiAnalysisMessages, generateAiAnalysisDraft } from "./service.ts";

const brief = {
  schemaVersion: "webmaster-analysis-brief-v1",
  reportTitle: "Tan Bui Designs — Webmaster Analysis Brief",
  site: "Tan Bui Designs",
  generatedAt: "2026-07-30T12:00:00.000Z",
  reportPeriod: "28d",
  sourcePacketGeneratedAt: "2026-07-30T12:00:00.000Z",
  sourcePacketHash: "a".repeat(64),
  restrictedEvidenceIncluded: false,
  pageLevelEvidenceIncluded: true,
  evidenceCoverage: { latestPageSpeed: "available", previousComparablePageSpeed: "unavailable", searchComparison: "available", pageEvidence: "available", deviceEvidence: "unavailable", changeEvents: "empty", actionEvidence: "empty", warningCount: 0 },
  technicalPerformance: [],
  technicalComparison: null,
  searchPerformance: { current: null, previous: null, deltas: { clicks: null, impressions: null, ctr: null, averagePosition: null } },
  pagePerformance: { state: "available", message: "Bounded returned top-row evidence.", rows: [] },
  devicePerformance: { state: "unavailable", message: "No device evidence.", rows: [] },
  recordedChanges: [],
  actionEvidence: [],
  dataQuality: ["Limited evidence."],
  limitations: ["Limited evidence."],
  evidenceReferences: [{ type: "capture-run", id: "run-1", sensitivity: "internal", label: "Capture run run-1", href: "/control-room/history/run-1", timestamp: null }],
};

const validDraft = { summary: "Evidence is limited and no causal conclusion is supported.", findings: [{ title: "Limited comparison", observation: "The supplied packet has no comparable previous technical run.", confidence: "high", evidenceIds: ["run-1"], limitation: "One bounded capture cannot establish a trend." }], recommendations: [{ title: "Collect a comparable run", rationale: "A follow-up would create a measured comparison.", priority: "medium", successMeasure: "A later equivalent capture is available.", evidenceIds: ["run-1"] }], overallLimitation: "This draft reflects only the supplied bounded evidence." };

test("prompt declares the approval boundary and carries only allowed evidence IDs", () => {
  const messages = buildAiAnalysisMessages(brief);
  assert.match(messages[0].content, /do not claim they are approved/i);
  assert.match(messages[1].content, /run-1/);
  assert.doesNotMatch(messages[1].content, /query_text|credential|email/i);
});

test("generation validates a structured result and records usage", async () => {
  const calls = [];
  const ai = { async run(model, input) { calls.push({ model, input }); return { response: JSON.stringify(validDraft), usage: { prompt_tokens: 120, completion_tokens: 80 } }; } };
  const result = await generateAiAnalysisDraft(ai, brief);
  assert.equal(calls[0].model, AI_ANALYST_MODEL);
  assert.equal(calls[0].input.response_format.type, "json_schema");
  assert.equal(result.draft.recommendations[0].priority, "medium");
  assert.equal(result.inputTokens, 120);
  assert.equal(result.outputTokens, 80);
});

test("unknown evidence references are rejected", () => {
  assert.throws(() => parseAiAnalysisDraft({ ...validDraft, findings: [{ ...validDraft.findings[0], evidenceIds: ["invented-run"] }] }, new Set(["run-1"])), /invalid_ai_analysis/);
});
