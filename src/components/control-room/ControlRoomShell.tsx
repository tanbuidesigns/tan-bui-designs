import type { ReactNode } from "react";

import WideShell from "@/components/ui/WideShell";

import ControlRoomSidebar, { type ControlRoomSection } from "./ControlRoomSidebar";
import ControlRoomSignOut from "./ControlRoomSignOut";

type ControlRoomShellProps = {
  children: ReactNode;
  activeSection: ControlRoomSection;
  eyebrow: string;
  title: string;
  description: string;
  baselineReviewDate: string;
  lastUpdatedDate: string;
};

export default function ControlRoomShell({
  children,
  activeSection,
  eyebrow,
  title,
  description,
  baselineReviewDate,
  lastUpdatedDate,
}: ControlRoomShellProps) {
  return (
    <main className="tbds-private-control-room min-h-screen overflow-x-clip bg-[#f3f3f0] text-black">
      <WideShell className="py-8 sm:py-10 lg:py-12">
        <header className="relative overflow-hidden rounded-[1.5rem] bg-[#0b0c0f] px-6 py-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.15)] sm:px-9 sm:py-10 lg:px-12">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[image:var(--tbds-accent-gradient)] opacity-20 blur-3xl" />
          <div className="relative max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/72">
                Controlled sources · No background refresh
              </span>
              <a className="text-xs text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" href="#data-sources">
                How sources are labelled
              </a>
              <span className="ml-auto"><ControlRoomSignOut /></span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/42">{eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/62 sm:text-base">{description}</p>
            <dl className="mt-7 grid gap-3 border-t border-white/12 pt-5 text-xs text-white/58 sm:grid-cols-3 sm:text-sm">
              <div><dt className="text-white/35">Baseline review</dt><dd className="mt-1">{baselineReviewDate}</dd></div>
              <div><dt className="text-white/35">Data mode</dt><dd className="mt-1">Curated local snapshot</dd></div>
              <div><dt className="text-white/35">Last updated</dt><dd className="mt-1">{lastUpdatedDate}</dd></div>
            </dl>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <ControlRoomSidebar activeSection={activeSection} />
          <div className="min-w-0 space-y-6">
            {children}
            <aside id="data-sources" aria-labelledby="data-sources-title" className="scroll-mt-24 rounded-[1.35rem] border border-dashed border-black/18 bg-white/55 p-5 sm:p-7">
              <h2 id="data-sources-title" className="text-xl font-bold tracking-[-0.03em]">Data-source and verification labels</h2>
              <div className="mt-4 grid gap-5 text-sm leading-relaxed text-gray-600 md:grid-cols-2">
                <p><strong className="text-black">Sources</strong> identify whether information came from repository review, a derived baseline, a manual hypothesis, a prototype example or a planned integration.</p>
                <p><strong className="text-black">Verification</strong> distinguishes facts directly confirmed in files, reasonable inferences and information requiring runtime testing, account access or an owner decision.</p>
              </div>
            </aside>
          </div>
        </div>
      </WideShell>
    </main>
  );
}
