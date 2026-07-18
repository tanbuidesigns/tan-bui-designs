import type { SearchPeriodId } from "@/types/control-room-search";

export default function SearchRunForm({ periods, selectedPeriod }: { periods: readonly { id: SearchPeriodId; label: string }[]; selectedPeriod: SearchPeriodId }) {
  return (
    <section aria-labelledby="search-run-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Manual request · Finalised data</p>
      <h2 id="search-run-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Run a search-performance report</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">One explicit run creates one short-lived token and executes the fixed five-query catalogue. The property, dates, scope, dimensions and filters cannot be changed in the browser.</p>
      <form method="get" className="mt-6 grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
        <input type="hidden" name="run" value="1" />
        <label className="grid gap-2 text-sm font-semibold">Reporting period
          <select name="period" defaultValue={selectedPeriod} className="min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            {periods.map((period) => <option key={period.id} value={period.id}>{period.label}</option>)}
          </select>
        </label>
        <button type="submit" className="min-h-12 rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Run Search Console report</button>
      </form>
    </section>
  );
}
