import "server-only";

import type {
  LeadRecord,
  LeadStatus,
  LeadStatusCounts,
  NewLeadInput,
} from "./domain";

export interface LeadRepository {
  create(input: NewLeadInput): Promise<void>;
  list(input: { status: LeadStatus | null; limit: number }): Promise<readonly LeadRecord[]>;
  countByStatus(): Promise<LeadStatusCounts>;
  update(input: {
    id: string;
    status: LeadStatus;
    followUpOn: string | null;
    updatedAt: string;
    retentionDeleteAfter: string | null;
  }): Promise<boolean>;
  purgeExpired(now: string, limit: number): Promise<number>;
}
