import assert from "node:assert/strict";
import test from "node:test";

import { PORTABLE_BACKUP_TABLES, createPortableControlRoomBackup, portableBackupRestoreSql, validatePortableControlRoomBackup } from "./portable-backup.ts";

function databaseFixture() {
  return {
    prepare(query) {
      return {
        bind() { return this; },
        async all() {
          if (query.includes("cr_schema_metadata")) return { results: [{ schema_key: "control_room_history_schema", schema_version: 5, migration_name: "fixture", applied_at: "2026-07-30T00:00:00.000Z", compatibility_family: "sqlite" }] };
          if (query.includes("cr_leads")) return { results: [{ id: "00000000-0000-4000-8000-000000000000", name: "O'Neil", email: "owner@example.com", services_json: "[]", source_path: "/contact", status: "new", follow_up_on: null, created_at: "2026-07-30T00:00:00.000Z", updated_at: "2026-07-30T00:00:00.000Z", closed_at: null, retention_delete_after: null }] };
          return { results: [] };
        },
      };
    },
  };
}

test("creates and validates a complete deterministic backup envelope", async () => {
  const created = await createPortableControlRoomBackup(databaseFixture(), "2026-07-30T07:13:00.000Z");
  const validated = await validatePortableControlRoomBackup(created.text);
  assert.equal(validated.databaseSchemaVersion, 5);
  assert.equal(validated.tables.length, PORTABLE_BACKUP_TABLES.length);
  assert.equal(validated.totalRowCount, 2);
  assert.match(created.sha256, /^[0-9a-f]{64}$/);
});

test("rejects a changed backup payload", async () => {
  const created = await createPortableControlRoomBackup(databaseFixture(), "2026-07-30T07:13:00.000Z");
  await assert.rejects(() => validatePortableControlRoomBackup(created.text.replace("owner@example.com", "changed@example.com")), /integrity/);
});

test("produces quoted SQL for a disposable restore validation database", async () => {
  const created = await createPortableControlRoomBackup(databaseFixture(), "2026-07-30T07:13:00.000Z");
  const sql = portableBackupRestoreSql(created.backup);
  assert.match(sql, /BEGIN TRANSACTION/);
  assert.match(sql, /O''Neil/);
  assert.match(sql, /PRAGMA foreign_key_check/);
});
