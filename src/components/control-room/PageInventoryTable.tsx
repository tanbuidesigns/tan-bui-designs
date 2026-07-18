import DataSourceBadge from "./DataSourceBadge";
import VerificationBadge from "./VerificationBadge";

import type { PageBaselineRecord, ReviewPriority } from "@/types/control-room";

const priorityStyles: Record<ReviewPriority, string> = {
  critical: "bg-red-100 text-red-900",
  high: "bg-orange-50 text-orange-900",
  medium: "bg-amber-50 text-amber-950",
  low: "bg-slate-100 text-slate-700",
};

function StatusText({ children }: { children: string }) {
  return <span className="whitespace-nowrap text-sm font-semibold capitalize text-gray-700">{children.replaceAll("-", " ")}</span>;
}

export default function PageInventoryTable({ records }: { records: readonly PageBaselineRecord[] }) {
  return (
    <section aria-labelledby="page-inventory-title" className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
      <div className="border-b border-black/8 px-5 py-6 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Filtered baseline</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 id="page-inventory-title" className="text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Page inventory</h2>
          <p className="text-sm text-gray-500">{records.length} {records.length === 1 ? "route" : "routes"} shown</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[76rem] border-collapse text-left text-sm">
          <caption className="sr-only">Verified public page inventory with metadata, schema, priority, evidence and verification status</caption>
          <thead className="bg-[#f7f7f4] text-[0.68rem] uppercase tracking-[0.13em] text-gray-500">
            <tr>
              {[
                "Page",
                "Metadata",
                "Canonical",
                "Open Graph",
                "Schema",
                "Priority",
                "Verification",
              ].map((heading) => <th key={heading} scope="col" className="border-b border-black/8 px-5 py-4 font-semibold">{heading}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/6">
            {records.map((record) => (
              <tr key={record.id} className="align-top">
                <th scope="row" className="w-[25rem] px-5 py-5 font-semibold">
                  <span className="block text-base">{record.name}</span>
                  <span className="mt-1 block font-mono text-xs font-normal text-gray-500">{record.route}</span>
                  <details className="mt-4 font-normal">
                    <summary className="cursor-pointer text-xs font-semibold text-gray-600 underline decoration-gray-300 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">Evidence and full status</summary>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs leading-relaxed text-gray-600">
                      <div><dt className="text-gray-400">Availability</dt><dd className="capitalize">{record.availability.replaceAll("-", " ")}</dd></div>
                      <div><dt className="text-gray-400">Indexability</dt><dd className="capitalize">{record.intendedIndexability.replaceAll("-", " ")}</dd></div>
                      <div><dt className="text-gray-400">Twitter</dt><dd className="capitalize">{record.twitter.replaceAll("-", " ")}</dd></div>
                      <div><dt className="text-gray-400">H1</dt><dd className="capitalize">{record.h1.replaceAll("-", " ")}</dd></div>
                      <div><dt className="text-gray-400">Content</dt><dd className="capitalize">{record.content.replaceAll("-", " ")}</dd></div>
                      <div><dt className="text-gray-400">Internal links</dt><dd className="capitalize">{record.internalLinks.replaceAll("-", " ")}</dd></div>
                    </dl>
                    <p className="mt-3 text-xs leading-relaxed text-gray-600">{record.notes}</p>
                    <ul className="mt-3 space-y-1 font-mono text-[0.68rem] font-normal text-gray-500">
                      {record.evidencePaths.map((path) => <li key={path} className="break-all">{path}</li>)}
                    </ul>
                    <div className="mt-3"><DataSourceBadge source={record.source} /></div>
                  </details>
                </th>
                <td className="px-5 py-5"><StatusText>{record.metadataTitle}</StatusText></td>
                <td className="px-5 py-5"><StatusText>{record.canonical}</StatusText></td>
                <td className="px-5 py-5"><StatusText>{record.openGraph}</StatusText></td>
                <td className="px-5 py-5"><StatusText>{record.structuredData}</StatusText></td>
                <td className="px-5 py-5"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${priorityStyles[record.reviewPriority]}`}>{record.reviewPriority}</span></td>
                <td className="px-5 py-5"><VerificationBadge status={record.verificationStatus} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 ? <p className="px-5 py-10 text-center text-sm text-gray-500">No routes match the selected filters.</p> : null}
    </section>
  );
}
