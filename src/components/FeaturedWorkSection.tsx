import { projects } from "@/data/projects";

export default function FeaturedWorkSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">
      <h2 className="text-4xl font-bold mb-16">
        Selected Work
      </h2>

      <div className="grid gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-gray-200 p-8 hover:border-black transition"
          >
            <p className="text-sm uppercase text-gray-500 mb-3">
              {project.category}
            </p>

            <h3 className="text-2xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-gray-600">
              {project.result}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}