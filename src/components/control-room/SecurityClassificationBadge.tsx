import type { SecurityClassification } from "@/types/control-room";

const styles: Record<SecurityClassification, string> = {
  public: "bg-emerald-50 text-emerald-800",
  internal: "bg-blue-50 text-blue-800",
  confidential: "bg-amber-50 text-amber-950",
  "personal-data": "bg-red-50 text-red-900",
};

export default function SecurityClassificationBadge({ classification }: { classification: SecurityClassification }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${styles[classification]}`}>Security: {classification.replaceAll("-", " ")}</span>;
}
