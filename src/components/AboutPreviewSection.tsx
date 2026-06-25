"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function AboutPreviewSection() {
  return (
    <Section spacing="editorial" borderTop>
      <Container size="lg">
        <Reveal>
          <div
            className="
              grid
              gap-12

              lg:grid-cols-[0.85fr_1.15fr]
              lg:gap-20
              lg:items-start
            "
          >
            {/* LEFT SIDE */}

            <div>
              <AnimatedLabel className="mb-6">
                ABOUT
              </AnimatedLabel>

              <AnimatedHeadline
                className="
                  text-5xl
                  md:text-6xl

                  font-bold
                  leading-[1.02]

                  max-w-3xl
                "
              >
                From print shop floor to digital design systems.
              </AnimatedHeadline>
            </div>

            {/* RIGHT SIDE */}

            <div
              className="
                max-w-3xl

                lg:pt-8
              "
            >
              <div
                className="
                  space-y-6

                  text-xl
                  text-gray-600
                  leading-relaxed
                "
              >
                <p>
                  My career began in commercial printing and reprographics,
                  where I learned the craft behind production, layout and visual
                  communication.
                </p>

                <p>
                  Since then I&apos;ve worked across branding, packaging,
                  publications, websites, exhibitions, video and 3D
                  visualisation, combining technical expertise with creative
                  thinking.
                </p>

                <p>
                  That mix of hands-on production knowledge and digital design
                  experience gives me a practical understanding of how ideas
                  move from concept to finished work.
                </p>
              </div>

              <div className="mt-12">
                <Button
                  href="/about"
                  variant="accent"
                  size="lg"
                  expandOnHover
                  showArrow
                >
                  Read My Story
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}