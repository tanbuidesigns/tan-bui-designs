import { actionRegister } from "@/data/control-room/actions";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { isWorkflowStatus } from "@/lib/control-room/actions/domain";
import { getActionWorkflowStorage } from "@/lib/control-room/actions/storage";
import { authoriseControlRoomWrite, boundedFormValue, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function redirect(state: string) {
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/actions?state=${state}` } }));
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  const actionId = boundedFormValue(formRead.form, "actionId", 120);
  const status = boundedFormValue(formRead.form, "status", 20);
  const ownerValue = formRead.form.get("assignedOwner");
  const assignedOwner = typeof ownerValue === "string" && ownerValue.trim() ? boundedFormValue(formRead.form, "assignedOwner", 120) : null;
  if (!actionId || !isWorkflowStatus(status) || (typeof ownerValue === "string" && ownerValue.trim() && !assignedOwner)) return redirect("invalid");
  const storage = await getActionWorkflowStorage();
  if (storage.status !== "ready") return redirect("storage-unavailable");
  const updatedAt = new Date().toISOString();
  try {
    if (actionRegister.some((action) => action.id === actionId)) {
      await storage.repository.updateBaseline({ actionId, status, assignedOwner, updatedAt });
      return redirect("updated");
    }
    return redirect(await storage.repository.updateExisting({ actionId, status, assignedOwner, updatedAt }) ? "updated" : "not-found");
  } catch {
    return redirect("storage-error");
  }
}
