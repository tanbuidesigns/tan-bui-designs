"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

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
    <section className="max-w-6xl mx-auto px-8 py-32">
      <Reveal>
        <AnimatedLabel className="mb-8">
          {category}
        </AnimatedLabel>

        <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          {title}
        </AnimatedHeadline>

        <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
          {intro}
        </p>
      </Reveal>
    </section>
  );
}