"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import ArtworkCTA from "@/components/ArtworkCTA";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function WorkPage() {
  return (
    <main className="bg-white text-black">
      <Section spacing="none" className="pb-36 pt-14 sm:pb-48 sm:pt-16 lg:pb-60 lg:pt-20">
        <Container size="lg">
          <Reveal>
            <AnimatedLabel className="mb-8">
              FEATURED WORK
            </AnimatedLabel>

            <AnimatedHeadline
              as="h1"
              className="
                max-w-5xl

                text-5xl
                md:text-7xl

                font-bold
                leading-[0.95]
              "
            >
              Case studies built around clear ideas and crafted execution
            </AnimatedHeadline>

            <p
              className="
                mt-12
                max-w-5xl

                text-xl
                md:text-2xl

                text-gray-600
                leading-relaxed
              "
            >
              A focused selection of completed projects across brand systems,
              publication design, packaging, digital experiences and visual
              storytelling. Each case study shows how I turn complex briefs into
              clear, usable and memorable design work.
            </p>
          </Reveal>
        </Container>
      </Section>

      <FeaturedWorkSection showHeading={false} />
      <ArtworkCTA
        label="Start a project"
        heading="Ready to build something meaningful?"
        headingChunks={["Ready to build", "something meaningful?"]}
        body="Whether you’re planning a brand, publication, website, exhibition, digital product or creative campaign, I’d love to hear about it. Every project starts with a conversation, a challenge and a clear objective."
        buttonLabel="Start a Conversation"
      />
    </main>
  );
}
