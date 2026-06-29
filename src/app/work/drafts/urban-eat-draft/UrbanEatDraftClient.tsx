"use client";

import Image from "next/image";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";

import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";
import CaseStudyImageCarousel, {
  CaseStudyCarouselItem,
} from "@/components/case-study/CaseStudyImageCarousel";

type BusinessResult = {
  label: string;
  text: string;
};

const progressSections = [
  { id: "overview", label: "Overview" },
  { id: "brand-craft", label: "Brand Craft" },
  { id: "award", label: "Awards" },
  { id: "packaging-system", label: "Packaging" },
  { id: "roots", label: "Sub-Brand" },
  { id: "pitch", label: "Pitching" },
];

const overviewItems = [
  { label: "Client", value: "Urban Eat" },
  { label: "Industry", value: "FMCG / Food-to-go" },
  { label: "Role", value: "Senior Multimedia Designer" },
  {
    label: "Focus",
    value:
      "Packaging, POS, campaigns, pitch decks and retail activation",
  },
];

const capabilityTags = [
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

const brandCraftSection = {
  id: "brand-craft",
  eyebrow: "01 Brand Craft System",
  title: "Real food, hand crafted.",
  text:
    "The Urban Eat visual language was built around a handmade food-print idea. Potatoes were cut into simple shapes, dipped in paint and printed by hand. Those marks were then developed into a cityscape illustration that became a key brand asset across packaging, POS and campaign material.",
  reelItems: [
    {
      label: "brand-craft-01.webp",
      alt: "Urban Eat handmade food-print brand craft image 1",
    },
    {
      label: "brand-craft-02.webp",
      alt: "Urban Eat handmade food-print brand craft image 2",
    },
    {
      label: "brand-craft-03.webp",
      alt: "Urban Eat handmade food-print brand craft image 3",
    },
    {
      label: "brand-craft-04.webp",
      alt: "Urban Eat handmade food-print brand craft image 4",
    },
  ] satisfies CaseStudyCarouselItem[],
};

const packagingSection = {
  id: "packaging-system",
  eyebrow: "03 Packaging System",
  title: "A-to-Z FMCG packaging process.",
  text:
    "A complete packaging workflow across concept development, range building, artwork production, food photography and retail-ready application.",
  reelItems: [
    {
      label: "packaging-system-01.webp",
      alt: "Urban Eat packaging system image 1",
    },
    {
      label: "packaging-system-02.webp",
      alt: "Urban Eat packaging system image 2",
    },
    {
      label: "packaging-system-03.webp",
      alt: "Urban Eat packaging system image 3",
    },
    {
      label: "packaging-system-04.webp",
      alt: "Urban Eat packaging system image 4",
    },
  ] satisfies CaseStudyCarouselItem[],
};

const rootsSection = {
  id: "roots",
  eyebrow: "04 Urban Eat Roots",
  title: "A softer sub-brand language for Roots.",
  text:
    "Urban Eat Roots used vegetable-inspired mark-making and natural textures to create a vegetarian and vegan-focused range that still connected back to the wider Urban Eat system.",
  reelItems: [
    {
      label: "roots-01.webp",
      alt: "Urban Eat Roots sub-brand image 1",
    },
    {
      label: "roots-02.webp",
      alt: "Urban Eat Roots sub-brand image 2",
    },
    {
      label: "roots-03.webp",
      alt: "Urban Eat Roots sub-brand image 3",
    },
    {
      label: "roots-04.webp",
      alt: "Urban Eat Roots sub-brand image 4",
    },
  ] satisfies CaseStudyCarouselItem[],
};

const pitchSection = {
  id: "pitch",
  eyebrow: "05 Pitch & Presentation Design",
  title: "Commercial storytelling for a major pitch.",
  text:
    "A focused presentation system created to support a major food-to-go partnership pitch, combining illustration, commercial storytelling, category visuals and product-led messaging.",
  businessResult: {
    label: "Business result",
    text:
      "The presentation helped support a major Costa pitch and led to further business developing new product packaging and labels.",
  },
  reelItems: Array.from({ length: 15 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");

    return {
      label: `costa-pitch-${number}.webp`,
      src: `/projects/urban-eat/costa-pitch/costa-pitch-${number}.webp`,
      alt: `Urban Eat Costa pitch presentation slide ${index + 1}`,
      caption: `Costa pitch presentation slide ${index + 1}`,
      width: 3508,
      height: 2480,
    };
  }) satisfies CaseStudyCarouselItem[],
};

export default function UrbanEatDraftClient() {
  return (
    <main className="bg-white text-black">
      <ReadingProgressBar />

      <CaseStudyProgressNav
        sections={progressSections}
        startSectionId="overview"
        endSectionId="draft-end"
      />

      <DraftHero />

      <section
        id="overview"
        className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100 scroll-mt-40"
      >
        <Reveal>
          <div className="grid gap-12 md:grid-cols-4">
            {overviewItems.map((item) => (
              <div key={item.label}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
                  {item.label}
                </p>

                <p className="text-xl text-gray-800 leading-relaxed">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <CapabilityTagReel />
        </Reveal>
      </section>

      <DraftStorySection {...brandCraftSection} />

      <section
        id="award"
        className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100 scroll-mt-40"
      >
        <Reveal>
          <AnimatedLabel className="mb-8">
            02 Award-Winning Campaign
          </AnimatedLabel>

          <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
            Recognised campaign work.
          </AnimatedHeadline>

          <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
            The summer range campaign was recognised at The Sammies with
            the 2016 Marketing Award, adding food-to-go industry
            recognition to the campaign rollout.
          </p>

          <div className="mt-16">
            <DraftImageBlock
              label="sammies-award.webp"
              ratio="wide"
            />
          </div>
        </Reveal>
      </section>

      <DraftStorySection {...packagingSection} />
      <DraftStorySection {...rootsSection} />
      <DraftStorySection {...pitchSection} />

      <section
        id="draft-end"
        className="max-w-6xl mx-auto px-8 py-16 border-t border-gray-100"
      >
        <LegalNote />
      </section>

      <CaseStudyNavigation
        previousProject={{
          title: "Islamiyah Series",
          slug: "islamiyah-series",
          category: "Education / Publication Design",
        }}
        nextProject={{
          title: "Chop Chop Packaging",
          slug: "chop-chop",
          category: "Packaging Design",
        }}
      />

      <CaseStudyCTA />
    </main>
  );
}

function DraftHero() {
  return (
    <section className="max-w-6xl mx-auto px-8 pt-32 pb-24">
      <Reveal>
        <AnimatedLabel className="mb-8">
          Complete Branding
        </AnimatedLabel>

        <AnimatedHeadline className="max-w-5xl text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight">
          Urban Eat
        </AnimatedHeadline>

        <p className="mt-12 max-w-3xl text-xl text-gray-600 leading-relaxed">
          Selected legacy FMCG packaging and brand activation work for
          Urban Eat, built around a handmade food-print visual system.
          The wider rollout covered packaging systems, sub-brand
          development, food photography, POS, websites, email design,
          brochures, marketing assets, sales presentations and
          retail-ready campaign work.
        </p>

        <div className="mt-16">
          <DraftImageBlock
            label="hero-collage.webp"
            ratio="hero"
          />
        </div>
      </Reveal>
    </section>
  );
}

function CapabilityTagReel() {
  return (
    <div className="mt-12 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-3 pr-8 sm:flex-wrap sm:w-auto">
        {capabilityTags.map((tag) => (
          <span
            key={tag}
            className="flex min-h-11 flex-shrink-0 snap-start items-center rounded-full border border-gray-200 px-4 text-sm text-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function DraftStorySection({
  id,
  eyebrow,
  title,
  text,
  businessResult,
  reelItems,
}: {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  businessResult?: BusinessResult;
  reelItems: CaseStudyCarouselItem[];
}) {
  return (
    <section
      id={id}
      className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100 scroll-mt-40"
    >
      <Reveal>
        <AnimatedLabel className="mb-8">
          {eyebrow}
        </AnimatedLabel>

        <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          {title}
        </AnimatedHeadline>

        <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
          {text}
        </p>

        {businessResult && (
          <BusinessResultCallout result={businessResult} />
        )}

        <div className="mt-16">
          <CaseStudyImageCarousel
            title={title}
            items={reelItems}
          />
        </div>
      </Reveal>
    </section>
  );
}

function BusinessResultCallout({
  result,
}: {
  result: BusinessResult;
}) {
  return (
    <div className="mt-10 max-w-3xl border-l border-black pl-6">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
        {result.label}
      </p>

      <p className="text-lg leading-relaxed text-gray-700">
        {result.text}
      </p>
    </div>
  );
}

function LegalNote() {
  return (
    <div className="flex max-w-3xl gap-3 text-sm text-gray-500 leading-relaxed">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-xs text-gray-400"
      >
        i
      </span>

      <p>
        Selected legacy portfolio work. Brand names and trademarks are
        shown for identification only and remain the property of their
        respective owners.
      </p>
    </div>
  );
}

function DraftImageBlock({
  label,
  ratio,
  src,
  alt,
}: {
  label: string;
  ratio: "hero" | "wide";
  src?: string;
  alt?: string;
}) {
  const ratioClass = {
    hero: "aspect-[16/9]",
    wide: "aspect-[16/10]",
  }[ratio];

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-gray-100
        ${ratioClass}
      `}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3f4f6,#ffffff,#e5e7eb)]" />

          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="max-w-sm text-sm uppercase tracking-[0.18em] text-gray-400">
              Image placeholder
              <br />
              {label}
            </p>
          </div>
        </>
      )}
    </div>
  );
}