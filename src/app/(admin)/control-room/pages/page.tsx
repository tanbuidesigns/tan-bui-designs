import ControlRoomFilters from "@/components/control-room/ControlRoomFilters";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import MetricCard from "@/components/control-room/MetricCard";
import PageInventoryTable from "@/components/control-room/PageInventoryTable";
import { filterPages, firstParam, type SearchParamRecord } from "@/lib/control-room/filters";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import type { SummaryMetric } from "@/types/control-room";
import { controlRoomBuildManifest } from "@/lib/control-room/build-manifest";

export default async function ControlRoomPagesPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const filteredPages = filterPages(snapshot.pages, params);
  const metrics: readonly SummaryMetric[] = [
    { id: "routes", label: "Curated public routes", value: snapshot.pageSummary.total, description: "Meaningful public routes with reviewed operating metadata." },
    { id: "dedicated", label: "Dedicated metadata", value: snapshot.pageSummary.dedicatedMetadata, description: "Routes with route-specific titles and descriptions." },
    { id: "inherited", label: "Inherited metadata", value: snapshot.pageSummary.inheritedMetadata, description: "Routes relying on the generic root metadata." },
    { id: "review", label: "Requiring review", value: snapshot.pageSummary.requiringReview, description: "High-priority, content-review or indexability-decision records." },
    { id: "unavailable", label: "Unavailable / noindex", value: snapshot.pageSummary.unavailableOrNoindex, description: "Routes unavailable in production or intended not to be indexed." },
  ];

  return (
    <ControlRoomShell activeSection="pages" eyebrow="TBD Control Room · Pages" title="Verified public-page inventory" description="A reviewed public baseline paired with an automatic App Router scan, so new, private and dynamic route files cannot silently disappear from operational review." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
      <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Automatic build inventory · {controlRoomBuildManifest.generatedOn}</p><h2 className="mt-2 text-2xl font-bold">{controlRoomBuildManifest.routes.length} page route files detected</h2><p className="mt-2 break-all font-mono text-xs text-gray-500">Source {controlRoomBuildManifest.sourceCommit ?? "unavailable"} · digest {controlRoomBuildManifest.routeSourceDigest}</p><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[48rem] text-left text-sm"><thead><tr className="border-b border-black/10 text-xs uppercase text-gray-500"><th className="py-2">Route template</th><th>Visibility</th><th>Metadata</th><th>Runtime</th><th>Source file</th></tr></thead><tbody>{controlRoomBuildManifest.routes.map((route) => <tr key={route.file} className="border-b border-black/6"><td className="py-2 font-semibold">{route.route}</td><td>{route.visibility}</td><td>{route.metadata}</td><td>{route.dynamic ? "dynamic" : route.clientComponent ? "client" : "server/static"}</td><td className="font-mono text-xs text-gray-500">{route.file}</td></tr>)}</tbody></table></div></section>
      <ControlRoomFilters action="/control-room/pages" fields={[
        { name: "category", label: "Page category", value: firstParam(params, "category"), options: ["core", "case-study", "blog", "design-handbook", "experimental", "legal"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "priority", label: "Review priority", value: firstParam(params, "priority"), options: ["critical", "high", "medium", "low"].map((value) => ({ value, label: value })) },
        { name: "verification", label: "Verification", value: firstParam(params, "verification"), options: ["confirmed", "inferred", "requires-verification"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
        { name: "metadata", label: "Metadata status", value: firstParam(params, "metadata"), options: ["dedicated", "inherited", "missing", "requires-verification"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
      ]} />
      <PageInventoryTable records={filteredPages} />
    </ControlRoomShell>
  );
}
