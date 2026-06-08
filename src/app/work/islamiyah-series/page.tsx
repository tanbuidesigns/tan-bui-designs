import { islamiyah } from "@/data/caseStudies/islamiyah";

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
    (section) => section.title === "Design System & Publications"
  );

  const platformSection = islamiyah.sections.find(
    (section) => section.title === "Interactive Learning Platform"
  );

  const outcomeSection = islamiyah.sections.find(
    (section) => section.title === "Outcome"
  );

  return (
    <main className="bg-white text-black">
      <CaseStudyHero
        category={islamiyah.category}
        title={islamiyah.title}
        intro={islamiyah.intro}
      />

      {/* Cinematic Hero Image */}

      <CaseStudyImage
        src={islamiyah.heroImage.src}
        alt={islamiyah.heroImage.alt}
        caption={islamiyah.heroImage.caption}
        priority
      />

      {/* Project Overview */}

      <CaseStudyOverview
        client={islamiyah.overview.client}
        industry={islamiyah.overview.industry}
        timeline={islamiyah.overview.timeline}
        role={islamiyah.overview.role}
      />

      {/* Preview Strip */}

      <CaseStudyPreviewStrip
        items={islamiyah.previewImages}
      />

      {/* Metrics */}

      <CaseStudyMetrics
        metrics={islamiyah.metrics}
      />

      {/* Quote */}

      <CaseStudyQuote
        quote={islamiyah.quote}
      />

      {/* Overview */}

      {overviewSection && (
        <CaseStudySection
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

      {/* Challenge */}

      {challengeSection && (
        <CaseStudySection
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

      {/* Timeline */}

      <CaseStudyTimeline
        items={islamiyah.timeline}
      />

      {/* Design System */}

      {designSection && (
        <CaseStudySection
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

      {/* Featured Image Placeholder */}

      <CaseStudyImage
        src="/projects/islamiyah-series/design-system.jpg"
        alt="Islamiyah Series Publication System"
        caption="A unified visual system spanning branding, illustrations, publications and educational content."
      />

      {/* Interactive Platform */}

      {platformSection && (
        <CaseStudySection
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

      {/* Featured Image Placeholder */}

      <CaseStudyImage
        src="/projects/islamiyah-series/platform-showcase.jpg"
        alt="Islamiyah Series Interactive Learning"
        caption="Interactive learning tools helped extend the curriculum beyond the classroom."
      />

      {/* Results */}

      <CaseStudyResults
        results={islamiyah.results}
      />

      {/* Outcome */}

      {outcomeSection && (
        <CaseStudySection
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

      {/* Gallery */}

      <CaseStudyGallery
        title="PROJECT GALLERY"
        items={islamiyah.gallery}
      />

      {/* Services */}

      <CaseStudyServices
        services={islamiyah.services}
      />

      {/* Navigation */}

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