import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const manifest = JSON.parse(await readFile(new URL("../../src/data/generated/control-room-build-manifest.json", import.meta.url), "utf8"));

test("build manifest records stable route evidence", () => {
  assert.equal(manifest.schemaVersion, 1);
  assert.match(manifest.routeSourceDigest, /^[a-f0-9]{64}$/);
  assert.ok(manifest.routes.length > 0);
  assert.ok(manifest.routes.some((route) => route.route === "/" && route.file === "src/app/page.tsx"));
  assert.ok(manifest.routes.some((route) => route.route === "/control-room/pages" && route.visibility === "private-or-admin"));
  assert.ok(manifest.routes.some((route) => route.route === "/blog/[slug]" && route.dynamic));
});

test("route and commit candidates are bounded and safe for display", () => {
  assert.equal(new Set(manifest.routes.map((route) => route.file)).size, manifest.routes.length);
  assert.ok(manifest.commits.length <= 20);
  for (const commit of manifest.commits) {
    assert.match(commit.hash, /^[a-f0-9]{40}$/);
    assert.ok(commit.subject.length <= 200);
  }
});
