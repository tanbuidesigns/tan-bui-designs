import ControlRoomFilters from "@/components/control-room/ControlRoomFilters";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import MetricCard from "@/components/control-room/MetricCard";
import PageInventoryTable from "@/components/control-room/PageInventoryTable";
import { filterPages, firstParam, type SearchParamRecord } from "@/lib/control-room/filters";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import type { SummaryMetric } from "@/types/control-room";

export default async function ControlRoomPagesPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const filteredPages = filterPages(snapshot.pages, params);
  const metrics: readonly SummaryMetric[] = [
    { id: "routes", label: "Inventoried routes", value: snapshot.pageSummary.total, description: "Curated meaningful public page routes." },
    { id: "dedicated", label: "Dedicated metadata", value: snapshot.pageSummary.dedicatedMetadata, description: "Routes with route-specific titles and descriptions." },
    { id: "inherited", label: "Inherited metadata", value: snapshot.pageSummary.inheritedMetadata, description: "Routes relying on the generic root metadata." },
    { id: "review", label: "Requiring review", value: snapshot.pageSummary.requiringReview, description: "High-priority, content-review or indexability-decision records." },
    { id: "unavailable", label: "Unavailable / noindex", value: snapshot.pageSummary.unavailableOrNoindex, description: "Routes unavailable in production or intended not to be indexed." },
  ];

  return (
    <ControlRoomShell activeSection="pages" eyebrow="TBD Control Room · Pages" title="Verified public-page inventory" description="A curated snapshot of route availability, metadata, machine-readable structure and evidence paths from the current repository." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}</div>
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
