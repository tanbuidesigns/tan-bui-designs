import "server-only";

import { getIntegrationDescriptor, performanceProvider } from "@/lib/control-room/integrations/registry";
import type { PerformanceRequest } from "@/types/control-room";

import { performanceTargets } from "./targets";

export async function getPerformanceOverview() {
  const selectedTarget = performanceTargets[0];
  if (!selectedTarget) throw new Error("No verified performance targets are available.");

  const request: PerformanceRequest = {
    targetId: selectedTarget.id,
    strategy: selectedTarget.defaultStrategy,
    requestedCategories: ["performance", "accessibility", "best-practices", "seo"],
  };

  return {
    targets: performanceTargets,
    selectedTarget,
    strategies: selectedTarget.allowedStrategies,
    labSource: performanceProvider.getStatus(),
    fieldSource: getIntegrationDescriptor("crux-field"),
    liveResult: await performanceProvider.loadLabPerformance(request),
    request,
  };
}
