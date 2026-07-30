import type { ActionRecord } from "@/types/control-room";
import type { ActionWorkflowRecord } from "./domain";

export function mergeActionWorkflow(baseline: readonly ActionRecord[], workflow: readonly ActionWorkflowRecord[]): readonly ActionRecord[] {
  const byId = new Map(workflow.map((record) => [record.actionId, record]));
  const merged = baseline.map((action) => {
    const record = byId.get(action.id);
    if (!record) return action;
    return { ...action, status: record.status, suggestedOwner: record.assignedOwner ?? action.suggestedOwner };
  });
  const custom = workflow.filter((record) => record.sourceKind === "custom").map((record): ActionRecord => ({
    id: record.actionId,
    title: record.title ?? "Untitled custom action",
    category: record.category ?? "Infrastructure",
    affectedArea: record.affectedArea ?? "Not recorded",
    problemOrOpportunity: record.description ?? "Not recorded for this custom action.",
    reason: "Recorded directly by the site owner in the Control Room.",
    businessImpact: "Not recorded for this custom action.",
    userImpact: "Not recorded for this custom action.",
    technicalRelevance: "Not recorded for this custom action.",
    priority: record.priority ?? "medium",
    effort: record.effort ?? "requires-discovery",
    dependency: "No dependency recorded.",
    suggestedOwner: record.assignedOwner ?? "Unassigned",
    approvalRequired: false,
    externalAccessRequired: false,
    status: record.status,
    successMeasure: record.successMeasure ?? "Not recorded",
    verificationStatus: "requires-verification",
    source: "manual-hypothesis",
    evidencePaths: [],
    notes: `Created in the private Control Room on ${record.createdAt}. Last updated ${record.updatedAt}.`,
  }));
  return [...merged, ...custom];
}
