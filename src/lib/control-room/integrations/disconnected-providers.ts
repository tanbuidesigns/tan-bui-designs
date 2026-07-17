import "server-only";

import type { IntegrationDescriptor, ProviderSourceMetadata } from "@/types/control-room";

import type { DisconnectedProvider } from "./contracts";

export function createDisconnectedProvider(descriptor: IntegrationDescriptor): DisconnectedProvider {
  const source: ProviderSourceMetadata = {
    integrationId: descriptor.id,
    displayName: descriptor.displayName,
    dataMode: descriptor.dataMode,
    freshness: descriptor.freshness,
  };

  return {
    descriptor,
    getStatus: () => descriptor,
    getAvailability: () => ({
      status: "unavailable",
      reason: `${descriptor.displayName} is not connected.`,
      nextRequirement: descriptor.nextTask,
      source,
    }),
  };
}
