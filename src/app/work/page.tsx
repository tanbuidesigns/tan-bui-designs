import FeaturedWorkSection from "@/components/FeaturedWorkSection";

export default function WorkPage() {
  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 pt-24">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
          Work
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
          Selected projects across print, digital and physical experiences.
        </h1>
      </section>

      <FeaturedWorkSection />
    </main>
  );
}