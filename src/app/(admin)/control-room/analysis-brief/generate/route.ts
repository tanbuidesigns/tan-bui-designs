import { buildWebmasterAnalysisBrief } from "@/lib/control-room/analysis-brief/build-brief";
import { getAiAnalysisStorage } from "@/lib/control-room/analyst/storage";
import { generateAiAnalysisDraft } from "@/lib/control-room/analyst/service";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { authoriseControlRoomWrite, boundedFormValue, readBoundedUrlEncodedForm } from "@/lib/control-room/history/request-security";
import { getHistoryStorage } from "@/lib/control-room/history/storage";

function redirect(state: string, period = "28d", pages = "included") {
  return withPrivateResponseHeaders(new Response(null, { status: 303, headers: { Location: `/control-room/analysis-brief?period=${period}&pages=${pages}&state=${state}` } }));
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: authorised.status }));
  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return withPrivateResponseHeaders(new Response("Request unavailable.", { status: formRead.status }));
  const period = boundedFormValue(formRead.form, "period", 3);
  const pages = boundedFormValue(formRead.form, "pages", 8);
  if ((period !== "28d" && period !== "90d") || (pages !== "included" && pages !== "excluded")) return redirect("invalid");
  const [history, analyst] = await Promise.all([getHistoryStorage(), getAiAnalysisStorage()]);
  if (history.status !== "ready" || analyst.status !== "ready") return redirect("storage-unavailable", period, pages);
  try {
    const now = new Date().toISOString();
    const packet = await history.repository.buildEvidencePacket(period, now);
    const brief = await buildWebmasterAnalysisBrief(packet, { pageLevelEvidenceIncluded: pages === "included", generatedAt: now });
    const generated = await generateAiAnalysisDraft(analyst.ai, brief);
    await analyst.repository.create({
      id: crypto.randomUUID(),
      periodId: period,
      pageEvidenceIncluded: pages === "included",
      sourcePacketHash: brief.sourcePacketHash,
      sourcePacketGeneratedAt: brief.sourcePacketGeneratedAt,
      model: generated.model,
      draft: generated.draft,
      evidenceReferences: brief.evidenceReferences.map(({ type, id, href, label }) => ({ type, id, href, label })),
      inputTokens: generated.inputTokens,
      outputTokens: generated.outputTokens,
      createdAt: now,
    });
    return redirect("draft-created", period, pages);
  } catch {
    return redirect("generation-failed", period, pages);
  }
}
