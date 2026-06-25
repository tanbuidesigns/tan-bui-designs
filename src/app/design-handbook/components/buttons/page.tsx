import Link from "next/link";

import Button from "@/components/ui/Button";

const buttonRules = [
  "Buttons should make the next action obvious without shouting for attention.",
  "Primary buttons are used for the most important action on a page.",
  "Secondary buttons support exploration without competing with the primary action.",
  "Ghost buttons are used for low-pressure navigation or supporting links.",
  "Disabled buttons should look clearly unavailable without disappearing completely.",
  "Motion should be subtle: lift, reveal, underline or colour transition.",
];

const buttonTypes = [
  {
    name: "Primary",
    purpose: "Used for the main action on a page.",
    example: "Start a Project",
    variant: "primary",
  },
  {
    name: "Secondary",
    purpose: "Used for supporting actions or lower-priority navigation.",
    example: "View Work",
    variant: "secondary",
  },
  {
    name: "Ghost",
    purpose: "Used when the action should feel lightweight and editorial.",
    example: "Read More",
    variant: "ghost",
  },
  {
    name: "Gradient Accent",
    purpose:
      "Used sparingly for moments where interaction needs extra emphasis.",
    example: "Explore TBDS",
    variant: "accent",
  },
];

const usageGuidelines = [
  {
    title: "Do",
    items: [
      "Use one clear primary action per section.",
      "Keep button labels short and direct.",
      "Use the gradient accent as an interaction detail, not decoration.",
      "Make hover and focus states feel intentional.",
    ],
  },
  {
    title: "Don’t",
    items: [
      "Do not use multiple primary buttons beside each other.",
      "Do not make every button black.",
      "Do not rely only on hover for important meaning.",
      "Do not use loud colours unless the system has a reason.",
    ],
  },
];

export default function ButtonsComponentPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <Link
          href="/design-handbook#components"
          className="inline-block text-sm text-gray-500 hover:text-black transition-colors mb-12"
        >
          ← Back to Component Playground
        </Link>

        <p className="uppercase tracking-[0.35em] text-sm text-gray-500 mb-8">
          Component / Button System
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          Buttons should guide action with clarity, restraint and confidence.
        </h1>

        <p className="text-xl text-gray-600 mt-10 max-w-3xl leading-relaxed">
          The TBDS button system defines how actions behave across the website.
          Buttons should feel calm, deliberate and easy to understand. They
          should help the user move forward without making the interface feel
          noisy.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
          Live Preview
        </p>

        <div className="border border-gray-200 bg-gray-50 p-6 md:p-10">
          <div className="bg-white border border-gray-100 p-8 md:p-12">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                Primary Button
              </Button>

              <Button variant="secondary">
                Secondary Button
              </Button>

              <Button variant="ghost">
                Ghost Button
              </Button>

              <Button variant="accent">
                Gradient Accent
              </Button>

              <Button disabled>
                Disabled
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
              Purpose
            </p>

            <h2 className="text-4xl font-bold leading-tight">
              Buttons are decision points.
            </h2>
          </div>

          <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
            <p>
              A button should make the next step feel obvious. It should not
              compete with the whole page or force the user to think too hard
              about what to do next.
            </p>

            <p>
              TBDS buttons use restraint first. Black, white and grey carry the
              structure. The pastel gradient is used only when interaction,
              focus or progression needs to be shown.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Button Types
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {buttonTypes.map((button) => (
            <ButtonTypeCard
              key={button.name}
              name={button.name}
              purpose={button.purpose}
              example={button.example}
              variant={
                button.variant as
                  | "primary"
                  | "secondary"
                  | "ghost"
                  | "accent"
              }
            />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Button Sizes
        </p>

        <div className="border border-gray-200 p-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="secondary">
              Small
            </Button>

            <Button size="md" variant="secondary">
              Medium
            </Button>

            <Button size="lg" variant="secondary">
              Large
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Link Buttons
        </p>

        <div className="border border-gray-200 p-8">
          <div className="flex flex-wrap gap-4">
            <Button href="/work" variant="primary">
              View Work
            </Button>

            <Button href="/contact" variant="secondary">
              Contact
            </Button>

            <Button
              href="/design-handbook"
              variant="ghost"
            >
              Back to Handbook
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Full Width Behaviour
        </p>

        <div className="border border-gray-200 p-8 max-w-xl">
          <Button fullWidth variant="primary">
            Start a Project
          </Button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Design Rules
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {buttonRules.map((rule, index) => (
            <div
              key={rule}
              className="border border-gray-200 p-6"
            >
              <p className="font-mono text-sm text-gray-400 mb-6">
                0{index + 1}
              </p>

              <p className="text-xl text-gray-700 leading-relaxed">
                {rule}
              </p>

              <div className="mt-8 h-px w-12 bg-gradient-to-r from-indigo-300 via-rose-300 to-yellow-200" />
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Usage Guidelines
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {usageGuidelines.map((group) => (
            <div
              key={group.title}
              className="border border-gray-200 p-8"
            >
              <h3 className="text-3xl font-bold mb-8">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-gray-600 leading-relaxed"
                  >
                    <span className="mt-[0.55em] h-1.5 w-1.5 rounded-full bg-black flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Responsive Behaviour
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <ResponsiveCard
            title="Desktop"
            text="Buttons can use hover lift, gradient reveal and underline interactions."
          />

          <ResponsiveCard
            title="Tablet"
            text="Buttons need generous spacing and clear tap targets. Hover should not be required."
          />

          <ResponsiveCard
            title="Mobile"
            text="Buttons should be easy to tap, usually full-width for primary actions inside focused sections."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Implementation
        </p>

        <div className="border border-gray-200 p-8 bg-gray-50">
          <p className="text-gray-600 leading-relaxed mb-6">
            The button system now lives as a reusable component:
          </p>

          <pre className="overflow-x-auto bg-black text-white p-6 text-sm leading-relaxed">
            <code>{`import Button from "@/components/ui/Button";

<Button variant="primary">
  Start a Project
</Button>

<Button href="/work" variant="secondary">
  View Work
</Button>

<Button variant="ghost">
  Read More
</Button>

<Button variant="accent">
  Explore TBDS
</Button>`}</code>
          </pre>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
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
                Button System v1.1
              </h2>
            </div>

            <span className="rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500">
              Live Component
            </span>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mt-8 max-w-3xl">
            Button styles have now been extracted into a reusable TBDS component
            that can be used across the portfolio, case studies, forms and
            future Studio pages.
          </p>
        </div>
      </section>
    </main>
  );
}

function ButtonTypeCard({
  name,
  purpose,
  example,
  variant,
}: {
  name: string;
  purpose: string;
  example: string;
  variant: "primary" | "secondary" | "ghost" | "accent";
}) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-4">
        {name}
      </p>

      <h3 className="text-2xl font-semibold mb-4">
        {example}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-8">
        {purpose}
      </p>

      <Button variant={variant}>
        {example}
      </Button>
    </div>
  );
}

function ResponsiveCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="text-2xl font-semibold mb-4">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {text}
      </p>
    </div>
  );
}