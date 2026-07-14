"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./IslamiyahGallery.module.css";

import { islamiyah } from "@/data/caseStudies/islamiyah";
import { projects } from "@/data/projects";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";

import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";

import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyImage from "@/components/case-study/CaseStudyImage";
import CaseStudyPreviewStrip from "@/components/case-study/CaseStudyPreviewStrip";

import CaseStudyMetrics from "@/components/case-study/CaseStudyMetrics";
import CaseStudyQuote from "@/components/case-study/CaseStudyQuote";
import CaseStudyTimeline from "@/components/case-study/CaseStudyTimeline";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

import CaseStudyImageCarousel, {
  CaseStudyCarouselItem,
} from "@/components/case-study/CaseStudyImageCarousel";
import CaseStudyServicesTicker from "@/components/case-study/CaseStudyServicesTicker";

const currentProjectSlug = "islamiyah-series";

const islamiyahGalleryTags = [
  "Publication design",
  "Book design",
  "Illustration",
  "Curriculum design",
  "Educational design",
  "UI design",
  "Interactive learning",
  "Art direction",
];

const islamiyahGalleryDimensions = [
  { width: 1705, height: 1136 },
  { width: 2800, height: 2589 },
  { width: 2093, height: 1460 },
  { width: 2700, height: 1570 },
  { width: 2989, height: 1673 },
  { width: 2800, height: 1622 },
  { width: 2093, height: 1460 },
] as const;

const galleryCarouselItems: CaseStudyCarouselItem[] =
  islamiyah.gallery.map((item, index) => ({
    label: `gallery-${String(index + 1).padStart(2, "0")}.webp`,
    src: item.src,
    alt: item.alt,
    caption: `Islamiyah Series gallery image ${index + 1}`,
    ...islamiyahGalleryDimensions[index],
  }));

const overviewGridItems = [
  {
    label: "Client",
    value: islamiyah.overview.client,
  },
  {
    label: "Industry",
    value: islamiyah.overview.industry,
  },
  {
    label: "Timeline",
    value: islamiyah.overview.timeline,
  },
  {
    label: "Role",
    value: islamiyah.overview.role,
  },
];

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

type AccordionItem = {
  id: string;
  icon: string;
  title: string;
  children: ReactNode;
};

