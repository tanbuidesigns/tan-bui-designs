import assert from "node:assert/strict";
import test from "node:test";

import { buildWebmasterAnalysisBrief } from "../../../src/lib/control-room/analysis-brief/core/build-brief.ts";
import { parseReportPeriod } from "../../../src/lib/control-room/analysis-brief/core/domain.ts";
import { packetFixture, deepFreeze, metrics } from "./fixtures.mjs";

const generatedAt = "2026-07-22T10:00:00.000Z";
const build = (packet = packetFixture(), pageLevelEvidenceIncluded = true) => buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded, generatedAt });

test("period parsing accepts 28d and 90d and rejects other options", () => {
  assert.equal(parseReportPeriod("28d"), "28d");
  assert.equal(parseReportPeriod("90d"), "90d");
  assert.throws(() => parseReportPeriod("30d"), /invalid_report_period/);
});

test("a fixed packet produces deterministic, JSON-serialisable plain data", async () => {
  const packet = deepFreeze(packetFixture());
  const first = await build(packet);
  const second = await build(packet);
  assert.deepEqual(first, second);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(first.reportPeriod, "28d");
  assert.equal(first.sourcePacketHash.length, 64);
  assert.equal(JSON.stringify(first).includes("[object D1"), false);
  assert.equal(JSON.stringify(first).includes("Date("), false);
});

test("90d is retained from the evidence packet", async () => {
  assert.equal((await build(packetFixture({ periodId: "90d" }))).reportPeriod, "90d");
});

test("page, device, change and action details have deterministic hard bounds", async () => {
  const brief = await build();
  assert.equal(brief.pagePerformance.rows.length, 20);
  assert.equal(brief.pagePerformance.rows[0].path, "/work");
  assert.equal(brief.devicePerformance.rows.length, 3);
  assert.deepEqual(brief.devicePerformance.rows.map((row) => row.device), ["MOBILE", "DESKTOP", "TABLET"]);
  assert.equal(brief.recordedChanges.length, 20);
  assert.equal(brief.recordedChanges[0].title, "Recorded change 0");
  assert.ok((brief.recordedChanges[15].gitCommit?.length ?? 0) <= 12);
  assert.equal(brief.actionEvidence.length, 20);
  assert.equal(brief.actionEvidence[0].expectedOutcome, "Expected measurable outcome 0");
  assert.equal(brief.actionEvidence[0].observedOutcome, "Observed measurement 0");
  assert.equal(brief.actionEvidence[0].evaluationStatus, "inconclusive");
  assert.equal(brief.actionEvidence[0].verificationState, "confirmed");
  assert.equal(brief.actionEvidence[0].baselineRunId, packetFixture().current.runId);
});

test("page evidence exclusion removes rows and records the explicit state", async () => {
  const brief = await build(packetFixture(), false);
  assert.equal(brief.pageLevelEvidenceIncluded, false);
  assert.equal(brief.pagePerformance.state, "not_applicable");
  assert.deepEqual(brief.pagePerformance.rows, []);
  assert.match(brief.pagePerformance.message, /excluded/);
  assert.ok(brief.limitations.some((item) => item.includes("excluded by the webmaster")));
});

test("empty source panels have explicit unavailable and empty states", async () => {
  const brief = await build(packetFixture({ current: null, previous: null, recentPageSpeed: [], pageEvidence: [], deviceEvidence: [], changeEvents: [], actionEvidence: [] }));
  assert.equal(brief.evidenceCoverage.latestPageSpeed, "unavailable");
  assert.equal(brief.evidenceCoverage.searchComparison, "unavailable");
  assert.equal(brief.pagePerformance.state, "unavailable");
  assert.equal(brief.devicePerformance.state, "unavailable");
  assert.equal(brief.evidenceCoverage.changeEvents, "empty");
  assert.equal(brief.evidenceCoverage.actionEvidence, "empty");
});

test("Search sparse-data rule changes exactly between 19 and 20 impressions", async () => {
  const sparse = packetFixture({ current: { ...packetFixture().current, totals: metrics(1, 10) }, previous: { ...packetFixture().previous, totals: metrics(1, 9) } });
  const boundary = packetFixture({ current: { ...packetFixture().current, totals: metrics(1, 10) }, previous: { ...packetFixture().previous, totals: metrics(1, 10) } });
  assert.ok((await build(sparse)).limitations.some((item) => item.includes("too low")));
  assert.equal((await build(boundary)).limitations.some((item) => item.includes("too low")), false);
});

test("zero-denominator and partial Search evidence remain neutral source metrics", async () => {
  const brief = await build(packetFixture({ current: { ...packetFixture().current, totals: metrics(0, 0, 0, 0) }, previous: null, deltas: { clicks: null, impressions: null, ctr: null, averagePosition: null } }));
  assert.equal(brief.searchPerformance.current.totals.ctr, 0);
  assert.equal(brief.searchPerformance.current.totals.averagePosition, 0);
  assert.equal(brief.searchPerformance.previous, null);
  assert.equal(brief.searchPerformance.deltas.ctr, null);
});

test("Lighthouse caveat is permanent and a version mismatch has one deterministic warning", async () => {
  const packet = packetFixture();
  packet.recentPageSpeed = [packet.recentPageSpeed[0], { ...packet.recentPageSpeed[1], lighthouseVersion: "12.0.0" }];
  const brief = await build(packet);
  assert.ok(brief.limitations.some((item) => item.startsWith("Lighthouse is a laboratory")));
  assert.equal(brief.limitations.filter((item) => item.includes("different Lighthouse versions")).length, 1);
  assert.equal(new Set(brief.limitations).size, brief.limitations.length);
});

test("PageSpeed comparisons require a matching target and strategy and calculate metric deltas", async () => {
  const comparable = await build();
  assert.deepEqual(comparable.technicalComparison, { currentRunId: packetFixture().recentPageSpeed[0].runId, previousRunId: packetFixture().recentPageSpeed[1].runId, performanceScoreDelta: 0.030000000000000027, lcpValueDelta: -200, clsValueDelta: -0.010000000000000002 });
  const packet = packetFixture();
  packet.recentPageSpeed[1] = { ...packet.recentPageSpeed[1], strategy: "desktop" };
  const unmatched = await build(packet);
  assert.equal(unmatched.technicalComparison, null);
  assert.equal(unmatched.evidenceCoverage.previousComparablePageSpeed, "unavailable");
});

test("building is read-only, does not call fetch, and does not mutate frozen input", async () => {
  const packet = deepFreeze(packetFixture());
  const before = JSON.stringify(packet);
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => { fetchCalls += 1; throw new Error("network_not_permitted"); };
  try { await build(packet); } finally { globalThis.fetch = originalFetch; }
  assert.equal(fetchCalls, 0);
  assert.equal(JSON.stringify(packet), before);
});
