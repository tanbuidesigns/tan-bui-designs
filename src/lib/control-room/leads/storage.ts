import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";

import { D1LeadRepository } from "./d1-repository";
import type { LeadRepository } from "./repository";

export type LeadStorageState =
  | { status: "ready"; repository: LeadRepository }
  | { status: "unavailable"; reason: string }
  | { status: "invalid-binding"; reason: string };

function isD1Database(value: unknown): value is D1DatabaseLike {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<D1DatabaseLike>;
  return (
    typeof candidate.prepare === "function" &&
    typeof candidate.batch === "function"
  );
}

export async function getLeadStorage(): Promise<LeadStorageState> {
  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as CloudflareEnv & { CONTROL_ROOM_DB?: unknown };
    const binding = env.CONTROL_ROOM_DB;
    if (binding === undefined) {
      return {
        status: "unavailable",
        reason: "Lead storage is not configured in this environment.",
      };
    }
    if (!isD1Database(binding)) {
      return {
        status: "invalid-binding",
        reason: "Lead storage is configured incorrectly.",
      };
    }
    return { status: "ready", repository: new D1LeadRepository(binding) };
  } catch {
    return {
      status: "unavailable",
      reason: "Lead storage is not available in this environment.",
    };
  }
}
