import assert from "node:assert/strict";
import test from "node:test";

import { copyAnalysisBriefPayload, printAnalysisBrief } from "../../../src/components/control-room/analysis-brief-actions.ts";

const payloads = { chatgpt: "chatgpt-exact", markdown: "markdown-exact", json: "json-exact" };

test("clipboard success writes the exact selected payload and returns accessible status text", async () => {
  const writes = [];
  const result = await copyAnalysisBriefPayload(async (value) => { writes.push(value); }, payloads, "markdown");
  assert.deepEqual(writes, ["markdown-exact"]);
  assert.deepEqual(result, { status: "Markdown copied.", fallback: null });
});

test("clipboard failure exposes the exact payload for manual fallback", async () => {
  const result = await copyAnalysisBriefPayload(async () => { throw new Error("denied"); }, payloads, "json");
  assert.deepEqual(result, { status: "Clipboard access is unavailable. Copy the selected text manually.", fallback: "json-exact" });
  assert.deepEqual(await copyAnalysisBriefPayload(undefined, payloads, "chatgpt"), { status: "Clipboard access is unavailable. Copy the selected text manually.", fallback: "chatgpt-exact" });
});

test("print invokes only the injected print function", () => {
  let calls = 0;
  printAnalysisBrief(() => { calls += 1; });
  assert.equal(calls, 1);
});
