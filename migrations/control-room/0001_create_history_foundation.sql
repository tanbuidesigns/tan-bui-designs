PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS cr_schema_metadata (
  schema_key TEXT PRIMARY KEY,
  schema_version INTEGER NOT NULL CHECK (schema_version > 0),
  migration_name TEXT NOT NULL,
  applied_at TEXT NOT NULL,
  compatibility_family TEXT NOT NULL CHECK (compatibility_family = 'sqlite')
);

CREATE TABLE IF NOT EXISTS cr_capture_runs (
  id TEXT PRIMARY KEY,
  idempotency_key TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL CHECK (source IN ('pagespeed', 'search_console')),
  capture_mode TEXT NOT NULL CHECK (capture_mode IN ('single', 'comparison_pair')),
  trigger_kind TEXT NOT NULL DEFAULT 'manual' CHECK (trigger_kind IN ('manual', 'scheduled')),
  status TEXT NOT NULL CHECK (status IN ('running', 'complete', 'partial', 'empty', 'failed')),
  target_key TEXT NOT NULL,
  period_key TEXT CHECK (period_key IS NULL OR period_key IN ('28d', '90d')),
  started_at TEXT NOT NULL,
  completed_at TEXT,
  provider_generated_at TEXT,
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  successful_request_count INTEGER NOT NULL DEFAULT 0 CHECK (successful_request_count >= 0),
  failed_request_count INTEGER NOT NULL DEFAULT 0 CHECK (failed_request_count >= 0),
  warning_count INTEGER NOT NULL DEFAULT 0 CHECK (warning_count >= 0 AND warning_count <= 40),
  safe_error_code TEXT CHECK (safe_error_code IS NULL OR length(safe_error_code) <= 80),
  schema_version INTEGER NOT NULL DEFAULT 1 CHECK (schema_version > 0),
  worker_version_id TEXT,
  worker_version_tag TEXT,
  worker_version_created_at TEXT,
  detail_retention_until TEXT,
  created_at TEXT NOT NULL,
  CHECK (completed_at IS NULL OR completed_at >= started_at),
  CHECK ((source = 'pagespeed' AND capture_mode = 'single' AND period_key IS NULL) OR (source = 'search_console' AND capture_mode = 'comparison_pair' AND period_key IN ('28d', '90d')))
);

CREATE TABLE IF NOT EXISTS cr_run_warnings (
  run_id TEXT NOT NULL,
  ordinal INTEGER NOT NULL CHECK (ordinal >= 0 AND ordinal < 40),
  warning_code TEXT NOT NULL CHECK (length(warning_code) <= 80),
  safe_message TEXT NOT NULL CHECK (length(safe_message) <= 500),
  created_at TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT,
  PRIMARY KEY (run_id, ordinal)
);

