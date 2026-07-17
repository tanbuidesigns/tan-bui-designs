import type { IntegrationLifecycleState } from "@/types/control-room";

const styles: Record<IntegrationLifecycleState, string> = {
  local: "bg-blue-50 text-blue-800 ring-blue-700/15",
  planned: "bg-slate-100 text-slate-700 ring-slate-600/15",
  "awaiting-configuration": "bg-amber-50 text-amber-950 ring-amber-700/15",
  ready: "bg-indigo-50 text-indigo-800 ring-indigo-700/15",
  connected: "bg-cyan-50 text-cyan-800 ring-cyan-700/15",
  healthy: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  stale: "bg-orange-50 text-orange-900 ring-orange-700/15",
  degraded: "bg-amber-50 text-amber-950 ring-amber-700/15",
  unavailable: "bg-gray-100 text-gray-700 ring-gray-600/15",
  error: "bg-red-50 text-red-900 ring-red-700/15",
};

export default function IntegrationStatusBadge({ state }: { state: IntegrationLifecycleState }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${styles[state]}`}>{state.replaceAll("-", " ")}</span>;
}
