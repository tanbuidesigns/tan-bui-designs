import Link from "next/link";

import ContentOpportunities from "@/components/control-room/ContentOpportunities";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import EmptyIntegrationState from "@/components/control-room/EmptyIntegrationState";
import { deriveSearchContentOpportunities } from "@/lib/control-room/content/search-opportunities";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { getHistoryStorage } from "@/lib/control-room/history/storage";

export default async function ControlRoomContentPage() {
  const snapshot = getControlRoomSnapshot();
  const storage = await getHistoryStorage();
  const runs = storage.status === "ready" ? await storage.repository.listRuns({ limit: 50, cursor: null }).catch(() => null) : null;
  const searchRun = runs?.runs.find((run) => run.source === "search_console" && run.periodKey === "28d" && ["complete", "partial", "empty"].includes(run.status)) ?? null;
  const detail = searchRun && storage.status === "ready" ? await storage.repository.getRunDetail(searchRun.id).catch(() => null) : null;
  const current = detail?.searchPeriods.find((period) => period.role === "current");
  const previous = detail?.searchPeriods.find((period) => period.role === "previous");
  const evidenceOpportunities = current && previous ? deriveSearchContentOpportunities({ current: current.queries, previous: previous.queries }) : [];

  return (
    <ControlRoomShell activeSection="content" eyebrow="TBD Control Room · Content" title="Content and public-tool opportunities" description="Dated Search Console evidence is interpreted separately from manually curated hypotheses, with explicit thresholds and no automatic ranking claims." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      {searchRun ? <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Restricted Search evidence · latest 28-day run</p><h2 className="mt-2 text-2xl font-bold">Evidence-backed review queue</h2></div><Link className="text-sm font-semibold underline underline-offset-4" href={`/control-room/history/${searchRun.id}`}>Open source run</Link></div><p className="mt-3 text-sm leading-relaxed text-gray-600">These are review prompts derived from the returned top-query rows. Search Console omits some anonymised queries, average position is not a fixed rank, and query rows do not identify which page earned the impression.</p>{evidenceOpportunities.length ? <div className="mt-5 grid gap-4 xl:grid-cols-2">{evidenceOpportunities.map((item) => <article key={item.query} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-5"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">{item.classification.replaceAll("-", " ")}</p><h3 className="mt-2 text-lg font-bold">{item.query}</h3><dl className="mt-3 grid grid-cols-4 gap-2 text-xs"><div><dt className="text-gray-500">Clicks</dt><dd className="font-semibold">{item.clicks}</dd></div><div><dt className="text-gray-500">Impressions</dt><dd className="font-semibold">{item.impressions}</dd></div><div><dt className="text-gray-500">CTR</dt><dd className="font-semibold">{(item.ctr * 100).toFixed(2)}%</dd></div><div><dt className="text-gray-500">Position</dt><dd className="font-semibold">{item.averagePosition.toFixed(1)}</dd></div></dl><p className="mt-3 text-sm leading-relaxed text-gray-600">{item.rationale}</p></article>)}</div> : <p className="mt-5 rounded-xl border border-dashed border-black/15 p-5 text-sm text-gray-600">The latest returned rows do not meet the deliberately conservative review thresholds. No recommendation is manufactured.</p>}</section> : <EmptyIntegrationState title="No stored 28-day Search comparison is available" message="Run or await a Search Console capture. Evidence-backed opportunities will appear only when a current and previous returned query set exists." />}
      <ContentOpportunities opportunities={snapshot.contentHypotheses} />
    </ControlRoomShell>
  );
}
