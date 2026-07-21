import "server-only";

import { performanceProvider, searchPerformanceProvider } from "@/lib/control-room/integrations/registry";
import { getPerformanceTargetById } from "@/lib/control-room/performance/targets";
import { searchConsoleProperties } from "@/data/control-room/search-console-properties";
import type { PerformanceStrategy } from "@/types/control-room";
import type { SearchPeriodId } from "@/types/control-room-search";

import type { CaptureRunCompletion } from "./domain";
import { getHistoryStorage } from "./storage";

export type CaptureOutcome =
  | { status: "storage-unavailable"; reason: string }
  | { status: "existing" | "captured" | "failed"; runId: string };

function retainedUntil(now: Date, months: number): string {
  const date = new Date(now);
  date.setUTCMonth(date.getUTCMonth() + months);
  return date.toISOString();
}

function retainedUntilDays(now: Date, days: number): string {
  return new Date(now.getTime() + days * 86_400_000).toISOString();
}

function failedCompletion(id: string, now: string, kind: string): CaptureRunCompletion {
  return { id, status: "failed", completedAt: now, providerGeneratedAt: null, requestCount: 1, successfulRequestCount: 0, failedRequestCount: 1, warningCount: 0, safeErrorCode: kind.slice(0, 80), detailRetentionUntil: retainedUntilDays(new Date(now), 90) };
}

export async function capturePageSpeed(input: { runId: string; targetId: string; strategy: PerformanceStrategy }): Promise<CaptureOutcome> {
  const storage = await getHistoryStorage();
  if (storage.status !== "ready") return { status: "storage-unavailable", reason: storage.reason };
  const target = getPerformanceTargetById(input.targetId);
  if (!target?.enabled || !target.allowedStrategies.includes(input.strategy)) return { status: "failed", runId: input.runId };
  const now = new Date();
  const started = await storage.repository.beginRun({ id: input.runId, idempotencyKey: input.runId, source: "pagespeed", captureMode: "single", targetKey: input.targetId, periodKey: null, startedAt: now.toISOString(), ...storage.workerProvenance, detailRetentionUntil: retainedUntilDays(now, 90) });
  if (!started.created) return { status: "existing", runId: started.run.id };
  const result = await performanceProvider.loadLabPerformance({ targetId: input.targetId, strategy: input.strategy });
  const completedAt = new Date().toISOString();
  if (result.status !== "success") {
    const kind = result.status === "error" ? result.error.kind : "unavailable";
    const message = result.status === "error" ? result.error.message : result.reason;
    await storage.repository.completeFailedRun(failedCompletion(input.runId, completedAt, kind), [message]);
    return { status: "failed", runId: input.runId };
  }
  await storage.repository.completePageSpeedRun({ id: input.runId, status: "complete", completedAt, providerGeneratedAt: result.data.providerGeneratedAt, requestCount: 1, successfulRequestCount: 1, failedRequestCount: 0, warningCount: Math.min(result.warnings.length, 20), safeErrorCode: null, detailRetentionUntil: retainedUntil(new Date(completedAt), 12) }, result.data, result.warnings);
  return { status: "captured", runId: input.runId };
}

export async function captureSearchComparison(input: { runId: string; periodId: SearchPeriodId }): Promise<CaptureOutcome> {
  const storage = await getHistoryStorage();
  if (storage.status !== "ready") return { status: "storage-unavailable", reason: storage.reason };
  const property = searchConsoleProperties.find((item) => item.enabled);
  if (!property) return { status: "failed", runId: input.runId };
  const now = new Date();
  const started = await storage.repository.beginRun({ id: input.runId, idempotencyKey: input.runId, source: "search_console", captureMode: "comparison_pair", targetKey: property.id, periodKey: input.periodId, startedAt: now.toISOString(), ...storage.workerProvenance, detailRetentionUntil: retainedUntilDays(now, 90) });
  if (!started.created) return { status: "existing", runId: started.run.id };
  const result = await searchPerformanceProvider.loadSearchComparison({ periodId: input.periodId });
  const completedAt = new Date().toISOString();
  if (result.status !== "success") {
    const kind = result.status === "error" ? result.error.kind : "unavailable";
    const message = result.status === "error" ? result.error.message : result.reason;
    await storage.repository.completeFailedRun({ ...failedCompletion(input.runId, completedAt, kind), requestCount: 10 }, [message]);
    return { status: "failed", runId: input.runId };
  }
  const failed = result.data.current.requestCount.failed + result.data.previous.requestCount.failed;
  const successful = result.data.current.requestCount.successful + result.data.previous.requestCount.successful;
  const empty = result.data.current.totals === null && result.data.previous.totals === null;
  await storage.repository.completeSearchRun({ id: input.runId, status: empty ? "empty" : failed ? "partial" : "complete", completedAt, providerGeneratedAt: result.data.current.providerGeneratedAt, requestCount: 10, successfulRequestCount: successful, failedRequestCount: failed, warningCount: Math.min(result.warnings.length, 40), safeErrorCode: null, detailRetentionUntil: retainedUntil(new Date(completedAt), 24) }, [{ role: "current", snapshot: result.data.current }, { role: "previous", snapshot: result.data.previous }], result.warnings);
  return { status: "captured", runId: input.runId };
}
