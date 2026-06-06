export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="max-w-4xl mx-auto px-8 py-24">
      <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
        Case Study
      </p>

      <h1 className="text-5xl font-bold mb-8">
        {slug.replaceAll("-", " ")}
      </h1>

      <p className="text-xl text-gray-600">
        Project details will go here.
      </p>
    </main>
  );
}