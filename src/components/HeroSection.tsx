import ScrollHighlightText from "./ScrollHighlightText";
export default function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-32">
      <div className="hero-brand mb-12">
  {"TAN BUI DESIGNS".split("").map((letter, index) => (
    <span
      key={index}
      className={`hero-letter ${
        letter === " " ? "mx-2" : ""
      }`}
      style={{
        transitionDelay: `${index * 25}ms`,
      }}
    >
      {letter}
    </span>
  ))}
</div>

      <div className="w-full">
        <h1 className="font-bold tracking-tight leading-[0.92]">
          <span className="block text-6xl md:text-7xl">
            Design that
          </span>

          <div className="flex items-center mt-2">
  <span className="text-6xl md:text-7xl whitespace-nowrap">
    solves problems
  </span>

  <span className="hero-line ml-4"></span>
</div>

          <span className="block text-6xl md:text-7xl text-gray-300 mt-4">
            not just fills{" "}
            <span className="hero-space text-black">
              space.
            </span>
          </span>
        </h1>

        <p className="text-xl mt-16 max-w-3xl text-gray-600 leading-relaxed">
  I've worked across branding, packaging, publications,
  websites and exhibitions. Some projects ended up on
  supermarket shelves. Some helped schools and charities
  communicate more clearly. Others reached tens of thousands
  of readers. Different industries. Same goal.{" "}
  <ScrollHighlightText />
</p>
      </div>
    </section>
  );
}

