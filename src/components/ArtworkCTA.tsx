import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";

type ArtworkCTAProps = {
  label: string;
  heading: string;
  body: string;
  buttonLabel: string;
  href?: string;
  supportingItems?: readonly string[];
  note?: string;
};

export default function ArtworkCTA({
  label,
  heading,
  body,
  buttonLabel,
  href = "/contact",
  supportingItems,
  note,
}: ArtworkCTAProps) {
  return (
    <section className="relative isolate overflow-clip bg-[#07080a] py-24 text-white sm:py-28 lg:py-36">
      <ArtworkBackground variant="cta" />
      <WideShell className="relative z-10">
        <AnimatedLabel tone="dark" className="mb-7 text-white/55">{label}</AnimatedLabel>
        <AnimatedHeadline
          as="h2"
          tone="dark"
          className="max-w-6xl text-5xl md:text-7xl lg:text-[5.5rem]"
        >
          {heading}
        </AnimatedHeadline>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
          {body}
        </p>
        <div className="mt-12">
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

        {(supportingItems?.length || note) && (
          <div className="mt-16 grid gap-8 border-y border-white/10 py-7 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
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
