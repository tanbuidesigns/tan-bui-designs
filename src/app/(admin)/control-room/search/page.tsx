import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import FreshnessBadge from "@/components/control-room/FreshnessBadge";
import IntegrationStatusBadge from "@/components/control-room/IntegrationStatusBadge";
import OperationalState from "@/components/control-room/OperationalState";
import SearchPerformanceReport from "@/components/control-room/SearchPerformanceReport";
import SearchRunForm from "@/components/control-room/SearchRunForm";
import SecurityClassificationBadge from "@/components/control-room/SecurityClassificationBadge";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";
import { getSearchOverview } from "@/lib/control-room/search/get-search-overview";

type SearchParamRecord = Record<string, string | string[] | undefined>;
function first(value: string | string[] | undefined): string | undefined { return Array.isArray(value) ? value[0] : value; }

export default async function ControlRoomSearchPage({ searchParams }: { searchParams: Promise<SearchParamRecord> }) {
  const params = await searchParams;
  const snapshot = getControlRoomSnapshot();
  const overview = await getSearchOverview({ period: first(params.period), run: first(params.run) });
  const result = overview.liveResult;
  return <ControlRoomShell activeSection="search" eyebrow="TBD Control Room · Search" title="Google Search performance" description="Finalised organic-search data from the registered Search Console property, requested manually and kept internal without persistence." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
    <SearchRunForm periods={overview.periods} selectedPeriod={overview.request.periodId} />
    {overview.validationMessage ? <OperationalState kind="error" title="The reporting request was not valid" explanation={overview.validationMessage} nextStep="Choose the 28-day or 90-day finalised reporting period." /> : null}
    {!overview.shouldRun ? <OperationalState kind="no-data" title="No Search Console report has been requested" explanation="Opening this page does not request an OAuth token or contact Search Console. Submit the form for one deliberate report." /> : null}
    {result?.status === "unavailable" ? <OperationalState kind="configuration-missing" title="Search Console is unavailable" explanation={result.reason} nextStep={result.nextRequirement} /> : null}
    {result?.status === "error" ? <OperationalState kind={result.error.kind === "timeout" || result.error.kind === "quota" || result.error.kind === "network" ? "degraded" : "error"} title="Search Console could not complete this report" explanation={result.error.message} nextStep={result.retryable ? "Try one manual report later." : result.error.kind === "authorization" ? "Add the dedicated service account as a Full user of the registered property, then retry once." : "Review the server-only configuration before retrying."} /> : null}
    {result?.status === "success" ? <SearchPerformanceReport snapshot={result.data} /> : null}

    <section aria-labelledby="search-source-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">Registered internal source</p><h2 id="search-source-title" className="mt-2 text-2xl font-bold tracking-[-0.035em]">{overview.source.displayName}</h2></div><div className="flex flex-wrap gap-2"><IntegrationStatusBadge state={overview.source.lifecycleState} /><FreshnessBadge state={overview.source.freshness.state} /><SecurityClassificationBadge classification={overview.source.securityClassification} /></div></div><p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">{overview.source.description}</p><dl className="mt-5 grid gap-4 border-t border-black/8 pt-5 text-sm md:grid-cols-2"><div><dt className="font-semibold">Registered property</dt><dd className="mt-1 text-gray-600">{overview.property?.displayLabel ?? "No enabled property"} · selected only by server configuration</dd></div><div><dt className="font-semibold">Access</dt><dd className="mt-1 text-gray-600">Read-only service-account scope; Full user property access is sufficient.</dd></div><div><dt className="font-semibold">Refresh</dt><dd className="mt-1 text-gray-600">Manual on demand only. No token cache, report storage or scheduled collection.</dd></div><div><dt className="font-semibold">Limit</dt><dd className="mt-1 text-gray-600">One token exchange and exactly five fixed Search Analytics requests per valid run.</dd></div></dl></section>
  </ControlRoomShell>;
}
