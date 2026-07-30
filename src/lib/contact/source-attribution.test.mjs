import assert from "node:assert/strict";
import test from "node:test";
import { normalizeContactSourcePath } from "./source-attribution.ts";

test("keeps a bounded internal path and rejects external or private paths", () => {
  assert.equal(normalizeContactSourcePath("/work/urban-eat"), "/work/urban-eat");
  assert.equal(normalizeContactSourcePath("https://example.com"), "/contact");
  assert.equal(normalizeContactSourcePath("/control-room/leads"), "/contact");
  assert.equal(normalizeContactSourcePath("//example.com"), "/contact");
});
