import assert from "node:assert/strict";
import test from "node:test";
import { mergeActionWorkflow } from "./service.ts";

const baseline = [{ id: "baseline", title: "Baseline", status: "ready", suggestedOwner: "Developer" }];

test("overlays workflow fields without replacing curated baseline content", () => {
  const [action] = mergeActionWorkflow(baseline, [{ actionId: "baseline", sourceKind: "baseline", status: "done", assignedOwner: "Tan", createdAt: "2026-07-30T00:00:00.000Z", updatedAt: "2026-07-30T00:00:00.000Z" }]);
  assert.equal(action.title, "Baseline");
  assert.equal(action.status, "done");
  assert.equal(action.suggestedOwner, "Tan");
});

test("maps owner-created workflow rows to honest custom action records", () => {
  const actions = mergeActionWorkflow([], [{ actionId: "custom-id", sourceKind: "custom", status: "backlog", assignedOwner: null, title: "Custom", description: "Description", category: "Content", priority: "medium", effort: "small", affectedArea: "/blog", successMeasure: "Published", completedAt: null, createdAt: "2026-07-30T00:00:00.000Z", updatedAt: "2026-07-30T00:00:00.000Z" }]);
  assert.equal(actions[0].title, "Custom");
  assert.equal(actions[0].verificationStatus, "requires-verification");
});
