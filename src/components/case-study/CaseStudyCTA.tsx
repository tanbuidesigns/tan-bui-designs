"use client";

import { useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const prompts = [
  "Brand system",
  "Packaging rollout",
  "Website design",
  "Campaign assets",
];

export default function CaseStudyCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal>
      <Section spacing="editorial" borderTop>
        <Container size="lg">
          <div
            className="
              group
              relative
              overflow-hidden

              border
              border-gray-100

              px-0
              py-0
            "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              aria-hidden="true"
              className="
                absolute
                left-0
                top-0

                h-[3px]
                w-full
              "
              style={{
                background:
                  "var(--tbds-accent-gradient)",
                transform: isHovered
                  ? "scaleX(1)"
                  : "scaleX(0.18)",
                transformOrigin: "left",
                transition:
                  "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24

                h-64
                w-64

                rounded-full
                bg-gray-100
                blur-3xl

                transition-all
                duration-700

                group-hover:scale-125
                group-hover:bg-gray-200
              "
            />

            <div className="relative px-0 py-0">
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
                  max-w-3xl

                  text-xl
                  text-gray-600
                  leading-relaxed
                "
              >
                <p>
                  Whether you&apos;re planning a brand, publication,
                  website, exhibition, digital product or creative
                  campaign, I&apos;d love to hear about it. Every project
                  starts with a conversation, a challenge and a clear
                  objective.
                </p>
              </div>

              <div
                className="
                  mt-10

                  flex
                  gap-3

                  overflow-x-auto
                  pb-4

                  snap-x
                  snap-mandatory

                  [scrollbar-width:none]
                  [-ms-overflow-style:none]

                  [&::-webkit-scrollbar]:hidden

                  md:flex-wrap
                "
              >
                {prompts.map((prompt) => (
                  <span
                    key={prompt}
                    className="
                      flex
                      min-h-11
                      flex-shrink-0
                      snap-start
                      items-center

                      rounded-full
                      border
                      border-gray-200

                      px-4

                      text-sm
                      text-gray-600

                      transition-all
                      duration-300

                      group-hover:border-gray-300
                      group-hover:text-black
                    "
                  >
                    {prompt}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
                <Button
                  href="/contact"
                  variant="accent"
                  size="lg"
                  expandOnHover
                  showArrow
                >
                  Start a Conversation
                </Button>

                <p className="text-sm text-gray-400">
                  Tell me what you&apos;re building. I&apos;ll help shape
                  the next step.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Reveal>
  );
}