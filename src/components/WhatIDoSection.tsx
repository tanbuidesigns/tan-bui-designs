export default function WhatIDoSection() {
  const services = [
    {
      title: "Branding",
      description:
        "Building identities, visual systems and guidelines people actually use.",
    },
    {
      title: "Packaging",
      description:
        "From concept to production, including hundreds of commercial SKUs.",
    },
    {
      title: "Publications",
      description:
        "Books, educational resources and long-form content designed to be read.",
    },
    {
      title: "Websites",
      description:
        "Clear, purposeful websites that explain things properly.",
    },
    {
      title: "3D & Exhibitions",
      description:
        "Exhibition concepts, environments and visualisations that bring ideas to life.",
    },
    {
      title: "Creative Systems",
      description:
        "Design processes, workflows and assets that make future work easier.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-32 border-t border-gray-200">
      <div className="mb-20">
        <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6">
          What I Do
        </p>

        <h2 className="text-5xl md:text-6xl font-bold max-w-3xl">
          A mix of creative thinking, technical execution and getting things over the line.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {services.map((service) => (
          <div
            key={service.title}
            className="pb-8 border-b border-gray-200"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {service.title}
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}