import { projects } from "@/data/projects";

export default function FeaturedWorkSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">
      <div className="flex justify-between items-end mb-16">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-bold">
            Projects with purpose.
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group border border-gray-200 hover:border-black transition"
          >
            <div className="aspect-[4/3] bg-gray-100 border-b border-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Project image
              </span>
            </div>

            <div className="p-8">
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                {project.category}
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600">
                {project.result}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}