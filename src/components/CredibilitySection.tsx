export default function CredibilitySection() {
  const stats = [
    {
      value: "15+",
      label: "Years Experience",
    },
    {
      value: "400+",
      label: "Packaging SKUs",
    },
    {
      value: "55+",
      label: "Exhibition Designs",
    },
    {
      value: "12+",
      label: "Publications",
    },
    {
      value: "80k+",
      label: "Readers Reached",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-32">
      <div className="border-t border-gray-200 pt-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group transition-all duration-300"
            >
              <div className="text-6xl md:text-7xl font-bold tracking-tight leading-none transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </div>

              <div className="w-12 h-px bg-black my-6 transition-all duration-300 group-hover:w-20"></div>

              <div className="uppercase tracking-[0.25em] text-xs text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}