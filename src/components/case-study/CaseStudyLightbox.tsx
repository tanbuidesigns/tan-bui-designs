"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
};

type CaseStudyLightboxProps = {
  items: CaseStudyGalleryItem[];
  startIndex: number;
  title: string;
  onClose: () => void;
};

export default function CaseStudyLightbox({
  items,
  startIndex,
  title,
  onClose,
}: CaseStudyLightboxProps) {
  const [selected, setSelected] = useState(startIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentItem = items[selected];

  const next = () => {
    setSelected((selected + 1) % items.length);
  };

  const previous = () => {
    setSelected((selected - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleTouchEnd = (touchEnd: number) => {
    if (touchStart === null) return;

    const difference = touchStart - touchEnd;

    if (difference > 50) next();
    if (difference < -50) previous();

    setTouchStart(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 text-white flex items-center justify-center p-6 md:p-10"
      onClick={onClose}
      onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
      onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          previous();
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-4xl md:text-5xl z-10 opacity-70 hover:opacity-100 transition"
        aria-label="Previous image"
      >
        ←
      </button>

      <div
        className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[72vh]">
          <Image
            src={currentItem.src}
            alt={currentItem.alt || title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-6 text-center">
          {currentItem.caption && (
            <p className="text-sm md:text-base text-gray-300 mb-3">
              {currentItem.caption}
            </p>
          )}

          <p className="text-sm text-gray-400">
            {selected + 1} / {items.length}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-4xl md:text-5xl z-10 opacity-70 hover:opacity-100 transition"
        aria-label="Next image"
      >
        →
      </button>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 md:top-8 md:right-8 text-4xl z-10 opacity-70 hover:opacity-100 transition"
        aria-label="Close gallery"
      >
        ×
      </button>
    </div>
  );
}