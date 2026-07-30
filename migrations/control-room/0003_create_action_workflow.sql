CREATE TABLE IF NOT EXISTS cr_action_workflow (
  action_id TEXT PRIMARY KEY CHECK (length(action_id) BETWEEN 1 AND 120),
  source_kind TEXT NOT NULL CHECK (source_kind IN ('baseline', 'custom')),
  status TEXT NOT NULL CHECK (status IN ('backlog', 'ready', 'in-progress', 'blocked', 'review', 'done')),
  assigned_owner TEXT CHECK (assigned_owner IS NULL OR length(assigned_owner) BETWEEN 1 AND 120),
  title TEXT CHECK (title IS NULL OR length(title) BETWEEN 1 AND 160),
  description TEXT CHECK (description IS NULL OR length(description) BETWEEN 1 AND 1500),
  category TEXT CHECK (category IS NULL OR category IN ('SEO', 'Content', 'Performance', 'Security', 'Analytics', 'Infrastructure', 'Accessibility', 'Privacy', 'Conversion')),
  priority TEXT CHECK (priority IS NULL OR priority IN ('critical', 'high', 'medium', 'low')),
  effort TEXT CHECK (effort IS NULL OR effort IN ('small', 'medium', 'large', 'requires-discovery')),
  affected_area TEXT CHECK (affected_area IS NULL OR length(affected_area) BETWEEN 1 AND 300),
  success_measure TEXT CHECK (success_measure IS NULL OR length(success_measure) BETWEEN 1 AND 500),
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (
    (source_kind = 'baseline' AND title IS NULL AND description IS NULL AND category IS NULL AND priority IS NULL AND effort IS NULL AND affected_area IS NULL AND success_measure IS NULL)
    OR
    (source_kind = 'custom' AND title IS NOT NULL AND description IS NOT NULL AND category IS NOT NULL AND priority IS NOT NULL AND effort IS NOT NULL AND affected_area IS NOT NULL AND success_measure IS NOT NULL)
  ),
  CHECK ((status = 'done' AND completed_at IS NOT NULL) OR (status <> 'done' AND completed_at IS NULL))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_cr_action_workflow_status_updated ON cr_action_workflow(status, updated_at DESC, action_id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_action_workflow_owner_updated ON cr_action_workflow(assigned_owner, updated_at DESC) WHERE assigned_owner IS NOT NULL;

INSERT INTO cr_schema_metadata(schema_key, schema_version, migration_name, applied_at, compatibility_family)
VALUES ('control_room_history_schema', 3, '0003_create_action_workflow.sql', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), 'sqlite')
ON CONFLICT(schema_key) DO UPDATE SET
  schema_version = excluded.schema_version,
  migration_name = excluded.migration_name,
  applied_at = excluded.applied_at,
  compatibility_family = excluded.compatibility_family;
