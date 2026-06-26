import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-32">
        <Link
          href="/work"
          className="inline-block mb-12 text-sm text-gray-500 transition-colors duration-300 hover:text-black"
        >
          ← Back to work
        </Link>

        <p className="mb-6 text-xs uppercase tracking-[0.24em] text-gray-500">
          {project.category}
        </p>

        <h1 className="max-w-5xl text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
          {project.title}
        </h1>

        <p className="mt-8 max-w-3xl text-xl text-gray-600 leading-relaxed">
          {project.result}
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Project
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {project.title}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Category
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {project.category}
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Result
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {project.result}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}