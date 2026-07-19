import { notFound } from "next/navigation";

import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import HistoryStorageNotice from "@/components/control-room/HistoryStorageNotice";
import RunEvidenceDetails from "@/components/control-room/RunEvidenceDetails";
import { isUuid } from "@/lib/control-room/history/request-security";
import { getHistoryStorage } from "@/lib/control-room/history/storage";

export default async function HistoryRunPage({ params }: { params: Promise<{ runId: string }> }) {
  const { runId } = await params;
  if (!isUuid(runId)) notFound();
  const storage = await getHistoryStorage();
  const detail = storage.status === "ready" ? await storage.repository.getRunDetail(runId) : null;
  if (storage.status === "ready" && !detail) notFound();

  return (
    <ControlRoomShell activeSection="history" eyebrow="TBD Control Room · Run evidence" title="Capture run detail" description="A bounded record of one manual provider capture." baselineReviewDate="18 July 2026" lastUpdatedDate="18 July 2026">
      {storage.status !== "ready" ? <HistoryStorageNotice reason={storage.reason} /> : detail ? <RunEvidenceDetails detail={detail} /> : null}
    </ControlRoomShell>
  );
}
