"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import CaseStudyImageCarousel, {
  CaseStudyCarouselItem,
} from "@/components/case-study/CaseStudyImageCarousel";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";

import { projects } from "@/data/projects";

const currentProjectSlug = "urban-eat";

const progressSections = [
  { id: "overview", label: "Overview" },
  { id: "brand-craft", label: "Brand Craft" },
  { id: "award", label: "Awards" },
  { id: "packaging-system", label: "Packaging" },
  { id: "roots", label: "Sub-Brand" },
  { id: "pitch", label: "Pitching" },
];

const overviewItems = [
  {
    label: "Client",
    value: "Urban Eat",
  },
  {
    label: "Industry",
    value: "FMCG / Food-to-go",
  },
  {
    label: "Role",
    value: "Senior Multimedia Designer",
  },
  {
    label: "Focus",
    value:
      "Packaging, POS, campaigns, pitch decks and retail activation",
  },
];

const serviceTags = [
  "FMCG Packaging",
  "Retail POS",
  "Brand Activation",
  "Artwork Production",
  "Food Photography",
  "Presentation Design",
  "Website Design",
  "Email Design",
  "Brochures",
  "Marketing Assets",
  "Sub-brand Design",
];

const brandCraftTags = [
  "Brand craft",
  "Handmade graphics",
  "Food prints",
  "Visual system",
  "Illustration",
  "Campaign visuals",
  "Retail POS",
  "Brand activation",
];

const awardTags = [
  "Award-winning work",
  "Marketing campaign",
  "FMCG brand activation",
  "Retail campaign",
  "POS design",
  "Presentation design",
  "Brand rollout",
];

const packagingTags = [
  "Packaging",
  "Artwork production",
  "Brand rollout",
  "POS design",
  "Retail activation",
  "Food photography",
  "Print artwork",
  "Illustration",
  "Campaign assets",
  "Range design",
];

const rootsTags = [
  "Sub-brand design",
  "Packaging",
  "Natural tone",
  "Illustration",
  "FMCG design",
  "Brand extension",
  "Retail range",
];

const pitchTags = [
  "Pitch design",
  "Presentation design",
  "Commercial storytelling",
  "Illustration",
  "Packaging concepts",
  "Food-to-go strategy",
  "Retail visuals",
  "Brand activation",
];

const brandCraftItems: CaseStudyCarouselItem[] = Array.from(
  { length: 24 },
  (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0");

    return {
      label: `brand-craft-${imageNumber}.webp`,
      src: `/projects/urban-eat/brand-craft/brand-craft-${imageNumber}.webp`,
      alt: `Urban Eat handmade food-print brand craft example ${index + 1}`,
      caption: `Urban Eat brand craft example ${index + 1}`,
    };
  }
);

const awardItems: CaseStudyCarouselItem[] = Array.from(
  { length: 7 },
  (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0");

    return {
      label: `award-${imageNumber}.webp`,
      src: `/projects/urban-eat/award/award-${imageNumber}.webp`,
      alt: `Urban Eat award-winning campaign visual ${index + 1}`,
      caption: `Urban Eat award campaign visual ${index + 1}`,
    };
  }
);

const packagingItems: CaseStudyCarouselItem[] = Array.from(
  { length: 51 },
  (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0");

    return {
      label: `package-${imageNumber}.webp`,
      src: `/projects/urban-eat/packaging/package-${imageNumber}.webp`,
      alt: `Urban Eat packaging design example ${index + 1}`,
      caption: `Urban Eat packaging design example ${index + 1}`,
    };
  }
);

const rootsItems: CaseStudyCarouselItem[] = Array.from(
  { length: 14 },
  (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0");

    return {
      label: `roots-${imageNumber}.webp`,
      src: `/projects/urban-eat/roots/roots-${imageNumber}.webp`,
      alt: `Urban Eat Roots sub-brand design example ${index + 1}`,
      caption: `Urban Eat Roots sub-brand design example ${index + 1}`,
    };
  }
);

const costaPitchItems: CaseStudyCarouselItem[] = Array.from(
  { length: 15 },
  (_, index) => {
    const imageNumber = String(index + 1).padStart(2, "0");

    return {
      label: `costa-pitch-${imageNumber}.webp`,
      src: `/projects/urban-eat/costa-pitch/costa-pitch-${imageNumber}.webp`,
      alt: `Urban Eat Costa pitch presentation slide ${index + 1}`,
      caption: `Costa pitch presentation slide ${index + 1}`,
      width: 3508,
      height: 2480,
    };
  }
);

const otherProject =
  projects.find((project) => project.slug !== currentProjectSlug) ??
  null;

const navigationProject = otherProject
  ? {
      title: otherProject.title,
      slug: otherProject.slug,
      category: otherProject.category,
    }
  : null;

