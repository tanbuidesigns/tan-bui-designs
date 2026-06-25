"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import ContactForm from "@/components/ContactForm";

import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

export default function ContactPage() {
  const services = [
    "Brand Identity",
    "Packaging Design",
    "Publication Design",
    "Website Design",
    "Exhibition Design",
    "Creative Direction",
  ];

  return (
    <main className="bg-white text-black">
      {/* HERO */}

      <Section spacing="hero">
        <Container size="lg">
          <Reveal>
            <AnimatedLabel className="mb-8">
              CONTACT
            </AnimatedLabel>

            <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
              Let&apos;s build something clear, useful and meaningful.
            </AnimatedHeadline>

            <div className="mt-12 space-y-6 text-xl text-gray-600 leading-relaxed max-w-3xl">
              <p>
                Every project starts with a conversation.
              </p>

              <p>
                Whether you&apos;re launching a brand, publishing educational
                content, building a website or creating an exhibition
                experience, I&apos;d be happy to learn more about what
                you&apos;re working on.
              </p>

              <p>
                Tell me a little about your project and I&apos;ll get back to
                you as soon as possible.
              </p>
            </div>

            <GradientLine size="md" className="mt-12" />
          </Reveal>
        </Container>
      </Section>

      {/* CONTACT FORM + DETAILS */}

      <Section spacing="editorial" borderTop>
        <Container size="lg">
          <div className="grid gap-20 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <ContactForm />
            </Reveal>

            <Reveal delay={150}>
              <aside
                className="
                  grid
                  gap-16

                  md:grid-cols-2
                  md:gap-12

                  lg:grid-cols-1
                  lg:gap-16

                  min-[1120px]:grid-cols-2
                  min-[1120px]:gap-12
                  min-[1120px]:items-start

                  2xl:grid-cols-1
                  2xl:gap-16
                "
              >
                {/* SERVICES */}

                <div>
                  <div className="mb-8">
                    <AnimatedLabel>
                      WHAT I CAN HELP WITH
                    </AnimatedLabel>
                  </div>

                  <div className="space-y-5 text-2xl">
                    {services.map((service) => (
                      <p key={service}>
                        {service}
                      </p>
                    ))}
                  </div>

                  <GradientLine size="md" className="mt-12" />
                </div>

                {/* CONTACT DETAILS */}

                <div
                  className="
                    space-y-16

                    md:border-l
                    md:border-gray-100
                    md:pl-10

                    lg:border-l-0
                    lg:pl-0

                    min-[1120px]:border-l
                    min-[1120px]:border-gray-100
                    min-[1120px]:pl-10

                    2xl:border-l-0
                    2xl:pl-0
                  "
                >
                  <div>
                    <div className="mb-6">
                      <AnimatedLabel>
                        EMAIL
                      </AnimatedLabel>
                    </div>

                    <a
                      href="mailto:tanbuidesigns@gmail.com"
                      className="
                        group
                        relative
                        inline-block

                        break-all

                        text-xl
                        text-gray-500

                        transition-all
                        duration-300

                        hover:text-black
                      "
                    >
                      tanbuidesigns@gmail.com

                      <span
                        className="
                          absolute
                          left-0
                          -bottom-2
                          h-px
                          w-full

                          origin-left
                          scale-x-0

                          bg-[image:var(--tbds-accent-gradient)]

                          transition-transform
                          duration-300

                          group-hover:scale-x-100
                        "
                      />
                    </a>
                  </div>

                  <div className="border-t border-gray-100 pt-10">
                    <div className="mb-6">
                      <AnimatedLabel>
                        LOCATION
                      </AnimatedLabel>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      Based in West Yorkshire, UK.
                      <br />
                      Working with organisations locally and remotely.
                    </p>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </Section>
    </main>
  );
}