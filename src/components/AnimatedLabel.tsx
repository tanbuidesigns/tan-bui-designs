"use client";

import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";

import styles from "@/components/AnimatedLabel.module.css";

type LabelTag = "div" | "p" | "span";

type AnimatedLabelProps = {
  children: string;
  className?: string;
  as?: LabelTag;
  tone?: "light" | "dark";
};

export default function AnimatedLabel({
  children,
  className = "",
  as = "div",
  tone = "light",
}: AnimatedLabelProps) {
  const Tag = as;
  const [tapped, setTapped] = useState(false);
  const tapTimeout = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      if (tapTimeout.current !== undefined) window.clearTimeout(tapTimeout.current);
    },
    []
  );

  const triggerTouchTreatment = (
    event: ReactPointerEvent<HTMLElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    if (tapTimeout.current !== undefined) window.clearTimeout(tapTimeout.current);
    setTapped(true);
    tapTimeout.current = window.setTimeout(() => {
      setTapped(false);
      tapTimeout.current = undefined;
    }, 700);
  };

  return (
    <Tag
      data-tone={tone}
      data-tapped={tapped ? "true" : undefined}
      onPointerUp={triggerTouchTreatment}
      className={`${styles.label} ${className}`}
    >
      <span className={styles.labelText} aria-label={children}>
        <span aria-hidden="true">
          {Array.from(children).map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={styles.labelLetter}
              style={
                {
                  "--tbds-letter-index": index,
                  "--tbds-label-gradient-position": `${
                    (index / Math.max(children.length - 1, 1)) * 100
                  }%`,
                  "--tbds-label-length": children.length,
                } as CSSProperties
              }
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </span>
    </Tag>
  );
}
