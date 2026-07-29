import assert from "node:assert/strict";
import test from "node:test";

import {
  emptyLeadStatusCounts,
  isIsoCalendarDate,
  isLeadStatus,
  leadRetentionDeleteAfter,
  parseStoredServices,
} from "./domain.ts";

test("closed leads receive a twelve-month retention date", () => {
  assert.equal(
    leadRetentionDeleteAfter("2026-07-29T12:00:00.000Z"),
    "2027-07-29T12:00:00.000Z",
  );
});

test("lead status validation accepts only the controlled workflow", () => {
  assert.equal(isLeadStatus("active"), true);
  assert.equal(isLeadStatus("deleted"), false);
  assert.equal(isLeadStatus(null), false);
});

test("follow-up dates must be real ISO calendar dates", () => {
  assert.equal(isIsoCalendarDate("2026-07-29"), true);
  assert.equal(isIsoCalendarDate("2026-02-30"), false);
  assert.equal(isIsoCalendarDate("29/07/2026"), false);
});

test("stored services fail closed when malformed", () => {
  assert.deepEqual(parseStoredServices('["Brand Identity",7]'), ["Brand Identity"]);
  assert.deepEqual(parseStoredServices("not-json"), []);
});

test("status counts start with every supported status", () => {
  assert.deepEqual(emptyLeadStatusCounts(), {
    new: 0,
    contacted: 0,
    active: 0,
    proposal: 0,
    won: 0,
    closed: 0,
  });
});
