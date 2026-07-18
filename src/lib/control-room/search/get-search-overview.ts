import "server-only";

import { connection } from "next/server";

import { searchConsoleProperties } from "@/data/control-room/search-console-properties";
import { searchPerformanceProvider } from "@/lib/control-room/integrations/registry";
import type { SearchPerformanceRequest } from "@/types/control-room-search";

import { isSearchPeriodId, searchPeriodOptions } from "./reporting-period";

export async function getSearchOverview(input: { period?: string; run?: string } = {}) {
  const periodId = input.period && isSearchPeriodId(input.period) ? input.period : "28d";
  const shouldRun = input.run === "1";
  const validationMessage = shouldRun && input.period && !isSearchPeriodId(input.period)
    ? "Select one of the approved finalised reporting periods."
    : null;
  const request: SearchPerformanceRequest = { periodId };
  let liveResult = null;
  if (shouldRun && !validationMessage) {
    await connection();
    liveResult = await searchPerformanceProvider.loadSearchPerformance(request);
  }
  const property = searchConsoleProperties.find((item) => item.enabled) ?? null;
  return {
    source: searchPerformanceProvider.getStatus(),
    property,
    periods: searchPeriodOptions,
    request,
    shouldRun,
    validationMessage,
    liveResult,
  };
}
