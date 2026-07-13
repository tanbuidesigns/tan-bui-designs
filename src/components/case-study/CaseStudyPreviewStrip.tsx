"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const directionRef = useRef(1);
  const userHasInteractedRef = useRef(false);
  const isVisibleRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const edgePauseUntilRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const stopAnimation = () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      lastTimestampRef.current = null;
    };

    const canAnimate = () =>
      !userHasInteractedRef.current &&
      isVisibleRef.current &&
      !document.hidden &&
      !reducedMotionRef.current &&
      container.scrollWidth > container.clientWidth;

    const animate = (timestamp: number) => {
      animationFrameRef.current = null;

      if (!canAnimate()) return;

      const previousTimestamp = lastTimestampRef.current ?? timestamp;
      const deltaSeconds = Math.min(
        (timestamp - previousTimestamp) / 1000,
        0.1
      );
      const maxScrollLeft = Math.max(
        0,
        container.scrollWidth - container.clientWidth
      );

      lastTimestampRef.current = timestamp;

      if (timestamp >= edgePauseUntilRef.current) {
        const nextScrollLeft =
          container.scrollLeft +
          directionRef.current * 40 * deltaSeconds;

        if (nextScrollLeft >= maxScrollLeft) {
          container.scrollLeft = maxScrollLeft;
          directionRef.current = -1;
          edgePauseUntilRef.current = timestamp + 250;
        } else if (nextScrollLeft <= 0) {
          container.scrollLeft = 0;
          directionRef.current = 1;
          edgePauseUntilRef.current = timestamp + 250;
        } else {
          container.scrollLeft = nextScrollLeft;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (
        animationFrameRef.current === null &&
        canAnimate()
      ) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const handleReducedMotionChange = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;

      if (reducedMotionRef.current) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.1 }
    );

    const resizeObserver = new ResizeObserver(startAnimation);

    reducedMotionRef.current = reducedMotionQuery.matches;
    observer.observe(container);
    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotionQuery.addEventListener(
      "change",
      handleReducedMotionChange
    );

    return () => {
      stopAnimation();
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      reducedMotionQuery.removeEventListener(
        "change",
        handleReducedMotionChange
      );
    };
  }, []);

  const disableAutomaticScrolling = () => {
    userHasInteractedRef.current = true;
    lastTimestampRef.current = null;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const container = scrollRef.current;

    if (!container) return;

    disableAutomaticScrolling();

    if (e.pointerType !== "mouse") return;

    isDraggingRef.current = true;
    pointerIdRef.current = e.pointerId;
    dragStartX.current = e.pageX;
    dragStartScroll.current = container.scrollLeft;
    container.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const container = scrollRef.current;

    if (
      !container ||
      !isDraggingRef.current ||
      pointerIdRef.current !== e.pointerId
    ) {
      return;
    }

    const maxScrollLeft = Math.max(
      0,
      container.scrollWidth - container.clientWidth
    );
    const distance = e.pageX - dragStartX.current;

    container.scrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, dragStartScroll.current - distance)
    );
  };

  const stopDragging = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const container = scrollRef.current;

    if (
      container &&
      pointerIdRef.current === e.pointerId &&
      container.hasPointerCapture(e.pointerId)
    ) {
      container.releasePointerCapture(e.pointerId);
    }

    isDraggingRef.current = false;
    pointerIdRef.current = null;
  };

  const handleWheel = (
    e: React.WheelEvent<HTMLDivElement>
  ) => {
    const isHorizontalScroll =
      Math.abs(e.deltaX) > Math.abs(e.deltaY);
    const isShiftScroll =
      e.shiftKey && Math.abs(e.deltaY) > 0;

    if (isHorizontalScroll || isShiftScroll) {
      disableAutomaticScrolling();
    }
  };

  if (!items.length) return null;

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto py-24">
        <div className="px-8 mb-10">
          <AnimatedLabel>{title}</AnimatedLabel>
        </div>

        <div className="relative">
          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-24
              z-20
              pointer-events-none

              bg-gradient-to-r
              from-white
              to-transparent
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              bottom-0
              w-24
              z-20
              pointer-events-none

              bg-gradient-to-l
              from-white
              to-transparent
            "
          />

          <div
            ref={scrollRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onWheel={handleWheel}
            className="
              flex
              gap-8

              overflow-x-auto

              px-8
              py-4

              select-none

              cursor-default

              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {items.map((item) => (
              <div
                key={item.src}
                className="
                  relative

                  w-[260px]
                  md:w-[340px]

                  aspect-[3/4]

                  flex-shrink-0

                  rounded-2xl

                  bg-gray-50

                  border
                  border-gray-100

                  transition-all
                  duration-700
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:border-gray-200
                  hover:shadow-lg
                "
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="
                    (max-width:768px) 260px,
                    340px
                  "
                  className="
                    object-contain

                    p-4

                    transition-transform
                    duration-700

                    hover:scale-[1.03]
                  "
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
