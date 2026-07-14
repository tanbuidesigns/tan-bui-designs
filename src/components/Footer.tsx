import Link from "next/link";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";

const internalLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

const mobileColumns = [internalLinks.slice(0, 3), internalLinks.slice(3)] as const;

const footerLinkClass =
  "relative inline-flex min-h-11 items-center text-sm uppercase tracking-[0.15em] text-white/62 transition-all duration-300 hover:-translate-y-px hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[image:var(--tbds-accent-gradient)] after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none";

export default function Footer() {
  return (
    <footer className="relative isolate mt-auto overflow-clip border-t border-white/10 bg-[#07080a] text-white">
      <ArtworkBackground variant="subtle" />

      <WideShell className="relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-11 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-20">
          <div>
            <AnimatedLabel tone="dark" className="mb-5 text-white/48">
              Design, craft and clear thinking
            </AnimatedLabel>
            <AnimatedHeadline
              as="p"
              tone="dark"
              className="max-w-5xl text-[clamp(3rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.07em]"
            >
              Tan Bui Designs
            </AnimatedHeadline>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/62 sm:text-lg">
              A living design system behind this portfolio, built around layout
              rules, motion principles, reusable components and responsive
              experience modes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/contact" variant="gradient" size="lg" showArrow>
                Start a project
              </Button>
              <Link
                href="/design-handbook"
                className="text-sm text-white/58 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              >
                View Design Handbook
              </Link>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-8 lg:block lg:text-right" aria-label="Footer navigation">
            {mobileColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col lg:items-end">
                {column.map((link) => (
                  <Link key={link.href} href={link.href} className={footerLinkClass}>
                    {link.label}
                  </Link>
                ))}
                {columnIndex === 1 ? (
                  <a
                    href="https://www.linkedin.com/in/tanbuidesigns/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-11 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/38 sm:mt-14">
          <p>
            © {new Date().getFullYear()} Tan Bui Designs - Turning complex ideas
            into clear visual experiences.
          </p>
        </div>
      </WideShell>
    </footer>
  );
}
