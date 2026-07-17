import "server-only";

import { integrationDescriptors } from "@/data/control-room/integration-manifest";
import type { IntegrationDescriptor, IntegrationId, IntegrationSummary } from "@/types/control-room";

import { createDisconnectedPerformanceProvider } from "./disconnected-performance-provider";
import { createDisconnectedProvider } from "./disconnected-providers";
import { createLocalBaselineProvider } from "./local-baseline-provider";

function descriptor(id: IntegrationId): IntegrationDescriptor {
  const match = integrationDescriptors.find((item) => item.id === id);
  if (!match) throw new Error(`Control Room integration descriptor missing: ${id}`);
  return match;
}

export const localBaselineProvider = createLocalBaselineProvider(descriptor("local-baseline"));
export const performanceProvider = createDisconnectedPerformanceProvider(descriptor("pagespeed-lab"));

export const integrationRegistry = integrationDescriptors.map((item) => ({
  descriptor: item,
  provider:
    item.id === "local-baseline"
      ? localBaselineProvider
      : item.id === "pagespeed-lab"
        ? performanceProvider
        : createDisconnectedProvider(item),
}));

export function getIntegrationDescriptors(): readonly IntegrationDescriptor[] {
  return integrationRegistry.map((entry) => entry.provider.getStatus());
}

export function getIntegrationDescriptor(id: IntegrationId): IntegrationDescriptor {
  return descriptor(id);
}

export function getIntegrationSummary(): IntegrationSummary {
  const sources = getIntegrationDescriptors();
  return {
    total: sources.length,
    activeLocal: sources.filter((source) => source.sourceType === "local-repository" && (source.lifecycleState === "healthy" || source.lifecycleState === "local")).length,
    plannedExternal: sources.filter((source) => source.dataMode === "disconnected" && source.id !== "lead-store").length,
    requiringConfiguration: sources.filter((source) => source.configurationState === "missing" || source.configurationState === "requires-authorization").length,
    personalData: sources.filter((source) => source.securityClassification === "personal-data").length,
    stale: sources.filter((source) => source.freshness.state === "stale").length,
    errors: sources.filter((source) => source.lifecycleState === "error").length,
  };
}
