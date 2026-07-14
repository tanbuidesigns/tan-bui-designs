"use client";

import { useEffect, useRef, useState } from "react";

import PlaygroundCard from "@/components/playground/PlaygroundCard";
import type { PlaygroundItem } from "@/data/playground.generated";

import styles from "@/components/playground/Playground.module.css";

const batchSize = 8;

type PlaygroundGalleryProps = {
  items: readonly PlaygroundItem[];
};

export default function PlaygroundGallery({ items }: PlaygroundGalleryProps) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(batchSize, items.length));
  const [activeId, setActiveId] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(Math.min(batchSize, items.length));
    setActiveId(null);
  }, [items]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(current + batchSize, items.length));
        }
      },
      { rootMargin: "500px 0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [items.length, visibleCount]);

  return (
    <div>
      <div className={styles.gallery}>
        {items.slice(0, visibleCount).map((item) => (
          <PlaygroundCard
            key={item.id}
            item={item}
            active={activeId === item.id}
            onToggle={() =>
              setActiveId((current) => (current === item.id ? null : item.id))
            }
          />
        ))}
      </div>

      {visibleCount < items.length ? (
        <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      ) : (
        <p className={styles.endState}>End of the current collection.</p>
      )}
    </div>
  );
}
