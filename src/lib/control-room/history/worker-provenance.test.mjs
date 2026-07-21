import assert from "node:assert/strict";
import test from "node:test";

import { normalizeWorkerVersionMetadata } from "./worker-provenance.ts";

test("maps the Cloudflare version metadata binding to capture provenance", () => {
  assert.deepEqual(
    normalizeWorkerVersionMetadata({
      id: "ab5412d1-d78e-4a49-a812-afff2b3b235f",
      tag: "task-7",
      timestamp: "2026-07-21T21:32:22.387Z",
    }),
    {
      workerVersionId: "ab5412d1-d78e-4a49-a812-afff2b3b235f",
      workerVersionTag: "task-7",
      workerVersionCreatedAt: "2026-07-21T21:32:22.387Z",
    },
  );
});

test("keeps optional tag and timestamp unavailable without discarding a valid version ID", () => {
  assert.deepEqual(normalizeWorkerVersionMetadata({ id: "worker-version", tag: "", timestamp: null }), {
    workerVersionId: "worker-version",
    workerVersionTag: null,
    workerVersionCreatedAt: null,
  });
});

test("returns unavailable provenance outside Cloudflare or for an invalid binding", () => {
  const unavailable = {
    workerVersionId: null,
    workerVersionTag: null,
    workerVersionCreatedAt: null,
  };

  assert.deepEqual(normalizeWorkerVersionMetadata(undefined), unavailable);
  assert.deepEqual(normalizeWorkerVersionMetadata({ tag: "task-7" }), unavailable);
  assert.deepEqual(normalizeWorkerVersionMetadata({ id: 123 }), unavailable);
});
