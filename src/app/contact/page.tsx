import type { Metadata } from "next";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import ContactForm from "@/components/ContactForm";
import WideShell from "@/components/ui/WideShell";

export const metadata: Metadata = {
  title: "Contact | Tan Bui Designs",
  description:
    "Start a conversation with Tan Bui Designs about branding, packaging, publications, websites, exhibitions or creative direction.",
  alternates: {
    canonical: "/contact",
  },
};

const services = [
  "Brand Identity",
  "Packaging Design",
  "Publication Design",
  "Website Design",
  "Exhibition Design",
  "Creative Direction",
] as const;

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-x-clip bg-[#07080a] text-white">
      <ArtworkBackground variant="contact" />

      <WideShell className="relative z-10 py-20 sm:py-24 lg:py-28 2xl:py-32">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(24rem,0.72fr)] lg:items-start lg:gap-16 xl:gap-24">
          <div className="lg:sticky lg:top-32">
            <AnimatedLabel tone="dark" className="mb-8 text-white/55">Contact</AnimatedLabel>
            <AnimatedHeadline
              as="h1"
              tone="dark"
              className="max-w-5xl text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
            >
              Let&apos;s build something clear, useful and meaningful.
            </AnimatedHeadline>

            <div className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-white/68 sm:text-xl">
              <p>Every project starts with a conversation.</p>
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

            <div className="mt-12 grid gap-8 border-t border-white/12 pt-9 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div>
                <AnimatedLabel tone="dark" className="mb-4 text-white/45">Email</AnimatedLabel>
                <a
                  href="mailto:tanbuidesigns@gmail.com"
                  className="break-all text-base text-white/78 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  tanbuidesigns@gmail.com
                </a>
              </div>
              <div>
                <AnimatedLabel tone="dark" className="mb-4 text-white/45">Location</AnimatedLabel>
                <p className="text-base leading-relaxed text-white/68">
                  Based in West Yorkshire, UK.
                  <br />
                  Working with organisations locally and remotely.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/16 bg-white/[0.94] p-6 text-black shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
            <AnimatedLabel className="mb-7">Tell me about the project</AnimatedLabel>
            <ContactForm />

            <div className="mt-12 border-t border-black/10 pt-8">
              <AnimatedLabel className="mb-5">What I can help with</AnimatedLabel>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm leading-relaxed text-gray-600">
                {services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WideShell>
    </main>
  );
}
