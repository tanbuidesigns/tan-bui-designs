import DataSourceBadge from "./DataSourceBadge";
import VerificationBadge from "./VerificationBadge";

import type { ActionRecord, ReviewPriority } from "@/types/control-room";

const priorityStyles: Record<ReviewPriority, string> = {
  critical: "bg-red-100 text-red-900 ring-red-700/15",
  high: "bg-orange-50 text-orange-900 ring-orange-700/15",
  medium: "bg-amber-50 text-amber-950 ring-amber-700/15",
  low: "bg-slate-100 text-slate-700 ring-slate-600/15",
};

export default function ActionRegister({ actions }: { actions: readonly ActionRecord[] }) {
  return (
    <section aria-labelledby="action-register-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Filtered register</p>
          <h2 id="action-register-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Website actions</h2>
        </div>
        <p className="text-sm text-gray-500">{actions.length} {actions.length === 1 ? "action" : "actions"} shown</p>
      </div>

      <div className="mt-6 space-y-4">
        {actions.map((action) => (
          <article key={action.id} className="rounded-2xl border border-black/8 bg-[#f7f7f4] p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${priorityStyles[action.priority]}`}>{action.priority}</span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-gray-700 ring-1 ring-inset ring-black/10">{action.category}</span>
              <span className="text-xs capitalize text-gray-500">{action.status.replaceAll("-", " ")} · {action.effort.replaceAll("-", " ")} effort</span>
            </div>
            <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.03em] sm:text-2xl">{action.title}</h3>
            <p className="mt-1 font-mono text-xs text-gray-500">{action.affectedArea}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">{action.problemOrOpportunity}</p>
            <dl className="mt-5 grid gap-4 border-t border-black/8 pt-5 text-sm leading-relaxed md:grid-cols-2">
              <div><dt className="font-semibold text-black">Why it matters</dt><dd className="mt-1 text-gray-600">{action.reason}</dd></div>
              <div><dt className="font-semibold text-black">Success measure</dt><dd className="mt-1 text-gray-600">{action.successMeasure}</dd></div>
              <div><dt className="font-semibold text-black">Business impact</dt><dd className="mt-1 text-gray-600">{action.businessImpact}</dd></div>
              <div><dt className="font-semibold text-black">User impact</dt><dd className="mt-1 text-gray-600">{action.userImpact}</dd></div>
              <div><dt className="font-semibold text-black">Technical relevance</dt><dd className="mt-1 text-gray-600">{action.technicalRelevance}</dd></div>
              <div><dt className="font-semibold text-black">Dependency</dt><dd className="mt-1 text-gray-600">{action.dependency}</dd></div>
              <div><dt className="font-semibold text-black">Suggested owner</dt><dd className="mt-1 text-gray-600">{action.suggestedOwner}</dd></div>
              <div><dt className="font-semibold text-black">Governance</dt><dd className="mt-1 text-gray-600">Approval {action.approvalRequired ? "required" : "not currently required"}; external access {action.externalAccessRequired ? "required" : "not required"}.</dd></div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-2"><VerificationBadge status={action.verificationStatus} /><DataSourceBadge source={action.source} /></div>
            <details className="mt-5 border-t border-black/8 pt-4">
              <summary className="cursor-pointer text-sm font-semibold underline decoration-gray-300 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Evidence and notes</summary>
              <ul className="mt-3 space-y-1 font-mono text-xs text-gray-500">
                {action.evidencePaths.map((path) => <li key={path} className="break-all">{path}</li>)}
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{action.notes}</p>
            </details>
          </article>
        ))}
      </div>
      {actions.length === 0 ? <p className="py-10 text-center text-sm text-gray-500">No actions match the selected filters.</p> : null}
    </section>
  );
}
