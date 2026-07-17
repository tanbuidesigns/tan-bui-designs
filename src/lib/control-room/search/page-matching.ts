import "server-only";

import { siteBaseline } from "@/data/control-room/site-baseline";

const approvedHosts = new Set(["tanbuidesigns.com", "www.tanbuidesigns.com"]);

export function matchSearchPage(value: string): { pageUrl: string; displayPath: string; matchedLocalPageId: string | null; matchedLocalPageName: string | null } | null {
  if (value.length > 2_048) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.hash || !approvedHosts.has(url.hostname.toLowerCase())) return null;
    const route = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    const match = siteBaseline.find((page) => page.route === route) ?? null;
    return {
      pageUrl: url.toString(),
      displayPath: `${url.pathname}${url.search}`,
      matchedLocalPageId: match?.id ?? null,
      matchedLocalPageName: match?.name ?? null,
    };
  } catch {
    return null;
  }
}
