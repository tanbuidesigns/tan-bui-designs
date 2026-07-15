"use client";

import { useEffect } from "react";

const ITEM_SELECTOR = "[data-homepage-scroll-hover]";
const PLAY_DURATION = 820;
const STAGGER_DELAY = 220;

export default function HomepageScrollHoverPlayback() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(ITEM_SELECTOR)
    );
    const playedItems = new WeakSet<HTMLElement>();
    const playTimers = new Set<number>();
    const resetTimers = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        const enteringItems = entries
          .filter(
            (
              entry
            ): entry is IntersectionObserverEntry & { target: HTMLElement } =>
              entry.isIntersecting &&
              entry.target instanceof HTMLElement &&
              !playedItems.has(entry.target)
          )
          .sort((first, second) => {
            const firstRect = first.target.getBoundingClientRect();
            const secondRect = second.target.getBoundingClientRect();

            return (
              firstRect.top - secondRect.top ||
              firstRect.left - secondRect.left
            );
          });

        enteringItems.forEach((entry, index) => {
          const item = entry.target;
          playedItems.add(item);
          observer.unobserve(item);

          const playTimer = window.setTimeout(() => {
            playTimers.delete(playTimer);
            item.dataset.scrollHoverPlaying = "true";

            const resetTimer = window.setTimeout(() => {
              resetTimers.delete(resetTimer);
              delete item.dataset.scrollHoverPlaying;
            }, PLAY_DURATION);

            resetTimers.add(resetTimer);
          }, index * STAGGER_DELAY);

          playTimers.add(playTimer);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.28,
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      playTimers.forEach((timer) => window.clearTimeout(timer));
      resetTimers.forEach((timer) => window.clearTimeout(timer));
      items.forEach((item) => delete item.dataset.scrollHoverPlaying);
    };
  }, []);

  return null;
}
