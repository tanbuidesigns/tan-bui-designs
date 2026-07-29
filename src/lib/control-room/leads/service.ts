import "server-only";

import type { NewLeadInput } from "./domain";
import { getLeadStorage } from "./storage";

export async function recordContactLead(input: NewLeadInput) {
  const storage = await getLeadStorage();
  if (storage.status !== "ready") {
    return { status: "storage-unavailable" as const };
  }

  try {
    await storage.repository.create(input);
    return { status: "recorded" as const };
  } catch {
    return { status: "storage-error" as const };
  }
}
