"use client";

import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import SafeIntegrationError from "@/components/control-room/SafeIntegrationError";

export default function ControlRoomError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ControlRoomShell activeSection="overview" eyebrow="TBD Control Room · Error" title="The Control Room needs another attempt" description="A safe local error boundary prevented internal failure details from reaching the interface." baselineReviewDate="17 July 2026" lastUpdatedDate="17 July 2026">
      <SafeIntegrationError section="Control Room" onRetry={reset} />
    </ControlRoomShell>
  );
}
