import type { ActionRecord, ReviewPriority, VerificationStatus, WorkflowStatus } from "@/types/control-room";

const priorityWeight: Record<ReviewPriority, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const verificationWeight: Record<VerificationStatus, number> = { confirmed: 0, inferred: 1, "requires-verification": 2 };
const statusWeight: Record<WorkflowStatus, number> = { ready: 0, "in-progress": 1, review: 2, backlog: 3, blocked: 4, done: 5 };
const effortWeight = { small: 0, medium: 1, large: 2, "requires-discovery": 3 } as const;

export function sortActions(actions: readonly ActionRecord[]): ActionRecord[] {
  return [...actions].sort((a, b) =>
    priorityWeight[a.priority] - priorityWeight[b.priority]
    || verificationWeight[a.verificationStatus] - verificationWeight[b.verificationStatus]
    || statusWeight[a.status] - statusWeight[b.status]
    || effortWeight[a.effort] - effortWeight[b.effort]
    || a.title.localeCompare(b.title),
  );
}
