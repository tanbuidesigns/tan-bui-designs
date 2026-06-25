"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

export default function ContactCTASection() {
  return (
    <Section spacing="editorial" borderTop>
      <Container size="lg">
        <Reveal>
          <div
            className="
              relative
              overflow-hidden

              bg-black
              text-white

              px-6
              py-14

              sm:px-8
              sm:py-16

              md:p-20
            "
          >
            <AnimatedLabel className="mb-6 text-gray-500">
              START A PROJECT
            </AnimatedLabel>

            <AnimatedHeadline
              className="
                text-5xl
                md:text-7xl

                font-bold
                leading-[0.95]

                max-w-5xl
              "
            >
              Have an idea that needs clarity, craft and direction?
            </AnimatedHeadline>

            <p
              className="
                text-xl
                text-gray-300

                mt-10

                max-w-3xl
                leading-relaxed
              "
            >
              Whether it&apos;s a brand, publication, website, exhibition or
              creative system, I can help turn ideas into clear visual
              experiences that people understand and remember.
            </p>

            <div className="mt-14">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                expandOnHover
                showArrow
              >
                Start a Conversation
              </Button>
            </div>

            <div
              className="
                absolute
                top-0
                right-0

                w-64
                h-64

                border
                border-white/10

                rounded-full

                translate-x-1/2
                -translate-y-1/2
              "
            />

            <div
              className="
                absolute
                bottom-0
                left-0

                w-40
                h-40

                border
                border-white/10

                rounded-full

                -translate-x-1/2
                translate-y-1/2
              "
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}