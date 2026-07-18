import type {
  ActionRecord,
  ActionSummary,
  PageBaselineRecord,
  PageSummary,
  ReviewPriority,
} from "@/types/control-room";

const openStatuses = new Set(["backlog", "ready", "in-progress", "blocked", "review"]);

export function getPageSummary(pages: readonly PageBaselineRecord[]): PageSummary {
  return {
    total: pages.length,
    dedicatedMetadata: pages.filter((page) => page.metadataTitle === "dedicated").length,
    inheritedMetadata: pages.filter((page) => page.metadataTitle === "inherited").length,
    requiringReview: pages.filter((page) => page.content === "review" || page.reviewPriority === "high" || page.intendedIndexability === "decision-required").length,
    unavailableOrNoindex: pages.filter((page) => page.availability !== "available" || page.intendedIndexability === "noindex").length,
    requiringVerification: pages.filter((page) => page.verificationStatus === "requires-verification" || page.intendedIndexability === "decision-required").length,
  };
}

export function getActionSummary(actions: readonly ActionRecord[]): ActionSummary {
  const open = actions.filter((action) => openStatuses.has(action.status));
  const priorities: ReviewPriority[] = ["critical", "high", "medium", "low"];

  return {
    openCriticalHigh: open.filter((action) => action.priority === "critical" || action.priority === "high").length,
    ready: open.filter((action) => action.status === "ready").length,
    blocked: open.filter((action) => action.status === "blocked").length,
    externalAccess: open.filter((action) => action.externalAccessRequired).length,
    approvalRequired: open.filter((action) => action.approvalRequired).length,
    byPriority: Object.fromEntries(
      priorities.map((priority) => [priority, open.filter((action) => action.priority === priority).length]),
    ) as Record<ReviewPriority, number>,
  };
}
