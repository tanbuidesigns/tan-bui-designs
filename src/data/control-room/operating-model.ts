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
    question: "Which privacy-aware analytics model, if any, should be approved?",
    context: "No public analytics service is currently present and the privacy implications are undecided.",
    priority: "medium",
    verificationStatus: "requires-verification",
    source: "planned-integration",
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
  { id: "validation", label: "Server-side validation", status: "technical-work-required", reason: "The current endpoint parses and forwards fields without a server-side validation schema." },
  { id: "spam", label: "Spam protection", status: "technical-work-required", reason: "No explicit abuse protection is present in the repository." },
  { id: "rate-limit", label: "Rate limiting", status: "technical-work-required", reason: "A deployment-aware rate-limiting approach has not been selected." },
  { id: "consent", label: "Consent and privacy decision", status: "decision-required", reason: "The purpose and lawful basis for future attribution fields must be approved." },
  { id: "retention", label: "Retention policy", status: "decision-required", reason: "The current privacy notice says a fixed retention schedule is not confirmed." },
  { id: "deletion", label: "Deletion process", status: "decision-required", reason: "No operational deletion process is documented." },
  { id: "storage", label: "Secure private storage", status: "not-enabled", reason: "No database or lead store exists." },
  { id: "attribution", label: "Attribution fields", status: "decision-required", reason: "Only necessary, consent-compatible fields should be approved." },
  { id: "access", label: "Access control", status: "technical-work-required", reason: "Private Google Sign-In is implemented locally; OAuth configuration and production verification remain behind the Task 6 manual gate." },
  { id: "reporting", label: "Reporting requirements", status: "decision-required", reason: "The questions that lead reporting should answer have not been approved." },
];

export const proposedLeadFields = [
  "date",
  "enquiry source",
  "originating page",
  "service",
  "budget range",
  "status",
  "estimated value",
  "follow-up date",
  "consent status",
] as const;
