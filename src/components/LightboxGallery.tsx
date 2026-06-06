"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function LightboxGallery({ images, title }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const close = () => setSelected(null);

  const next = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const previous = () => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selected === null) return;

      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const handleTouchEnd = (touchEnd: number) => {
    if (touchStart === null) return;

    const difference = touchStart - touchEnd;

    if (difference > 50) next();
    if (difference < -50) previous();

    setTouchStart(null);
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelected(index)}
            className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition duration-500"
            />
          </button>
        ))}
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8 transition-opacity duration-300"
          onClick={close}
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            className="absolute left-6 text-white text-5xl z-10"
            aria-label="Previous image"
          >
            ←
          </button>

          <div
            className="relative w-full max-w-6xl aspect-[16/9]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selected]}
              alt={title}
              fill
              className="object-contain"
              priority
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
              {selected + 1} / {images.length}
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-6 text-white text-5xl z-10"
            aria-label="Next image"
          >
            →
          </button>

          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 text-white text-4xl z-10"
            aria-label="Close gallery"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}