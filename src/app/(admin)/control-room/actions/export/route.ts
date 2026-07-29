import { actionRegister } from "@/data/control-room/actions";
import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import { buildCsv } from "@/lib/control-room/exports/csv";
import { filterActions, type SearchParamRecord } from "@/lib/control-room/filters";
import { authoriseControlRoomRead } from "@/lib/control-room/history/request-security";
import { sortActions } from "@/lib/control-room/sorting";

const filterKeys = [
  "category",
  "priority",
  "effort",
  "status",
  "approval",
  "verification",
] as const;

function reply(body: BodyInit | null, status: number, headers?: HeadersInit) {
  return withPrivateResponseHeaders(new Response(body, { status, headers }));
}

export async function GET(request: Request) {
  const authorised = await authoriseControlRoomRead(request);
  if (!authorised.ok) return reply("Request unavailable.", authorised.status);

  const url = new URL(request.url);
  const filters: SearchParamRecord = {};
  for (const key of filterKeys) {
    const value = url.searchParams.get(key);
    if (value) filters[key] = value;
  }

  const actions = sortActions(filterActions(actionRegister, filters));
  const csv = buildCsv(
    [
      "ID",
      "Title",
      "Category",
      "Priority",
      "Status",
      "Effort",
      "Affected area",
      "Suggested owner",
      "Approval required",
      "External access required",
      "Success measure",
      "Verification",
      "Notes",
    ],
    actions.map((action) => [
      action.id,
      action.title,
      action.category,
      action.priority,
      action.status,
      action.effort,
      action.affectedArea,
      action.suggestedOwner,
      action.approvalRequired,
      action.externalAccessRequired,
      action.successMeasure,
      action.verificationStatus,
      action.notes,
    ]),
  );

  return reply(csv, 200, {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="tan-bui-designs-actions.csv"',
  });
}
