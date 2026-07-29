export const CONTROL_ROOM_CRONS = {
  leadRetention: "17 4 * * *",
  search28Days: "31 5 * * *",
  search90Days: "13 6 * * SUN",
  homePageSpeedMobile: "47 6 * * MON",
} as const;

export type ScheduledControlRoomTask =
  | { kind: "lead-retention" }
  | { kind: "search-comparison"; periodId: "28d" | "90d" }
  | { kind: "pagespeed"; targetId: "performance-home"; strategy: "mobile" };

export function resolveScheduledControlRoomTask(cron: string): ScheduledControlRoomTask | null {
  switch (cron) {
    case CONTROL_ROOM_CRONS.leadRetention:
      return { kind: "lead-retention" };
    case CONTROL_ROOM_CRONS.search28Days:
      return { kind: "search-comparison", periodId: "28d" };
    case CONTROL_ROOM_CRONS.search90Days:
      return { kind: "search-comparison", periodId: "90d" };
    case CONTROL_ROOM_CRONS.homePageSpeedMobile:
      return { kind: "pagespeed", targetId: "performance-home", strategy: "mobile" };
    default:
      return null;
  }
}

function taskKey(task: Exclude<ScheduledControlRoomTask, { kind: "lead-retention" }>): string {
  if (task.kind === "search-comparison") return `search-console:${task.periodId}`;
  return `pagespeed:${task.targetId}:${task.strategy}`;
}

function hexadecimal(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function scheduledCaptureIdentity(
  task: Exclude<ScheduledControlRoomTask, { kind: "lead-retention" }>,
  scheduledTime: number,
): Promise<{ runId: string; idempotencyKey: string; startedAt: string }> {
  const startedAt = new Date(scheduledTime).toISOString();
  const idempotencyKey = `scheduled:${taskKey(task)}:${startedAt}`;
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(idempotencyKey)));
  const uuidBytes = digest.slice(0, 16);
  uuidBytes[6] = (uuidBytes[6] & 0x0f) | 0x50;
  uuidBytes[8] = (uuidBytes[8] & 0x3f) | 0x80;
  const value = hexadecimal(uuidBytes);
  const runId = `${value.slice(0, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}-${value.slice(16, 20)}-${value.slice(20)}`;
  return { runId, idempotencyKey, startedAt };
}
