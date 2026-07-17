const sections = [
  { label: "Overview", active: true },
  { label: "Pages", active: false },
  { label: "Performance", active: false },
  { label: "Content", active: false },
  { label: "Leads", active: false },
  { label: "Change log", active: false },
] as const;

export default function ControlRoomSidebar() {
  return (
    <aside className="min-w-0 rounded-[1.35rem] bg-[#101114] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] lg:sticky lg:top-20 lg:p-5">
      <p className="px-3 pb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">
        Workspace
      </p>
      <nav aria-label="Control Room sections">
        <ul className="flex flex-wrap gap-2 lg:flex-col">
          {sections.map((section) => (
            <li key={section.label} className="shrink-0 lg:shrink">
              {section.active ? (
                <a
                  href="#overview"
                  aria-current="page"
                  className="flex min-h-11 items-center justify-between gap-5 rounded-xl bg-white px-4 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d2fd] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101114]"
                >
                  {section.label}
                  <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[image:var(--tbds-accent-gradient)]" />
                </a>
              ) : (
                <span className="flex min-h-11 items-center justify-between gap-5 rounded-xl px-4 text-sm text-white/55" aria-disabled="true">
                  {section.label}
                  <span className="text-[0.62rem] font-medium uppercase tracking-[0.14em] text-white/30">Planned</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
