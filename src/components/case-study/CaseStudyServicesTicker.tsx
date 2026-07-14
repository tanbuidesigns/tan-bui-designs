"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent, TransitionEvent } from "react";

import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyServicesTickerProps = {
  id?: string;
  title?: string;
  intro?: string;
  services: string[];
  holdTime?: number;
  transitionTime?: number;
};

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 3;
const DEFAULT_HOLD_TIME = 2200;
const DEFAULT_TRANSITION_TIME = 700;

type Movement = "auto" | "manual-up" | "manual-down" | "manual-return" | null;

export default function CaseStudyServicesTicker({
  id,
  title = "Services",
  intro = "A focused mix of creative, technical and production responsibilities across the project.",
  services,
  holdTime = DEFAULT_HOLD_TIME,
  transitionTime = DEFAULT_TRANSITION_TIME,
}: CaseStudyServicesTickerProps) {
  const cleanServices = useMemo(
    () =>
      services
        .map((service) =>
          service === "Curriculum Design" ? "Project Management" : service
        )
        .filter(
          (service, index, array) =>
            service.trim().length > 0 && array.indexOf(service) === index
        ),
    [services]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movement, setMovement] = useState<Movement>(null);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const dragEstablishedRef = useRef(false);
  const dragOffsetRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
    setMovement(null);
    setTransitionEnabled(true);
  }, [cleanServices.length]);

  useEffect(() => {
    if (cleanServices.length <= 1 || movement || reducedMotion) return;

    const timeout = window.setTimeout(() => {
      setTransitionEnabled(true);
      setMovement("auto");
    }, holdTime);

    return () => window.clearTimeout(timeout);
  }, [cleanServices.length, currentIndex, holdTime, movement, reducedMotion]);

  if (!cleanServices.length) return null;

  const getService = (offset: number) => {
    const index =
      (currentIndex + offset + cleanServices.length) % cleanServices.length;
    return cleanServices[index];
  };

  const visibleRows = [-2, -1, 0, 1, 2].map((offset) => ({
    offset,
    service: getService(offset),
  }));

  const baseTransform = -ITEM_HEIGHT;
  const movementTransform =
    movement === "auto" || movement === "manual-up"
      ? baseTransform - ITEM_HEIGHT
      : movement === "manual-down"
        ? baseTransform + ITEM_HEIGHT
        : baseTransform;

  const resetTrack = () => {
    setTransitionEnabled(false);
    setMovement(null);
    dragOffsetRef.current = 0;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target || !movement) return;

    if (movement === "auto" || movement === "manual-up") {
      setCurrentIndex((index) => (index + 1) % cleanServices.length);
    } else if (movement === "manual-down") {
      setCurrentIndex((index) => Math.max(0, index - 1));
    }

    resetTrack();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || cleanServices.length <= 1) return;
    pointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startYRef.current = event.clientY;
    dragEstablishedRef.current = false;
    dragOffsetRef.current = 0;
    setMovement("manual-return");
    setTransitionEnabled(false);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId || !trackRef.current) return;

    const deltaX = event.clientX - startXRef.current;
    const deltaY = event.clientY - startYRef.current;

    if (!dragEstablishedRef.current) {
      if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 7) return;
      if (Math.abs(deltaY) <= Math.abs(deltaX) * 1.15) {
        pointerIdRef.current = null;
        resetTrack();
        return;
      }
      dragEstablishedRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const minimum = currentIndex < cleanServices.length - 1 ? -ITEM_HEIGHT : 0;
    const maximum = currentIndex > 0 ? ITEM_HEIGHT : 0;
    const offset = Math.max(minimum, Math.min(maximum, deltaY));
    dragOffsetRef.current = offset;
    trackRef.current.style.transform = `translateY(${baseTransform + offset}px)`;
    event.preventDefault();
  };

  const finishPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const offset = dragOffsetRef.current;
    pointerIdRef.current = null;
    dragEstablishedRef.current = false;

    if (reducedMotion) {
      if (offset <= -18 && currentIndex < cleanServices.length - 1) {
        setCurrentIndex((index) => index + 1);
      } else if (offset >= 18 && currentIndex > 0) {
        setCurrentIndex((index) => index - 1);
      }
      resetTrack();
      return;
    }

    setTransitionEnabled(!reducedMotion);

    if (offset <= -18 && currentIndex < cleanServices.length - 1) {
      setMovement("manual-up");
    } else if (offset >= 18 && currentIndex > 0) {
      setMovement("manual-down");
    } else {
      setMovement("manual-return");
      if (trackRef.current) {
        trackRef.current.style.transition =
          "transform 420ms cubic-bezier(0.22,1,0.36,1)";
        trackRef.current.style.transform = `translateY(${baseTransform}px)`;
      }
    }
  };

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-8 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <AnimatedLabel className="mb-8">{title}</AnimatedLabel>
          <p className="max-w-2xl text-xl leading-relaxed text-gray-600">{intro}</p>
        </div>

        <div
          className="relative overflow-hidden py-8"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
          }}
        >
          <div
            className="mx-auto overflow-hidden touch-none select-none"
            style={{ height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px` }}
            aria-label="Project services. Swipe vertically on the service names to browse."
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointer}
            onPointerCancel={finishPointer}
          >
            <div
              ref={trackRef}
              className="flex flex-col"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateY(${movementTransform}px)`,
                transition:
                  transitionEnabled && !reducedMotion
                    ? `transform ${movement === "auto" ? transitionTime : 420}ms cubic-bezier(0.22,1,0.36,1)`
                    : "none",
              }}
            >
              {visibleRows.map((row) => {
                const activeOffset =
                  movement === "auto" || movement === "manual-up"
                    ? 1
                    : movement === "manual-down"
                      ? -1
                      : 0;
                const isMiddle = row.offset === activeOffset;

                return (
                  <div key={`${row.offset}-${row.service}-${currentIndex}`} className="flex items-center justify-center" style={{ height: `${ITEM_HEIGHT}px` }}>
                    <p
                      className={`text-center text-2xl font-semibold leading-none tracking-[-0.035em] transition-all duration-500 md:text-3xl ${
                        isMiddle
                          ? "scale-100 text-black opacity-100 blur-0"
                          : "scale-[0.94] text-gray-300 opacity-55 blur-[0.2px]"
                      }`}
                    >
                      {row.service}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
