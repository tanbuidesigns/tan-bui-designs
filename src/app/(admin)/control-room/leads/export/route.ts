import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { buildCsv } from "@/lib/control-room/exports/csv";
import { authoriseControlRoomRead } from "@/lib/control-room/history/request-security";
import { isLeadStatus } from "@/lib/control-room/leads/domain";
import { getLeadStorage } from "@/lib/control-room/leads/storage";

function reply(body: BodyInit | null, status: number, headers?: HeadersInit) {
  return withPrivateResponseHeaders(new Response(body, { status, headers }));
}

export async function GET(request: Request) {
  const authorised = await authoriseControlRoomRead(request);
  if (!authorised.ok) return reply("Request unavailable.", authorised.status);

  const requestedStatus = new URL(request.url).searchParams.get("status");
  const status = isLeadStatus(requestedStatus) ? requestedStatus : null;
  const storage = await getLeadStorage();
  if (storage.status !== "ready") return reply("Storage unavailable.", 503);

  try {
    const leads = await storage.repository.list({ status, limit: 100 });
    const csv = buildCsv(
      [
        "Name",
        "Email",
        "Services",
        "Source page",
        "Status",
        "Follow-up date",
        "Received at",
        "Updated at",
        "Closed at",
        "Retention delete after",
      ],
      leads.map((lead) => [
        lead.name,
        lead.email,
        lead.services.join("; "),
        lead.sourcePath,
        lead.status,
        lead.followUpOn,
        lead.createdAt,
        lead.updatedAt,
        lead.closedAt,
        lead.retentionDeleteAfter,
      ]),
    );

    return reply(csv, 200, {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="tan-bui-designs-leads.csv"',
    });
  } catch {
    return reply("Export unavailable.", 503);
  }
}
