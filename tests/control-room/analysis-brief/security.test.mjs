import assert from "node:assert/strict";
import test from "node:test";

import { buildWebmasterAnalysisBrief } from "../../../src/lib/control-room/analysis-brief/core/build-brief.ts";
import { createAnalysisBriefCopyPayloads } from "../../../src/lib/control-room/analysis-brief/core/copy-payloads.ts";
import { RESTRICTED_EVIDENCE_KEYS, assertBriefSafe, containsRestrictedEvidence } from "../../../src/lib/control-room/analysis-brief/core/validation.ts";
import { packetFixture } from "./fixtures.mjs";

test("every documented forbidden key is rejected recursively and fail-closed", async () => {
  for (const key of RESTRICTED_EVIDENCE_KEYS) {
    const packet = packetFixture();
    packet.changeEvents[0].nested = { [key]: "fixture-secret-value" };
    assert.equal(containsRestrictedEvidence(packet), true, key);
    await assert.rejects(() => buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded: true, generatedAt: "2026-07-22T10:00:00.000Z" }), /restricted_evidence_detected/, key);
  }
});

test("camel-case apiKey and restrictedEvidenceIncluded true are rejected", async () => {
  const packet = packetFixture();
  packet.apiKey = "fixture-secret-value";
  await assert.rejects(() => buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded: true, generatedAt: "2026-07-22T10:00:00.000Z" }), /restricted_evidence_detected/);
  const safe = await buildWebmasterAnalysisBrief(packetFixture(), { pageLevelEvidenceIncluded: true, generatedAt: "2026-07-22T10:00:00.000Z" });
  assert.throws(() => assertBriefSafe({ ...safe, restrictedEvidenceIncluded: true }), /restricted_evidence_detected/);
});

test("unsafe evidence text is bounded and removed from every copied payload", async () => {
  const packet = packetFixture();
  packet.changeEvents[0].title = "# [link](javascript:alert(1)) <script> `code` ![image](data:x) C:\\Users\\person\\secret.txt\u0000";
  packet.pageEvidence[0].path = "https://example.com/not-local";
  const brief = await buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded: true, generatedAt: "2026-07-22T10:00:00.000Z" });
  const payloads = createAnalysisBriefCopyPayloads(brief);
  assert.equal(brief.pagePerformance.rows[0].path, "[invalid local path]");
  for (const payload of Object.values(payloads)) {
    assert.doesNotMatch(payload, /C:\\Users/);
    assert.doesNotMatch(payload, /<script>/);
    assert.doesNotMatch(payload, /data:x/);
    assert.doesNotMatch(payload, /fixture-secret-value/);
    assert.doesNotMatch(payload, /https:\/\/example\.com\/not-local/);
  }
});

test("copy payload model contains finalized strings only", async () => {
  const brief = await buildWebmasterAnalysisBrief(packetFixture(), { pageLevelEvidenceIncluded: true, generatedAt: "2026-07-22T10:00:00.000Z" });
  const payloads = createAnalysisBriefCopyPayloads(brief);
  assert.deepEqual(Object.keys(payloads).sort(), ["chatgpt", "json", "markdown"]);
  assert.ok(Object.values(payloads).every((value) => typeof value === "string"));
});
