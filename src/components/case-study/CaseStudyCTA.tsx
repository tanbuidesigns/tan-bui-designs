"use client";

import Link from "next/link";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

export default function CaseStudyCTA() {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
        <AnimatedLabel className="mb-8">
          START A PROJECT
        </AnimatedLabel>

        <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          Ready to build something meaningful?
        </AnimatedHeadline>

        <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
          Whether you're planning a brand, publication,
          website, exhibition, digital product or creative
          campaign, I'd love to hear about it.
        </p>

        <p className="text-xl text-gray-600 mt-6 max-w-3xl leading-relaxed">
          Every project starts with a conversation,
          a challenge and a clear objective.
        </p>

        <Link
          href="/contact"
          className="
            group
            inline-flex
            items-center
            gap-4

            mt-16

            text-lg
            font-medium

            transition-all
            duration-300
          "
        >
          <span>
            Start a Conversation
          </span>

          <span
            className="
              transition-transform
              duration-300

              group-hover:translate-x-2
            "
          >
            →
          </span>
        </Link>

        <div
          className="
            mt-4

            w-24
            h-px

            bg-black

            transition-all
            duration-500

            group-hover:w-40
          "
        />
      </section>
    </Reveal>
  );
}