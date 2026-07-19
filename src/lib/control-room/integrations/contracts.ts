import "server-only";

import type {
  ControlRoomSnapshot,
  IntegrationDescriptor,
  LabPerformanceResult,
  LabPerformanceRequest,
  ProviderResult,
} from "@/types/control-room";
import type { SearchComparisonProviderResult, SearchPerformanceProviderResult, SearchPerformanceRequest } from "@/types/control-room-search";

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
  loadLabPerformance(request: LabPerformanceRequest): Promise<ProviderResult<LabPerformanceResult>>;
}

export interface SearchPerformanceProvider {
  readonly id: "search-console";
  readonly descriptor: IntegrationDescriptor;
  getStatus(): IntegrationDescriptor;
  loadSearchPerformance(request: SearchPerformanceRequest): Promise<SearchPerformanceProviderResult>;
  loadSearchComparison(request: SearchPerformanceRequest): Promise<SearchComparisonProviderResult>;
}

export interface DisconnectedProvider {
  readonly descriptor: IntegrationDescriptor;
  getStatus(): IntegrationDescriptor;
  getAvailability(): ProviderResult<never>;
}
