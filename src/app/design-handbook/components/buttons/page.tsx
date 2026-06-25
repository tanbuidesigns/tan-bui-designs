import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";

const buttonRules = [
  "Buttons should make the next action obvious without shouting for attention.",
  "Primary buttons are used for the most important action on a page.",
  "Secondary buttons support exploration without competing with the primary action.",
  "Ghost buttons are used for low-pressure navigation or supporting links.",
  "Accent buttons are reserved for key moments, not repeated everywhere.",
  "Arrow motion should support direction. It should not be added to every link.",
  "Hover motion should feel calm, useful and intentional.",
];

const buttonTypes: {
  name: string;
  purpose: string;
  example: string;
  variant: ButtonVariant;
  expandOnHover?: boolean;
  showArrow?: boolean;
}[] = [
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
    name: "Accent",
    purpose:
      "Used sparingly for important moments where the action needs extra emphasis.",
    example: "View Design Handbook",
    variant: "accent",
    expandOnHover: true,
    showArrow: true,
  },
];

const behaviourTypes = [
  {
    title: "expandOnHover",
    description:
      "Expands the button horizontally on hover. Best used for CTA moments where the button should feel responsive and alive.",
    code: `<Button variant="accent" expandOnHover>
  Start a Project
</Button>`,
  },
  {
    title: "showArrow",
    description:
      "Adds a built-in arrow and animates it to the right on hover. Do not manually add the arrow in the button text when using this prop.",
    code: `<Button variant="accent" showArrow>
  Start a Conversation
</Button>`,
  },
  {
    title: "expandOnHover + showArrow",
    description:
      "The main CTA behaviour. The button expands and the arrow moves right, matching the motion used in the homepage CTA.",
    code: `<Button
  href="/contact"
  variant="accent"
  expandOnHover
  showArrow
>
  Start a Conversation
</Button>`,
  },
];

const usageGuidelines = [
  {
    title: "Do",
    items: [
      "Use one clear primary action per section.",
      "Keep button labels short and direct.",
      "Reserve the accent button for important actions.",
      "Use arrow motion when the action moves the user forward.",
      "Use plain text links when a button would feel too heavy.",
    ],
  },
  {
    title: "Don’t",
    items: [
      "Do not turn every link into a boxed button.",
      "Do not use the accent button for every action.",
      "Do not manually type an arrow if showArrow is already enabled.",
      "Do not rely only on hover for important meaning.",
      "Do not add motion just to make the page feel busy.",
    ],
  },
];

