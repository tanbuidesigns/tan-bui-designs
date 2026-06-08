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
};

export default function CaseStudyResults({
  results,
}: CaseStudyResultsProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-12">
          <AnimatedLabel>
            RESULTS
          </AnimatedLabel>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {results.map((result) => (
            <div
              key={result.label}
              className="group"
            >
              <div className="text-5xl md:text-6xl font-bold tracking-tight">
                {result.value}
              </div>

              <div className="w-12 h-px bg-black my-6"></div>

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