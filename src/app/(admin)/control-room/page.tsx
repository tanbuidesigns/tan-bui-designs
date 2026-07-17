import ContentOpportunities from "@/components/control-room/ContentOpportunities";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import MetricCard from "@/components/control-room/MetricCard";
import PageHealthTable from "@/components/control-room/PageHealthTable";
import PerformanceHistory from "@/components/control-room/PerformanceHistory";
import {
  contentOpportunities,
  overviewMetrics,
  pageHealthRecords,
  performanceHistory,
  plannedIntegrations,
  recommendedActions,
  reportingPeriod,
} from "@/data/control-room/mock-data";
import type { Priority } from "@/types/control-room";

const priorityClasses: Record<Priority, string> = {
  High: "bg-red-50 text-red-800 ring-red-700/15",
  Medium: "bg-amber-50 text-amber-900 ring-amber-700/15",
  Low: "bg-blue-50 text-blue-800 ring-blue-700/15",
};

export default function ControlRoomPage() {
  return (
    <ControlRoomShell reportingPeriod={reportingPeriod}>
      <section id="overview" aria-labelledby="overview-title">
        <div className="flex flex-col gap-2 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Overview</p>
            <h2 id="overview-title" className="mt-2 text-3xl font-bold tracking-[-0.045em] sm:text-4xl">What needs attention first</h2>
          </div>
          <p className="text-sm text-gray-500">{reportingPeriod.startDate} – {reportingPeriod.endDate}</p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {overviewMetrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
        </div>
      </section>

      <section aria-labelledby="recommended-actions-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Priorities</p>
        <h2 id="recommended-actions-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Recommended next actions</h2>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {recommendedActions.map((action) => (
            <article key={action.id} className="rounded-2xl border border-black/8 bg-[#f7f7f4] p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ring-1 ring-inset ${priorityClasses[action.priority]}`}>{action.priority}</span>
                <span className="text-xs text-gray-400">{action.affectedArea}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.03em]">{action.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{action.reason}</p>
              <p className="mt-4 border-t border-black/8 pt-4 text-sm font-semibold leading-relaxed">Next: {action.nextStep}</p>
            </article>
          ))}
        </div>
      </section>

      <PageHealthTable records={pageHealthRecords} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <PerformanceHistory entries={performanceHistory} />
        <ContentOpportunities opportunities={contentOpportunities} />
      </div>

      <section aria-labelledby="planned-connections-title" className="rounded-[1.35rem] border border-dashed border-black/18 bg-white/55 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Prototype notes</p>
        <h2 id="planned-connections-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Planned future connections</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {plannedIntegrations.map((integration) => (
            <li key={integration.name} className="rounded-xl border border-black/8 bg-white p-4">
              <p className="font-semibold">{integration.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">{integration.purpose}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-black/8 pt-5 text-sm font-semibold">These integrations are not part of this prototype.</p>
      </section>
    </ControlRoomShell>
  );
}
