"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "introduction", number: "00", title: "Introduction" },
  { id: "philosophy", number: "01", title: "Philosophy" },
  { id: "visual-language", number: "02", title: "Visual Language" },
  { id: "motion", number: "03", title: "Motion System" },
  { id: "responsive", number: "04", title: "Responsive Experience" },
  { id: "components", number: "05", title: "Component Playground" },
  { id: "roadmap", number: "06", title: "Product Roadmap" },
  { id: "accessibility", number: "07", title: "Accessibility" },
  { id: "changelog", number: "08", title: "Changelog" },
];

const componentCards = [
  {
    title: "Navbar",
    status: "Live",
    href: "/design-handbook/components/navbar",
    description:
      "Glass navigation with subtle motion, pastel interaction underline and scroll-aware behaviour.",
  },
  {
    title: "Case Study Gallery",
    status: "Live",
    href: "#",
    description:
      "Flexible image system for mixed ratios, horizontal browsing and lightbox viewing.",
  },
  {
    title: "Quote Block",
    status: "Live",
    href: "#",
    description:
      "Editorial quote treatment with subtle motion and premium spacing.",
  },
  {
    title: "Progress Navigation",
    status: "Live",
    href: "#",
    description:
      "Minimal section tracker designed for long-form case studies.",
  },
{
  title: "Button System",
  status: "Live",
  href: "/design-handbook/components/buttons",
  description:
    "Reusable button styles for primary actions, secondary actions, ghost links, CTAs and disabled states.",
},
  {
    title: "Mobile Navigation",
    status: "Planned",
    href: "#",
    description:
      "A dedicated mobile-first navigation experience rather than a shrunk desktop nav.",
  },
];

const roadmapItems = [
  {
    version: "v1.0",
    title: "Handbook Foundation",
    status: "Complete",
    items: [
      "Design philosophy",
      "Visual language",
      "Motion rules",
      "Responsive principles",
      "Component playground shell",
    ],
  },
  {
    version: "v1.1",
    title: "Component Standards",
    status: "Next",
    items: [
      "Button system",
      "Card system",
      "Gallery standards",
      "CTA standards",
      "Typography rules",
    ],
  },
  {
    version: "v1.2",
    title: "Responsive Experience",
    status: "Planned",
    items: [
      "Tablet layouts",
      "Mobile layouts",
      "Mobile navigation",
      "Touch interaction rules",
      "Reduced motion rules",
    ],
  },
  {
    version: "v2.0",
    title: "Studio System",
    status: "Future",
    items: [
      "Private handbook mode",
      "Component experiments",
      "Design decisions",
      "Search",
      "CMS integration",
    ],
  },
];

