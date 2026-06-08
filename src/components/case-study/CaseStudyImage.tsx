"use client";

import Image from "next/image";

import Reveal from "@/components/Reveal";

type CaseStudyImageProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
};

export default function CaseStudyImage({
  src,
  alt,
  caption,
  priority = false,
}: CaseStudyImageProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {caption && (
          <p className="mt-4 text-sm text-gray-500">
            {caption}
          </p>
        )}
      </section>
    </Reveal>
  );
}