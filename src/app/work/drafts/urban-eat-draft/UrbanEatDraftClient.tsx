"use client";

import Image from "next/image";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";

import ReadingProgressBar from "@/components/case-study/ReadingProgressBar";
import CaseStudyProgressNav from "@/components/case-study/CaseStudyProgressNav";
import CaseStudyNavigation from "@/components/case-study/CaseStudyNavigation";
import CaseStudyCTA from "@/components/case-study/CaseStudyCTA";

type DraftReelItem = {
  label: string;
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

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
  ],
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
  ],
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
  ],
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
  }),
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
  reelItems: DraftReelItem[];
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
          <DraftDraggableReel
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

function DraftDraggableReel({
  title,
  items,
}: {
  title: string;
  items: DraftReelItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const targetScrollLeftRef = useRef(0);
  const downIndexRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const momentumRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const lightboxItems = items.filter((item) => item.src);

  const clampScroll = useCallback((value: number) => {
    const track = trackRef.current;
    if (!track) return value;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    return Math.max(0, Math.min(value, maxScroll));
  }, []);

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current) {
      window.cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  }, []);

  const writeScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      const currentTrack = trackRef.current;

      if (currentTrack) {
        currentTrack.scrollLeft =
          targetScrollLeftRef.current;
      }

      rafRef.current = null;
    });
  }, []);

  const startMomentum = useCallback(
    (initialVelocity: number) => {
      const track = trackRef.current;
      if (!track) return;

      cancelMomentum();

      let velocity = Math.max(
        -2.2,
        Math.min(2.2, initialVelocity)
      );

      let previousTime = performance.now();

      const step = (time: number) => {
        const currentTrack = trackRef.current;
        if (!currentTrack) return;

        const deltaTime = Math.min(
          32,
          time - previousTime
        );

        previousTime = time;

        if (Math.abs(velocity) < 0.015) {
          momentumRef.current = null;
          return;
        }

        const nextScrollLeft = clampScroll(
          currentTrack.scrollLeft + velocity * deltaTime
        );

        const hitEdge =
          nextScrollLeft === 0 ||
          nextScrollLeft ===
            currentTrack.scrollWidth -
              currentTrack.clientWidth;

        currentTrack.scrollLeft = nextScrollLeft;
        velocity *= Math.pow(0.92, deltaTime / 16.67);

        if (hitEdge) {
          velocity *= 0.35;
        }

        momentumRef.current =
          window.requestAnimationFrame(step);
      };

      momentumRef.current =
        window.requestAnimationFrame(step);
    },
    [cancelMomentum, clampScroll]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || !items.length) return;

      cancelMomentum();

      const safeIndex =
        (index + items.length) % items.length;

      const card = cardRefs.current[safeIndex];
      if (!card) return;

      const left = clampScroll(
        card.offsetLeft -
          (track.clientWidth - card.clientWidth) / 2
      );

      setActiveIndex(safeIndex);

      track.scrollTo({
        left,
        behavior: "smooth",
      });
    },
    [cancelMomentum, clampScroll, items.length]
  );

  const openLightboxByItem = useCallback(
    (item: DraftReelItem) => {
      if (!item.src) return;

      const index = lightboxItems.findIndex(
        (lightboxItem) => lightboxItem.src === item.src
      );

      if (index === -1) return;

      setLightboxIndex(index);
    },
    [lightboxItems]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const updateActiveIndex = () => {
      const center =
        track.scrollLeft + track.clientWidth / 2;

      let nearestIndex = 0;
      let nearestDistance =
        Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const cardCenter =
          card.offsetLeft + card.clientWidth / 2;

        const distance = Math.abs(
          center - cardCenter
        );

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
      frame = 0;
    };

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(
        updateActiveIndex
      );
    };

    track.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    updateActiveIndex();

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items.length]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      cancelMomentum();
    };
  }, [cancelMomentum]);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    cancelMomentum();

    const target = event.target as HTMLElement;

    const card = target.closest(
      "[data-reel-index]"
    ) as HTMLElement | null;

    const cardIndex = card?.dataset.reelIndex
      ? Number(card.dataset.reelIndex)
      : null;

    downIndexRef.current =
      typeof cardIndex === "number" &&
      Number.isFinite(cardIndex)
        ? cardIndex
        : null;

    pointerIdRef.current = event.pointerId;
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    scrollLeftRef.current = track.scrollLeft;
    targetScrollLeftRef.current = track.scrollLeft;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    movedRef.current = false;
    draggingRef.current = true;

    setIsDragging(true);

    track.style.scrollBehavior = "auto";
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (
      !track ||
      !draggingRef.current ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const distanceX =
      event.clientX - pointerStartXRef.current;

    const distanceY =
      event.clientY - pointerStartYRef.current;

    const absX = Math.abs(distanceX);
    const absY = Math.abs(distanceY);

    if (absX > 3 && absX > absY) {
      movedRef.current = true;
      event.preventDefault();

      targetScrollLeftRef.current = clampScroll(
        scrollLeftRef.current - distanceX
      );

      writeScroll();

      const now = performance.now();
      const deltaTime = now - lastTimeRef.current;

      if (deltaTime > 0) {
        velocityRef.current =
          -(event.clientX - lastXRef.current) /
          deltaTime;
      }

      lastXRef.current = event.clientX;
      lastTimeRef.current = now;
    }
  };

  const handlePointerEnd = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (
      !track ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    draggingRef.current = false;
    pointerIdRef.current = null;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    track.style.scrollBehavior = "";

    const wasMoved = movedRef.current;
    const clickedIndex = downIndexRef.current;

    setIsDragging(false);

    if (!wasMoved && clickedIndex !== null) {
      const item = items[clickedIndex];
      openLightboxByItem(item);
      return;
    }

    if (wasMoved) {
      startMomentum(velocityRef.current);
    }

    window.setTimeout(() => {
      movedRef.current = false;
    }, 120);
  };

  const handleCardKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    item: DraftReelItem
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();
    openLightboxByItem(item);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={`
          flex
          gap-5

          overflow-x-auto

          pr-10
          pt-3
          pb-10

          select-none
          touch-pan-y

          [scrollbar-width:none]
          [-ms-overflow-style:none]

          [&::-webkit-scrollbar]:hidden

          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black calc(100% - 32px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black calc(100% - 32px), transparent 100%)",
        }}
      >
        {items.map((item, index) => {
          const canOpen = Boolean(item.src);

          return (
            <div
              key={`${item.label}-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-reel-index={index}
              role={canOpen ? "button" : undefined}
              tabIndex={canOpen ? 0 : undefined}
              onKeyDown={(event) =>
                handleCardKeyDown(event, item)
              }
              className={`
                group
                relative
                block
                flex-shrink-0
                text-left
                outline-none
                ${canOpen ? "cursor-pointer" : "cursor-grab"}
              `}
              aria-label={
                canOpen ? `Open ${item.alt}` : item.alt
              }
            >
              <DraftImageBlock
                label={item.label}
                ratio={
                  item.width && item.height
                    ? "auto"
                    : index === 0
                      ? "tall"
                      : "portrait"
                }
                width={item.width}
                height={item.height}
                src={item.src}
                alt={item.alt}
                interactive={canOpen}
              />
            </div>
          );
        })}
      </div>

      {items.length > 1 && (
        <ReelControls
          activeIndex={activeIndex}
          total={items.length}
          onPrevious={() =>
            scrollToIndex(activeIndex - 1)
          }
          onNext={() =>
            scrollToIndex(activeIndex + 1)
          }
        />
      )}

      {lightboxIndex !== null && (
        <DraftLightbox
          title={title}
          items={lightboxItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function ReelControls({
  activeIndex,
  total,
  onPrevious,
  onNext,
}: {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-1 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-500 transition-all duration-300 hover:-translate-x-0.5 hover:border-black hover:text-black"
        aria-label="Previous slide"
      >
        ←
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
        <div
          className="hidden items-center gap-1.5 md:flex"
          aria-hidden="true"
        >
          {Array.from({ length: total }).map(
            (_, index) => (
              <span
                key={index}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    activeIndex === index
                      ? "w-6 bg-black"
                      : "w-1.5 bg-gray-300"
                  }
                `}
              />
            )
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[11px] text-gray-400"
          >
            ↔
          </span>

          <span>Swipe or drag to browse</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-500 transition-all duration-300 hover:translate-x-0.5 hover:border-black hover:text-black"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}

function DraftLightbox({
  title,
  items,
  startIndex,
  onClose,
}: {
  title: string;
  items: DraftReelItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] =
    useState(startIndex);

  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);

  const activeItem = items[activeIndex];

  const goToPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? items.length - 1
        : currentIndex - 1
    );
  }, [items.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === items.length - 1
        ? 0
        : currentIndex + 1
    );
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [goToNext, goToPrevious, onClose]);

  const handleStagePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handleStagePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const distanceX =
      event.clientX - pointerStartXRef.current;

    const distanceY =
      event.clientY - pointerStartYRef.current;

    if (
      Math.abs(distanceX) > 60 &&
      Math.abs(distanceX) > Math.abs(distanceY)
    ) {
      if (distanceX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  if (!mounted || !activeItem?.src) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition duration-300 hover:bg-white hover:text-black"
        aria-label="Close lightbox"
      >
        ×
      </button>

      <div className="absolute left-5 top-5 z-30 max-w-[70vw] pr-16">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          {title}
        </p>

        <p className="mt-2 text-sm text-white/80">
          {activeItem.caption ?? activeItem.label}
        </p>
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:bg-white hover:text-black md:flex"
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:bg-white hover:text-black md:flex"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div
        onPointerDown={handleStagePointerDown}
        onPointerUp={handleStagePointerUp}
        className="flex h-full w-full cursor-grab items-center justify-center px-4 py-24 active:cursor-grabbing md:px-16"
      >
        <div className="relative h-full w-full max-w-7xl">
          <Image
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="100vw"
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4 rounded-full bg-white/10 px-4 py-2 text-xs text-white/70">
        <span>
          {activeIndex + 1} / {items.length}
        </span>

        <span className="hidden text-white/40 sm:inline">
          Drag, swipe or use arrow keys
        </span>
      </div>
    </div>,
    document.body
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
  width,
  height,
  interactive = false,
}: {
  label: string;
  ratio: "hero" | "wide" | "portrait" | "tall" | "auto";
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  interactive?: boolean;
}) {
  const ratioClass = {
    hero: "aspect-[16/9] w-full",
    wide: "aspect-[16/10] w-full",
    portrait:
      "aspect-[4/5] w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[38vw] xl:w-[430px]",
    tall:
      "aspect-[3/4] w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[38vw] xl:w-[430px]",
    auto:
      "w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[42vw] xl:w-[560px]",
  }[ratio];

  const aspectRatio =
    width && height ? `${width} / ${height}` : undefined;

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-gray-100
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          src
            ? `
              border
              border-gray-100
              shadow-[0_3px_10px_rgba(0,0,0,0.025)]
              group-hover:shadow-[0_5px_14px_rgba(0,0,0,0.04)]
            `
            : ""
        }
        ${ratioClass}
      `}
      style={{ aspectRatio }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? label}
            fill
            draggable={false}
            sizes="
              (max-width: 640px) 82vw,
              (max-width: 1024px) 58vw,
              560px
            "
            className="object-contain transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.006]"
          />

          {interactive && (
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/80 text-sm text-black opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden"
            >
              ↗
            </span>
          )}
        </>
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