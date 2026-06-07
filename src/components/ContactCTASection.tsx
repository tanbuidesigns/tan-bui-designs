"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

export default function ContactCTASection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
      <Reveal>
        <div className="bg-black text-white px-8 py-16 md:p-20 overflow-hidden relative">
          <AnimatedLabel className="mb-6 text-gray-500">
            START A PROJECT
          </AnimatedLabel>

          <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
            Have an idea that needs clarity, craft and direction?
          </AnimatedHeadline>

          <p className="text-xl text-gray-300 mt-10 max-w-3xl leading-relaxed">
            Whether it's a brand, publication, website, exhibition or
            creative system, I can help turn ideas into clear visual
            experiences that people understand and remember.
          </p>

          <div className="mt-14">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-sm font-medium transition-all duration-300 hover:px-10"
            >
              <span>Start a Conversation</span>

              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>

          <div className="absolute top-0 right-0 w-64 h-64 border border-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>

          <div className="absolute bottom-0 left-0 w-40 h-40 border border-white/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </Reveal>
    </section>
  );
}