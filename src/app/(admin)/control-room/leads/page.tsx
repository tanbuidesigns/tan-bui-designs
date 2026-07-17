import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import EmptyIntegrationState from "@/components/control-room/EmptyIntegrationState";
import { proposedLeadFields } from "@/data/control-room/operating-model";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";

export default function ControlRoomLeadsPage() {
  const snapshot = getControlRoomSnapshot();
  return (
    <ControlRoomShell activeSection="leads" eyebrow="TBD Control Room · Leads" title="Lead-tracking prerequisites" description="A future-state governance and security checklist. It contains field names only and no personal example data." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <EmptyIntegrationState title="Lead storage is not enabled" message="The contact form remains unchanged. There is no database, lead store, attribution system, authentication or Control Room access control in this stage." />
      <section aria-labelledby="lead-prerequisites-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Before any storage</p>
        <h2 id="lead-prerequisites-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Required foundations</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {snapshot.leadPrerequisites.map((item) => (
            <article key={item.id} className="rounded-2xl border border-black/8 bg-[#f7f7f4] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">{item.status.replaceAll("-", " ")}</p>
              <h3 className="mt-2 font-bold">{item.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.reason}</p>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="lead-schema-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">Schema proposal · Field names only</p>
        <h2 id="lead-schema-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Possible future lead record</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {proposedLeadFields.map((field) => <li key={field} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white/75">{field}</li>)}
        </ul>
      </section>
    </ControlRoomShell>
  );
}
