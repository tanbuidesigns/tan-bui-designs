"use client";

import { useEffect, useRef } from "react";

import styles from "@/components/home/HomepageExperience.module.css";

export default function HomepageScrollHighlight() {
  const highlightRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const highlight = highlightRef.current;

    if (!highlight) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame: number | null = null;

    const updateHighlight = () => {
      frame = null;

      if (reducedMotion.matches) {
        highlight.style.setProperty("--tbds-highlight-progress", "100%");
        return;
      }

      const start = 75;
      const end = 300;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / (end - start))
      );

      highlight.style.setProperty(
        "--tbds-highlight-progress",
        `${(progress * 100).toFixed(2)}%`
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
    <span ref={highlightRef} className={styles.heroHighlight}>
      Make complicated things easier to understand.
    </span>
  );
}
