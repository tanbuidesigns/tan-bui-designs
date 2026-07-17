import type { SearchMetricSet, SearchPanel, SearchPerformanceSnapshot } from "@/types/control-room-search";

const number = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
const decimal = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });
const percent = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

function metricItems(metrics: SearchMetricSet | null) {
  return [
    ["Clicks", metrics ? number.format(metrics.clicks) : "Unavailable"],
    ["Impressions", metrics ? number.format(metrics.impressions) : "Unavailable"],
    ["CTR", metrics ? percent.format(metrics.ctr) : "Unavailable"],
    ["Average position", metrics ? decimal.format(metrics.averagePosition) : "Unavailable"],
  ] as const;
}

function PanelState({ panel, label }: { panel: SearchPanel<unknown>; label: string }) {
  if (panel.status === "success") return null;
  return <p className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${panel.status === "empty" ? "border-black/8 bg-[#f7f7f4] text-gray-600" : "border-amber-200 bg-amber-50 text-amber-950"}`}>{label}: {panel.status === "empty" ? panel.message : panel.message}</p>;
}

function DailyTrend({ panel }: { panel: SearchPerformanceSnapshot["daily"] }) {
  const rows = panel.status === "success" || panel.status === "empty" ? panel.data : [];
  const width = 720; const height = 180; const padding = 18;
  const maxClicks = Math.max(1, ...rows.map((row) => row.metrics.clicks));
  const maxImpressions = Math.max(1, ...rows.map((row) => row.metrics.impressions));
  const points = (key: "clicks" | "impressions", maximum: number) => rows.map((row, index) => {
    const x = rows.length === 1 ? width / 2 : padding + index * ((width - padding * 2) / Math.max(1, rows.length - 1));
    const y = height - padding - (row.metrics[key] / maximum) * (height - padding * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <section aria-labelledby="daily-trend-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
      <h2 id="daily-trend-title" className="text-2xl font-bold tracking-[-0.04em]">Daily trend</h2>
      <p className="mt-2 text-sm text-gray-600">Clicks and impressions for each finalised Pacific Time reporting date.</p>
      <PanelState panel={panel} label="Daily trend" />
      {rows.length ? <><div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold"><span><span aria-hidden="true" className="mr-2 inline-block h-2 w-5 rounded-full bg-black" />Clicks</span><span><span aria-hidden="true" className="mr-2 inline-block h-2 w-5 rounded-full bg-indigo-500" />Impressions</span></div><svg className="mt-4 h-auto w-full" viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="daily-chart-title daily-chart-description"><title id="daily-chart-title">Daily Search Console clicks and impressions</title><desc id="daily-chart-description">A visual summary of {rows.length} daily observations. The complete values are available in the table below.</desc><polyline points={points("impressions", maxImpressions)} fill="none" stroke="#6366f1" strokeWidth="3" vectorEffect="non-scaling-stroke" /><polyline points={points("clicks", maxClicks)} fill="none" stroke="#111" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg><div className="mt-5 max-h-80 overflow-auto rounded-xl border border-black/8"><table className="w-full min-w-[38rem] text-left text-sm"><caption className="sr-only">Daily Search Console metric values</caption><thead className="sticky top-0 bg-[#f7f7f4]"><tr><th scope="col" className="p-3">Date</th><th scope="col" className="p-3">Clicks</th><th scope="col" className="p-3">Impressions</th><th scope="col" className="p-3">CTR</th><th scope="col" className="p-3">Average position</th></tr></thead><tbody className="divide-y divide-black/8">{rows.map((row) => <tr key={row.date}><th scope="row" className="p-3 font-semibold">{row.date}</th><td className="p-3">{number.format(row.metrics.clicks)}</td><td className="p-3">{number.format(row.metrics.impressions)}</td><td className="p-3">{percent.format(row.metrics.ctr)}</td><td className="p-3">{decimal.format(row.metrics.averagePosition)}</td></tr>)}</tbody></table></div></> : null}
    </section>
  );
}

function QueriesTable({ panel }: { panel: SearchPerformanceSnapshot["queries"] }) {
  const rows = panel.status === "success" || panel.status === "empty" ? panel.data.slice(0, 25) : [];
  return <section aria-labelledby="queries-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 id="queries-title" className="text-2xl font-bold tracking-[-0.04em]">Top returned queries</h2><p className="mt-2 text-sm text-gray-600">Search Console returns top rows and omits some queries for privacy.</p><PanelState panel={panel} label="Top queries" />{rows.length ? <div className="mt-5 overflow-x-auto rounded-xl border border-black/8"><table className="w-full min-w-[48rem] text-left text-sm"><caption className="sr-only">Top Search Console queries, limited to 25 visible rows</caption><thead className="bg-[#f7f7f4]"><tr><th scope="col" className="p-3">Query</th><th scope="col" className="p-3">Clicks</th><th scope="col" className="p-3">Impressions</th><th scope="col" className="p-3">CTR</th><th scope="col" className="p-3">Average position</th></tr></thead><tbody className="divide-y divide-black/8">{rows.map((row) => <tr key={`${row.rankWithinReturnedRows}-${row.query}`}><th scope="row" className="max-w-sm whitespace-normal break-words p-3 font-semibold">{row.query}</th><td className="p-3">{number.format(row.metrics.clicks)}</td><td className="p-3">{number.format(row.metrics.impressions)}</td><td className="p-3">{percent.format(row.metrics.ctr)}</td><td className="p-3">{decimal.format(row.metrics.averagePosition)}</td></tr>)}</tbody></table></div> : null}</section>;
}

function PagesTable({ panel }: { panel: SearchPerformanceSnapshot["pages"] }) {
  const rows = panel.status === "success" || panel.status === "empty" ? panel.data.slice(0, 25) : [];
  return <section aria-labelledby="pages-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 id="pages-title" className="text-2xl font-bold tracking-[-0.04em]">Top canonical pages</h2><p className="mt-2 text-sm text-gray-600">Google may aggregate data under a selected canonical URL. Matching is informational and does not change the local inventory.</p><PanelState panel={panel} label="Top pages" />{rows.length ? <div className="mt-5 overflow-x-auto rounded-xl border border-black/8"><table className="w-full min-w-[58rem] text-left text-sm"><caption className="sr-only">Top Search Console pages, limited to 25 visible rows</caption><thead className="bg-[#f7f7f4]"><tr><th scope="col" className="p-3">Page</th><th scope="col" className="p-3">Local inventory match</th><th scope="col" className="p-3">Clicks</th><th scope="col" className="p-3">Impressions</th><th scope="col" className="p-3">CTR</th><th scope="col" className="p-3">Average position</th></tr></thead><tbody className="divide-y divide-black/8">{rows.map((row) => <tr key={`${row.rankWithinReturnedRows}-${row.pageUrl}`}><th scope="row" className="max-w-sm whitespace-normal break-all p-3 font-mono text-xs">{row.displayPath}</th><td className="p-3">{row.matchedLocalPageName ?? "Unmatched"}</td><td className="p-3">{number.format(row.metrics.clicks)}</td><td className="p-3">{number.format(row.metrics.impressions)}</td><td className="p-3">{percent.format(row.metrics.ctr)}</td><td className="p-3">{decimal.format(row.metrics.averagePosition)}</td></tr>)}</tbody></table></div> : null}</section>;
}

export default function SearchPerformanceReport({ snapshot }: { snapshot: SearchPerformanceSnapshot }) {
  const devices = snapshot.devices.status === "success" || snapshot.devices.status === "empty" ? snapshot.devices.data : [];
  return <div className="space-y-6">
    <section aria-labelledby="search-summary-title" className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-5 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">Live Search Console result · Internal</p><h2 id="search-summary-title" className="mt-2 text-2xl font-bold tracking-[-0.04em]">{snapshot.property.displayLabel}</h2><dl className="mt-5 grid gap-4 border-t border-emerald-900/10 pt-5 text-sm sm:grid-cols-2 xl:grid-cols-3"><div><dt className="font-semibold">Property type</dt><dd className="mt-1 capitalize text-emerald-950/70">{snapshot.property.propertyType.replace("-", " ")}</dd></div><div><dt className="font-semibold">Reporting period</dt><dd className="mt-1 text-emerald-950/70">{snapshot.period.startDate} to {snapshot.period.endDate}</dd></div><div><dt className="font-semibold">Data policy</dt><dd className="mt-1 text-emerald-950/70">Finalised · Web · Pacific Time</dd></div><div><dt className="font-semibold">Generated</dt><dd className="mt-1 text-emerald-950/70">{snapshot.providerGeneratedAt}</dd></div><div><dt className="font-semibold">Fixed queries</dt><dd className="mt-1 text-emerald-950/70">{snapshot.requestCount.successful} of {snapshot.requestCount.requested} successful</dd></div><div><dt className="font-semibold">Result state</dt><dd className="mt-1 text-emerald-950/70">{snapshot.requestCount.partial ? "Partial result" : "Complete requested panels"}</dd></div></dl></section>
    <section aria-labelledby="search-metrics-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 id="search-metrics-title" className="text-2xl font-bold tracking-[-0.04em]">Property totals</h2>{snapshot.totals ? null : <p className="mt-3 text-sm text-gray-600">The property returned no totals for this period.</p>}<dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{metricItems(snapshot.totals).map(([label, value]) => <div key={label} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><dt className="text-sm font-semibold">{label}</dt><dd className="mt-4 text-3xl font-bold tracking-[-0.04em]">{value}</dd></div>)}</dl></section>
    <DailyTrend panel={snapshot.daily} />
    <QueriesTable panel={snapshot.queries} />
    <PagesTable panel={snapshot.pages} />
    <section aria-labelledby="devices-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 id="devices-title" className="text-2xl font-bold tracking-[-0.04em]">Device breakdown</h2><PanelState panel={snapshot.devices} label="Device breakdown" />{devices.length ? <div className="mt-5 grid gap-3 md:grid-cols-3">{devices.map((row) => <article key={row.device} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><h3 className="font-semibold capitalize">{row.device.toLowerCase()}</h3><dl className="mt-4 grid grid-cols-2 gap-3 text-sm">{metricItems(row.metrics).map(([label, value]) => <div key={label}><dt className="text-gray-500">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>)}</dl></article>)}</div> : null}</section>
    {snapshot.warnings.length ? <section aria-labelledby="search-warnings-title" className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-5 sm:p-7"><h2 id="search-warnings-title" className="text-2xl font-bold tracking-[-0.04em]">Partial-result warnings</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">{snapshot.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></section> : null}
    <aside aria-labelledby="search-limitations-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white sm:p-7"><h2 id="search-limitations-title" className="text-2xl font-bold tracking-[-0.04em]">How to interpret this report</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/65">{snapshot.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul><p className="mt-4 border-t border-white/10 pt-4 text-sm leading-relaxed text-white/65">This is observed Google Search performance for planning context. It does not prove causation, provide complete keyword research, measure other search engines or represent AI citations generally.</p></aside>
  </div>;
}
