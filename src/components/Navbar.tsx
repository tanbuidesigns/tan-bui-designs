"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AnimatedLabel from "@/components/AnimatedLabel";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
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

          bg-gradient-to-r
          from-indigo-200
          via-rose-200
          to-yellow-100

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

          bg-gradient-to-r
          from-indigo-200
          via-rose-200
          to-yellow-100

          opacity-70
        "
      />

      {/* CONTENT */}

      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-5 flex items-center">
        <Link
          href="/"
          className="inline-block flex-shrink-0"
          aria-label="Go to homepage"
        >
          <AnimatedLabel>
            TAN BUI DESIGNS
          </AnimatedLabel>
        </Link>

        <nav className="ml-auto flex items-center gap-5 md:gap-8 text-xs md:text-sm uppercase tracking-[0.15em]">
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

                after:bg-gradient-to-r
                after:from-indigo-300
                after:via-rose-300
                after:to-yellow-200

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
      </div>
    </header>
  );
}