import Link from "next/link";

export default function ContactCTASection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-100">
      <div className="bg-black text-white px-8 py-16 md:p-16">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
          Start a Project
        </p>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          Have an idea that needs clarity, craft and direction?
        </h2>

        <p className="text-xl text-gray-300 mt-8 max-w-3xl leading-relaxed">
          Whether it’s a brand, publication, website, exhibition or creative
          system, I can help turn your ideas into clear visual experiences.
        </p>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-block bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </section>
  );
}