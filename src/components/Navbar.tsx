"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import AnimatedLabel from "@/components/AnimatedLabel";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;

    if (menuOpen) {
      setHidden(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (menuOpenRef.current) {
        setHidden(false);
        return;
      }

      setHidden(true);

      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setHidden(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      label: "Work",
      href: "/work",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <header
      className={`
        sticky
        top-0
        z-50

        overflow-hidden

        border-b
        border-white/40

        backdrop-blur-xl

        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          hidden
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
    >
      {/* SOFT PASTEL CHROMA BEHIND GLASS */}

      <div
        className="
          absolute
          inset-0

          pointer-events-none

          bg-[image:var(--tbds-accent-gradient)]

          opacity-35
        "
      />

      {/* WHITE GLASS OVERLAY */}

      <div
        className="
          absolute
          inset-0

          bg-white/80

          backdrop-blur-2xl
        "
      />

      {/* VERY SUBTLE ACCENT LINE */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-px

          bg-[image:var(--tbds-accent-gradient)]

          opacity-70
        "
      />

      {/* CONTENT */}

      <Container size="lg" className="relative">
        <div
          className="
            flex
            items-center

            py-5
          "
        >
          <Link
            href="/"
            className="inline-block flex-shrink-0"
            aria-label="Go to homepage"
            onClick={() => setMenuOpen(false)}
          >
            <AnimatedLabel
              className="
                text-[10px]
                min-[360px]:text-[11px]
                sm:text-xs
                md:text-sm

                tracking-[0.22em]
                min-[360px]:tracking-[0.26em]
                sm:tracking-[0.3em]
                md:tracking-[0.35em]
              "
            >
              TAN BUI DESIGNS
            </AnimatedLabel>
          </Link>

          {/* EXPANDED / IMMERSIVE NAV */}

          <nav
            className="
              ml-auto

              hidden
              lg:flex

              items-center

              gap-8

              text-sm
              uppercase
              tracking-[0.15em]
            "
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  relative

                  text-gray-600

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

                  after:bg-[image:var(--tbds-accent-gradient)]

                  after:origin-left
                  after:scale-x-0

                  after:transition-transform
                  after:duration-300

                  hover:after:scale-x-100
                "
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* COMPACT / COMFORTABLE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="
              group

              ml-auto

              lg:hidden

              relative

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              border
              border-white/70

              bg-white/60

              shadow-sm
              backdrop-blur-xl

              transition-all
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]

              hover:bg-white
              hover:shadow-md
            "
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span
              className="
                absolute
                inset-0

                rounded-full

                bg-[image:var(--tbds-accent-gradient)]

                opacity-0

                transition-opacity
                duration-300

                group-hover:opacity-25
              "
            />

            <span
              className="
                relative

                flex
                h-4
                w-5
                flex-col
                justify-between
              "
            >
              <span
                className={`
                  block
                  h-px
                  w-full

                  bg-black

                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    menuOpen
                      ? "translate-y-[7px] rotate-45"
                      : "translate-y-0 rotate-0"
                  }
                `}
              />

              <span
                className={`
                  block
                  h-px
                  w-full

                  bg-black

                  transition-opacity
                  duration-200

                  ${menuOpen ? "opacity-0" : "opacity-100"}
                `}
              />

              <span
                className={`
                  block
                  h-px
                  w-full

                  bg-black

                  transition-transform
                  duration-300
                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  ${
                    menuOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }
                `}
              />
            </span>
          </button>
        </div>

        {/* COMPACT / COMFORTABLE MOBILE MENU */}

        <div
          className={`
            lg:hidden

            overflow-hidden

            transition-all
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]

            ${
              menuOpen
                ? "max-h-96 opacity-100 pb-7"
                : "max-h-0 opacity-0 pb-0"
            }
          `}
        >
          <nav
            className="
              border-t
              border-white/60

              pt-6

              flex
              flex-col
              gap-1
            "
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  group

                  flex
                  items-center

                  py-4

                  text-sm
                  uppercase
                  tracking-[0.18em]
                  text-gray-700

                  transition-colors
                  duration-300

                  hover:text-black
                "
              >
                <span
                  className="
                    inline-flex
                    items-center
                    gap-3
                  "
                >
                  <span>{link.label}</span>

                  <span
                    className="
                      transition-transform
                      duration-300
                      ease-[cubic-bezier(0.22,1,0.36,1)]

                      group-hover:translate-x-2
                    "
                  >
                    →
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}