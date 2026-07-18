import DataSourceBadge from "./DataSourceBadge";
import VerificationBadge from "./VerificationBadge";

import type { ContentHypothesis, ReviewPriority } from "@/types/control-room";

const priorityStyles: Record<ReviewPriority, string> = {
  critical: "bg-red-100 text-red-900",
  high: "bg-orange-50 text-orange-900",
  medium: "bg-amber-50 text-amber-950",
  low: "bg-slate-100 text-slate-700",
};

export default function ContentOpportunities({ opportunities }: { opportunities: readonly ContentHypothesis[] }) {
  return (
    <section aria-labelledby="content-opportunities-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Content hypotheses awaiting Search Console and market validation</p>
      <h2 id="content-opportunities-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Opportunities to validate</h2>
      <div className="mt-6 divide-y divide-black/8">
        {opportunities.map((opportunity) => (
          <article key={opportunity.id} className="grid gap-5 py-6 first:pt-0 last:pb-0 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] xl:gap-10">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${priorityStyles[opportunity.priority]}`}>{opportunity.priority}</span>
                <span className="text-xs capitalize text-gray-500">{opportunity.status.replaceAll("-", " ")}</span>
              </div>
              <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.025em]">{opportunity.proposal}</h3>
              <p className="mt-2 text-sm text-gray-500">Topic: {opportunity.targetTopic}</p>
              <div className="mt-4 flex flex-wrap gap-2"><VerificationBadge status={opportunity.confidence} /><DataSourceBadge source={opportunity.source} /></div>
            </div>
            <dl className="grid gap-4 text-sm leading-relaxed text-gray-600 sm:grid-cols-2">
              <div><dt className="font-semibold text-black">Audience and intent</dt><dd className="mt-1">{opportunity.targetAudience}. {opportunity.userIntent}.</dd></div>
              <div><dt className="font-semibold text-black">Related work</dt><dd className="mt-1">{opportunity.relatedWork}</dd></div>
              <div><dt className="font-semibold text-black">Why it fits</dt><dd className="mt-1">{opportunity.fitReason}</dd></div>
              <div><dt className="font-semibold text-black">Business purpose</dt><dd className="mt-1">{opportunity.businessPurpose}</dd></div>
              <div><dt className="font-semibold text-black">Validation</dt><dd className="mt-1">{opportunity.validationMethod}</dd></div>
              <div><dt className="font-semibold text-black">Next action</dt><dd className="mt-1">{opportunity.nextAction}</dd></div>
              <div className="sm:col-span-2"><dt className="font-semibold text-black">Evidence source</dt><dd className="mt-1 break-all font-mono text-xs">{opportunity.evidenceSource}</dd></div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