export default function ButtonsComponentPage() {
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
            Component / Button System
          </p>

          <h1 className="max-w-5xl text-5xl font-bold leading-[0.95] md:text-7xl">
            Buttons should guide action with clarity, restraint and confidence.
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-relaxed text-gray-600">
            The TBDS button system defines how actions behave across the
            website. Buttons should feel calm, deliberate and easy to
            understand. They should help the user move forward without making
            the interface feel noisy.
          </p>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gray-500">
            Live Preview
          </p>

          <div className="border border-gray-200 bg-gray-50 p-6 md:p-10">
            <div className="border border-gray-100 bg-white p-8 md:p-12">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>

                <Button variant="secondary">Secondary Button</Button>

                <Button variant="ghost">Ghost Button</Button>

                <Button variant="accent">Accent Button</Button>

                <Button
                  href="/design-handbook"
                  variant="accent"
                  expandOnHover
                  showArrow
                >
                  View Design Handbook
                </Button>

                <Button disabled>Disabled</Button>
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
                Buttons are decision points.
              </h2>
            </div>

            <div className="space-y-6 text-xl leading-relaxed text-gray-600">
              <p>
                A button should make the next step feel obvious. It should not
                compete with the whole page or force the user to think too hard
                about what to do next.
              </p>

              <p>
                TBDS buttons use restraint first. Black, white and grey carry
                the structure. The pastel gradient is reserved for important
                actions, focused interactions and key system moments.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Button Types
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {buttonTypes.map((button) => (
              <ButtonTypeCard
                key={button.name}
                name={button.name}
                purpose={button.purpose}
                example={button.example}
                variant={button.variant}
                expandOnHover={button.expandOnHover}
                showArrow={button.showArrow}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Motion Behaviour
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            {behaviourTypes.map((behaviour) => (
              <div
                key={behaviour.title}
                className="flex flex-col border border-gray-200 p-6"
              >
                <h3 className="text-2xl font-semibold">{behaviour.title}</h3>

                <p className="mt-4 leading-relaxed text-gray-600">
                  {behaviour.description}
                </p>

                <pre className="mt-8 overflow-x-auto bg-black p-5 text-sm leading-relaxed text-white">
                  <code>{behaviour.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
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
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
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

              <Button href="/design-handbook" variant="ghost">
                Back to Handbook
              </Button>

              <Button
                href="/contact"
                variant="accent"
                expandOnHover
                showArrow
              >
                Start a Conversation
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Full Width Behaviour
          </p>

          <div className="max-w-xl border border-gray-200 p-8">
            <Button fullWidth variant="primary">
              Start a Project
            </Button>
          </div>

          <p className="mt-6 max-w-2xl leading-relaxed text-gray-600">
            Full-width buttons are mainly useful on compact screens, forms or
            focused action areas. They should not be used just to fill space.
          </p>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Design Rules
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {buttonRules.map((rule, index) => (
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
            Usage Guidelines
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {usageGuidelines.map((group) => (
              <div key={group.title} className="border border-gray-200 p-8">
                <h3 className="mb-8 text-3xl font-bold">{group.title}</h3>

                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 leading-relaxed text-gray-600"
                    >
                      <span className="mt-[0.55em] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
            <ResponsiveCard
              title="Compact"
              text="Buttons need generous tap targets. Primary actions may become full width inside focused sections."
            />

            <ResponsiveCard
              title="Comfortable"
              text="Buttons can sit beside each other if spacing is clear, but touch behaviour still comes first."
            />

            <ResponsiveCard
              title="Expanded"
              text="Hover lift, arrow motion and gradient reveal can support clearer interaction."
            />

            <ResponsiveCard
              title="Immersive"
              text="Buttons should stay controlled. More screen width does not mean actions need to become larger."
            />
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Implementation
          </p>

          <div className="border border-gray-200 bg-gray-50 p-8">
            <p className="mb-6 leading-relaxed text-gray-600">
              The button system lives as a reusable TBDS component:
            </p>

            <pre className="overflow-x-auto bg-black p-6 text-sm leading-relaxed text-white">
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

<Button
  href="/design-handbook"
  variant="accent"
  expandOnHover
  showArrow
>
  View Design Handbook
</Button>`}</code>
            </pre>
          </div>
        </Container>
      </Section>

      <Section spacing="standard" borderTop>
        <Container size="lg">
          <p className="mb-10 text-xs uppercase tracking-[0.3em] text-gray-500">
            Version Status
          </p>

          <div className="border border-gray-200 p-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-gray-500">
                  Current Version
                </p>

                <h2 className="text-3xl font-bold">Button System v1.2</h2>
              </div>

              <span className="rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500">
                Live Component
              </span>
            </div>

            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-gray-600">
              Button styles now include CTA motion behaviour through
              expandOnHover and showArrow. This keeps the homepage CTA, About
              preview and Design Handbook actions consistent without creating
              one-off button styles.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}

function ButtonTypeCard({
  name,
  purpose,
  example,
  variant,
  expandOnHover = false,
  showArrow = false,
}: {
  name: string;
  purpose: string;
  example: string;
  variant: ButtonVariant;
  expandOnHover?: boolean;
  showArrow?: boolean;
}) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-gray-500">
        {name}
      </p>

      <h3 className="mb-4 text-2xl font-semibold">{example}</h3>

      <p className="mb-8 leading-relaxed text-gray-600">{purpose}</p>

      <Button
        variant={variant}
        expandOnHover={expandOnHover}
        showArrow={showArrow}
      >
        {example}
      </Button>
    </div>
  );
}

function ResponsiveCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="border border-gray-200 p-6">
      <h3 className="mb-4 text-2xl font-semibold">{title}</h3>

      <p className="leading-relaxed text-gray-600">{text}</p>
    </div>
  );
}