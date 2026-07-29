import assert from "node:assert/strict";
import test from "node:test";

import { buildCsv, csvCell } from "./csv.ts";

test("quotes commas, quotes and line breaks", () => {
  assert.equal(csvCell('Design, "print"\nweb'), '"Design, ""print""\nweb"');
});

test("neutralises spreadsheet formulas in user-controlled values", () => {
  assert.equal(csvCell("=HYPERLINK(\"https://example.com\")"), '"\'=HYPERLINK(""https://example.com"")"');
  assert.equal(csvCell("  +1"), '"\'  +1"');
  assert.equal(csvCell("\n@SUM(1,1)"), '"\'\n@SUM(1,1)"');
});

test("builds a UTF-8 Excel-friendly document", () => {
  assert.equal(
    buildCsv(["Name", "Status"], [["Tan", "new"]]),
    '\uFEFF"Name","Status"\r\n"Tan","new"\r\n',
  );
});
