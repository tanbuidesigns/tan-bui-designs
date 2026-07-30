import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { getActionWorkflowStorage } from "@/lib/control-room/actions/storage";
import { isActionCategory, isActionPriority, isEffortLevel, isWorkflowStatus } from "@/lib/control-room/actions/domain";
import { authoriseControlRoomWrite, boundedFormValue, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function redirect(state: string) {
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/actions?state=${state}` } }));
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  const title = boundedFormValue(formRead.form, "title", 160);
  const description = boundedFormValue(formRead.form, "description", 1500);
  const category = boundedFormValue(formRead.form, "category", 30);
  const priority = boundedFormValue(formRead.form, "priority", 20);
  const effort = boundedFormValue(formRead.form, "effort", 30);
  const affectedArea = boundedFormValue(formRead.form, "affectedArea", 300);
  const successMeasure = boundedFormValue(formRead.form, "successMeasure", 500);
  const status = boundedFormValue(formRead.form, "status", 20);
  const ownerValue = formRead.form.get("assignedOwner");
  const assignedOwner = typeof ownerValue === "string" && ownerValue.trim() ? boundedFormValue(formRead.form, "assignedOwner", 120) : null;
  if (!title || !description || !isActionCategory(category) || !isActionPriority(priority) || !isEffortLevel(effort) || !affectedArea || !successMeasure || !isWorkflowStatus(status) || (typeof ownerValue === "string" && ownerValue.trim() && !assignedOwner)) return redirect("invalid");
  const storage = await getActionWorkflowStorage();
  if (storage.status !== "ready") return redirect("storage-unavailable");
  try {
    await storage.repository.createCustom({ actionId: crypto.randomUUID(), title, description, category, priority, effort, affectedArea, successMeasure, status, assignedOwner, createdAt: new Date().toISOString() });
    return redirect("created");
  } catch {
    return redirect("storage-error");
  }
}
