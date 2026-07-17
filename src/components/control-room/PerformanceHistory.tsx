import type { PerformanceHistoryEntry } from "@/types/control-room";

export default function PerformanceHistory({ entries }: { entries: readonly PerformanceHistoryEntry[] }) {
  const first = entries[0]?.value ?? 0;
  const last = entries.at(-1)?.value ?? 0;

  return (
    <section aria-labelledby="performance-history-title" className="rounded-[1.35rem] border border-black/8 bg-[#111216] p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">Mock performance trend</p>
      <h2 id="performance-history-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Mobile performance history</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">The mock average rose from {first} to {last} across six weekly checks, with a small dip in the latest period.</p>

      <figure className="mt-7" aria-labelledby="performance-history-title">
        <div className="grid h-56 grid-cols-6 items-end gap-2 border-b border-white/15 sm:gap-4">
          {entries.map((entry) => (
            <div key={entry.period} className="flex h-full min-w-0 flex-col items-center justify-end gap-2">
              <span className="text-xs font-semibold text-white/75">{entry.value}</span>
              <div
                className="w-full max-w-14 rounded-t-lg bg-[image:var(--tbds-accent-gradient)] opacity-90"
                style={{ height: `${entry.value}%` }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2 text-center text-[0.65rem] text-white/42 sm:gap-4 sm:text-xs">
          {entries.map((entry) => <span key={entry.period}>{entry.period.replace("Week ", "W")}</span>)}
        </div>
        <figcaption className="sr-only">{entries.map((entry) => `${entry.period}: ${entry.value}`).join("; ")}</figcaption>
      </figure>
    </section>
  );
}
