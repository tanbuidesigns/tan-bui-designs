import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { buildCsv } from "@/lib/control-room/exports/csv";
import { authoriseControlRoomRead } from "@/lib/control-room/history/request-security";
import { getHistoryStorage } from "@/lib/control-room/history/storage";

function reply(body: BodyInit | null, status: number, headers?: HeadersInit) {
  return withPrivateResponseHeaders(new Response(body, { status, headers }));
}

export async function GET(request: Request) {
  const authorised = await authoriseControlRoomRead(request);
  if (!authorised.ok) return reply("Request unavailable.", authorised.status);

  const url = new URL(request.url);
  const periodId = url.searchParams.get("period") === "90d" ? "90d" : "28d";
  const format = url.searchParams.get("format") === "csv" ? "csv" : "json";
  const storage = await getHistoryStorage();
  if (storage.status !== "ready") return reply("Storage unavailable.", 503);

  try {
    const packet = await storage.repository.buildEvidencePacket(periodId, new Date().toISOString());
    if (format === "json") {
      return reply(`${JSON.stringify(packet, null, 2)}\n`, 200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="tan-bui-designs-evidence-${periodId}.json"`,
      });
    }

    const metricRows = [
      ["Search", "Clicks", packet.current?.totals?.clicks ?? null, packet.previous?.totals?.clicks ?? null, packet.deltas.clicks, packet.current?.runId ?? null],
      ["Search", "Impressions", packet.current?.totals?.impressions ?? null, packet.previous?.totals?.impressions ?? null, packet.deltas.impressions, packet.current?.runId ?? null],
      ["Search", "CTR", packet.current?.totals?.ctr ?? null, packet.previous?.totals?.ctr ?? null, packet.deltas.ctr, packet.current?.runId ?? null],
      ["Search", "Average position", packet.current?.totals?.averagePosition ?? null, packet.previous?.totals?.averagePosition ?? null, packet.deltas.averagePosition, packet.current?.runId ?? null],
      ...packet.recentPageSpeed.map((item) => ["PageSpeed", `${item.targetId} ${item.strategy}`, item.performanceScore, null, null, item.runId]),
    ] as const;
    const csv = buildCsv(["Section", "Metric", "Current", "Previous", "Delta", "Evidence run"], metricRows);
    return reply(csv, 200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="tan-bui-designs-evidence-${periodId}.csv"`,
    });
  } catch {
    return reply("Export unavailable.", 503);
  }
}
