import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { actionRegister } from "@/data/control-room/actions";
import { recordActionEvidence } from "@/lib/control-room/history/evidence-service";
import { authoriseControlRoomWrite, boundedFormValue, isUuid } from "@/lib/control-room/history/request-security";

const metricFamilies = new Set(["pagespeed", "search", "mixed", "manual"] as const);
const evaluationStatuses = new Set(["pending", "positive", "negative", "mixed", "inconclusive"] as const);
function reply(status: number) { return withPrivateResponseHeaders(new Response("Request unavailable.", { status })); }
export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request); if (!authorised.ok) return reply(authorised.status);
  let form: FormData; try { form = await request.formData(); } catch { return reply(400); }
  const id = boundedFormValue(form, "id", 36); const actionId = boundedFormValue(form, "actionId", 120); const metricFamily = boundedFormValue(form, "metricFamily", 20); const expectedOutcome = boundedFormValue(form, "expectedOutcome", 1500); const observedOutcome = boundedFormValue(form, "observedOutcome", 1500); const evaluationStatus = boundedFormValue(form, "evaluationStatus", 20); const supersedes = boundedFormValue(form, "supersedesId", 36);
  if (!isUuid(id) || !actionId || !actionRegister.some((action) => action.id === actionId) || !metricFamily || !metricFamilies.has(metricFamily as "manual") || !expectedOutcome || !observedOutcome || !evaluationStatus || !evaluationStatuses.has(evaluationStatus as "pending") || (supersedes && !isUuid(supersedes))) return reply(400);
  const now = new Date().toISOString(); const result = await recordActionEvidence({ id, actionId, changeEventId: null, baselineRunId: null, followupRunId: null, metricFamily: metricFamily as "pagespeed" | "search" | "mixed" | "manual", expectedOutcome, observedOutcome, evaluationStatus: evaluationStatus as "pending" | "positive" | "negative" | "mixed" | "inconclusive", verificationState: "confirmed", supersedesEvidenceId: supersedes, evaluatedAt: evaluationStatus === "pending" ? null : now, createdAt: now });
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/evidence?state=${result.status}` } }));
}
