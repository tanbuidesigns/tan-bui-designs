"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PointerEvent } from "react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { projects } from "@/data/projects";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

type FeaturedWorkSectionProps = {
  showHeading?: boolean;
};

type FeaturedProject = {
  title: string;
  slug: string;
  href: string;
  category: string;
  image: string;
  featuredImages?: string[];
  result: string;
};

type GestureDirection = "horizontal" | "vertical" | null;

export default function FeaturedWorkSection({
  showHeading = true,
}: FeaturedWorkSectionProps) {
  return (
    <Section
      spacing={showHeading ? "editorial" : "none"}
      borderTop={showHeading}
    >
      <Container size="lg">
        {showHeading && (
          <Reveal>
            <div className="mb-14 md:mb-16 lg:mb-20">
              <AnimatedLabel className="mb-4">
                SELECTED WORK
              </AnimatedLabel>

              <AnimatedHeadline className="max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
                Projects with purpose
              </AnimatedHeadline>

              <GradientLine size="md" className="mt-8" />
            </div>
          </Reveal>
        )}

        <div
          className={`
            grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-8 2xl:gap-10
            ${showHeading ? "" : "pb-20 md:pb-24 lg:pb-32"}
          `}
        >
          {(projects as FeaturedProject[]).map(
            (project, index) => (
              <Reveal
                key={project.slug}
                delay={index * 120}
                once
              >
                <FeaturedWorkCard project={project} />
              </Reveal>
            )
          )}
        </div>
      </Container>
    </Section>
  );
}

function FeaturedWorkCard({
  project,
}: {
  project: FeaturedProject;
}) {
  const featuredImages =
    project.featuredImages && project.featuredImages.length > 0
      ? project.featuredImages
      : [project.image];

  const cardImages =
    featuredImages.length >= 3
      ? featuredImages.slice(0, 3)
      : [
          ...featuredImages,
          ...featuredImages,
          ...featuredImages,
        ].slice(0, 3);

  return (
    <article
      data-homepage-scroll-hover
      className="
        group block h-full overflow-hidden rounded-[1.35rem]
        border border-gray-200 bg-white
        shadow-[0_18px_60px_rgba(0,0,0,0.035)]
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1 hover:border-black hover:shadow-[0_26px_80px_rgba(0,0,0,0.075)]
        data-[scroll-hover-playing=true]:-translate-y-1 data-[scroll-hover-playing=true]:border-black
        data-[scroll-hover-playing=true]:shadow-[0_26px_80px_rgba(0,0,0,0.075)]
      "
    >
      <FeaturedImageSlider
        projectTitle={project.title}
        projectSlug={project.slug}
        href={project.href}
        images={cardImages}
      />

      <div className="flex h-full flex-col p-6 sm:p-7 md:p-8">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-500 transition-colors duration-300 group-hover:text-gray-700 sm:text-sm">
          {project.category}
        </p>

        <Link
          href={project.href}
          className="inline-block max-w-max text-2xl font-semibold leading-tight transition-colors duration-300 hover:text-gray-600"
        >
          {project.title}
        </Link>

        <p className="mt-4 leading-relaxed text-gray-600">
          {project.result}
        </p>

        <Link
          href={project.href}
          className="mt-7 inline-flex max-w-max items-center gap-2 text-sm font-medium text-black transition-all duration-300 hover:translate-x-1"
        >
          View case study
          <span aria-hidden="true">→</span>
        </Link>

        <GradientLine
          size="md"
          className="mt-8 w-28 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-40"
        />
      </div>
    </article>
  );
}

