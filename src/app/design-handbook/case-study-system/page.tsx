export default function CaseStudySystemPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <p className="mb-6 text-xs uppercase tracking-[0.24em] text-gray-500">
          TBDS Case Study System
        </p>

        <h1 className="max-w-5xl text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
          Case studies need flexible structure, not one rigid template.
        </h1>

        <p className="mt-10 max-w-3xl text-xl text-gray-600 leading-relaxed">
          The case study system is built from reusable blocks, but each project
          can still have its own composition. The goal is to protect consistency
          without forcing every project into the same story shape.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Core lesson
            </p>
          </div>

          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              Do not change typography to solve a layout problem.
            </h2>

            <p className="mt-8 text-xl text-gray-600 leading-relaxed">
              If the type system already works, leave it alone. When something
              feels wrong, first ask whether the problem is content hierarchy,
              layout relationship, spacing, motion or component structure.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          What changed
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <PrincipleCard
            title="Islamiyah uses a custom case study route"
            text="The Islamiyah page is not controlled by the dynamic work slug template. It has its own route and composes reusable case study components directly."
          />

          <PrincipleCard
            title="Shorter labels can beat complex code"
            text="The long category label was replaced with Creative System. Better content hierarchy solved the animated label issue more cleanly than forcing wrapping logic."
          />

          <PrincipleCard
            title="Grid areas solved the overview layout"
            text="Client, Timeline and Industry stay grouped on compact and comfortable screens, while Role sits in a separate right column. Expanded and immersive screens return to a clean four-column scan layout."
          />

          <PrincipleCard
            title="Motion was stabilised before abstraction"
            text="The quote gradient stroke was tested in isolation first. Once the raw version worked, the motion was applied safely inside the component."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Responsive experience rules
        </h2>

        <div className="space-y-12">
          <ExperienceRule
            label="Compact"
            title="Group related small metadata."
            text="Client, Timeline and Industry stay together because they are short facts. Role is longer, so it gets its own column."
          />

          <ExperienceRule
            label="Comfortable"
            title="Keep the relationship, add breathing room."
            text="The layout should still behave like compact, but spacing and rhythm can relax slightly."
          />

          <ExperienceRule
            label="Expanded"
            title="Return to scan-friendly structure."
            text="At larger sizes, the overview can become four columns because there is enough horizontal space to scan each fact separately."
          />

          <ExperienceRule
            label="Immersive"
            title="Do not add columns just because there is space."
            text="Large desktop should feel calmer, not busier. Use controlled max widths and keep the editorial rhythm."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Motion rules learned
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">
          <RuleBlock
            title="Use gradient as an accent"
            text="Gradient should support focus and motion. It should not become decoration on every element."
          />

          <RuleBlock
            title="Use centre-out motion when cards are paired"
            text="Previous and next project cards should share the same stroke animation so the interaction feels balanced."
          />

          <RuleBlock
            title="Use React hover state when group-hover becomes fragile"
            text="When mirrored motion needs precise control, React hover state can be more predictable than layered group-hover classes."
          />

          <RuleBlock
            title="Do not abstract too early"
            text="First prove the motion works in the component. Then promote it into a reusable primitive once the behaviour is stable."
          />

          <RuleBlock
            title="Keep arrows directional"
            text="Previous arrows should move left. Next arrows should move right. The movement should match the meaning."
          />

          <RuleBlock
            title="Accessibility beats decoration"
            text="Gradient pills with white text were less legible, so the active progress label uses black text for better reading."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Components touched
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <ComponentNote
            name="CaseStudyOverview"
            text="Uses CSS grid areas to create different layout relationships across responsive experiences."
          />

          <ComponentNote
            name="CaseStudyQuote"
            text="Uses AnimatedHeadline for quote motion and stable gradient strokes controlled by hover state."
          />

          <ComponentNote
            name="CaseStudyNavigation"
            text="Uses subtle gradient strokes, centre-out card motion and directional arrow movement."
          />

          <ComponentNote
            name="CaseStudyProgressNav"
            text="Uses the TBDS gradient for active progress states while keeping label text black for legibility."
          />

          <ComponentNote
            name="ReadingProgressBar"
            text="Uses the TBDS gradient instead of black to connect reading progress with the wider motion language."
          />

          <ComponentNote
            name="Component Lab"
            text="Used to test visual primitives in isolation before applying them to real case study components."
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-12 text-3xl md:text-5xl font-bold tracking-tight">
          Current TBDS principles added
        </h2>

        <div className="space-y-8 text-xl text-gray-700 leading-relaxed">
          <p>
            1. Define the layout relationship before writing code. A responsive
            layout is not just a different number of columns.
          </p>

          <p>
            2. If a component feels broken, isolate the smallest visual part in
            the Component Lab before changing the real component.
          </p>

          <p>
            3. Content hierarchy can solve layout issues better than complex
            component logic.
          </p>

          <p>
            4. Reusable case study components should be flexible building
            blocks, not a rigid master template.
          </p>

          <p>
            5. Motion should explain direction, state or focus. It should not be
            added just because it looks nice.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <h2 className="mb-8 text-3xl md:text-5xl font-bold tracking-tight">
          Next system updates
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <NextStep text="Document AnimatedStroke properly once the quote implementation is fully stable." />
          <NextStep text="Add a Case Study Components handbook page for Hero, Overview, Quote, Gallery, Navigation and CTA." />
          <NextStep text="Review whether AnimatedHeadline, AnimatedLabel and Reveal should eventually move into a motion folder." />
          <NextStep text="Keep the Component Lab as a private testing ground before promoting patterns into TBDS." />
        </div>
      </section>
    </main>
  );
}

function PrincipleCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border border-gray-200 p-8">
      <h3 className="mb-4 text-2xl font-semibold leading-tight">{title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function ExperienceRule({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[0.35fr_1fr]">
      <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
        {label}
      </p>

      <div>
        <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
        <p className="mt-3 text-lg text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function RuleBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="mb-4 text-xl font-semibold leading-tight">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
  );
}

function ComponentNote({
  name,
  text,
}: {
  name: string;
  text: string;
}) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
        {name}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}

function NextStep({ text }: { text: string }) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <p className="text-lg text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
