import type { ReactNode } from "react";

import WideShell from "@/components/ui/WideShell";
import type { ReportingPeriod } from "@/types/control-room";

import ControlRoomSidebar from "./ControlRoomSidebar";

type ControlRoomShellProps = {
  children: ReactNode;
  reportingPeriod: ReportingPeriod;
};

export default function ControlRoomShell({ children, reportingPeriod }: ControlRoomShellProps) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f3f3f0] text-black">
      <WideShell className="py-8 sm:py-10 lg:py-12">
        <header className="relative overflow-hidden rounded-[1.5rem] bg-[#0b0c0f] px-6 py-8 text-white shadow-[0_30px_90px_rgba(0,0,0,0.15)] sm:px-9 sm:py-10 lg:px-12">
          <div aria-hidden="true" className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[image:var(--tbds-accent-gradient)] opacity-20 blur-3xl" />
          <div className="relative max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/72">
                Local prototype · Mock data
              </span>
              <span className="text-xs text-white/45">{reportingPeriod.label}</span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/42">TBD Control Room</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-5xl lg:text-6xl">
              Website health and growth overview
            </h1>
            <div className="mt-7 flex flex-col gap-2 border-t border-white/12 pt-5 text-sm text-white/58 sm:flex-row sm:items-center sm:justify-between">
              <p>No live analytics, Search Console or PageSpeed data is connected.</p>
              <p>Last refreshed: <time dateTime="2026-06-29T09:30:00+01:00">{reportingPeriod.lastRefreshed}</time></p>
            </div>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start">
          <ControlRoomSidebar />
          <div className="min-w-0 space-y-6">{children}</div>
        </div>
      </WideShell>
    </main>
  );
}
