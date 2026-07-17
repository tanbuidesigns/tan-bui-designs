import { actionRegister } from "@/data/control-room/actions";
import { changeLog } from "@/data/control-room/change-log";
import { contentHypotheses } from "@/data/control-room/content-opportunities";
import { integrations } from "@/data/control-room/integrations";
import { decisions, leadPrerequisites } from "@/data/control-room/operating-model";
import { BASELINE_REVIEW_DATE, siteBaseline } from "@/data/control-room/site-baseline";
import type { ControlRoomSnapshot } from "@/types/control-room";

import { getActionSummary, getPageSummary } from "./summaries";

export function getControlRoomSnapshot(): ControlRoomSnapshot {
  return {
    baselineReviewDate: BASELINE_REVIEW_DATE,
    lastUpdatedDate: BASELINE_REVIEW_DATE,
    pages: siteBaseline,
    actions: actionRegister,
    contentHypotheses,
    integrations,
    changes: changeLog,
    decisions,
    leadPrerequisites,
    pageSummary: getPageSummary(siteBaseline),
    actionSummary: getActionSummary(actionRegister),
  };
}
