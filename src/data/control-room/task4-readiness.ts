import type { OperationalReadinessItem, ReadinessChecklistItem } from "@/types/control-room";

export const task4Readiness: readonly ReadinessChecklistItem[] = [
  { id: "domain", label: "Performance domain types prepared", complete: true, explanation: "Lab and field models are separate and permit unavailable values." },
  { id: "targets", label: "Verified target allowlist prepared", complete: true, explanation: "Task 4 will accept a target ID and resolve an approved tanbuidesigns.com URL." },
  { id: "server-boundary", label: "Server-only provider boundary prepared", complete: true, explanation: "Provider implementations and the registry are protected by server-only imports." },
  { id: "disconnected", label: "Disconnected provider active", complete: true, explanation: "The Performance page currently receives a typed unavailable result." },
  { id: "states", label: "Empty and safe error states prepared", complete: true, explanation: "Presentation states do not expose exceptions or sensitive details." },
  { id: "configuration", label: "Configuration supplied", complete: false, explanation: "PAGESPEED_API_KEY is documented but has not been created or read." },
  { id: "client", label: "Safe PageSpeed HTTP client implemented", complete: false, explanation: "No network utility or API request exists in V3." },
  { id: "live", label: "Live PageSpeed provider connected", complete: false, explanation: "Task 4 will implement and verify the adapter." },
];

export const securityReadiness: readonly OperationalReadinessItem[] = [
  { id: "guard", label: "Development-only production guard", state: "active", explanation: "Every Control Room route returns notFound() in production." },
  { id: "access", label: "Cloudflare Access application", state: "not-configured", explanation: "No Access policy or application has been created." },
  { id: "jwt", label: "Access JWT validation", state: "not-enabled", explanation: "Audience and issuer validation are documented but not implemented." },
  { id: "hostnames", label: "Alternate hostname review", state: "decision-required", explanation: "workers.dev and preview URL requirements still need an account-level decision." },
  { id: "credentials", label: "Private credentials", state: "not-enabled", explanation: "No Control Room credential or configuration value is present." },
  { id: "private-data", label: "Private data storage", state: "not-enabled", explanation: "No confidential or personal Control Room data is stored." },
];

export const storageReadiness: readonly OperationalReadinessItem[] = [
  { id: "persistence", label: "Persistent storage", state: "not-enabled", explanation: "No integration currently persists results." },
  { id: "schedule", label: "Scheduled collection", state: "not-enabled", explanation: "All future cadences remain planning assumptions." },
  { id: "d1", label: "Cloudflare D1", state: "not-configured", explanation: "No database binding exists." },
  { id: "kv", label: "Cloudflare KV", state: "not-configured", explanation: "No KV namespace or binding exists." },
  { id: "r2", label: "Cloudflare R2", state: "not-configured", explanation: "No Control Room bucket or binding exists." },
  { id: "cron", label: "Cloudflare Cron", state: "not-configured", explanation: "No trigger or scheduled job exists." },
];
