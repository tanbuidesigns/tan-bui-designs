import Link from "next/link";

import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import HistoryStorageNotice from "@/components/control-room/HistoryStorageNotice";
import { approvedLeadFields } from "@/data/control-room/operating-model";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import {
  isLeadStatus,
  leadStatuses,
  type LeadRecord,
  type LeadStatus,
} from "@/lib/control-room/leads/domain";
import { getLeadStorage } from "@/lib/control-room/leads/storage";

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/London",
});

function formatDateTime(value: string) {
  return dateTimeFormatter.format(new Date(value));
}

function statusLabel(status: LeadStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function ControlRoomLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; state?: string }>;
}) {
  const params = await searchParams;
  const requestedStatus = params.status ?? null;
  const selectedStatus = isLeadStatus(requestedStatus)
    ? requestedStatus
    : null;
  const snapshot = getControlRoomSnapshot();
  const storage = await getLeadStorage();
  const [leads, counts] =
    storage.status === "ready"
      ? await Promise.all([
          storage.repository.list({ status: selectedStatus, limit: 100 }),
          storage.repository.countByStatus(),
        ])
      : [null, null];
  const total = counts
    ? leadStatuses.reduce((sum, status) => sum + counts[status], 0)
    : 0;

  return (
    <ControlRoomShell
      activeSection="leads"
      eyebrow="TBD Control Room · Leads"
      title="Private enquiry follow-up"
      description="A deliberately minimal lead register. The full enquiry message remains in Gmail and is never copied into this database."
      baselineReviewDate={snapshot.baselineReviewDate}
      lastUpdatedDate="29 July 2026"
    >
      {params.state ? (
        <p
          role="status"
          className="rounded-xl border border-black/8 bg-white p-4 text-sm"
        >
          Request state: {params.state.replaceAll("-", " ")}.
        </p>
      ) : null}

      {storage.status !== "ready" ? (
        <HistoryStorageNotice reason={storage.reason} />
      ) : (
        <>
          <section
            aria-labelledby="lead-summary-title"
            className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Live private records
                </p>
                <h2
                  id="lead-summary-title"
                  className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl"
                >
                  {total} {total === 1 ? "enquiry" : "enquiries"}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-gray-600">
                Closed enquiries that do not become projects are automatically
                deleted after 12 months by the daily retention job.
              </p>
            </div>
            <nav aria-label="Filter leads by status" className="mt-6 flex flex-wrap gap-2">
              <Link
                href="/control-room/leads"
                aria-current={selectedStatus === null ? "page" : undefined}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  selectedStatus === null
                    ? "border-black bg-black text-white"
                    : "border-black/12 bg-white text-gray-600 hover:border-black/35"
                }`}
              >
                All · {total}
              </Link>
              {leadStatuses.map((status) => (
                <Link
                  key={status}
                  href={`/control-room/leads?status=${status}`}
                  aria-current={selectedStatus === status ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                    selectedStatus === status
                      ? "border-black bg-black text-white"
                      : "border-black/12 bg-white text-gray-600 hover:border-black/35"
                  }`}
                >
                  {statusLabel(status)} · {counts?.[status] ?? 0}
                </Link>
              ))}
            </nav>
          </section>

          <section aria-labelledby="lead-list-title" className="space-y-4">
            <h2 id="lead-list-title" className="sr-only">
              Enquiry records
            </h2>
            {leads?.length ? (
              leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
            ) : (
              <div className="rounded-[1.35rem] border border-dashed border-black/20 bg-white/65 p-6 sm:p-8">
                <h3 className="text-xl font-bold">No matching enquiries</h3>
                <p className="mt-2 text-sm text-gray-600">
                  New validated contact-form enquiries will appear here after
                  the email has been accepted for delivery.
                </p>
              </div>
            )}
          </section>
        </>
      )}

      <section
        aria-labelledby="lead-policy-title"
        className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">
          Approved data boundary
        </p>
        <h2
          id="lead-policy-title"
          className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl"
        >
          What this register stores
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {approvedLeadFields.map((field) => (
            <li
              key={field}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white/75"
            >
              {field}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/58">
          It does not store the message, IP address, browser or device details,
          budget, estimated value, or free-form internal notes.
        </p>
      </section>
    </ControlRoomShell>
  );
}

function LeadCard({ lead }: { lead: LeadRecord }) {
  return (
    <article className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] xl:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-black px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-white">
              {statusLabel(lead.status)}
            </span>
            <span className="text-sm text-gray-500">
              Received {formatDateTime(lead.createdAt)}
            </span>
          </div>
          <h3 className="mt-4 break-words text-2xl font-bold tracking-[-0.035em]">
            {lead.name}
          </h3>
          <a
            href={`mailto:${lead.email}`}
            className="mt-2 inline-block break-all text-sm font-semibold underline underline-offset-4"
          >
            {lead.email}
          </a>
          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-black">Selected services</dt>
              <dd className="mt-1 text-gray-600">
                {lead.services.length ? lead.services.join(", ") : "Not specified"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Originating page</dt>
              <dd className="mt-1 text-gray-600">{lead.sourcePath}</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Follow-up</dt>
              <dd className="mt-1 text-gray-600">
                {lead.followUpOn ?? "Not scheduled"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Retention</dt>
              <dd className="mt-1 text-gray-600">
                {lead.retentionDeleteAfter
                  ? `Delete after ${lead.retentionDeleteAfter.slice(0, 10)}`
                  : lead.status === "won"
                    ? "Project record · no enquiry expiry"
                    : "Active enquiry · no expiry set"}
              </dd>
            </div>
          </dl>
        </div>

        <form
          method="post"
          action="/control-room/leads/update"
          className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4"
        >
          <input type="hidden" name="id" value={lead.id} />
          <label className="block text-sm font-semibold">
            Lead status
            <select
              name="status"
              defaultValue={lead.status}
              className="mt-2 min-h-11 w-full rounded-lg border border-black/15 bg-white px-3"
            >
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabel(status)}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Follow-up date
            <input
              type="date"
              name="followUpOn"
              defaultValue={lead.followUpOn ?? ""}
              className="mt-2 min-h-11 w-full rounded-lg border border-black/15 bg-white px-3"
            />
          </label>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            Closing starts the 12-month deletion clock. Marking a lead won keeps
            it as a project record and clears follow-up.
          </p>
          <button className="mt-4 min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white">
            Save follow-up
          </button>
        </form>
      </div>
    </article>
  );
}
