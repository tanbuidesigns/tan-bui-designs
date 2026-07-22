import assert from "node:assert/strict";
import test from "node:test";

import * as domain from "../../../src/lib/control-room/analysis-brief/core/domain.ts";
import * as validation from "../../../src/lib/control-room/analysis-brief/core/validation.ts";
import * as builder from "../../../src/lib/control-room/analysis-brief/core/build-brief.ts";
import * as links from "../../../src/lib/control-room/analysis-brief/core/evidence-links.ts";
import * as markdown from "../../../src/lib/control-room/analysis-brief/core/format-markdown.ts";
import * as json from "../../../src/lib/control-room/analysis-brief/core/format-json.ts";
import * as prompt from "../../../src/lib/control-room/analysis-brief/core/chatgpt-prompt.ts";
import * as formatting from "../../../src/lib/control-room/analysis-brief/core/formatting.ts";
import * as limitations from "../../../src/lib/control-room/analysis-brief/core/limitations.ts";
import * as copyPayloads from "../../../src/lib/control-room/analysis-brief/core/copy-payloads.ts";

test("every Analysis Brief core entry point imports without framework support", () => {
  for (const entryPoint of [domain, validation, builder, links, markdown, json, prompt, formatting, limitations, copyPayloads]) {
    assert.ok(Object.keys(entryPoint).length > 0);
  }
});
