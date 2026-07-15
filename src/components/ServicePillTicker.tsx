"use client";

import { useEffect, useRef } from "react";

type ServicePillTickerProps = {
  items: readonly string[];
};

export default function ServicePillTicker({ items }: ServicePillTickerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;
    let resumeTimer: number | undefined;
    let lastTimestamp: number | null = null;
    let position = viewport.scrollLeft;
    let maximumOffset = 0;
    let direction: 1 | -1 = 1;
    let inView = false;
    let interacting = false;

    const shouldAnimate = () =>
      inView &&
      !document.hidden &&
      !reducedMotion.matches &&
      !interacting &&
      maximumOffset > 0;

    const animate = (timestamp: number) => {
      frame = null;
      if (!shouldAnimate()) {
        lastTimestamp = null;
        return;
      }

      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsed = Math.min(64, timestamp - lastTimestamp);
      lastTimestamp = timestamp;
      position += direction * (elapsed / 1000) * 24;

      if (position >= maximumOffset) {
        position = maximumOffset;
        direction = -1;
      } else if (position <= 0) {
        position = 0;
        direction = 1;
      }

      viewport.scrollLeft = position;
      frame = window.requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      if (shouldAnimate() && frame === null) {
        lastTimestamp = null;
        frame = window.requestAnimationFrame(animate);
      } else if (!shouldAnimate() && frame !== null) {
        window.cancelAnimationFrame(frame);
        frame = null;
        lastTimestamp = null;
      }
    };

    const measure = () => {
      maximumOffset = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      position = Math.min(viewport.scrollLeft, maximumOffset);
      syncAnimation();
    };

    const scheduleResume = () => {
      if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        position = viewport.scrollLeft;
        interacting = false;
        resumeTimer = undefined;
        syncAnimation();
      }, 1100);
    };

    const pauseForInteraction = () => {
      interacting = true;
      syncAnimation();
    };

    const handlePointerDown = () => pauseForInteraction();
    const handlePointerEnd = () => scheduleResume();
    const handleWheel = () => {
      pauseForInteraction();
      scheduleResume();
    };
    const handleKeyDown = () => {
      pauseForInteraction();
      scheduleResume();
    };
    const handleScroll = () => {
      if (!interacting) return;
      position = viewport.scrollLeft;
      scheduleResume();
    };
    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        position = 0;
        direction = 1;
        viewport.scrollLeft = 0;
      }
      syncAnimation();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncAnimation();
      },
      { threshold: 0.08 }
    );
    const resizeObserver = new ResizeObserver(measure);

    intersectionObserver.observe(viewport);
    resizeObserver.observe(viewport);
    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointerup", handlePointerEnd);
    viewport.addEventListener("pointercancel", handlePointerEnd);
    viewport.addEventListener("wheel", handleWheel, { passive: true });
    viewport.addEventListener("keydown", handleKeyDown);
    viewport.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", handleMotionChange);
    measure();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      if (resumeTimer !== undefined) window.clearTimeout(resumeTimer);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointerup", handlePointerEnd);
      viewport.removeEventListener("pointercancel", handlePointerEnd);
      viewport.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("keydown", handleKeyDown);
      viewport.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", syncAnimation);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      role="region"
      aria-label="Services offered. Swipe or scroll to explore."
      tabIndex={0}
      className="overflow-x-auto py-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex w-max gap-3 pr-1">
        {[0, 1, 2].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex gap-3"
            aria-hidden={groupIndex === 0 ? undefined : "true"}
          >
            {items.map((item) => (
              <span
                key={`${groupIndex}-${item}`}
                className="inline-flex min-h-11 items-center rounded-full border border-white/14 bg-white/[0.055] px-5 text-sm font-medium text-white/70 transition-[background-color,border-color,color,transform] duration-300 hover:-translate-y-px hover:border-white/24 hover:bg-white/[0.09] hover:text-white motion-reduce:transition-none"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
