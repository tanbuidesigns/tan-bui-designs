import type { ActionCategory, EffortLevel, ReviewPriority, WorkflowStatus } from "@/types/control-room";
import type { ActionWorkflowRecord } from "./domain";

export interface ActionWorkflowRepository {
  list(): Promise<readonly ActionWorkflowRecord[]>;
  updateBaseline(input: { actionId: string; status: WorkflowStatus; assignedOwner: string | null; updatedAt: string }): Promise<void>;
  updateExisting(input: { actionId: string; status: WorkflowStatus; assignedOwner: string | null; updatedAt: string }): Promise<boolean>;
  createCustom(input: { actionId: string; title: string; description: string; category: ActionCategory; priority: ReviewPriority; effort: EffortLevel; affectedArea: string; successMeasure: string; status: WorkflowStatus; assignedOwner: string | null; createdAt: string }): Promise<void>;
}
