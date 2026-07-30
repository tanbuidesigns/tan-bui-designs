import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { getAnalyticsStorage } from "@/lib/control-room/analytics/storage";
import { authoriseControlRoomWrite, boundedFormValue, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";

function redirect(state: string) { return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/analytics?state=${state}` } })); }
function dateValue(value: string | null) { return value && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) ? value : null; }
function integerValue(value: string | null, required: true): number | undefined;
function integerValue(value: string | null, required: false): number | null | undefined;
function integerValue(value: string | null, required: boolean) { if (!value) return required ? undefined : null; const parsed = Number(value); return Number.isSafeInteger(parsed) && parsed >= 0 ? parsed : undefined; }

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  const periodStart = dateValue(boundedFormValue(formRead.form, "periodStart", 10));
  const periodEnd = dateValue(boundedFormValue(formRead.form, "periodEnd", 10));
  const pageViews = integerValue(boundedFormValue(formRead.form, "pageViews", 12), true);
  const visits = integerValue(boundedFormValue(formRead.form, "visits", 12), true);
  const lcpP75Ms = integerValue(boundedFormValue(formRead.form, "lcpP75Ms", 12), false);
  const inpP75Ms = integerValue(boundedFormValue(formRead.form, "inpP75Ms", 12), false);
  const clsP75Milli = integerValue(boundedFormValue(formRead.form, "clsP75Milli", 12), false);
  const notesValue = formRead.form.get("notes");
  const notes = typeof notesValue === "string" && notesValue.trim() ? boundedFormValue(formRead.form, "notes", 500) : null;
  if (!periodStart || !periodEnd || periodEnd < periodStart || pageViews === undefined || visits === undefined || lcpP75Ms === undefined || inpP75Ms === undefined || clsP75Milli === undefined || (typeof notesValue === "string" && notesValue.trim() && !notes)) return redirect("invalid");
  const storage = await getAnalyticsStorage();
  if (storage.status !== "ready") return redirect("storage-unavailable");
  try {
    await storage.repository.create({ id: crypto.randomUUID(), periodStart, periodEnd, pageViews, visits, lcpP75Ms, inpP75Ms, clsP75Milli, notes, createdAt: new Date().toISOString() });
    return redirect("captured");
  } catch { return redirect("storage-error"); }
}
