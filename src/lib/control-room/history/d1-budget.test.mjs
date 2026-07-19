import assert from "node:assert/strict";
import test from "node:test";

import {
  D1_CAPTURE_STATEMENT_CEILING,
  D1_FREE_QUERY_LIMIT,
  D1_MAX_BOUND_PARAMETERS,
  assertD1CapturePlan,
  d1InsertPlan,
} from "./d1-budget.ts";

test("the worst-case Search capture has an exact Free-plan-safe budget", () => {
  const plan = assertD1CapturePlan();

  assert.equal(plan.totalStatements, 41);
  assert.equal(plan.maximumBoundParameters, 100);
  assert.ok(plan.totalStatements <= D1_CAPTURE_STATEMENT_CEILING);
  assert.ok(plan.totalStatements <= D1_FREE_QUERY_LIMIT);
  assert.ok(plan.maximumBoundParameters <= D1_MAX_BOUND_PARAMETERS);
});

test("the insert planner chunks rows without exceeding 100 parameters", () => {
  assert.deepEqual(d1InsertPlan("daily rows", 90, 6), {
    label: "daily rows",
    statements: 6,
    maximumBoundParameters: 96,
  });
  assert.deepEqual(d1InsertPlan("page rows", 50, 10), {
    label: "page rows",
    statements: 5,
    maximumBoundParameters: 100,
  });
});

test("the safety assertion rejects statement and parameter regressions", () => {
  assert.throws(
    () => assertD1CapturePlan({ totalStatements: 46, maximumBoundParameters: 100 }),
    /safety ceiling is 45/,
  );
  assert.throws(
    () => assertD1CapturePlan({ totalStatements: 41, maximumBoundParameters: 101 }),
    /platform limit is 100/,
  );
});
