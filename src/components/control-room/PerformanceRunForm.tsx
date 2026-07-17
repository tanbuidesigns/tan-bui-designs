import type { PerformanceStrategy, PerformanceTarget } from "@/types/control-room";

export default function PerformanceRunForm({
  targets,
  selectedTarget,
  strategy,
}: {
  targets: readonly PerformanceTarget[];
  selectedTarget: PerformanceTarget;
  strategy: PerformanceStrategy;
}) {
  return (
    <section aria-labelledby="run-pagespeed-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 shadow-[0_18px_50px_rgba(0,0,0,0.04)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Manual request · One target</p>
      <h2 id="run-pagespeed-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Run a laboratory test</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">The server resolves an approved target ID and sends one request to PageSpeed only when this form is submitted. No URL or credential is accepted from the browser.</p>
      <form method="get" className="mt-6 grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(10rem,0.45fr)_auto]">
        <input type="hidden" name="run" value="1" />
        <label className="grid gap-2 text-sm font-semibold">
          Registered target
          <select name="target" defaultValue={selectedTarget.id} className="min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            {targets.map((target) => <option key={target.id} value={target.id}>{target.displayLabel} · {target.route}</option>)}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          Strategy
          <select name="strategy" defaultValue={strategy} className="min-h-12 w-full rounded-xl border border-black/15 bg-white px-3 font-normal capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">
            {selectedTarget.allowedStrategies.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <button type="submit" className="min-h-12 rounded-xl bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2">Run test</button>
      </form>
    </section>
  );
}
