"use client";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <Reveal>
          <AnimatedLabel className="mb-8">
            CONTACT
          </AnimatedLabel>

          <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
            Let's build something clear, useful and meaningful.
          </AnimatedHeadline>

          <p className="text-xl text-gray-600 mt-12 max-w-3xl leading-relaxed">
            Every project starts with a conversation.
          </p>

          <p className="text-xl text-gray-600 mt-6 max-w-3xl leading-relaxed">
            Whether you're launching a brand, publishing educational
            content, building a website or creating an exhibition
            experience, I'd be happy to learn more about what you're
            working on.
          </p>

          <p className="text-xl text-gray-600 mt-6 max-w-3xl leading-relaxed">
            Tell me a little about your project and I'll get back to
            you as soon as possible.
          </p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-32">
        <div className="grid md:grid-cols-2 gap-24">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={150}>
            <div>
              <div className="mb-8">
                <AnimatedLabel>
                  WHAT I CAN HELP WITH
                </AnimatedLabel>
              </div>

              <div className="space-y-6 text-2xl">
                <p>Brand Identity</p>
                <p>Packaging Design</p>
                <p>Publication Design</p>
                <p>Website Design</p>
                <p>Exhibition Design</p>
                <p>Creative Direction</p>
              </div>

              <div className="mt-20">
                <div className="mb-6">
                  <AnimatedLabel>
                    EMAIL
                  </AnimatedLabel>
                </div>

                <a
                  href="mailto:tanbuidesigns@gmail.com"
                  className="
                    block
                    text-xl
                    text-gray-500
                    transition-all
                    duration-300
                    hover:text-gray-700
                  "
                >
                  tanbuidesigns@gmail.com
                </a>
              </div>

              <div className="mt-20 border-t border-gray-100 pt-10">
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
          </Reveal>
        </div>
      </section>
    </main>
  );
}