"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

import Button from "@/components/ui/Button";
import GradientLine from "@/components/ui/GradientLine";

const remoteImages = {
  geometric:
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=82",
  studioTexture:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=82",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tanbuidesigns.com/about#tan-bui",
      name: "Tan Bui",
      url: "https://tanbuidesigns.com/about",
      image: "https://tanbuidesigns.com/about/about-01.webp",
      jobTitle:
        "Senior Multimedia Designer and Multidisciplinary Design Consultant",
      description:
        "Tan Bui is a multidisciplinary designer and design consultant with more than 15 years of experience across print, branding, packaging, publication design, websites, exhibitions, illustration, marketing, motion and 3D visualisation.",
      knowsAbout: [
        "Brand identity",
        "Publication design",
        "Packaging design",
        "Website design",
        "Exhibition design",
        "Illustration",
        "Marketing design",
        "Motion graphics",
        "3D visualisation",
        "Print production",
        "Healthcare communications",
      ],
      brand: {
        "@type": "Brand",
        name: "Tan Bui Designs",
        url: "https://tanbuidesigns.com",
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tanbuidesigns.com/#professional-service",
      name: "Tan Bui Designs",
      url: "https://tanbuidesigns.com",
      founder: {
        "@id": "https://tanbuidesigns.com/about#tan-bui",
      },
      serviceType: [
        "Brand design",
        "Publication design",
        "Packaging design",
        "Website design",
        "Exhibition design",
        "Illustration",
        "Marketing design",
        "Motion graphics",
        "3D visualisation",
      ],
    },
  ],
};

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

