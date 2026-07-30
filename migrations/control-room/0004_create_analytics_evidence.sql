CREATE TABLE IF NOT EXISTS cr_analytics_snapshots (
  id TEXT PRIMARY KEY CHECK (length(id) = 36),
  source TEXT NOT NULL CHECK (source = 'cloudflare-web-analytics'),
  period_start TEXT NOT NULL CHECK (length(period_start) = 10 AND date(period_start) = period_start),
  period_end TEXT NOT NULL CHECK (length(period_end) = 10 AND date(period_end) = period_end),
  page_views INTEGER NOT NULL CHECK (page_views >= 0),
  visits INTEGER NOT NULL CHECK (visits >= 0),
  lcp_p75_ms INTEGER CHECK (lcp_p75_ms IS NULL OR lcp_p75_ms >= 0),
  inp_p75_ms INTEGER CHECK (inp_p75_ms IS NULL OR inp_p75_ms >= 0),
  cls_p75_milli INTEGER CHECK (cls_p75_milli IS NULL OR cls_p75_milli >= 0),
  notes TEXT CHECK (notes IS NULL OR length(notes) <= 500),
  created_at TEXT NOT NULL,
  CHECK (period_end >= period_start)
) STRICT;

CREATE INDEX IF NOT EXISTS idx_cr_analytics_period ON cr_analytics_snapshots(period_end DESC, created_at DESC);

INSERT INTO cr_schema_metadata(schema_key, schema_version, migration_name, applied_at, compatibility_family)
VALUES ('control_room_history_schema', 4, '0004_create_analytics_evidence.sql', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), 'sqlite')
ON CONFLICT(schema_key) DO UPDATE SET schema_version = excluded.schema_version, migration_name = excluded.migration_name, applied_at = excluded.applied_at, compatibility_family = excluded.compatibility_family;
