"use client";

import Link from "next/link";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

export default function Footer() {
  const links = [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-gray-100 mt-auto">
      <Reveal>
        <div className="max-w-6xl mx-auto px-8 py-16 flex flex-col md:flex-row gap-10 md:items-end md:justify-between">
          <div>
            <Link href="/" className="inline-block">
              <AnimatedLabel>
                TAN BUI DESIGNS
              </AnimatedLabel>
            </Link>

            <p className="text-gray-500 mt-4 leading-relaxed">
              Turning complex ideas into clear visual experiences.
            </p>
          </div>

          <nav className="flex gap-8 text-sm uppercase tracking-[0.15em]">
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
                  after:origin-left
                  after:scale-x-0
                  after:bg-gray-300
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
      </Reveal>
    </footer>
  );
}