import { isAiAnalysisStatus } from "@/lib/control-room/analyst/domain";
import { getAiAnalysisStorage } from "@/lib/control-room/analyst/storage";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { authoriseControlRoomWrite, boundedFormValue, isUuid, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function redirect(state: string) {
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/analysis-brief?state=${state}` } }));
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  const id = boundedFormValue(formRead.form, "id", 36);
  const status = boundedFormValue(formRead.form, "status", 8);
  if (!isUuid(id) || !isAiAnalysisStatus(status) || status === "draft") return redirect("invalid-review");
  const storage = await getAiAnalysisStorage();
  if (storage.status !== "ready") return redirect("storage-unavailable");
  try {
    return redirect(await storage.repository.review({ id, status, reviewedAt: new Date().toISOString() }) ? `draft-${status}` : "draft-not-found");
  } catch {
    return redirect("review-failed");
  }
}
