import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

import { D1ControlRoomHistoryRepository, type D1DatabaseLike } from "./d1-repository";
import type { ControlRoomHistoryRepository } from "./repository";

export type HistoryStorageState =
  | { status: "ready"; repository: ControlRoomHistoryRepository }
  | { status: "unavailable"; reason: string }
  | { status: "invalid-binding"; reason: string };

function isD1Database(value: unknown): value is D1DatabaseLike {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<D1DatabaseLike>;
  return typeof candidate.prepare === "function" && typeof candidate.batch === "function";
}

export async function getHistoryStorage(): Promise<HistoryStorageState> {
  try {
    const context = await getCloudflareContext({ async: true });
    const binding = (context.env as CloudflareEnv & { CONTROL_ROOM_DB?: unknown }).CONTROL_ROOM_DB;
    if (binding === undefined) {
      return { status: "unavailable", reason: "History storage is not configured in this environment." };
    }
    if (!isD1Database(binding)) {
      return { status: "invalid-binding", reason: "History storage is configured incorrectly." };
    }
    return { status: "ready", repository: new D1ControlRoomHistoryRepository(binding) };
  } catch {
    return { status: "unavailable", reason: "History storage is not available in this environment." };
  }
}
