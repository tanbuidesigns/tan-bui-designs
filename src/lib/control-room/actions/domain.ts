import type { ActionCategory, EffortLevel, ReviewPriority, WorkflowStatus } from "@/types/control-room";

export const workflowStatuses = ["backlog", "ready", "in-progress", "blocked", "review", "done"] as const;
export const actionCategories = ["SEO", "Content", "Performance", "Security", "Analytics", "Infrastructure", "Accessibility", "Privacy", "Conversion"] as const;
export const actionPriorities = ["critical", "high", "medium", "low"] as const;
export const effortLevels = ["small", "medium", "large", "requires-discovery"] as const;

export function isWorkflowStatus(value: string | null): value is WorkflowStatus { return workflowStatuses.includes(value as WorkflowStatus); }
export function isActionCategory(value: string | null): value is ActionCategory { return actionCategories.includes(value as ActionCategory); }
export function isActionPriority(value: string | null): value is ReviewPriority { return actionPriorities.includes(value as ReviewPriority); }
export function isEffortLevel(value: string | null): value is EffortLevel { return effortLevels.includes(value as EffortLevel); }

export type ActionWorkflowRecord = {
  actionId: string;
  sourceKind: "baseline" | "custom";
  status: WorkflowStatus;
  assignedOwner: string | null;
  title: string | null;
  description: string | null;
  category: ActionCategory | null;
  priority: ReviewPriority | null;
  effort: EffortLevel | null;
  affectedArea: string | null;
  successMeasure: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
