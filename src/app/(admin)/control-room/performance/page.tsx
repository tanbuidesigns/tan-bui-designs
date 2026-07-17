import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import DataSourceBadge from "@/components/control-room/DataSourceBadge";
import EmptyIntegrationState from "@/components/control-room/EmptyIntegrationState";
import VerificationBadge from "@/components/control-room/VerificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";

export default function ControlRoomPerformancePage() {
  const snapshot = getControlRoomSnapshot();
  const sources = snapshot.integrations.filter((integration) => integration.category === "performance");
  return (
    <ControlRoomShell activeSection="performance" eyebrow="TBD Control Room · Performance" title="Performance integration readiness" description="A truthful plan for separating lab diagnostics, real-user field data and local repository evidence. No performance score is shown without a source." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <EmptyIntegrationState title="No live performance source is connected" message="The Control Room currently makes no claims about PageSpeed scores, Core Web Vitals or real-user experience. A good lab score would not guarantee search rankings." />
      <section aria-labelledby="performance-sources-title" className="space-y-4">
        <div className="px-1"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Planned evidence model</p><h2 id="performance-sources-title" className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Three separate sources</h2></div>
        {sources.map((source) => (
          <article key={source.id} className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{source.status.replaceAll("-", " ")}</p><h3 className="mt-2 text-2xl font-bold tracking-[-0.035em]">{source.name}</h3></div>
              <div className="flex flex-wrap gap-2"><VerificationBadge status={source.verificationStatus} /><DataSourceBadge source={source.source} /></div>
            </div>
            <dl className="mt-6 grid gap-5 border-t border-black/8 pt-5 text-sm leading-relaxed md:grid-cols-2">
              <div><dt className="font-semibold">Requirements</dt><dd className="mt-1 text-gray-600">{source.requirements}</dd></div>
              <div><dt className="font-semibold">Limitations</dt><dd className="mt-1 text-gray-600">{source.limitations}</dd></div>
              <div><dt className="font-semibold">Intended measures</dt><dd className="mt-1 text-gray-600">{source.intendedMetrics.join(" · ")}</dd></div>
              <div><dt className="font-semibold">Operating model</dt><dd className="mt-1 text-gray-600">Refresh: {source.refreshCadence}. Persistence {source.persistenceNeeded ? "is likely needed" : "is not currently expected"}. Complexity: {source.complexity.replaceAll("-", " ")}.</dd></div>
            </dl>
          </article>
        ))}
      </section>
    </ControlRoomShell>
  );
}
