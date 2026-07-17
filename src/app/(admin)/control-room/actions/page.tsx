import ActionRegister from "@/components/control-room/ActionRegister";
import ControlRoomFilters from "@/components/control-room/ControlRoomFilters";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import MetricCard from "@/components/control-room/MetricCard";
import { filterActions, firstParam, type SearchParamRecord } from "@/lib/control-room/filters";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { sortActions } from "@/lib/control-room/sorting";
import type { SummaryMetric } from "@/types/control-room";

export default async function ControlRoomActionsPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const actions = sortActions(filterActions(snapshot.actions, params));
  const summary = snapshot.actionSummary;
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
      <ControlRoomFilters action="/control-room/actions" fields={[
        { name: "category", label: "Category", value: firstParam(params, "category"), options: ["SEO", "Content", "Performance", "Security", "Analytics", "Infrastructure", "Accessibility", "Privacy", "Conversion"].map((value) => ({ value, label: value })) },
        { name: "priority", label: "Priority", value: firstParam(params, "priority"), options: ["critical", "high", "medium", "low"].map((value) => ({ value, label: value })) },
        { name: "effort", label: "Effort", value: firstParam(params, "effort"), options: ["small", "medium", "large", "requires-discovery"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "status", label: "Status", value: firstParam(params, "status"), options: ["backlog", "ready", "in-progress", "blocked", "review", "done"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "approval", label: "Approval requirement", value: firstParam(params, "approval"), options: [{ value: "required", label: "Required" }, { value: "not-required", label: "Not required" }] },
        { name: "verification", label: "Verification", value: firstParam(params, "verification"), options: ["confirmed", "inferred", "requires-verification"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
      ]} />
      <ActionRegister actions={actions} />
    </ControlRoomShell>
  );
}
