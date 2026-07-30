import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { PortableBackupDatabase } from "./portable-backup";

export type BackupStorageState =
  | { status: "ready"; database: PortableBackupDatabase }
  | { status: "unavailable"; reason: string };

export async function getBackupStorage(): Promise<BackupStorageState> {
  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as CloudflareEnv & { CONTROL_ROOM_DB?: unknown };
    const database = env.CONTROL_ROOM_DB;
    if (!database || typeof database !== "object" || typeof (database as Partial<PortableBackupDatabase>).prepare !== "function") return { status: "unavailable", reason: "Backup source storage is not configured in this environment." };
    return { status: "ready", database: database as PortableBackupDatabase };
  } catch {
    return { status: "unavailable", reason: "Backup source storage is not available in this environment." };
  }
}
