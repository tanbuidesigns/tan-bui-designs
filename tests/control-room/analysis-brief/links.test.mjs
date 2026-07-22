import assert from "node:assert/strict";
import test from "node:test";

import { isApprovedEvidenceRoute, resolveBriefEvidenceLinks } from "../../../src/lib/control-room/analysis-brief/core/evidence-links.ts";

test("only application-generated evidence routes are allowed", () => {
  const allowed = ["/control-room/history/11111111-1111-4111-8111-111111111111", "/control-room/evidence", "/control-room/reports"];
  const rejected = ["https://example.com", "//example.com", "javascript:alert(1)", "data:text/html,x", "\\control-room\\evidence", "/control-room/history/javascript%3Aalert(1)", "/work", "/control-room", "/control-room/operations"];
  for (const href of allowed) assert.equal(isApprovedEvidenceRoute(href), true, href);
  for (const href of rejected) assert.equal(isApprovedEvidenceRoute(href), false, href);
});

test("evidence labels and routes are deterministic, restricted refs are excluded", () => {
  const references = resolveBriefEvidenceLinks([
    { type: "capture-run", id: "11111111-1111-4111-8111-111111111111", sensitivity: "internal" },
    { type: "change-event", id: "change", sensitivity: "internal" },
    { type: "action-evidence", id: "action", sensitivity: "restricted" },
  ]);
  assert.deepEqual(references.map(({ label, href }) => ({ label, href })), [
    { label: "[EVIDENCE CAPTURE-01]", href: "/control-room/history/11111111-1111-4111-8111-111111111111" },
    { label: "[EVIDENCE CHANGE-02]", href: "/control-room/evidence" },
  ]);
});

test("invalid capture identifiers fail closed to the reports index", () => {
  const [reference] = resolveBriefEvidenceLinks([{ type: "capture-run", id: "../evidence", sensitivity: "internal" }]);
  assert.equal(reference.href, "/control-room/reports");
  assert.equal(isApprovedEvidenceRoute(reference.href), true);
});
