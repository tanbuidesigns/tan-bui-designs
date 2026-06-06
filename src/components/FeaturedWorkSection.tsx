import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function FeaturedWorkSection() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">
      <div className="mb-16">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
          Selected Work
        </p>

        <h2 className="text-4xl md:text-6xl font-bold">
          Projects with purpose.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.title}
            href={`/work/${project.slug}`}
            className="group block border border-gray-200 hover:border-black transition overflow-hidden"
          >
            <div className="relative z-0 aspect-[4/3] bg-gray-100 border-b border-gray-200">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-8">
              <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
                {project.category}
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600">{project.result}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}