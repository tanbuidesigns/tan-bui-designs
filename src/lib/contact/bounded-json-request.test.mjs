import assert from "node:assert/strict";
import test from "node:test";

import { readBoundedJsonRequest } from "./bounded-json-request.ts";

test("reads valid JSON within the byte boundary", async () => {
  const request = new Request("https://tanbuidesigns.com/api/contact", {
    method: "POST",
    body: JSON.stringify({ name: "Tan" }),
  });
  assert.deepEqual(await readBoundedJsonRequest(request, 100), {
    ok: true,
    value: { name: "Tan" },
  });
});

test("enforces the byte limit even without relying on Content-Length", async () => {
  const request = new Request("https://tanbuidesigns.com/api/contact", {
    method: "POST",
    body: JSON.stringify({ message: "x".repeat(100) }),
  });
  assert.deepEqual(await readBoundedJsonRequest(request, 20), {
    ok: false,
    status: 413,
  });
});

test("rejects malformed and empty bodies", async () => {
  const malformed = new Request("https://tanbuidesigns.com/api/contact", {
    method: "POST",
    body: "{not-json",
  });
  const empty = new Request("https://tanbuidesigns.com/api/contact", {
    method: "POST",
  });
  assert.deepEqual(await readBoundedJsonRequest(malformed, 100), {
    ok: false,
    status: 400,
  });
  assert.deepEqual(await readBoundedJsonRequest(empty, 100), {
    ok: false,
    status: 400,
  });
});
