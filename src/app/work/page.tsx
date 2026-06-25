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
              Selected projects across print, digital and physical experiences.
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
                Over the last fifteen years I&apos;ve worked across branding,
                packaging, publications, websites, exhibitions and digital
                experiences.
              </p>

              <p
                className="
                  text-xl
                  text-gray-600
                  leading-relaxed
                "
              >
                Each project needed a different solution, but the objective
                stayed the same: turn complex ideas into clear visual
                experiences that people can understand, use and remember.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FeaturedWorkSection showHeading={false} />
    </main>
  );
}