export default function UrbanEatClient() {
  return (
    <main className="min-h-screen bg-white text-black [overflow-x:clip]">
      <ReadingProgressBar />

      <CaseStudyProgressNav
        sections={progressSections}
        startSectionId="overview"
        endSectionId="case-study-end"
      />

      <section className="mx-auto max-w-6xl px-8 pb-24 pt-32">
        <Reveal>
          <AnimatedLabel className="mb-8">
            COMPLETE BRANDING
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-6xl font-bold leading-[0.92] md:text-8xl">
            Urban Eat
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            Selected legacy FMCG packaging and brand activation work
            for Urban Eat, built around a handmade food-print visual
            system. The wider rollout covered packaging systems,
            sub-brand development, food photography, POS, websites,
            email design, brochures, marketing assets, sales
            presentations and retail-ready campaign work.
          </p>
        </Reveal>
      </section>

      <section
        id="overview"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <AnimatedLabel className="mb-8">
                Overview
              </AnimatedLabel>

              <AnimatedHeadline className="max-w-3xl text-5xl font-bold leading-[0.95] md:text-7xl">
                A full visual world for food-to-go
              </AnimatedHeadline>
            </div>

            <div>
              <p className="text-xl leading-relaxed text-gray-600">
                Urban Eat needed a flexible design system that could
                stretch across packaging, retail spaces, campaigns and
                sales material. The work had to feel handmade,
                characterful and commercially useful, while still being
                practical enough for a fast-moving FMCG environment.
              </p>

              <OverviewGridCaseStudy items={overviewItems} />

              <div className="mt-12 flex flex-wrap gap-3">
                {serviceTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section
        id="brand-craft"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            01 Brand Craft System
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            Real food, hand crafted
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            The visual idea came from the product itself. Potatoes were
            cut into simple shapes, dipped in paint and printed by hand.
            Those imperfect marks were then developed into a cityscape
            style that could be used across packaging, POS and campaign
            material.
          </p>

          <div className="mt-16">
            <CaseStudyImageCarousel
              title="Brand Craft System"
              items={brandCraftItems}
              tags={brandCraftTags}
            />
          </div>
        </Reveal>
      </section>

      <section
        id="award"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            02 Award-Winning Campaign
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            Recognised campaign work
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            The Urban Eat campaign work was part of a wider creative
            period that helped the brand stand out in food-to-go retail.
          </p>

          <AnimatedQuote className="mt-12">
            The work was recognised with a Sammies 2016 Marketing
            Award.
          </AnimatedQuote>

          <div className="mt-16">
            <CaseStudyImageCarousel
              title="Award-Winning Campaign"
              items={awardItems}
              tags={awardTags}
            />
          </div>
        </Reveal>
      </section>

      <section
        id="packaging-system"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            03 Packaging System
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            A-to-Z FMCG packaging process
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            The packaging work covered a wide range of products, formats
            and production requirements. This included design
            development, artwork production, visual consistency and
            rollout thinking across the wider Urban Eat range.
          </p>

          <div className="mt-16">
            <CaseStudyImageCarousel
              title="A-to-Z Packaging System"
              items={packagingItems}
              tags={packagingTags}
            />
          </div>
        </Reveal>
      </section>

      <section
        id="roots"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            04 Urban Eat Roots
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            A softer sub-brand language for Roots
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            Roots needed to sit within the Urban Eat world while feeling
            calmer, softer and more natural. The sub-brand direction
            explored a more earthy visual tone, giving the range its own
            space without disconnecting it from the parent brand.
          </p>

          <div className="mt-16">
            <CaseStudyImageCarousel
              title="Urban Eat Roots"
              items={rootsItems}
              tags={rootsTags}
            />
          </div>
        </Reveal>
      </section>

      <section
        id="pitch"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-24"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            05 Pitch &amp; Presentation Design
          </AnimatedLabel>

          <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            Commercial storytelling for a major pitch
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            A focused presentation system created to support a major
            food-to-go partnership pitch, combining illustration,
            commercial storytelling, category visuals and product-led
            messaging.
          </p>

          <AnimatedQuote className="mt-12">
            The presentation helped support a major Costa pitch and led
            to further business developing new product packaging and
            labels.
          </AnimatedQuote>

          <div className="mt-16">
            <CaseStudyImageCarousel
              title="Pitch & Presentation Design"
              items={costaPitchItems}
              tags={pitchTags}
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl border-t border-gray-100 px-8 py-12">
        <Reveal>
          <LegacyNotice />
        </Reveal>
      </section>

      <div id="case-study-end" />

      <CaseStudyNavigation
        currentSlug={currentProjectSlug}
        previousProject={navigationProject}
        nextProject={null}
      />

      <CaseStudyCTA />

      <style>
        {`
          @keyframes tbds-animated-quote-pulse {
            0% {
              opacity: 0.65;
              transform: translateY(8px);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            }

            38% {
              opacity: 1;
              transform: translateY(0);
              box-shadow:
                0 22px 70px rgba(0, 0, 0, 0.08),
                0 0 48px rgba(99, 102, 241, 0.12);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            }
          }

          @keyframes tbds-overview-grid-cell-pulse {
            0% {
              transform: translateY(8px);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
              border-color: rgba(229, 231, 235, 1);
            }

            42% {
              transform: translateY(0);
              box-shadow:
                0 18px 50px rgba(0, 0, 0, 0.07),
                0 0 36px rgba(99, 102, 241, 0.10);
              border-color: rgba(209, 213, 219, 1);
            }

            100% {
              transform: translateY(0);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
              border-color: rgba(229, 231, 235, 1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tbds-animated-quote,
            .tbds-overview-grid-case-study-cell {
              animation: none !important;
            }
          }
        `}
      </style>
    </main>
  );
}

function OverviewGridCaseStudy({
  items,
}: {
  items: typeof overviewItems;
}) {
  const { ref, isPulsing } = useScrollPulse({
    duration: 1800,
    threshold: 0.28,
  });

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  return (
    <div
      ref={ref}
      className="overview-grid-case-study mt-12 grid w-full max-w-full overflow-hidden rounded-[1.35rem] border border-gray-200 sm:grid-cols-2"
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={item.label}
            type="button"
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            onClick={() =>
              setActiveIndex((currentIndex) =>
                currentIndex === index ? null : index
              )
            }
            className={`
              tbds-overview-grid-case-study-cell

              relative
              min-h-[8.5rem]
              overflow-hidden
              border-b
              border-gray-200
              bg-white
              p-6
              text-left

              transition-all
              duration-500
              ease-[cubic-bezier(0.22,1,0.36,1)]

              sm:border-r
              [&:nth-child(even)]:sm:border-r-0
              [&:nth-last-child(-n+2)]:sm:border-b-0

              ${
                isActive
                  ? "z-10 -translate-y-1 shadow-[0_18px_50px_rgba(0,0,0,0.07),0_0_36px_rgba(99,102,241,0.10)]"
                  : ""
              }
            `}
            style={{
              animation: isPulsing
                ? "tbds-overview-grid-cell-pulse 1300ms cubic-bezier(0.22, 1, 0.36, 1) both"
                : undefined,
              animationDelay: isPulsing
                ? `${index * 130}ms`
                : undefined,
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500"
              style={{
                backgroundImage: "var(--tbds-accent-gradient)",
                transform: isActive ? "scaleX(1)" : undefined,
              }}
            />

            <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
              {item.label}
            </p>

            <p className="mt-4 text-base leading-relaxed text-black">
              {item.value}
            </p>
          </button>
        );
      })}
    </div>
  );
}

