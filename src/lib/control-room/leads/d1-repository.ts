import "server-only";

import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";

import {
  emptyLeadStatusCounts,
  parseStoredServices,
  type LeadRecord,
  type LeadStatus,
  type LeadStatusCounts,
  type NewLeadInput,
} from "./domain";
import type { LeadRepository } from "./repository";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  services_json: string;
  source_path: string;
  status: LeadStatus;
  follow_up_on: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  retention_delete_after: string | null;
};

function leadFromRow(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    services: parseStoredServices(row.services_json),
    sourcePath: row.source_path,
    status: row.status,
    followUpOn: row.follow_up_on,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    closedAt: row.closed_at,
    retentionDeleteAfter: row.retention_delete_after,
  };
}

export class D1LeadRepository implements LeadRepository {
  constructor(private readonly db: D1DatabaseLike) {}

  async create(input: NewLeadInput): Promise<void> {
    await this.db
      .prepare(
        `INSERT INTO cr_leads(
          id, name, email, services_json, source_path, status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'new', ?, ?)`,
      )
      .bind(
        input.id,
        input.name,
        input.email,
        JSON.stringify(input.services),
        input.sourcePath,
        input.createdAt,
        input.createdAt,
      )
      .run();
  }

  async list(input: {
    status: LeadStatus | null;
    limit: number;
  }): Promise<readonly LeadRecord[]> {
    const limit = Math.max(1, Math.min(100, Math.floor(input.limit)));
    const result = input.status
      ? await this.db
          .prepare(
            `SELECT id, name, email, services_json, source_path, status, follow_up_on,
              created_at, updated_at, closed_at, retention_delete_after
            FROM cr_leads
            WHERE status = ?
            ORDER BY created_at DESC, id DESC
            LIMIT ?`,
          )
          .bind(input.status, limit)
          .all<LeadRow>()
      : await this.db
          .prepare(
            `SELECT id, name, email, services_json, source_path, status, follow_up_on,
              created_at, updated_at, closed_at, retention_delete_after
            FROM cr_leads
            ORDER BY created_at DESC, id DESC
            LIMIT ?`,
          )
          .bind(limit)
          .all<LeadRow>();

    return result.results.map(leadFromRow);
  }

  async countByStatus(): Promise<LeadStatusCounts> {
    const result = await this.db
      .prepare("SELECT status, COUNT(*) AS total FROM cr_leads GROUP BY status")
      .all<{ status: LeadStatus; total: number }>();
    const counts = emptyLeadStatusCounts();
    for (const row of result.results) counts[row.status] = row.total;
    return counts;
  }

  async update(input: {
    id: string;
    status: LeadStatus;
    followUpOn: string | null;
    updatedAt: string;
    retentionDeleteAfter: string | null;
  }): Promise<boolean> {
    const closed = input.status === "closed";
    const result = await this.db
      .prepare(
        `UPDATE cr_leads
        SET status = ?,
            follow_up_on = ?,
            updated_at = ?,
            closed_at = CASE WHEN ? = 'closed' THEN COALESCE(closed_at, ?) ELSE NULL END,
            retention_delete_after = CASE WHEN ? = 'closed' THEN COALESCE(retention_delete_after, ?) ELSE NULL END
        WHERE id = ?`,
      )
      .bind(
        input.status,
        closed || input.status === "won" ? null : input.followUpOn,
        input.updatedAt,
        input.status,
        input.updatedAt,
        input.status,
        input.retentionDeleteAfter,
        input.id,
      )
      .run();
    return (result.meta.changes ?? 0) === 1;
  }

  async purgeExpired(now: string, limit: number): Promise<number> {
    const boundedLimit = Math.max(1, Math.min(100, Math.floor(limit)));
    const result = await this.db
      .prepare(
        `DELETE FROM cr_leads
        WHERE id IN (
          SELECT id FROM cr_leads
          WHERE status = 'closed' AND retention_delete_after <= ?
          ORDER BY retention_delete_after ASC
          LIMIT ?
        )`,
      )
      .bind(now, boundedLimit)
      .run();
    return result.meta.changes ?? 0;
  }
}
