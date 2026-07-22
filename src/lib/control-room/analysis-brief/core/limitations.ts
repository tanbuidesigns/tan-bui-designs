import type { ReportingEvidencePacket } from "./domain.ts";

export const LIGHTHOUSE_LAB_CAVEAT = "Lighthouse is a laboratory measurement. Differences between runs may reflect normal test variability as well as website changes.";
export const SEARCH_QUERY_EXCLUSION = "Exact Search queries are intentionally excluded.";

export function buildLimitations(packet: ReportingEvidencePacket, pageLevelEvidenceIncluded: boolean): string[] {
  const hasSearch = packet.current !== null || packet.previous !== null;
  const impressions = (packet.current?.totals?.impressions ?? 0) + (packet.previous?.totals?.impressions ?? 0);
  const lighthouseVersions = new Set(packet.recentPageSpeed.map((item) => item.lighthouseVersion).filter((item): item is string => Boolean(item)));
  const limitations = [...packet.limitations, LIGHTHOUSE_LAB_CAVEAT, SEARCH_QUERY_EXCLUSION];
  if (!pageLevelEvidenceIncluded) limitations.push("Page-level Search evidence was excluded by the webmaster.");
  if (!hasSearch) limitations.push("Search comparison is unavailable for the selected period.");
  else if (impressions < 20) limitations.push("Search data volume is currently too low to establish a reliable trend.");
  if (!packet.recentPageSpeed.length) limitations.push("No PageSpeed snapshot is available.");
  if (lighthouseVersions.size > 1) limitations.push("Comparable PageSpeed snapshots use different Lighthouse versions, so deltas require additional caution.");
  return [...new Set(limitations)];
}
