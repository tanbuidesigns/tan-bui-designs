import type { BriefEvidenceReference, EvidenceReference } from "./domain.ts";

const RUN_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isApprovedEvidenceRoute(href: string): boolean {
  if (href === "/control-room/evidence" || href === "/control-room/reports") return true;
  const match = /^\/control-room\/history\/([^/]+)$/.exec(href);
  return Boolean(match && RUN_ID.test(match[1]));
}

export function resolveBriefEvidenceLinks(references: readonly EvidenceReference[]): BriefEvidenceReference[] {
  return references.flatMap((reference, index) => {
    if (reference.sensitivity !== "internal") return [];
    const kind = reference.type === "capture-run" ? "CAPTURE" : reference.type === "change-event" ? "CHANGE" : "ACTION";
    const href = reference.type === "capture-run" && RUN_ID.test(reference.id)
      ? `/control-room/history/${reference.id}`
      : reference.type === "capture-run"
        ? "/control-room/reports"
        : "/control-room/evidence";
    return [{ ...reference, label: `[EVIDENCE ${kind}-${String(index + 1).padStart(2, "0")}]`, href, timestamp: null }];
  });
}
