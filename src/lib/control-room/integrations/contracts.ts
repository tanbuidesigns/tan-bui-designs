import "server-only";

import type {
  ControlRoomSnapshot,
  IntegrationDescriptor,
  LabPerformanceResult,
  PerformanceRequest,
  ProviderResult,
} from "@/types/control-room";

export type LocalBaselineSnapshot = Omit<ControlRoomSnapshot, "integrations" | "integrationSummary">;

export interface LocalBaselineProvider {
  readonly id: "local-baseline";
  readonly descriptor: IntegrationDescriptor;
  getStatus(): IntegrationDescriptor;
  loadSnapshot(): ProviderResult<LocalBaselineSnapshot>;
}

export interface PerformanceProvider {
  readonly id: "pagespeed-lab";
  readonly descriptor: IntegrationDescriptor;
  getStatus(): IntegrationDescriptor;
  loadLabPerformance(request: PerformanceRequest): Promise<ProviderResult<LabPerformanceResult>>;
}

export interface DisconnectedProvider {
  readonly descriptor: IntegrationDescriptor;
  getStatus(): IntegrationDescriptor;
  getAvailability(): ProviderResult<never>;
}
