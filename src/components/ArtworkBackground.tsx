import styles from "@/components/ArtworkBackground.module.css";

export type ArtworkVariant = "hero" | "cta" | "contact" | "subtle";

type ArtworkBackgroundProps = {
  variant?: ArtworkVariant;
  className?: string;
};

export default function ArtworkBackground({
  variant = "subtle",
  className = "",
}: ArtworkBackgroundProps) {
  return (
    <div
      className={`${styles.artwork} ${styles[variant]} ${className}`}
      aria-hidden="true"
    >
      <div className={styles.grid} />
      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />
      <div className={styles.prism} />
      <svg
        className={styles.lines}
        viewBox="0 0 1200 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M-70 528C183 198 347 657 602 298C796 24 986 440 1280 112" />
        <path d="M-110 608C182 285 392 704 653 370C846 123 1015 488 1310 218" />
        <path d="M72 74C285 241 389 34 603 194C799 341 956 129 1182 285" />
      </svg>
    </div>
  );
}
