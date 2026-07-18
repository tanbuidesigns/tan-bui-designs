import type { LabMetric, LabPerformanceResult, PerformanceTarget } from "@/types/control-room";

const scoreLabels = {
  performance: "Performance",
  accessibility: "Accessibility",
  "best-practices": "Best practices",
  seo: "SEO",
} as const;

function metricText(metric: LabMetric): string {
  if (metric.displayValue) return metric.displayValue;
  return metric.value === null ? "Unavailable" : String(metric.value);
}

export default function LabPerformanceReport({ result, target }: { result: LabPerformanceResult; target: PerformanceTarget }) {
  const metrics = [
    ["First Contentful Paint", result.metrics.firstContentfulPaint],
    ["Largest Contentful Paint", result.metrics.largestContentfulPaint],
    ["Cumulative Layout Shift", result.metrics.cumulativeLayoutShift],
    ["Total Blocking Time", result.metrics.totalBlockingTime],
    ["Speed Index", result.metrics.speedIndex],
  ] as const;

  return (
    <div className="space-y-6">
      <section aria-labelledby="run-summary-title" className="rounded-[1.35rem] border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900">Live laboratory result</p>
        <h2 id="run-summary-title" className="mt-2 text-2xl font-bold tracking-[-0.04em]">{target.displayLabel} · {result.strategy}</h2>
        <dl className="mt-5 grid gap-4 border-t border-emerald-900/10 pt-5 text-sm md:grid-cols-2 xl:grid-cols-3">
          <div><dt className="font-semibold">Requested route</dt><dd className="mt-1 break-all text-emerald-950/70">{target.route}</dd></div>
          <div><dt className="font-semibold">Final audited URL</dt><dd className="mt-1 break-all text-emerald-950/70">{result.finalUrl ?? "Unavailable"}</dd></div>
          <div><dt className="font-semibold">Analysis time</dt><dd className="mt-1 text-emerald-950/70">{result.analysisTimestamp ?? "Unavailable"}</dd></div>
          <div><dt className="font-semibold">Lighthouse version</dt><dd className="mt-1 text-emerald-950/70">{result.lighthouseVersion ?? "Unavailable"}</dd></div>
          <div><dt className="font-semibold">Source status</dt><dd className="mt-1 text-emerald-950/70">Successful for this rendered request only</dd></div>
          <div><dt className="font-semibold">Redirect</dt><dd className="mt-1 text-emerald-950/70">{result.redirected ? "Safe own-domain redirect followed" : "No redirect detected"}</dd></div>
        </dl>
      </section>

      <section aria-labelledby="category-scores-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
        <h2 id="category-scores-title" className="text-2xl font-bold tracking-[-0.04em]">Category scores</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {result.requestedCategories.map((category) => {
            const score = result.categoryScores[category];
            return <article key={category} className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4"><p className="text-sm font-semibold">{scoreLabels[category]}</p><p className="mt-4 text-4xl font-bold tracking-[-0.05em]">{score ?? "—"}<span className="ml-1 text-sm font-normal text-gray-500">/100</span></p><p className="sr-only">{score === null ? "Score unavailable" : `Score ${score} out of 100`}</p></article>;
          })}
        </div>
      </section>

      <section aria-labelledby="lab-metrics-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
        <h2 id="lab-metrics-title" className="text-2xl font-bold tracking-[-0.04em]">Laboratory metrics</h2>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{metrics.map(([label, metric]) => <div key={label} className="rounded-xl border border-black/8 p-4"><dt className="text-sm font-semibold">{label}</dt><dd className="mt-3 text-lg font-bold">{metricText(metric)}</dd></div>)}</dl>
      </section>

      <section aria-labelledby="diagnostics-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
        <h2 id="diagnostics-title" className="text-2xl font-bold tracking-[-0.04em]">Priority diagnostics</h2>
        {result.diagnostics.length ? <ol className="mt-5 divide-y divide-black/8">{result.diagnostics.map((diagnostic) => <li key={diagnostic.auditId} className="py-4 first:pt-0 last:pb-0"><div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-semibold">{diagnostic.title}</h3>{diagnostic.displayValue ? <span className="text-sm font-semibold text-gray-600">{diagnostic.displayValue}</span> : null}</div>{diagnostic.summary ? <p className="mt-2 max-w-4xl text-sm leading-relaxed text-gray-600">{diagnostic.summary}</p> : null}</li>)}</ol> : <p className="mt-4 text-sm text-gray-600">No bounded priority diagnostics were returned for this run.</p>}
      </section>

      {result.warnings.length ? <section aria-labelledby="warnings-title" className="rounded-[1.35rem] border border-amber-200 bg-amber-50 p-5 sm:p-7"><h2 id="warnings-title" className="text-2xl font-bold tracking-[-0.04em]">Run warnings</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-amber-950">{result.warnings.map((warning, index) => <li key={`${index}-${warning}`}>{warning}</li>)}</ul></section> : null}

      <aside className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-sm leading-relaxed text-white/65 sm:p-7"><p>This is a Lighthouse laboratory test from a controlled run. It is not real-user performance data, and scores can vary between runs.</p><p className="mt-3">Real-user CrUX performance remains a separate planned integration.</p></aside>
    </div>
  );
}
