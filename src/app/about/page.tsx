"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";
import AnimatedHeadline from "@/components/AnimatedHeadline";

export default function AboutPage() {
  const timeline = [
    {
      year: "Kansas, USA",
      title: "Creativity came first.",
      text: "Throughout middle school and high school I regularly entered art, photography and craft competitions, earning recognition for both creative and academic achievements. Creativity was not just a hobby. It became a way of thinking, exploring and solving problems.",
    },
    {
      year: "University Years",
      title: "A different path.",
      text: "My original ambition was medicine. After university I earned acceptance into medical school, with plans to pursue a healthcare career. Life eventually took me in a different direction, but the discipline, analytical thinking and attention to detail from that journey still shape how I approach design today.",
    },
    {
      year: "2010",
      title: "Moving to England.",
      text: "Relocating to England opened an unexpected door into commercial printing, production and design. What started as a practical career move became the foundation for everything that followed.",
    },
    {
      year: "2011–2016",
      title: "Impress Printers.",
      text: "This is where I learned the craft. Working across reprographics, signage, prepress and commercial print taught me how design works in the real world. Large print runs trained my eye for detail because one small mistake could waste thousands of copies.",
    },
    {
      year: "2016–2019",
      title: "Twentythree04.",
      text: "Agency life pushed me beyond production and into brand thinking. I worked on packaging and branding projects for names including Urban Eat, On a Roll, Costa, Asda, Co-op and Quorn, learning how visual systems shape customer experience.",
    },
    {
      year: "2019–Present",
      title: "Tan Bui Designs.",
      text: "Tan Bui Designs became a place to bring everything together: print, branding, publications, websites, exhibitions and emerging technologies. It is both a portfolio and a long-term creative home.",
    },
    {
      year: "2021–Present",
      title: "Mednet Health.",
      text: "Today my work spans healthcare communications, exhibitions, websites, motion graphics, video and 3D visualisation. I have helped create exhibition experiences, developed motion content and built Cinema 4D concepts for real-world environments.",
    },
  ];

  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <Reveal>
          <AnimatedLabel className="mb-8">ABOUT</AnimatedLabel>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <AnimatedHeadline className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
                Fifteen years of turning complex ideas into clear visual experiences.
              </AnimatedHeadline>
            </div>

            <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-400">
              Headshot placeholder
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-32">
        <Reveal>
          <div className="space-y-8 text-xl text-gray-600 leading-relaxed">
            <p>
              I’m Tan Bui, a multidisciplinary designer with more than 15 years
              of experience across print, branding, packaging, publications,
              websites, exhibitions and digital experiences.
            </p>

            <p>
              My path into design was not conventional. Growing up in Kansas,
              creativity was always part of my life. I regularly won art,
              photography and craft competitions throughout school while also
              pursuing academic excellence, eventually graduating as valedictorian
              and earning acceptance into medical school.
            </p>

            <p>
              Life took me in a different direction. After moving to England in
              2010, I started working in commercial print and reprographics. What
              began as a practical career move became the foundation of my design
              career.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
        <Reveal>
          <AnimatedLabel className="mb-6">JOURNEY</AnimatedLabel>

          <AnimatedHeadline className="text-5xl md:text-6xl font-bold max-w-4xl leading-[1.05] mb-20">
            A career built through craft, pressure and constant learning.
          </AnimatedHeadline>
        </Reveal>

        <div className="space-y-16">
          {timeline.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <div className="grid md:grid-cols-12 gap-8 border-t border-gray-200 pt-10">
                <div className="md:col-span-3">
                  <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                    {item.year}
                  </p>
                </div>

                <div className="md:col-span-9">
                  <h3 className="text-3xl font-semibold mb-6">
                    {item.title}
                  </h3>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
        <Reveal>
          <AnimatedLabel className="mb-6">PHILOSOPHY</AnimatedLabel>

          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedHeadline className="text-5xl md:text-6xl font-bold leading-[1.05]">
              Good design combines style with craftsmanship.
            </AnimatedHeadline>

            <div className="space-y-8 text-xl text-gray-600 leading-relaxed">
              <p>
                A polished outcome is not just about aesthetics. It is about
                understanding the problem, paying attention to details and
                creating something that works in the real world.
              </p>

              <p>
                My background in production taught me that quality comes from
                care, consistency and experience. The strongest designers are the
                ones who understand the craft deeply enough to make difficult
                things look effortless.
              </p>

              <p>
                Nearly two decades into my career, I am still learning, refining
                and exploring new ways of working. The tools change. The
                principles do not.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
        <Reveal>
          <AnimatedLabel className="mb-6">WHAT I BRING</AnimatedLabel>

          <div className="max-w-4xl space-y-8 text-xl text-gray-600 leading-relaxed">
            <p>
              Print taught me precision. Branding taught me systems. Packaging
              taught me commercial thinking. Publications taught me structure and
              readability. Web design taught me clarity. Exhibitions taught me
              how people move through physical spaces. Motion and 3D taught me
              how ideas can be experienced rather than simply viewed.
            </p>

            <p>
              The result is a broad perspective that allows me to move between
              print, digital and physical environments while keeping the same
              standard of craftsmanship and attention to detail.
            </p>

            <p className="text-black font-medium">
              Different mediums. Same principles.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
        <Reveal>
          <div className="bg-black text-white px-8 py-16 md:p-20">
            <AnimatedLabel className="mb-6 text-gray-500">
              LOOKING FORWARD
            </AnimatedLabel>

            <AnimatedHeadline className="text-5xl md:text-6xl font-bold leading-[1.05] max-w-4xl">
              The work continues. The learning continues.
            </AnimatedHeadline>

            <p className="text-xl text-gray-300 mt-10 max-w-3xl leading-relaxed">
              Tan Bui Designs is my long-term creative home. A place to create
              meaningful work, explore new ideas and help organisations
              communicate more clearly.
            </p>

            <div className="mt-12">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-sm font-medium transition-all duration-300 hover:px-10"
              >
                <span>Start a Conversation</span>

                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}