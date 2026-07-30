type QueryEvidence = { query: string; metrics: { clicks: number; impressions: number; ctr: number; averagePosition: number } };

export type SearchContentOpportunity = {
  query: string;
  classification: "strong-impressions-low-ctr" | "ranking-range" | "emerging-top-row";
  rationale: string;
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
};

export function deriveSearchContentOpportunities(input: { current: readonly QueryEvidence[]; previous: readonly QueryEvidence[]; limit?: number }): readonly SearchContentOpportunity[] {
  const previousQueries = new Set(input.previous.map((row) => row.query.normalize("NFKC").trim().toLocaleLowerCase("en-GB")));
  const candidates = input.current.flatMap((row): SearchContentOpportunity[] => {
    const metrics = row.metrics;
    if (metrics.impressions < 5 || metrics.averagePosition > 40) return [];
    const normalized = row.query.normalize("NFKC").trim().toLocaleLowerCase("en-GB");
    if (!previousQueries.has(normalized)) return [{ query: row.query, classification: "emerging-top-row", rationale: "This query appears in the current returned top-query set but not the previous returned set. Treat it as emerging evidence, not proof of new demand.", ...metrics }];
    if (metrics.impressions >= 20 && metrics.ctr < 0.03) return [{ query: row.query, classification: "strong-impressions-low-ctr", rationale: "The current returned row has at least 20 impressions and CTR below 3%. Review whether an existing page satisfies the intent before creating content.", ...metrics }];
    if (metrics.impressions >= 10 && metrics.averagePosition >= 4 && metrics.averagePosition <= 30) return [{ query: row.query, classification: "ranking-range", rationale: "The current returned row has measurable impressions and an average position between 4 and 30. Check page relevance, internal links and snippet clarity before proposing a new page.", ...metrics }];
    return [];
  });
  const priority = { "strong-impressions-low-ctr": 0, "ranking-range": 1, "emerging-top-row": 2 } as const;
  return candidates.sort((a, b) => priority[a.classification] - priority[b.classification] || b.impressions - a.impressions).slice(0, Math.max(1, Math.min(12, input.limit ?? 8)));
}
