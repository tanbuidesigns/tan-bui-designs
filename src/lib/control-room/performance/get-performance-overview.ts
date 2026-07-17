import "server-only";

import { connection } from "next/server";

import { getIntegrationDescriptor, performanceProvider } from "@/lib/control-room/integrations/registry";
import type { LabPerformanceRequest, PerformanceStrategy } from "@/types/control-room";

import { getPerformanceTargetById, performanceTargets } from "./targets";

type PerformanceOverviewInput = {
  targetId?: string;
  strategy?: string;
  run?: string;
};

export async function getPerformanceOverview(input: PerformanceOverviewInput = {}) {
  const defaultTarget = performanceTargets[0];
  if (!defaultTarget) throw new Error("No verified performance targets are available.");

  const requestedTarget = input.targetId ? getPerformanceTargetById(input.targetId) : defaultTarget;
  const selectedTarget = requestedTarget?.enabled ? requestedTarget : defaultTarget;
  const strategyValue = input.strategy ?? selectedTarget.defaultStrategy;
  const strategy = selectedTarget.allowedStrategies.includes(strategyValue as PerformanceStrategy)
    ? strategyValue as PerformanceStrategy
    : selectedTarget.defaultStrategy;
  const shouldRun = input.run === "1";
  const validationMessage = shouldRun && input.targetId && !requestedTarget
    ? "Select an enabled registered performance target."
    : shouldRun && input.strategy && input.strategy !== strategy
      ? "Select a strategy allowed for this registered target."
      : null;

  const request: LabPerformanceRequest = { targetId: selectedTarget.id, strategy };
  let liveResult = null;
  if (shouldRun && !validationMessage) {
    await connection();
    liveResult = await performanceProvider.loadLabPerformance(request);
  }

  return {
    targets: performanceTargets,
    selectedTarget,
    strategies: selectedTarget.allowedStrategies,
    labSource: performanceProvider.getStatus(),
    fieldSource: getIntegrationDescriptor("crux-field"),
    liveResult,
    request,
    shouldRun,
    validationMessage,
  };
}
