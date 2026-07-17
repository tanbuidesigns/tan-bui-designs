import "server-only";

import { actionRegister } from "@/data/control-room/actions";
import { changeLog } from "@/data/control-room/change-log";
import { contentHypotheses } from "@/data/control-room/content-opportunities";
import { decisions, leadPrerequisites } from "@/data/control-room/operating-model";
import { BASELINE_REVIEW_DATE, siteBaseline } from "@/data/control-room/site-baseline";
import { getActionSummary, getPageSummary } from "@/lib/control-room/summaries";
import type { IntegrationDescriptor, ProviderSourceMetadata } from "@/types/control-room";

import type { LocalBaselineProvider } from "./contracts";

export function createLocalBaselineProvider(descriptor: IntegrationDescriptor): LocalBaselineProvider {
  const source: ProviderSourceMetadata = {
    integrationId: descriptor.id,
    displayName: descriptor.displayName,
    dataMode: descriptor.dataMode,
    freshness: descriptor.freshness,
  };

  return {
    id: "local-baseline",
    descriptor,
    getStatus: () => descriptor,
    loadSnapshot: () => ({
      status: "success",
      source,
      warnings: [],
      data: {
        baselineReviewDate: BASELINE_REVIEW_DATE,
        lastUpdatedDate: BASELINE_REVIEW_DATE,
        pages: siteBaseline,
        actions: actionRegister,
        contentHypotheses,
        changes: changeLog,
        decisions,
        leadPrerequisites,
        pageSummary: getPageSummary(siteBaseline),
        actionSummary: getActionSummary(actionRegister),
      },
    }),
  };
}
