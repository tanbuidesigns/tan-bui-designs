"use client";

import { useEffect, useMemo, useState } from "react";

import AnimatedLabel from "@/components/AnimatedLabel";

type CaseStudyServicesTickerProps = {
  id?: string;
  title?: string;
  intro?: string;
  services: string[];
};

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 3;
const HOLD_TIME = 2200;
const TRANSITION_TIME = 700;

export default function CaseStudyServicesTicker({
  id,
  title = "Services",
  intro = "A focused mix of creative, technical and production responsibilities across the project.",
  services,
}: CaseStudyServicesTickerProps) {
  const cleanServices = useMemo(() => {
    return services
      .map((service) =>
        service === "Curriculum Design"
          ? "Project Management"
          : service
      )
      .filter(
        (service, index, array) =>
          service.trim().length > 0 &&
          array.indexOf(service) === index
      );
  }, [services]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [transitionEnabled, setTransitionEnabled] =
    useState(true);

  useEffect(() => {
    setCurrentIndex(0);
    setIsRolling(false);
    setTransitionEnabled(true);
  }, [cleanServices.length]);

  useEffect(() => {
    if (cleanServices.length <= 1 || isRolling) return;

    const timeout = window.setTimeout(() => {
      setTransitionEnabled(true);
      setIsRolling(true);
    }, HOLD_TIME);

    return () => window.clearTimeout(timeout);
  }, [cleanServices.length, currentIndex, isRolling]);

  if (!cleanServices.length) return null;

  const getService = (offset: number) => {
    const nextIndex =
      (currentIndex + offset + cleanServices.length) %
      cleanServices.length;

    return cleanServices[nextIndex];
  };

  const visibleRows = [
    {
      service: getService(-1),
      position: "above",
    },
    {
      service: getService(0),
      position: "current",
    },
    {
      service: getService(1),
      position: "next",
    },
    {
      service: getService(2),
      position: "after-next",
    },
  ];

  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (event.currentTarget !== event.target || !isRolling) {
      return;
    }

    setTransitionEnabled(false);

    setCurrentIndex(
      (currentValue) =>
        (currentValue + 1) % cleanServices.length
    );

    setIsRolling(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  };

  return (
    <section
      id={id}
      className="
        mx-auto
        max-w-6xl
        scroll-mt-40
        border-t
        border-gray-100
        px-8
        py-20
      "
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <AnimatedLabel className="mb-8">
            {title}
          </AnimatedLabel>

          <p className="max-w-2xl text-xl leading-relaxed text-gray-600">
            {intro}
          </p>
        </div>

        <div
          className="
            relative
            overflow-hidden
            py-8
          "
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)",
          }}
        >
          <div
            className="mx-auto overflow-hidden"
            style={{
              height: `${ITEM_HEIGHT * VISIBLE_ITEMS}px`,
            }}
            aria-label="Project services"
          >
            <div
              className="flex flex-col"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: isRolling
                  ? `translateY(-${ITEM_HEIGHT}px)`
                  : "translateY(0)",
                transition: transitionEnabled
                  ? `transform ${TRANSITION_TIME}ms cubic-bezier(0.22,1,0.36,1)`
                  : "none",
              }}
            >
              {visibleRows.map((row, index) => {
                const isMiddle = isRolling
                  ? index === 2
                  : index === 1;

                return (
                  <div
                    key={`${row.position}-${row.service}-${currentIndex}`}
                    className="
                      flex
                      items-center
                      justify-center
                    "
                    style={{
                      height: `${ITEM_HEIGHT}px`,
                    }}
                  >
                    <p
                      className={`
                        text-center
                        text-2xl
                        font-semibold
                        leading-none
                        tracking-[-0.035em]

                        transition-all
                        duration-500

                        md:text-3xl

                        ${
                          isMiddle
                            ? "scale-100 text-black opacity-100 blur-0"
                            : "scale-[0.94] text-gray-300 opacity-55 blur-[0.2px]"
                        }
                      `}
                    >
                      {row.service}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}