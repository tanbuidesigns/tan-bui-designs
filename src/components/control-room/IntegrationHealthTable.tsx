import FreshnessBadge from "./FreshnessBadge";
import IntegrationStatusBadge from "./IntegrationStatusBadge";
import SecurityClassificationBadge from "./SecurityClassificationBadge";

import type { IntegrationDescriptor } from "@/types/control-room";

export default function IntegrationHealthTable({ integrations }: { integrations: readonly IntegrationDescriptor[] }) {
  return (
    <section className="overflow-hidden rounded-[1.35rem] border border-black/8 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.04)]" aria-labelledby="integration-health-title">
      <div className="border-b border-black/8 px-5 py-6 sm:px-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Registry-derived status</p><h2 id="integration-health-title" className="mt-2 text-2xl font-bold tracking-[-0.04em] sm:text-3xl">Integration health</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[76rem] border-collapse text-left text-sm">
          <caption className="sr-only">Current lifecycle, freshness, security, configuration and operating requirements for every Control Room integration</caption>
          <thead className="bg-[#f7f7f4] text-[0.68rem] uppercase tracking-[0.13em] text-gray-500"><tr>{["Source", "Lifecycle", "Freshness", "Security", "Configuration", "Persistence", "Refresh model", "Next step"].map((heading) => <th key={heading} scope="col" className="border-b border-black/8 px-5 py-4 font-semibold">{heading}</th>)}</tr></thead>
          <tbody className="divide-y divide-black/6">
            {integrations.map((integration) => (
              <tr key={integration.id} className="align-top">
                <th scope="row" className="w-64 px-5 py-5"><span className="block font-semibold">{integration.displayName}</span><span className="mt-1 block font-mono text-xs font-normal text-gray-500">{integration.id}</span><p className="mt-2 font-normal leading-relaxed text-gray-500">{integration.description}</p></th>
                <td className="px-5 py-5"><IntegrationStatusBadge state={integration.lifecycleState} /></td>
                <td className="px-5 py-5"><FreshnessBadge state={integration.freshness.state} /><p className="mt-2 max-w-44 text-xs leading-relaxed text-gray-500">{integration.freshness.explanation}</p></td>
                <td className="px-5 py-5"><SecurityClassificationBadge classification={integration.securityClassification} /></td>
                <td className="max-w-52 px-5 py-5"><span className="font-semibold capitalize">{integration.configurationState.replaceAll("-", " ")}</span>{integration.configurationRequirements.length ? <ul className="mt-2 space-y-1 font-mono text-xs text-gray-500">{integration.configurationRequirements.map((name) => <li key={name} className="break-all">{name}</li>)}</ul> : null}</td>
                <td className="px-5 py-5 font-semibold">{integration.persistenceRequired ? "Required later" : "Not required"}</td>
                <td className="max-w-52 px-5 py-5 leading-relaxed text-gray-600"><p>{integration.currentRefreshMode}</p><p className="mt-2 text-xs text-gray-500">Planned: {integration.plannedCadence}</p></td>
                <td className="max-w-52 px-5 py-5 leading-relaxed text-gray-600">{integration.nextTask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
