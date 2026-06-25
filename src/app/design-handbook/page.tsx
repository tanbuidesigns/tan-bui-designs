"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const sections = [
  { id: "introduction", number: "00", title: "Introduction" },
  { id: "philosophy", number: "01", title: "Philosophy" },
  { id: "visual-language", number: "02", title: "Visual Language" },
  { id: "design-tokens", number: "03", title: "Design Tokens" },
  { id: "responsive-system", number: "04", title: "Responsive System" },
  { id: "motion", number: "05", title: "Motion System" },
  { id: "components", number: "06", title: "Component Playground" },
  { id: "roadmap", number: "07", title: "Product Roadmap" },
  { id: "accessibility", number: "08", title: "Accessibility" },
  { id: "changelog", number: "09", title: "Changelog" },
];

const componentCards = [
  {
    title: "Navbar",
    status: "Live",
    href: "/design-handbook/components/navbar",
    description:
      "Responsive glass navigation with compact menu trigger, scroll-aware behaviour and pastel interaction states.",
  },
  {
    title: "Footer",
    status: "Live",
    href: "/design-handbook/components/footer",
    description:
      "Compact responsive footer with TBDS context, plain text navigation and one accent Design Handbook action.",
  },
  {
    title: "Button System",
    status: "Live",
    href: "/design-handbook/components/buttons",
    description:
      "Reusable button styles for primary actions, secondary actions, ghost links, CTAs, arrow motion and disabled states.",
  },
  {
    title: "Layout Primitives",
    status: "Live",
    href: "/design-handbook/components/layout-primitives",
    description:
      "Responsive-aware primitives for containers, sections and official TBDS accent lines.",
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
    title: "Style Foundation",
    status: "Complete",
    items: [
      "Global CSS simplified",
      "Design tokens added",
      "Animations separated",
      "Utilities separated",
      "Button system connected to tokens",
    ],
  },
  {
    version: "v1.2",
    title: "Responsive Foundation",
    status: "Complete",
    items: [
      "Experience modes defined",
      "Responsive padding tokens added",
      "Responsive-aware Container created",
      "Responsive-aware Section created",
      "GradientLine primitive created",
    ],
  },
  {
    version: "v1.3",
    title: "Component Standards",
    status: "Next",
    items: [
      "Card system",
      "Gallery standards",
      "CTA standards",
      "Typography rules",
      "Reusable layout migration",
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

const tokenGroups = [
  {
    title: "Colour",
    description:
      "The core palette is intentionally restrained: white, black and greys form the foundation.",
    tokens: [
      "--tbds-color-background",
      "--tbds-color-foreground",
      "--tbds-color-gray-100",
      "--tbds-color-gray-500",
      "--tbds-color-gray-700",
    ],
  },
  {
    title: "Accent",
    description:
      "The pastel gradient is reserved for interaction, progress, focus and selected states.",
    tokens: [
      "--tbds-accent-indigo",
      "--tbds-accent-rose",
      "--tbds-accent-yellow",
      "--tbds-accent-gradient",
    ],
  },
  {
    title: "Motion",
    description:
      "Motion uses one consistent easing curve so the interface feels calm and connected.",
    tokens: [
      "--tbds-ease",
      "--tbds-duration-fast",
      "--tbds-duration-base",
      "--tbds-duration-slow",
      "--tbds-duration-reveal",
    ],
  },
  {
    title: "Layout",
    description:
      "Layout tokens keep spacing, padding and container behaviour consistent across pages.",
    tokens: [
      "--tbds-page-padding-compact",
      "--tbds-page-padding-comfortable",
      "--tbds-page-padding-expanded",
      "--tbds-container-lg",
      "--tbds-container-xl",
    ],
  },
];

const responsiveModes = [
  {
    mode: "Compact",
    range: "320px+",
    purpose: "Small phones and narrow screens.",
    rules: [
      "Single-column layouts",
      "Large tap targets",
      "No hover dependency",
      "Reduced horizontal spacing",
      "Buttons may become full width",
    ],
  },
  {
    mode: "Comfortable",
    range: "640px+",
    purpose: "Large phones and small tablets.",
    rules: [
      "Touch-first layout",
      "More breathing room",
      "Selective two-column content",
      "Swipe-first galleries",
      "Navigation still needs touch thinking",
    ],
  },
  {
    mode: "Expanded",
    range: "1024px+",
    purpose: "Tablets, laptops and desktop entry.",
    rules: [
      "Side navigation can appear",
      "Long-form reading layouts improve",
      "Grid systems can expand",
      "Hover can support interaction",
      "Case study navigation can become visible",
    ],
  },
  {
    mode: "Immersive",
    range: "1440px+",
    purpose: "Large desktop and editorial layouts.",
    rules: [
      "More whitespace",
      "More atmospheric motion",
      "Horizontal browsing can be richer",
      "Floating navigation can work",
      "Hero sections can feel more cinematic",
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
      <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <p className="uppercase tracking-[0.35em] text-sm text-gray-500 mb-8">
          TBDS v1.2
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          The Design Handbook behind Tan Bui Designs.
        </h1>

        <p className="text-xl text-gray-600 mt-10 max-w-3xl leading-relaxed">
          A living design system documenting the philosophy, visual language,
          responsive thinking, motion rules and component standards behind every
          digital experience.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pb-32">
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

              <div className="mt-10 h-2 w-full bg-[image:var(--tbds-accent-gradient)]" />
            </HandbookSection>

            <HandbookSection
              id="design-tokens"
              eyebrow="03 Design Tokens"
              title="Design decisions should live in one place."
            >
              <p>
                TBDS uses design tokens to keep colour, motion, layout and
                interaction values consistent. The goal is not to create a huge
                enterprise system. The goal is to stop repeating the same design
                decisions across the project.
              </p>

              <p>
                Tokens live in{" "}
                <code className="text-black">src/styles/tokens.css</code>.
                Animations live in{" "}
                <code className="text-black">src/styles/animations.css</code>.
                Small reusable utilities live in{" "}
                <code className="text-black">src/styles/utilities.css</code>.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {tokenGroups.map((group) => (
                  <TokenGroupCard
                    key={group.title}
                    title={group.title}
                    description={group.description}
                    tokens={group.tokens}
                  />
                ))}
              </div>
            </HandbookSection>

            <HandbookSection
              id="responsive-system"
              eyebrow="04 Responsive System"
              title="Responsive design is not shrinking. It is redesigning."
            >
              <p>
                TBDS uses experience modes instead of thinking only in
                breakpoints. Each mode has its own behaviour, spacing,
                interaction model and content rhythm.
              </p>

              <p>
                Every page and component should explain how it behaves across
                Compact, Comfortable, Expanded and Immersive experiences.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                {responsiveModes.map((mode) => (
                  <ResponsiveModeCard
                    key={mode.mode}
                    mode={mode.mode}
                    range={mode.range}
                    purpose={mode.purpose}
                    rules={mode.rules}
                  />
                ))}
              </div>
            </HandbookSection>

            <HandbookSection
              id="motion"
              eyebrow="05 Motion System"
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
              id="components"
              eyebrow="06 Component Playground"
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
              eyebrow="07 Product Roadmap"
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
              eyebrow="08 Accessibility"
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
              eyebrow="09 Changelog"
              title="Every system needs memory."
            >
              <p>
                TBDS will be updated as new case studies, components and
                responsive behaviours are introduced.
              </p>

              <div className="space-y-6 mt-10">
                <ChangelogCard
                  version="v1.2"
                  title="Responsive foundation added"
                  text="Experience modes were defined and responsive-aware layout primitives were introduced for Container, Section and GradientLine."
                />

                <ChangelogCard
                  version="v1.1"
                  title="Style foundation added"
                  text="Global CSS was split into tokens, animations and utilities. The Button component now uses the shared accent gradient token."
                />

                <ChangelogCard
                  version="v1.0"
                  title="Handbook foundation created"
                  text="Initial handbook shell created. Component Playground and Product Roadmap added as the foundation for future design system development."
                />
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
  children: ReactNode;
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

          <div className="mt-4 h-px w-10 bg-[image:var(--tbds-accent-gradient)] transition-all duration-500 group-hover:w-20" />
        </div>
      ))}
    </div>
  );
}

function TokenGroupCard({
  title,
  description,
  tokens,
}: {
  title: string;
  description: string;
  tokens: string[];
}) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="text-2xl font-semibold text-black mb-4">
        {title}
      </h3>

      <p className="text-base text-gray-600 leading-relaxed mb-6">
        {description}
      </p>

      <ul className="space-y-2">
        {tokens.map((token) => (
          <li key={token} className="font-mono text-sm text-gray-500">
            {token}
          </li>
        ))}
      </ul>

      <div className="mt-8 h-px w-12 bg-[image:var(--tbds-accent-gradient)]" />
    </div>
  );
}

function ResponsiveModeCard({
  mode,
  range,
  purpose,
  rules,
}: {
  mode: string;
  range: string;
  purpose: string;
  rules: string[];
}) {
  return (
    <div className="border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="font-mono text-sm text-gray-400 mb-2">
            {range}
          </p>

          <h3 className="text-2xl font-semibold text-black">
            {mode}
          </h3>
        </div>

        <span className="h-3 w-3 rounded-full bg-[image:var(--tbds-accent-gradient)]" />
      </div>

      <p className="text-base text-gray-600 leading-relaxed mb-6">
        {purpose}
      </p>

      <ul className="space-y-3">
        {rules.map((rule) => (
          <li key={rule} className="flex gap-3 text-sm text-gray-600">
            <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
            <span>{rule}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 h-px w-12 bg-[image:var(--tbds-accent-gradient)]" />
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
            h-px w-12 bg-[image:var(--tbds-accent-gradient)]
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

function ChangelogCard({
  version,
  title,
  text,
}: {
  version: string;
  title: string;
  text: string;
}) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
        {version}
      </p>

      <h3 className="text-2xl font-semibold text-black mb-4">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}