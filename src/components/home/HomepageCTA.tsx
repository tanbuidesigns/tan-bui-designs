import ArtworkCTA from "@/components/ArtworkCTA";

export default function HomepageCTA() {
  return (
    <ArtworkCTA
      label="Start a project"
      heading="Have an idea that needs clarity, craft and direction?"
      headingChunks={[
        "Have an idea",
        "that needs clarity,",
        "craft and direction?",
      ]}
      body="Whether it’s a brand, publication, website, exhibition or creative system, I can help turn ideas into clear visual experiences that people understand and remember."
      buttonLabel="Start a Conversation"
    />
  );
}
