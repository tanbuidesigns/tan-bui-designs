"use client";

import Link from "next/link";

import Reveal from "@/components/Reveal";

export default function CaseStudyCTA() {
  return (
    <Reveal>
      <section className="max-w-6xl mx-auto px-8 py-24">
        <div className="bg-black text-white p-12 md:p-16">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
            Similar Project?
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Let's build something meaningful.
          </h2>

          <p className="text-xl text-gray-300 mt-8 max-w-3xl">
            Whether you're planning a publication,
            website, exhibition, brand identity or
            digital experience, I'd love to hear
            about it.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-6 py-3"
          >
            Start a Conversation
          </Link>
        </div>
      </section>
    </Reveal>
  );
}