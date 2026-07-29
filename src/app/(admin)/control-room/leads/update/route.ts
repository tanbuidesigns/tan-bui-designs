import { withPrivateResponseHeaders } from "@/lib/control-room/auth/private-response";
import {
  isIsoCalendarDate,
  isLeadStatus,
  leadRetentionDeleteAfter,
} from "@/lib/control-room/leads/domain";
import { getLeadStorage } from "@/lib/control-room/leads/storage";
import {
  authoriseControlRoomWrite,
  boundedFormValue,
  isUuid,
  readBoundedUrlEncodedForm,
} from "@/lib/control-room/history/request-security";

function reply(status: number) {
  return withPrivateResponseHeaders(
    new Response("Request unavailable.", { status }),
  );
}

export async function POST(request: Request) {
  const authorised = await authoriseControlRoomWrite(request);
  if (!authorised.ok) return reply(authorised.status);

  const formRead = await readBoundedUrlEncodedForm(request);
  if (!formRead.ok) return reply(formRead.status);

  const id = boundedFormValue(formRead.form, "id", 36);
  const status = boundedFormValue(formRead.form, "status", 20);
  const followUpValue = formRead.form.get("followUpOn");
  const followUpOn =
    typeof followUpValue === "string" && followUpValue.trim()
      ? followUpValue.trim()
      : null;

  if (
    !isUuid(id) ||
    !isLeadStatus(status) ||
    (followUpOn !== null && !isIsoCalendarDate(followUpOn))
  ) {
    return reply(400);
  }

  const storage = await getLeadStorage();
  if (storage.status !== "ready") {
    return withPrivateResponseHeaders(
      new Response(null, {
        status: 303,
        headers: { Location: "/control-room/leads?state=storage-unavailable" },
      }),
    );
  }

  const updatedAt = new Date().toISOString();
  let updated = false;
  try {
    updated = await storage.repository.update({
      id,
      status,
      followUpOn,
      updatedAt,
      retentionDeleteAfter:
        status === "closed" ? leadRetentionDeleteAfter(updatedAt) : null,
    });
  } catch {
    return withPrivateResponseHeaders(
      new Response(null, {
        status: 303,
        headers: { Location: "/control-room/leads?state=storage-error" },
      }),
    );
  }

  return withPrivateResponseHeaders(
    new Response(null, {
      status: 303,
      headers: {
        Location: `/control-room/leads?state=${updated ? "updated" : "not-found"}`,
      },
    }),
  );
}
