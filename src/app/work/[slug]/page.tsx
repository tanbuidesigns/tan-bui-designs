import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import LightboxGallery from "@/components/LightboxGallery";

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
      {/* HERO */}

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

      {/* HERO IMAGE */}

      <section className="max-w-6xl mx-auto px-8">
        <div className="relative aspect-[21/9] bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* PROJECT INFO */}

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

      {/* CASE STUDY STORY */}

<section className="max-w-4xl mx-auto px-8 pb-24">
  {project.overview && (
    <>
      <h2 className="text-4xl font-bold mb-8">
        Overview
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed mb-20">
        {project.overview}
      </p>
    </>
  )}

  <h2 className="text-4xl font-bold mb-8">
    Challenge
  </h2>

  <p className="text-xl text-gray-600 leading-relaxed mb-20">
    {project.challenge}
  </p>

  {project.approach && (
    <>
      <h2 className="text-4xl font-bold mb-8">
        Approach
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed mb-20">
        {project.approach}
      </p>
    </>
  )}

  {project.solution && (
    <>
      <h2 className="text-4xl font-bold mb-8">
        Solution
      </h2>

      <p className="text-xl text-gray-600 leading-relaxed mb-20">
        {project.solution}
      </p>
    </>
  )}

  <h2 className="text-4xl font-bold mb-8">
    Outcome
  </h2>

  <p className="text-xl text-gray-600 leading-relaxed">
    {project.outcome}
  </p>
</section>

      {/* GALLERY */}

{project.gallery && (
  <section className="max-w-6xl mx-auto px-8 pb-24">
    <h2 className="text-4xl font-bold mb-12">
      Project Gallery
    </h2>

    <LightboxGallery
      images={project.gallery}
      title={project.title}
    />
  </section>
)}

{/* SERVICES */}

<section className="max-w-6xl mx-auto px-8 pb-24">
  <h2 className="text-4xl font-bold mb-12">
    Services Used
  </h2>

  <div className="flex flex-wrap gap-4">
    {project.services?.map((service) => (
      <div
        key={service}
        className="px-5 py-3 border border-gray-200 rounded-full text-sm"
      >
        {service}
      </div>
    ))}
  </div>
</section>

      {/* CTA */}

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="bg-black text-white p-12 md:p-16">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
            Similar Project?
          </p>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Let's build something meaningful.
          </h2>

          <p className="text-xl text-gray-300 mt-8 max-w-3xl">
            Whether you're planning a publication, website, exhibition,
            brand identity or digital experience, I'd love to hear
            about it.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-black px-6 py-3"
          >
            Start a Conversation
          </Link>
        </div>
      </section>

      {/* PREVIOUS / NEXT */}

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="grid md:grid-cols-2 gap-6 border-t border-gray-100 pt-12">
          <Link
            href={`/work/${previousProject.slug}`}
            className="group border border-gray-200 p-8 hover:border-black transition"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Previous Project
            </p>

            <h3 className="text-2xl font-semibold mb-3">
              {previousProject.title}
            </h3>

            <p className="text-gray-600">
              {previousProject.category}
            </p>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group border border-gray-200 p-8 hover:border-black transition text-left md:text-right"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">
              Next Project
            </p>

            <h3 className="text-2xl font-semibold mb-3">
              {nextProject.title}
            </h3>

            <p className="text-gray-600">
              {nextProject.category}
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}