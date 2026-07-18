"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type CaseStudyHeroProps = {
  category: string;
  title: string;
  intro: string;
};

export default function CaseStudyHero({
  category,
  title,
  intro,
}: CaseStudyHeroProps) {
  return (
    <Section spacing="hero">
      <Container size="lg">
        <Reveal>
          <AnimatedLabel className="mb-8">
            {category}
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
            {title}
          </AnimatedHeadline>

          <p
            className="
              mt-12

              max-w-3xl

              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            {intro}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
