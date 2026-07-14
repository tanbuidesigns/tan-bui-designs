"use client";

import { useEffect, useRef, useState } from "react";

import styles from "@/components/EditorialMotion.module.css";

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

  const triggerTouchTreatment = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (tapTimeout.current !== undefined) window.clearTimeout(tapTimeout.current);
    setTapped(true);
    tapTimeout.current = window.setTimeout(() => setTapped(false), 520);
  };

  return (
    <Tag
      data-tone={tone}
      data-tapped={tapped ? "true" : undefined}
      onPointerDown={triggerTouchTreatment}
      className={`${styles.label} ${className}`}
    >
      <span className={styles.labelText}>{children}</span>
    </Tag>
  );
}
