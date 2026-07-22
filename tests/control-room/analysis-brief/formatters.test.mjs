import assert from "node:assert/strict";
import test from "node:test";

import { buildWebmasterAnalysisBrief } from "../../../src/lib/control-room/analysis-brief/core/build-brief.ts";
import { CHATGPT_ANALYSIS_INSTRUCTION, CHATGPT_ANALYSIS_SEPARATOR, formatChatGPTCopy } from "../../../src/lib/control-room/analysis-brief/core/chatgpt-prompt.ts";
import { createAnalysisBriefCopyPayloads } from "../../../src/lib/control-room/analysis-brief/core/copy-payloads.ts";
import { WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES, WEBMASTER_ANALYSIS_BRIEF_MAX_MARKDOWN_BYTES } from "../../../src/lib/control-room/analysis-brief/core/domain.ts";
import { byteLength } from "../../../src/lib/control-room/analysis-brief/core/formatting.ts";
import { formatBriefJson } from "../../../src/lib/control-room/analysis-brief/core/format-json.ts";
import { formatBriefMarkdown } from "../../../src/lib/control-room/analysis-brief/core/format-markdown.ts";
import { packetFixture } from "./fixtures.mjs";

const build = (packet = packetFixture(), included = true) => buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded: included, generatedAt: "2026-07-22T10:00:00.000Z" });

test("Markdown has fixed section order, LF endings and deterministic bytes", async () => {
  const brief = await build();
  const first = formatBriefMarkdown(brief);
  const second = formatBriefMarkdown(brief);
  assert.equal(first, second);
  assert.equal(first.includes("\r"), false);
  const headings = ["## Report metadata", "## Evidence coverage", "## Technical performance", "## Search performance", "## Page-level Search evidence", "## Device evidence", "## Recorded website changes", "## Existing action evidence", "## Data quality and limitations", "## Evidence index", "## Instructions for analysis"];
  let position = -1;
  for (const heading of headings) { const next = first.indexOf(heading); assert.ok(next > position, heading); position = next; }
  assert.ok(byteLength(first) <= WEBMASTER_ANALYSIS_BRIEF_MAX_MARKDOWN_BYTES);
  assert.match(first, /CTR percentage-point change: 2/);
  assert.match(first, /Comparable deltas: Performance 0\.03, LCP -200 ms, CLS -0\.01/);
});

test("JSON is valid, two-space indented, deterministic and provider-neutral", async () => {
  const brief = await build();
  const first = formatBriefJson(brief);
  assert.equal(first, formatBriefJson(brief));
  assert.match(first, /\n  "schemaVersion"/);
  assert.deepEqual(JSON.parse(first), JSON.parse(JSON.stringify(brief)));
  assert.doesNotMatch(first, /repository|D1Database|provider client/i);
  assert.ok(byteLength(first) <= WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES);
});

test("ChatGPT copy is exactly visible instruction, separator and finalized Markdown", async () => {
  const markdown = formatBriefMarkdown(await build());
  assert.equal(formatChatGPTCopy(markdown), CHATGPT_ANALYSIS_INSTRUCTION + CHATGPT_ANALYSIS_SEPARATOR + markdown);
});

test("disabled page evidence is absent from Markdown, JSON and ChatGPT copy", async () => {
  const packet = packetFixture();
  packet.pageEvidence[0].path = "/unique-disabled-page";
  const payloads = createAnalysisBriefCopyPayloads(await build(packet, false));
  for (const payload of Object.values(payloads)) assert.doesNotMatch(payload, /unique-disabled-page/);
});

test("oversized optional details are reduced deterministically with a visible notice", async () => {
  const packet = packetFixture();
  const large = "x".repeat(2_000);
  packet.changeEvents = Array.from({ length: 20 }, (_, index) => ({ ...packet.changeEvents[index], summary: `${index}-${large}` }));
  packet.actionEvidence = Array.from({ length: 20 }, (_, index) => ({ ...packet.actionEvidence[index], expectedOutcome: `${index}-${large}`, observedOutcome: `${index}-${large}` }));
  const brief = await build(packet);
  const markdown = formatBriefMarkdown(brief);
  const json = formatBriefJson(brief);
  assert.ok(byteLength(markdown) <= WEBMASTER_ANALYSIS_BRIEF_MAX_MARKDOWN_BYTES);
  assert.ok(byteLength(json) <= WEBMASTER_ANALYSIS_BRIEF_MAX_JSON_BYTES);
  assert.match(json, /Optional row detail was reduced/);
  assert.equal(formatBriefJson(brief), json);
  const parsed = JSON.parse(json);
  assert.deepEqual(parsed.searchPerformance, brief.searchPerformance);
});
