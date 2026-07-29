import ContentOpportunities from "@/components/control-room/ContentOpportunities";
import ControlRoomShell from "@/components/control-room/ControlRoomShell";
import EmptyIntegrationState from "@/components/control-room/EmptyIntegrationState";
import { getControlRoomSnapshot } from "@/lib/control-room/get-control-room-snapshot";

export default function ControlRoomContentPage() {
  const snapshot = getControlRoomSnapshot();
  return (
    <ControlRoomShell activeSection="content" eyebrow="TBD Control Room · Content" title="Content and public-tool hypotheses" description="Potential topics grounded in visible experience, clearly separated from search demand, ranking or traffic claims that have not been measured." baselineReviewDate={snapshot.baselineReviewDate} lastUpdatedDate={snapshot.lastUpdatedDate}>
      <EmptyIntegrationState title="Search evidence is connected but not yet interpreted here" message="These remain manually curated hypotheses, not keyword recommendations. The next content phase will turn stored Search Console evidence into dated, reviewable opportunities without making automatic ranking claims." />
      <ContentOpportunities opportunities={snapshot.contentHypotheses} />
    </ControlRoomShell>
  );
}
