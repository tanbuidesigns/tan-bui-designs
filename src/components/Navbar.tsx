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

      window.removeEventListener(
        "scroll",
        handleScroll
      );
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
        border-b
        border-gray-100
        bg-white/90
        backdrop-blur-md
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
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-5 flex items-center">
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
                text-gray-500
                transition-all
                duration-300
                ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:text-gray-700
                hover:-translate-y-[1px]

                after:absolute
                after:left-0
                after:-bottom-1
                after:h-px
                after:w-full
                after:bg-gray-300

                after:origin-left
                after:scale-x-0

                after:transition-transform
                after:duration-300
                after:ease-[cubic-bezier(0.22,1,0.36,1)]

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