import AnimatedHeadline from "@/components/AnimatedHeadline";
import type { AnimatedHeadlineChunk } from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import type { ArtworkVariant } from "@/components/ArtworkBackground";
import ServicePillTicker from "@/components/ServicePillTicker";
import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";

type ArtworkCTAProps = {
  label: string;
  heading: string;
  headingChunks?: readonly AnimatedHeadlineChunk[];
  body: string;
  buttonLabel: string;
  href?: string;
  supportingItems?: readonly string[];
  note?: string;
  scrollingItems?: readonly string[];
  bodyClassName?: string;
  artworkVariant?: ArtworkVariant;
};

export default function ArtworkCTA({
  label,
  heading,
  headingChunks,
  body,
  buttonLabel,
  href = "/contact",
  supportingItems,
  note,
  scrollingItems,
  bodyClassName = "max-w-3xl",
  artworkVariant = "cta",
}: ArtworkCTAProps) {
  return (
    <section className="relative isolate overflow-clip bg-[#07080a] py-16 text-white sm:py-20 lg:py-24">
      <ArtworkBackground variant={artworkVariant} />
      <WideShell className="relative z-10">
        <AnimatedLabel tone="dark" className="mb-5 text-white/55">{label}</AnimatedLabel>
        {headingChunks ? (
          <AnimatedHeadline
            as="h2"
            tone="dark"
            className="max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem]"
            chunks={headingChunks}
          />
        ) : (
          <AnimatedHeadline
            as="h2"
            tone="dark"
            className="max-w-6xl text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem]"
          >
            {heading}
          </AnimatedHeadline>
        )}
        <p className={`mt-7 text-lg leading-relaxed text-white/70 sm:text-xl ${bodyClassName}`}>
          {body}
        </p>
        <div className="mt-8">
          <Button
            href={href}
            variant="gradient"
            size="lg"
            expandOnHover
            showArrow
          >
            {buttonLabel}
          </Button>
        </div>

        {scrollingItems?.length ? (
          <div className="mt-10 border-y border-white/10 py-4">
            <ServicePillTicker items={scrollingItems} />
          </div>
        ) : null}

        {(supportingItems?.length || note) && (
          <div className="mt-10 grid gap-6 border-y border-white/10 py-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            {supportingItems?.length ? (
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/58">
                {supportingItems.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            ) : (
              <span />
            )}
            {note ? (
              <p className="max-w-sm text-sm leading-relaxed text-white/48 lg:ml-auto">
                {note}
              </p>
            ) : null}
          </div>
        )}
      </WideShell>
    </section>
  );
}
