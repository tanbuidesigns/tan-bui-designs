import "server-only";

import { siteBaseline } from "@/data/control-room/site-baseline";
import type { PerformanceTarget } from "@/types/control-room";

const permittedPageIds = ["home", "work", "about", "contact", "privacy", "urban-eat", "islamiyah-series", "blog"] as const;

export const performanceTargets: readonly PerformanceTarget[] = permittedPageIds.map((pageId) => {
  const page = siteBaseline.find((record) => record.id === pageId);
  if (!page || page.productionVisibility !== "public" || page.availability !== "available") {
    throw new Error(`Performance target is not an available public baseline page: ${pageId}`);
  }

  return {
    id: `performance-${page.id}`,
    displayLabel: page.name,
    pageId: page.id,
    canonicalUrl: `https://tanbuidesigns.com${page.route === "/" ? "" : page.route}`,
    route: page.route,
    pageCategory: page.category,
    allowedStrategies: ["mobile", "desktop"],
    defaultStrategy: "mobile",
    enabled: true,
    reviewPriority: page.reviewPriority,
  };
});

export function getPerformanceTargetById(targetId: string): PerformanceTarget | null {
  return performanceTargets.find((target) => target.id === targetId) ?? null;
}
