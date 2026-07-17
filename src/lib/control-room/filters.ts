import type {
  ActionRecord,
  MetadataStatus,
  PageBaselineRecord,
  PageCategory,
  ReviewPriority,
  VerificationStatus,
} from "@/types/control-room";

export type SearchParamRecord = Record<string, string | string[] | undefined>;

export function firstParam(params: SearchParamRecord, key: string): string {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function filterPages(pages: readonly PageBaselineRecord[], params: SearchParamRecord): PageBaselineRecord[] {
  const category = firstParam(params, "category") as PageCategory | "";
  const priority = firstParam(params, "priority") as ReviewPriority | "";
  const verification = firstParam(params, "verification") as VerificationStatus | "";
  const metadata = firstParam(params, "metadata") as MetadataStatus | "";

  return pages.filter((page) =>
    (!category || page.category === category)
    && (!priority || page.reviewPriority === priority)
    && (!verification || page.verificationStatus === verification)
    && (!metadata || page.metadataTitle === metadata),
  );
}

export function filterActions(actions: readonly ActionRecord[], params: SearchParamRecord): ActionRecord[] {
  const fields = ["category", "priority", "effort", "status", "verification"] as const;

  return actions.filter((action) => fields.every((field) => {
    const expected = firstParam(params, field);
    const actual = field === "verification" ? action.verificationStatus : action[field];
    return !expected || actual === expected;
  }) && (() => {
    const approval = firstParam(params, "approval");
    if (!approval) return true;
    return action.approvalRequired === (approval === "required");
  })());
}
