"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

import CaseStudyLightbox, {
  CaseStudyGalleryItem,
} from "@/components/case-study/CaseStudyLightbox";

type ProcessedGalleryItem = CaseStudyGalleryItem & {
  ratio: number;
};

type CaseStudyGalleryProps = {
  title?: string;
  items: CaseStudyGalleryItem[];
  id?: string;
};

export default function CaseStudyGallery({
  title = "PROJECT GALLERY",
  items,
  id,
}: CaseStudyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const [processedItems, setProcessedItems] =
    useState<ProcessedGalleryItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadImageRatios() {
      const results = await Promise.all(
        items.map(
          (item) =>
            new Promise<ProcessedGalleryItem>((resolve) => {
              const image = document.createElement("img");

              image.src = item.src;

              image.onload = () => {
                resolve({
                  ...item,
                  ratio:
                    image.naturalWidth /
                    image.naturalHeight,
                });
              };

              image.onerror = () => {
                resolve({
                  ...item,
                  ratio: 1,
                });
              };
            })
        )
      );

      if (active) {
        setProcessedItems(results);
      }
    }

    loadImageRatios();

    return () => {
      active = false;
    };
  }, [items]);

  const getCardWidth = (ratio: number) => {
    if (ratio < 0.75) {
      return "w-[220px] md:w-[260px]";
    }

    if (ratio < 1) {
      return "w-[280px] md:w-[340px]";
    }

    if (ratio > 2) {
      return "w-[560px] md:w-[720px]";
    }

    if (ratio > 1.45) {
      return "w-[440px] md:w-[560px]";
    }

    return "w-[320px] md:w-[400px]";
  };

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
        <div className="mb-16">
          <AnimatedLabel>
            {title}
          </AnimatedLabel>
        </div>

        <div
          className="
            flex
            gap-6

            overflow-x-auto

            pb-6

            snap-x
            snap-mandatory

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
        >
          {processedItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() =>
                setLightboxIndex(index)
              }
              className={`
                group
                flex-shrink-0
                snap-start
                overflow-hidden

                ${getCardWidth(item.ratio)}
              `}
            >
              <div
                className="
                  relative
                  w-full
                  overflow-hidden
                  bg-gray-100
                "
                style={{
                  aspectRatio: item.ratio,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width:768px) 80vw, 500px"
                  loading="lazy"
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
              </div>
            </button>
          ))}
        </div>

        {lightboxIndex !== null && (
          <CaseStudyLightbox
            title={title}
            items={processedItems}
            startIndex={lightboxIndex}
            onClose={() =>
              setLightboxIndex(null)
            }
          />
        )}
      </section>
    </Reveal>
  );
}