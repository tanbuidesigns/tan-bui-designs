import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import OperationalState from "@/components/control-room/OperationalState";

export default function ControlRoomLoading() {
  return (
    <ControlRoomShell activeSection="overview" eyebrow="TBD Control Room · Loading" title="Preparing the local Control Room" description="Server-side baseline and integration status are being assembled." baselineReviewDate="17 July 2026" lastUpdatedDate="17 July 2026">
      <OperationalState kind="loading" title="Loading local operating data" explanation="No external integration is contacted while this page loads." />
    </ControlRoomShell>
  );
}
