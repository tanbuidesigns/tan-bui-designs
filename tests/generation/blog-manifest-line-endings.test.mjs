import assert from "node:assert/strict";
import test from "node:test";

const { normalizeLineEndings } = await import("../../scripts/line-endings.mjs");

test("normalizes LF and CRLF blog source to identical LF body text", () => {
  const lf = "# Heading\n\n- item\n\n[link](https://example.com)\n\n```ts\nconst value = 1;\n```\n";
  const crlf = lf.replaceAll("\n", "\r\n");

  assert.equal(normalizeLineEndings(lf), lf);
  assert.equal(normalizeLineEndings(crlf), lf);
  assert.equal(normalizeLineEndings(crlf).includes("\r"), false);
  assert.match(normalizeLineEndings(crlf), /# Heading/);
  assert.match(normalizeLineEndings(crlf), /- item/);
  assert.match(normalizeLineEndings(crlf), /\[link\]/);
  assert.match(normalizeLineEndings(crlf), /```ts/);
});
