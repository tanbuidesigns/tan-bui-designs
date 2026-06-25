import AnimatedLabel from "@/components/AnimatedLabel";
import ScrollHighlightText from "./ScrollHighlightText";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function HeroSection() {
  return (
    <Section spacing="hero">
      <Container size="lg">
        <AnimatedLabel className="mb-12">
          TAN BUI DESIGNS
        </AnimatedLabel>

        <div className="w-full">
          <h1 className="font-bold tracking-tight leading-[0.92]">
            <span
              className="
                block

                text-6xl
                sm:text-7xl
                md:text-7xl
              "
            >
              Design that
            </span>

            <div
              className="
                flex
                flex-col
                items-start

                mt-2

                md:flex-row
                md:items-center
              "
            >
              <span
                className="
                  text-6xl
                  sm:text-7xl
                  md:text-7xl

                  md:whitespace-nowrap
                "
              >
                solves problems
              </span>

              <span
                className="
                  hero-line

                  mt-5
                  w-28
                  flex-none

                  md:mt-0
                  md:ml-4
                  md:w-auto
                  md:flex-1
                "
              />
            </div>

            <span
              className="
                block

                text-6xl
                sm:text-7xl
                md:text-7xl

                text-gray-300

                mt-4
              "
            >
              not just fills{" "}
              <span className="hero-space text-black">
                space.
              </span>
            </span>
          </h1>

          <p
            className="
              text-xl

              mt-16

              max-w-3xl

              text-gray-600
              leading-relaxed
            "
          >
            I&apos;ve worked across branding, packaging, publications, websites
            and exhibitions. Some projects ended up on supermarket shelves. Some
            helped schools and charities communicate more clearly. Others
            reached tens of thousands of readers. Different industries. Same
            goal.{" "}
            <ScrollHighlightText />
          </p>
        </div>
      </Container>
    </Section>
  );
}