import "server-only";

import type { ActionEvidenceInput, ChangeEventInput } from "./domain";
import { getHistoryStorage } from "./storage";

export async function recordChangeEvent(input: ChangeEventInput) {
  const storage = await getHistoryStorage();
  if (storage.status !== "ready") return { status: "storage-unavailable" as const };
  await storage.repository.appendChangeEvent(input);
  return { status: "recorded" as const };
}

export async function recordActionEvidence(input: ActionEvidenceInput) {
  const storage = await getHistoryStorage();
  if (storage.status !== "ready") return { status: "storage-unavailable" as const };
  await storage.repository.appendActionEvidence(input);
  return { status: "recorded" as const };
}
