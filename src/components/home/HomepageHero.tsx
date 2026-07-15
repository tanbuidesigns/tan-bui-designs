"use client";

import { useEffect, useRef } from "react";

import LoopingRevealWord from "@/components/LoopingRevealWord";
import HomepageScrollHighlight from "@/components/home/HomepageScrollHighlight";

import styles from "@/components/home/HomepageExperience.module.css";

export default function HomepageHero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mobileLayout = window.matchMedia(
      "(max-width: 767px), (max-height: 520px) and (max-width: 1023px)"
    );

    if (mobileLayout.matches) {
      hero.dataset.motion = "paused";
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let bounds = hero.getBoundingClientRect();
    let scrollFrame: number | null = null;
    let heroInView = true;

    const measure = () => {
      bounds = hero.getBoundingClientRect();
    };

    const syncMotionState = () => {
      hero.dataset.motion =
        heroInView && !document.hidden && !reducedMotion.matches ? "active" : "paused";
    };

    const updateScrollLight = () => {
      scrollFrame = null;
      if (!heroInView || reducedMotion.matches) return;
      measure();
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(bounds.height, 1)));
      hero.style.setProperty("--tbds-hero-scroll-shift", `${(progress * 28).toFixed(2)}px`);
    };

    const queueScrollLight = () => {
      if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateScrollLight);
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
    window.addEventListener("scroll", queueScrollLight, { passive: true });
    reducedMotion.addEventListener("change", syncMotionState);
    document.addEventListener("visibilitychange", syncMotionState);
    syncMotionState();

    return () => {
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", queueScrollLight);
      reducedMotion.removeEventListener("change", syncMotionState);
      document.removeEventListener("visibilitychange", syncMotionState);
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby="homepage-hero-title">
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroAmbientGlow} aria-hidden="true" />

      <div className={styles.heroVisual} aria-hidden="true">
        <div className={styles.heroVisualField}>
          <div className={styles.heroGlow} />
          <div className={`${styles.interfacePanel} ${styles.interfaceDesktop}`}>
            <div className={styles.interfaceChrome}><i /><i /><i /><span /></div>
            <div className={styles.interfaceNavigation}><b /><span /><span /><span /></div>
            <div className={styles.interfaceLayout}>
              <div className={styles.interfaceSidebar}><span /><span /><span /><span /></div>
              <div className={styles.interfaceCanvas}>
                <div className={styles.interfaceHeading}><span /><span /></div>
                <div className={styles.interfaceCards}><i /><i /><i /></div>
                <div className={styles.interfaceRows}><span /><span /><span /></div>
              </div>
            </div>
          </div>
          <div className={`${styles.interfacePanel} ${styles.interfaceMobile}`}>
            <div className={styles.mobileNotch} />
            <div className={styles.mobileBar} />
            <div className={styles.mobileCard} />
            <div className={styles.mobileLines}><span /><span /><span /></div>
          </div>
          <div className={styles.breakpointFrame}><span>640</span></div>
          <div className={styles.selectionBox}><i /><i /><i /><i /></div>
          <div className={`${styles.autoCursor} ${styles.autoCursorOne}`} />
          <div className={`${styles.autoCursor} ${styles.autoCursorTwo}`} />
          <svg className={styles.heroLines} viewBox="0 0 720 720" fill="none">
            <defs>
              <linearGradient id="tbds-homepage-hero-line" x1="90" y1="120" x2="650" y2="610" gradientUnits="userSpaceOnUse">
                <stop stopColor="#c7d2fe" stopOpacity="0.08" />
                <stop offset="0.48" stopColor="#fecaca" stopOpacity="0.78" />
                <stop offset="1" stopColor="#fef9c3" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M82 584C206 413 179 233 350 135C478 61 605 137 650 264" stroke="url(#tbds-homepage-hero-line)" strokeWidth="1.2" />
            <path d="M116 644C256 500 333 424 522 399C609 387 663 415 708 474" stroke="url(#tbds-homepage-hero-line)" strokeOpacity="0.3" />
          </svg>
        </div>
      </div>

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <h1 id="homepage-hero-title" className={styles.heroTitle}>
            <span className="sr-only">Design that solves problems not just fills space</span>
            <span aria-hidden="true">
              <span className={`${styles.heroTitleLine} ${styles.heroGradientText}`}>Design that</span>
              <span className={`${styles.heroTitleLine} ${styles.heroProblemLine}`}>
                <span className={styles.heroGradientText}>solves problems</span>
                <span className={styles.heroRule} />
              </span>
              <span className={`${styles.heroTitleLine} ${styles.heroMutedLine}`}>
                <LoopingRevealWord sequenceIndex={0}>not</LoopingRevealWord>{" "}
                <LoopingRevealWord sequenceIndex={1}>just</LoopingRevealWord>{" "}
                <LoopingRevealWord sequenceIndex={2}>fills</LoopingRevealWord>{" "}
                <LoopingRevealWord sequenceIndex={3} className={styles.heroSpace}>space</LoopingRevealWord>
              </span>
            </span>
          </h1>

          <div className={styles.heroIntroduction}>
            <p>
              I&apos;ve worked across branding, packaging, publications, websites
              and exhibitions. Some projects ended up on supermarket shelves. Some
              helped schools and charities communicate more clearly. Others reached
              tens of thousands of readers. Different industries. Same goal.
            </p>
            <HomepageScrollHighlight />
          </div>
        </div>
      </div>
    </section>
  );
}
