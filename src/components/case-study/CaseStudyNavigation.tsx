"use client";

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

export default function CaseStudyNavigation({
  previousProject,
  nextProject,
}: CaseStudyNavigationProps) {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="border-t border-gray-100 pt-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href={`/work/${previousProject.slug}`}
              className="
                group
                border
                border-gray-200
                p-8
                transition-all
                duration-300
                hover:border-black
                hover:-translate-y-1
              "
            >
              <AnimatedLabel className="mb-4">
                PREVIOUS PROJECT
              </AnimatedLabel>

              <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 transition-colors duration-300 group-hover:text-gray-700">
                {previousProject.title}
              </h3>

              <p className="text-gray-500">
                {previousProject.category}
              </p>

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 transition-all duration-300 group-hover:text-black">
                <span>←</span>
                <span>View Project</span>
              </div>
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              className="
                group
                border
                border-gray-200
                p-8
                transition-all
                duration-300
                hover:border-black
                hover:-translate-y-1
                text-left
                md:text-right
              "
            >
              <AnimatedLabel className="mb-4">
                NEXT PROJECT
              </AnimatedLabel>

              <h3 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 transition-colors duration-300 group-hover:text-gray-700">
                {nextProject.title}
              </h3>

              <p className="text-gray-500">
                {nextProject.category}
              </p>

              <div className="mt-8 flex items-center gap-2 justify-start md:justify-end text-sm text-gray-500 transition-all duration-300 group-hover:text-black">
                <span>View Project</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Reveal>
  );
}