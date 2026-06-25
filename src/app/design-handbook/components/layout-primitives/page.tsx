import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GradientLine from "@/components/ui/GradientLine";
import Section from "@/components/ui/Section";

const layoutRules = [
  "Use layout primitives when spacing, width or accent details repeat across multiple pages.",
  "Do not use primitives to hide poor design decisions. Use them to make strong decisions reusable.",
  "Compact layouts should not be treated as reduced desktop layouts.",
  "Container padding must respect the experience mode: Compact, Comfortable, Expanded and Immersive.",
  "Section spacing should support content rhythm, not just create empty space.",
  "GradientLine should be used for official TBDS accents instead of repeating gradient classes.",
];

const primitiveCards = [
  {
    title: "Container",
    description:
      "Controls max-width, horizontal padding and responsive page alignment across experience modes.",
    usage: `<Container size="lg">...</Container>`,
  },
  {
    title: "Section",
    description:
      "Controls responsive vertical rhythm, optional borders and scroll margin.",
    usage: `<Section spacing="editorial" borderTop>...</Section>`,
  },
  {
    title: "GradientLine",
    description:
      "Creates the official TBDS accent line using the shared gradient token.",
    usage: `<GradientLine size="md" />`,
  },
];

const experienceExamples = [
  {
    mode: "Compact",
    description:
      "The same section uses tighter horizontal padding and shorter vertical rhythm on narrow screens.",
  },
  {
    mode: "Comfortable",
    description:
      "Spacing opens up for larger phones and small tablets while staying touch-first.",
  },
  {
    mode: "Expanded",
    description:
      "Content can use larger grids, side navigation and more generous vertical rhythm.",
  },
  {
    mode: "Immersive",
    description:
      "Large screens gain editorial whitespace while the container keeps content controlled.",
  },
];

export default function LayoutPrimitivesPage() {
  return (
    <main className="bg-white text-black">
      <Section spacing="hero">
        <Container size="lg">
          <Link
            href="/design-handbook#components"
            className="inline-block text-sm text-gray-500 hover:text-black transition-colors mb-12"
          >
            ← Back to Component Playground
          </Link>

          <p className="uppercase tracking-[0.35em] text-sm text-gray-500 mb-8">
            Component / Layout Primitives
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
            Layout should support every experience mode intentionally.
          </h1>

          <p className="text-xl text-gray-600 mt-10 max-w-3xl leading-relaxed">
            TBDS layout primitives keep spacing, page width, section rhythm and
            accent details consistent without forcing every device to behave
            like a smaller desktop screen.
          </p>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
            Live Preview
          </p>

          <div className="border border-gray-200 bg-gray-50 p-5 sm:p-6 lg:p-10">
            <div className="bg-white border border-gray-100">
              <Section spacing="standard">
                <Container size="md">
                  <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-6">
                    Example Section
                  </p>

                  <h2 className="text-4xl font-bold leading-tight max-w-3xl">
                    This content is wrapped with responsive-aware Section and
                    Container primitives.
                  </h2>

                  <p className="text-xl text-gray-600 mt-8 leading-relaxed">
                    Resize the browser and notice how the padding and section
                    rhythm adapt. The layout is not simply shrinking; it has
                    different spacing rules for different experience modes.
                  </p>

                  <GradientLine size="md" className="mt-10" />
                </Container>
              </Section>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
                Purpose
              </p>

              <h2 className="text-4xl font-bold leading-tight">
                Good layout should make decisions reusable.
              </h2>
            </div>

            <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
              <p>
                Layout primitives are not meant to make every page look the
                same. They make repeated layout decisions easier to maintain.
              </p>

              <p>
                This gives us a controlled foundation before designing bespoke
                mobile, tablet and desktop experiences for individual pages.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
            Experience Modes
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {experienceExamples.map((item) => (
              <div key={item.mode} className="border border-gray-200 p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {item.mode}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <GradientLine size="sm" className="mt-8" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
            Primitives
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {primitiveCards.map((item) => (
              <div key={item.title} className="border border-gray-200 p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <pre className="overflow-x-auto bg-gray-50 border border-gray-100 p-4 text-xs leading-relaxed">
                  <code>{item.usage}</code>
                </pre>

                <GradientLine size="sm" className="mt-8" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
            Design Rules
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {layoutRules.map((rule, index) => (
              <div key={rule} className="border border-gray-200 p-6">
                <p className="font-mono text-sm text-gray-400 mb-6">
                  0{index + 1}
                </p>

                <p className="text-xl text-gray-700 leading-relaxed">
                  {rule}
                </p>

                <GradientLine size="sm" className="mt-8" />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
            Implementation
          </p>

          <div className="border border-gray-200 p-8 bg-gray-50">
            <p className="text-gray-600 leading-relaxed mb-6">
              The layout system now lives as small reusable UI primitives:
            </p>

            <pre className="overflow-x-auto bg-black text-white p-6 text-sm leading-relaxed">
              <code>{`import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import GradientLine from "@/components/ui/GradientLine";

<Section spacing="editorial" borderTop>
  <Container size="lg">
    <h2>Section title</h2>
    <GradientLine size="md" />
  </Container>
</Section>`}</code>
            </pre>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
            Version Status
          </p>

          <div className="border border-gray-200 p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                  Current Version
                </p>

                <h2 className="text-3xl font-bold">
                  Layout Primitives v1.0
                </h2>
              </div>

              <span className="rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                Live Component
              </span>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed mt-8 max-w-3xl">
              Container, Section and GradientLine are now part of the TBDS
              foundation. Future pages should use these primitives where they
              reduce repeated layout classes.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/design-handbook" variant="secondary">
                Back to Handbook
              </Button>

              <Button href="/design-handbook/components/buttons" variant="ghost">
                View Button System
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}