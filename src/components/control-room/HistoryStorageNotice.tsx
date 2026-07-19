export default function HistoryStorageNotice({ reason }: { reason: string }) {
  return (
    <section role="status" className="rounded-[1.35rem] border border-amber-900/20 bg-amber-50 p-5 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-900/60">Storage unavailable</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">History is not configured yet</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-amber-950/70">{reason} No provider request will run and no evidence can be saved until the approved D1 resource and binding are added in Stage B.</p>
    </section>
  );
}
