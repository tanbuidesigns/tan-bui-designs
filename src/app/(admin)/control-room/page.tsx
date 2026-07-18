import Link from "next/link";

import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import DataSourceBadge from "@/components/control-room/DataSourceBadge";
import MetricCard from "@/components/control-room/MetricCard";
import VerificationBadge from "@/components/control-room/VerificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { sortActions } from "@/lib/control-room/sorting";
import type { SummaryMetric } from "@/types/control-room";

export default function ControlRoomPage() {
  const snapshot = getControlRoomSnapshot();
  const immediateActions = sortActions(snapshot.actions).filter((action) => action.status !== "done").slice(0, 5);
  const externalVerificationCount = snapshot.integrations.filter((integration) => integration.verificationStatus === "requires-verification").length;
  const metrics: readonly SummaryMetric[] = [
    { id: "routes", label: "Routes inventoried", value: snapshot.pageSummary.total, description: "Meaningful public page routes in the dated repository baseline." },
    { id: "metadata", label: "Dedicated metadata", value: snapshot.pageSummary.dedicatedMetadata, description: "Routes with a route-specific title and description." },
    { id: "priority-actions", label: "Critical / high open", value: snapshot.actionSummary.openCriticalHigh, description: "Open actions whose curated priority is critical or high." },
    { id: "ready", label: "Ready to begin", value: snapshot.actionSummary.ready, description: "Open actions without a recorded blocking status." },
    { id: "verification", label: "External verification", value: externalVerificationCount, description: "Planned integrations that require access, runtime evidence or approval." },
    { id: "integrations", label: "Planned integrations", value: snapshot.integrationSummary.plannedExternal, description: "External sources represented truthfully as disconnected." },
  ];

  return (
    <ControlRoomShell
      activeSection="overview"
      eyebrow="TBD Control Room · Overview"
      title="Website baseline and immediate priorities"
      description="A verified local view of what exists, what needs a decision and what should happen next. Counts are derived from typed repository records."
      baselineReviewDate={snapshot.baselineReviewDate}
      lastUpdatedDate={snapshot.lastUpdatedDate}
    >
      <section aria-labelledby="baseline-summary-title">
        <div className="px-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Verified summaries</p>
          <h2 id="baseline-summary-title" className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">Baseline health summary</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </div>
      </section>

      <section aria-labelledby="immediate-priorities-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Action register</p>
            <h2 id="immediate-priorities-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Immediate priorities</h2>
          </div>
          <Link href="/control-room/actions" className="text-sm font-semibold underline decoration-gray-300 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">View all actions</Link>
        </div>
        <div className="mt-6 divide-y divide-black/8">
          {immediateActions.map((action) => (
            <article key={action.id} className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">{action.priority} · {action.status.replaceAll("-", " ")}</p>
                <h3 className="mt-2 text-lg font-bold tracking-[-0.025em]">{action.title}</h3>
                <p className="mt-1 font-mono text-xs text-gray-400">{action.affectedArea}</p>
              </div>
              <div className="text-sm leading-relaxed text-gray-600">
                <p>{action.reason}</p>
                <p className="mt-2"><strong className="text-black">Dependency:</strong> {action.dependency}</p>
                <div className="mt-3 flex flex-wrap gap-2"><VerificationBadge status={action.verificationStatus} /><DataSourceBadge source={action.source} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="system-readiness-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Integration registry</p><h2 id="system-readiness-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">System readiness</h2></div>
          <Link href="/control-room/operations" className="text-sm font-semibold underline decoration-gray-300 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Open Operations</Link>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">Live integrations are not connected. Current website findings come from the local repository baseline.</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ["Active local sources", snapshot.integrationSummary.activeLocal],
            ["Planned external", snapshot.integrationSummary.plannedExternal],
            ["Require configuration", snapshot.integrationSummary.requiringConfiguration],
            ["Personal-data sources", snapshot.integrationSummary.personalData],
            ["Stale sources", snapshot.integrationSummary.stale],
            ["Sources in error", snapshot.integrationSummary.errors],
          ].map(([label, value]) => <div key={label} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><dt className="text-xs font-semibold uppercase tracking-[0.1em] text-gray-500">{label}</dt><dd className="mt-2 text-3xl font-bold tracking-[-0.04em]">{value}</dd></div>)}
        </dl>
      </section>

      <section aria-labelledby="decisions-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">Owner and technical decisions</p>
        <h2 id="decisions-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Decisions required</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {snapshot.decisions.map((decision) => (
            <article key={decision.id} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/42">{decision.priority} priority</p>
              <h3 className="mt-2 font-bold leading-snug">{decision.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/58">{decision.context}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="readiness-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">No connections active</p>
            <h2 id="readiness-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Data readiness</h2>
          </div>
          <Link href="/control-room/performance" className="text-sm font-semibold underline decoration-gray-300 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Performance readiness</Link>
        </div>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {snapshot.integrations.map((integration) => (
            <li key={integration.id} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{integration.displayName}</p><span className="text-xs font-semibold capitalize text-gray-500">{integration.lifecycleState.replaceAll("-", " ")}</span></div>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{integration.accessRequirements}</p>
            </li>
          ))}
        </ul>
      </section>
    </ControlRoomShell>
  );
}
