import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_CONTROL_ROOM_FORM_BYTES,
  readBoundedUrlEncodedForm,
  validateUrlEncodedFormHeaders,
} from "./bounded-form-request.ts";

const contentType = "application/x-www-form-urlencoded";

test("allows a valid form when the runtime omits Content-Length", async () => {
  const request = new Request("https://dashboard.tanbuidesigns.com/control-room/history/capture/pagespeed", {
    method: "POST",
    headers: { "content-type": contentType },
    body: "runId=94ecd64a-e84f-4176-8e35-032498e544a7&targetId=performance-home&strategy=mobile",
  });

  assert.equal(request.headers.get("content-length"), null);
  assert.deepEqual(validateUrlEncodedFormHeaders(request.headers), { ok: true });
  const result = await readBoundedUrlEncodedForm(request);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.form.get("targetId"), "performance-home");
    assert.equal(result.form.get("strategy"), "mobile");
  }
});

test("rejects an unsupported form content type", () => {
  const headers = new Headers({ "content-type": "multipart/form-data" });
  assert.deepEqual(validateUrlEncodedFormHeaders(headers), { ok: false, status: 415 });
});

test("rejects invalid and oversized declared lengths", () => {
  const invalid = new Headers({ "content-type": contentType, "content-length": "unknown" });
  const oversized = new Headers({ "content-type": contentType, "content-length": String(MAX_CONTROL_ROOM_FORM_BYTES + 1) });
  assert.deepEqual(validateUrlEncodedFormHeaders(invalid), { ok: false, status: 400 });
  assert.deepEqual(validateUrlEncodedFormHeaders(oversized), { ok: false, status: 413 });
});

test("enforces the byte limit when Content-Length is absent", async () => {
  const request = new Request("https://dashboard.tanbuidesigns.com/control-room/history/capture/pagespeed", {
    method: "POST",
    headers: { "content-type": contentType },
    body: `value=${"a".repeat(MAX_CONTROL_ROOM_FORM_BYTES)}`,
  });
  const result = await readBoundedUrlEncodedForm(request);
  assert.deepEqual(result, { ok: false, status: 413 });
});

test("rejects an empty body", async () => {
  const request = new Request("https://dashboard.tanbuidesigns.com/control-room/history/capture/pagespeed", {
    method: "POST",
    headers: { "content-type": contentType },
  });
  const result = await readBoundedUrlEncodedForm(request);
  assert.deepEqual(result, { ok: false, status: 400 });
});
