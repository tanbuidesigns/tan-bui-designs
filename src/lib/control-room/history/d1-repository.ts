import "server-only";

import type { LabPerformanceResult } from "@/types/control-room";
import type { SearchMetricSet, SearchPanel } from "@/types/control-room-search";

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
import { metricDelta } from "./domain";
import { d1RowsPerStatement } from "./d1-budget";
import type { ControlRoomHistoryRepository } from "./repository";

export type D1ResultLike<T = Record<string, unknown>> = {
  results: T[];
  meta: { changes?: number } & Record<string, unknown>;
};
export interface D1PreparedStatementLike {
  bind(...values: unknown[]): D1PreparedStatementLike;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1ResultLike<T>>;
  run(): Promise<D1ResultLike>;
}
export interface D1DatabaseLike {
  prepare(query: string): D1PreparedStatementLike;
  batch<T = Record<string, unknown>>(statements: D1PreparedStatementLike[]): Promise<D1ResultLike<T>[]>;
}

type CaptureRunRow = {
  id: string; idempotency_key: string; source: CaptureRun["source"]; capture_mode: CaptureRun["captureMode"]; status: CaptureRun["status"];
  target_key: string; period_key: "28d" | "90d" | null; started_at: string; completed_at: string | null; provider_generated_at: string | null;
  request_count: number; successful_request_count: number; failed_request_count: number; warning_count: number; safe_error_code: string | null; schema_version: number;
  worker_version_id: string | null; worker_version_tag: string | null; worker_version_created_at: string | null; detail_retention_until: string | null;
};

function runFromRow(row: CaptureRunRow): CaptureRun {
  return {
    id: row.id, idempotencyKey: row.idempotency_key, source: row.source, captureMode: row.capture_mode, status: row.status,
    targetKey: row.target_key, periodKey: row.period_key, startedAt: row.started_at, completedAt: row.completed_at,
    providerGeneratedAt: row.provider_generated_at, requestCount: row.request_count, successfulRequestCount: row.successful_request_count,
    failedRequestCount: row.failed_request_count, warningCount: row.warning_count, safeErrorCode: row.safe_error_code,
    schemaVersion: row.schema_version, workerVersionId: row.worker_version_id, workerVersionTag: row.worker_version_tag,
    workerVersionCreatedAt: row.worker_version_created_at, detailRetentionUntil: row.detail_retention_until,
  };
}

function rowsFromPanel<T>(panel: SearchPanel<T>): readonly T[] {
  return panel.status === "success" || panel.status === "empty" ? panel.data : [];
}

function metricBindings(metrics: SearchMetricSet) {
  return [metrics.clicks, metrics.impressions, metrics.ctr, metrics.averagePosition] as const;
}

