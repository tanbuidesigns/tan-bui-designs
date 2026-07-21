import Link from "next/link";

import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import HistoryStorageNotice from "@/components/control-room/HistoryStorageNotice";
import { performanceTargets } from "@/lib/control-room/performance/targets";
import { getHistoryStorage } from "@/lib/control-room/history/storage";

function decodeCursor(value: string | undefined) {
  if (!value || value.length > 500) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const cursor = parsed as { startedAt?: unknown; id?: unknown };
    return typeof cursor.startedAt === "string" && typeof cursor.id === "string" ? { startedAt: cursor.startedAt, id: cursor.id } : null;
  } catch { return null; }
}

export default async function ControlRoomHistoryPage({ searchParams }: { searchParams: Promise<{ cursor?: string; state?: string }> }) {
  const params = await searchParams;
  const storage = await getHistoryStorage();
  const page = storage.status === "ready" ? await storage.repository.listRuns({ limit: 25, cursor: decodeCursor(params.cursor) }) : null;
  const nextCursor = page?.nextCursor ? Buffer.from(JSON.stringify(page.nextCursor), "utf8").toString("base64url") : null;
  return (
    <ControlRoomShell activeSection="history" eyebrow="TBD Control Room · History" title="Persistent measurement history" description="Manual, idempotent captures with bounded evidence and explicit status. Persistent storage is active; collection remains deliberate and on demand." baselineReviewDate="18 July 2026" lastUpdatedDate="21 July 2026">
      {params.state ? <p role="status" className="rounded-xl border border-black/8 bg-white p-4 text-sm">Request state: {params.state.replaceAll("-", " ")}.</p> : null}
      {storage.status !== "ready" ? <><HistoryStorageNotice reason={storage.reason} /><section aria-labelledby="disabled-capture-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 id="disabled-capture-title" className="text-2xl font-bold">Manual capture</h2><p className="mt-2 text-sm text-gray-600">Capture controls remain disabled until approved storage is bound.</p><div className="mt-5 flex flex-wrap gap-3"><button disabled className="min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white opacity-40">Capture PageSpeed</button><button disabled className="min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white opacity-40">Capture Search comparison</button></div></section></> : (
        <>
          <section aria-labelledby="capture-title" className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7">
            <h2 id="capture-title" className="text-2xl font-bold tracking-[-0.04em]">Manual capture</h2>
            <p className="mt-2 text-sm text-gray-600">Each form carries a server-generated UUID. Reusing it resolves the existing run without recalling a provider.</p>
            <div className="mt-6 grid gap-5 xl:grid-cols-2">
              <form method="post" action="/control-room/history/capture/pagespeed" className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4">
                <input type="hidden" name="runId" value={crypto.randomUUID()} />
                <label className="block text-sm font-semibold">PageSpeed target<select name="targetId" className="mt-2 min-h-11 w-full rounded-lg border border-black/15 bg-white px-3">{performanceTargets.map((target) => <option key={target.id} value={target.id}>{target.displayLabel}</option>)}</select></label>
                <label className="mt-4 block text-sm font-semibold">Strategy<select name="strategy" className="mt-2 min-h-11 w-full rounded-lg border border-black/15 bg-white px-3"><option value="mobile">Mobile</option><option value="desktop">Desktop</option></select></label>
                <button className="mt-4 min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white">Capture PageSpeed</button>
              </form>
              <form method="post" action="/control-room/history/capture/search" className="rounded-xl border border-black/8 bg-[#f7f7f4] p-4">
                <input type="hidden" name="runId" value={crypto.randomUUID()} />
                <label className="block text-sm font-semibold">Comparison period<select name="periodId" className="mt-2 min-h-11 w-full rounded-lg border border-black/15 bg-white px-3"><option value="28d">28 days vs previous 28</option><option value="90d">90 days vs previous 90</option></select></label>
                <p className="mt-3 text-xs leading-relaxed text-gray-500">One token exchange and ten fixed Search Console requests will be made.</p><button className="mt-4 min-h-11 rounded-lg bg-black px-5 text-sm font-semibold text-white">Capture Search comparison</button>
              </form>
            </div>
          </section>
          <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><h2 className="text-2xl font-bold tracking-[-0.04em]">Capture runs</h2>
            {page?.runs.length ? <ul className="mt-5 divide-y divide-black/8">{page.runs.map((run) => <li key={run.id} className="grid gap-3 py-4 first:pt-0 md:grid-cols-[minmax(0,1fr)_auto]"><div><Link className="font-semibold underline underline-offset-4" href={`/control-room/history/${run.id}`}>{run.source.replace("_", " ")} · {run.targetKey}</Link><p className="mt-1 text-sm text-gray-500">{run.startedAt} · {run.periodKey ?? "single snapshot"} · manual</p><p className="mt-1 break-all font-mono text-xs text-gray-400">{run.id}</p></div><dl className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm md:text-right"><div><dt className="text-xs text-gray-500">Status</dt><dd className="font-semibold">{run.status}</dd></div><div><dt className="text-xs text-gray-500">Requests</dt><dd>{run.successfulRequestCount}/{run.requestCount}</dd></div><div><dt className="text-xs text-gray-500">Warnings</dt><dd>{run.warningCount}</dd></div><div><dt className="text-xs text-gray-500">Worker</dt><dd>{run.workerVersionId ? run.workerVersionId.slice(0, 12) : "Unavailable"}</dd></div></dl></li>)}</ul> : <p className="mt-4 text-sm text-gray-600">No capture runs have been recorded.</p>}
            {nextCursor ? <Link className="mt-5 inline-block font-semibold underline underline-offset-4" href={`/control-room/history?cursor=${encodeURIComponent(nextCursor)}`}>Older runs</Link> : null}
          </section>
        </>
      )}
    </ControlRoomShell>
  );
}
