import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import HistoryStorageNotice from "@/components/control-room/HistoryStorageNotice";
import { getHistoryStorage } from "@/lib/control-room/history/storage";
import type { ReportingEvidencePacketV1 } from "@/lib/control-room/history/domain";

function Packet({ packet }: { packet: ReportingEvidencePacketV1 }) {
  const format = (value: number | null) => value === null ? "Unavailable" : new Intl.NumberFormat("en-GB", { maximumFractionDigits: 3, signDisplay: "exceptZero" }).format(value);
  return <section className="rounded-[1.35rem] border border-black/8 bg-white p-5 sm:p-7"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">Deterministic evidence packet · {packet.periodId}</p><h2 className="mt-2 text-2xl font-bold">Latest equal-period comparison</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{Object.entries(packet.deltas).map(([label, value]) => <div key={label} className="rounded-xl bg-[#f7f7f4] p-4"><p className="text-xs uppercase text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold">{format(value)}</p></div>)}</div><p className="mt-5 text-sm text-gray-600">{packet.current ? `${packet.current.startDate} to ${packet.current.endDate}` : "No current-period evidence."} {packet.previous ? `compared with ${packet.previous.startDate} to ${packet.previous.endDate}.` : "No previous-period evidence."}</p><ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-500">{packet.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

export default async function ReportsPage() {
  const storage = await getHistoryStorage();
  const packets = storage.status === "ready" ? await Promise.all([storage.repository.buildEvidencePacket("28d", new Date().toISOString()), storage.repository.buildEvidencePacket("90d", new Date().toISOString())]) : null;
  return <ControlRoomShell activeSection="reports" eyebrow="TBD Control Room · Reports" title="Reporting evidence" description="Latest bounded 28-day and 90-day evidence packets. They contain observations only: no generated conclusions, downloads or raw provider rows." baselineReviewDate="18 July 2026" lastUpdatedDate="18 July 2026">{storage.status !== "ready" ? <HistoryStorageNotice reason={storage.reason} /> : packets?.map((packet) => <Packet key={packet.periodId} packet={packet} />)}</ControlRoomShell>;
}
