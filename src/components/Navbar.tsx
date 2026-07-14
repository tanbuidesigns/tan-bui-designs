"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);
  const menuOpenRef = useRef(false);
  const focusInsideRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;

    if (!menuOpen) return;

    setHidden(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame: number | null = null;
    let lastY = window.scrollY;
    let travelled = 0;
    let lastDirection: 1 | -1 | 0 = 0;

    const updateNavigation = () => {
      frame = null;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - lastY;
      const direction: 1 | -1 | 0 = delta > 0 ? 1 : delta < 0 ? -1 : 0;

      setScrolled((current) => {
        const next = currentY > 18;
        return current === next ? current : next;
      });

      if (currentY < 32 || menuOpenRef.current || focusInsideRef.current) {
        setHidden(false);
        travelled = 0;
      } else if (direction !== 0) {
        travelled = direction === lastDirection ? travelled + delta : delta;
        lastDirection = direction;

        if (travelled > 18 && currentY > 96) {
          setHidden(true);
          travelled = 0;
        } else if (travelled < -12) {
          setHidden(false);
          travelled = 0;
        }
      }

      lastY = currentY;
    };

    const handleScroll = () => {
      if (frame === null) {
        frame = window.requestAnimationFrame(updateNavigation);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleHeaderKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape" && menuOpen) {
      closeMenu();
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      return;
    }

    if (event.key !== "Tab" || !menuOpen || !headerRef.current) return;

    const focusable = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable.at(-1);

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <header
      ref={headerRef}
      onKeyDown={handleHeaderKeyDown}
      onFocusCapture={() => {
        focusInsideRef.current = true;
        setHidden(false);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focusInsideRef.current = false;
        }
      }}
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[transform,opacity,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        scrolled
          ? "border-black/10 bg-white/88 shadow-[0_12px_42px_rgba(0,0,0,0.07)]"
          : "border-black/5 bg-white/76"
      } ${
        hidden && !menuOpen
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[image:var(--tbds-accent-gradient)] opacity-65"
      />

      <WideShell className="relative">
        <div className="flex min-h-[4.75rem] items-center gap-5 lg:min-h-[5.25rem]">
          <Link
            href="/"
            className="group inline-flex min-w-0 flex-shrink-0 items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            aria-label="Tan Bui Designs home"
            onClick={closeMenu}
          >
            <span className="relative h-9 w-9 flex-none overflow-hidden rounded-[0.7rem] border border-black/10 bg-black shadow-sm">
              <Image src="/icon.png" alt="" fill sizes="36px" className="object-cover" />
            </span>
            <span className="truncate text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black sm:text-xs sm:tracking-[0.22em]">
              Tan Bui Designs
            </span>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-7 text-[0.72rem] font-medium uppercase tracking-[0.16em] lg:flex xl:gap-9"
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 text-gray-600 transition-colors duration-300 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-[image:var(--tbds-accent-gradient)] after:transition-transform hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
            <Button href="/contact" variant="accent" size="sm" showArrow>
              Start a project
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="relative ml-auto flex h-11 w-11 items-center justify-center rounded-[0.85rem] border border-black/10 bg-white/80 shadow-sm transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-full bg-black transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-full bg-black transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-black transition-transform ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="border-t border-black/10 pb-7 pt-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col">
              {links.map((link, index) => (
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex min-h-14 items-center justify-between border-b border-black/5 text-sm font-medium uppercase tracking-[0.16em] text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="mt-5 inline-flex min-h-14 items-center justify-center gap-3 border border-black bg-black px-6 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
              >
                Start a project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </nav>
        )}
      </WideShell>
    </header>
  );
}
