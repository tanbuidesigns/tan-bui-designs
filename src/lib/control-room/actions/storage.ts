import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import { D1ActionWorkflowRepository } from "./d1-repository";
import type { ActionWorkflowRepository } from "./repository";

export type ActionWorkflowStorage = { status: "ready"; repository: ActionWorkflowRepository } | { status: "unavailable"; reason: string };

function isD1(value: unknown): value is D1DatabaseLike {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<D1DatabaseLike>;
  return typeof candidate.prepare === "function" && typeof candidate.batch === "function";
}

export async function getActionWorkflowStorage(): Promise<ActionWorkflowStorage> {
  try {
    const context = await getCloudflareContext({ async: true });
    const binding = (context.env as CloudflareEnv & { CONTROL_ROOM_DB?: unknown }).CONTROL_ROOM_DB;
    return isD1(binding) ? { status: "ready", repository: new D1ActionWorkflowRepository(binding) } : { status: "unavailable", reason: "Action workflow storage is not configured." };
  } catch {
    return { status: "unavailable", reason: "Action workflow storage is unavailable." };
  }
}
