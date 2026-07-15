import AnimatedLabel from "@/components/AnimatedLabel";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";

import styles from "@/components/EditorialCTA.module.css";

type EditorialCTAProps = {
  label: string;
  heading: string;
  body: string;
  buttonLabel: string;
  href?: string;
  backgroundImage: string;
};

export default function EditorialCTA({
  label,
  heading,
  body,
  buttonLabel,
  href = "/contact",
  backgroundImage,
}: EditorialCTAProps) {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white sm:py-28 lg:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-[0.14] grayscale"
        style={{ backgroundImage: `url("${backgroundImage}")` }}
      />

      <div
        aria-hidden="true"
        className={`${styles.glow} absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl`}
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(99,102,241,0.26), rgba(251,191,36,0.16))",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <AnimatedLabel tone="dark" className="mb-6 text-gray-500">
                {label}
              </AnimatedLabel>

              <h2 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] md:text-7xl">
                {heading}
              </h2>

              <p className="mt-10 max-w-3xl text-xl leading-relaxed text-gray-300">
                {body}
              </p>
            </div>

            <div className="lg:pb-2">
              <Button
                href={href}
                variant="accent"
                size="lg"
                expandOnHover
                showArrow
                className="hover:shadow-[0_18px_48px_-14px_rgba(199,210,254,0.85),0_14px_44px_-16px_rgba(254,202,202,0.75),0_22px_48px_-18px_rgba(254,249,195,0.72)]"
              >
                {buttonLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
