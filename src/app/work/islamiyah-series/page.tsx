import { islamiyah } from "@/data/caseStudies/islamiyah";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";

import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";

import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyImage from "@/components/case-study/CaseStudyImage";
import CaseStudyOverview from "@/components/case-study/CaseStudyOverview";
import CaseStudyPreviewStrip from "@/components/case-study/CaseStudyPreviewStrip";

import CaseStudyMetrics from "@/components/case-study/CaseStudyMetrics";
import CaseStudyQuote from "@/components/case-study/CaseStudyQuote";
import CaseStudySection from "@/components/case-study/CaseStudySection";
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

const galleryCarouselItems: CaseStudyCarouselItem[] =
  islamiyah.gallery.map((item, index) => ({
    label: `gallery-${String(index + 1).padStart(2, "0")}.webp`,
    src: item.src,
    alt: item.alt,
    caption: `Islamiyah Series gallery image ${index + 1}`,
  }));

const nextProject = {
  title: "Urban Eat",
  slug: "urban-eat-packaging",
  category: "Brand Design",
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

  return (
    <main className="bg-white text-black">
      <ReadingProgressBar />

      <CaseStudyProgressNav
        sections={[
          {
            id: "gallery",
            label: "Gallery",
          },
          {
            id: "services",
            label: "Services",
          },
          {
            id: "overview",
            label: "Overview",
          },
          {
            id: "challenge",
            label: "Challenge",
          },
          {
            id: "design-system",
            label: "Design",
          },
          {
            id: "platform",
            label: "Platform",
          },
          {
            id: "results",
            label: "Results",
          },
          {
            id: "outcome",
            label: "Outcome",
          },
        ]}
      />

      {/* HERO */}

      <CaseStudyHero
        category={islamiyah.category}
        title={islamiyah.title}
        intro={islamiyah.intro}
      />

      {/* CINEMATIC HERO IMAGE */}

      <CaseStudyImage
        src={islamiyah.heroImage.src}
        alt={islamiyah.heroImage.alt}
        priority
      />

      {/* OVERVIEW */}

      <CaseStudyOverview
        client={islamiyah.overview.client}
        industry={islamiyah.overview.industry}
        timeline={islamiyah.overview.timeline}
        role={islamiyah.overview.role}
      />

      {/* PREVIEW STRIP */}

      <CaseStudyPreviewStrip
        items={islamiyah.previewImages}
      />

      {/* METRICS */}

      <CaseStudyMetrics
        metrics={islamiyah.metrics}
      />

      {/* QUOTE */}

      <CaseStudyQuote
        quote={islamiyah.quote}
      />

      {/* PROJECT GALLERY */}

      <ProjectGallerySection
        items={galleryCarouselItems}
      />

      {/* SERVICES */}

      <CaseStudyServicesTicker
        id="services"
        title="Services & Role"
        intro="A focused mix of brand, print, illustration and digital learning work, brought together as one connected educational system."
        services={islamiyah.services}
      />

      {/* OVERVIEW */}

      {overviewSection && (
        <CaseStudySection
          id="overview"
          title={overviewSection.title}
        >
          {overviewSection.content.map(
            (paragraph) => (
              <p
                key={paragraph}
                className="mb-8 last:mb-0"
              >
                {paragraph}
              </p>
            )
          )}
        </CaseStudySection>
      )}

      {/* CHALLENGE */}

      {challengeSection && (
        <CaseStudySection
          id="challenge"
          title={challengeSection.title}
        >
          {challengeSection.content.map(
            (paragraph) => (
              <p
                key={paragraph}
                className="mb-8 last:mb-0"
              >
                {paragraph}
              </p>
            )
          )}
        </CaseStudySection>
      )}

      {/* TIMELINE */}

      <CaseStudyTimeline
        items={islamiyah.timeline}
      />

      {/* DESIGN SYSTEM */}

      {designSection && (
        <CaseStudySection
          id="design-system"
          title={designSection.title}
        >
          {designSection.content.map(
            (paragraph) => (
              <p
                key={paragraph}
                className="mb-8 last:mb-0"
              >
                {paragraph}
              </p>
            )
          )}
        </CaseStudySection>
      )}

      {/* INTERACTIVE PLATFORM */}

      {platformSection && (
        <CaseStudySection
          id="platform"
          title={platformSection.title}
        >
          {platformSection.content.map(
            (paragraph) => (
              <p
                key={paragraph}
                className="mb-8 last:mb-0"
              >
                {paragraph}
              </p>
            )
          )}
        </CaseStudySection>
      )}

      {/* RESULTS */}

      <CaseStudyResults
        id="results"
        results={islamiyah.results}
      />

      {/* OUTCOME */}

      {outcomeSection && (
        <CaseStudySection
          id="outcome"
          title={outcomeSection.title}
        >
          {outcomeSection.content.map(
            (paragraph) => (
              <p
                key={paragraph}
                className="mb-8 last:mb-0"
              >
                {paragraph}
              </p>
            )
          )}
        </CaseStudySection>
      )}

      {/* PROJECT NAVIGATION */}

      <CaseStudyNavigation
        currentSlug={currentProjectSlug}
        previousProject={
          islamiyah.navigation.previousProject
        }
        nextProject={nextProject}
      />

      {/* CTA */}

      <CaseStudyCTA />
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

      <div className="mt-14">
        <CaseStudyImageCarousel
          title="Islamiyah Series Gallery"
          items={items}
          tags={islamiyahGalleryTags}
        />
      </div>
    </section>
  );
}