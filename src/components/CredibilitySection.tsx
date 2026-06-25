"use client";

import { useEffect, useRef, useState } from "react";

import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

export default function CredibilitySection() {
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
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
    <Section spacing="editorial">
      <Container size="lg">
        <div
          ref={contentRef}
          className="
            border-t
            border-gray-200

            pt-14
            md:pt-16
            lg:pt-20
          "
        >
          <div
            className="
              grid

              grid-cols-2
              gap-x-8
              gap-y-14

              sm:grid-cols-3
              sm:gap-x-10
              sm:gap-y-16

              lg:grid-cols-5
              lg:gap-12
            "
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`
                  group

                  transition-all
                  duration-1000
                  ease-out

                  ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }
                `}
                style={{
                  transitionDelay: `${300 + index * 140}ms`,
                }}
              >
                <div
                  className="
                    text-5xl
                    sm:text-6xl
                    lg:text-7xl

                    font-bold
                    tracking-tight
                    leading-none

                    transition-transform
                    duration-300

                    group-hover:scale-105
                  "
                >
                  {stat.value}
                </div>

                <GradientLine
                  size="sm"
                  className="
                    my-6

                    transition-all
                    duration-300

                    group-hover:w-20
                  "
                />

                <div
                  className="
                    uppercase
                    tracking-[0.22em]
                    sm:tracking-[0.25em]

                    text-[11px]
                    sm:text-xs

                    text-gray-500
                  "
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}