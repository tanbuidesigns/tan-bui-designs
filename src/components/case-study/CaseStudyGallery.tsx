"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
};

export default function CaseStudyGallery({
  title = "PROJECT GALLERY",
  items,
}: CaseStudyGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [processedItems, setProcessedItems] = useState<ProcessedGalleryItem[]>(
    []
  );

  const featuredIndex = useMemo(() => {
    const index = items.findIndex((item) => item.featured);
    return index >= 0 ? index : 0;
  }, [items]);

  const featuredItem = processedItems[featuredIndex] || processedItems[0];

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
                  ratio: image.naturalWidth / image.naturalHeight,
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
    if (ratio < 0.75) return "w-[240px] md:w-[280px]";
    if (ratio < 1) return "w-[280px] md:w-[340px]";
    if (ratio > 2) return "w-[560px] md:w-[720px]";
    if (ratio > 1.45) return "w-[440px] md:w-[560px]";
    return "w-[320px] md:w-[400px]";
  };

  if (!items.length) return null;

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="mb-10">
          <AnimatedLabel>{title}</AnimatedLabel>
        </div>

        {featuredItem && (
          <button
            type="button"
            onClick={() => setLightboxIndex(featuredIndex)}
            className="group block w-full bg-gray-100 overflow-hidden mb-8"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={featuredItem.src}
                alt={featuredItem.alt}
                fill
                sizes="100vw"
                className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                priority
              />

              <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-6">
                {featuredItem.caption && (
                  <p className="text-white text-sm md:text-base bg-black/50 backdrop-blur-sm px-4 py-3 max-w-xl text-left">
                    {featuredItem.caption}
                  </p>
                )}

                <span className="ml-auto bg-white/90 text-black px-4 py-3 text-xs uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  View
                </span>
              </div>
            </div>
          </button>
        )}

        <div
          className="
            flex
            gap-6
            overflow-x-auto
            pb-5
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
              onClick={() => setLightboxIndex(index)}
              className={`
                group
                relative
                flex-shrink-0
                snap-start
                overflow-hidden
                bg-gray-100
                ${getCardWidth(item.ratio)}
              `}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: item.ratio,
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 80vw, 500px"
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

                <div className="absolute bottom-4 right-4 bg-white/90 text-black px-3 py-2 text-xs uppercase tracking-[0.2em] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  View
                </div>
              </div>

              {item.caption && (
                <p className="text-left text-sm text-gray-500 mt-3 leading-relaxed">
                  {item.caption}
                </p>
              )}
            </button>
          ))}
        </div>

        {lightboxIndex !== null && (
          <CaseStudyLightbox
            title={title}
            items={processedItems}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </section>
    </Reveal>
  );
}