"use client";

import { useEffect, useRef, useState } from "react";

export default function CredibilitySection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: "15+",
      label: "Years Experience",
    },
    {
      value: "400+",
      label: "Packaging SKUs",
    },
    {
      value: "55+",
      label: "Exhibition Designs",
    },
    {
      value: "12+",
      label: "Publications",
    },
    {
      value: "80k+",
      label: "Readers Reached",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-8 py-32"
    >
      <div className="border-t border-gray-200 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group transition-all duration-1000 ease-out ${
  visible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-12"
}`}
style={{
  transitionDelay: `${400 + index * 180}ms`,
}}
            >
              <div className="text-6xl md:text-7xl font-bold tracking-tight leading-none transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </div>

              <div className="w-12 h-px bg-black my-6 transition-all duration-300 group-hover:w-20"></div>

              <div className="uppercase tracking-[0.25em] text-xs text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}