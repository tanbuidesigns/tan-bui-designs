import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { basename, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const stateRoot = join(process.cwd(), ".wrangler", "state", "v3", "d1");

function findDatabaseFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findDatabaseFiles(path);
    return entry.name.endsWith(".sqlite") && entry.name !== "metadata.sqlite" ? [path] : [];
  });
}

const databaseFiles = findDatabaseFiles(stateRoot);
assert.equal(databaseFiles.length, 1, "Expected exactly one local D1 simulation database.");

const db = new DatabaseSync(databaseFiles[0]);
db.exec("PRAGMA foreign_keys = ON");

function run(sql, ...values) {
  return db.prepare(sql).run(...values);
}

function get(sql, ...values) {
  return db.prepare(sql).get(...values);
}

function all(sql, ...values) {
  return db.prepare(sql).all(...values);
}

function expectConstraint(sql, ...values) {
  assert.throws(() => run(sql, ...values), /constraint|foreign key/i);
}

function insertRun({
  id,
  idempotencyKey = `idem-${id}`,
  source = "pagespeed",
  mode = "single",
  status = "running",
  target = "home-mobile",
  period = null,
  started = "2026-07-01T00:00:00.000Z",
  completed = null,
  safeError = null,
}) {
  run(
    `INSERT INTO cr_capture_runs(
      id, idempotency_key, source, capture_mode, status, target_key, period_key,
      started_at, completed_at, safe_error_code, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    id,
    idempotencyKey,
    source,
    mode,
    status,
    target,
    period,
    started,
    completed,
    safeError,
    started,
  );
}

function insertSearchSnapshot({
  id,
  runId,
  role,
  start,
  end,
  clicks = null,
  impressions = null,
  ctr = null,
  position = null,
  totalState = "empty",
  dailyState = "empty",
  queryState = "empty",
  pageState = "empty",
  deviceState = "empty",
}) {
  run(
    `INSERT INTO cr_search_snapshots(
      id, run_id, comparison_role, property_id, property_type, period_id,
      start_date, end_date, timezone, search_type, data_state, clicks, impressions,
      ctr, average_position, total_state, daily_state, query_state, page_state,
      device_state, response_aggregation_type, captured_at
    ) VALUES (?, ?, ?, 'sc-domain:tanbuidesigns.com', 'domain', '28d', ?, ?,
      'America/Los_Angeles', 'web', 'final', ?, ?, ?, ?, ?, ?, ?, ?, ?, 'byProperty', ?)`,
    id,
    runId,
    role,
    start,
    end,
    clicks,
    impressions,
    ctr,
    position,
    totalState,
    dailyState,
    queryState,
    pageState,
    deviceState,
    `${end}T08:00:00.000Z`,
  );
}

const expectedTables = [
  "cr_action_evidence",
  "cr_capture_runs",
  "cr_change_events",
  "cr_pagespeed_diagnostics",
  "cr_pagespeed_snapshots",
  "cr_run_warnings",
  "cr_schema_metadata",
  "cr_search_daily_rows",
  "cr_search_device_rows",
  "cr_search_page_rows",
  "cr_search_query_rows",
  "cr_search_snapshots",
  "d1_migrations",
];

const schema = get(
  "SELECT schema_version, migration_name, compatibility_family FROM cr_schema_metadata WHERE schema_key = ?",
  "control_room_history_schema",
);
assert.deepEqual({ ...schema }, {
  schema_version: 1,
  migration_name: "0001_create_history_foundation.sql",
  compatibility_family: "sqlite",
});
assert.equal(get("SELECT COUNT(*) AS count FROM d1_migrations").count, 1);

const tables = all("SELECT name FROM sqlite_master WHERE type = 'table'").map((row) => row.name);
for (const table of expectedTables) assert.ok(tables.includes(table), `Missing table ${table}.`);

const requiredIndexes = [
  "idx_cr_capture_runs_created",
  "idx_cr_pagespeed_target",
  "idx_cr_search_period",
  "idx_cr_change_events_occurred",
  "idx_cr_action_evidence_action",
];
const indexes = all("SELECT name FROM sqlite_master WHERE type = 'index'").map((row) => row.name);
for (const index of requiredIndexes) assert.ok(indexes.includes(index), `Missing index ${index}.`);

db.exec("SAVEPOINT stage_b_verification");
try {
  expectConstraint(
    "INSERT INTO cr_capture_runs(id, idempotency_key, source, capture_mode, status, target_key, started_at, created_at) VALUES ('invalid-status', 'invalid-status', 'pagespeed', 'single', 'not-valid', 'home-mobile', '2026-07-01', '2026-07-01')",
  );
  expectConstraint(
    "INSERT INTO cr_pagespeed_snapshots(run_id, target_id, strategy, diagnostic_count, captured_at) VALUES ('missing-run', 'home', 'mobile', 0, '2026-07-01')",
  );

  insertRun({ id: "idempotent-run", idempotencyKey: "fixed-key" });
  expectConstraint(
    "INSERT INTO cr_capture_runs(id, idempotency_key, source, capture_mode, status, target_key, started_at, created_at) VALUES ('duplicate-run', 'fixed-key', 'pagespeed', 'single', 'running', 'home-mobile', '2026-07-01', '2026-07-01')",
  );

  insertRun({ id: "atomic-run" });
  db.exec("SAVEPOINT atomic_capture");
  try {
    run(
      "INSERT INTO cr_pagespeed_snapshots(run_id, target_id, strategy, performance_score, diagnostic_count, captured_at) VALUES (?, ?, 'mobile', 90, 0, ?)",
      "atomic-run",
      "home",
      "2026-07-01T00:00:00.000Z",
    );
    run(
      "INSERT INTO cr_pagespeed_diagnostics(run_id, ordinal, audit_id, title, score, created_at) VALUES (?, 20, 'invalid', 'Invalid ordinal', 1, ?)",
      "atomic-run",
      "2026-07-01T00:00:00.000Z",
    );
    assert.fail("The invalid atomic fixture unexpectedly succeeded.");
  } catch (error) {
    assert.match(String(error), /constraint/i);
    db.exec("ROLLBACK TO atomic_capture");
  } finally {
    db.exec("RELEASE atomic_capture");
  }
  assert.equal(get("SELECT COUNT(*) AS count FROM cr_pagespeed_snapshots WHERE run_id = 'atomic-run'").count, 0);

  insertRun({
    id: "pagespeed-run",
    status: "complete",
    completed: "2026-07-01T00:01:00.000Z",
  });
  run(
    `INSERT INTO cr_pagespeed_snapshots(
      run_id, target_id, strategy, audited_url, final_url, performance_score,
      accessibility_score, best_practices_score, seo_score, fcp_ms, lcp_ms,
      cls_milli, tbt_ms, speed_index_ms, lighthouse_version, diagnostic_count, captured_at
    ) VALUES (?, 'home', 'mobile', 'https://tanbuidesigns.com/', 'https://tanbuidesigns.com/',
      91, 100, 100, 100, 800, 1400, 10, 0, 900, 'fixture', 1, ?)`,
    "pagespeed-run",
    "2026-07-01T00:01:00.000Z",
  );
  run(
    "INSERT INTO cr_pagespeed_diagnostics(run_id, ordinal, audit_id, title, display_value, score, created_at) VALUES (?, 0, 'fixture-audit', 'Fixture audit', 'Passed', 1, ?)",
    "pagespeed-run",
    "2026-07-01T00:01:00.000Z",
  );
  assert.equal(get("SELECT performance_score FROM cr_pagespeed_snapshots WHERE run_id = 'pagespeed-run'").performance_score, 91);

  insertRun({
    id: "search-run",
    source: "search_console",
    mode: "comparison_pair",
    status: "complete",
    target: "sc-domain:tanbuidesigns.com",
    period: "28d",
    completed: "2026-07-02T08:00:00.000Z",
  });
  insertSearchSnapshot({ id: "search-current", runId: "search-run", role: "current", start: "2026-06-04", end: "2026-07-01", clicks: 12, impressions: 300, ctr: 0.04, position: 9, totalState: "success", dailyState: "success", queryState: "success", pageState: "success", deviceState: "success" });
  insertSearchSnapshot({ id: "search-previous", runId: "search-run", role: "previous", start: "2026-05-07", end: "2026-06-03", clicks: 8, impressions: 200, ctr: 0.04, position: 11, totalState: "success", dailyState: "success", queryState: "success", pageState: "success", deviceState: "success" });
  for (const snapshotId of ["search-current", "search-previous"]) {
    run("INSERT INTO cr_search_daily_rows(snapshot_id, reporting_date, clicks, impressions, ctr, average_position) VALUES (?, '2026-06-30', 1, 20, 0.05, 9)", snapshotId);
    run("INSERT INTO cr_search_query_rows(snapshot_id, rank_in_returned_rows, query_text, normalized_query_hash, clicks, impressions, ctr, average_position) VALUES (?, 1, 'fixture query', ?, 1, 20, 0.05, 9)", snapshotId, "a".repeat(64));
    run("INSERT INTO cr_search_page_rows(snapshot_id, rank_in_returned_rows, page_url, relative_path, normalized_page_key, local_page_id, clicks, impressions, ctr, average_position) VALUES (?, 1, 'https://tanbuidesigns.com/work', '/work', 'https://tanbuidesigns.com/work', 'work', 1, 20, 0.05, 9)", snapshotId);
    run("INSERT INTO cr_search_device_rows(snapshot_id, device, clicks, impressions, ctr, average_position) VALUES (?, 'MOBILE', 1, 20, 0.05, 9)", snapshotId);
  }
  const comparison = all("SELECT comparison_role, clicks FROM cr_search_snapshots WHERE run_id = 'search-run'");
  const currentClicks = comparison.find((row) => row.comparison_role === "current").clicks;
  const previousClicks = comparison.find((row) => row.comparison_role === "previous").clicks;
  assert.equal(currentClicks - previousClicks, 4);

  insertRun({ id: "empty-search", source: "search_console", mode: "comparison_pair", status: "empty", target: "sc-domain:tanbuidesigns.com", period: "28d", completed: "2026-07-03T08:00:00.000Z" });
  insertSearchSnapshot({ id: "empty-current", runId: "empty-search", role: "current", start: "2026-06-05", end: "2026-07-02" });
  insertSearchSnapshot({ id: "empty-previous", runId: "empty-search", role: "previous", start: "2026-05-08", end: "2026-06-04" });
  assert.equal(get("SELECT COUNT(*) AS count FROM cr_search_snapshots WHERE run_id = 'empty-search' AND total_state = 'empty'").count, 2);

  insertRun({ id: "partial-search", source: "search_console", mode: "comparison_pair", status: "partial", target: "sc-domain:tanbuidesigns.com", period: "28d", completed: "2026-07-04T08:00:00.000Z" });
  insertSearchSnapshot({ id: "partial-current", runId: "partial-search", role: "current", start: "2026-06-06", end: "2026-07-03", clicks: 2, impressions: 50, ctr: 0.04, position: 12, totalState: "success", dailyState: "success", queryState: "error", pageState: "empty", deviceState: "success" });
  insertSearchSnapshot({ id: "partial-previous", runId: "partial-search", role: "previous", start: "2026-05-09", end: "2026-06-05" });
  assert.equal(get("SELECT query_state FROM cr_search_snapshots WHERE id = 'partial-current'").query_state, "error");

  insertRun({ id: "failed-run", status: "failed", completed: "2026-07-05T00:01:00.000Z", safeError: "provider_unavailable" });
  assert.equal(get("SELECT safe_error_code FROM cr_capture_runs WHERE id = 'failed-run'").safe_error_code, "provider_unavailable");
  assert.equal(get("SELECT COUNT(*) AS count FROM cr_pagespeed_snapshots WHERE run_id = 'failed-run'").count, 0);

  run("INSERT INTO cr_change_events(id, occurred_at, event_type, title, summary, affected_path, verification_state, lifecycle_state, created_at) VALUES ('change-original', '2026-07-01', 'technical', 'Original change', 'Original fixture summary', '/work', 'confirmed', 'implemented', '2026-07-01')");
  run("INSERT INTO cr_change_events(id, occurred_at, event_type, title, summary, affected_path, verification_state, lifecycle_state, supersedes_event_id, created_at) VALUES ('change-correction', '2026-07-02', 'technical', 'Corrected change', 'Correction fixture summary', '/work', 'confirmed', 'corrected', 'change-original', '2026-07-02')");
  assert.equal(get("SELECT supersedes_event_id FROM cr_change_events WHERE id = 'change-correction'").supersedes_event_id, "change-original");

  run("INSERT INTO cr_action_evidence(id, action_id, change_event_id, baseline_run_id, followup_run_id, metric_family, expected_outcome, observed_outcome, evaluation_status, verification_state, created_at) VALUES ('evidence-one', 'action-one', 'change-correction', 'empty-search', 'search-run', 'search', 'Increase qualified visibility', 'Fixture comparison persisted', 'positive', 'confirmed', '2026-07-02')");
  assert.equal(get("SELECT evaluation_status FROM cr_action_evidence WHERE id = 'evidence-one'").evaluation_status, "positive");

  const packet = {
    search: all("SELECT comparison_role, clicks, impressions FROM cr_search_snapshots WHERE run_id = 'search-run' ORDER BY comparison_role"),
    pageSpeed: all("SELECT run_id, performance_score FROM cr_pagespeed_snapshots ORDER BY captured_at DESC LIMIT 8"),
    evidence: all("SELECT id, action_id FROM cr_action_evidence ORDER BY created_at DESC"),
  };
  assert.equal(packet.search.length, 2);
  assert.equal(packet.pageSpeed[0].performance_score, 91);
  assert.equal(packet.evidence[0].action_id, "action-one");

  for (let index = 0; index < 30; index += 1) {
    const id = `page-${String(index).padStart(2, "0")}`;
    const day = String((index % 28) + 1).padStart(2, "0");
    insertRun({ id, status: "failed", started: `2026-06-${day}T00:00:00.000Z`, completed: `2026-06-${day}T00:01:00.000Z`, safeError: "fixture" });
  }
  const firstPage = all("SELECT id, created_at FROM cr_capture_runs ORDER BY created_at DESC, id DESC LIMIT 10");
  const cursor = firstPage.at(-1);
  const secondPage = all("SELECT id, created_at FROM cr_capture_runs WHERE created_at < ? OR (created_at = ? AND id < ?) ORDER BY created_at DESC, id DESC LIMIT 10", cursor.created_at, cursor.created_at, cursor.id);
  assert.equal(firstPage.length, 10);
  assert.equal(secondPage.length, 10);
  assert.equal(firstPage.filter((row) => secondPage.some((candidate) => candidate.id === row.id)).length, 0);

  const plans = [
    ["history", "EXPLAIN QUERY PLAN SELECT id FROM cr_capture_runs ORDER BY created_at DESC, id DESC LIMIT 20", "idx_cr_capture_runs_created"],
    ["pagespeed", "EXPLAIN QUERY PLAN SELECT run_id FROM cr_pagespeed_snapshots WHERE target_id = 'home' AND strategy = 'mobile' ORDER BY captured_at DESC LIMIT 1", "idx_cr_pagespeed_target"],
    ["search", "EXPLAIN QUERY PLAN SELECT id FROM cr_search_snapshots WHERE property_id = 'sc-domain:tanbuidesigns.com' AND period_id = '28d' ORDER BY end_date DESC LIMIT 2", "idx_cr_search_period"],
  ];
  for (const [label, sql, expectedIndex] of plans) {
    const detail = all(sql).map((row) => row.detail).join(" ");
    assert.match(detail, new RegExp(expectedIndex), `${label} query did not use ${expectedIndex}.`);
  }

  const columns = expectedTables.flatMap((table) =>
    all(`PRAGMA table_info(${table})`).map((column) => `${table}.${column.name}`),
  );
  const forbiddenStorageNames = /credential|oauth|private_key|access_token|refresh_token|raw_response|provider_payload/i;
  assert.equal(columns.filter((column) => forbiddenStorageNames.test(column)).length, 0);
  assert.equal(columns.filter((column) => column.endsWith(".query_text")).length, 1);
  assert.equal(columns.find((column) => column.endsWith(".query_text")), "cr_search_query_rows.query_text");
} finally {
  db.exec("ROLLBACK TO stage_b_verification");
  db.exec("RELEASE stage_b_verification");
  db.close();
}

console.log(`Verified local D1 simulation: ${basename(databaseFiles[0])}`);
console.log("Schema, constraints, atomicity, fixtures, pagination, evidence, and query plans passed.");
