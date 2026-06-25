import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const rules = [
  "The footer should close the page calmly, not compete with the main content.",
  "Footer links should remain plain text links, not boxed buttons.",
  "The Design Handbook is the only footer action that needs the accent button.",
  "The footer should stay compact and avoid repeated brand labels.",
  "The lower row should be simple and useful.",
];

const responsiveModes = [
  {
    title: "Compact",
    range: "320px+",
    description:
      "Footer content stacks vertically. Links remain easy to tap and the design system intro stays readable.",
  },
  {
    title: "Comfortable",
    range: "640px+",
    description:
      "The footer can split into left and right zones. Design system content sits left, navigation sits right.",
  },
  {
    title: "Expanded",
    range: "1024px+",
    description:
      "Spacing increases slightly, but the footer stays compact. Plain links remain visually quiet.",
  },
  {
    title: "Immersive",
    range: "1440px+",
    description:
      "The footer stays controlled and balanced. More screen width does not mean more footer content.",
  },
];

const links = ["Home", "Work", "About", "Contact"];

export default function FooterComponentPage() {
  return (
    <main className="bg-white text-black">
      <Section spacing="hero">
        <Container size="lg">
          <Link
            href="/design-handbook#components"
            className="mb-12 inline-block text-sm text-gray-500 transition-colors hover:text-black"
          >
            ← Back to Component Playground
          </Link>

          <p className="mb-8 text-sm uppercase tracking-[0.35em] text-gray-500">
            Component / Footer
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            The footer should finish the page with clarity and restraint.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-gray-600">
            The TBDS footer introduces the Tan Bui Design System without
            repeating the main brand too heavily. It keeps navigation simple,
            uses one accent action and finishes with a compact copyright line.
          </p>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-500">
            Live Preview
          </p>

          <div className="border border-gray-200 bg-gray-50 p-6 md:p-10">
            <div className="border border-gray-100 bg-white p-6 md:p-8">
              <div className="grid gap-10 sm:grid-cols-[minmax(0,24rem)_auto] sm:items-start sm:gap-12">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-gray-500 md:text-sm md:tracking-[0.34em]">
                    TAN BUI DESIGN SYSTEM
                  </p>

                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500 sm:text-base">
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

                <nav className="flex flex-col items-start gap-4 text-sm uppercase tracking-[0.15em] sm:items-end sm:text-right">
                  {links.map((item) => (
                    <span
                      key={item}
                      className="relative inline-flex text-gray-500 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[image:var(--tbds-accent-gradient)] after:transition-transform after:duration-300 hover:text-black hover:after:scale-x-100"
                    >
                      {item}
                    </span>
                  ))}
                </nav>
              </div>

              <div className="mt-10 border-t border-gray-100 pt-5 text-xs leading-relaxed text-gray-400">
                © 2026 Tan Bui Designs - Turning complex ideas into clear visual
                experiences.
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-500">
                Purpose
              </p>

              <h2 className="text-4xl font-bold leading-tight">
                Close the experience without adding clutter.
              </h2>
            </div>

            <div className="space-y-6 text-xl leading-relaxed text-gray-600">
              <p>
                The footer is not another hero section. It should provide a
                quiet ending, useful navigation and one intentional next step.
              </p>

              <p>
                The Design Handbook is treated as the main footer action because
                it gives visitors context for how the website has been built and
                how the design system works.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Design Rules
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {rules.map((rule, index) => (
              <div key={rule} className="border border-gray-200 p-6">
                <p className="mb-6 font-mono text-sm text-gray-400">
                  0{index + 1}
                </p>

                <p className="text-xl leading-relaxed text-gray-700">{rule}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Responsive Behaviour
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {responsiveModes.map((item) => (
              <div key={item.title} className="border border-gray-200 p-6">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-400">
                  {item.range}
                </p>

                <h3 className="mb-4 text-2xl font-semibold">{item.title}</h3>

                <p className="leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Interaction Pattern
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-gray-200 p-6">
              <h3 className="mb-4 text-2xl font-semibold">Plain links</h3>

              <p className="leading-relaxed text-gray-600">
                Home, Work, About and Contact remain simple text links with a
                gradient underline on hover. They are not boxed buttons.
              </p>
            </div>

            <div className="border border-gray-200 p-6">
              <h3 className="mb-4 text-2xl font-semibold">Accent action</h3>

              <p className="leading-relaxed text-gray-600">
                View Design Handbook uses the accent button because it is the
                key footer action and connects visitors to the TBDS system.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Status
          </p>

          <div className="border border-gray-200 p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                  Current Version
                </p>

                <h2 className="text-3xl font-bold">Footer v1.0</h2>
              </div>

              <span className="rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                Live Component
              </span>
            </div>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              The footer now follows the responsive experience system. It keeps
              the Design Handbook visible, keeps navigation lightweight and
              avoids unnecessary footer content.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}