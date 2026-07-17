export default function EmptyIntegrationState({ title, message }: { title: string; message: string }) {
  return (
    <section className="rounded-[1.35rem] border border-dashed border-black/20 bg-white/65 p-6 sm:p-8" aria-label={title}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Empty state</p>
      <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">{message}</p>
    </section>
  );
}