async function queryKey(query: string): Promise<string> {
  const normalized = query.normalize("NFKC").trim().replace(/\s+/g, " ").toLocaleLowerCase("en-GB");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(normalized));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export class D1ControlRoomHistoryRepository implements ControlRoomHistoryRepository {
  constructor(private readonly db: D1DatabaseLike) {}

  private insertStatements(table: string, columns: readonly string[], rows: readonly (readonly unknown[])[]): D1PreparedStatementLike[] {
    if (!rows.length) return [];
    const rowsPerStatement = d1RowsPerStatement(columns.length);
    const statements: D1PreparedStatementLike[] = [];
    for (let offset = 0; offset < rows.length; offset += rowsPerStatement) {
      const chunk = rows.slice(offset, offset + rowsPerStatement);
      const placeholders = chunk.map(() => `(${columns.map(() => "?").join(", ")})`).join(", ");
      statements.push(this.db.prepare(`INSERT INTO ${table}(${columns.join(", ")}) VALUES ${placeholders}`).bind(...chunk.flat()));
    }
    return statements;
  }

  private completionStatement(value: CaptureRunCompletion): D1PreparedStatementLike {
    return this.db.prepare(`UPDATE cr_capture_runs SET status = ?, completed_at = ?, provider_generated_at = ?, request_count = ?, successful_request_count = ?, failed_request_count = ?, warning_count = ?, safe_error_code = ?, detail_retention_until = ? WHERE id = ? AND status = 'running'`)
      .bind(value.status, value.completedAt, value.providerGeneratedAt, value.requestCount, value.successfulRequestCount, value.failedRequestCount, value.warningCount, value.safeErrorCode, value.detailRetentionUntil, value.id);
  }

  private warningStatements(runId: string, warnings: readonly string[], createdAt: string): D1PreparedStatementLike[] {
    return this.insertStatements("cr_run_warnings", ["run_id", "ordinal", "warning_code", "safe_message", "created_at"], warnings.slice(0, 40).map((warning, index) => [runId, index, "provider_warning", warning.slice(0, 500), createdAt]));
  }

  async findRun(id: string): Promise<CaptureRun | null> {
    const row = await this.db.prepare("SELECT * FROM cr_capture_runs WHERE id = ? LIMIT 1").bind(id).first<CaptureRunRow>();
    return row ? runFromRow(row) : null;
  }

  async listRuns(input: { limit: number; cursor: HistoryCursor | null }): Promise<HistoryPage> {
    const limit = Math.min(Math.max(input.limit, 1), 50);
    const statement = input.cursor
      ? this.db.prepare("SELECT * FROM cr_capture_runs WHERE started_at < ? OR (started_at = ? AND id < ?) ORDER BY started_at DESC, id DESC LIMIT ?").bind(input.cursor.startedAt, input.cursor.startedAt, input.cursor.id, limit + 1)
      : this.db.prepare("SELECT * FROM cr_capture_runs ORDER BY started_at DESC, id DESC LIMIT ?").bind(limit + 1);
    const result = await statement.all<CaptureRunRow>();
    const rows = result.results.map(runFromRow);
    const visible = rows.slice(0, limit);
    const last = visible.at(-1);
    return { runs: visible, nextCursor: rows.length > limit && last ? { startedAt: last.startedAt, id: last.id } : null };
  }

  async getRunDetail(id: string): Promise<RunDetail | null> {
    const run = await this.findRun(id);
    if (!run) return null;
    const warnings = await this.db.prepare("SELECT safe_message FROM cr_run_warnings WHERE run_id = ? ORDER BY ordinal").bind(id).all<{ safe_message: string }>();
    type PageSpeedRow = { target_id: string; strategy: "mobile" | "desktop"; audited_url: string; final_url: string | null; performance_score: number | null; accessibility_score: number | null; best_practices_score: number | null; seo_score: number | null; fcp_ms: number | null; lcp_ms: number | null; cls_milli: number | null; tbt_ms: number | null; speed_index_ms: number | null; captured_at: string };
    type SearchRow = { id: string; comparison_role: "current" | "previous"; property_id: string; period_id: "28d" | "90d"; start_date: string; end_date: string; clicks: number | null; impressions: number | null; ctr: number | null; average_position: number | null; total_state: string; daily_state: string; query_state: string; page_state: string; device_state: string; captured_at: string };
    const [pageSpeedRow, searchRows] = await Promise.all([
      this.db.prepare("SELECT * FROM cr_pagespeed_snapshots WHERE run_id = ? LIMIT 1").bind(id).first<PageSpeedRow>(),
      this.db.prepare("SELECT * FROM cr_search_snapshots WHERE run_id = ? ORDER BY comparison_role").bind(id).all<SearchRow>(),
    ]);
    type DiagnosticRow = { audit_id: string; title: string; display_value: string | null; score: number | null };
    type PreviousPageSpeedRow = { run_id: string; captured_at: string; performance_score: number | null; lcp_ms: number | null; cls_milli: number | null };
    type DailyRow = { snapshot_id: string; reporting_date: string; clicks: number; impressions: number; ctr: number; average_position: number };
    type QueryRow = { snapshot_id: string; rank_in_returned_rows: number; query_text: string; clicks: number; impressions: number; ctr: number; average_position: number };
    type PageRow = { snapshot_id: string; rank_in_returned_rows: number; page_url: string; relative_path: string; local_page_id: string | null; clicks: number; impressions: number; ctr: number; average_position: number };
    type DeviceRow = { snapshot_id: string; device: "MOBILE" | "DESKTOP" | "TABLET"; clicks: number; impressions: number; ctr: number; average_position: number };
    const [diagnostics, previousPageSpeed, dailyRows, queryRows, pageRows, deviceRows] = await Promise.all([
      this.db.prepare("SELECT audit_id, title, display_value, score FROM cr_pagespeed_diagnostics WHERE run_id = ? ORDER BY ordinal LIMIT 20").bind(id).all<DiagnosticRow>(),
      pageSpeedRow ? this.db.prepare("SELECT run_id, captured_at, performance_score, lcp_ms, cls_milli FROM cr_pagespeed_snapshots WHERE target_id = ? AND strategy = ? AND captured_at < ? ORDER BY captured_at DESC LIMIT 1").bind(pageSpeedRow.target_id, pageSpeedRow.strategy, pageSpeedRow.captured_at).first<PreviousPageSpeedRow>() : Promise.resolve(null),
      this.db.prepare("SELECT * FROM cr_search_daily_rows WHERE snapshot_id IN (SELECT id FROM cr_search_snapshots WHERE run_id = ?) ORDER BY reporting_date").bind(id).all<DailyRow>(),
      this.db.prepare("SELECT * FROM cr_search_query_rows WHERE snapshot_id IN (SELECT id FROM cr_search_snapshots WHERE run_id = ?) ORDER BY rank_in_returned_rows LIMIT 100").bind(id).all<QueryRow>(),
      this.db.prepare("SELECT * FROM cr_search_page_rows WHERE snapshot_id IN (SELECT id FROM cr_search_snapshots WHERE run_id = ?) ORDER BY rank_in_returned_rows LIMIT 100").bind(id).all<PageRow>(),
      this.db.prepare("SELECT * FROM cr_search_device_rows WHERE snapshot_id IN (SELECT id FROM cr_search_snapshots WHERE run_id = ?) ORDER BY device LIMIT 6").bind(id).all<DeviceRow>(),
    ]);
    const totals = (row: SearchRow): SearchMetricSet | null => row.clicks === null || row.impressions === null || row.ctr === null || row.average_position === null ? null : { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, averagePosition: row.average_position };
    return {
      run,
      warnings: warnings.results.map((row) => row.safe_message),
      pageSpeed: pageSpeedRow ? { targetId: pageSpeedRow.target_id, strategy: pageSpeedRow.strategy, auditedUrl: pageSpeedRow.audited_url, finalUrl: pageSpeedRow.final_url, performanceScore: pageSpeedRow.performance_score, accessibilityScore: pageSpeedRow.accessibility_score, bestPracticesScore: pageSpeedRow.best_practices_score, seoScore: pageSpeedRow.seo_score, fcpMs: pageSpeedRow.fcp_ms, lcpMs: pageSpeedRow.lcp_ms, clsMilli: pageSpeedRow.cls_milli, tbtMs: pageSpeedRow.tbt_ms, speedIndexMs: pageSpeedRow.speed_index_ms, capturedAt: pageSpeedRow.captured_at, diagnostics: diagnostics.results.map((row) => ({ auditId: row.audit_id, title: row.title, displayValue: row.display_value, score: row.score })), previousEquivalent: previousPageSpeed ? { runId: previousPageSpeed.run_id, capturedAt: previousPageSpeed.captured_at, performanceScore: previousPageSpeed.performance_score, lcpMs: previousPageSpeed.lcp_ms, clsMilli: previousPageSpeed.cls_milli } : null } : null,
      searchPeriods: searchRows.results.map((row) => ({ snapshotId: row.id, role: row.comparison_role, propertyId: row.property_id, periodId: row.period_id, startDate: row.start_date, endDate: row.end_date, totals: totals(row), states: { total: row.total_state, daily: row.daily_state, query: row.query_state, page: row.page_state, device: row.device_state }, daily: dailyRows.results.filter((item) => item.snapshot_id === row.id).map((item) => ({ date: item.reporting_date, metrics: { clicks: item.clicks, impressions: item.impressions, ctr: item.ctr, averagePosition: item.average_position } })), queries: queryRows.results.filter((item) => item.snapshot_id === row.id).map((item) => ({ query: item.query_text, rankWithinReturnedRows: item.rank_in_returned_rows, metrics: { clicks: item.clicks, impressions: item.impressions, ctr: item.ctr, averagePosition: item.average_position } })), pages: pageRows.results.filter((item) => item.snapshot_id === row.id).map((item) => ({ pageUrl: item.page_url, displayPath: item.relative_path, matchedLocalPageId: item.local_page_id, matchedLocalPageName: null, rankWithinReturnedRows: item.rank_in_returned_rows, metrics: { clicks: item.clicks, impressions: item.impressions, ctr: item.ctr, averagePosition: item.average_position } })), devices: deviceRows.results.filter((item) => item.snapshot_id === row.id).map((item) => ({ device: item.device, metrics: { clicks: item.clicks, impressions: item.impressions, ctr: item.ctr, averagePosition: item.average_position } })), capturedAt: row.captured_at })),
    };
  }

  async beginRun(draft: CaptureRunDraft): Promise<{ created: boolean; run: CaptureRun }> {
    const now = draft.startedAt;
    const [insert, selected] = await this.db.batch([
      this.db.prepare("INSERT OR IGNORE INTO cr_capture_runs(id, idempotency_key, source, capture_mode, trigger_kind, status, target_key, period_key, started_at, worker_version_id, worker_version_tag, worker_version_created_at, detail_retention_until, created_at) VALUES (?, ?, ?, ?, 'manual', 'running', ?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(draft.id, draft.idempotencyKey, draft.source, draft.captureMode, draft.targetKey, draft.periodKey, draft.startedAt, draft.workerVersionId, draft.workerVersionTag, draft.workerVersionCreatedAt, draft.detailRetentionUntil, now),
      this.db.prepare("SELECT * FROM cr_capture_runs WHERE id = ? LIMIT 1").bind(draft.id),
    ]);
    const row = (selected.results?.[0] ?? null) as CaptureRunRow | null;
    if (!row) throw new Error("The capture run could not be read after its idempotent insert.");
    return { created: Boolean(insert.meta.changes), run: runFromRow(row) };
  }

  async completeFailedRun(completion: CaptureRunCompletion, warnings: readonly string[]): Promise<void> {
    await this.db.batch([this.completionStatement(completion), ...this.warningStatements(completion.id, warnings, completion.completedAt ?? new Date().toISOString())]);
  }

  async completePageSpeedRun(completion: CaptureRunCompletion, result: LabPerformanceResult, warnings: readonly string[]): Promise<void> {
    const createdAt = completion.completedAt ?? result.providerGeneratedAt;
    const integerMetric = (value: number | null) => value === null ? null : Math.max(0, Math.round(value));
    const summary = this.db.prepare(`INSERT INTO cr_pagespeed_snapshots(run_id, target_id, strategy, audited_url, final_url, performance_score, accessibility_score, best_practices_score, seo_score, fcp_ms, lcp_ms, cls_milli, tbt_ms, speed_index_ms, lighthouse_version, diagnostic_count, captured_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(completion.id, result.targetId, result.strategy, result.requestedUrl, result.finalUrl, result.categoryScores.performance, result.categoryScores.accessibility, result.categoryScores["best-practices"], result.categoryScores.seo, integerMetric(result.metrics.firstContentfulPaint.value), integerMetric(result.metrics.largestContentfulPaint.value), result.metrics.cumulativeLayoutShift.value === null ? null : integerMetric(result.metrics.cumulativeLayoutShift.value * 1000), integerMetric(result.metrics.totalBlockingTime.value), integerMetric(result.metrics.speedIndex.value), result.lighthouseVersion, Math.min(result.diagnostics.length, 20), createdAt);
    const diagnostics = result.diagnostics.slice(0, 20).map((diagnostic, index) => this.db.prepare(`INSERT INTO cr_pagespeed_diagnostics(run_id, ordinal, audit_id, title, display_value, score, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .bind(completion.id, index, diagnostic.auditId, diagnostic.title, diagnostic.displayValue, diagnostic.score, createdAt));
    try {
      await this.db.batch([summary, ...diagnostics, ...this.warningStatements(completion.id, warnings.slice(0, 20), createdAt), this.completionStatement(completion)]);
    } catch {
      await this.completeFailedRun({ ...completion, status: "failed", successfulRequestCount: 0, failedRequestCount: Math.max(1, completion.requestCount), warningCount: 0, safeErrorCode: "persistence_write_failed", detailRetentionUntil: new Date(Date.parse(createdAt) + 90 * 86_400_000).toISOString() }, []);
    }
  }

  async completeSearchRun(completion: CaptureRunCompletion, periods: readonly StoredSearchPeriod[], warnings: readonly string[]): Promise<void> {
    const createdAt = completion.completedAt ?? new Date().toISOString();
    const statements: D1PreparedStatementLike[] = [];
    for (const { role, snapshot } of periods) {
      const snapshotId = crypto.randomUUID();
      const totals = snapshot.totals;
      const panelState = (panel: SearchPanel<unknown>) => panel.status;
      statements.push(this.db.prepare(`INSERT INTO cr_search_snapshots(id, run_id, comparison_role, property_id, property_type, period_id, start_date, end_date, timezone, search_type, data_state, clicks, impressions, ctr, average_position, total_state, daily_state, query_state, page_state, device_state, response_aggregation_type, captured_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(snapshotId, completion.id, role, snapshot.property.id, snapshot.property.propertyType, snapshot.period.id, snapshot.period.startDate, snapshot.period.endDate, snapshot.period.timezone, snapshot.period.searchType, snapshot.period.dataState, totals?.clicks ?? null, totals?.impressions ?? null, totals?.ctr ?? null, totals?.averagePosition ?? null, totals ? "success" : "empty", panelState(snapshot.daily), panelState(snapshot.queries), panelState(snapshot.pages), panelState(snapshot.devices), snapshot.totalsAggregationType, createdAt));
      statements.push(...this.insertStatements("cr_search_daily_rows", ["snapshot_id", "reporting_date", "clicks", "impressions", "ctr", "average_position"], rowsFromPanel(snapshot.daily).slice(0, 90).map((row) => [snapshotId, row.date, ...metricBindings(row.metrics)])));
      const queryRows = await Promise.all(rowsFromPanel(snapshot.queries).slice(0, 50).map(async (row) => [snapshotId, row.rankWithinReturnedRows, row.query, await queryKey(row.query), ...metricBindings(row.metrics)] as const));
      statements.push(...this.insertStatements("cr_search_query_rows", ["snapshot_id", "rank_in_returned_rows", "query_text", "normalized_query_hash", "clicks", "impressions", "ctr", "average_position"], queryRows));
      statements.push(...this.insertStatements("cr_search_page_rows", ["snapshot_id", "rank_in_returned_rows", "page_url", "relative_path", "normalized_page_key", "local_page_id", "clicks", "impressions", "ctr", "average_position"], rowsFromPanel(snapshot.pages).slice(0, 50).map((row) => [snapshotId, row.rankWithinReturnedRows, row.pageUrl, row.displayPath, row.pageUrl.toLowerCase(), row.matchedLocalPageId, ...metricBindings(row.metrics)])));
      statements.push(...this.insertStatements("cr_search_device_rows", ["snapshot_id", "device", "clicks", "impressions", "ctr", "average_position"], rowsFromPanel(snapshot.devices).slice(0, 3).map((row) => [snapshotId, row.device, ...metricBindings(row.metrics)])));
    }
    try {
      await this.db.batch([...statements, ...this.warningStatements(completion.id, warnings, createdAt), this.completionStatement(completion)]);
    } catch {
      await this.completeFailedRun({ ...completion, status: "failed", successfulRequestCount: 0, failedRequestCount: Math.max(1, completion.requestCount), warningCount: 0, safeErrorCode: "persistence_write_failed", detailRetentionUntil: new Date(Date.parse(createdAt) + 90 * 86_400_000).toISOString() }, []);
    }
  }

  async appendChangeEvent(input: ChangeEventInput): Promise<void> {
    await this.db.prepare("INSERT INTO cr_change_events(id, occurred_at, event_type, title, summary, affected_page_id, affected_path, git_commit, worker_version_id, verification_state, lifecycle_state, supersedes_event_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(input.id, input.occurredAt, input.eventType, input.title, input.summary, input.affectedPageId, input.affectedPath, input.gitCommit, input.workerVersionId, input.verificationState, input.lifecycleState, input.supersedesEventId, input.createdAt).run();
  }

  async appendActionEvidence(input: ActionEvidenceInput): Promise<void> {
    await this.db.prepare("INSERT INTO cr_action_evidence(id, action_id, change_event_id, baseline_run_id, followup_run_id, metric_family, expected_outcome, observed_outcome, evaluation_status, verification_state, supersedes_evidence_id, evaluated_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(input.id, input.actionId, input.changeEventId, input.baselineRunId, input.followupRunId, input.metricFamily, input.expectedOutcome, input.observedOutcome, input.evaluationStatus, input.verificationState, input.supersedesEvidenceId, input.evaluatedAt, input.createdAt).run();
  }

  async buildEvidencePacket(periodId: "28d" | "90d", generatedAt: string): Promise<ReportingEvidencePacketV1> {
    type SearchRow = { run_id: string; comparison_role: "current" | "previous"; start_date: string; end_date: string; clicks: number | null; impressions: number | null; ctr: number | null; average_position: number | null };
    const search = await this.db.prepare("SELECT run_id, comparison_role, start_date, end_date, clicks, impressions, ctr, average_position FROM cr_search_snapshots WHERE period_id = ? ORDER BY captured_at DESC LIMIT 2").bind(periodId).all<SearchRow>();
    const currentRow = search.results.find((row) => row.comparison_role === "current") ?? null;
    const previousRow = search.results.find((row) => row.comparison_role === "previous") ?? null;
    type PageSpeedEvidenceRow = { run_id: string; target_id: string; strategy: "mobile" | "desktop"; captured_at: string; performance_score: number | null; lcp_ms: number | null; cls_milli: number | null };
    const pageSpeed = await this.db.prepare("SELECT run_id, target_id, strategy, captured_at, performance_score, lcp_ms, cls_milli FROM cr_pagespeed_snapshots ORDER BY captured_at DESC LIMIT 8").all<PageSpeedEvidenceRow>();
    const metric = (row: SearchRow | null): SearchMetricSet | null => row?.clicks == null || row.impressions == null || row.ctr == null || row.average_position == null ? null : { clicks: row.clicks, impressions: row.impressions, ctr: row.ctr, averagePosition: row.average_position };
    const currentTotals = metric(currentRow); const previousTotals = metric(previousRow);
    return {
      schemaVersion: "reporting-evidence-v1", generatedAt, periodId,
      current: currentRow ? { runId: currentRow.run_id, startDate: currentRow.start_date, endDate: currentRow.end_date, totals: currentTotals } : null,
      previous: previousRow ? { runId: previousRow.run_id, startDate: previousRow.start_date, endDate: previousRow.end_date, totals: previousTotals } : null,
      deltas: { clicks: metricDelta(currentTotals?.clicks, previousTotals?.clicks), impressions: metricDelta(currentTotals?.impressions, previousTotals?.impressions), ctr: metricDelta(currentTotals?.ctr, previousTotals?.ctr), averagePosition: metricDelta(currentTotals?.averagePosition, previousTotals?.averagePosition) },
      recentPageSpeed: pageSpeed.results.map((row) => ({ runId: row.run_id, targetId: row.target_id, strategy: row.strategy, capturedAt: row.captured_at, performanceScore: row.performance_score, lcpValue: row.lcp_ms, clsValue: row.cls_milli === null ? null : row.cls_milli / 1000 })),
      evidenceReferences: [...[currentRow, previousRow].filter((row): row is SearchRow => Boolean(row)).map((row) => ({ type: "capture-run" as const, id: row.run_id, sensitivity: "internal" as const })), ...pageSpeed.results.map((row) => ({ type: "capture-run" as const, id: row.run_id, sensitivity: "internal" as const }))],
      limitations: ["Evidence is observational and does not prove causation.", "Search Console finalised data excludes the latest three Pacific calendar days.", "No raw provider responses or unbounded rows are included."],
    };
  }
}
