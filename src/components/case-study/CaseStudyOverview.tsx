"use client";

import Reveal from "@/components/Reveal";

type CaseStudyOverviewProps = {
  client: string;
  industry: string;
  timeline: string;
  role: string[];
};

export default function CaseStudyOverview({
  client,
  industry,
  timeline,
  role,
}: CaseStudyOverviewProps) {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24 border-t border-gray-100">
      <Reveal>
        <div className="case-study-overview-grid">
          <div className="case-study-overview-client">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Client
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {client}
            </p>
          </div>

          <div className="case-study-overview-industry">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Industry
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {industry}
            </p>
          </div>

          <div className="case-study-overview-timeline">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Timeline
            </p>

            <p className="text-xl text-gray-800 leading-relaxed">
              {timeline}
            </p>
          </div>

          <div className="case-study-overview-role">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-gray-500">
              Role
            </p>

            <div className="case-study-overview-role-list text-xl text-gray-800 leading-relaxed">
              {role.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <style jsx>{`
        .case-study-overview-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          grid-template-areas:
            "client role"
            "timeline role"
            "industry role";
          column-gap: 3rem;
          row-gap: 3rem;
        }

        .case-study-overview-client {
          grid-area: client;
        }

        .case-study-overview-industry {
          grid-area: industry;
        }

        .case-study-overview-timeline {
          grid-area: timeline;
        }

        .case-study-overview-role {
          grid-area: role;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .case-study-overview-role-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.5rem;
        }

        @media (min-width: 1024px) {
          .case-study-overview-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            grid-template-areas: "client industry timeline role";
            column-gap: 3rem;
            row-gap: 3rem;
          }

          .case-study-overview-role {
            display: block;
            height: auto;
          }

          .case-study-overview-role-list {
            display: block;
          }

          .case-study-overview-role-list p + p {
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}