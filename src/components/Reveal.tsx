"use client";

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  once?: boolean;
};

export default function Reveal({
  children,
  delay = 0,
  threshold = 0.2,
  once = false,
}: RevealProps) {
  const [visible, setVisible] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (once) {
          if (
            entry.isIntersecting &&
            !hasAnimated.current
          ) {
            setVisible(true);
            hasAnimated.current = true;
          }

          return;
        }

        const ratio = entry.intersectionRatio;

        if (ratio > threshold) {
          setVisible(true);
        }

        if (ratio < threshold * 0.5) {
          setVisible(false);
        }
      },
      {
        threshold: [
          0,
          threshold * 0.5,
          threshold,
          1,
        ],
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}