"use client";

import { useEffect, useRef } from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import HomepageScrollHighlight from "@/components/home/HomepageScrollHighlight";

import styles from "@/components/home/HomepageExperience.module.css";

export default function HomepageHero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const trailRef = useRef<SVGPolylineElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const precisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let bounds = hero.getBoundingClientRect();
    let frame: number | null = null;
    let scrollFrame: number | null = null;
    let pointerShiftX = 0;
    let pointerShiftY = 0;
    let heroInView = true;
    let trailPoints: Array<{ x: number; y: number }> = [];

    const measure = () => {
      bounds = hero.getBoundingClientRect();
    };

    const syncMotionState = () => {
      hero.dataset.motion =
        heroInView && !document.hidden && !reducedMotion.matches ? "active" : "paused";
    };

    const applyPointerPosition = () => {
      frame = null;

      hero.style.setProperty(
        "--tbds-hero-pointer-shift-x",
        `${(pointerShiftX * 0.08).toFixed(2)}px`
      );
      hero.style.setProperty(
        "--tbds-hero-pointer-shift-y",
        `${(pointerShiftY * 0.08).toFixed(2)}px`
      );

      const trail = trailRef.current;
      if (trail) {
        trail.setAttribute(
          "points",
          trailPoints.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ")
        );
        trail.style.opacity = trailPoints.length > 1 ? "1" : "0";
      }
    };

    const queuePointerPosition = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(applyPointerPosition);
      }
    };

    const handlePointerEnter = () => {
      measure();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (
        !precisePointer.matches ||
        reducedMotion.matches ||
        !heroInView ||
        bounds.width === 0 ||
        bounds.height === 0
      ) {
        return;
      }

      pointerShiftX = Math.min(
        bounds.width / 2,
        Math.max(
          -bounds.width / 2,
          event.clientX - bounds.left - bounds.width / 2
        )
      );
      pointerShiftY = Math.min(
        bounds.height / 2,
        Math.max(
          -bounds.height / 2,
          event.clientY - bounds.top - bounds.height / 2
        )
      );

      trailPoints.push({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });
      trailPoints = trailPoints.slice(-14);

      queuePointerPosition();
    };

    const resetPointerPosition = () => {
      pointerShiftX = 0;
      pointerShiftY = 0;
      trailPoints = [];
      queuePointerPosition();
    };

    const updateScrollLight = () => {
      scrollFrame = null;
      if (!heroInView || reducedMotion.matches) return;
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)));
      hero.style.setProperty("--tbds-hero-scroll-shift", `${(progress * 34).toFixed(2)}px`);
    };

    const queueScrollLight = () => {
      if (scrollFrame === null) {
        scrollFrame = window.requestAnimationFrame(() => {
          measure();
          updateScrollLight();
        });
      }
    };

    const handlePointerModeChange = () => {
      if (!precisePointer.matches || reducedMotion.matches) {
        resetPointerPosition();
      }
      syncMotionState();
    };

    const resizeObserver = new ResizeObserver(measure);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        syncMotionState();
      },
      { threshold: 0.02 }
    );

    resizeObserver.observe(hero);
    intersectionObserver.observe(hero);
    hero.addEventListener("pointerenter", handlePointerEnter);
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetPointerPosition);
    window.addEventListener("scroll", queueScrollLight, { passive: true });
    precisePointer.addEventListener("change", handlePointerModeChange);
    reducedMotion.addEventListener("change", handlePointerModeChange);
    document.addEventListener("visibilitychange", syncMotionState);
    syncMotionState();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointerPosition);
      window.removeEventListener("scroll", queueScrollLight);
      precisePointer.removeEventListener("change", handlePointerModeChange);
      reducedMotion.removeEventListener("change", handlePointerModeChange);
      document.removeEventListener("visibilitychange", syncMotionState);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className={styles.hero}
      aria-labelledby="homepage-hero-title"
    >
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroPointerGlow} aria-hidden="true" />
      <svg className={styles.heroTrail} aria-hidden="true">
        <defs>
          <linearGradient id="tbds-homepage-trail" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#c7d2fe" stopOpacity="0" />
            <stop offset="0.62" stopColor="#fecaca" stopOpacity="0.58" />
            <stop offset="1" stopColor="#fef9c3" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <polyline ref={trailRef} fill="none" stroke="url(#tbds-homepage-trail)" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className={styles.heroVisual} aria-hidden="true">
        <div className={styles.heroVisualField}>
          <div className={styles.heroGlow} />
          <div className={styles.heroPrism} />

          <svg
            className={styles.heroLines}
            viewBox="0 0 720 720"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient
                id="tbds-homepage-hero-line"
                x1="90"
                y1="120"
                x2="650"
                y2="610"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#c7d2fe" stopOpacity="0.08" />
                <stop offset="0.48" stopColor="#fecaca" stopOpacity="0.86" />
                <stop offset="1" stopColor="#fef9c3" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            <path
              id="tbds-hero-signal-path-one"
              d="M82 584C206 413 179 233 350 135C478 61 605 137 650 264"
              stroke="url(#tbds-homepage-hero-line)"
              strokeWidth="1.5"
            />
            <path
              id="tbds-hero-signal-path-two"
              d="M35 504C171 379 215 179 412 101C537 51 656 142 696 292"
              stroke="url(#tbds-homepage-hero-line)"
              strokeOpacity="0.42"
            />
            <path
              d="M116 644C256 500 333 424 522 399C609 387 663 415 708 474"
              stroke="url(#tbds-homepage-hero-line)"
              strokeOpacity="0.34"
            />
            <circle cx="350" cy="135" r="4" fill="#fef9c3" fillOpacity="0.72" />
            <circle cx="522" cy="399" r="3" fill="#c7d2fe" fillOpacity="0.7" />
            <circle className={styles.heroSignalDot} r="3.25" fill="#fef9c3">
              <animateMotion dur="8.5s" repeatCount="indefinite">
                <mpath href="#tbds-hero-signal-path-one" />
              </animateMotion>
            </circle>
            <circle className={styles.heroSignalDot} r="2.5" fill="#c7d2fe" opacity="0.78">
              <animateMotion dur="11s" begin="-4s" repeatCount="indefinite">
                <mpath href="#tbds-hero-signal-path-two" />
              </animateMotion>
            </circle>
          </svg>
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <AnimatedHeadline
            as="h1"
            tone="dark"
            id="homepage-hero-title"
            className={styles.heroTitle}
          >
            <span className={styles.heroTitleLine}>Design that</span>
            <span className={`${styles.heroTitleLine} ${styles.heroProblemLine}`}>
              <span>solves problems</span>
              <span className={styles.heroRule} aria-hidden="true" />
            </span>
            <span className={`${styles.heroTitleLine} ${styles.heroMutedLine}`}>
              not just fills <span className={styles.heroSpace}>space.</span>
            </span>
          </AnimatedHeadline>

          <p className={styles.heroIntroduction}>
            I&apos;ve worked across branding, packaging, publications, websites
            and exhibitions. Some projects ended up on supermarket shelves. Some
            helped schools and charities communicate more clearly. Others
            reached tens of thousands of readers. Different industries. Same
            goal. <HomepageScrollHighlight />
          </p>
        </div>
      </div>
    </section>
  );
}
