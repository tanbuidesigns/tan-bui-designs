export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
          Contact
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Let’s build something clear, useful and meaningful.
        </h1>

        <p className="text-xl text-gray-600 mt-8 max-w-3xl">
          Whether you need branding, publication design, a website, packaging,
          exhibition design or creative direction, I’d be happy to hear about
          your project.
        </p>

        <div className="mt-16 border-t border-gray-100 pt-12">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Email
          </p>

          <a
            href="mailto:hello@tanbuidesigns.com"
            className="text-3xl font-semibold underline underline-offset-8"
          >
            hello@tanbuidesigns.com
          </a>
        </div>
      </section>
    </main>
  );
}