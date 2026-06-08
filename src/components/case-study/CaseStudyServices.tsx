"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyServicesProps = {
  services: string[];
};

export default function CaseStudyServices({
  services,
}: CaseStudyServicesProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-10">
          <AnimatedLabel>
            SERVICES
          </AnimatedLabel>
        </div>

        <div className="flex flex-wrap gap-4">
          {services.map((service) => (
            <div
              key={service}
              className="
                px-5
                py-3

                border
                border-gray-200

                rounded-full

                text-sm

                transition-all
                duration-300

                hover:border-black
                hover:-translate-y-[2px]
              "
            >
              {service}
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}