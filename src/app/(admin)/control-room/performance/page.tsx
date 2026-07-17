import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import FreshnessBadge from "@/components/control-room/FreshnessBadge";
import IntegrationStatusBadge from "@/components/control-room/IntegrationStatusBadge";
import LabPerformanceReport from "@/components/control-room/LabPerformanceReport";
import OperationalState from "@/components/control-room/OperationalState";
import PerformanceRunForm from "@/components/control-room/PerformanceRunForm";
import SecurityClassificationBadge from "@/components/control-room/SecurityClassificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { getPerformanceOverview } from "@/lib/control-room/performance/get-performance-overview";

type SearchParamRecord = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ControlRoomPerformancePage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const overview = await getPerformanceOverview({
    targetId: first(params.target),
    strategy: first(params.strategy),
    run: first(params.run),
  });
  const result = overview.liveResult;

  return (
    <ControlRoomShell activeSection="performance" eyebrow="TBD Control Room · Performance" title="On-demand laboratory performance" description="Run one approved Tan Bui Designs target through PageSpeed Insights while keeping Lighthouse laboratory evidence separate from CrUX real-user field data." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <PerformanceRunForm targets={overview.targets} selectedTarget={overview.selectedTarget} strategy={overview.request.strategy ?? overview.selectedTarget.defaultStrategy} />

      {overview.validationMessage ? <OperationalState kind="error" title="The performance request was not valid" explanation={overview.validationMessage} nextStep="Choose a registered target and one of its allowed strategies." /> : null}
      {!overview.shouldRun ? <OperationalState kind="no-data" title="No laboratory test has been requested" explanation="Opening this page does not contact Google. Submit the form when you deliberately want one fresh laboratory snapshot." /> : null}
      {result?.status === "unavailable" ? <OperationalState kind="configuration-missing" title="PageSpeed is unavailable" explanation={result.reason} nextStep={result.nextRequirement} /> : null}
      {result?.status === "error" ? <OperationalState kind={result.error.kind === "timeout" || result.error.kind === "quota" || result.error.kind === "network" ? "degraded" : "error"} title="PageSpeed could not complete this request" explanation={result.error.message} nextStep={result.retryable ? "Try one manual run later." : "Review the registered target or server-side configuration before retrying."} /> : null}
      {result?.status === "success" ? <LabPerformanceReport result={result.data} target={overview.selectedTarget} /> : null}

      <section aria-labelledby="target-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Verified own-domain allowlist</p>
        <h2 id="target-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Available performance targets</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{overview.targets.map((target) => <li key={target.id} className="min-w-0 rounded-xl border border-black/8 p-4"><p className="font-semibold">{target.displayLabel}</p><p className="mt-1 break-all font-mono text-xs text-gray-500">{target.canonicalUrl}</p><p className="mt-2 text-xs capitalize text-gray-500">{target.pageCategory.replaceAll("-", " ")} · {target.defaultStrategy} first</p></li>)}</ul>
        <p className="mt-5 border-t border-black/8 pt-4 text-sm leading-relaxed text-gray-600">No form accepts a URL. Each request supplies only a registered target ID and strategy; the server resolves and validates the audit URL.</p>
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
    </ControlRoomShell>
  );
}
