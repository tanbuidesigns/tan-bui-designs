import Image from "next/image";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

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
    </main>
  );
}