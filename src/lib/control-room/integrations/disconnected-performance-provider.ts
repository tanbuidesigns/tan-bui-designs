import "server-only";

import type { IntegrationDescriptor, ProviderSourceMetadata } from "@/types/control-room";

import type { PerformanceProvider } from "./contracts";

export function createDisconnectedPerformanceProvider(descriptor: IntegrationDescriptor): PerformanceProvider {
  const source: ProviderSourceMetadata = {
    integrationId: descriptor.id,
    displayName: descriptor.displayName,
    dataMode: descriptor.dataMode,
    freshness: descriptor.freshness,
  };

  return {
    id: "pagespeed-lab",
    descriptor,
    getStatus: () => descriptor,
    loadLabPerformance: async (request) => ({
      status: "unavailable",
      reason: `No live laboratory result exists for target ${request.targetId}.`,
      nextRequirement: "Task 4 must add the server-only PageSpeed adapter and approved configuration.",
      source,
    }),
  };
}