export default function DesignHandbookPage() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);

      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin: "-25% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <p className="uppercase tracking-[0.35em] text-sm text-gray-500 mb-8">
          TBDS v1.0
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          The Design Handbook behind Tan Bui Designs.
        </h1>

        <p className="text-xl text-gray-600 mt-10 max-w-3xl leading-relaxed">
          A living design system documenting the philosophy, visual language,
          motion rules, responsive thinking and component standards behind every
          digital experience.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="grid lg:grid-cols-[260px_1fr] gap-16 border-t border-gray-100 pt-16">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="uppercase tracking-[0.25em] text-xs text-gray-400 mb-8">
                Handbook
              </p>

              <nav className="space-y-3">
                {sections.map((section) => {
                  const active = activeSection === section.id;

                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`
                        group flex items-center gap-4 text-sm transition-all duration-300
                        ${
                          active
                            ? "text-black"
                            : "text-gray-400 hover:text-black"
                        }
                      `}
                    >
                      <span
                        className={`
                          h-2 w-2 rounded-full transition-all duration-300
                          ${
                            active
                              ? "bg-black scale-125"
                              : "bg-gray-300 group-hover:bg-black"
                          }
                        `}
                      />

                      <span className="font-mono text-xs">
                        {section.number}
                      </span>

                      <span>{section.title}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="space-y-32">
            <HandbookSection
              id="introduction"
              eyebrow="00 Introduction"
              title="A system before a website."
            >
              <p>
                Tan Bui Designs is not just a portfolio. It is a design platform
                built around a reusable system of principles, behaviours and
                components.
              </p>

              <p>
                The handbook exists so every future page, project and case study
                follows the same design logic rather than being reinvented from
                scratch.
              </p>
            </HandbookSection>

            <HandbookSection
              id="philosophy"
              eyebrow="01 Philosophy"
              title="Less decoration. More intention."
            >
              <p>
                The work is always the hero. The interface should support the
                work, not compete with it.
              </p>

              <p>
                Every element must earn its place. Whitespace, motion, colour
                and typography should all serve the story.
              </p>

              <PrincipleGrid
                items={[
                  "Content first",
                  "Editorial rhythm",
                  "Crafted motion",
                  "Colour is earned",
                ]}
              />
            </HandbookSection>

            <HandbookSection
              id="visual-language"
              eyebrow="02 Visual Language"
              title="Mostly monochrome. Carefully accented."
            >
              <p>
                The visual system is intentionally restrained: black, white and
                grey form the foundation. Pastel gradient accents are reserved
                for interaction, progress, focus and selection.
              </p>

              <div className="mt-10 h-2 w-full bg-[linear-gradient(to_right,rgb(199,210,254),rgb(254,202,202),rgb(254,249,195))]" />
            </HandbookSection>

            <HandbookSection
              id="motion"
              eyebrow="03 Motion System"
              title="Motion should explain, not entertain."
            >
              <p>
                Motion is used to clarify hierarchy, guide attention and create
                a sense of craft. It should never feel random, noisy or
                decorative.
              </p>

              <PrincipleGrid
                items={[
                  "Reveal",
                  "Expand",
                  "Flow",
                  "Focus",
                  "Float",
                  "Transition",
                ]}
              />
            </HandbookSection>

            <HandbookSection
              id="responsive"
              eyebrow="04 Responsive Experience"
              title="Desktop, tablet and mobile are separate experiences."
            >
              <p>
                TBDS does not treat responsive design as shrinking desktop
                layouts. Each device size requires its own hierarchy, spacing,
                navigation and interaction model.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                <DeviceCard
                  title="Desktop"
                  text="Hover, precision, exploration."
                />
                <DeviceCard title="Tablet" text="Touch, comfort, browsing." />
                <DeviceCard
                  title="Mobile"
                  text="Thumb-first, fast, vertical."
                />
              </div>
            </HandbookSection>

            <HandbookSection
              id="components"
              eyebrow="05 Component Playground"
              title="Reusable components are designed before they are coded."
            >
              <p>
                The playground is where TBDS components are defined, tested and
                refined before they are used across the public website.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {componentCards.map((component) => (
                  <ComponentCard
                    key={component.title}
                    title={component.title}
                    status={component.status}
                    href={component.href}
                    description={component.description}
                  />
                ))}
              </div>
            </HandbookSection>

            <HandbookSection
              id="roadmap"
              eyebrow="06 Product Roadmap"
              title="The system evolves like a product."
            >
              <p>
                TBDS is versioned. Every major improvement to the design
                language, responsive system or component library should be
                recorded and planned.
              </p>

              <div className="space-y-6 mt-10">
                {roadmapItems.map((item) => (
                  <RoadmapCard
                    key={item.version}
                    version={item.version}
                    title={item.title}
                    status={item.status}
                    items={item.items}
                  />
                ))}
              </div>
            </HandbookSection>

            <HandbookSection
              id="accessibility"
              eyebrow="07 Accessibility"
              title="Premium means usable."
            >
              <p>
                A crafted experience must remain readable, navigable and usable.
                Motion, hover states and visual effects should never block
                clarity or access.
              </p>
            </HandbookSection>

            <HandbookSection
              id="changelog"
              eyebrow="08 Changelog"
              title="Every system needs memory."
            >
              <p>
                TBDS will be updated as new case studies, components and
                responsive behaviours are introduced.
              </p>

              <div className="mt-10 border border-gray-200 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                  v1.0
                </p>

                <p className="text-gray-600">
                  Initial handbook shell created. Component Playground and
                  Product Roadmap added as the foundation for future design
                  system development.
                </p>
              </div>
            </HandbookSection>
          </div>
        </div>
      </section>
    </main>
  );
}

function HandbookSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
        {eyebrow}
      </p>

      <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
        {title}
      </h2>

      <div className="mt-10 space-y-6 text-xl text-gray-600 leading-relaxed max-w-3xl">
        {children}
      </div>
    </section>
  );
}

function PrincipleGrid({ items }: { items: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mt-10">
      {items.map((item) => (
        <div
          key={item}
          className="
            group border border-gray-200 p-5 transition-all duration-300
            hover:border-black
          "
        >
          <p className="text-black font-medium">{item}</p>

          <div className="mt-4 h-px w-10 bg-[linear-gradient(to_right,rgb(199,210,254),rgb(254,202,202),rgb(254,249,195))] transition-all duration-500 group-hover:w-20" />
        </div>
      ))}
    </div>
  );
}

function DeviceCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function ComponentCard({
  title,
  status,
  href,
  description,
}: {
  title: string;
  status: string;
  href: string;
  description: string;
}) {
  const isClickable = href !== "#";

  const content = (
    <div
      className={`
        group border border-gray-200 p-6 transition-all duration-300
        ${
          isClickable
            ? "hover:border-black hover:-translate-y-1 cursor-pointer"
            : "opacity-60 cursor-not-allowed"
        }
      `}
    >
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-black">{title}</h3>

        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-500">
          {status}
        </span>
      </div>

      <p className="text-base text-gray-600 leading-relaxed">
        {description}
      </p>

      <div className="mt-8 flex items-center justify-between gap-6">
        <div
          className={`
            h-px w-12 bg-[linear-gradient(to_right,rgb(199,210,254),rgb(254,202,202),rgb(254,249,195))]
            transition-all duration-500
            ${isClickable ? "group-hover:w-24" : ""}
          `}
        />

        <span className="text-sm text-gray-500">
          {isClickable ? "View component →" : "Coming soon"}
        </span>
      </div>
    </div>
  );

  if (!isClickable) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

function RoadmapCard({
  version,
  title,
  status,
  items,
}: {
  version: string;
  title: string;
  status: string;
  items: string[];
}) {
  return (
    <div className="border border-gray-200 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="font-mono text-sm text-gray-400 mb-2">{version}</p>
          <h3 className="text-2xl font-semibold text-black">{title}</h3>
        </div>

        <span className="rounded-full border border-gray-200 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-500">
          {status}
        </span>
      </div>

      <ul className="space-y-3 text-base text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.65em] h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}