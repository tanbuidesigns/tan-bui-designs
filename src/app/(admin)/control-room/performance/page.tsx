import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import FreshnessBadge from "@/components/control-room/FreshnessBadge";
import IntegrationStatusBadge from "@/components/control-room/IntegrationStatusBadge";
import OperationalState from "@/components/control-room/OperationalState";
import SecurityClassificationBadge from "@/components/control-room/SecurityClassificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { getPerformanceOverview } from "@/lib/control-room/performance/get-performance-overview";

export default async function ControlRoomPerformancePage() {
  const snapshot = getControlRoomSnapshot();
  const overview = await getPerformanceOverview();

  return (
    <ControlRoomShell activeSection="performance" eyebrow="TBD Control Room · Performance" title="Performance integration readiness" description="A prepared provider flow that keeps Lighthouse laboratory diagnostics separate from CrUX real-user field data. No performance measurement is fabricated." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <OperationalState kind="no-data" title="No live performance source is connected" explanation={overview.liveResult.status === "unavailable" ? overview.liveResult.reason : "No live result exists."} nextStep="Task 4 will enable on-demand mobile analysis through the verified target allowlist." />

      <section aria-labelledby="target-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Verified own-domain allowlist</p>
        <h2 id="target-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Available performance targets</h2>
        <div className="mt-5 rounded-xl border border-black/8 bg-[#f7f7f4] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">Selected default</p>
          <p className="mt-2 text-lg font-bold">{overview.selectedTarget.displayLabel}</p>
          <p className="mt-1 break-all font-mono text-xs text-gray-500">{overview.selectedTarget.canonicalUrl}</p>
          <p className="mt-3 text-sm text-gray-600">Strategies: {overview.strategies.join(" and ")}. Default: {overview.request.strategy}.</p>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{overview.targets.map((target) => <li key={target.id} className="rounded-xl border border-black/8 p-4"><p className="font-semibold">{target.displayLabel}</p><p className="mt-1 break-all font-mono text-xs text-gray-500">{target.canonicalUrl}</p><p className="mt-2 text-xs capitalize text-gray-500">{target.pageCategory.replaceAll("-", " ")} · {target.defaultStrategy} first</p></li>)}</ul>
        <p className="mt-5 border-t border-black/8 pt-4 text-sm leading-relaxed text-gray-600">No form accepts a URL. A future request must supply a registered target ID, which is resolved server-side.</p>
      </section>

      <section aria-labelledby="source-model-title" className="space-y-4">
        <div className="px-1"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Separate evidence models</p><h2 id="source-model-title" className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Lab versus field performance</h2></div>
        {[overview.labSource, overview.fieldSource].map((source) => (
          <article key={source.id} className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{source.sourceType.replaceAll("-", " ")}</p><h3 className="mt-2 text-2xl font-bold tracking-[-0.035em]">{source.displayName}</h3></div><div className="flex flex-wrap gap-2"><IntegrationStatusBadge state={source.lifecycleState} /><FreshnessBadge state={source.freshness.state} /><SecurityClassificationBadge classification={source.securityClassification} /></div></div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">{source.description}</p>
            <dl className="mt-5 grid gap-4 border-t border-black/8 pt-5 text-sm leading-relaxed md:grid-cols-2"><div><dt className="font-semibold">Configuration</dt><dd className="mt-1 break-all text-gray-600">{source.configurationRequirements.length ? source.configurationRequirements.join(" · ") : "No configuration required"}</dd></div><div><dt className="font-semibold">Refresh and storage</dt><dd className="mt-1 text-gray-600">{source.plannedCadence}. {source.persistenceRequired ? "Persistence is planned." : "No initial persistence."}</dd></div><div><dt className="font-semibold">Limitation</dt><dd className="mt-1 text-gray-600">{source.limitation}</dd></div><div><dt className="font-semibold">Next implementation</dt><dd className="mt-1 text-gray-600">{source.nextTask}</dd></div></dl>
          </article>
        ))}
      </section>

      <section aria-labelledby="planned-metrics-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">Prepared domain only</p><h2 id="planned-metrics-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Planned measurements</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2"><div><h3 className="font-bold">PageSpeed laboratory</h3><p className="mt-2 text-sm leading-relaxed text-white/58">Performance, accessibility, best practices and SEO categories; FCP, LCP, CLS, TBT and Speed Index; selected diagnostics and warnings.</p></div><div><h3 className="font-bold">CrUX real-user field</h3><p className="mt-2 text-sm leading-relaxed text-white/58">LCP, INP and CLS distributions; assessment, page or origin coverage, collection period and traffic eligibility where available.</p></div></div>
      </section>
    </ControlRoomShell>
  );
}
