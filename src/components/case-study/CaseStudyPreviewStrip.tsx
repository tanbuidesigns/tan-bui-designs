"use client";

import Image from "next/image";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type PreviewItem = {
  src: string;
  alt: string;
};

type CaseStudyPreviewStripProps = {
  title?: string;
  items: PreviewItem[];
};

export default function CaseStudyPreviewStrip({
  title = "PROJECT HIGHLIGHTS",
  items,
}: CaseStudyPreviewStripProps) {
  if (!items.length) return null;

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="mb-8">
          <AnimatedLabel>
            {title}
          </AnimatedLabel>
        </div>

        <div
          className="
            flex
            gap-4

            overflow-x-auto

            snap-x
            snap-mandatory

            pb-4

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
        >
          {items.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="
                group

                relative

                w-[220px]
                md:w-[280px]

                aspect-[4/3]

                flex-shrink-0

                snap-start

                overflow-hidden

                bg-gray-100

                cursor-pointer
              "
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width:768px) 220px, 280px"
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
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}