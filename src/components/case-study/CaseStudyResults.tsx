"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type Result = {
  value: string;
  label: string;
  description?: string;
};

type CaseStudyResultsProps = {
  results: Result[];
  id?: string;
};

export default function CaseStudyResults({
  results,
  id,
}: CaseStudyResultsProps) {
  return (
    <Reveal>
      <section
        id={id}
        className="max-w-6xl mx-auto px-8 py-24 scroll-mt-32"
      >
        <div className="mb-16">
          <AnimatedLabel>
            RESULTS
          </AnimatedLabel>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {results.map((result) => (
            <div
              key={result.label}
              className="
                group
                transition-all
                duration-300
              "
            >
              <div
                className="
                  text-5xl
                  md:text-6xl
                  font-bold
                  tracking-tight

                  transition-transform
                  duration-300

                  group-hover:scale-105
                "
              >
                {result.value}
              </div>

              <div
                className="
                  w-12
                  h-px
                  bg-black
                  my-6

                  transition-all
                  duration-300

                  group-hover:w-20
                "
              />

              <div className="uppercase tracking-[0.2em] text-xs text-gray-500 mb-4">
                {result.label}
              </div>

              {result.description && (
                <p className="text-gray-600 leading-relaxed">
                  {result.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}