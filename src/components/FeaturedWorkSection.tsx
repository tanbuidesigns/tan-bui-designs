"use client";

import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

type FeaturedWorkSectionProps = {
  showHeading?: boolean;
};

export default function FeaturedWorkSection({
  showHeading = true,
}: FeaturedWorkSectionProps) {
  return (
    <section
      className={`
        max-w-6xl
        mx-auto
        px-8
        ${
          showHeading
            ? "py-32 border-t border-gray-100"
            : "pb-32"
        }
      `}
    >
      {showHeading && (
        <Reveal>
          <div className="mb-16">
            <AnimatedLabel className="mb-4">
              SELECTED WORK
            </AnimatedLabel>

            <AnimatedHeadline className="text-5xl md:text-6xl font-bold leading-tight">
              Projects with purpose.
            </AnimatedHeadline>
          </div>
        </Reveal>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 120}
            once
          >
            <Link
              href={project.href}
              className="
                group
                block
                border
                border-gray-200
                overflow-hidden

                transition-all
                duration-500

                hover:border-black
                hover:-translate-y-1
              "
            >
              <div
                className="
                  relative
                  aspect-[4/3]
                  bg-gray-100
                  border-b
                  border-gray-200
                  overflow-hidden
                "
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="
                    object-cover
                    transition
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    group-hover:scale-105
                  "
                />
              </div>

              <div className="p-8">
                <p
                  className="
                    text-sm
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                    mb-4

                    transition-colors
                    duration-300

                    group-hover:text-gray-700
                  "
                >
                  {project.category}
                </p>

                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      leading-tight

                      transition-colors
                      duration-300
                    "
                  >
                    {project.title}
                  </h3>

                  <span
                    className="
                      opacity-0
                      translate-x-[-8px]

                      transition-all
                      duration-300

                      group-hover:opacity-100
                      group-hover:translate-x-0
                    "
                  >
                    →
                  </span>
                </div>

                <p className="text-gray-600 mt-4 leading-relaxed">
                  {project.result}
                </p>

                <div
                  className="
                    mt-6

                    w-0
                    h-px

                    bg-black

                    transition-all
                    duration-500

                    group-hover:w-16
                  "
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}