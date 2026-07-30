import { writePortableControlRoomBackup } from "@/lib/control-room/backups/r2-backup";
import { getBackupStorage } from "@/lib/control-room/backups/storage";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { authoriseControlRoomWrite, boundedFormValue, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function redirect(state: string) {
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/operations?backup=${state}` } }));
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  if (boundedFormValue(formRead.form, "intent", 6) !== "create") return redirect("invalid");
  const storage = await getBackupStorage();
  if (storage.status !== "ready") return redirect("storage-unavailable");
  try {
    await writePortableControlRoomBackup({ database: storage.database, bucket: storage.bucket, generatedAt: new Date().toISOString() });
    return redirect("created-and-verified");
  } catch {
    return redirect("failed");
  }
}
