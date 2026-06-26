"use client";

import { useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedStroke from "@/components/ui/AnimatedStroke";

type CaseStudyQuoteProps = {
  quote: string;
  author?: string;
};

export default function CaseStudyQuote({
  quote,
  author,
}: CaseStudyQuoteProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-32">
        <div
          className="
            border-t
            border-b
            border-gray-100
            py-20
          "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatedStroke
            active={isHovered}
            className="mb-14"
          />

          <blockquote
            className="
              max-w-5xl

              text-4xl
              md:text-6xl
              font-bold
              leading-tight
              tracking-tight

              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
            "
            style={{
              transform: isHovered
                ? "translateY(-4px)"
                : "translateY(0)",
            }}
          >
            <span className="text-gray-300">“</span>

            <AnimatedHeadline className="inline">
              {quote}
            </AnimatedHeadline>

            <span className="text-gray-300">”</span>
          </blockquote>

          {author && (
            <p
              className="
                mt-10
                text-gray-500
                text-lg

                transition-all
                duration-500
              "
              style={{
                transform: isHovered
                  ? "translateX(8px)"
                  : "translateX(0)",
                color: isHovered ? "#374151" : undefined,
              }}
            >
              {author}
            </p>
          )}

          <AnimatedStroke
            active={isHovered}
            align="right"
            className="mt-14"
          />
        </div>
      </section>
    </Reveal>
  );
}