"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function WorkPage() {
  return (
    <main className="bg-white text-black">
      <Section spacing="hero">
        <Container size="lg">
          <Reveal>
            <AnimatedLabel className="mb-8">
              WORK
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
              Selected case studies across brand, print, packaging and digital.
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
                A focused selection of real projects showing how I think
                through visual systems, production details and the final user
                experience.
              </p>

              <p
                className="
                  text-xl
                  text-gray-600
                  leading-relaxed
                "
              >
                For now, I&apos;m keeping this section tight with completed
                case studies only. More work will be added once each project has
                a proper page and story behind it.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FeaturedWorkSection showHeading={false} />
    </main>
  );
}