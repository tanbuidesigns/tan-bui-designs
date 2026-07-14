"use client";

import type { ReactNode } from "react";

import styles from "@/components/EditorialMotion.module.css";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "div" | "span";

type AnimatedHeadlineProps = {
  children: ReactNode;
  className?: string;
  as?: HeadingTag;
  id?: string;
};

export default function AnimatedHeadline({
  children,
  className = "",
  as = "h2",
  id,
}: AnimatedHeadlineProps) {
  const Tag = as;
  const words = typeof children === "string" ? children.trim().split(/\s+/) : null;

  return (
    <Tag
      id={id}
      className={`${styles.headline} tracking-[-0.05em] leading-[0.96] [text-wrap:balance] ${className}`}
    >
      {words
        ? words.map((word, index) => (
            <span key={`${word}-${index}`} className={styles.wordClip}>
              <span
                className={styles.word}
                style={{ animationDelay: `${Math.min(index * 45, 360)}ms` }}
              >
                {word}
              </span>
              {index < words.length - 1 ? "\u00A0" : null}
            </span>
          ))
        : children}
    </Tag>
  );
}
