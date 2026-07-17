import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import DataSourceBadge from "@/components/control-room/DataSourceBadge";
import VerificationBadge from "@/components/control-room/VerificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";

export default function ControlRoomChangeLogPage() {
  const snapshot = getControlRoomSnapshot();
  return (
    <ControlRoomShell activeSection="change-log" eyebrow="TBD Control Room · Change log" title="Manual website-management change log" description="A static typed record of confirmed operating-system changes. It is local and is not automatically connected to GitHub." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <section aria-labelledby="change-log-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Source: manual / local</p>
        <h2 id="change-log-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Confirmed changes</h2>
        <ol className="mt-6 space-y-4">
          {snapshot.changes.map((entry) => (
            <li key={entry.id} className="rounded-2xl border border-black/8 bg-[#f7f7f4] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3"><time className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">{entry.date}</time><span className="text-xs font-semibold capitalize text-gray-500">{entry.changeType.replaceAll("-", " ")}</span></div>
              <h3 className="mt-3 text-xl font-bold tracking-[-0.03em]">{entry.summary}</h3>
              <dl className="mt-5 grid gap-4 border-t border-black/8 pt-5 text-sm leading-relaxed md:grid-cols-2">
                <div><dt className="font-semibold">Reason</dt><dd className="mt-1 text-gray-600">{entry.reason}</dd></div>
                <div><dt className="font-semibold">Expected outcome</dt><dd className="mt-1 text-gray-600">{entry.expectedOutcome}</dd></div>
                <div><dt className="font-semibold">Affected files or system</dt><dd className="mt-1 break-all text-gray-600">{entry.affectedArea}</dd></div>
                <div><dt className="font-semibold">Review</dt><dd className="mt-1 text-gray-600">Reviewed {entry.reviewDate}. {entry.notes}</dd></div>
              </dl>
              <div className="mt-5 flex flex-wrap gap-2"><VerificationBadge status={entry.verificationStatus} /><DataSourceBadge source={entry.source} /></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="rounded-[1.35rem] border border-dashed border-black/18 bg-white/55 p-5 sm:p-7" aria-labelledby="github-plan-title">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Planned integration only</p>
        <h2 id="github-plan-title" className="mt-2 text-xl font-bold tracking-[-0.03em]">Future GitHub assistance</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">Git history could help identify candidate changes later, but it cannot supply business reason, expected outcome or review status automatically. Those fields must remain curated.</p>
      </section>
    </ControlRoomShell>
  );
}
