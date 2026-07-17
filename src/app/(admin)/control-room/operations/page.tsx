import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import IntegrationHealthTable from "@/components/control-room/IntegrationHealthTable";
import MetricCard from "@/components/control-room/MetricCard";
import { Checklist, ReadinessList } from "@/components/control-room/OperationsReadiness";
import { futureConfigurationManifest } from "@/data/control-room/integration-manifest";
import { securityReadiness, storageReadiness, task4Readiness } from "@/data/control-room/task4-readiness";
import { task5Readiness, task6Readiness } from "@/data/control-room/task6-readiness";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { controlRoomRuntimePolicy } from "@/lib/control-room/runtime/control-room-policy";
import type { SummaryMetric } from "@/types/control-room";

export default function ControlRoomOperationsPage() {
  const snapshot = getControlRoomSnapshot();
  const summary = snapshot.integrationSummary;
  const pageSpeed = snapshot.integrations.find((integration) => integration.id === "pagespeed-lab");
  const pageSpeedConfigured = pageSpeed?.configurationState === "ready";
  const searchConsole = snapshot.integrations.find((integration) => integration.id === "search-console");
  const searchConsoleConfigured = searchConsole?.configurationState === "ready";
  const currentTask4Readiness = task4Readiness.map((item) => item.id === "configuration" ? {
    ...item,
    complete: pageSpeedConfigured,
    explanation: pageSpeedConfigured ? "Server configuration is available for deliberate on-demand requests." : item.explanation,
  } : item);
  const currentTask5Readiness = task5Readiness.map((item) => item.id === "credentials" ? {
    ...item,
    complete: searchConsoleConfigured,
    explanation: searchConsoleConfigured ? "The registered server-only configuration is ready for a deliberate report." : item.explanation,
  } : item);
  const metrics: readonly SummaryMetric[] = [
    { id: "sources", label: "Registered sources", value: summary.total, description: "Every current and planned source in the server registry." },
    { id: "local", label: "Active local", value: summary.activeLocal, description: "Local repository sources with an active operating mode." },
    { id: "external", label: "Planned external", value: summary.plannedExternal, description: "Disconnected external sources represented without fabricated health." },
    { id: "configuration", label: "Need configuration", value: summary.requiringConfiguration, description: "Sources awaiting configuration or authorisation." },
    { id: "stale", label: "Stale", value: summary.stale, description: "Registry sources explicitly classified as stale." },
    { id: "errors", label: "In error", value: summary.errors, description: "Sources currently reporting an error lifecycle state." },
  ];
  const completeTask4 = currentTask4Readiness.filter((item) => item.complete).length;
  const completeTask5 = currentTask5Readiness.filter((item) => item.complete).length;

  return (
    <ControlRoomShell activeSection="operations" eyebrow="TBD Control Room · Operations" title="Integration and security operations" description="A read-only operational view of provider readiness, configuration boundaries, storage decisions and the Task 6 protected-production boundary." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <section aria-labelledby="system-mode-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">System policy</p><h2 id="system-mode-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Development-only mode</h2>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-5"><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Active mode</dt><dd className="mt-2 font-semibold">{controlRoomRuntimePolicy.activeMode}</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Production</dt><dd className="mt-2 font-semibold">Unavailable</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Local baseline</dt><dd className="mt-2 font-semibold">Active and healthy</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">PageSpeed</dt><dd className="mt-2 font-semibold">{pageSpeedConfigured ? "Ready on demand" : "Awaiting configuration"}</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Search Console</dt><dd className="mt-2 font-semibold">{searchConsoleConfigured ? "Ready on demand" : "Awaiting configuration"}</dd></div></dl>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      <IntegrationHealthTable integrations={snapshot.integrations} />

      <div className="grid gap-6 xl:grid-cols-2"><Checklist title={`Task 4 readiness · ${completeTask4}/${currentTask4Readiness.length}`} items={currentTask4Readiness} /><ReadinessList title="Security readiness" items={securityReadiness} /></div>
      <div className="grid gap-6 xl:grid-cols-2"><Checklist title={`Task 5 readiness · ${completeTask5}/${currentTask5Readiness.length}`} items={currentTask5Readiness} /><ReadinessList title="Task 6 · protected production pilot" items={task6Readiness} /></div>
      <ReadinessList title="Storage and scheduling" items={storageReadiness} />

      <section aria-labelledby="configuration-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Names and operating state only · No values shown</p><h2 id="configuration-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Configuration manifest</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">{futureConfigurationManifest.map((item) => <article key={item.name} className="min-w-0 rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="break-all font-mono text-sm font-bold">{item.name}</h3><span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">{item.status.replaceAll("-", " ")}</span></div><p className="mt-2 text-sm leading-relaxed text-gray-600">{item.purpose}</p><p className="mt-3 text-xs text-gray-500">{item.secret ? "Secret" : "Non-secret"} · server only · {item.required ? "required later" : "optional"} · {item.futureTask}</p></article>)}</div>
      </section>

      <section aria-labelledby="operational-decisions-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">No editable settings</p><h2 id="operational-decisions-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Operational decisions</h2><ul className="mt-5 divide-y divide-black/8">{snapshot.decisions.map((decision) => <li key={decision.id} className="py-4 first:pt-0 last:pb-0"><p className="font-semibold">{decision.question}</p><p className="mt-1 text-sm leading-relaxed text-gray-600">{decision.context}</p></li>)}</ul></section>
    </ControlRoomShell>
  );
}
