"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Reveal from "@/components/Reveal";
import AnimatedLabel from "@/components/AnimatedLabel";

type PreviewItem = {
  src: string;
  alt: string;
};

type CaseStudyPreviewStripProps = {
  title?: string;
  items: PreviewItem[];
};

export default function CaseStudyPreviewStrip({
  title = "PROJECT HIGHLIGHTS",
  items,
}: CaseStudyPreviewStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollPosition = useRef(0);

  const [isDragging, setIsDragging] =
    useState(false);

  const dragStartX = useRef(0);

  const dragStartY = useRef(0);

  const dragStartScroll = useRef(0);

  const wheelResumeTimeout =
    useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    let frame: number;

    const speed = 0.25;

    const animate = () => {
      if (!isDragging) {
        const halfway =
          container.scrollWidth / 2;

        if (halfway > 0) {
          scrollPosition.current += speed;

          if (
            scrollPosition.current >=
            halfway
          ) {
            scrollPosition.current = 0;
          }

          container.scrollLeft =
            scrollPosition.current;
        }
      }

      frame =
        requestAnimationFrame(
          animate
        );
    };

    frame =
      requestAnimationFrame(
        animate
      );

    return () =>
      cancelAnimationFrame(frame);
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (wheelResumeTimeout.current) {
        clearTimeout(
          wheelResumeTimeout.current
        );
      }
    };
  }, []);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (!container) return;

    setIsDragging(true);

    dragStartX.current = e.pageX;

    dragStartScroll.current =
      container.scrollLeft;
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (
      !container ||
      !isDragging
    )
      return;

    const distance =
      e.pageX -
      dragStartX.current;

    container.scrollLeft =
      dragStartScroll.current -
      distance;

    scrollPosition.current =
      container.scrollLeft;
  };

  const handleTouchStart = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (!container) return;

    setIsDragging(true);

    dragStartX.current =
      e.touches[0].pageX;

    dragStartY.current =
      e.touches[0].pageY;

    dragStartScroll.current =
      container.scrollLeft;
  };

  const handleTouchMove = (
    e: React.TouchEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (
      !container ||
      !isDragging
    )
      return;

    const distanceX =
      e.touches[0].pageX -
      dragStartX.current;

    const distanceY =
      e.touches[0].pageY -
      dragStartY.current;

    if (
      Math.abs(distanceX) >
      Math.abs(distanceY)
    ) {
      e.preventDefault();

      container.scrollLeft =
        dragStartScroll.current -
        distanceX;

      scrollPosition.current =
        container.scrollLeft;
    }
  };

  const handleWheel = (
    e: React.WheelEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (!container) return;

    const isHorizontalScroll =
      Math.abs(e.deltaX) >
      Math.abs(e.deltaY);

    const isShiftScroll =
      e.shiftKey &&
      Math.abs(e.deltaY) > 0;

    if (
      !isHorizontalScroll &&
      !isShiftScroll
    ) {
      return;
    }

    e.preventDefault();

    setIsDragging(true);

    const scrollAmount =
      isHorizontalScroll
        ? e.deltaX
        : e.deltaY;

    container.scrollLeft +=
      scrollAmount;

    const halfway =
      container.scrollWidth / 2;

    if (halfway > 0) {
      if (
        container.scrollLeft >=
        halfway
      ) {
        container.scrollLeft -=
          halfway;
      }

      if (
        container.scrollLeft <= 0
      ) {
        container.scrollLeft +=
          halfway;
      }
    }

    scrollPosition.current =
      container.scrollLeft;

    if (wheelResumeTimeout.current) {
      clearTimeout(
        wheelResumeTimeout.current
      );
    }

    wheelResumeTimeout.current =
      setTimeout(() => {
        setIsDragging(false);
      }, 700);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  if (!items.length) return null;

  const loopItems = [
    ...items,
    ...items,
  ];

  return (
    <Reveal>
      <section className="max-w-6xl mx-auto py-24">
        <div className="px-8 mb-10">
          <AnimatedLabel>
            {title}
          </AnimatedLabel>
        </div>

        <div className="relative">
          <div
            className="
              absolute
              left-0
              top-0
              bottom-0
              w-24
              z-20
              pointer-events-none

              bg-gradient-to-r
              from-white
              to-transparent
            "
          />

          <div
            className="
              absolute
              right-0
              top-0
              bottom-0
              w-24
              z-20
              pointer-events-none

              bg-gradient-to-l
              from-white
              to-transparent
            "
          />

          <div
            ref={scrollRef}
            onMouseDown={
              handleMouseDown
            }
            onMouseMove={
              handleMouseMove
            }
            onMouseUp={stopDragging}
            onMouseLeave={
              stopDragging
            }
            onTouchStart={
              handleTouchStart
            }
            onTouchMove={
              handleTouchMove
            }
            onTouchEnd={
              stopDragging
            }
            onTouchCancel={
              stopDragging
            }
            onWheel={
              handleWheel
            }
            className="
              flex
              gap-8

              overflow-x-auto

              px-8
              py-4

              select-none

              cursor-default

              [scrollbar-width:none]
              [-ms-overflow-style:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {loopItems.map(
              (
                item,
                index
              ) => (
                <div
                  key={`${item.src}-${index}`}
                  className="
                    relative

                    w-[260px]
                    md:w-[340px]

                    aspect-[3/4]

                    flex-shrink-0

                    rounded-2xl

                    bg-gray-50

                    border
                    border-gray-100

                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    hover:border-gray-200
                    hover:shadow-lg
                  "
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="
                      (max-width:768px) 260px,
                      340px
                    "
                    className="
                      object-contain

                      p-4

                      transition-transform
                      duration-700

                      hover:scale-[1.03]
                    "
                    draggable={false}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}