export default function IslamiyahSeriesPage() {
  const overviewSection = islamiyah.sections.find(
    (section) => section.title === "Overview"
  );

  const challengeSection = islamiyah.sections.find(
    (section) => section.title === "The Challenge"
  );

  const designSection = islamiyah.sections.find(
    (section) =>
      section.title === "Design System & Publications"
  );

  const platformSection = islamiyah.sections.find(
    (section) =>
      section.title === "Interactive Learning Platform"
  );

  const outcomeSection = islamiyah.sections.find(
    (section) => section.title === "Outcome"
  );

  const accordionItems: AccordionItem[] = [
    overviewSection
      ? {
          id: "overview-detail",
          icon: "◎",
          title: overviewSection.title,
          children: (
            <ParagraphContent
              paragraphs={overviewSection.content}
            />
          ),
        }
      : null,

    challengeSection
      ? {
          id: "challenge",
          icon: "◇",
          title: challengeSection.title,
          children: (
            <ParagraphContent
              paragraphs={challengeSection.content}
            />
          ),
        }
      : null,

    designSection
      ? {
          id: "design-system",
          icon: "✦",
          title: designSection.title,
          children: (
            <ParagraphContent
              paragraphs={designSection.content}
            />
          ),
        }
      : null,

    platformSection
      ? {
          id: "platform",
          icon: "▣",
          title: platformSection.title,
          children: (
            <ParagraphContent
              paragraphs={platformSection.content}
            />
          ),
        }
      : null,

    outcomeSection
      ? {
          id: "outcome",
          icon: "✓",
          title: outcomeSection.title,
          children: (
            <ParagraphContent
              paragraphs={outcomeSection.content}
            />
          ),
        }
      : null,
  ].filter(Boolean) as AccordionItem[];

  return (
    <main className="bg-white text-black [overflow-x:clip]">
      <ReadingProgressBar />

      <CaseStudyProgressNav
        sections={[
          {
            id: "overview",
            label: "Overview",
          },
          {
            id: "gallery",
            label: "Gallery",
          },
          {
            id: "services",
            label: "Services",
          },
          {
            id: "details",
            label: "Details",
          },
          {
            id: "timeline",
            label: "Timeline",
          },
          {
            id: "results",
            label: "Results",
          },
        ]}
      />

      <CaseStudyHero
        category={islamiyah.category}
        title={islamiyah.title}
        intro={islamiyah.intro}
      />

      <CaseStudyImage
        src={islamiyah.heroImage.src}
        alt={islamiyah.heroImage.alt}
        priority
      />

      <section
        id="overview"
        className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-20"
      >
        <OverviewGridCaseStudy items={overviewGridItems} />
      </section>

      <CaseStudyPreviewStrip
        items={islamiyah.previewImages}
      />

      <CaseStudyMetrics
        metrics={islamiyah.metrics}
      />

      <CaseStudyQuote
        quote={islamiyah.quote}
      />

      <ProjectGallerySection
        items={galleryCarouselItems}
      />

      <CaseStudyServicesTicker
        id="services"
        title="Services & Role"
        intro="A focused mix of brand, print, illustration and digital learning work, brought together as one connected educational system."
        services={islamiyah.services}
        holdTime={1750}
        transitionTime={600}
      />

      <CaseStudyDetailsAccordion items={accordionItems} />

      <section
        id="timeline"
        className="scroll-mt-40"
      >
        <CaseStudyTimeline
          items={islamiyah.timeline}
        />
      </section>

      <CaseStudyResults
        id="results"
        results={islamiyah.results}
      />

      <div id="case-study-end" />

      <CaseStudyNavigation
        currentSlug={currentProjectSlug}
        previousProject={null}
        nextProject={navigationProject}
      />

      <CaseStudyCTA />

      <style>
        {`
          @keyframes tbds-accordion-content-in {
            0% {
              opacity: 0;
              transform: translateY(-6px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .tbds-accordion-content {
              animation: none !important;
            }
          }
        `}
      </style>
    </main>
  );
}

function ProjectGallerySection({
  items,
}: {
  items: CaseStudyCarouselItem[];
}) {
  return (
    <section
      id="gallery"
      className="
        mx-auto
        max-w-6xl
        scroll-mt-40
        border-t
        border-gray-100
        px-8
        py-20
      "
    >
      <AnimatedLabel className="mb-8">
        Project Gallery
      </AnimatedLabel>

      <AnimatedHeadline className="max-w-5xl text-5xl font-bold leading-[0.95] tracking-[-0.04em] md:text-7xl">
        Brand design across platforms
      </AnimatedHeadline>

      <p className="mt-10 max-w-3xl text-xl leading-relaxed text-gray-600">
        A closer look at the publication system, book covers,
        internal spreads, illustration style and digital learning
        visuals created for the Islamiyah Series.
      </p>

      <div className={`mt-14 ${styles.carousel}`}>
        <CaseStudyImageCarousel
          title="Islamiyah Series Gallery"
          items={items}
          tags={islamiyahGalleryTags}
        />
      </div>

      <div className={`${styles.stackedGallery} mt-14`}>
        {items.map(
          (item) =>
            item.src &&
            item.width &&
            item.height && (
              <Image
                key={item.label}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 767px) 100vw"
                className={styles.stackedImage}
              />
            )
        )}
      </div>
    </section>
  );
}

