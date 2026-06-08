import { islamiyah } from "@/data/caseStudies/islamiyah";

import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyOverview from "@/components/case-study/CaseStudyOverview";
import CaseStudyMetrics from "@/components/case-study/CaseStudyMetrics";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import CaseStudyQuote from "@/components/case-study/CaseStudyQuote";
import CaseStudyTimeline from "@/components/case-study/CaseStudyTimeline";
import CaseStudyGallery from "@/components/case-study/CaseStudyGallery";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyServices from "@/components/case-study/CaseStudyServices";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

export default function IslamiyahSeriesPage() {
  return (
    <main className="bg-white text-black">
      <CaseStudyHero
        category={islamiyah.category}
        title={islamiyah.title}
        intro={islamiyah.intro}
      />

      <CaseStudyOverview {...islamiyah.overview} />

      <CaseStudyMetrics
        metrics={islamiyah.metrics}
      />

      <CaseStudyQuote
        quote={islamiyah.quote}
      />

      {islamiyah.sections.map(
        (section) => (
          <CaseStudySection
            key={section.title}
            title={section.title}
          >
            {section.content.map(
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
        )
      )}

      <CaseStudyTimeline
        items={islamiyah.timeline}
      />

      <CaseStudyGallery
        items={islamiyah.gallery}
      />

      <CaseStudyResults
        results={islamiyah.results}
      />

      <CaseStudyServices
        services={islamiyah.services}
      />

      <CaseStudyCTA />
    </main>
  );
}