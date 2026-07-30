import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import DataSourceBadge from "@/components/control-room/DataSourceBadge";
import VerificationBadge from "@/components/control-room/VerificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { controlRoomBuildManifest } from "@/lib/control-room/build-manifest";

export default function ControlRoomChangeLogPage() {
  const snapshot = getControlRoomSnapshot();
  return (
    <ControlRoomShell activeSection="change-log" eyebrow="TBD Control Room · Change log" title="Website-management change log" description="Confirmed human-curated operating context is kept separate from automatic repository commit candidates generated at build time." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Automatic repository candidates</p><h2 className="mt-2 text-2xl font-bold">Recent commits requiring context review</h2></div><p className="text-xs text-gray-500">Branch {controlRoomBuildManifest.sourceBranch ?? "unavailable"}</p></div><p className="mt-3 text-sm leading-relaxed text-gray-600">Commit subjects can identify candidate releases, but they cannot prove business reason, expected outcome, deployment state or verification. Promote a candidate into the confirmed log only after human review.</p><ol className="mt-5 divide-y divide-black/8">{controlRoomBuildManifest.commits.map((commit) => <li key={commit.hash} className="grid gap-2 py-3 sm:grid-cols-[7rem_minmax(0,1fr)_7rem]"><code className="text-xs">{commit.hash.slice(0, 12)}</code><span className="text-sm font-semibold">{commit.subject}</span><time className="text-xs text-gray-500 sm:text-right">{commit.date}</time></li>)}</ol></section>
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
    </ControlRoomShell>
  );
}
