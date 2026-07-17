import type { OperationalReadinessItem, ReadinessChecklistItem } from "@/types/control-room";

export function Checklist({ title, items }: { title: string; items: readonly ReadinessChecklistItem[] }) {
  return (
    <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <h2 className="text-2xl font-bold tracking-[-0.04em]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => <li key={item.id} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-3 rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${item.complete ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-950"}`}>{item.complete ? "✓" : "—"}</span><div><p className="font-semibold">{item.label}</p><p className="mt-1 text-sm leading-relaxed text-gray-600">{item.explanation}</p></div></li>)}
      </ul>
    </section>
  );
}

export function ReadinessList({ title, items }: { title: string; items: readonly OperationalReadinessItem[] }) {
  return (
    <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <h2 className="text-2xl font-bold tracking-[-0.04em]">{title}</h2>
      <ul className="mt-5 divide-y divide-black/8">{items.map((item) => <li key={item.id} className="py-4 first:pt-0 last:pb-0"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-semibold">{item.label}</p><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-slate-700">{item.state.replaceAll("-", " ")}</span></div><p className="mt-2 text-sm leading-relaxed text-gray-600">{item.explanation}</p></li>)}</ul>
    </section>
  );
}
