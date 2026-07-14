import ArtworkCTA from "@/components/ArtworkCTA";

const prompts = [
  "Brand system",
  "Packaging rollout",
  "Website design",
  "Campaign assets",
  "Pitch decks",
  "Publication design",
  "Retail POS",
  "Digital products",
] as const;

export default function CaseStudyCTA() {
  return (
    <ArtworkCTA
      label="Start a project"
      heading="Ready to build something meaningful?"
      body="Whether you’re planning a brand, publication, website, exhibition, digital product or creative campaign, I’d love to hear about it. Every project starts with a conversation, a challenge and a clear objective."
      buttonLabel="Start a Conversation"
      supportingItems={prompts}
      note="Got something in mind? Send me the rough idea and I’ll help turn it into something clear, sharp and ready to build."
    />
  );
}
