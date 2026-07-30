import type { D1DatabaseLike } from "@/lib/control-room/history/d1-repository";
import type { AnalyticsSnapshot, LeadAttributionRow, ServiceOutcomeRow } from "./domain";
import type { AnalyticsRepository } from "./repository";

type SnapshotRow = { id: string; period_start: string; period_end: string; page_views: number; visits: number; lcp_p75_ms: number | null; inp_p75_ms: number | null; cls_p75_milli: number | null; notes: string | null; created_at: string };

export class D1AnalyticsRepository implements AnalyticsRepository {
  constructor(private readonly db: D1DatabaseLike) {}
  async list(limit: number): Promise<readonly AnalyticsSnapshot[]> {
    const result = await this.db.prepare("SELECT * FROM cr_analytics_snapshots ORDER BY period_end DESC, created_at DESC LIMIT ?").bind(Math.max(1, Math.min(24, limit))).all<SnapshotRow>();
    return result.results.map((row) => ({ id: row.id, periodStart: row.period_start, periodEnd: row.period_end, pageViews: row.page_views, visits: row.visits, lcpP75Ms: row.lcp_p75_ms, inpP75Ms: row.inp_p75_ms, clsP75Milli: row.cls_p75_milli, notes: row.notes, createdAt: row.created_at }));
  }
  async create(input: AnalyticsSnapshot): Promise<void> {
    await this.db.prepare("INSERT INTO cr_analytics_snapshots(id, source, period_start, period_end, page_views, visits, lcp_p75_ms, inp_p75_ms, cls_p75_milli, notes, created_at) VALUES (?, 'cloudflare-web-analytics', ?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(input.id, input.periodStart, input.periodEnd, input.pageViews, input.visits, input.lcpP75Ms, input.inpP75Ms, input.clsP75Milli, input.notes, input.createdAt).run();
  }
  async leadAttribution(): Promise<{ sources: readonly LeadAttributionRow[]; services: readonly ServiceOutcomeRow[] }> {
    const [sources, services] = await Promise.all([
      this.db.prepare("SELECT source_path, status, COUNT(*) AS total FROM cr_leads GROUP BY source_path, status ORDER BY total DESC, source_path ASC").all<{ source_path: string; status: string; total: number }>(),
      this.db.prepare("SELECT json_each.value AS service, cr_leads.status AS status, COUNT(*) AS total FROM cr_leads, json_each(cr_leads.services_json) GROUP BY json_each.value, cr_leads.status ORDER BY total DESC, service ASC").all<ServiceOutcomeRow>(),
    ]);
    return { sources: sources.results.map((row) => ({ sourcePath: row.source_path, status: row.status, total: row.total })), services: services.results };
  }
}
