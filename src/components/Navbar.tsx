"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";
import styles from "@/components/Navbar.module.css";
import { showPlayground } from "@/lib/site-visibility";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  ...(showPlayground
    ? [{ label: "Playground", href: "/playground" } as const]
    : []),
  { label: "Blog", href: "/blog" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
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

    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => {
      firstMobileLinkRef.current?.focus();
    });
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopMedia.addEventListener("change", closeAtDesktop);

    return () => {
      window.cancelAnimationFrame(frame);
      desktopMedia.removeEventListener("change", closeAtDesktop);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame: number | null = null;
    let lastY = Math.max(0, window.scrollY);
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

      if (currentY < 80 || menuOpenRef.current || focusInsideRef.current) {
        setHidden(false);
        travelled = 0;
      } else if (direction !== 0) {
        if (direction !== lastDirection) {
          travelled = 0;
          lastDirection = direction;
        }

        travelled += Math.abs(delta);

        if (direction === 1 && travelled >= 28 && currentY > 104) {
          setHidden(true);
          travelled = 0;
        } else if (direction === -1 && travelled >= 16) {
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
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

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
      className={`${styles.header} sticky top-0 z-50 border-b backdrop-blur-xl transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        scrolled
          ? "border-white/8 shadow-[0_12px_42px_rgba(0,0,0,0.22)]"
          : "border-white/5"
      } ${
        hidden && !menuOpen
          ? "pointer-events-none -translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[image:var(--tbds-accent-gradient)] opacity-20 blur-[0.3px]"
      />

      <WideShell className="relative">
        <div className="flex min-h-12 items-center gap-5 py-1 lg:min-h-14 lg:py-0">
          <Link
            href="/"
            className={`${styles.brand} group inline-flex min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a]`}
            aria-label="Tan Bui Designs homepage"
            onClick={closeMenu}
          >
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 20 100 60" role="presentation">
                <defs>
                  <linearGradient id="tbds-navbar-logo" x1="5" y1="50" x2="95" y2="50" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#c7d2fd" />
                    <stop offset="0.48" stopColor="#f5ccd3" />
                    <stop offset="1" stopColor="#fef9c3" />
                  </linearGradient>
                </defs>
                <g fill="url(#tbds-navbar-logo)">
                  <path d="M55.5 47.3c0-3-2.5-5.4-5.5-5.4H39.2V31.1c-3 0-5.5 2.5-5.5 5.6v21.4c0 3 2.5 5.5 5.5 5.5 0 3 2.4 5.4 5.4 5.4h10.8v-5.4h5.4V52.8c0-3-2.4-5.3-5.3-5.4Zm-16.3 16.2V47.3h16.1v16.1H39.2Z" />
                  <path d="M87.8 31.1v10.8H77.1c-3 0-5.4 2.4-5.5 5.4-3 0-5.4 2.5-5.4 5.5v10.7h5.4V69h10.7c3 0 5.4-2.4 5.5-5.4 3 0 5.4-2.5 5.4-5.4V36.7c0-3-2.4-5.4-5.4-5.4Zm-.1 32.4H71.6V47.4h16.1v16.1Z" />
                  <path d="M28.4 68.9H23c-3 0-5.4-2.4-5.4-5.4-3 0-5.3-2.4-5.4-5.4V47.3H6.8v-2.8c0-1.5 1.2-2.7 2.7-2.7h2.7v-5.5c0-3 2.4-5.3 5.4-5.3v10.8h10.8v5.5H17.6v16.2h10.8v5.4Z" />
                </g>
              </svg>
            </span>
          </Link>

          <nav
            className="ml-auto hidden items-center gap-7 text-[0.72rem] font-medium uppercase tracking-[0.16em] lg:flex xl:gap-9"
            aria-label="Primary navigation"
          >
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative py-2 transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-[image:var(--tbds-accent-gradient)] after:transition-transform after:duration-500 ${
                    active
                      ? "text-white after:scale-x-100"
                      : "text-white/62 after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/contact" variant="gradient" size="sm" showArrow>
              Contact us
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => {
              setHidden(false);
              setMenuOpen((current) => !current);
            }}
            className="relative ml-auto flex h-11 w-11 items-center justify-center rounded-[0.85rem] border border-white/16 bg-white/8 shadow-sm transition-[background-color,transform] duration-200 ease-out hover:bg-white/12 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a] lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-full bg-white transition-transform duration-200 ease-out ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-full bg-white transition-opacity duration-150 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-full bg-white transition-transform duration-200 ease-out ${menuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>

        <nav
          id="mobile-navigation"
          className={`${styles.mobileMenu} lg:hidden ${
            menuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
        >
            <div className={`${styles.mobileMenuInner} flex flex-col`}>
              {links.map((link, index) => (
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? undefined : -1}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-between border-b border-white/8 text-sm font-medium uppercase tracking-[0.16em] transition-[color,transform,background-color] duration-300 hover:translate-x-1 hover:bg-white/[0.035] hover:text-white active:translate-x-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white ${
                    isActive(link.href) ? "text-white" : "text-white/72"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                tabIndex={menuOpen ? undefined : -1}
                aria-current={pathname === "/contact" ? "page" : undefined}
                className="mt-5 inline-flex min-h-14 items-center justify-center gap-3 border border-white/25 bg-[image:var(--tbds-accent-gradient)] px-6 text-sm font-medium uppercase tracking-[0.16em] text-black transition-[transform,filter] duration-300 hover:-translate-y-px hover:saturate-125 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a]"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            </div>
        </nav>
      </WideShell>
    </header>
  );
}
