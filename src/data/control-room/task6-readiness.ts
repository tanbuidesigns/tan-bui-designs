import type { OperationalReadinessItem, ReadinessChecklistItem } from "@/types/control-room";

export const task5Readiness: readonly ReadinessChecklistItem[] = [
  { id: "provider", label: "Read-only Search Console provider", complete: true, explanation: "One server-only provider runs only after explicit user intent." },
  { id: "configuration", label: "Server-only configuration boundary", complete: true, explanation: "Required names are checked at request time without exposing values." },
  { id: "property", label: "Registered property enforcement", complete: true, explanation: "The browser cannot supply or change the Search Console property." },
  { id: "oauth", label: "Service-account token exchange", complete: true, explanation: "A short-lived RS256 assertion requests only the webmasters.readonly scope." },
  { id: "catalogue", label: "Fixed five-query catalogue", complete: true, explanation: "Totals, daily, query, page and device reports are fixed server-side." },
  { id: "validation", label: "Validation and partial results", complete: true, explanation: "Unknown responses are normalized independently with bounded safe warnings." },
  { id: "page-match", label: "Local page-inventory matching", complete: true, explanation: "Approved page URLs are matched to the curated baseline where possible." },
  { id: "credentials", label: "Search Console configuration ready", complete: false, explanation: "This state is derived from the integration registry at request time." },
];

export const task6Readiness: readonly OperationalReadinessItem[] = [
  { id: "host", label: "Protected production hostname", state: "decision-required", explanation: "Prefer dashboard.tanbuidesigns.com or explicitly approve a protected path." },
  { id: "access-app", label: "Cloudflare Access application and allow policy", state: "not-configured", explanation: "No production Access application or authorised-user policy exists." },
  { id: "access-jwt", label: "Origin-side Access JWT validation", state: "not-enabled", explanation: "Issuer, audience, signature and expiry validation remain Task 6 work." },
  { id: "secrets", label: "Cloudflare Worker Secrets", state: "not-configured", explanation: "PageSpeed and Search Console values remain local-only configuration." },
  { id: "alternate-hosts", label: "workers.dev and preview bypass review", state: "decision-required", explanation: "Alternate hostnames must be disabled or protected consistently." },
  { id: "private-cache", label: "Private response caching policy", state: "not-enabled", explanation: "Task 6 must prevent private Control Room responses from being cached publicly." },
  { id: "pilot", label: "Controlled protected pilot", state: "planned", explanation: "Production remains 404 until Access and application-side validation are verified." },
];
