import type { ContentOpportunity, Priority } from "@/types/control-room";

const priorityClasses: Record<Priority, string> = {
  High: "bg-red-50 text-red-800",
  Medium: "bg-amber-50 text-amber-900",
  Low: "bg-blue-50 text-blue-800",
};

export default function ContentOpportunities({ opportunities }: { opportunities: readonly ContentOpportunity[] }) {
  return (
    <section aria-labelledby="content-opportunities-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Mock search information</p>
      <h2 id="content-opportunities-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Content opportunities</h2>
      <div className="mt-6 divide-y divide-black/8">
        {opportunities.map((opportunity) => (
          <article key={opportunity.id} className="grid gap-4 py-5 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${priorityClasses[opportunity.priority]}`}>{opportunity.priority}</span>
                <span className="text-xs text-gray-400">Position: {opportunity.currentPosition}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.025em]">{opportunity.query}</h3>
              <p className="mt-1 font-mono text-xs text-gray-400">{opportunity.matchingPage}</p>
            </div>
            <div className="text-sm leading-relaxed text-gray-600">
              <p>{opportunity.reason}</p>
              <p className="mt-2 font-semibold text-black">Recommended: {opportunity.recommendedAction}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