function OverviewGridCaseStudy({
  items,
}: {
  items: typeof overviewGridItems;
}) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  return (
    <div className="overview-grid-case-study grid w-full max-w-full overflow-hidden rounded-[1.35rem] border border-gray-200 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
       const isActive = activeIndex === index;
const listValue = Array.isArray(item.value)
  ? item.value
  : null;

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
              lg:border-b-0
              [&:nth-child(even)]:sm:border-r-0
              [&:nth-child(even)]:lg:border-r
              [&:last-child]:lg:border-r-0
              [&:nth-last-child(-n+2)]:sm:border-b-0

              ${
                isActive
                  ? "z-10 -translate-y-1 shadow-[0_18px_50px_rgba(0,0,0,0.07),0_0_36px_rgba(99,102,241,0.10)]"
                  : ""
              }
            `}
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

            {listValue ? (
  <div className="mt-4 flex flex-wrap gap-2">
    {listValue.map((value) => (
      <span
        key={value}
                    className="
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      px-3
                      py-1.5

                      text-sm
                      leading-none
                      text-gray-700

                      transition-all
                      duration-300
                    "
                  >
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-base leading-relaxed text-black">
                {item.value}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

function CaseStudyDetailsAccordion({
  items,
}: {
  items: AccordionItem[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const pendingScrollIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!openId || pendingScrollIdRef.current !== openId) return;
    pendingScrollIdRef.current = null;
    if (!window.matchMedia("(max-width: 767px)").matches) return;

    let secondFrame: number | undefined;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.getElementById(openId)?.scrollIntoView({
          block: "start",
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame !== undefined) window.cancelAnimationFrame(secondFrame);
    };
  }, [openId]);

  return (
    <section
      id="details"
      className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-20"
    >
      <AnimatedLabel className="mb-8">
        Case Study Details
      </AnimatedLabel>

      <div className="rounded-[1.35rem] border border-gray-200 bg-white">
        {items.map((item, index) => {
          const isOpen = openId === item.id;

          return (
            <article
              key={item.id}
              id={item.id}
              className={`scroll-mt-28 md:scroll-mt-0 ${
                index === 0 ? "" : "border-t border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  const opening = openId !== item.id;
                  pendingScrollIdRef.current = opening ? item.id : null;
                  setOpenId(opening ? item.id : null);
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-6
                  px-6
                  py-6
                  text-left

                  transition-colors
                  duration-300

                  hover:bg-gray-50
                  md:px-8
                  md:py-7
                "
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="
                      flex
                      h-10
                      w-10
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      text-sm
                      text-gray-500

                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                    "
                    style={{
                      backgroundImage: isOpen
                        ? "var(--tbds-accent-gradient)"
                        : undefined,
                      borderColor: isOpen ? "transparent" : undefined,
                      color: isOpen ? "#ffffff" : undefined,
                      boxShadow: isOpen
                        ? "0 12px 34px rgba(0,0,0,0.10), 0 0 28px rgba(99,102,241,0.16)"
                        : undefined,
                    }}
                  >
                    {item.icon}
                  </span>

                  <span className="block min-w-0 text-xl font-semibold leading-tight text-black md:text-2xl">
                    {item.title}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className="
                    relative
                    flex
                    h-9
                    w-9
                    flex-shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-gray-200
                    bg-white

                    transition-all
                    duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                  "
                >
                  <span className="absolute h-px w-4 bg-black transition-all duration-500" />

                  <span
                    className={`
                      absolute
                      h-4
                      w-px
                      bg-black
                      transition-all
                      duration-500

                      ${
                        isOpen
                          ? "rotate-90 scale-y-0 opacity-0"
                          : ""
                      }
                    `}
                  />
                </span>
              </button>

              {isOpen && (
                <div
                  id={`${item.id}-panel`}
                  className="
                    tbds-accordion-content
                    px-6
                    pb-8
                    text-lg
                    leading-relaxed
                    text-gray-600

                    md:px-8
                    md:pb-10
                    md:text-xl
                  "
                  style={{
                    animation:
                      "tbds-accordion-content-in 360ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="mb-8 h-[2px] w-16"
                    style={{
                      backgroundImage:
                        "var(--tbds-accent-gradient)",
                    }}
                  />

                  {item.children}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ParagraphContent({
  paragraphs,
}: {
  paragraphs: string[];
}) {
  return (
    <div>
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="mb-8 last:mb-0"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
