import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTROL_ROOM_CRONS,
  resolveScheduledControlRoomTask,
  scheduledCaptureIdentity,
} from "./scheduled-capture.ts";

test("maps each configured cron to one bounded task", () => {
  assert.deepEqual(resolveScheduledControlRoomTask(CONTROL_ROOM_CRONS.leadRetention), { kind: "lead-retention" });
  assert.deepEqual(resolveScheduledControlRoomTask(CONTROL_ROOM_CRONS.search28Days), { kind: "search-comparison", periodId: "28d" });
  assert.deepEqual(resolveScheduledControlRoomTask(CONTROL_ROOM_CRONS.search90Days), { kind: "search-comparison", periodId: "90d" });
  assert.deepEqual(resolveScheduledControlRoomTask(CONTROL_ROOM_CRONS.homePageSpeedMobile), { kind: "pagespeed", targetId: "performance-home", strategy: "mobile" });
  assert.deepEqual(resolveScheduledControlRoomTask(CONTROL_ROOM_CRONS.portableBackup), { kind: "portable-backup" });
  assert.equal(resolveScheduledControlRoomTask("0 0 * * *"), null);
});

test("creates a deterministic UUID and idempotency key for a scheduled event", async () => {
  const task = { kind: "search-comparison", periodId: "28d" };
  const first = await scheduledCaptureIdentity(task, Date.UTC(2026, 6, 30, 5, 31));
  const retry = await scheduledCaptureIdentity(task, Date.UTC(2026, 6, 30, 5, 31));

  assert.deepEqual(retry, first);
  assert.match(first.runId, /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.equal(first.startedAt, "2026-07-30T05:31:00.000Z");
  assert.equal(first.idempotencyKey, "scheduled:search-console:28d:2026-07-30T05:31:00.000Z");
});

test("separates identities for different tasks at the same scheduled time", async () => {
  const scheduledTime = Date.UTC(2026, 6, 30, 6, 47);
  const search = await scheduledCaptureIdentity({ kind: "search-comparison", periodId: "90d" }, scheduledTime);
  const performance = await scheduledCaptureIdentity({ kind: "pagespeed", targetId: "performance-home", strategy: "mobile" }, scheduledTime);
  assert.notEqual(search.runId, performance.runId);
});
