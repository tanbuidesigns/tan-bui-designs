import "server-only";

import { getIntegrationDescriptors, getIntegrationSummary, localBaselineProvider } from "@/lib/control-room/integrations/registry";
import type { ControlRoomSnapshot } from "@/types/control-room";

export function getControlRoomSnapshot(): ControlRoomSnapshot {
  const baseline = localBaselineProvider.loadSnapshot();
  if (baseline.status !== "success") throw new Error("The local Control Room baseline is unavailable.");

  return {
    ...baseline.data,
    integrations: getIntegrationDescriptors(),
    integrationSummary: getIntegrationSummary(),
  };
}
