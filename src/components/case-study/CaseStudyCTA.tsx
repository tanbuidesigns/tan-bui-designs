"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function CaseStudyCTA() {
  return (
    <Reveal>
      <Section spacing="editorial" borderTop>
        <Container size="lg">
          <AnimatedLabel className="mb-8">
            START A PROJECT
          </AnimatedLabel>

          <AnimatedHeadline
            className="
              max-w-5xl

              text-5xl
              md:text-7xl

              font-bold
              leading-[0.95]
            "
          >
            Ready to build something meaningful?
          </AnimatedHeadline>

          <div
            className="
              mt-12

              grid
              gap-6

              lg:grid-cols-[1fr_1fr]
              lg:gap-12

              max-w-5xl
            "
          >
            <p
              className="
                text-xl
                text-gray-600
                leading-relaxed
              "
            >
              Whether you&apos;re planning a brand, publication, website,
              exhibition, digital product or creative campaign, I&apos;d love
              to hear about it.
            </p>

            <p
              className="
                text-xl
                text-gray-600
                leading-relaxed
              "
            >
              Every project starts with a conversation, a challenge and a clear
              objective.
            </p>
          </div>

          <div className="mt-12">
            <Button
              href="/contact"
              variant="accent"
              size="lg"
              expandOnHover
              showArrow
            >
              Start a Conversation
            </Button>
          </div>
        </Container>
      </Section>
    </Reveal>
  );
}