import {
  createPortableControlRoomBackup,
  validatePortableControlRoomBackup,
} from "@/lib/control-room/backups/portable-backup";
import { getBackupStorage } from "@/lib/control-room/backups/storage";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { authoriseControlRoomRead } from "@/lib/control-room/history/request-security";

function reply(body: BodyInit | null, status: number, headers?: HeadersInit) {
  return withPrivateResponseHeaders(new Response(body, { status, headers }));
}

function backupFilename(generatedAt: string) {
  return `tan-bui-control-room-backup-${generatedAt.replaceAll(":", "-")}.json`;
}

export async function GET(request: Request) {
  const authorised = await authoriseControlRoomRead(request);
  if (!authorised.ok) return reply("Request unavailable.", authorised.status);

  const storage = await getBackupStorage();
  if (storage.status !== "ready") return reply("Backup unavailable.", 503);

  try {
    const generatedAt = new Date().toISOString();
    const created = await createPortableControlRoomBackup(
      storage.database,
      generatedAt,
    );
    const verified = await validatePortableControlRoomBackup(created.text);
    if (verified.integrity.payloadDigest !== created.backup.integrity.payloadDigest) {
      throw new Error("Backup verification failed.");
    }

    return reply(created.text, 200, {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${backupFilename(generatedAt)}"`,
      "Cross-Origin-Resource-Policy": "same-origin",
    });
  } catch {
    return reply("Backup unavailable.", 503);
  }
}
