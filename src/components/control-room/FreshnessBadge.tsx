import type { DataFreshnessState } from "@/types/control-room";

const styles: Record<DataFreshnessState, string> = {
  current: "bg-emerald-50 text-emerald-800",
  ageing: "bg-amber-50 text-amber-950",
  stale: "bg-orange-50 text-orange-900",
  unknown: "bg-blue-50 text-blue-800",
  "not-applicable": "bg-slate-100 text-slate-700",
};

export default function FreshnessBadge({ state }: { state: DataFreshnessState }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${styles[state]}`}>Freshness: {state.replaceAll("-", " ")}</span>;
}
