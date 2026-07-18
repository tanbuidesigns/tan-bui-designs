type OperationalStateKind = "configuration-missing" | "no-data" | "loading" | "degraded" | "stale" | "error" | "planned";

const labels: Record<OperationalStateKind, string> = {
  "configuration-missing": "Configuration missing",
  "no-data": "No data yet",
  loading: "Loading",
  degraded: "Degraded source",
  stale: "Stale data",
  error: "Safe error",
  planned: "Planned integration",
};

export default function OperationalState({ kind, title, explanation, nextStep }: { kind: OperationalStateKind; title: string; explanation: string; nextStep?: string }) {
  return (
    <section className="rounded-[1.35rem] border border-dashed border-black/20 bg-white/65 p-6 sm:p-8" aria-label={title}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{labels[kind]}</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">{explanation}</p>
      {nextStep ? <p className="mt-4 text-sm font-semibold text-black">Next: {nextStep}</p> : null}
    </section>
  );
}
