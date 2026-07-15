import Link from "next/link";

import AnimatedLabel from "@/components/AnimatedLabel";
import ArtworkBackground from "@/components/ArtworkBackground";
import Button from "@/components/ui/Button";
import WideShell from "@/components/ui/WideShell";

const linkColumns = [
  [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  [
    { label: "Playground", href: "/playground" },
    { label: "Contact", href: "/contact" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/tanbuidesigns/", external: true },
    { label: "Privacy", href: "/privacy" },
  ],
] as const;

const footerLinkClass =
  "relative inline-flex min-h-10 items-center text-sm text-white/58 transition-[color,transform] duration-300 hover:-translate-y-px hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07080a] after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[image:var(--tbds-accent-gradient)] after:transition-transform hover:after:scale-x-100 focus-visible:after:scale-x-100 motion-reduce:transition-none";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-clip border-t border-white/10 bg-[#07080a] text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[image:var(--tbds-accent-gradient)] opacity-35" />
      <ArtworkBackground variant="subtle" className="opacity-[0.26]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-7 h-28 w-52 rounded-[1.25rem] border border-white/[0.055] sm:right-[9%] sm:w-64">
        <span className="absolute inset-x-4 top-4 h-px bg-white/[0.055]" />
        <span className="absolute bottom-4 left-4 h-10 w-16 rounded-md border border-white/[0.045]" />
      </div>

      <WideShell className="relative py-10 sm:py-12">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-start lg:gap-16">
          <div>
            <AnimatedLabel tone="dark" className="text-white/48">Tan Bui Designs</AnimatedLabel>
            <p className="mt-4 max-w-[29rem] text-sm leading-relaxed text-white/55 sm:text-base">
              Design, craft and clear thinking across brand, print, digital and physical experiences.
            </p>
            <div className="mt-6">
              <Button
                href="/design-handbook"
                variant="accent"
                size="md"
                showArrow
                className="focus-visible:ring-white focus-visible:ring-offset-[#07080a] hover:shadow-[0_16px_40px_-20px_rgba(199,210,254,0.8)]"
              >
                View the design handbook
              </Button>
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-x-10" aria-label="Footer navigation">
            {linkColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col">
                {column.map((link) =>
                  "external" in link ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>
                      {link.label}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-9 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/36">
          <p>© {new Date().getFullYear()} Tan Bui Designs — Turning complex ideas into clear visual experiences.</p>
        </div>
      </WideShell>
    </footer>
  );
}
