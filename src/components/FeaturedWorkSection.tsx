"use client";

import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

type FeaturedWorkSectionProps = {
  showHeading?: boolean;
};

export default function FeaturedWorkSection({
  showHeading = true,
}: FeaturedWorkSectionProps) {
  return (
    <Section
      spacing={showHeading ? "editorial" : "none"}
      borderTop={showHeading}
    >
      <Container size="lg">
        {showHeading && (
          <Reveal>
            <div
              className="
                mb-14
                md:mb-16
                lg:mb-20
              "
            >
              <AnimatedLabel className="mb-4">
                SELECTED WORK
              </AnimatedLabel>

              <AnimatedHeadline
                className="
                  text-5xl
                  md:text-6xl

                  font-bold
                  leading-tight
                  max-w-4xl
                "
              >
                Projects with purpose.
              </AnimatedHeadline>

              <GradientLine size="md" className="mt-8" />
            </div>
          </Reveal>
        )}

        <div
          className={`
            grid

            grid-cols-1
            gap-8

            lg:grid-cols-2
            lg:gap-8

            2xl:gap-10

            ${showHeading ? "" : "pb-20 md:pb-24 lg:pb-32"}
          `}
        >
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 120} once>
              <Link
                href={project.href}
                className="
                  group
                  block
                  h-full

                  border
                  border-gray-200

                  overflow-hidden

                  transition-all
                  duration-500
                  ease-[cubic-bezier(0.22,1,0.36,1)]

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
                    sizes="
                      (max-width: 1024px) calc(100vw - 40px),
                      (max-width: 1536px) 50vw,
                      576px
                    "
                    className="
                      object-cover

                      transition-transform
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:scale-105
                    "
                  />
                </div>

                <div
                  className="
                    p-6
                    sm:p-7
                    md:p-8

                    flex
                    flex-col
                    h-full
                  "
                >
                  <p
                    className="
                      text-xs
                      sm:text-sm

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

                  <p
                    className="
                      text-gray-600

                      mt-4

                      leading-relaxed
                    "
                  >
                    {project.result}
                  </p>

                  <GradientLine
                    size="sm"
                    className="
                      mt-8

                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:w-20
                    "
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}