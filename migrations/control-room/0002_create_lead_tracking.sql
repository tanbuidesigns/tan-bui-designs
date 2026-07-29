CREATE TABLE IF NOT EXISTS cr_leads (
  id TEXT PRIMARY KEY CHECK (length(id) = 36),
  name TEXT NOT NULL CHECK (length(name) BETWEEN 2 AND 120),
  email TEXT NOT NULL CHECK (length(email) BETWEEN 3 AND 254),
  services_json TEXT NOT NULL CHECK (json_valid(services_json) AND json_type(services_json) = 'array'),
  source_path TEXT NOT NULL CHECK (length(source_path) BETWEEN 1 AND 300 AND substr(source_path, 1, 1) = '/'),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'active', 'proposal', 'won', 'closed')),
  follow_up_on TEXT CHECK (
    follow_up_on IS NULL
    OR (length(follow_up_on) = 10 AND date(follow_up_on) IS NOT NULL AND date(follow_up_on) = follow_up_on)
  ),
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  closed_at TEXT,
  retention_delete_after TEXT,
  CHECK (
    (status = 'closed' AND closed_at IS NOT NULL AND retention_delete_after IS NOT NULL)
    OR
    (status <> 'closed' AND closed_at IS NULL AND retention_delete_after IS NULL)
  )
) STRICT;

CREATE INDEX IF NOT EXISTS idx_cr_leads_created ON cr_leads(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_leads_status_created ON cr_leads(status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_leads_follow_up ON cr_leads(follow_up_on, status);
CREATE INDEX IF NOT EXISTS idx_cr_leads_retention ON cr_leads(retention_delete_after) WHERE status = 'closed';

INSERT INTO cr_schema_metadata(schema_key, schema_version, migration_name, applied_at, compatibility_family)
VALUES ('control_room_history_schema', 2, '0002_create_lead_tracking.sql', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), 'sqlite')
ON CONFLICT(schema_key) DO UPDATE SET
  schema_version = excluded.schema_version,
  migration_name = excluded.migration_name,
  applied_at = excluded.applied_at,
  compatibility_family = excluded.compatibility_family;
