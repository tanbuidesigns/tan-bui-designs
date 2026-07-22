import assert from "node:assert/strict";
import test from "node:test";

import sitemap from "../../src/app/sitemap.ts";
import robots from "../../src/app/robots.ts";

const urls = () => sitemap().map((entry) => entry.url);

test("sitemap output is deterministic and canonically scoped", () => {
  const first = sitemap();
  const second = sitemap();
  assert.deepEqual(first, second);

  const emitted = first.map((entry) => entry.url);
  assert.equal(new Set(emitted).size, emitted.length);
  assert.ok(emitted.every((url) => url.startsWith("https://tanbuidesigns.com/")));
  assert.ok(emitted.every((url) => !url.includes("?")));
  assert.ok(emitted.every((url) => !url.includes("#")));
  assert.ok(emitted.every((url) => !url.includes("www.") && !url.includes("dashboard.")));
});

test("sitemap contains published public content only", () => {
  const emitted = urls();

  for (const route of ["/", "/about", "/contact", "/privacy", "/work", "/blog", "/work/islamiyah-series", "/work/urban-eat"]) {
    assert.ok(emitted.includes(`https://tanbuidesigns.com${route}`), route);
  }

  assert.ok(emitted.includes("https://tanbuidesigns.com/blog/avoiding-trendslop-design-taste-ai"));
  assert.ok(emitted.includes("https://tanbuidesigns.com/blog/design-foundations-still-matter"));
  assert.ok(emitted.includes("https://tanbuidesigns.com/blog/vibe-coding-custom-websites"));
  assert.ok(emitted.every((url) => !url.includes("/control-room") && !url.includes("/api/") && !url.includes("/sign-in")));
});

test("robots references only the canonical sitemap and protects private surfaces", () => {
  const policy = robots();
  assert.equal(policy.sitemap, "https://tanbuidesigns.com/sitemap.xml");
  assert.deepEqual(policy.rules.disallow, ["/control-room", "/api", "/keystatic"]);
});
