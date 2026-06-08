"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        (scrollTop / documentHeight) * 100;

      setProgress(percentage);
    };

    window.addEventListener(
      "scroll",
      updateProgress
    );

    updateProgress();

    return () =>
      window.removeEventListener(
        "scroll",
        updateProgress
      );
  }, []);

  return (
    <div
      className="
        fixed
        top-0
        left-0

        w-full
        h-[2px]

        z-[999]
      "
    >
      <div
        className="
          h-full
          bg-black

          transition-[width]
          duration-150
        "
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}