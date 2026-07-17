import type { HealthState, PageHealthRecord } from "@/types/control-room";

const stateClasses: Record<HealthState, string> = {
  Healthy: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  "Needs attention": "bg-amber-50 text-amber-900 ring-amber-700/15",
  Review: "bg-blue-50 text-blue-800 ring-blue-700/15",
  Missing: "bg-red-50 text-red-800 ring-red-700/15",
};

function Status({ value }: { value: HealthState }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${stateClasses[value]}`}>{value}</span>;
}

export default function PageHealthTable({ records }: { records: readonly PageHealthRecord[] }) {
  return (
    <section aria-labelledby="page-health-title" className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
      <div className="border-b border-black/8 px-5 py-6 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Mock inventory</p>
        <h2 id="page-health-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Page health</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-500">Specific checks are shown separately so a single vague score does not hide what needs attention.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[72rem] border-collapse text-left text-sm">
          <caption className="sr-only">Mock SEO and mobile performance status for representative public pages</caption>
          <thead className="bg-[#f7f7f4] text-[0.68rem] uppercase tracking-[0.13em] text-gray-500">
            <tr>
              {['Page', 'Indexability', 'Metadata', 'Open Graph', 'Mobile performance', 'Issues', 'Status'].map((heading) => (
                <th key={heading} scope="col" className="border-b border-black/8 px-5 py-4 font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/6">
            {records.map((record) => (
              <tr key={record.path} className="align-top">
                <th scope="row" className="px-5 py-5 font-semibold">
                  {record.label}
                  <span className="mt-1 block font-mono text-xs font-normal text-gray-400">{record.path}</span>
                </th>
                <td className="px-5 py-5"><Status value={record.indexability} /></td>
                <td className="px-5 py-5"><Status value={record.metadata} /></td>
                <td className="px-5 py-5"><Status value={record.openGraph} /></td>
                <td className="px-5 py-5 font-semibold">{record.mobilePerformance}<span className="font-normal text-gray-400">/100</span></td>
                <td className="max-w-xs px-5 py-5 leading-relaxed text-gray-600">{record.issues}</td>
                <td className="px-5 py-5"><Status value={record.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
