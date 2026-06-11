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
      <section className="max-w-6xl mx-auto px-8 py-32">
        <div
          className="
            group
            relative
            border-t
            border-b
            border-gray-100
            py-20
          "
        >
          <div
            className="
              absolute
              left-0
              top-20
              h-px
              w-16
              bg-gray-300
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:w-32
              group-hover:bg-black
            "
          />

          <blockquote
            className="
              max-w-5xl
              pt-10
              text-4xl
              md:text-6xl
              font-bold
              leading-tight
              tracking-tight
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:-translate-y-1
              group-hover:text-gray-800
            "
          >
            <span className="text-gray-300">“</span>
            {quote}
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
                group-hover:translate-x-2
                group-hover:text-gray-700
              "
            >
              — {author}
            </p>
          )}
        </div>
      </section>
    </Reveal>
  );
}