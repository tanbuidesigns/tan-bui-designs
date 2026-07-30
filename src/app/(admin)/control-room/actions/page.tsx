import ActionRegister from "@/components/control-room/ActionRegister";
import Link from "next/link";
import ControlRoomFilters from "@/components/control-room/ControlRoomFilters";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import MetricCard from "@/components/control-room/MetricCard";
import { filterActions, firstParam, type SearchParamRecord } from "@/lib/control-room/filters";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { sortActions } from "@/lib/control-room/sorting";
import { getActionSummary } from "@/lib/control-room/summaries";
import { getActionWorkflowStorage } from "@/lib/control-room/actions/storage";
import { mergeActionWorkflow } from "@/lib/control-room/actions/service";
import type { ActionWorkflowRecord } from "@/lib/control-room/actions/domain";
import type { SummaryMetric } from "@/types/control-room";

export default async function ControlRoomActionsPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const workflowStorage = await getActionWorkflowStorage();
  let workflowRecords: readonly ActionWorkflowRecord[] = [];
  let workflowReady = workflowStorage.status === "ready";
  if (workflowStorage.status === "ready") {
    try { workflowRecords = [...await workflowStorage.repository.list()]; } catch { workflowReady = false; }
  }
  const allActions = mergeActionWorkflow(snapshot.actions, workflowRecords);
  const actions = sortActions(filterActions(allActions, params));
  const summary = getActionSummary(allActions);
  const state = firstParam(params, "state");
  const exportParams = new URLSearchParams();
  for (const key of ["category", "priority", "effort", "status", "approval", "verification"] as const) {
    const value = firstParam(params, key);
    if (value) exportParams.set(key, value);
  }
  const exportHref = `/control-room/actions/export${exportParams.size ? `?${exportParams}` : ""}`;
  const metrics: readonly SummaryMetric[] = [
    { id: "priority", label: "Critical / high open", value: summary.openCriticalHigh, description: "Open actions currently curated as critical or high priority." },
    { id: "ready", label: "Ready", value: summary.ready, description: "Actions recorded as ready to begin." },
    { id: "blocked", label: "Blocked", value: summary.blocked, description: "Actions waiting on a dependency or decision." },
    { id: "external", label: "External access", value: summary.externalAccess, description: "Open actions requiring account or service access." },
    { id: "approval", label: "Approval required", value: summary.approvalRequired, description: "Open actions requiring an owner or governance decision." },
  ];

  return (
    <ControlRoomShell activeSection="actions" eyebrow="TBD Control Room · Actions" title="Prioritised website action register" description="Recorded improvements remain separate from implementation, with explicit impact, effort, dependencies, evidence and approval needs." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      <p className="rounded-xl border border-black/8 bg-white px-5 py-4 text-sm leading-relaxed text-gray-600"><strong className="text-black">How priority works:</strong> Priority reflects current evidence, likely impact, effort and dependency. It is a planning aid, not an automated SEO guarantee.</p>
      {!workflowReady ? <p className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-950">Editable workflow storage is awaiting the Phase 3 database migration. Curated actions remain readable.</p> : null}
      {state ? <p className="rounded-xl border border-black/8 bg-white px-5 py-4 text-sm">Workflow result: <strong>{state.replaceAll("-", " ")}</strong>.</p> : null}
      <details className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
        <summary className="cursor-pointer text-lg font-bold">Create a new action</summary>
        <form action="/control-room/actions/create" method="post" className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold">Title<input required name="title" maxLength={160} className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal" /></label>
          <label className="text-sm font-semibold">Affected area<input required name="affectedArea" maxLength={300} className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal" /></label>
          <label className="text-sm font-semibold md:col-span-2">Description<textarea required name="description" maxLength={1500} rows={4} className="mt-1 block w-full rounded-lg border border-black/15 p-3 font-normal" /></label>
          <label className="text-sm font-semibold">Category<select name="category" defaultValue="Content" className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal">{["SEO", "Content", "Performance", "Security", "Analytics", "Infrastructure", "Accessibility", "Privacy", "Conversion"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-sm font-semibold">Priority<select name="priority" defaultValue="medium" className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal">{["critical", "high", "medium", "low"].map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className="text-sm font-semibold">Effort<select name="effort" defaultValue="requires-discovery" className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal">{["small", "medium", "large", "requires-discovery"].map((value) => <option key={value} value={value}>{value.replaceAll("-", " ")}</option>)}</select></label>
          <label className="text-sm font-semibold">Initial status<select name="status" defaultValue="backlog" className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal">{["backlog", "ready", "in-progress", "blocked", "review", "done"].map((value) => <option key={value} value={value}>{value.replaceAll("-", " ")}</option>)}</select></label>
          <label className="text-sm font-semibold">Assigned owner<input name="assignedOwner" maxLength={120} className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal" /></label>
          <label className="text-sm font-semibold">Success measure<input required name="successMeasure" maxLength={500} className="mt-1 block min-h-11 w-full rounded-lg border border-black/15 px-3 font-normal" /></label>
          <div className="md:col-span-2"><button disabled={!workflowReady} className="min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40" type="submit">Create action</button></div>
        </form>
      </details>
      <div className="flex justify-end">
        <Link href={exportHref} className="inline-flex min-h-11 items-center rounded-lg border border-black/15 bg-white px-4 text-sm font-semibold hover:border-black/40">
          Export filtered actions as CSV
        </Link>
      </div>
      <ControlRoomFilters action="/control-room/actions" fields={[
        { name: "category", label: "Category", value: firstParam(params, "category"), options: ["SEO", "Content", "Performance", "Security", "Analytics", "Infrastructure", "Accessibility", "Privacy", "Conversion"].map((value) => ({ value, label: value })) },
        { name: "priority", label: "Priority", value: firstParam(params, "priority"), options: ["critical", "high", "medium", "low"].map((value) => ({ value, label: value })) },
        { name: "effort", label: "Effort", value: firstParam(params, "effort"), options: ["small", "medium", "large", "requires-discovery"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "status", label: "Status", value: firstParam(params, "status"), options: ["backlog", "ready", "in-progress", "blocked", "review", "done"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "approval", label: "Approval requirement", value: firstParam(params, "approval"), options: [{ value: "required", label: "Required" }, { value: "not-required", label: "Not required" }] },
        { name: "verification", label: "Verification", value: firstParam(params, "verification"), options: ["confirmed", "inferred", "requires-verification"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
      ]} />
      <ActionRegister actions={actions} editable={workflowReady} />
    </ControlRoomShell>
  );
}
