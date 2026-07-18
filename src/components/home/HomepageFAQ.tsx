import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import WideShell from "@/components/ui/WideShell";

const questions = [
  {
    question: "What kind of design work do you take on?",
    answer:
      "I work across brand identity, packaging, publications, websites, exhibitions, illustration, motion and creative systems. Some projects need one focused outcome. Others need several parts brought together so they feel clear and consistent.",
  },
  {
    question: "Can you help when the brief is not fully figured out?",
    answer:
      "Yes. A lot of useful projects begin with a rough idea, a practical problem or too much information. I can help organise the requirements, ask the awkward questions early and turn the brief into something we can actually design against.",
  },
  {
    question: "Do you work with small businesses as well as larger organisations?",
    answer:
      "Yes. The scale of the organisation matters less than whether the project has a real purpose and enough room to do the work properly. I adapt the process to the people, decisions and resources involved.",
  },
  {
    question: "Can you work with an existing brand?",
    answer:
      "Absolutely. Not every project needs a new identity. I can extend an existing system, tidy up inconsistencies or create new work that feels recognisably part of the brand without copying the same layout forever.",
  },
  {
    question: "Can you handle both design and website development?",
    answer:
      "Yes. I can take a website from structure and visual direction through to a working responsive build. Where a project needs specialist infrastructure or a larger development team, I can define the design system clearly and work alongside the right technical people.",
  },
  {
    question: "How does a project normally start?",
    answer:
      "Usually with a conversation about what needs to change, who the work is for and what a useful result looks like. From there I can define the scope, priorities and practical next steps before we disappear into colours and typefaces.",
  },
  {
    question: "Do you work remotely?",
    answer:
      "Yes. I am based in West Yorkshire and work with organisations locally and remotely. Clear communication, sensible review points and well-organised files keep the process moving wherever the team is based.",
  },
  {
    question: "How do you price design work?",
    answer:
      "Pricing depends on the scope, complexity, timescale and level of support required. Once I understand the job, I provide a clear proposal so you know what is included and where the boundaries are.",
  },
  {
    question: "What makes your approach different?",
    answer:
      "I bring together visual craft, production experience and technical understanding. That means I care about the idea, but I also care about whether it can be produced, maintained, understood and used in the real world.",
  },
] as const;

export default function HomepageFAQ() {
  return (
    <section className="border-t border-black/8 bg-[#f4f4f1] py-20 sm:py-24 lg:py-28" aria-labelledby="homepage-faq-title">
      <WideShell>
        <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
          <div>
            <AnimatedLabel className="mb-6">Frequently asked</AnimatedLabel>
            <AnimatedHeadline
              as="h2"
              id="homepage-faq-title"
              className="max-w-xl text-4xl font-bold leading-[0.96] tracking-[-0.05em] [text-wrap:balance] sm:text-5xl lg:text-6xl"
              chunks={["Questions before", "we start"]}
            />
          </div>

          <div className="border-t border-black/14">
            {questions.map((item) => (
              <details key={item.question} name="homepage-faq" className="group border-b border-black/14">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-lg font-semibold leading-tight marker:hidden sm:min-h-20 sm:text-xl [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span aria-hidden="true" className="relative h-8 w-8 flex-none rounded-full border border-black/15 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none before:absolute before:left-1/2 before:top-1/2 before:h-px before:w-3 before:-translate-x-1/2 before:bg-black after:absolute after:left-1/2 after:top-1/2 after:h-3 after:w-px after:-translate-y-1/2 after:bg-black" />
                </summary>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr] motion-reduce:transition-none">
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-8 text-base leading-relaxed text-gray-600 sm:pb-7 sm:text-lg">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </WideShell>
    </section>
  );
}
