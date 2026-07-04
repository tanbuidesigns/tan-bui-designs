"use client";

import Image from "next/image";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent,
} from "react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type CaseStudyCarouselItem = {
  label: string;
  src?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type CaseStudyImageCarouselProps = {
  title: string;
  items: CaseStudyCarouselItem[];
};

export default function CaseStudyImageCarousel({
  title,
  items,
}: CaseStudyImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const targetScrollLeftRef = useRef(0);
  const downIndexRef = useRef<number | null>(null);
  const movedRef = useRef(false);
  const draggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const momentumRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] =
    useState<number | null>(null);

  const lightboxItems = items.filter((item) => item.src);

  const clampScroll = useCallback((value: number) => {
    const track = trackRef.current;

    if (!track) return value;

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    return Math.max(0, Math.min(value, maxScroll));
  }, []);

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;

    if (!track || !items.length) return 0;

    const center =
      track.scrollLeft + track.clientWidth / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter =
        card.offsetLeft + card.clientWidth / 2;

      const distance = Math.abs(center - cardCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }, [items.length]);

  const syncActiveIndex = useCallback(() => {
    const nearestIndex = getNearestIndex();

    setActiveIndex((currentIndex) =>
      currentIndex === nearestIndex
        ? currentIndex
        : nearestIndex
    );

    return nearestIndex;
  }, [getNearestIndex]);

  const cancelMomentum = useCallback(() => {
    if (momentumRef.current) {
      window.cancelAnimationFrame(momentumRef.current);
      momentumRef.current = null;
    }
  }, []);

  const writeScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track || rafRef.current) return;

    rafRef.current = window.requestAnimationFrame(() => {
      const currentTrack = trackRef.current;

      if (currentTrack) {
        currentTrack.scrollLeft =
          targetScrollLeftRef.current;

        syncActiveIndex();
      }

      rafRef.current = null;
    });
  }, [syncActiveIndex]);

  const startMomentum = useCallback(
    (initialVelocity: number) => {
      const track = trackRef.current;

      if (!track) return;

      cancelMomentum();

      let velocity = Math.max(
        -2.2,
        Math.min(2.2, initialVelocity)
      );

      let previousTime = performance.now();

      const step = (time: number) => {
        const currentTrack = trackRef.current;

        if (!currentTrack) return;

        const deltaTime = Math.min(
          32,
          time - previousTime
        );

        previousTime = time;

        if (Math.abs(velocity) < 0.015) {
          syncActiveIndex();
          momentumRef.current = null;
          return;
        }

        const nextScrollLeft = clampScroll(
          currentTrack.scrollLeft + velocity * deltaTime
        );

        const hitEdge =
          nextScrollLeft === 0 ||
          nextScrollLeft ===
            currentTrack.scrollWidth -
              currentTrack.clientWidth;

        currentTrack.scrollLeft = nextScrollLeft;

        syncActiveIndex();

        velocity *= Math.pow(0.92, deltaTime / 16.67);

        if (hitEdge) {
          velocity *= 0.35;
        }

        momentumRef.current =
          window.requestAnimationFrame(step);
      };

      momentumRef.current =
        window.requestAnimationFrame(step);
    },
    [cancelMomentum, clampScroll, syncActiveIndex]
  );

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;

      if (!track || !items.length) return;

      cancelMomentum();

      const safeIndex =
        (index + items.length) % items.length;

      const card = cardRefs.current[safeIndex];

      if (!card) return;

      const left = clampScroll(
        card.offsetLeft -
          (track.clientWidth - card.clientWidth) / 2
      );

      setActiveIndex(safeIndex);

      track.scrollTo({
        left,
        behavior: "smooth",
      });

      window.setTimeout(() => {
        syncActiveIndex();
      }, 420);
    },
    [cancelMomentum, clampScroll, items.length, syncActiveIndex]
  );

  const openLightboxByItem = useCallback(
    (item: CaseStudyCarouselItem) => {
      if (!item.src) return;

      const index = lightboxItems.findIndex(
        (lightboxItem) => lightboxItem.src === item.src
      );

      if (index === -1) return;

      setLightboxIndex(index);
    },
    [lightboxItems]
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let frame = 0;

    const handleScroll = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        syncActiveIndex();
        frame = 0;
      });
    };

    track.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    syncActiveIndex();

    return () => {
      track.removeEventListener(
        "scroll",
        handleScroll
      );

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [items.length, syncActiveIndex]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }

      cancelMomentum();
    };
  }, [cancelMomentum]);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    const track = trackRef.current;

    if (!track) return;

    cancelMomentum();

    const target = event.target as HTMLElement;

    const card = target.closest(
      "[data-reel-index]"
    ) as HTMLElement | null;

    const cardIndex = card?.dataset.reelIndex
      ? Number(card.dataset.reelIndex)
      : null;

    downIndexRef.current =
      typeof cardIndex === "number" &&
      Number.isFinite(cardIndex)
        ? cardIndex
        : null;

    pointerIdRef.current = event.pointerId;
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;
    scrollLeftRef.current = track.scrollLeft;
    targetScrollLeftRef.current = track.scrollLeft;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    movedRef.current = false;
    draggingRef.current = true;

    setIsDragging(true);

    track.style.scrollBehavior = "auto";
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (
      !track ||
      !draggingRef.current ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const distanceX =
      event.clientX - pointerStartXRef.current;

    const distanceY =
      event.clientY - pointerStartYRef.current;

    const absX = Math.abs(distanceX);
    const absY = Math.abs(distanceY);

    if (absX > 3 && absX > absY) {
      movedRef.current = true;
      event.preventDefault();

      targetScrollLeftRef.current = clampScroll(
        scrollLeftRef.current - distanceX
      );

      writeScroll();

      const now = performance.now();
      const deltaTime = now - lastTimeRef.current;

      if (deltaTime > 0) {
        velocityRef.current =
          -(event.clientX - lastXRef.current) /
          deltaTime;
      }

      lastXRef.current = event.clientX;
      lastTimeRef.current = now;
    }
  };

  const handlePointerEnd = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const track = trackRef.current;

    if (
      !track ||
      pointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    draggingRef.current = false;
    pointerIdRef.current = null;

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }

    track.style.scrollBehavior = "";

    const wasMoved = movedRef.current;
    const clickedIndex = downIndexRef.current;

    setIsDragging(false);

    if (!wasMoved && clickedIndex !== null) {
      const item = items[clickedIndex];
      openLightboxByItem(item);
      return;
    }

    if (wasMoved) {
      syncActiveIndex();
      startMomentum(velocityRef.current);
    }

    window.setTimeout(() => {
      movedRef.current = false;
      syncActiveIndex();
    }, 120);
  };

  const handleCardKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    item: CaseStudyCarouselItem
  ) => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    event.preventDefault();
    openLightboxByItem(item);
  };

  const goToPrevious = () => {
    const currentIndex = syncActiveIndex();
    scrollToIndex(currentIndex - 1);
  };

  const goToNext = () => {
    const currentIndex = syncActiveIndex();
    scrollToIndex(currentIndex + 1);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={`
          flex
          gap-5

          overflow-x-auto

          pr-10
          pt-3
          pb-10

          select-none
          touch-pan-y

          [scrollbar-width:none]
          [-ms-overflow-style:none]

          [&::-webkit-scrollbar]:hidden

          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        `}
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, black 0%, black calc(100% - 32px), transparent 100%)",
          maskImage:
            "linear-gradient(to right, black 0%, black calc(100% - 32px), transparent 100%)",
        }}
      >
        {items.map((item, index) => {
          const canOpen = Boolean(item.src);

          return (
            <div
              key={`${item.label}-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-reel-index={index}
              role={canOpen ? "button" : undefined}
              tabIndex={canOpen ? 0 : undefined}
              onKeyDown={(event) =>
                handleCardKeyDown(event, item)
              }
              className={`
                group
                relative
                block
                flex-shrink-0
                text-left
                outline-none
                ${canOpen ? "cursor-pointer" : "cursor-grab"}
              `}
              aria-label={
                canOpen ? `Open ${item.alt}` : item.alt
              }
            >
              <CarouselImageBlock
                label={item.label}
                ratio={
                  item.width && item.height
                    ? "auto"
                    : index === 0
                      ? "tall"
                      : "portrait"
                }
                width={item.width}
                height={item.height}
                src={item.src}
                alt={item.alt}
                interactive={canOpen}
                eager={index === 0 && canOpen}
              />
            </div>
          );
        })}
      </div>

      {items.length > 1 && (
        <CarouselControls
          activeIndex={activeIndex}
          total={items.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onDotClick={scrollToIndex}
        />
      )}

      {lightboxIndex !== null && (
        <CarouselLightbox
          title={title}
          items={lightboxItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function CarouselControls({
  activeIndex,
  total,
  onPrevious,
  onNext,
  onDotClick,
}: {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}) {
  return (
    <div className="mt-1 flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-500 transition-all duration-300 hover:-translate-x-0.5 hover:border-black hover:text-black"
        aria-label="Previous slide"
      >
        ←
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-center gap-4">
        <div
          className="hidden items-center gap-1.5 md:flex"
          aria-label="Carousel slide navigation"
        >
          {Array.from({ length: total }).map(
            (_, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => onDotClick(index)}
                  className="
                    flex
                    h-6
                    items-center
                    justify-center

                    rounded-full

                    transition-all
                    duration-300

                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-black
                  "
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={active ? "true" : undefined}
                >
                  <span
                    className={`
                      h-1.5
                      rounded-full
                      transition-all
                      duration-300

                      ${
                        active
                          ? "w-7 shadow-[0_0_10px_rgba(99,102,241,0.22)]"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }
                    `}
                    style={
                      active
                        ? {
                            backgroundImage:
                              "var(--tbds-accent-gradient)",
                          }
                        : undefined
                    }
                  />
                </button>
              );
            }
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[11px] text-gray-400"
          >
            ↔
          </span>

          <span>Swipe or drag to browse</span>
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-500 transition-all duration-300 hover:translate-x-0.5 hover:border-black hover:text-black"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}

function CarouselLightbox({
  title,
  items,
  startIndex,
  onClose,
}: {
  title: string;
  items: CaseStudyCarouselItem[];
  startIndex: number;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] =
    useState(startIndex);

  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>(
    []
  );

  const activeItem = items[activeIndex];

  const goToPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0
        ? items.length - 1
        : currentIndex - 1
    );
  }, [items.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === items.length - 1
        ? 0
        : currentIndex + 1
    );
  }, [items.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(startIndex);
  }, [startIndex]);

  useEffect(() => {
    const activeThumbnail =
      thumbnailRefs.current[activeIndex];

    activeThumbnail?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (
      event: globalThis.KeyboardEvent
    ) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [goToNext, goToPrevious, onClose]);

  const handleStagePointerDown = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    pointerStartXRef.current = event.clientX;
    pointerStartYRef.current = event.clientY;

    event.currentTarget.setPointerCapture(
      event.pointerId
    );
  };

  const handleStagePointerUp = (
    event: PointerEvent<HTMLDivElement>
  ) => {
    const distanceX =
      event.clientX - pointerStartXRef.current;

    const distanceY =
      event.clientY - pointerStartYRef.current;

    if (
      Math.abs(distanceX) > 60 &&
      Math.abs(distanceX) > Math.abs(distanceY)
    ) {
      if (distanceX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  if (!mounted || !activeItem?.src) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 text-white"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition duration-300 hover:bg-white hover:text-black"
        aria-label="Close lightbox"
      >
        ×
      </button>

      <div className="absolute left-5 top-5 z-30 max-w-[70vw] pr-16">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">
          {title}
        </p>

        <p className="mt-2 text-sm text-white/80">
          {activeItem.caption ?? activeItem.label}
        </p>
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="
              absolute
              left-4
              top-1/2
              z-30

              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center

              rounded-full
              bg-white/10
              text-white

              transition
              duration-300

              hover:bg-white
              hover:text-black

              md:flex
            "
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="
              absolute
              right-4
              top-1/2
              z-30

              hidden
              h-12
              w-12
              -translate-y-1/2
              items-center
              justify-center

              rounded-full
              bg-white/10
              text-white

              transition
              duration-300

              hover:bg-white
              hover:text-black

              md:flex
            "
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div
        onPointerDown={handleStagePointerDown}
        onPointerUp={handleStagePointerUp}
        className="
          flex
          h-full
          w-full
          cursor-grab
          items-center
          justify-center

          px-4
          pt-24
          pb-44

          active:cursor-grabbing

          sm:pb-40
          md:px-16
          md:pt-28
          md:pb-36
        "
      >
        <div className="relative h-full w-full max-w-7xl">
          <Image
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="100vw"
            priority
            draggable={false}
            className="object-contain"
          />
        </div>
      </div>

      <div
        className="
          absolute
          bottom-4
          left-0
          right-0
          z-30

          px-4

          md:bottom-6
          md:px-16
        "
      >
        <div
          className="
            mx-auto
            max-w-4xl
          "
        >
          <div
            className="
              flex
              gap-3
              overflow-x-auto
              px-1
              py-2

              [scrollbar-width:none]
              [-ms-overflow-style:none]

              [&::-webkit-scrollbar]:hidden
            "
            aria-label="Lightbox image thumbnails"
          >
            {items.map((item, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={`${item.label}-${index}`}
                  ref={(node) => {
                    thumbnailRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="
                    relative
                    h-14
                    w-20
                    flex-shrink-0
                    overflow-hidden

                    rounded-full

                    bg-white/10
                    p-[2px]

                    transition-all
                    duration-300

                    hover:scale-105
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-white

                    sm:h-16
                    sm:w-24
                    md:h-18
                    md:w-28
                  "
                  style={
                    active
                      ? {
                          backgroundImage:
                            "var(--tbds-accent-gradient)",
                        }
                      : undefined
                  }
                  aria-label={`View image ${index + 1}`}
                  aria-current={active ? "true" : undefined}
                >
                  <span
                    className="
                      relative
                      block
                      h-full
                      w-full
                      overflow-hidden

                      rounded-full
                      bg-black
                    "
                  >
                    {item.src && (
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="112px"
                        draggable={false}
                        className={`
                          object-cover

                          transition-all
                          duration-300

                          ${
                            active
                              ? "opacity-100"
                              : "opacity-55 hover:opacity-85"
                          }
                        `}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <p
            className="
              mt-3
              text-center
              text-xs
              text-white/45
            "
          >
            {activeIndex + 1} / {items.length}
            <span className="hidden sm:inline">
              {" "}
              · Swipe, use arrows, or press Esc to close
            </span>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

function CarouselImageBlock({
  label,
  ratio,
  src,
  alt,
  width,
  height,
  interactive = false,
  eager = false,
}: {
  label: string;
  ratio: "hero" | "wide" | "portrait" | "tall" | "auto";
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  interactive?: boolean;
  eager?: boolean;
}) {
  const ratioClass = {
    hero: "aspect-[16/9] w-full",
    wide: "aspect-[16/10] w-full",
    portrait:
      "aspect-[4/5] w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[38vw] xl:w-[430px]",
    tall:
      "aspect-[3/4] w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[38vw] xl:w-[430px]",
    auto:
      "w-[82vw] sm:w-[58vw] md:w-[46vw] lg:w-[42vw] xl:w-[560px]",
  }[ratio];

  const aspectRatio =
    width && height ? `${width} / ${height}` : undefined;

  return (
    <div
      className={`
        relative
        overflow-hidden
        bg-gray-100
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          src
            ? `
              border
              border-gray-100
              shadow-[0_3px_10px_rgba(0,0,0,0.025)]
              group-hover:shadow-[0_5px_14px_rgba(0,0,0,0.04)]
            `
            : ""
        }
        ${ratioClass}
      `}
      style={{ aspectRatio }}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? label}
            fill
            draggable={false}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            sizes="
              (max-width: 640px) 82vw,
              (max-width: 1024px) 58vw,
              560px
            "
            className="object-contain transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.006]"
          />

          {interactive && (
            <span
              aria-hidden="true"
              className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/80 text-sm text-black opacity-0 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden"
            >
              ↗
            </span>
          )}
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#f3f4f6,#ffffff,#e5e7eb)]" />

          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            <p className="max-w-sm text-sm uppercase tracking-[0.18em] text-gray-400">
              Image placeholder
              <br />
              {label}
            </p>
          </div>
        </>
      )}
    </div>
  );
}