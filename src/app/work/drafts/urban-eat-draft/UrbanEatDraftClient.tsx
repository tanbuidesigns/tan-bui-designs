"use client";

import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import CaseStudyImageCarousel, {
  CaseStudyCarouselItem,
} from "@/components/case-study/CaseStudyImageCarousel";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";
import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";

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

export default function UrbanEatDraftClient() {
  return (
    <main className="min-h-screen bg-white text-black">
      <ReadingProgressBar />

      <CaseStudyProgressNav
        sections={progressSections}
        startSectionId="overview"
        endSectionId="draft-end"
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
                A full visual world for food-to-go.
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

              <div className="mt-12 grid gap-4 sm:grid-cols-2">
                {overviewItems.map((item) => (
                  <div
                    key={item.label}
                    className="border-t border-gray-100 pt-5"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                      {item.label}
                    </p>

                    <p className="mt-3 text-base leading-relaxed text-black">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

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
            Real food, hand crafted.
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
            Recognised campaign work.
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            The Urban Eat campaign work was part of a wider creative
            period that helped the brand stand out in food-to-go retail.
            The work was recognised with a Sammies 2016 Marketing
            Award.
          </p>

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
            A-to-Z FMCG packaging process.
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
            A softer sub-brand language for Roots.
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
            Commercial storytelling for a major pitch.
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-gray-600">
            A focused presentation system created to support a major
            food-to-go partnership pitch, combining illustration,
            commercial storytelling, category visuals and product-led
            messaging.
          </p>

          <ResultCallout>
            The presentation helped support a major Costa pitch and led
            to further business developing new product packaging and
            labels.
          </ResultCallout>

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
          <p className="max-w-3xl text-sm leading-relaxed text-gray-400">
            Selected legacy portfolio work. Brand names and trademarks
            are shown for identification only and remain the property of
            their respective owners.
          </p>
        </Reveal>
      </section>

      <div id="draft-end" />

      <section className="mx-auto max-w-6xl border-t border-gray-100 px-8 py-16">
        <Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <ProjectNavCard
              eyebrow="Previous project"
              title="Menarini Healthcare Exhibition"
              href="/work/menarini-healthcare-exhibition"
              align="left"
            />

            <ProjectNavCard
              eyebrow="Next project"
              title="Islamiya Series Books"
              href="/work/islamiyah-series"
              align="right"
            />
          </div>
        </Reveal>
      </section>

      <CaseStudyCTA />
    </main>
  );
}

function ResultCallout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 max-w-3xl border-l-2 border-black pl-6">
      <p className="text-lg leading-relaxed text-black">
        {children}
      </p>
    </div>
  );
}

function ProjectNavCard({
  eyebrow,
  title,
  href,
  align,
}: {
  eyebrow: string;
  title: string;
  href: string;
  align: "left" | "right";
}) {
  return (
    <Link
      href={href}
      className={`
        group
        block
        border
        border-gray-100
        p-6
        transition-all
        duration-300
        hover:border-gray-300
        hover:bg-gray-50

        ${align === "right" ? "md:text-right" : ""}
      `}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
        {eyebrow}
      </p>

      <p className="mt-4 text-2xl font-semibold leading-tight text-black">
        {title}
      </p>

      <p className="mt-6 text-sm text-gray-400 transition-colors duration-300 group-hover:text-black">
        {align === "right" ? "View next →" : "← View previous"}
      </p>
    </Link>
  );
}