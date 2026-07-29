import type { DecisionRecord, LeadPrerequisite } from "@/types/control-room";

export const decisions: readonly DecisionRecord[] = [
  {
    id: "handbook-indexing",
    question: "Should the Design Handbook and its child routes remain indexable?",
    context: "They are public and linked from the footer but currently inherit generic metadata.",
    priority: "high",
    verificationStatus: "requires-verification",
    source: "derived-from-baseline",
  },
  {
    id: "playground-availability",
    question: "Should Playground remain unavailable until published items exist?",
    context: "The production route currently returns notFound() because the generated item list is empty.",
    priority: "medium",
    verificationStatus: "requires-verification",
    source: "derived-from-baseline",
  },
  {
    id: "analytics-model",
    question: "Which analytics model is approved for the public site?",
    context: "Cloudflare Web Analytics is approved and active through automatic setup for aggregate, cookie-free audience and performance reporting.",
    priority: "medium",
    verificationStatus: "confirmed",
    source: "repository-review",
  },
  {
    id: "public-tool-data",
    question: "May future public tools process or store any personal or uploaded data?",
    context: "The proposed content tools can begin as non-storing checklists, avoiding a premature data system.",
    priority: "high",
    verificationStatus: "requires-verification",
    source: "manual-hypothesis",
  },
  {
    id: "alternate-hostnames",
    question: "How are alternate Worker hostnames handled for the private pilot?",
    context: "Task 6 explicitly disables workers.dev and Preview URLs; the exact production host is also enforced by the application guard.",
    priority: "medium",
    verificationStatus: "confirmed",
    source: "repository-review",
  },
  {
    id: "control-room-production-host",
    question: "Which hostname is approved for the protected Control Room pilot?",
    context: "The approved full-host boundary is dashboard.tanbuidesigns.com; public and unknown hosts remain concealed.",
    priority: "high",
    verificationStatus: "confirmed",
    source: "planned-integration",
  },
];

export const leadPrerequisites: readonly LeadPrerequisite[] = [
  { id: "validation", label: "Server-side validation", status: "implemented", reason: "The production endpoint validates content type, payload size, field types, lengths, email shape and approved service values before delivery." },
  { id: "spam", label: "Spam protection", status: "implemented", reason: "A hidden honeypot, strict validation and Cloudflare Turnstile verification protect the public form while keeping friction low for genuine enquiries." },
  { id: "rate-limit", label: "Rate limiting", status: "implemented", reason: "The Cloudflare Worker applies a ten-request-per-minute edge limit to the contact endpoint without retaining IP addresses in the lead register." },
  { id: "consent", label: "Purpose and privacy decision", status: "implemented", reason: "Lead data is limited to enquiry follow-up and the visible privacy notice documents the approved use." },
  { id: "retention", label: "Retention policy", status: "implemented", reason: "Closed enquiries that do not become projects receive a deletion date 12 months after closure." },
  { id: "deletion", label: "Deletion process", status: "implemented", reason: "A daily Cloudflare Cron job deletes due closed-lead records in bounded batches." },
  { id: "storage", label: "Secure private storage", status: "implemented", reason: "Minimal lead records use the existing bound D1 database and are visible only inside the protected Control Room." },
  { id: "attribution", label: "Attribution fields", status: "implemented", reason: "Attribution is limited to the originating public page; tracking parameters and technical identifiers are not retained." },
  { id: "access", label: "Access control", status: "implemented", reason: "The live Control Room uses the approved private hostname, Google Sign-In and exact-email authorisation boundary." },
  { id: "reporting", label: "Reporting requirements", status: "implemented", reason: "The first release reports only pipeline counts, status and follow-up dates, without budget or estimated-value fields." },
];

export const approvedLeadFields = [
  "received date",
  "name",
  "email",
  "selected services",
  "originating page",
  "lead status",
  "follow-up date",
  "retention deletion date",
] as const;
