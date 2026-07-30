CREATE TABLE IF NOT EXISTS cr_ai_analyses (
  id TEXT PRIMARY KEY CHECK (length(id) = 36),
  period_id TEXT NOT NULL CHECK (period_id IN ('28d', '90d')),
  page_evidence_included INTEGER NOT NULL CHECK (page_evidence_included IN (0, 1)),
  source_packet_hash TEXT NOT NULL CHECK (length(source_packet_hash) = 64),
  source_packet_generated_at TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider = 'cloudflare-workers-ai'),
  model TEXT NOT NULL CHECK (length(model) BETWEEN 1 AND 120),
  prompt_version INTEGER NOT NULL CHECK (prompt_version = 1),
  status TEXT NOT NULL CHECK (status IN ('draft', 'approved', 'rejected')),
  draft_json TEXT NOT NULL CHECK (json_valid(draft_json) AND json_type(draft_json) = 'object' AND length(draft_json) <= 30000),
  evidence_references_json TEXT NOT NULL CHECK (json_valid(evidence_references_json) AND json_type(evidence_references_json) = 'array' AND length(evidence_references_json) <= 16000),
  input_tokens INTEGER CHECK (input_tokens IS NULL OR input_tokens >= 0),
  output_tokens INTEGER CHECK (output_tokens IS NULL OR output_tokens >= 0),
  created_at TEXT NOT NULL,
  reviewed_at TEXT,
  CHECK ((status = 'draft' AND reviewed_at IS NULL) OR (status IN ('approved', 'rejected') AND reviewed_at IS NOT NULL))
) STRICT;

CREATE INDEX IF NOT EXISTS idx_cr_ai_analyses_created ON cr_ai_analyses(created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_cr_ai_analyses_status ON cr_ai_analyses(status, created_at DESC);

INSERT INTO cr_schema_metadata(schema_key, schema_version, migration_name, applied_at, compatibility_family)
VALUES ('control_room_history_schema', 5, '0005_create_ai_analyses.sql', strftime('%Y-%m-%dT%H:%M:%fZ', 'now'), 'sqlite')
ON CONFLICT(schema_key) DO UPDATE SET schema_version = excluded.schema_version, migration_name = excluded.migration_name, applied_at = excluded.applied_at, compatibility_family = excluded.compatibility_family;
