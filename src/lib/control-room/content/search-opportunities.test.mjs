import assert from "node:assert/strict";
import test from "node:test";
import { deriveSearchContentOpportunities } from "./search-opportunities.ts";

const metrics = (impressions, ctr, averagePosition, clicks = 0) => ({ clicks, impressions, ctr, averagePosition });

test("classifies bounded opportunities from current and previous returned query rows", () => {
  const result = deriveSearchContentOpportunities({ current: [
    { query: "design consultant", metrics: metrics(50, 0.02, 8, 1) },
    { query: "packaging designer", metrics: metrics(15, 0.08, 12, 1) },
    { query: "new query", metrics: metrics(8, 0, 20) },
  ], previous: [
    { query: "design consultant", metrics: metrics(40, 0.03, 9, 1) },
    { query: "packaging designer", metrics: metrics(10, 0.1, 14, 1) },
  ] });
  assert.deepEqual(result.map((item) => item.classification), ["strong-impressions-low-ctr", "ranking-range", "emerging-top-row"]);
});

test("excludes weak and distant rows and respects the output limit", () => {
  const result = deriveSearchContentOpportunities({ current: [
    { query: "weak", metrics: metrics(4, 0, 5) },
    { query: "distant", metrics: metrics(100, 0, 41) },
    { query: "one", metrics: metrics(10, 0, 8) },
    { query: "two", metrics: metrics(9, 0, 8) },
  ], previous: [], limit: 1 });
  assert.equal(result.length, 1);
  assert.equal(result[0].query, "one");
});
