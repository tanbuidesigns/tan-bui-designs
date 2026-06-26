"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

import CaseStudyLightbox, {
  CaseStudyGalleryItem,
} from "@/components/case-study/CaseStudyLightbox";

type CaseStudyGalleryProps = {
  title?: string;
  items: CaseStudyGalleryItem[];
  id?: string;
};

const AUTO_PLAY_DELAY = 4500;
const GALLERY_ASPECT_RATIO = "1705 / 1136";

export default function CaseStudyGallery({
  title = "PROJECT GALLERY",
  items,
  id,
}: CaseStudyGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hasMultipleItems = items.length > 1;

  const scrollToIndex = useCallback(
    (targetIndex: number) => {
      const track = trackRef.current;

      if (!track || !items.length) return;

      const safeIndex =
        ((targetIndex % items.length) + items.length) % items.length;

      const target = track.children.item(safeIndex) as HTMLElement | null;

      if (!target) return;

      const targetLeft = target.offsetLeft - track.offsetLeft;

      track.scrollTo({
        left: targetLeft,
        behavior: "smooth",
      });

      setActiveIndex(safeIndex);
    },
    [items.length]
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const updateActiveIndex = () => {
      const children = Array.from(track.children) as HTMLElement[];

      if (!children.length) return;

      let closestIndex = 0;
      let closestDistance = Infinity;

      children.forEach((child, index) => {
        const childLeft = child.offsetLeft - track.offsetLeft;
        const distance = Math.abs(childLeft - track.scrollLeft);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    track.addEventListener("scroll", updateActiveIndex, {
      passive: true,
    });

    updateActiveIndex();

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
    };
  }, [items.length]);

  useEffect(() => {
    if (!hasMultipleItems || isPaused || lightboxIndex !== null) return;

    const timer = window.setInterval(() => {
      scrollToIndex(activeIndex + 1);
    }, AUTO_PLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    activeIndex,
    hasMultipleItems,
    isPaused,
    lightboxIndex,
    scrollToIndex,
  ]);

  if (!items.length) return null;

  return (
    <Reveal>
      <section
        id={id}
        className="
          max-w-6xl
          mx-auto
          px-8
          py-24
          scroll-mt-32
        "
      >
        <div
          className="
            mb-10
            flex
            items-end
            justify-between
            gap-6
          "
        >
          <div>
            <AnimatedLabel>
              {title}
            </AnimatedLabel>

            <p className="mt-5 max-w-xl text-gray-500 leading-relaxed">
              Swipe, scroll or use the controls to browse the project images.
              Select an image to view it full screen.
            </p>
          </div>

          {hasMultipleItems && (
            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
              "
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex - 1)}
                className="
                  h-11
                  w-11

                  border
                  border-gray-200

                  text-xl
                  leading-none

                  transition-all
                  duration-300

                  hover:border-black
                  hover:-translate-x-1
                "
                aria-label="Previous gallery image"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => scrollToIndex(activeIndex + 1)}
                className="
                  h-11
                  w-11

                  border
                  border-gray-200

                  text-xl
                  leading-none

                  transition-all
                  duration-300

                  hover:border-black
                  hover:translate-x-1
                "
                aria-label="Next gallery image"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* FADED EDGES */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              bottom-8
              z-10

              w-10
              bg-gradient-to-r
              from-white
              to-transparent

              md:w-20
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              bottom-8
              z-10

              w-10
              bg-gradient-to-l
              from-white
              to-transparent

              md:w-20
            "
          />

          <div
            ref={trackRef}
            className="
              flex
              gap-4
              sm:gap-5
              lg:gap-6

              overflow-x-auto

              pb-8

              snap-x
              snap-mandatory
              scroll-smooth

              [scrollbar-width:none]
              [-ms-overflow-style:none]

              [&::-webkit-scrollbar]:hidden
            "
          >
            {items.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                className="
                  group
                  relative
                  block
                  flex-shrink-0

                  w-[82vw]
                  sm:w-[72vw]
                  md:w-[560px]
                  lg:w-[640px]
                  xl:w-[720px]

                  snap-center
                  overflow-hidden
                  bg-gray-100

                  text-left
                "
                style={{
                  aspectRatio: GALLERY_ASPECT_RATIO,
                }}
                aria-label={`Open ${item.alt}`}
              >
                <Image
  src={item.src}
  alt={item.alt}
  fill
  sizes="
    (max-width: 640px) 82vw,
    (max-width: 1024px) 72vw,
    720px
  "
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "auto"}
  className="
    object-cover

    transition
    duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]

    group-hover:scale-105
  "
/>

                <div
                  className="
                    absolute
                    inset-0

                    bg-black/0

                    transition-all
                    duration-300

                    group-hover:bg-black/10
                  "
                />

                <div
                  className="
                    absolute
                    bottom-4
                    right-4

                    bg-white/90

                    px-3
                    py-2

                    text-xs
                    uppercase
                    tracking-[0.2em]

                    opacity-0
                    translate-y-2

                    transition-all
                    duration-300

                    group-hover:opacity-100
                    group-hover:translate-y-0
                  "
                >
                  View
                </div>
              </button>
            ))}
          </div>
        </div>

        {hasMultipleItems && (
          <div className="mt-2 flex items-center justify-center gap-2">
            {items.map((item, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={`${item.src}-dot-${index}`}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className="
                    h-2
                    rounded-full

                    transition-all
                    duration-300
                  "
                  style={{
                    width: active ? "28px" : "8px",
                    background: active
                      ? "var(--tbds-accent-gradient)"
                      : "#d1d5db",
                  }}
                  aria-label={`Go to gallery image ${index + 1}`}
                />
              );
            })}
          </div>
        )}

        {lightboxIndex !== null && (
          <CaseStudyLightbox
            title={title}
            items={items}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </section>
    </Reveal>
  );
}