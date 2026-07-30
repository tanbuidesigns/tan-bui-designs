import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import { D1AiAnalysisRepository } from "./d1-repository";
import type { AiAnalysisRepository } from "./repository";
import type { WorkersAiLike } from "./service";

export type AiAnalysisStorage =
  | { status: "ready"; repository: AiAnalysisRepository; ai: WorkersAiLike }
  | { status: "unavailable"; reason: string };

function isD1(value: unknown): value is D1DatabaseLike {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<D1DatabaseLike>;
  return typeof candidate.prepare === "function" && typeof candidate.batch === "function";
}

function isAi(value: unknown): value is WorkersAiLike {
  return Boolean(value && typeof value === "object" && typeof (value as Partial<WorkersAiLike>).run === "function");
}

export async function getAiAnalysisStorage(): Promise<AiAnalysisStorage> {
  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as CloudflareEnv & { CONTROL_ROOM_DB?: unknown; AI?: unknown };
    if (!isD1(env.CONTROL_ROOM_DB)) return { status: "unavailable", reason: "AI draft history storage is not configured." };
    if (!isAi(env.AI)) return { status: "unavailable", reason: "The server-only Workers AI binding is not configured." };
    return { status: "ready", repository: new D1AiAnalysisRepository(env.CONTROL_ROOM_DB), ai: env.AI };
  } catch {
    return { status: "unavailable", reason: "The AI analyst runtime is unavailable." };
  }
}
