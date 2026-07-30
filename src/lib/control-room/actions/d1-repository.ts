import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import type { ActionWorkflowRecord } from "./domain";
import type { ActionWorkflowRepository } from "./repository";

type ActionWorkflowRow = {
  action_id: string; source_kind: "baseline" | "custom"; status: ActionWorkflowRecord["status"]; assigned_owner: string | null;
  title: string | null; description: string | null; category: ActionWorkflowRecord["category"]; priority: ActionWorkflowRecord["priority"];
  effort: ActionWorkflowRecord["effort"]; affected_area: string | null; success_measure: string | null; completed_at: string | null; created_at: string; updated_at: string;
};

function fromRow(row: ActionWorkflowRow): ActionWorkflowRecord {
  return { actionId: row.action_id, sourceKind: row.source_kind, status: row.status, assignedOwner: row.assigned_owner, title: row.title, description: row.description, category: row.category, priority: row.priority, effort: row.effort, affectedArea: row.affected_area, successMeasure: row.success_measure, completedAt: row.completed_at, createdAt: row.created_at, updatedAt: row.updated_at };
}

export class D1ActionWorkflowRepository implements ActionWorkflowRepository {
  constructor(private readonly db: D1DatabaseLike) {}

  async list(): Promise<readonly ActionWorkflowRecord[]> {
    const result = await this.db.prepare("SELECT * FROM cr_action_workflow ORDER BY updated_at DESC, action_id DESC LIMIT 500").all<ActionWorkflowRow>();
    return result.results.map(fromRow);
  }

  async updateBaseline(input: { actionId: string; status: ActionWorkflowRecord["status"]; assignedOwner: string | null; updatedAt: string }): Promise<void> {
    await this.db.prepare(`INSERT INTO cr_action_workflow(action_id, source_kind, status, assigned_owner, completed_at, created_at, updated_at)
      VALUES (?, 'baseline', ?, ?, CASE WHEN ? = 'done' THEN ? ELSE NULL END, ?, ?)
      ON CONFLICT(action_id) DO UPDATE SET status = excluded.status, assigned_owner = excluded.assigned_owner, completed_at = CASE WHEN excluded.status = 'done' THEN COALESCE(cr_action_workflow.completed_at, excluded.updated_at) ELSE NULL END, updated_at = excluded.updated_at`)
      .bind(input.actionId, input.status, input.assignedOwner, input.status, input.updatedAt, input.updatedAt, input.updatedAt).run();
  }

  async updateExisting(input: { actionId: string; status: ActionWorkflowRecord["status"]; assignedOwner: string | null; updatedAt: string }): Promise<boolean> {
    const result = await this.db.prepare("UPDATE cr_action_workflow SET status = ?, assigned_owner = ?, completed_at = CASE WHEN ? = 'done' THEN COALESCE(completed_at, ?) ELSE NULL END, updated_at = ? WHERE action_id = ?")
      .bind(input.status, input.assignedOwner, input.status, input.updatedAt, input.updatedAt, input.actionId).run();
    return (result.meta.changes ?? 0) === 1;
  }

  async createCustom(input: Parameters<ActionWorkflowRepository["createCustom"]>[0]): Promise<void> {
    await this.db.prepare(`INSERT INTO cr_action_workflow(action_id, source_kind, status, assigned_owner, title, description, category, priority, effort, affected_area, success_measure, completed_at, created_at, updated_at)
      VALUES (?, 'custom', ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'done' THEN ? ELSE NULL END, ?, ?)`)
      .bind(input.actionId, input.status, input.assignedOwner, input.title, input.description, input.category, input.priority, input.effort, input.affectedArea, input.successMeasure, input.status, input.createdAt, input.createdAt, input.createdAt).run();
  }
}
