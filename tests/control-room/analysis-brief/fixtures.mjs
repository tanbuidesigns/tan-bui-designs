const ids = [
  "11111111-1111-4111-8111-111111111111",
  "22222222-2222-4222-8222-222222222222",
  "33333333-3333-4333-8333-333333333333",
  "44444444-4444-4444-8444-444444444444",
];

export const metrics = (clicks, impressions, ctr = impressions ? clicks / impressions : 0, averagePosition = 10) => ({ clicks, impressions, ctr, averagePosition });

export function packetFixture(overrides = {}) {
  const pageEvidence = Array.from({ length: 25 }, (_, index) => ({ path: index ? `/work/page-${index}` : "/work", current: metrics(index + 2, index + 40), previous: metrics(index + 1, index + 30), classification: "present_in_both_returned_sets", currentRunId: ids[0], previousRunId: ids[1] }));
  const changeEvents = Array.from({ length: 25 }, (_, index) => ({ id: `change-${index}`, occurredAt: `2026-07-${String(21 - (index % 20)).padStart(2, "0")}T10:00:00.000Z`, type: "technical", title: `Recorded change ${index}`, summary: `Observed deployment note ${index}`, affectedPath: "/work", lifecycleState: "deployed", verificationState: "confirmed", gitCommit: `abcdef${index}`, workerVersionId: null }));
  const actionEvidence = Array.from({ length: 25 }, (_, index) => ({ id: `evidence-${index}`, actionId: `action-${index}`, expectedOutcome: `Expected measurable outcome ${index}`, observedOutcome: `Observed measurement ${index}`, evaluationStatus: "inconclusive", verificationState: "confirmed", baselineRunId: ids[0], followupRunId: ids[1] }));
  return {
    schemaVersion: "reporting-evidence-v1",
    generatedAt: "2026-07-22T09:00:00.000Z",
    periodId: "28d",
    current: { runId: ids[0], startDate: "2026-06-21", endDate: "2026-07-18", totals: metrics(12, 120, 0.1, 8) },
    previous: { runId: ids[1], startDate: "2026-05-24", endDate: "2026-06-20", totals: metrics(8, 100, 0.08, 9) },
    deltas: { clicks: 4, impressions: 20, ctr: 0.02, averagePosition: -1 },
    recentPageSpeed: [
      { runId: ids[2], targetId: "performance-home", strategy: "mobile", capturedAt: "2026-07-21T10:00:00.000Z", performanceScore: 0.91, lcpValue: 2200, clsValue: 0.03, lighthouseVersion: "13.0.1" },
      { runId: ids[3], targetId: "performance-home", strategy: "mobile", capturedAt: "2026-07-14T10:00:00.000Z", performanceScore: 0.88, lcpValue: 2400, clsValue: 0.04, lighthouseVersion: "13.0.1" },
    ],
    pageEvidence,
    deviceEvidence: [
      { device: "MOBILE", current: metrics(6, 60), previous: metrics(4, 50), currentRunId: ids[0], previousRunId: ids[1] },
      { device: "DESKTOP", current: metrics(5, 50), previous: metrics(3, 40), currentRunId: ids[0], previousRunId: ids[1] },
      { device: "TABLET", current: metrics(1, 10), previous: metrics(1, 10), currentRunId: ids[0], previousRunId: ids[1] },
      { device: "MOBILE", current: metrics(0, 0), previous: null, currentRunId: ids[0], previousRunId: null },
    ],
    changeEvents,
    actionEvidence,
    evidenceReferences: [
      { type: "capture-run", id: ids[0], sensitivity: "internal" },
      { type: "change-event", id: "change-0", sensitivity: "internal" },
      { type: "action-evidence", id: "evidence-0", sensitivity: "internal" },
      { type: "capture-run", id: ids[1], sensitivity: "restricted" },
    ],
    limitations: ["Evidence is observational and does not prove causation.", "No raw provider responses or unbounded rows are included."],
    ...overrides,
  };
}

export function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}
