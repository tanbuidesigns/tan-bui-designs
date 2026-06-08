"use client";

import Reveal from "@/components/Reveal";

type CaseStudyOverviewProps = {
  client: string;
  industry: string;
  timeline: string;
  role: string[];
};

export default function CaseStudyOverview({
  client,
  industry,
  timeline,
  role,
}: CaseStudyOverviewProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Client
            </p>

            <p className="text-xl">
              {client}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Industry
            </p>

            <p className="text-xl">
              {industry}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Timeline
            </p>

            <p className="text-xl">
              {timeline}
            </p>
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
              Role
            </p>

            <div className="space-y-1">
              {role.map((item) => (
                <p
                  key={item}
                  className="text-xl"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}