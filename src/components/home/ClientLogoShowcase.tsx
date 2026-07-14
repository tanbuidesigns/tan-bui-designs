"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent, WheelEvent } from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import { homepageLogos } from "@/data/homepageLogos.generated";

import styles from "@/components/home/HomepageExperience.module.css";

type PauseState = {
  inView: boolean;
  documentVisible: boolean;
  reducedMotion: boolean;
  hover: boolean;
  focus: boolean;
  touch: boolean;
  manual: boolean;
};

type DragDirection = "horizontal" | "vertical" | null;

export default function ClientLogoShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const maximumOffsetRef = useRef(0);
  const touchTimerRef = useRef<number | null>(null);
  const manualTimerRef = useRef<number | null>(null);
  const keyboardInputRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragDirectionRef = useRef<DragDirection>(null);
  const syncAnimationRef = useRef<() => void>(() => undefined);
  const pauseStateRef = useRef<PauseState>({
    inView: false,
    documentVisible: true,
    reducedMotion: false,
    hover: false,
    focus: false,
    touch: false,
    manual: false,
  });
  const [activeLogoId, setActiveLogoId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const movementSpeed = 22;
    let animationFrame: number | null = null;
    let lastTimestamp: number | null = null;

    const shouldAnimate = () => {
      const pauseState = pauseStateRef.current;

      return (
        pauseState.inView &&
        pauseState.documentVisible &&
        !pauseState.reducedMotion &&
        !pauseState.hover &&
        !pauseState.focus &&
        !pauseState.touch &&
        !pauseState.manual &&
        maximumOffsetRef.current > 0
      );
    };

    const renderPosition = () => {
      viewport.scrollLeft = positionRef.current;
    };

    const animate = (timestamp: number) => {
      animationFrame = null;

      if (!shouldAnimate()) {
        lastTimestamp = null;
        return;
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const elapsedSeconds = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
      const maximumOffset = maximumOffsetRef.current;

      lastTimestamp = timestamp;
      positionRef.current += directionRef.current * movementSpeed * elapsedSeconds;

      if (positionRef.current >= maximumOffset) {
        positionRef.current = maximumOffset;
        directionRef.current = -1;
      } else if (positionRef.current <= 0) {
        positionRef.current = 0;
        directionRef.current = 1;
      }

      renderPosition();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const syncAnimation = () => {
      if (shouldAnimate()) {
        if (animationFrame === null) {
          lastTimestamp = null;
          animationFrame = window.requestAnimationFrame(animate);
        }

        return;
      }

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      lastTimestamp = null;
    };

    syncAnimationRef.current = syncAnimation;

    const measureTrack = () => {
      maximumOffsetRef.current = Math.max(
        0,
        viewport.scrollWidth - viewport.clientWidth
      );
      positionRef.current = Math.min(
        viewport.scrollLeft,
        maximumOffsetRef.current
      );

      renderPosition();
      syncAnimation();
    };

    const handleVisibilityChange = () => {
      pauseStateRef.current.documentVisible = !document.hidden;
      syncAnimation();
    };

    const handleReducedMotionChange = () => {
      pauseStateRef.current.reducedMotion = reducedMotion.matches;

      if (reducedMotion.matches) {
        positionRef.current = 0;
        directionRef.current = 1;
        renderPosition();
      }

      syncAnimation();
    };

    const handleKeyboardInput = () => {
      keyboardInputRef.current = true;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        pauseStateRef.current.inView = entry.isIntersecting;
        syncAnimation();
      },
      { threshold: 0.08 }
    );
    const resizeObserver = new ResizeObserver(measureTrack);

    pauseStateRef.current.documentVisible = !document.hidden;
    pauseStateRef.current.reducedMotion = reducedMotion.matches;
    intersectionObserver.observe(section);
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", handleKeyboardInput);
    reducedMotion.addEventListener("change", handleReducedMotionChange);
    measureTrack();

    return () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (touchTimerRef.current !== null) {
        window.clearTimeout(touchTimerRef.current);
      }

      if (manualTimerRef.current !== null) {
        window.clearTimeout(manualTimerRef.current);
      }

      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", handleKeyboardInput);
      reducedMotion.removeEventListener("change", handleReducedMotionChange);
      syncAnimationRef.current = () => undefined;
    };
  }, []);

  const pauseForHover = () => {
    pauseStateRef.current.hover = true;
    syncAnimationRef.current();
  };

  const resumeAfterHover = () => {
    pauseStateRef.current.hover = false;
    syncAnimationRef.current();
  };

  const pauseForFocus = () => {
    if (!keyboardInputRef.current) return;

    pauseStateRef.current.focus = true;
    syncAnimationRef.current();
  };

  const resumeAfterFocus = () => {
    pauseStateRef.current.focus = false;
    syncAnimationRef.current();
  };

  const resumeAfterManualInteraction = () => {
    if (manualTimerRef.current !== null) {
      window.clearTimeout(manualTimerRef.current);
    }

    manualTimerRef.current = window.setTimeout(() => {
      pauseStateRef.current.manual = false;
      manualTimerRef.current = null;
      syncAnimationRef.current();
    }, 1200);
  };

  const pauseForManualInteraction = () => {
    if (manualTimerRef.current !== null) {
      window.clearTimeout(manualTimerRef.current);
      manualTimerRef.current = null;
    }

    pauseStateRef.current.manual = true;
    syncAnimationRef.current();
  };

  const handleViewportPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    keyboardInputRef.current = false;
    pauseForManualInteraction();

    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const viewport = viewportRef.current;

    if (!viewport) return;

    pointerIdRef.current = event.pointerId;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    dragStartScrollRef.current = viewport.scrollLeft;
    dragDirectionRef.current = null;
    viewport.dataset.dragging = "true";
    viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const handleViewportPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;

    const viewport = viewportRef.current;

    if (!viewport) return;

    const distanceX = event.clientX - dragStartXRef.current;
    const distanceY = event.clientY - dragStartYRef.current;
    const absoluteX = Math.abs(distanceX);
    const absoluteY = Math.abs(distanceY);

    if (!dragDirectionRef.current && Math.max(absoluteX, absoluteY) > 4) {
      dragDirectionRef.current =
        absoluteX >= absoluteY ? "horizontal" : "vertical";
    }

    if (dragDirectionRef.current !== "horizontal") return;

    viewport.scrollLeft = dragStartScrollRef.current - distanceX;
    positionRef.current = viewport.scrollLeft;
    event.preventDefault();
  };

  const handleViewportPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (pointerIdRef.current === event.pointerId && viewport) {
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }

      pointerIdRef.current = null;
      dragDirectionRef.current = null;
      delete viewport.dataset.dragging;
    }

    resumeAfterManualInteraction();
  };

  const handleViewportScroll = () => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    positionRef.current = viewport.scrollLeft;

    if (positionRef.current <= 0) {
      directionRef.current = 1;
    } else if (positionRef.current >= maximumOffsetRef.current - 1) {
      directionRef.current = -1;
    }

    if (pauseStateRef.current.manual) {
      resumeAfterManualInteraction();
    }
  };

  const handleViewportWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) < Math.abs(event.deltaY)) return;

    pauseForManualInteraction();
    resumeAfterManualInteraction();
  };

  const activateTouchLogo = (logoId: string, pointerType: string) => {
    keyboardInputRef.current = false;

    if (pointerType === "mouse") return;

    if (touchTimerRef.current !== null) {
      window.clearTimeout(touchTimerRef.current);
    }

    pauseStateRef.current.touch = true;
    setActiveLogoId(logoId);
    syncAnimationRef.current();

    touchTimerRef.current = window.setTimeout(() => {
      pauseStateRef.current.touch = false;
      setActiveLogoId(null);
      touchTimerRef.current = null;
      syncAnimationRef.current();
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.logoSection}
      aria-labelledby="selected-clients-title"
    >
      <div className={styles.logoHeading}>
        <AnimatedHeadline
          as="h2"
          id="selected-clients-title"
          className={styles.logoTitle}
        >
          Selected clients and brands
        </AnimatedHeadline>

        <p className={styles.logoIntroduction}>
          A selection of organisations and brands I&apos;ve supported through
          agency, in-house and direct client work.
        </p>
      </div>

      <div className={styles.logoFrame}>
        <div
          ref={viewportRef}
          className={styles.logoViewport}
          role="region"
          aria-label="Client logos. Swipe, drag or scroll to explore."
          tabIndex={0}
          onFocus={pauseForFocus}
          onBlur={resumeAfterFocus}
          onPointerDown={handleViewportPointerDown}
          onPointerMove={handleViewportPointerMove}
          onPointerUp={handleViewportPointerEnd}
          onPointerCancel={handleViewportPointerEnd}
          onScroll={handleViewportScroll}
          onWheel={handleViewportWheel}
        >
          <div ref={trackRef} className={styles.logoTrack}>
            {homepageLogos.map((logo) => (
              <button
                key={logo.id}
                type="button"
                className={`${styles.logoButton} ${
                  activeLogoId === logo.id ? styles.logoButtonActive : ""
                }`}
                aria-label={`Pause movement on ${logo.alt}`}
                onMouseEnter={pauseForHover}
                onMouseLeave={resumeAfterHover}
                onFocus={pauseForFocus}
                onBlur={resumeAfterFocus}
                onPointerDown={(event) =>
                  activateTouchLogo(logo.id, event.pointerType)
                }
              >
                <span className={styles.logoImageWrap}>
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 152px, 176px"
                    className={styles.logoImage}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
