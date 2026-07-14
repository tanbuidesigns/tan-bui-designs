"use client";

import Image from "next/image";

import type { PlaygroundItem } from "@/data/playground.generated";

import styles from "@/components/playground/Playground.module.css";

type PlaygroundCardProps = {
  item: PlaygroundItem;
  active: boolean;
  onToggle: () => void;
};

export default function PlaygroundCard({
  item,
  active,
  onToggle,
}: PlaygroundCardProps) {
  const captionId = `playground-caption-${item.id}`;

  return (
    <figure
      className={`${styles.card} ${styles[item.layout]} ${styles[item.corner]} ${
        active ? styles.active : ""
      }`}
    >
      <button
        type="button"
        className={styles.cardButton}
        onClick={onToggle}
        aria-expanded={active}
        aria-describedby={captionId}
        aria-label={`Show details for ${item.title}`}
      >
        {item.kind === "image" && item.src ? (
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
            className={styles.image}
          />
        ) : (
          <span
            className={`${styles.placeholder} ${styles[`art${item.art}`]}`}
            aria-hidden="true"
          >
            <span className={styles.placeholderRing} />
            <span className={styles.placeholderLine} />
          </span>
        )}
      </button>

      <figcaption id={captionId} className={styles.caption}>
        <span className={styles.category}>{item.category}</span>
        <strong className={styles.title}>{item.title}</strong>
      </figcaption>
    </figure>
  );
}