export default function AboutPage() {
  return (
    <main className="bg-white text-black [overflow-x:clip]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* HERO */}

      <section className="px-4 pb-20 pt-5 sm:px-6 md:pb-24 lg:px-8 lg:pb-28">
        <PageShell>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#f3f3f1] shadow-[0_30px_100px_rgba(0,0,0,0.05)]">
            <HeroAmbient />

            <div className="relative z-10 grid lg:min-h-[76svh] lg:grid-cols-[1.16fr_0.84fr]">
              <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-20 xl:px-[5rem]">
                <Reveal>
                  <div className="mb-8 flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="h-px w-12"
                      style={{
                        backgroundImage: "var(--tbds-accent-gradient)",
                      }}
                    />

                    <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-500 sm:text-sm">
                      15+ years of craft and strategy
                    </p>
                  </div>

                  <h1
                    className="max-w-[58rem] text-[clamp(3.15rem,4.75vw,6rem)] font-bold leading-[0.95] tracking-[-0.06em]"
                    style={{
                      animation:
                        "tbds-about-title-in 900ms cubic-bezier(0.22,1,0.36,1) both",
                    }}
                  >
                    <span className="block">From complex briefs</span>
                    <span className="block">to clear design systems</span>
                  </h1>

                  <div className="mt-12 flex max-w-2xl items-center gap-4 border-t border-black/10 pt-6 sm:gap-5">
                    <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full border border-black/10 bg-white shadow-[0_14px_40px_rgba(0,0,0,0.08)] sm:h-20 sm:w-20">
                      <Image
                        src="/about/about-01.webp"
                        alt="Portrait of Tan Bui"
                        fill
                        priority
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    <p className="max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
                      Loves designing, eating homemade food, and learning new
                      things every day.
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="relative min-h-[30rem] p-4 pt-0 sm:min-h-[38rem] sm:p-6 sm:pt-0 lg:min-h-0 lg:p-6 lg:pl-0">
                <Reveal delay={120}>
                  <div className="group relative h-full min-h-[30rem] overflow-hidden rounded-[1.5rem] bg-black shadow-[0_34px_110px_rgba(0,0,0,0.14)] sm:min-h-[38rem] lg:min-h-[calc(76svh-3rem)] lg:rounded-[2rem_7rem_2rem_2rem]">
                    <Image
                      src="/about/about-06.webp"
                      alt="Tan Bui working at his design desk"
                      fill
                      priority
                      sizes="(max-width: 1024px) calc(100vw - 56px), 42vw"
                      className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]"
                    />

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      {/* DESIGN THINKING */}

      <section className="relative border-t border-gray-100 py-20 sm:py-24 lg:py-28">
        <PageShell className="px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
            <Reveal>
              <StudioMosaic />
            </Reveal>

            <Reveal delay={100}>
              <div className="relative flex h-full min-h-[34rem] flex-col justify-center overflow-hidden rounded-[1.75rem] bg-[#f3f3f1] p-7 sm:p-10 lg:p-12 xl:p-14">
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-0 h-px"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, transparent, rgba(99,102,241,0.65), rgba(251,191,36,0.7), transparent)",
                    animation:
                      "tbds-about-line-drift 7s ease-in-out infinite alternate",
                  }}
                />

                <h2 className="max-w-3xl text-4xl font-bold leading-[1] tracking-[-0.045em] sm:text-5xl xl:text-6xl">
                  Design is where thinking becomes visible.
                </h2>

                <div className="mt-10 max-w-3xl space-y-6 text-lg leading-relaxed text-gray-600 sm:text-xl">
                  <p>
                    I’m Tan Bui, a multidisciplinary designer with more than 15
                    years of experience across print, branding, packaging,
                    publications, websites, exhibitions and digital experiences.
                  </p>

                  <p>
                    My path into design was not conventional. Growing up in
                    Kansas, creativity was always part of my life. I regularly
                    won art, photography and craft competitions throughout school
                    while also pursuing academic excellence, eventually
                    graduating as valedictorian and earning acceptance into
                    medical school.
                  </p>

                  <p>
                    Life took me in a different direction. After moving to
                    England in 2010, I started working in commercial print and
                    reprographics. What began as a practical career move became
                    the foundation of my design career.
                  </p>
                </div>

                <GradientLine size="md" className="mt-10" />
              </div>
            </Reveal>
          </div>
        </PageShell>
      </section>

      {/* JOURNEY */}

      <section className="border-t border-gray-100 py-20 sm:py-24 lg:py-28">
        <PageShell className="px-4 sm:px-6 lg:px-8">
          <Reveal>
            <AnimatedLabel className="mb-6">JOURNEY</AnimatedLabel>

            <h2 className="max-w-5xl text-5xl font-bold leading-[1] tracking-[-0.045em] md:text-6xl">
              A career built through craft, pressure and constant learning.
            </h2>
          </Reveal>

          <JourneyTimeline />
        </PageShell>
      </section>

      {/* PHILOSOPHY */}

      <section className="border-t border-gray-100 py-20 sm:py-24 lg:py-28">
        <PageShell className="px-4 sm:px-6 lg:px-8">
          <Reveal>
            <AnimatedLabel className="mb-6">PHILOSOPHY</AnimatedLabel>

            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:gap-20">
              <h2 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] md:text-6xl">
                Good design combines style with craftsmanship.
              </h2>

              <div className="max-w-4xl space-y-8 text-xl leading-relaxed text-gray-600">
                <p>
                  A polished outcome is not just about aesthetics. It is about
                  understanding the problem, paying attention to details and
                  creating something that works in the real world.
                </p>

                <p>
                  My background in production taught me that quality comes from
                  care, consistency and experience. The strongest designers are
                  the ones who understand the craft deeply enough to make
                  difficult things look effortless.
                </p>

                <p>
                  Nearly two decades into my career, I am still learning,
                  refining and exploring new ways of working. The tools change.
                  The principles do not.
                </p>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </section>

      {/* DIFFERENT MEDIUMS */}

      <section className="relative overflow-hidden bg-[#0b0b0b] py-24 text-white sm:py-28 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-cover bg-center opacity-[0.16] grayscale lg:w-[48%]"
          style={{
            backgroundImage: `url("${remoteImages.geometric}")`,
            animation:
              "tbds-about-image-drift 18s ease-in-out infinite alternate",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.22), transparent 28%), radial-gradient(circle at 85% 75%, rgba(251,191,36,0.16), transparent 26%)",
          }}
        />

        <PageShell className="relative z-10 px-4 sm:px-6 lg:px-8">
          <Reveal>
            <AnimatedLabel className="mb-8 text-gray-500">
              WHAT I BRING
            </AnimatedLabel>

            <h2 className="max-w-[88rem] text-[clamp(3.25rem,7vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.065em]">
              <span className="block">Different mediums.</span>
              <span className="block lg:ml-[18%]">Same standard.</span>
            </h2>

            <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
              <div className="max-w-4xl space-y-8 text-xl leading-relaxed text-gray-300 lg:col-span-7">
                <p>
                  Print taught me precision. Branding taught me systems.
                  Packaging taught me commercial thinking. Publications taught
                  me structure and readability. Web design taught me clarity.
                  Exhibitions taught me how people move through physical spaces.
                  Motion and 3D taught me how ideas can be experienced rather
                  than simply viewed.
                </p>

                <p>
                  The result is a broad perspective that allows me to move
                  between print, digital and physical environments while keeping
                  the same standard of craftsmanship and attention to detail.
                </p>

                <div
                  aria-hidden="true"
                  className="h-[2px] w-32"
                  style={{
                    backgroundImage: "var(--tbds-accent-gradient)",
                  }}
                />
              </div>

              <div className="hidden lg:col-span-5 lg:block">
                <div className="relative ml-auto aspect-[5/4] max-w-[30rem] overflow-hidden rounded-[7rem_1.5rem_7rem_1.5rem] border border-white/10 bg-white/5 shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-1000 hover:scale-[1.04]"
                    style={{
                      backgroundImage: `url("${remoteImages.studioTexture}")`,
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/38"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </section>

      {/* FULL-WIDTH CTA */}

      <section className="relative overflow-hidden bg-black py-24 text-white sm:py-28 lg:py-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-[0.14] grayscale"
          style={{
            backgroundImage: `url("${remoteImages.studioTexture}")`,
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(99,102,241,0.26), rgba(251,191,36,0.16))",
            animation:
              "tbds-about-glow-drift 12s ease-in-out infinite alternate",
          }}
        />

        <PageShell className="relative z-10 px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <AnimatedLabel className="mb-6 text-gray-500">
                  LOOKING FORWARD
                </AnimatedLabel>

                <h2 className="max-w-5xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] md:text-7xl">
                  The work continues
                </h2>

                <p className="mt-10 max-w-3xl text-xl leading-relaxed text-gray-300">
                  Tan Bui Designs is my long-term creative home. A place to
                  create meaningful work, explore new ideas and help
                  organisations communicate more clearly.
                </p>
              </div>

              <div className="lg:pb-2">
                <Button
                  href="/contact"
                  variant="accent"
                  size="lg"
                  expandOnHover
                  showArrow
                  className="hover:shadow-[0_18px_48px_-14px_rgba(199,210,254,0.85),0_14px_44px_-16px_rgba(254,202,202,0.75),0_22px_48px_-18px_rgba(254,249,195,0.72)]"
                >
                  Start a Conversation
                </Button>
              </div>
            </div>
          </Reveal>
        </PageShell>
      </section>

      <AboutPageMotionStyles />
    </main>
  );
}

