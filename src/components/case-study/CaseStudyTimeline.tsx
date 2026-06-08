"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

type CaseStudyTimelineProps = {
  items: TimelineItem[];
};

export default function CaseStudyTimeline({
  items,
}: CaseStudyTimelineProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-12">
          <AnimatedLabel>
            TIMELINE
          </AnimatedLabel>
        </div>

        <div className="border-l border-gray-200 ml-4">
          {items.map((item) => (
            <div
              key={`${item.year}-${item.title}`}
              className="relative pl-12 pb-16 last:pb-0"
            >
              <div
                className="
                  absolute
                  left-0
                  top-2

                  w-3
                  h-3

                  bg-black
                  rounded-full

                  -translate-x-[7px]
                "
              />

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                {item.year}
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}