function FeaturedImageSlider({
  projectTitle,
  projectSlug,
  href,
  images,
}: {
  projectTitle: string;
  projectSlug: string;
  href: string;
  images: string[];
}) {
  const router = useRouter();

  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const movedRef = useRef(false);
  const interactedRef = useRef(false);
  const gestureDirectionRef =
    useRef<GestureDirection>(null);

  const safeImages = useMemo(() => {
    return images.length > 0 ? images : [];
  }, [images]);

  const [orderedImages, setOrderedImages] =
    useState<string[]>(safeImages);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hintReady, setHintReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const totalImages = orderedImages.length;
  const isFirstImage = activeIndex === 0;
  const isLastImage = activeIndex === totalImages - 1;

  useEffect(() => {
    if (safeImages.length <= 1) {
      setOrderedImages(safeImages);
      setActiveIndex(0);
      return;
    }

    const shuffledImages = shuffleImages(safeImages);

    setOrderedImages(shuffledImages);
    setActiveIndex(0);
  }, [safeImages]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setHintReady(true);
    }, 10000);

    return () => window.clearTimeout(timeout);
  }, []);

  const markInteracted = () => {
    interactedRef.current = true;
    setHasInteracted(true);
  };

  const goToPrevious = () => {
    if (totalImages <= 1 || isFirstImage) return;

    markInteracted();
    setActiveIndex((currentIndex) =>
      Math.max(0, currentIndex - 1)
    );
  };

  const goToNext = () => {
    if (totalImages <= 1 || isLastImage) return;

    markInteracted();
    setActiveIndex((currentIndex) =>
      Math.min(totalImages - 1, currentIndex + 1)
    );
  };

  const handleMouseEnter = () => {
    if (
      totalImages <= 1 ||
      !hintReady ||
      interactedRef.current ||
      isLastImage
    ) {
      return;
    }

    goToNext();
  };

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    movedRef.current = false;
    gestureDirectionRef.current = null;

    setIsDragging(true);
    setDragOffset(0);

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const distanceX = event.clientX - startXRef.current;
    const distanceY = event.clientY - startYRef.current;

    const absX = Math.abs(distanceX);
    const absY = Math.abs(distanceY);

    if (!gestureDirectionRef.current) {
      if (absY > 8 && absY > absX) {
        gestureDirectionRef.current = "vertical";
        movedRef.current = true;
        setIsDragging(false);
        setDragOffset(0);
        return;
      }

      if (absX > 4 && absX > absY) {
        gestureDirectionRef.current = "horizontal";
      }
    }

    if (gestureDirectionRef.current === "vertical") {
      movedRef.current = true;
      setDragOffset(0);
      return;
    }

    if (gestureDirectionRef.current === "horizontal") {
      movedRef.current = true;
      markInteracted();
      event.preventDefault();

      const pullingPastStart = isFirstImage && distanceX > 0;
      const pullingPastEnd = isLastImage && distanceX < 0;

      const resistance =
        pullingPastStart || pullingPastEnd ? 0.25 : 1;

      const softenedOffset = Math.max(
        -120,
        Math.min(120, distanceX * resistance)
      );

      setDragOffset(softenedOffset);
    }
  };

  const handlePointerEnd = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    const distanceX = event.clientX - startXRef.current;
    const distanceY = event.clientY - startYRef.current;

    const absX = Math.abs(distanceX);
    const absY = Math.abs(distanceY);

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }

    const gestureDirection = gestureDirectionRef.current;

    pointerIdRef.current = null;
    gestureDirectionRef.current = null;

    setIsDragging(false);
    setDragOffset(0);

    const isHorizontalSwipe =
      gestureDirection === "horizontal" &&
      absX > 48 &&
      absX > absY;

    const isVerticalScroll =
      gestureDirection === "vertical" ||
      (absY > 8 && absY > absX);

    if (isVerticalScroll) {
      movedRef.current = false;
      return;
    }

    if (isHorizontalSwipe) {
      markInteracted();

      if (distanceX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }

      movedRef.current = false;
      return;
    }

    const movedEnoughToCancelClick =
      absX > 8 || absY > 8 || movedRef.current;

    if (!movedEnoughToCancelClick) {
      router.push(href);
    }

    movedRef.current = false;
  };

  if (!orderedImages.length) {
    return null;
  }

  const trackTransform = `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="
        relative aspect-[4/5] overflow-hidden border-b border-gray-200 bg-gray-100
        sm:aspect-[4/3]
      "
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open ${projectTitle} case study`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();
            router.push(href);
          }
        }}
        className="
          relative h-full w-full cursor-pointer touch-pan-y select-none overflow-hidden outline-none
          focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
        "
      >
        <div
          className="flex h-full w-full will-change-transform"
          style={{
            transform: trackTransform,
            transition: isDragging
              ? "none"
              : "transform 650ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {orderedImages.map((image, imageIndex) => (
            <div
              key={`${projectSlug}-${imageIndex}-${image}`}
              className="relative h-full w-full flex-shrink-0 overflow-hidden bg-gray-100"
            >
              <Image
                src={image}
                alt={`${projectTitle} featured image ${imageIndex + 1}`}
                fill
                sizes="
                  (max-width: 640px) calc(100vw - 40px),
                  (max-width: 1024px) calc(100vw - 64px),
                  (max-width: 1536px) 50vw,
                  576px
                "
                priority={imageIndex === activeIndex}
                draggable={false}
                className="
                  object-cover scale-100
                  transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:scale-[1.035]
                  group-data-[scroll-hover-playing=true]:scale-[1.035]
                "
              />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5"
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-x-0 bottom-0 h-24
          bg-gradient-to-t from-black/[0.10] to-transparent
          opacity-0 transition-opacity duration-500 group-hover:opacity-100
          group-data-[scroll-hover-playing=true]:opacity-100
        "
      />

      {totalImages > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            disabled={isFirstImage}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToPrevious();
            }}
            className="
              flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm text-black shadow-sm backdrop-blur-md
              transition-all duration-300 hover:scale-105 hover:bg-white
              disabled:pointer-events-none disabled:opacity-35
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
            "
            aria-label={`Previous ${projectTitle} featured image`}
          >
            ←
          </button>

          <button
            type="button"
            disabled={isLastImage}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              goToNext();
            }}
            className="
              flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-sm text-black shadow-sm backdrop-blur-md
              transition-all duration-300 hover:scale-105 hover:bg-white
              disabled:pointer-events-none disabled:opacity-35
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black
            "
            aria-label={`Next ${projectTitle} featured image`}
          >
            →
          </button>
        </div>
      )}

      {totalImages > 1 && !hasInteracted && (
        <div
          className="
            pointer-events-none absolute bottom-4 left-4 z-20 flex items-center gap-2
            rounded-full bg-white/85 px-3 py-2 text-xs text-black shadow-sm backdrop-blur-md
            transition-opacity duration-500 group-hover:opacity-0
            group-data-[scroll-hover-playing=true]:opacity-0
          "
        >
          <span aria-hidden="true">↔</span>
          <span>Swipe</span>
        </div>
      )}
    </div>
  );
}

function shuffleImages(images: string[]) {
  const shuffledImages = [...images];

  for (
    let index = shuffledImages.length - 1;
    index > 0;
    index -= 1
  ) {
    const randomIndex = Math.floor(
      Math.random() * (index + 1)
    );

    const currentImage = shuffledImages[index];
    shuffledImages[index] = shuffledImages[randomIndex];
    shuffledImages[randomIndex] = currentImage;
  }

  return shuffledImages;
}
