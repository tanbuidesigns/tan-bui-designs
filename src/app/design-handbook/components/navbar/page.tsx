import Link from "next/link";

const rules = [
  "The navbar should feel calm, lightweight and present without dominating the page.",
  "The desktop navbar may use hover interactions, but mobile must not depend on hover.",
  "Colour is only used for interaction, focus or active states.",
  "The navbar should remain readable over light content and avoid heavy visual effects.",
];

const behaviours = [
  {
    title: "Desktop",
    description:
      "Full horizontal navigation with logo on the left and primary links on the right. Hover reveals the pastel gradient underline.",
  },
  {
    title: "Tablet",
    description:
      "Navigation remains visible but spacing and touch targets must be more generous. Hover effects should not be required.",
  },
  {
    title: "Mobile",
    description:
      "Mobile should become its own designed experience, likely using a compact trigger and full-screen menu rather than shrinking desktop links.",
  },
];

export default function NavbarComponentPage() {
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
          Component / Navbar
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] max-w-5xl">
          Navigation should support orientation without stealing attention.
        </h1>

        <p className="text-xl text-gray-600 mt-10 max-w-3xl leading-relaxed">
          The navbar is the primary orientation layer across Tan Bui Designs. It
          should feel light, glassy and precise. It should help users move
          through the experience without competing with the work.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-6">
          Live Preview
        </p>

        <div className="border border-gray-200 bg-gray-50 p-6 md:p-10">
          <div className="relative overflow-hidden border border-white/40 bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200 via-rose-200 to-yellow-100 opacity-35" />
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-indigo-300 via-rose-300 to-yellow-200 opacity-70" />

            <div className="relative px-6 md:px-8 py-5 flex items-center">
              <div className="uppercase tracking-[0.35em] text-xs text-gray-500">
                TAN BUI DESIGNS
              </div>

              <nav className="ml-auto flex items-center gap-5 md:gap-8 text-xs md:text-sm uppercase tracking-[0.15em]">
                {["Work", "About", "Contact"].map((item) => (
                  <span
                    key={item}
                    className="
                      group
                      relative
                      text-gray-600
                      transition-all
                      duration-300
                      hover:text-black
                    "
                  >
                    {item}

                    <span
                      className="
                        absolute
                        left-0
                        -bottom-1
                        h-px
                        w-full
                        origin-left
                        scale-x-0
                        bg-gradient-to-r
                        from-indigo-300
                        via-rose-300
                        to-yellow-200
                        transition-transform
                        duration-300
                        group-hover:scale-x-100
                      "
                    />
                  </span>
                ))}
              </nav>
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
              Help users know where they are and where they can go next.
            </h2>
          </div>

          <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
            <p>
              The navbar is not a brand billboard. It is an orientation tool.
              It should stay calm, readable and consistent across the website.
            </p>

            <p>
              The current desktop version uses a soft glass layer and a pastel
              gradient underline to show interaction without adding unnecessary
              decoration.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Design Rules
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {rules.map((rule, index) => (
            <div key={rule} className="border border-gray-200 p-6">
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
          Responsive Behaviour
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {behaviours.map((item) => (
            <div key={item.title} className="border border-gray-200 p-6">
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-20 border-t border-gray-100">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-10">
          Status
        </p>

        <div className="border border-gray-200 p-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3">
                Current Version
              </p>

              <h2 className="text-3xl font-bold">
                Navbar v1.0
              </h2>
            </div>

            <span className="rounded-full border border-gray-200 px-4 py-2 text-xs uppercase tracking-[0.18em] text-gray-500">
              Live
            </span>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed mt-8 max-w-3xl">
            Desktop navigation is active. Tablet and mobile navigation still
            need a dedicated experience rather than relying on reduced desktop
            spacing.
          </p>
        </div>
      </section>
    </main>
  );
}