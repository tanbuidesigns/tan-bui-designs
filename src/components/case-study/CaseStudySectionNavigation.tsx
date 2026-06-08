"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections: Section[];
};

export default function CaseStudySectionNavigation({
  sections,
}: Props) {
  const [activeSection, setActiveSection] = useState(
    sections[0]?.id ?? ""
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(
        section.id
      );

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin:
            "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) =>
        observer.disconnect()
      );
    };
  }, [sections]);

  return (
    <section
      className="
        sticky
        top-[73px]

        z-30

        bg-white/90
        backdrop-blur-md

        border-y
        border-gray-100

        mb-24
      "
    >
      <div className="max-w-6xl mx-auto px-8">
        <div
          className="
            flex
            gap-3

            overflow-x-auto

            py-4

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
        >
          {sections.map((section) => {
            const isActive =
              activeSection === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`
                  whitespace-nowrap

                  px-4
                  py-2

                  rounded-full

                  text-sm

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-black
                        text-white
                        border
                        border-black
                      `
                      : `
                        border
                        border-gray-200

                        hover:border-black
                        hover:bg-black
                        hover:text-white
                        hover:-translate-y-[2px]
                      `
                  }
                `}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}