function AnimatedQuote({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isPulsing } = useScrollPulse({
    duration: 1700,
    threshold: 0.4,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [manualPulse, setManualPulse] = useState(false);

  const isActive = isHovered || isPulsing || manualPulse;

  const triggerManualPulse = () => {
    setManualPulse(true);

    window.setTimeout(() => {
      setManualPulse(false);
    }, 1500);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerManualPulse}
      className={`
        animated-quote
        tbds-animated-quote

        group
        relative
        w-full
        max-w-3xl
        cursor-pointer
        overflow-hidden
        rounded-[1.35rem]
        border
        border-transparent
        bg-white
        p-6
        pl-7

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${className}

        ${
          isActive
            ? "border-gray-200 shadow-[0_22px_70px_rgba(0,0,0,0.08),0_0_48px_rgba(99,102,241,0.12)]"
            : ""
        }
      `}
      style={{
        animation: isPulsing
          ? "tbds-animated-quote-pulse 1500ms cubic-bezier(0.22, 1, 0.36, 1) both"
          : undefined,
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          triggerManualPulse();
        }
      }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-0 top-6 w-[3px] bg-black transition-all duration-500"
        style={{
          backgroundImage: isActive
            ? "var(--tbds-accent-gradient)"
            : undefined,
          boxShadow: isActive
            ? "0 0 24px rgba(99, 102, 241, 0.45)"
            : undefined,
        }}
      />

      <p className="text-lg leading-relaxed text-black md:text-xl">
        {children}
      </p>
    </div>
  );
}

function LegacyNotice() {
  return (
    <div className="flex max-w-full items-start gap-4 overflow-hidden rounded-[1.15rem] border border-gray-200 bg-white px-5 py-4 text-gray-500 sm:items-center">
      <span
        aria-hidden="true"
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-400"
      >
        i
      </span>

      <p className="min-w-0 flex-1 break-words text-sm leading-relaxed xl:whitespace-nowrap">
        Selected legacy portfolio work. Brand names and trademarks are
        shown for identification only and remain the property of their
        respective owners.
      </p>
    </div>
  );
}

function useScrollPulse({
  duration,
  threshold,
}: {
  duration: number;
  threshold: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    let timeout: number | undefined;
    let wasIntersecting = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasIntersecting) {
          wasIntersecting = true;
          setIsPulsing(true);

          if (timeout !== undefined) {
            window.clearTimeout(timeout);
          }

          timeout = window.setTimeout(() => {
            setIsPulsing(false);
          }, duration);
        }

        if (!entry.isIntersecting) {
          wasIntersecting = false;
          setIsPulsing(false);

          if (timeout !== undefined) {
            window.clearTimeout(timeout);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (timeout !== undefined) {
        window.clearTimeout(timeout);
      }
    };
  }, [duration, threshold]);

  return {
    ref,
    isPulsing,
  };
}