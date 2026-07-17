import type { VerificationStatus } from "@/types/control-room";

const styles: Record<VerificationStatus, string> = {
  confirmed: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  inferred: "bg-blue-50 text-blue-800 ring-blue-700/15",
  "requires-verification": "bg-amber-50 text-amber-950 ring-amber-700/15",
};

const labels: Record<VerificationStatus, string> = {
  confirmed: "Confirmed",
  inferred: "Inferred",
  "requires-verification": "Requires verification",
};

export default function VerificationBadge({ status }: { status: VerificationStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset ${styles[status]}`}>{labels[status]}</span>;
}
