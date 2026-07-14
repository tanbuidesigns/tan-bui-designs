"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function WorkPage() {
  return (
    <main className="bg-white text-black">
      <Section spacing="hero">
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
      <CaseStudyCTA />
    </main>
  );
}
