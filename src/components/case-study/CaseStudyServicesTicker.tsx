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

const DEFAULT_HOLD_TIME = 2200;
const DEFAULT_TRANSITION_TIME = 860;

type Movement =
  | "auto"
  | "manual-left"
  | "manual-right"
  | "manual-return"
  | null;

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

  const visiblePills = [-2, -1, 0, 1, 2].map((offset) => ({
    offset,
    service: getService(offset),
  }));

  const movementTransform =
    movement === "auto" || movement === "manual-left"
      ? "translateX(calc(-50% - var(--service-pill-step)))"
      : movement === "manual-right"
        ? "translateX(calc(-50% + var(--service-pill-step)))"
        : "translateX(-50%)";

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

    if (movement === "auto" || movement === "manual-left") {
      setCurrentIndex((index) => (index + 1) % cleanServices.length);
    } else if (movement === "manual-right") {
      setCurrentIndex(
        (index) => (index - 1 + cleanServices.length) % cleanServices.length
      );
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
      if (Math.abs(deltaX) <= Math.abs(deltaY) * 1.15) {
        pointerIdRef.current = null;
        resetTrack();
        return;
      }
      dragEstablishedRef.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    const offset = Math.max(-160, Math.min(160, deltaX));
    dragOffsetRef.current = offset;
    trackRef.current.style.transform = `translateX(calc(-50% + ${offset}px))`;
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
      if (offset <= -44) {
        setCurrentIndex((index) => (index + 1) % cleanServices.length);
      } else if (offset >= 44) {
        setCurrentIndex(
          (index) => (index - 1 + cleanServices.length) % cleanServices.length
        );
      }
      resetTrack();
      return;
    }

    setTransitionEnabled(true);
    if (offset <= -44) {
      setMovement("manual-left");
    } else if (offset >= 44) {
      setMovement("manual-right");
    } else {
      setMovement("manual-return");
      trackRef.current?.style.setProperty(
        "transform",
        "translateX(-50%)"
      );
    }
  };

  const activeOffset =
    movement === "auto" || movement === "manual-left"
      ? 1
      : movement === "manual-right"
        ? -1
        : 0;

  return (
    <section
      id={id}
      className="mx-auto max-w-6xl scroll-mt-40 border-t border-gray-100 px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
        <div>
          <AnimatedLabel className="mb-8">{title}</AnimatedLabel>
          <p className="max-w-2xl text-xl leading-relaxed text-gray-600">
            {intro}
          </p>
        </div>

        <div
          className="relative min-w-0 overflow-hidden px-3 py-8 sm:px-5 sm:py-10"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 18%, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 18%, black 82%, rgba(0,0,0,0.4) 92%, transparent 100%)",
          }}
        >
          <div
            className="relative h-16 touch-pan-y select-none sm:h-[4.5rem]"
            aria-label="Project services. Swipe horizontally on the service pills to browse."
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointer}
            onPointerCancel={finishPointer}
          >
            <div
              ref={trackRef}
              className="absolute left-1/2 top-0 flex h-full items-center gap-[var(--service-pill-gap)] [--service-pill-gap:0.75rem] [--service-pill-step:calc(var(--service-pill-width)+var(--service-pill-gap))] [--service-pill-width:clamp(10.75rem,48vw,17rem)] sm:[--service-pill-gap:0.95rem] sm:[--service-pill-width:clamp(12rem,26vw,18rem)]"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: movementTransform,
                transition:
                  transitionEnabled && !reducedMotion
                    ? `transform ${movement === "auto" ? transitionTime : 560}ms cubic-bezier(0.2,0.82,0.24,1)`
                    : "none",
              }}
            >
              {visiblePills.map((pill) => {
                const isMiddle = pill.offset === activeOffset;

                return (
                  <div
                    key={`${pill.offset}-${pill.service}-${currentIndex}`}
                    className={`flex h-12 w-[var(--service-pill-width)] shrink-0 items-center justify-center rounded-full border px-5 text-center transition-[background-color,border-color,box-shadow,color,opacity,transform] duration-500 sm:h-14 sm:px-6 ${
                      isMiddle
                        ? "scale-100 border-transparent text-gray-950 opacity-100 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
                        : "scale-[0.965] border-gray-100 bg-white/95 text-gray-500 opacity-80"
                    }`}
                    style={
                      isMiddle
                        ? { background: "var(--tbds-accent-gradient)" }
                        : undefined
                    }
                    aria-hidden={!isMiddle}
                  >
                    <span className="text-sm font-semibold leading-tight tracking-[-0.02em] sm:text-base">
                      {pill.service}
                    </span>
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
