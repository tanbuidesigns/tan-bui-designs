import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { captureSearchComparison } from "@/lib/control-room/history/capture-service";
import { authoriseControlRoomWrite, boundedFormValue, isUuid, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function response(status: number, message = "Request unavailable.") { return withPrivateResponseHeaders(new Response(message, { status })); }

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return response(authorised.status);
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return response(formRead.status);
  const form = formRead.form;
  const runId = boundedFormValue(form, "runId", 36);
  const periodId = boundedFormValue(form, "periodId", 3);
  if (!isUuid(runId) || (periodId !== "28d" && periodId !== "90d")) return response(400);
  const outcome = await captureSearchComparison({ runId, periodId });
  const location = outcome.status === "storage-unavailable" ? "/control-room/history?state=storage-unavailable" : `/control-room/history/${outcome.runId}`;
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: location } }));
}
