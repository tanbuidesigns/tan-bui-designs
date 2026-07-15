"use client";

import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";
import WideShell from "@/components/ui/WideShell";

const defaultPrompts = [
  "Brand system",
  "Packaging rollout",
  "Website design",
  "Campaign assets",
  "Pitch decks",
  "Publication design",
  "Retail POS",
  "Digital products",
] as const;

type CaseStudyCTAProps = {
  label?: string;
  heading?: string;
  body?: string;
  buttonLabel?: string;
  href?: string;
  prompts?: readonly string[];
  note?: string;
};

export default function CaseStudyCTA({
  label = "Start a project",
  heading = "Ready to build something meaningful?",
  body = "Whether you’re planning a brand, publication, website, exhibition, digital product or creative campaign, I’d love to hear about it. Every project starts with a conversation, a challenge and a clear objective.",
  buttonLabel = "Start a Conversation",
  href = "/contact",
  prompts = defaultPrompts,
  note = "Got something in mind? Send me the rough idea and I’ll help turn it into something clear, sharp and ready to build.",
}: CaseStudyCTAProps = {}) {
  const scrollingPrompts = [...prompts, ...prompts];

  return (
    <Reveal>
      <section className="group relative overflow-hidden border-t border-gray-100 bg-black text-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_32%)]"
        />

        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[3px] w-full"
          style={{ background: "var(--tbds-accent-gradient)" }}
        />

        <WideShell className="relative py-28 md:py-36">
          <AnimatedLabel tone="dark" className="mb-8 text-white/55">
            {label}
          </AnimatedLabel>

          <AnimatedHeadline
            tone="dark"
            className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl"
          >
            {heading}
          </AnimatedHeadline>

          <p className="mt-12 max-w-3xl text-xl leading-relaxed text-white/65">
            {body}
          </p>

          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
            <Link
              href={href}
              className="group/button relative inline-flex min-h-14 w-fit items-center gap-4 overflow-hidden border border-white/20 bg-white px-6 text-base font-medium text-black transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 hover:border-white hover:text-black hover:shadow-[0_20px_60px_rgba(255,255,255,0.16)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/button:opacity-100"
                style={{
                  background: "var(--tbds-accent-gradient)",
                  backgroundSize: "220% 100%",
                  animation: "tbds-cta-gradient 7s ease-in-out infinite",
                }}
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-white/72 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover/button:opacity-100"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-white transition-all duration-500 group-hover/button:translate-x-full group-hover/button:opacity-0"
              />

              <span className="relative z-10 text-black">
                {buttonLabel}
              </span>

              <span
                aria-hidden="true"
                className="relative z-10 text-black transition-transform duration-300 group-hover/button:translate-x-1"
              >
                →
              </span>

              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 z-20 h-[2px] w-full"
                style={{
                  background: "var(--tbds-accent-gradient)",
                  backgroundSize: "220% 100%",
                  animation: "tbds-cta-gradient 7s ease-in-out infinite",
                }}
              />
            </Link>
          </div>

          <div className="mt-16 border-y border-white/10 py-5">
            <div
              className={`grid gap-5 ${
                note
                  ? "lg:grid-cols-[minmax(0,1fr)_410px] lg:items-center"
                  : ""
              }`}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <div
                  className="flex w-max gap-3 will-change-transform group-hover:[animation-play-state:paused]"
                  style={{ animation: "tbds-cta-marquee 26s linear infinite" }}
                >
                  {scrollingPrompts.map((prompt, index) => (
                    <span
                      key={`${prompt}-${index}`}
                      className="flex min-h-11 flex-shrink-0 items-center rounded-full border border-white/15 bg-white/[0.03] px-4 text-sm text-white/65 backdrop-blur-sm"
                    >
                      {prompt}
                    </span>
                  ))}
                </div>
              </div>

              {note ? (
                <p className="flex max-w-[26rem] items-start gap-3 text-sm leading-relaxed text-white/45 lg:ml-auto">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-[11px] text-white/55"
                  >
                    ✦
                  </span>

                  <span>{note}</span>
                </p>
              ) : null}
            </div>
          </div>
        </WideShell>

        <style>
          {`
            @keyframes tbds-cta-marquee {
              0% {
                transform: translateX(0);
              }

              100% {
                transform: translateX(-50%);
              }
            }

            @keyframes tbds-cta-gradient {
              0% {
                background-position: 0% 50%;
              }

              50% {
                background-position: 100% 50%;
              }

              100% {
                background-position: 0% 50%;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              [style*="tbds-cta-marquee"],
              [style*="tbds-cta-gradient"] {
                animation: none !important;
              }
            }
          `}
        </style>
      </section>
    </Reveal>
  );
}
