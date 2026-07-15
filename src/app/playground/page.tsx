import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import PlaygroundGallery from "@/components/playground/PlaygroundGallery";
import WideShell from "@/components/ui/WideShell";
import { playgroundItems } from "@/data/playground.generated";
import { playgroundPlaceholders } from "@/data/playgroundPlaceholders";
import { showPlayground } from "@/lib/site-visibility";

export const metadata: Metadata = {
  title: "Playground | Tan Bui Designs",
  description:
    "A visual collection of design experiments, pitch ideas, studies and creative exploration by Tan Bui.",
  alternates: {
    canonical: "/playground",
  },
};

export default function PlaygroundPage() {
  if (!showPlayground) notFound();

  const items = playgroundItems.length > 0 ? playgroundItems : playgroundPlaceholders;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#08090b] text-white">
      <section className="relative isolate overflow-clip border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <ArtworkBackground variant="hero" />
        <WideShell className="relative z-10">
          <AnimatedLabel tone="dark" className="mb-8 text-white/55">Playground</AnimatedLabel>
          <AnimatedHeadline
            as="h1"
            tone="dark"
            className="max-w-6xl text-5xl sm:text-6xl lg:text-8xl"
          >
            The work between the work.
          </AnimatedHeadline>
          <p className="mt-9 max-w-3xl text-lg leading-relaxed text-white/68 sm:text-xl">
            Experiments, pitches, studies and visual ideas across identity,
            packaging, illustration, layouts, motion and three-dimensional work.
          </p>
        </WideShell>
      </section>

      <section aria-label="Playground collection" className="py-12 sm:py-16 lg:py-20">
        <WideShell>
          <PlaygroundGallery items={items} />
        </WideShell>
      </section>
    </main>
  );
}
