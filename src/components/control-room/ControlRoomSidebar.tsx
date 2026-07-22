import Link from "next/link";

const sections = [
  { id: "overview", label: "Overview", href: "/control-room" },
  { id: "pages", label: "Pages", href: "/control-room/pages" },
  { id: "actions", label: "Actions", href: "/control-room/actions" },
  { id: "content", label: "Content", href: "/control-room/content" },
  { id: "performance", label: "Performance", href: "/control-room/performance" },
  { id: "search", label: "Search", href: "/control-room/search" },
  { id: "history", label: "History", href: "/control-room/history" },
  { id: "evidence", label: "Evidence", href: "/control-room/evidence" },
  { id: "reports", label: "Reports", href: "/control-room/reports" },
  { id: "analysis-brief", label: "Analysis brief", href: "/control-room/analysis-brief" },
  { id: "operations", label: "Operations", href: "/control-room/operations" },
  { id: "leads", label: "Leads", href: "/control-room/leads" },
  { id: "change-log", label: "Change log", href: "/control-room/change-log" },
] as const;

export type ControlRoomSection = (typeof sections)[number]["id"];

export default function ControlRoomSidebar({ activeSection }: { activeSection: ControlRoomSection }) {
  return (
    <aside className="min-w-0 rounded-[1.35rem] bg-[#101114] p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.14)] lg:sticky lg:top-20 lg:p-5">
      <p className="px-3 pb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white/45">Workspace</p>
      <nav aria-label="Control Room sections">
        <ul className="flex flex-wrap gap-2 lg:flex-col">
          {sections.map((section) => {
            const active = section.id === activeSection;
            return (
              <li key={section.id} className="shrink-0 lg:shrink">
                <Link
                  href={section.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center justify-between gap-5 rounded-xl px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d2fd] focus-visible:ring-offset-2 focus-visible:ring-offset-[#101114] ${active ? "bg-white font-semibold text-black" : "text-white/62 transition-colors hover:bg-white/8 hover:text-white"}`}
                >
                  {section.label}
                  {active ? <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[image:var(--tbds-accent-gradient)]" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
