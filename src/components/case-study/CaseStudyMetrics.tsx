"use client";

import Reveal from "@/components/Reveal";

type Metric = {
  value: string;
  label: string;
};

type CaseStudyMetricsProps = {
  metrics: Metric[];
};

export default function CaseStudyMetrics({
  metrics,
}: CaseStudyMetricsProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <div className="grid md:grid-cols-3 gap-12">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group"
            >
              <div className="text-6xl md:text-7xl font-bold tracking-tight leading-none transition-transform duration-300 group-hover:scale-105">
                {metric.value}
              </div>

              <div className="w-12 h-px bg-black my-6"></div>

              <div className="uppercase tracking-[0.25em] text-xs text-gray-500">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}