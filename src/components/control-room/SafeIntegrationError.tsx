export default function SafeIntegrationError({ section, onRetry }: { section: string; onRetry?: () => void }) {
  return (
    <section role="alert" className="rounded-[1.35rem] border border-red-200 bg-red-50 p-6 text-red-950 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em]">Control Room error</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{section} could not be loaded</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed">A safe internal error occurred. No credential, request header or raw exception detail is displayed.</p>
      {onRetry ? <button type="button" onClick={onRetry} className="mt-5 min-h-11 rounded-xl bg-red-950 px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-950 focus-visible:ring-offset-2">Try again</button> : null}
    </section>
  );
}
