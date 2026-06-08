"use client";

import Reveal from "@/components/Reveal";

type CaseStudyQuoteProps = {
  quote: string;
  author?: string;
};

export default function CaseStudyQuote({
  quote,
  author,
}: CaseStudyQuoteProps) {
  return (
    <Reveal>
      <section className="max-w-5xl mx-auto px-8 py-24">
        <blockquote
          className="
            text-4xl
            md:text-6xl

            font-bold

            leading-tight
            tracking-tight
          "
        >
          “{quote}”
        </blockquote>

        {author && (
          <p className="mt-10 text-gray-500 text-lg">
            — {author}
          </p>
        )}
      </section>
    </Reveal>
  );
}