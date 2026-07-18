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

export const task6CodeReadiness: readonly ReadinessChecklistItem[] = [
  { id: "host", label: "Exact private-host policy", complete: true, explanation: "Local and synthetic checks confirm that production accepts only dashboard.tanbuidesigns.com before authentication processing; live verification remains pending." },
  { id: "configuration", label: "Fail-closed configuration reader", complete: true, explanation: "Google client settings, session secret and authorised identity are validated server-side." },
  { id: "google-auth", label: "Private Google Sign-In", complete: true, explanation: "The authorised local Google flow was verified; production sign-in and exact-email denial still require controlled deployment." },
  { id: "session", label: "Database-free encrypted session", complete: true, explanation: "Local session creation, sign-out and session clearing were verified; production runtime behaviour remains pending." },
  { id: "shared-guard", label: "Shared route-group guard", complete: true, explanation: "Every current and future Control Room page inherits one server-layout boundary." },
  { id: "headers", label: "Private response headers", complete: true, explanation: "Private no-store, noindex and defensive response headers are implemented; live-host verification remains pending." },
  { id: "routes", label: "Private custom-domain declaration", complete: true, explanation: "The existing Worker configuration preserves public domains and declares the dashboard domain." },
  { id: "alternate-hosts", label: "Alternate deployment routes disabled", complete: true, explanation: "workers.dev and Preview URLs are explicitly disabled in source-controlled configuration." },
  { id: "secrets", label: "Required-secret manifest", complete: true, explanation: "All required Worker Secret names and the optional Search Console key ID were confirmed remotely; encrypted values were not read back." },
  { id: "runbook", label: "Deployment and rollback runbook", complete: true, explanation: "The two-stage pilot, verification order and emergency isolation steps are documented, and predeployment builds and dry-run validation passed." },
];

export const task6ManualReadiness: readonly OperationalReadinessItem[] = [
  { id: "google-client", label: "Private Google OAuth client", state: "active", explanation: "The Web client, External testing audience, approved test user and exact local and production callbacks are confirmed." },
  { id: "local-auth", label: "Local Google authentication verification", state: "active", explanation: "Authorised sign-in, Better Auth session creation, sign-out and session clearing succeeded on an approved loopback host." },
  { id: "allowed-user", label: "Exact authorised Google identity", state: "active", explanation: "The approved test user and application-side exact-email allowlist are configured without exposing the address." },
  { id: "auth-secrets", label: "Google and session secrets", state: "active", explanation: "All four authentication Worker Secret names exist remotely as encrypted unread values; production runtime verification is pending." },
  { id: "provider-secrets", label: "Provider and contact Worker Secrets", state: "active", explanation: "Required PageSpeed, Search Console and contact secret names plus the optional Search Console key ID are confirmed remotely; production provider runs remain pending." },
  { id: "host-tests", label: "Local and synthetic security checks", state: "active", explanation: "Loopback policy, public and alternate-host denial, disabled workers.dev and Preview routes, response-header implementation, builds and dry run are confirmed before deployment." },
  { id: "checkpoint", label: "Task 6 checkpoint commit", state: "planned", explanation: "The approved Task 6 changes remain uncommitted." },
  { id: "custom-domain", label: "Private custom domain active", state: "planned", explanation: "The route is declared locally, but dashboard.tanbuidesigns.com has not been deployed or activated." },
  { id: "identity-tests", label: "Production identity and session checks", state: "planned", explanation: "Verify authorised login, unauthorised denial, sign-out and session-expiry behaviour after controlled deployment." },
  { id: "provider-tests", label: "Production provider checks", state: "planned", explanation: "Run one deliberate PageSpeed request and one Search Console report after production authentication is verified." },
  { id: "live-policy-tests", label: "Live private-host policy checks", state: "planned", explanation: "Verify private cache headers, noindex policy and responsive behaviour on the live hostname." },
  { id: "public-regression", label: "Public portfolio regression review", state: "planned", explanation: "Confirm the public apex and www hosts remain healthy and continue denying Control Room access after deployment." },
  { id: "rollback", label: "Rollback verification", state: "planned", explanation: "Verify the documented isolation and previous-version recovery procedure during the controlled production pilot." },
  { id: "pilot", label: "Controlled production pilot", state: "planned", explanation: "Checkpoint, deployment, private-host activation and all production-runtime checks remain pending." },
];