CREATE TABLE IF NOT EXISTS cr_pagespeed_snapshots (
  run_id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  strategy TEXT NOT NULL CHECK (strategy IN ('mobile', 'desktop')),
  audited_url TEXT NOT NULL,
  final_url TEXT,
  performance_score INTEGER CHECK (performance_score BETWEEN 0 AND 100),
  accessibility_score INTEGER CHECK (accessibility_score BETWEEN 0 AND 100),
  best_practices_score INTEGER CHECK (best_practices_score BETWEEN 0 AND 100),
  seo_score INTEGER CHECK (seo_score BETWEEN 0 AND 100),
  fcp_ms INTEGER CHECK (fcp_ms IS NULL OR fcp_ms >= 0),
  lcp_ms INTEGER CHECK (lcp_ms IS NULL OR lcp_ms >= 0),
  cls_milli INTEGER CHECK (cls_milli IS NULL OR cls_milli >= 0),
  tbt_ms INTEGER CHECK (tbt_ms IS NULL OR tbt_ms >= 0),
  speed_index_ms INTEGER CHECK (speed_index_ms IS NULL OR speed_index_ms >= 0),
  lighthouse_version TEXT,
  diagnostic_count INTEGER NOT NULL CHECK (diagnostic_count >= 0 AND diagnostic_count <= 20),
  captured_at TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS cr_pagespeed_diagnostics (
  run_id TEXT NOT NULL,
  ordinal INTEGER NOT NULL CHECK (ordinal >= 0 AND ordinal < 20),
  audit_id TEXT NOT NULL CHECK (length(audit_id) <= 100),
  title TEXT NOT NULL CHECK (length(title) <= 180),
  display_value TEXT CHECK (display_value IS NULL OR length(display_value) <= 180),
  score REAL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT,
  PRIMARY KEY (run_id, ordinal)
);

CREATE TABLE IF NOT EXISTS cr_search_snapshots (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL,
  comparison_role TEXT NOT NULL CHECK (comparison_role IN ('current', 'previous')),
  property_id TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('domain', 'url-prefix')),
  period_id TEXT NOT NULL CHECK (period_id IN ('28d', '90d')),
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  timezone TEXT NOT NULL CHECK (timezone = 'America/Los_Angeles'),
  data_state TEXT NOT NULL CHECK (data_state = 'final'),
  search_type TEXT NOT NULL CHECK (search_type = 'web'),
  clicks REAL,
  impressions REAL,
  ctr REAL,
  average_position REAL,
  total_state TEXT NOT NULL CHECK (total_state IN ('success', 'empty', 'unavailable')),
  daily_state TEXT NOT NULL CHECK (daily_state IN ('success', 'empty', 'unavailable', 'error')),
  query_state TEXT NOT NULL CHECK (query_state IN ('success', 'empty', 'unavailable', 'error')),
  page_state TEXT NOT NULL CHECK (page_state IN ('success', 'empty', 'unavailable', 'error')),
  device_state TEXT NOT NULL CHECK (device_state IN ('success', 'empty', 'unavailable', 'error')),
  response_aggregation_type TEXT,
  captured_at TEXT NOT NULL,
  FOREIGN KEY (run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT,
  UNIQUE (run_id, comparison_role),
  CHECK (ctr IS NULL OR (ctr >= 0 AND ctr <= 1)),
  CHECK (average_position IS NULL OR average_position >= 0),
  CHECK (end_date >= start_date)
);

CREATE TABLE IF NOT EXISTS cr_search_daily_rows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id TEXT NOT NULL,
  reporting_date TEXT NOT NULL,
  clicks REAL NOT NULL,
  impressions REAL NOT NULL,
  ctr REAL NOT NULL,
  average_position REAL NOT NULL,
  FOREIGN KEY (snapshot_id) REFERENCES cr_search_snapshots(id) ON DELETE RESTRICT,
  UNIQUE (snapshot_id, reporting_date)
);

CREATE TABLE IF NOT EXISTS cr_search_query_rows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id TEXT NOT NULL,
  rank_in_returned_rows INTEGER NOT NULL CHECK (rank_in_returned_rows > 0 AND rank_in_returned_rows <= 50),
  query_text TEXT NOT NULL CHECK (length(query_text) <= 180),
  normalized_query_hash TEXT NOT NULL CHECK (length(normalized_query_hash) = 64),
  clicks REAL NOT NULL,
  impressions REAL NOT NULL,
  ctr REAL NOT NULL,
  average_position REAL NOT NULL,
  FOREIGN KEY (snapshot_id) REFERENCES cr_search_snapshots(id) ON DELETE RESTRICT,
  UNIQUE (snapshot_id, rank_in_returned_rows)
);

CREATE TABLE IF NOT EXISTS cr_search_page_rows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id TEXT NOT NULL,
  rank_in_returned_rows INTEGER NOT NULL CHECK (rank_in_returned_rows > 0 AND rank_in_returned_rows <= 50),
  page_url TEXT NOT NULL,
  relative_path TEXT NOT NULL,
  normalized_page_key TEXT NOT NULL,
  local_page_id TEXT,
  clicks REAL NOT NULL,
  impressions REAL NOT NULL,
  ctr REAL NOT NULL,
  average_position REAL NOT NULL,
  FOREIGN KEY (snapshot_id) REFERENCES cr_search_snapshots(id) ON DELETE RESTRICT,
  UNIQUE (snapshot_id, rank_in_returned_rows)
);

