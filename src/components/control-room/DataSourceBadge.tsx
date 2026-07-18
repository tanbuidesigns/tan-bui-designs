import type { DataSourceLabel } from "@/types/control-room";

const labels: Record<DataSourceLabel, string> = {
  "repository-review": "Repository review",
  "derived-from-baseline": "Derived baseline",
  "manual-hypothesis": "Manual hypothesis",
  "prototype-only": "Prototype only",
  "planned-integration": "Planned integration",
};

export default function DataSourceBadge({ source }: { source: DataSourceLabel }) {
  return <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-700 ring-1 ring-inset ring-slate-600/15">Source: {labels[source]}</span>;
}
