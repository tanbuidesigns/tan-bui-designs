import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-24">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
          {project.category}
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
          {project.title}
        </h1>

        <p className="text-xl text-gray-600 mt-8 max-w-3xl">
          {project.intro}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8">
        <div className="relative aspect-[16/10] bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 grid md:grid-cols-3 gap-16">
        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Client
          </p>
          <p className="text-xl">{project.client}</p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Result
          </p>
          <p className="text-xl">{project.result}</p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Role
          </p>
          <ul className="space-y-2 text-xl">
            {project.role?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold mb-8">The challenge</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          {project.challenge}
        </p>

        <h2 className="text-4xl font-bold mt-20 mb-8">The outcome</h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          {project.outcome}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-12">
          <Link
            href={`/work/${previousProject.slug}`}
            className="group border border-gray-200 p-8 hover:border-black transition"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Previous Project
            </p>

            <h3 className="text-2xl font-semibold mb-3 group-hover:underline underline-offset-8">
              {previousProject.title}
            </h3>

            <p className="text-gray-600">{previousProject.category}</p>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group border border-gray-200 p-8 hover:border-black transition text-left md:text-right"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Next Project
            </p>

            <h3 className="text-2xl font-semibold mb-3 group-hover:underline underline-offset-8">
              {nextProject.title}
            </h3>

            <p className="text-gray-600">{nextProject.category}</p>
          </Link>
        </div>
      </section>
    </main>
  );
}