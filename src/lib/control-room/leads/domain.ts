export const leadStatuses = [
  "new",
  "contacted",
  "active",
  "proposal",
  "won",
  "closed",
] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  services: readonly string[];
  sourcePath: string;
  status: LeadStatus;
  followUpOn: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  retentionDeleteAfter: string | null;
};

export type NewLeadInput = Pick<
  LeadRecord,
  "id" | "name" | "email" | "services" | "sourcePath" | "createdAt"
>;

export type LeadStatusCounts = Record<LeadStatus, number>;

export function emptyLeadStatusCounts(): LeadStatusCounts {
  return {
    new: 0,
    contacted: 0,
    active: 0,
    proposal: 0,
    won: 0,
    closed: 0,
  };
}

export function isLeadStatus(value: string | null): value is LeadStatus {
  return Boolean(value && leadStatuses.some((status) => status === value));
}

export function leadRetentionDeleteAfter(closedAt: string): string {
  const date = new Date(closedAt);
  date.setUTCFullYear(date.getUTCFullYear() + 1);
  return date.toISOString();
}

export function isIsoCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function parseStoredServices(value: string): readonly string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((service): service is string => typeof service === "string")
      : [];
  } catch {
    return [];
  }
}
