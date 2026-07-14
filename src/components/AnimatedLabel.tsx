"use client";

import styles from "@/components/EditorialMotion.module.css";

type LabelTag = "div" | "p" | "span";

type AnimatedLabelProps = {
  children: string;
  className?: string;
  as?: LabelTag;
};

export default function AnimatedLabel({
  children,
  className = "",
  as = "div",
}: AnimatedLabelProps) {
  const Tag = as;

  return (
    <Tag className={`${styles.label} ${className}`}>
      <span className={styles.labelText}>{children}</span>
    </Tag>
  );
}