CREATE TABLE IF NOT EXISTS cr_search_device_rows (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  snapshot_id TEXT NOT NULL,
  device TEXT NOT NULL CHECK (device IN ('DESKTOP', 'MOBILE', 'TABLET')),
  clicks REAL NOT NULL,
  impressions REAL NOT NULL,
  ctr REAL NOT NULL,
  average_position REAL NOT NULL,
  FOREIGN KEY (snapshot_id) REFERENCES cr_search_snapshots(id) ON DELETE RESTRICT,
  UNIQUE (snapshot_id, device)
);

CREATE TABLE IF NOT EXISTS cr_change_events (
  id TEXT PRIMARY KEY,
  occurred_at TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('deployment', 'technical', 'content', 'seo', 'design', 'analytics', 'security', 'other')),
  title TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 120),
  summary TEXT NOT NULL CHECK (length(summary) BETWEEN 1 AND 1500),
  affected_page_id TEXT,
  affected_path TEXT,
  git_commit TEXT CHECK (git_commit IS NULL OR (length(git_commit) BETWEEN 7 AND 40)),
  worker_version_id TEXT,
  verification_state TEXT NOT NULL CHECK (verification_state IN ('confirmed', 'inferred', 'requires_verification')),
  lifecycle_state TEXT NOT NULL CHECK (lifecycle_state IN ('planned', 'implemented', 'deployed', 'reverted', 'corrected')),
  supersedes_event_id TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (supersedes_event_id) REFERENCES cr_change_events(id) ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS cr_action_evidence (
  id TEXT PRIMARY KEY,
  action_id TEXT NOT NULL CHECK (length(action_id) BETWEEN 1 AND 120),
  change_event_id TEXT,
  baseline_run_id TEXT,
  followup_run_id TEXT,
  metric_family TEXT NOT NULL CHECK (metric_family IN ('pagespeed', 'search', 'mixed', 'manual')),
  expected_outcome TEXT NOT NULL CHECK (length(expected_outcome) BETWEEN 1 AND 1500),
  observed_outcome TEXT NOT NULL CHECK (length(observed_outcome) BETWEEN 1 AND 1500),
  evaluation_status TEXT NOT NULL CHECK (evaluation_status IN ('pending', 'positive', 'negative', 'mixed', 'inconclusive')),
  verification_state TEXT NOT NULL CHECK (verification_state IN ('confirmed', 'inferred', 'requires_verification')),
  supersedes_evidence_id TEXT,
  evaluated_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (change_event_id) REFERENCES cr_change_events(id) ON DELETE RESTRICT,
  FOREIGN KEY (baseline_run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT,
  FOREIGN KEY (followup_run_id) REFERENCES cr_capture_runs(id) ON DELETE RESTRICT,
  FOREIGN KEY (supersedes_evidence_id) REFERENCES cr_action_evidence(id) ON DELETE RESTRICT,
  CHECK (baseline_run_id IS NULL OR followup_run_id IS NULL OR baseline_run_id <> followup_run_id)
);

CREATE INDEX IF NOT EXISTS idx_cr_capture_runs_source_target_completed ON cr_capture_runs(source, target_key, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_capture_runs_status_completed ON cr_capture_runs(status, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_capture_runs_created ON cr_capture_runs(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_pagespeed_target ON cr_pagespeed_snapshots(target_id, strategy, captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_search_period ON cr_search_snapshots(property_id, period_id, end_date DESC);
CREATE INDEX IF NOT EXISTS idx_cr_search_captured ON cr_search_snapshots(captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_cr_search_daily_snapshot ON cr_search_daily_rows(snapshot_id, reporting_date);
CREATE INDEX IF NOT EXISTS idx_cr_search_query_snapshot ON cr_search_query_rows(snapshot_id, rank_in_returned_rows);
CREATE INDEX IF NOT EXISTS idx_cr_search_page_snapshot ON cr_search_page_rows(snapshot_id, rank_in_returned_rows);
CREATE INDEX IF NOT EXISTS idx_cr_search_device_snapshot ON cr_search_device_rows(snapshot_id, device);
CREATE INDEX IF NOT EXISTS idx_cr_change_events_occurred ON cr_change_events(occurred_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_action_evidence_action ON cr_action_evidence(action_id, created_at DESC, id DESC);

INSERT OR IGNORE INTO cr_schema_metadata(schema_key, schema_version, migration_name, applied_at, compatibility_family)
VALUES ('control_room_history_schema', 1, '0001_create_history_foundation.sql', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), 'sqlite');
