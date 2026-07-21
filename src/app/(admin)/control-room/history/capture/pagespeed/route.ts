import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { capturePageSpeed } from "@/lib/control-room/history/capture-service";
import { authoriseControlRoomWrite, boundedFormValue, isUuid, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function response(status: number, message = "Request unavailable.") { return withPrivateResponseHeaders(new Response(message, { status })); }

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return response(authorised.status);
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return response(formRead.status);
  const form = formRead.form;
  const runId = boundedFormValue(form, "runId", 36);
  const targetId = boundedFormValue(form, "targetId", 120);
  const strategy = boundedFormValue(form, "strategy", 10);
  if (!isUuid(runId) || !targetId || (strategy !== "mobile" && strategy !== "desktop")) return response(400);
  const outcome = await capturePageSpeed({ runId, targetId, strategy });
  const location = outcome.status === "storage-unavailable" ? "/control-room/history?state=storage-unavailable" : `/control-room/history/${outcome.runId}`;
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: location } }));
}
