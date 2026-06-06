"use client";

import { useEffect, useState } from "react";

export default function ScrollHighlightText() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const start = 75;
      const end = 300;

      const scroll = window.scrollY;

      if (scroll <= start) {
        setProgress(0);
      } else if (scroll >= end) {
        setProgress(100);
      } else {
        setProgress(((scroll - start) / (end - start)) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <span
      className="scroll-highlight"
      style={{
        backgroundSize: `${progress}% 100%`,
      }}
    >
      Make complicated things easier to understand.
    </span>
  );
}