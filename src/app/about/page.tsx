export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
            About
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Designing isn’t what I do. It’s how I solve problems.
          </h1>
        </div>

        <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center text-gray-400">
          Headshot placeholder
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-24 space-y-8 text-xl text-gray-600 leading-relaxed">
        <p>
          I’m Tan Bui, a multidisciplinary designer with over 15 years of
          experience spanning print, branding, packaging, publications,
          websites, motion, video and 3D visualisation.
        </p>

        <p>
          My journey began in commercial print and reprographics, where every
          detail mattered and every file had to work in the real world. That
          foundation shaped how I approach design today: not just as something
          that looks good, but something that performs with clarity and purpose.
        </p>

        <p>
          Over time, curiosity pushed me into branding, publication design,
          packaging, websites, digital campaigns, video, motion and exhibition
          design. Each discipline gave me another way to solve problems.
        </p>

        <p>
          Today I help organisations turn complex ideas into clear visual
          systems across print, digital and physical experiences.
        </p>
      </section>
    </main>
  );
}