function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[96rem] ${className}`}>
      {children}
    </div>
  );
}

function HeroAmbient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-16 top-[12%] h-64 w-64 rounded-full opacity-60 blur-3xl sm:h-80 sm:w-80"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(99,102,241,0.20), rgba(251,191,36,0.16))",
          animation:
            "tbds-about-glow-drift 11s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute -right-10 bottom-[6%] h-72 w-72 rounded-full opacity-50 blur-3xl sm:h-96 sm:w-96"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(99,102,241,0.18))",
          animation:
            "tbds-about-glow-drift-reverse 14s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute right-[7%] top-[8%] hidden h-32 w-32 rounded-full border border-black/10 lg:block"
        style={{
          animation:
            "tbds-about-shape-float 10s ease-in-out infinite alternate",
        }}
      />

      <div
        className="absolute bottom-[7%] right-[36%] hidden h-24 w-24 rotate-12 rounded-[1.75rem] border border-black/10 lg:block"
        style={{
          animation:
            "tbds-about-shape-float-reverse 12s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

function StudioMosaic() {
  return (
    <div className="grid min-h-[32rem] grid-cols-12 auto-rows-[8rem] gap-3 sm:auto-rows-[10rem] lg:min-h-[42rem] lg:auto-rows-[13rem]">
      <MosaicImage
        src="/about/about-02.webp"
        alt="Tan Bui working in a photography studio"
        className="col-span-8 row-span-1 rounded-[1.5rem_1.5rem_4rem_1.5rem]"
      />

      <MosaicImage
        src="/about/about-04.webp"
        alt="Creative studio setup during a photoshoot"
        className="col-span-4 row-span-1 rounded-[4rem_1.5rem_1.5rem_1.5rem]"
      />

      <MosaicImage
        src="/about/about-03.webp"
        alt="Tan Bui in a creative studio environment"
        className="col-span-5 row-span-2 rounded-[1.5rem_4rem_1.5rem_1.5rem]"
      />

      <MosaicImage
        src="/about/about-05.webp"
        alt="Behind the scenes studio photography"
        className="col-span-7 row-span-2 rounded-[1.5rem_1.5rem_4rem_1.5rem]"
      />
    </div>
  );
}

function MosaicImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden border border-gray-200 bg-gray-100 shadow-[0_22px_70px_rgba(0,0,0,0.06)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 70vw, 44vw"
        className="object-cover grayscale transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035] group-hover:grayscale-0 group-active:grayscale-0"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-20"
      />
    </div>
  );
}

function JourneyTimeline() {
  return (
    <div className="relative mt-16 md:mt-20">
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[1.22rem] top-8 border-l-2 border-dashed border-gray-200 md:left-[10.72rem]"
      />

      <ol className="space-y-8 md:space-y-10">
        {timeline.map((item, index) => (
          <li key={item.title} className="relative">
            <Reveal delay={index * 70}>
              <article className="relative md:grid md:grid-cols-[9rem_minmax(0,1fr)] md:gap-14">
                <p className="hidden pt-7 text-sm uppercase tracking-[0.22em] text-gray-500 md:block">
                  {item.year}
                </p>

                <span
                  aria-hidden="true"
                  className="absolute left-[0.75rem] top-7 z-10 h-4 w-4 rounded-full border-4 border-white bg-gray-300 shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-all duration-500 md:left-[10.25rem]"
                  style={{
                    backgroundImage:
                      index === timeline.length - 1
                        ? "var(--tbds-accent-gradient)"
                        : undefined,
                  }}
                />

                <div className="group ml-12 rounded-[1.35rem] border border-gray-200 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.07),0_0_42px_rgba(99,102,241,0.08)] md:ml-0 md:p-8">
                  <p className="mb-5 text-xs uppercase tracking-[0.22em] text-gray-500 md:hidden">
                    {item.year}
                  </p>

                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-semibold sm:text-3xl">
                        {item.title}
                      </h3>

                      <p className="mt-5 max-w-4xl text-lg leading-relaxed text-gray-600 sm:text-xl">
                        {item.text}
                      </p>
                    </div>

                    <div
                      aria-hidden="true"
                      className="mt-2 hidden h-[2px] w-12 flex-none origin-right scale-x-75 transition-transform duration-500 group-hover:scale-x-150 sm:block"
                      style={{
                        backgroundImage: "var(--tbds-accent-gradient)",
                      }}
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AboutPageMotionStyles() {
  return (
    <style>
      {`
        @keyframes tbds-about-title-in {
          0% {
            opacity: 0;
            transform: translate3d(0, 26px, 0);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes tbds-about-glow-drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          100% {
            transform: translate3d(28px, -20px, 0) scale(1.08);
          }
        }

        @keyframes tbds-about-glow-drift-reverse {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          100% {
            transform: translate3d(-34px, 24px, 0) scale(1.07);
          }
        }

        @keyframes tbds-about-shape-float {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }

          100% {
            transform: translate3d(-18px, 22px, 0) rotate(9deg);
          }
        }

        @keyframes tbds-about-shape-float-reverse {
          0% {
            transform: translate3d(0, 0, 0) rotate(12deg);
          }

          100% {
            transform: translate3d(20px, -18px, 0) rotate(3deg);
          }
        }

        @keyframes tbds-about-line-drift {
          0% {
            opacity: 0.35;
            transform: translateX(-18%);
          }

          100% {
            opacity: 0.9;
            transform: translateX(18%);
          }
        }

        @keyframes tbds-about-image-drift {
          0% {
            transform: scale(1.02) translate3d(0, 0, 0);
          }

          100% {
            transform: scale(1.08) translate3d(-2%, 1.5%, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="tbds-about-"] {
            animation: none !important;
          }
        }
      `}
    </style>
  );
}
