import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type BackupStorageState =
  | { status: "ready"; bucket: R2Bucket }
  | { status: "unavailable"; reason: string };

export async function getBackupStorage(): Promise<BackupStorageState> {
  try {
    const context = await getCloudflareContext({ async: true });
    const bucket = (context.env as CloudflareEnv & { CONTROL_ROOM_BACKUPS?: unknown }).CONTROL_ROOM_BACKUPS;
    if (!bucket || typeof bucket !== "object" || typeof (bucket as Partial<R2Bucket>).put !== "function" || typeof (bucket as Partial<R2Bucket>).get !== "function") {
      return { status: "unavailable", reason: "Private backup storage is not configured in this environment." };
    }
    return { status: "ready", bucket: bucket as R2Bucket };
  } catch {
    return { status: "unavailable", reason: "Private backup storage is not available in this environment." };
  }
}
