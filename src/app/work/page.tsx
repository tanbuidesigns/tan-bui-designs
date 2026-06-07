"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

export default function WorkPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <Reveal>
          <AnimatedLabel className="mb-8">
            WORK
          </AnimatedLabel>

          <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
            Selected projects across print, digital and physical experiences.
          </AnimatedHeadline>

          <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
            Over the last fifteen years I've worked across branding,
            packaging, publications, websites, exhibitions and
            digital experiences.
          </p>

          <p className="text-xl text-gray-600 mt-6 max-w-3xl leading-relaxed">
            Each project required a different solution, but the
            objective remained the same: transform complex ideas
            into clear visual experiences that people can understand,
            engage with and remember.
          </p>
        </Reveal>
      </section>

      <FeaturedWorkSection showHeading={false} />
    </main>
  );
}