import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import IntegrationHealthTable from "@/components/control-room/IntegrationHealthTable";
import MetricCard from "@/components/control-room/MetricCard";
import { Checklist, ReadinessList } from "@/components/control-room/OperationsReadiness";
import { futureConfigurationManifest } from "@/data/control-room/integration-manifest";
import { securityReadiness, storageReadiness, task4Readiness } from "@/data/control-room/task4-readiness";
import { task5Readiness, task6CodeReadiness, task6ManualReadiness } from "@/data/control-room/task6-readiness";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { controlRoomRuntimePolicy } from "@/lib/control-room/runtime/control-room-policy";
import type { SummaryMetric } from "@/types/control-room";
import { getHistoryStorage } from "@/lib/control-room/history/storage";
import { getBackupStorage } from "@/lib/control-room/backups/storage";

export default async function ControlRoomOperationsPage({ searchParams }: { searchParams: Promise<{ backup?: string }> }) {
  const query = await searchParams;
  const historyStorage = await getHistoryStorage();
  const backupStorage = await getBackupStorage();
  const latestBackup = backupStorage.status === "ready"
    ? await backupStorage.bucket.head("control-room/v1/latest.json").catch(() => null)
    : null;
  const recentHistory = historyStorage.status === "ready"
    ? await historyStorage.repository.listRuns({ limit: 50, cursor: null })
    : null;
  const scheduledRuns = recentHistory?.runs.filter((run) => run.triggerKind === "scheduled") ?? [];
  const latestScheduledSearch = scheduledRuns.find((run) => run.source === "search_console") ?? null;
  const latestScheduledPageSpeed = scheduledRuns.find((run) => run.source === "pagespeed") ?? null;
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
  const completeTask6Code = task6CodeReadiness.filter((item) => item.complete).length;

  return (
    <ControlRoomShell activeSection="operations" eyebrow="TBD Control Room · Operations" title="Integration and security operations" description="A read-only operational view of provider readiness, configuration boundaries, storage decisions and the Task 6 private Google Sign-In boundary." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <section aria-labelledby="system-mode-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">System policy</p><h2 id="system-mode-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Task 6 security boundary</h2>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-5"><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Active mode</dt><dd className="mt-2 font-semibold">{controlRoomRuntimePolicy.activeMode}</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Production pilot</dt><dd className="mt-2 font-semibold">Active · verification continuing</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Local baseline</dt><dd className="mt-2 font-semibold">Active and healthy</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">PageSpeed</dt><dd className="mt-2 font-semibold">{pageSpeedConfigured ? "Configured · manual + scheduled" : "Schedule active · configuration needed"}</dd></div><div className="rounded-xl border border-white/10 bg-white/5 p-4"><dt className="text-white/42">Search Console</dt><dd className="mt-2 font-semibold">{searchConsoleConfigured ? "Configured · manual + scheduled" : "Schedule active · configuration needed"}</dd></div></dl>
      </section>

      <section aria-labelledby="scheduled-monitoring-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Cloudflare Cron · UTC</p>
        <h2 id="scheduled-monitoring-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Scheduled monitoring</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Search · 28 days</dt><dd className="mt-2 font-semibold">Daily · 05:31 UTC</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Search · 90 days</dt><dd className="mt-2 font-semibold">Sunday · 06:13 UTC</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Homepage PageSpeed</dt><dd className="mt-2 font-semibold">Monday · 06:47 UTC</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Lead retention</dt><dd className="mt-2 font-semibold">Daily · 04:17 UTC</dd></div>
        </dl>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <p className="rounded-xl border border-black/8 p-4 text-sm"><span className="block text-xs uppercase text-gray-500">Latest scheduled Search run</span><strong className="mt-2 block">{latestScheduledSearch ? `${latestScheduledSearch.status} · ${latestScheduledSearch.startedAt}` : "Awaiting first scheduled run"}</strong></p>
          <p className="rounded-xl border border-black/8 p-4 text-sm"><span className="block text-xs uppercase text-gray-500">Latest scheduled PageSpeed run</span><strong className="mt-2 block">{latestScheduledPageSpeed ? `${latestScheduledPageSpeed.status} · ${latestScheduledPageSpeed.startedAt}` : "Awaiting first scheduled run"}</strong></p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">Each capture is retry-safe and recorded in History with its trigger, request counts, warnings and safe failure state. Provider failures remain visible without exposing credentials or raw upstream responses.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      <IntegrationHealthTable integrations={snapshot.integrations} />

      <div className="grid gap-6 xl:grid-cols-2"><Checklist title={`Task 4 readiness · ${completeTask4}/${currentTask4Readiness.length}`} items={currentTask4Readiness} /><ReadinessList title="Security readiness" items={securityReadiness} /></div>
      <div className="grid gap-6 xl:grid-cols-2"><Checklist title={`Task 5 readiness · ${completeTask5}/${currentTask5Readiness.length}`} items={currentTask5Readiness} /><Checklist title={`Task 6 code readiness · ${completeTask6Code}/${task6CodeReadiness.length}`} items={task6CodeReadiness} /></div>
      <ReadinessList title="Task 6 verified readiness and production pilot" items={task6ManualReadiness} />
      <ReadinessList title="Storage and scheduling" items={storageReadiness} />

      <section aria-labelledby="task7-storage-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Task 7 · Production foundation</p>
        <h2 id="task7-storage-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">History storage portability</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Primary design</dt><dd className="mt-2 font-semibold">Cloudflare D1 · SQLite</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Runtime state</dt><dd className="mt-2 font-semibold">{historyStorage.status === "ready" ? "Ready" : "Not configured"}</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Future fallback</dt><dd className="mt-2 font-semibold">Turso · documented only</dd></div>
          <div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Private R2 backup</dt><dd className="mt-2 font-semibold">{backupStorage.status !== "ready" ? "Binding unavailable" : latestBackup ? `Latest · ${latestBackup.uploaded.toISOString()}` : "Ready · awaiting first archive"}</dd></div>
        </dl>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-600"><li>Schema version 5 adds reviewed AI-draft history to the existing CONTROL_ROOM_DB foundation; the live runtime state is shown above.</li><li>The portable migrations and repository boundaries support measurement history, the approved minimal lead register, editable action workflow state, aggregate analytics snapshots and analyst review state.</li><li>A weekly private R2 archive includes schema metadata, checksums and row counts, then reads the object back for validation. D1 Time Travel remains the first recovery option for recent incidents.</li><li>Search comparisons, homepage mobile PageSpeed and lead retention have bounded UTC schedules. AI generation remains owner-triggered and cannot publish, deploy or create actions.</li></ul>
        {query.backup ? <p className="mt-4 rounded-xl bg-[#f7f7f4] p-4 text-sm">Backup result: <strong>{query.backup.replaceAll("-", " ")}</strong>.</p> : null}
        <form action="/control-room/backups/create" method="post" className="mt-5"><input type="hidden" name="intent" value="create" /><button className="min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white">Create and verify backup now</button></form>
      </section>

      <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Tasks 8–9 · Analysis Brief and analyst</p><h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Deterministic evidence with human-approved AI drafts</h2><dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Source</dt><dd className="mt-2 font-semibold">ReportingEvidencePacketV1</dd></div><div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Model</dt><dd className="mt-2 font-semibold">Workers AI · owner-triggered</dd></div><div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Review states</dt><dd className="mt-2 font-semibold">Draft, approved, rejected</dd></div><div className="rounded-xl bg-[#f7f7f4] p-4"><dt className="text-xs uppercase text-gray-500">Autonomy</dt><dd className="mt-2 font-semibold">No public or action writes</dd></div></dl><p className="mt-5 text-sm leading-relaxed text-gray-600">Restricted Search queries, lead details, credentials and identity remain excluded. The model receives bounded evidence only after an authorised button press, and every output stays a non-deterministic draft until explicit owner review.</p></section>

      <section aria-labelledby="configuration-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Names and operating state only · No values shown</p><h2 id="configuration-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Configuration manifest</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2">{futureConfigurationManifest.map((item) => <article key={item.name} className="min-w-0 rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="break-all font-mono text-sm font-bold">{item.name}</h3><span className="text-xs font-semibold uppercase tracking-[0.08em] text-gray-500">{item.status.replaceAll("-", " ")}</span></div><p className="mt-2 text-sm leading-relaxed text-gray-600">{item.purpose}</p><p className="mt-3 text-xs text-gray-500">{item.secret ? "Secret" : "Non-secret"} · server only · {item.required ? "required later" : "optional"} · {item.futureTask}</p></article>)}</div>
      </section>

      <section aria-labelledby="operational-decisions-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">No editable settings</p><h2 id="operational-decisions-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Operational decisions</h2><ul className="mt-5 divide-y divide-black/8">{snapshot.decisions.map((decision) => <li key={decision.id} className="py-4 first:pt-0 last:pb-0"><p className="font-semibold">{decision.question}</p><p className="mt-1 text-sm leading-relaxed text-gray-600">{decision.context}</p></li>)}</ul></section>
    </ControlRoomShell>
  );
}
