import type { OperationalReadinessItem, ReadinessChecklistItem } from "@/types/control-room";

export const task4Readiness: readonly ReadinessChecklistItem[] = [
  { id: "domain", label: "Performance domain types prepared", complete: true, explanation: "Lab and field models are separate and permit unavailable values." },
  { id: "targets", label: "Verified target allowlist prepared", complete: true, explanation: "Performance requests accept a target ID and resolve an approved tanbuidesigns.com URL." },
  { id: "server-boundary", label: "Server-only provider boundary prepared", complete: true, explanation: "Provider implementations and the registry are protected by server-only imports." },
  { id: "provider", label: "Server-only PageSpeed provider implemented", complete: true, explanation: "The provider reads configuration at request time and never exposes it to React or the browser." },
  { id: "validation", label: "Google response validation implemented", complete: true, explanation: "Unknown upstream data is progressively checked and normalized into the existing provider result." },
  { id: "states", label: "Unavailable and safe error states implemented", complete: true, explanation: "Configuration, validation, timeout, quota, network and upstream failures render without raw details." },
  { id: "on-demand", label: "On-demand Performance view implemented", complete: true, explanation: "A server-rendered GET form runs one registered target only when run=1 is submitted." },
  { id: "configuration", label: "API key configured", complete: false, explanation: "This state is derived at request time; no key value is stored in Control Room data." },
];

export const securityReadiness: readonly OperationalReadinessItem[] = [
  { id: "guard", label: "Exact-host application guard", state: "active", explanation: "Public and unknown hosts cannot render Control Room routes." },
  { id: "authentication", label: "Private Google Sign-In", state: "active", explanation: "The private production hostname presents the configured Google authentication boundary." },
  { id: "authorisation", label: "Exact-user authorisation", state: "active", explanation: "Protected requests require a verified session for the one configured email address." },
  { id: "hostnames", label: "Alternate hostname review", state: "active", explanation: "workers.dev and Preview URLs are disabled and the application enforces the approved host." },
  { id: "credentials", label: "Private credentials", state: "active", explanation: "Provider credentials are configured as encrypted Worker Secrets and are checked only at request time; no value is displayed or persisted." },
  { id: "private-data", label: "Personal-data storage", state: "active", explanation: "Approved minimal lead records are stored in D1 and shown only inside the protected Control Room; message and technical request data are excluded." },
];

export const storageReadiness: readonly OperationalReadinessItem[] = [
  { id: "persistence", label: "Persistent storage", state: "active", explanation: "The source-controlled D1 binding and schema version 2 support measurement history plus minimal private lead records." },
  { id: "schedule", label: "Scheduled collection", state: "not-enabled", explanation: "All future cadences remain planning assumptions." },
  { id: "d1", label: "Cloudflare D1", state: "active", explanation: "The Western Europe database has the reviewed migration, binding and generated runtime types." },
  { id: "kv", label: "Cloudflare KV", state: "not-configured", explanation: "No KV namespace or binding exists." },
  { id: "r2", label: "Cloudflare R2", state: "not-configured", explanation: "No Control Room bucket or binding exists." },
  { id: "cron", label: "Cloudflare Cron", state: "active", explanation: "A daily UTC maintenance trigger deletes closed lead records whose approved 12-month retention period has elapsed; it does not collect analytics." },
];
