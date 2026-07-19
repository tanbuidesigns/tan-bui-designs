import "server-only";

import type { LabPerformanceResult } from "@/types/control-room";

import type {
  ActionEvidenceInput,
  CaptureRun,
  CaptureRunCompletion,
  CaptureRunDraft,
  ChangeEventInput,
  HistoryCursor,
  HistoryPage,
  ReportingEvidencePacketV1,
  RunDetail,
  StoredSearchPeriod,
} from "./domain";

export interface ControlRoomHistoryRepository {
  findRun(id: string): Promise<CaptureRun | null>;
  listRuns(input: { limit: number; cursor: HistoryCursor | null }): Promise<HistoryPage>;
  getRunDetail(id: string): Promise<RunDetail | null>;
  beginRun(draft: CaptureRunDraft): Promise<{ created: boolean; run: CaptureRun }>;
  completeFailedRun(completion: CaptureRunCompletion, warnings: readonly string[]): Promise<void>;
  completePageSpeedRun(completion: CaptureRunCompletion, result: LabPerformanceResult, warnings: readonly string[]): Promise<void>;
  completeSearchRun(completion: CaptureRunCompletion, periods: readonly StoredSearchPeriod[], warnings: readonly string[]): Promise<void>;
  appendChangeEvent(input: ChangeEventInput): Promise<void>;
  appendActionEvidence(input: ActionEvidenceInput): Promise<void>;
  buildEvidencePacket(periodId: "28d" | "90d", generatedAt: string): Promise<ReportingEvidencePacketV1>;
}
