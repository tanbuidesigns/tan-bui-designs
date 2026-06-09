import { islamiyah } from "@/data/caseStudies/islamiyah";

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
import CaseStudyGallery from "@/components/case-study/CaseStudyGallery";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyServices from "@/components/case-study/CaseStudyServices";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

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
            id: "gallery",
            label: "Gallery",
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
        caption={islamiyah.heroImage.caption}
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

      {/* GALLERY */}

      <CaseStudyGallery
        id="gallery"
        title="PROJECT GALLERY"
        items={islamiyah.gallery}
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

      {/* SERVICES */}

      <CaseStudyServices
        services={islamiyah.services}
      />

      {/* PROJECT NAVIGATION */}

      <CaseStudyNavigation
        previousProject={
          islamiyah.navigation.previousProject
        }
        nextProject={
          islamiyah.navigation.nextProject
        }
      />

      {/* CTA */}

      <CaseStudyCTA />
    </main>
  );
}