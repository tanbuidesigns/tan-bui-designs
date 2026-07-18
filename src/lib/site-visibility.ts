import { playgroundItems } from "@/data/playground.generated";

export const hasPublishedPlayground = playgroundItems.length > 0;
export const showPlayground =
  process.env.NODE_ENV !== "production" || hasPublishedPlayground;
