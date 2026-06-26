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
    const overview =
      document.getElementById("overview");

    const services =
      document.getElementById("services");

    if (!overview || !services) return;

    const overviewObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            setShowLabels(true);

            setTimeout(() => {
              setShowLabels(false);
            }, 3000);
          }
        },
        {
          rootMargin:
            "-15% 0px -70% 0px",
          threshold: 0,
        }
      );

    const servicesObserver =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(false);
          }
        },
        {
          rootMargin:
            "-20% 0px -50% 0px",
          threshold: 0,
        }
      );

    overviewObserver.observe(overview);
    servicesObserver.observe(services);

    return () => {
      overviewObserver.disconnect();
      servicesObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hoveredSection) return;

    setShowLabels(true);

    const timer = setTimeout(() => {
      setShowLabels(false);
      setHoveredSection(null);
    }, 5000);

    return () =>
      clearTimeout(timer);
  }, [hoveredSection]);

  const scrollToSection = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();

    const element =
      document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <aside
      className={`
        fixed
        right-8
        top-1/2
        -translate-y-1/2

        z-40

        hidden
        lg:flex

        flex-col
        gap-5

        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          visible
            ? `
              opacity-100
              translate-x-0
              scale-100
              pointer-events-auto
            `
            : `
              opacity-0
              translate-x-10
              scale-95
              pointer-events-none
            `
        }
      `}
    >
      {sections.map((section) => {
        const active =
          activeSection === section.id;

        const expanded =
          showLabels ||
          hoveredSection === section.id;

        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(event) =>
              scrollToSection(
                event,
                section.id
              )
            }
            onMouseEnter={() =>
              setHoveredSection(section.id)
            }
            className="
              relative

              flex
              items-center
              justify-end

              min-h-[20px]

              group
            "
            aria-label={section.label}
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
                      scale-110
                      shadow-[0_0_18px_rgba(99,102,241,0.45)]
                    `
                    : `
                      w-2
                      h-2
                      bg-gray-300

                      group-hover:scale-125
                    `
                }
              `}
              style={
                active
                  ? {
                      backgroundImage:
                        "var(--tbds-accent-gradient)",
                    }
                  : undefined
              }
            />

            <div
              className={`
                absolute
                right-8

                whitespace-nowrap

                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]

                ${
                  expanded
                    ? `
                      opacity-100
                      translate-x-0
                    `
                    : `
                      opacity-0
                      translate-x-4
                      pointer-events-none
                    `
                }
              `}
            >
              <div
                className={`
                  px-4
                  py-2

                  rounded-full

                  backdrop-blur-xl

                  border

                  shadow-lg

                  text-[11px]
                  uppercase
                  tracking-[0.18em]

                  transition-all
                  duration-300

                  ${
                    active
  ? `
    text-black
    border-transparent
    shadow-xl
  `
                      : `
                        bg-white/70
                        text-black
                        border-white/60

                        group-hover:bg-white
                        group-hover:border-gray-300
                        group-hover:shadow-xl
                        group-hover:-translate-y-[1px]
                      `
                  }
                `}
                style={
                  active
                    ? {
                        backgroundImage:
                          "var(--tbds-accent-gradient)",
                      }
                    : undefined
                }
              >
                {section.label}
              </div>
            </div>
          </a>
        );
      })}
    </aside>
  );
}