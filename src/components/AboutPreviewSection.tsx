"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

export default function AboutPreviewSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
      <Reveal>
        <AnimatedLabel className="mb-6">
          ABOUT
        </AnimatedLabel>

        <AnimatedHeadline className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl mb-10">
          From print shop floor to multidisciplinary design consultant.
        </AnimatedHeadline>

        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed mb-12">
        My career began in commercial printing and reprographics, where I learned the craft behind production, layout and visual communication. Since then I've worked across branding, packaging, publications, websites, exhibitions, video and 3D visualisation, combining technical expertise with creative thinking. Being self-taught has allowed me to build a broad perspective across multiple disciplines, but the goal has always stayed the same: creating work that is clear, purposeful and useful.
        </p>

        <Link
          href="/about"
          className="group inline-flex items-center gap-3 text-lg font-medium"
        >
          <span>Read My Story</span>

          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}