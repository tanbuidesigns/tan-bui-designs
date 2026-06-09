"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

type Props = {
  sections: Section[];
};

export default function CaseStudyProgressNav({
  sections,
}: Props) {
  const [activeSection, setActiveSection] = useState(
    sections[0]?.id ?? ""
  );

  const [visible, setVisible] = useState(false);

  const [hoveredSection, setHoveredSection] =
    useState<string | null>(null);

  const [showLabels, setShowLabels] =
    useState(false);

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
            "-20% 0px -65% 0px",
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

  useEffect(() => {
    const handleScroll = () => {
      const services =
        document.getElementById("services");

      const servicesTop =
        services?.getBoundingClientRect().top ??
        Infinity;

      const shouldHide =
        servicesTop < window.innerHeight * 0.6;

      setVisible(
        window.scrollY > 1200 &&
          !shouldHide
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    if (!showLabels) return;

    const timer = setTimeout(() => {
      setShowLabels(false);
      setHoveredSection(null);
    }, 5000);

    return () =>
      clearTimeout(timer);
  }, [showLabels]);

  if (!visible) return null;

  return (
    <aside
      className="
        fixed

        right-6
        top-1/2
        -translate-y-1/2

        z-40

        hidden
        lg:flex

        flex-col
        gap-4
      "
    >
      {sections.map((section) => {
        const active =
          activeSection === section.id;

        const expanded =
          hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-end"
            onMouseEnter={() => {
              setHoveredSection(section.id);
              setShowLabels(true);
            }}
          >
            <a
              href={`#${section.id}`}
              className="
                relative
                flex
                items-center
                justify-center

                w-4
                h-4
              "
            >
              <span
                className={`
                  rounded-full

                  transition-all
                  duration-300

                  ${
                    active
                      ? `
                        w-3
                        h-3
                        bg-black
                      `
                      : `
                        w-2
                        h-2
                        bg-gray-300
                        hover:bg-gray-600
                      `
                  }
                `}
              />
            </a>

            <div
              className={`
                absolute
                right-8

                whitespace-nowrap

                transition-all
                duration-300

                ${
                  expanded &&
                  showLabels
                    ? `
                      opacity-100
                      translate-x-0
                    `
                    : `
                      opacity-0
                      translate-x-3
                      pointer-events-none
                    `
                }
              `}
            >
              <div
                className="
                  px-4
                  py-2

                  rounded-full

                  bg-white/70
                  backdrop-blur-md

                  border
                  border-white/50

                  shadow-lg

                  text-xs
                  uppercase
                  tracking-[0.18em]
                "
              >
                {section.label}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}