"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/home/HomepageExperience.module.css";

export default function HomepageScrollHighlight() {
  const highlightRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const highlight = highlightRef.current;

    if (!highlight) return;

    const mobileLayout = window.matchMedia(
      "(max-width: 767px), (max-height: 520px) and (max-width: 1023px)"
    );

    if (mobileLayout.matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;

    const updateHighlight = () => {
      frame = null;

      if (reducedMotion.matches) {
        highlight.style.setProperty("--tbds-highlight-progress", "1");
        return;
      }

      const rect = highlight.getBoundingClientRect();
      const start = window.innerHeight * 0.76;
      const end = window.innerHeight * 0.38;
      const progress = Math.min(
        1,
        Math.max(0, (start - rect.top) / (start - end))
      );

      highlight.style.setProperty(
        "--tbds-highlight-progress",
        progress.toFixed(3)
      );
    };

    const queueHighlightUpdate = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(updateHighlight);
      }
    };

    updateHighlight();
    window.addEventListener("scroll", queueHighlightUpdate, { passive: true });
    reducedMotion.addEventListener("change", queueHighlightUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", queueHighlightUpdate);
      reducedMotion.removeEventListener("change", queueHighlightUpdate);
    };
  }, []);

  return (
    <p ref={highlightRef} className={styles.heroHighlight}>
      Make complicated things easier to understand.
    </p>
  );
}
