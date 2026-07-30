import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import { D1AnalyticsRepository } from "./d1-repository";
import type { AnalyticsRepository } from "./repository";

export async function getAnalyticsStorage(): Promise<{ status: "ready"; repository: AnalyticsRepository } | { status: "unavailable"; reason: string }> {
  try {
    const binding = (await getCloudflareContext({ async: true })).env.CONTROL_ROOM_DB as unknown;
    const candidate = binding as Partial<D1DatabaseLike>;
    return candidate && typeof candidate.prepare === "function" && typeof candidate.batch === "function" ? { status: "ready", repository: new D1AnalyticsRepository(binding as D1DatabaseLike) } : { status: "unavailable", reason: "Analytics evidence storage is not configured." };
  } catch { return { status: "unavailable", reason: "Analytics evidence storage is unavailable." }; }
}
