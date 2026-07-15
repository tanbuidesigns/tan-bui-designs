import ArtworkCTA from "@/components/ArtworkCTA";
import type { ArtworkVariant } from "@/components/ArtworkBackground";

type ProjectCTAProps = {
  artworkVariant?: ArtworkVariant;
};

export default function ProjectCTA({
  artworkVariant = "cta",
}: ProjectCTAProps) {
  return (
    <ArtworkCTA
      label="Start a project"
      heading="Ready to build something meaningful?"
      headingChunks={["Ready to build", "something meaningful?"]}
      body="Whether you’re planning a brand, publication, website, exhibition, digital product or creative campaign, I’d love to hear about it. Every project starts with a conversation, a challenge and a clear objective."
      buttonLabel="Start a Conversation"
      artworkVariant={artworkVariant}
    />
  );
}
