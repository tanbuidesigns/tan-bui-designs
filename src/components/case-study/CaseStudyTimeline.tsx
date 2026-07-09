"use client";

import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyTimelineProps = {
  items: TimelineItem[];
};

type TimelineItem = {
  phase?: string;
  title?: string;
  description?: string;
  content?: string;
};

export default function CaseStudyTimeline({
  items,
}: CaseStudyTimelineProps) {
  return (
    <Reveal>
      <section className="mx-auto max-w-6xl border-t border-gray-100 px-8 py-20">
        <AnimatedLabel className="mb-12">
          Timeline
        </AnimatedLabel>

        <div className="relative">
          <div
            aria-hidden="true"
            className="
              absolute
              bottom-2
              left-[0.7rem]
              top-2
              w-px
              bg-gray-200

              md:left-[0.8rem]
            "
          />

          <div className="space-y-12">
            {items.map((item, index) => (
              <TimelineRow
                key={`${item.phase ?? "phase"}-${item.title ?? index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function TimelineRow({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.82,
        rootMargin: "0px 0px -35% 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const isHighlighted = isActive || isHovered;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative
        grid
        gap-6
        pl-12

        md:grid-cols-[0.35fr_1fr]
        md:gap-12
        md:pl-14
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          top-1
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          bg-white
        "
      >
        <span
          className="
            absolute
            h-6
            w-6
            rounded-full
            border
            border-gray-200
            bg-white
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            transform: isHighlighted
              ? "scale(1.35)"
              : "scale(1)",
            opacity: isHighlighted ? 0.18 : 1,
            backgroundImage: isHighlighted
              ? "var(--tbds-accent-gradient)"
              : undefined,
            borderColor: isHighlighted
              ? "transparent"
              : undefined,
          }}
        />

        <span
          className="
            relative
            h-3
            w-3
            rounded-full
            bg-gray-300
            transition-all
            duration-700
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
          style={{
            backgroundImage: isHighlighted
              ? "var(--tbds-accent-gradient)"
              : undefined,
            transform: isHighlighted
              ? "scale(1.15)"
              : "scale(1)",
            boxShadow: isHighlighted
              ? "0 0 24px rgba(99,102,241,0.45)"
              : undefined,
          }}
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          {item.phase ?? `Step ${index + 1}`}
        </p>
      </div>

      <div
        className="
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
        style={{
          transform: isHighlighted
            ? "translateY(0)"
            : "translateY(8px)",
          opacity: isHighlighted ? 1 : 0.72,
        }}
      >
        {item.title && (
          <h3 className="text-2xl font-semibold leading-tight text-black">
            {item.title}
          </h3>
        )}

        {(item.description || item.content) && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-gray-600">
            {item.description ?? item.content}
          </p>
        )}
      </div>
    </div>
  );
}