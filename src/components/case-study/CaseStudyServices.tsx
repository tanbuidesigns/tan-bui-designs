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
      <section
        id="services"
        className="
          max-w-6xl
          mx-auto
          px-8
          py-24
          scroll-mt-32
        "
      >
        <div className="mb-16">
          <AnimatedLabel>
            SERVICES
          </AnimatedLabel>

          <p className="text-gray-600 mt-4 max-w-2xl leading-relaxed">
            A multidisciplinary approach combining strategy,
            design, illustration, digital experiences and
            educational systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {services.map((service) => (
            <div
              key={service}
              className="
                group

                px-5
                py-3

                border
                border-gray-200

                rounded-full

                text-sm
                text-gray-700

                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]

                hover:border-black
                hover:bg-black
                hover:text-white
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