"use client";

import { ReactNode } from "react";

import Reveal from "@/components/Reveal";

type CaseStudySectionProps = {
  title: string;
  children: ReactNode;
  id?: string;
};

export default function CaseStudySection({
  title,
  children,
  id,
}: CaseStudySectionProps) {
  return (
    <Reveal>
      <section
        id={id}
        className="max-w-4xl mx-auto px-8 py-16 scroll-mt-32"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
          {title}
        </h2>

        <div className="text-xl text-gray-600 leading-relaxed">
          {children}
        </div>
      </section>
    </Reveal>
  );
}