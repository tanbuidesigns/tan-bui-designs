import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { PortableBackupDatabase } from "./portable-backup";

export type BackupStorageState =
  | { status: "ready"; bucket: R2Bucket; database: PortableBackupDatabase }
  | { status: "unavailable"; reason: string };

export async function getBackupStorage(): Promise<BackupStorageState> {
  try {
    const context = await getCloudflareContext({ async: true });
    const env = context.env as CloudflareEnv & { CONTROL_ROOM_BACKUPS?: unknown; CONTROL_ROOM_DB?: unknown };
    const bucket = env.CONTROL_ROOM_BACKUPS;
    const database = env.CONTROL_ROOM_DB;
    if (!bucket || typeof bucket !== "object" || typeof (bucket as Partial<R2Bucket>).put !== "function" || typeof (bucket as Partial<R2Bucket>).get !== "function") {
      return { status: "unavailable", reason: "Private backup storage is not configured in this environment." };
    }
    if (!database || typeof database !== "object" || typeof (database as Partial<PortableBackupDatabase>).prepare !== "function") return { status: "unavailable", reason: "Backup source storage is not configured in this environment." };
    return { status: "ready", bucket: bucket as R2Bucket, database: database as PortableBackupDatabase };
  } catch {
    return { status: "unavailable", reason: "Private backup storage is not available in this environment." };
  }
}
