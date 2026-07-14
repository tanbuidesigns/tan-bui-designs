"use client";

import { useEffect, useRef } from "react";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import HomepageScrollHighlight from "@/components/home/HomepageScrollHighlight";

import styles from "@/components/home/HomepageExperience.module.css";

export default function HomepageHero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const precisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    let bounds = hero.getBoundingClientRect();
    let frame: number | null = null;
    let pointerShiftX = 0;
    let pointerShiftY = 0;
    let heroInView = true;

    const measure = () => {
      bounds = hero.getBoundingClientRect();
    };

    const syncMotionState = () => {
      hero.dataset.motion =
        heroInView && !document.hidden ? "active" : "paused";
    };

    const applyPointerPosition = () => {
      frame = null;

      hero.style.setProperty(
        "--tbds-hero-pointer-shift-x",
        `${pointerShiftX.toFixed(2)}px`
      );
      hero.style.setProperty(
        "--tbds-hero-pointer-shift-y",
        `${pointerShiftY.toFixed(2)}px`
      );
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
      if (!precisePointer.matches || bounds.width === 0 || bounds.height === 0) {
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

      queuePointerPosition();
    };

    const resetPointerPosition = () => {
      pointerShiftX = 0;
      pointerShiftY = 0;
      queuePointerPosition();
    };

    const handlePointerModeChange = () => {
      if (!precisePointer.matches) {
        resetPointerPosition();
      }
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
    precisePointer.addEventListener("change", handlePointerModeChange);
    document.addEventListener("visibilitychange", syncMotionState);
    syncMotionState();

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointerenter", handlePointerEnter);
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetPointerPosition);
      precisePointer.removeEventListener("change", handlePointerModeChange);
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
              d="M82 584C206 413 179 233 350 135C478 61 605 137 650 264"
              stroke="url(#tbds-homepage-hero-line)"
              strokeWidth="1.5"
            />
            <path
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
          </svg>
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <p className={styles.heroBrand}>TAN BUI DESIGNS</p>

          <AnimatedHeadline
            as="h1"
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
