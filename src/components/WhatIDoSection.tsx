"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import ServiceGlyph from "@/components/ServiceGlyph";

import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

export default function WhatIDoSection() {
  const services = [
    {
      glyph: "branding" as const,
      title: "Branding",
      description:
        "Building identities, visual systems and guidelines people actually\u00A0use.",
    },
    {
      glyph: "packaging" as const,
      title: "Packaging",
      description:
        "From concept to production, including hundreds of commercial\u00A0SKUs.",
    },
    {
      glyph: "publications" as const,
      title: "Publications",
      description:
        "Books, educational resources and long-form content designed to be\u00A0read.",
    },
    {
      glyph: "websites" as const,
      title: "Websites",
      description:
        "Websites that simplify complex information and help people find what matters.",
    },
    {
      glyph: "exhibitions" as const,
      title: "3D & Exhibitions",
      description:
        "Exhibition concepts, environments and visualisations that bring ideas to life.",
    },
    {
      glyph: "systems" as const,
      title: "Creative Systems",
      description:
        "Design processes, workflows and assets that make future work\u00A0easier.",
    },
  ];

  return (
    <Section spacing="editorial" borderTop className="border-gray-200">
      <Container size="lg">
        <Reveal>
          <div
            className="
              mb-16
              md:mb-20
              lg:mb-24
            "
          >
            <AnimatedLabel className="mb-6">
              WHAT I DO
            </AnimatedLabel>

            <AnimatedHeadline
              className="
                text-5xl
                md:text-6xl

                font-bold
                max-w-4xl
                leading-[1.05]
              "
            >
              A mix of creative thinking, technical execution and getting things
              over the line.
            </AnimatedHeadline>
          </div>
        </Reveal>

        <div
          className="
            grid

            grid-cols-1
            gap-y-14

            md:grid-cols-2
            md:gap-x-12
            md:gap-y-16

            2xl:grid-cols-3
            2xl:gap-x-14
            2xl:gap-y-20

            items-stretch
          "
        >
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 120} once>
              <article className="group h-full">
                <div
                  className="
                    flex
                    items-start
                    gap-5
                    h-full
                  "
                >
                  <div
                    className="
                      text-gray-400

                      transition-all
                      duration-500
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:text-black
                      group-hover:-translate-y-1

                      flex-shrink-0
                      mt-1
                    "
                  >
                    <ServiceGlyph type={service.glyph} />
                  </div>

                  <div
                    className="
                      flex
                      flex-col
                      flex-1
                      h-full
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-semibold
                        mb-4
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        text-gray-600
                        leading-relaxed
                        max-w-xl
                      "
                    >
                      {service.description}
                    </p>

                    <GradientLine
                      size="sm"
                      className="
                        mt-8

                        transition-all
                        duration-500
                        ease-[cubic-bezier(0.22,1,0.36,1)]

                        group-hover:w-20
                      "
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}