import assert from "node:assert/strict";
import test from "node:test";

import {
  MAX_CONTROL_ROOM_FORM_BYTES,
  isApprovedWriteOrigin,
  readBoundedUrlEncodedForm,
  validateUrlEncodedFormHeaders,
} from "./bounded-form-request.ts";

const contentType = "application/x-www-form-urlencoded";
const productionOrigin = "https://dashboard.tanbuidesigns.com";

test("accepts the exact expected origin", () => {
  const headers = new Headers({ origin: productionOrigin });
  assert.equal(isApprovedWriteOrigin(headers, productionOrigin, false), true);
});

test("accepts an opaque origin only for a user-activated same-origin document navigation", () => {
  const headers = new Headers({
    origin: "null",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    "sec-fetch-dest": "document",
    "sec-fetch-user": "?1",
  });
  assert.equal(isApprovedWriteOrigin(headers, productionOrigin, true), true);
  assert.equal(isApprovedWriteOrigin(headers, productionOrigin, false), false);
});

test("rejects opaque origins when any browser navigation signal is missing or unsafe", () => {
  const validMetadata = {
    origin: "null",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "navigate",
    "sec-fetch-dest": "document",
    "sec-fetch-user": "?1",
  };
  const unsafeVariants = [
    { ...validMetadata, "sec-fetch-site": "cross-site" },
    { ...validMetadata, "sec-fetch-mode": "cors" },
    { ...validMetadata, "sec-fetch-dest": "empty" },
    { ...validMetadata, "sec-fetch-user": "?0" },
    { ...validMetadata, origin: "https://example.com" },
  ];

  for (const variant of unsafeVariants) {
    assert.equal(isApprovedWriteOrigin(new Headers(variant), productionOrigin, true), false);
  }
});

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
