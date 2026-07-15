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

export default function ContactPage() {
  return (
    <main className="relative isolate overflow-x-clip bg-[#07080a] text-white">
      <ArtworkBackground variant="contact" />

      <WideShell className="relative z-10 py-10 sm:py-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(30rem,0.82fr)] lg:items-start lg:gap-14 xl:gap-20">
          <div className="lg:pt-2">
            <AnimatedLabel tone="dark" className="mb-6 text-white/55">Contact</AnimatedLabel>
            <AnimatedHeadline
              as="h1"
              tone="dark"
              className="max-w-4xl text-5xl sm:text-6xl lg:text-[4.6rem]"
            >
              Let&apos;s build something clear, useful and meaningful.
            </AnimatedHeadline>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/68 sm:text-xl">
              Every project starts with a conversation. Tell me what you are trying to make, improve or explain, and I&apos;ll get back to you as soon as possible.
            </p>

            <div className="mt-8 grid gap-6 border-t border-white/12 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="flex min-w-0 flex-col items-start gap-3">
                <AnimatedLabel tone="dark" className="text-white/45">Email</AnimatedLabel>
                <a
                  href="mailto:tanbuidesigns@gmail.com"
                  className="max-w-full break-words text-base text-white/78 underline decoration-white/25 underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                >
                  tanbuidesigns@gmail.com
                </a>
              </div>
              <div className="flex min-w-0 flex-col items-start gap-3">
                <AnimatedLabel tone="dark" className="text-white/45">Location</AnimatedLabel>
                <p className="text-base leading-relaxed text-white/68">
                  Based in West Yorkshire, UK.
                  <br />
                  Working with organisations locally and remotely.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/16 bg-white/[0.96] p-6 text-black shadow-[0_34px_120px_rgba(0,0,0,0.34)] sm:p-8">
            <AnimatedLabel className="mb-5">Tell me about the project</AnimatedLabel>
            <ContactForm />
          </div>
        </div>
      </WideShell>
    </main>
  );
}
