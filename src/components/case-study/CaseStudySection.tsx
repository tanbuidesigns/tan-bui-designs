"use client";

import { ReactNode } from "react";

import Reveal from "@/components/Reveal";

type CaseStudySectionProps = {
  title: string;
  children: ReactNode;
};

export default function CaseStudySection({
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <Reveal>
      <section className="max-w-4xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold mb-8">
          {title}
        </h2>

        <div className="text-xl text-gray-600 leading-relaxed">
          {children}
        </div>
      </section>
    </Reveal>
  );
}