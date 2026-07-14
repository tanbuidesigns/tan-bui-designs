"use client";

import Link from "next/link";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Playground", href: "/playground" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="
        mt-auto
        border-t
        border-gray-100
        bg-white
      "
    >
      <Reveal>
        <Container size="lg">
          <div
            className="
              grid
              gap-10

              py-10

              sm:grid-cols-[minmax(0,24rem)_auto]
              sm:items-start
              sm:gap-12
              sm:py-12

              lg:grid-cols-[minmax(0,28rem)_auto]
              lg:gap-16

              2xl:py-14
            "
          >
            {/* LEFT SIDE */}

            <div>
              <Link
                href="/design-handbook"
                className="inline-block"
                aria-label="View the Tan Bui Design System"
              >
                <AnimatedLabel
                  className="
                    text-[11px]
                    sm:text-xs
                    md:text-sm

                    tracking-[0.22em]
                    sm:tracking-[0.28em]
                    md:tracking-[0.34em]
                  "
                >
                  TAN BUI DESIGN SYSTEM
                </AnimatedLabel>
              </Link>

              <p
                className="
                  mt-4

                  max-w-sm

                  text-sm
                  sm:text-base

                  text-gray-500
                  leading-relaxed
                "
              >
                A living design system behind this portfolio, built around
                layout rules, motion principles, reusable components and
                responsive experience modes.
              </p>

              <div className="mt-6">
                <Button
                  href="/design-handbook"
                  variant="accent"
                  size="md"
                  expandOnHover
                  showArrow
                >
                  View Design Handbook
                </Button>
              </div>
            </div>

            {/* RIGHT SIDE */}

            <nav
              className="
                flex
                flex-col
                items-start
                gap-4

                sm:items-end
                sm:text-right

                text-sm
                uppercase
                tracking-[0.15em]
              "
              aria-label="Footer navigation"
            >
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="
                    relative

                    inline-flex

                    text-gray-500

                    transition-all
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    hover:text-black
                    hover:-translate-y-[1px]

                    after:absolute
                    after:left-0
                    after:-bottom-1

                    after:h-px
                    after:w-full

                    after:origin-left
                    after:scale-x-0

                    after:bg-[image:var(--tbds-accent-gradient)]

                    after:transition-transform
                    after:duration-300
                    after:ease-[cubic-bezier(0.22,1,0.36,1)]

                    hover:after:scale-x-100
                  "
                >
                  {link.label}
                </Link>
              ))}

              <a
                href="https://www.linkedin.com/in/tanbuidesigns/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative inline-flex text-gray-500
                  transition-all duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:-translate-y-[1px] hover:text-black
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-black focus-visible:ring-offset-4
                  after:absolute after:left-0 after:-bottom-1
                  after:h-px after:w-full after:origin-left after:scale-x-0
                  after:bg-[image:var(--tbds-accent-gradient)]
                  after:transition-transform after:duration-300
                  after:ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:after:scale-x-100 focus-visible:after:scale-x-100
                "
              >
                LinkedIn
              </a>
            </nav>
          </div>

          {/* LOWER ROW */}

          <div
            className="
              border-t
              border-gray-100

              py-5

              text-xs
              text-gray-400
              leading-relaxed
            "
          >
            <p>
              © {new Date().getFullYear()} Tan Bui Designs - Turning complex
              ideas into clear visual experiences.
            </p>
          </div>
        </Container>
      </Reveal>
    </footer>
  );
}
