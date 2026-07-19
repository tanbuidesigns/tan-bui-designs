import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { siteBaseline } from "@/data/control-room/site-baseline";
import { recordChangeEvent } from "@/lib/control-room/history/evidence-service";
import { authoriseControlRoomWrite, boundedFormValue, isUuid } from "@/lib/control-room/history/request-security";

function reply(status: number) { return withPrivateResponseHeaders(new Response("Request unavailable.", { status })); }
export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request); if (!authorised.ok) return reply(authorised.status);
  let form: FormData; try { form = await request.formData(); } catch { return reply(400); }
  const id = boundedFormValue(form, "id", 36); const occurredAt = boundedFormValue(form, "occurredAt", 10); const eventType = boundedFormValue(form, "eventType", 20); const title = boundedFormValue(form, "title", 120); const affectedPath = boundedFormValue(form, "affectedPath", 300); const summary = boundedFormValue(form, "summary", 1500); const lifecycleState = boundedFormValue(form, "lifecycleState", 20); const supersedes = boundedFormValue(form, "supersedesId", 36);
  const eventTypes = new Set(["deployment", "technical", "content", "seo", "design", "analytics", "security", "other"]); const lifecycleStates = new Set(["planned", "implemented", "deployed", "reverted", "corrected"]);
  if (!isUuid(id) || !/^\d{4}-\d{2}-\d{2}$/.test(occurredAt ?? "") || !eventType || !eventTypes.has(eventType) || !title || !summary || !lifecycleState || !lifecycleStates.has(lifecycleState) || (affectedPath && !siteBaseline.some((page) => page.route === affectedPath)) || (supersedes && !isUuid(supersedes))) return reply(400);
  const now = new Date().toISOString(); const result = await recordChangeEvent({ id, occurredAt: `${occurredAt}T00:00:00.000Z`, eventType: eventType as "technical", title, summary, affectedPageId: null, affectedPath, gitCommit: null, workerVersionId: null, verificationState: "confirmed", lifecycleState: lifecycleState as "implemented", supersedesEventId: supersedes, createdAt: now });
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/evidence?state=${result.status}` } }));
}
