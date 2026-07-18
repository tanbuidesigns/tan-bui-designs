import styles from "@/components/LoopingRevealWord.module.css";

type LoopingRevealWordProps = {
  children: string;
  className?: string;
  sequenceIndex?: 0 | 1 | 2 | 3;
};

export default function LoopingRevealWord({
  children,
  className = "",
  sequenceIndex,
}: LoopingRevealWordProps) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.word} ${className}`}
      data-word={children}
      data-sequence-index={sequenceIndex}
    >
      <span className={styles.text}>{children}</span>
    </span>
  );
}
