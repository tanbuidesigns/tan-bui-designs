"use client";

import { useState } from "react";
import Link from "next/link";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyNavigationProps = {
  previousProject: {
    title: string;
    slug: string;
    category: string;
  };

  nextProject: {
    title: string;
    slug: string;
    category: string;
  };
};

type Project = {
  title: string;
  slug: string;
  category: string;
};

export default function CaseStudyNavigation({
  previousProject,
  nextProject,
}: CaseStudyNavigationProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="border-t border-gray-100 pt-12">
          <div className="grid gap-6 md:grid-cols-2">
            <ProjectNavCard
              project={previousProject}
              label="PREVIOUS PROJECT"
              direction="previous"
            />

            <ProjectNavCard
              project={nextProject}
              label="NEXT PROJECT"
              direction="next"
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function ProjectNavCard({
  project,
  label,
  direction,
}: {
  project: Project;
  label: string;
  direction: "previous" | "next";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isNext = direction === "next";

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative
        block
        overflow-hidden

        border
        border-gray-200
        p-8

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${isNext ? "text-left md:text-right" : ""}
      `}
      style={{
        transform: isHovered
          ? "translateY(-4px)"
          : "translateY(0)",
        borderColor: isHovered ? "#d1d5db" : undefined,
        boxShadow: isHovered
          ? "0 18px 45px rgba(0,0,0,0.06)"
          : undefined,
      }}
    >
      {/* CENTRE-OUT GRADIENT STROKE */}

      <div
        aria-hidden="true"
        className="
          absolute
          top-0
          left-1/2

          h-[3px]
          w-full
        "
        style={{
          background: "var(--tbds-accent-gradient)",
          transform: isHovered
            ? "translateX(-50%) scaleX(1)"
            : "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          transition:
            "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      <AnimatedLabel className="mb-4">
        {label}
      </AnimatedLabel>

      <h3
        className="
          mb-4

          text-2xl
          font-semibold
          leading-tight

          transition-colors
          duration-300

          md:text-3xl
        "
        style={{
          color: isHovered ? "#374151" : undefined,
        }}
      >
        {project.title}
      </h3>

      <p className="text-gray-500">
        {project.category}
      </p>

      <ProjectNavAction
        direction={direction}
        active={isHovered}
      />
    </Link>
  );
}

function ProjectNavAction({
  direction,
  active,
}: {
  direction: "previous" | "next";
  active: boolean;
}) {
  const isNext = direction === "next";

  return (
    <div
      className={`
        mt-8

        flex
        items-center
        gap-2

        text-sm

        transition-colors
        duration-300

        ${isNext ? "justify-start md:justify-end" : "justify-start"}
      `}
      style={{
        color: active ? "#000000" : "#6b7280",
        transform: active
          ? isNext
            ? "translateX(8px)"
            : "translateX(-8px)"
          : "translateX(0)",
        transition:
          "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms ease",
      }}
    >
      {!isNext && (
        <span
          className="inline-block"
          style={{
            transform: active
              ? "translateX(-4px)"
              : "translateX(0)",
            transition:
              "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          ←
        </span>
      )}

      <span>View Project</span>

      {isNext && (
        <span
          className="inline-block"
          style={{
            transform: active
              ? "translateX(4px)"
              : "translateX(0)",
            transition:
              "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          →
        </span>
      )}
    </div>
  );
}