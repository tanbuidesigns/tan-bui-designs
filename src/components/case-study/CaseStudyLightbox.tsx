"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type CaseStudyGalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
};

type CaseStudyLightboxProps = {
  items: CaseStudyGalleryItem[];
  startIndex: number;
  title: string;
  onClose: () => void;
};

function getSafeIndex(index: number, total: number) {
  if (total <= 0) return 0;

  return ((index % total) + total) % total;
}

export default function CaseStudyLightbox({
  items,
  startIndex,
  title,
  onClose,
}: CaseStudyLightboxProps) {
  const total = items.length;

  const [mounted, setMounted] = useState(false);

  const [selected, setSelected] = useState(() =>
    getSafeIndex(startIndex, total)
  );

  const [touchStart, setTouchStart] =
    useState<number | null>(null);

  const next = useCallback(() => {
    setSelected((current) =>
      getSafeIndex(current + 1, total)
    );
  }, [total]);

  const previous = useCallback(() => {
    setSelected((current) =>
      getSafeIndex(current - 1, total)
    );
  }, [total]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setSelected(getSafeIndex(startIndex, total));
  }, [startIndex, total]);

  useEffect(() => {
    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        previous();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [next, previous, onClose]);

  const handleTouchEnd = (touchEnd: number) => {
    if (touchStart === null) return;

    const difference = touchStart - touchEnd;

    if (difference > 50) {
      next();
    }

    if (difference < -50) {
      previous();
    }

    setTouchStart(null);
  };

  if (!mounted || total === 0) {
    return null;
  }

  const currentItem = items[selected];

  if (!currentItem) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery lightbox`}
      className="
        fixed
        inset-0

        z-[99999]

        flex
        items-center
        justify-center

        bg-black/95
        text-white

        p-4
        sm:p-6
        lg:p-8
      "
      onClick={onClose}
      onTouchStart={(event) =>
        setTouchStart(event.touches[0].clientX)
      }
      onTouchEnd={(event) =>
        handleTouchEnd(
          event.changedTouches[0].clientX
        )
      }
    >
      {/* TOP BAR */}

      <div
        className="
          absolute
          left-4
          right-4
          top-4
          z-20

          flex
          items-start
          justify-between
          gap-6

          sm:left-6
          sm:right-6
          sm:top-6
        "
      >
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.24em]
              text-white/50
            "
          >
            {title}
          </p>

          <p className="mt-2 text-sm text-white/70">
            {selected + 1} / {total}
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full
            bg-white/10

            text-3xl
            leading-none

            transition
            duration-300

            hover:bg-white
            hover:text-black
          "
          aria-label="Close gallery"
        >
          ×
        </button>
      </div>

      {/* PREVIOUS */}

      {total > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            previous();
          }}
          className="
            absolute
            left-3
            top-1/2
            z-20

            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center

            rounded-full
            bg-white/10

            text-3xl
            leading-none

            transition
            duration-300

            hover:-translate-x-1
            hover:bg-white
            hover:text-black

            sm:left-6
            sm:h-14
            sm:w-14
          "
          aria-label="Previous image"
        >
          ←
        </button>
      )}

      {/* IMAGE AREA */}

      <div
        className="
          relative

          flex
          h-full
          w-full
          max-w-7xl
          flex-col
          items-center
          justify-center
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div
          className="
            relative

            h-[68vh]
            w-[92vw]

            sm:h-[72vh]
            lg:h-[78vh]
          "
        >
          <Image
            src={currentItem.src}
            alt={currentItem.alt || title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="mt-5 max-w-3xl text-center">
          {currentItem.caption && (
            <p
              className="
                mb-3
                text-sm
                leading-relaxed
                text-white/70

                md:text-base
              "
            >
              {currentItem.caption}
            </p>
          )}

          <p className="text-sm text-white/40">
            Swipe, use arrows, or press Esc to close
          </p>
        </div>
      </div>

      {/* NEXT */}

      {total > 1 && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          className="
            absolute
            right-3
            top-1/2
            z-20

            flex
            h-12
            w-12
            -translate-y-1/2
            items-center
            justify-center

            rounded-full
            bg-white/10

            text-3xl
            leading-none

            transition
            duration-300

            hover:translate-x-1
            hover:bg-white
            hover:text-black

            sm:right-6
            sm:h-14
            sm:w-14
          "
          aria-label="Next image"
        >
          →
        </button>
      )}

      {/* THUMBNAILS */}

      {total > 1 && (
        <div
          className="
            absolute
            bottom-4
            left-1/2
            z-20

            flex
            max-w-[92vw]
            -translate-x-1/2
            gap-2

            overflow-x-auto

            rounded-full
            bg-black/50
            p-2

            [scrollbar-width:none]
            [-ms-overflow-style:none]

            [&::-webkit-scrollbar]:hidden
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {items.map((item, index) => {
            const active = index === selected;

            return (
              <button
                key={`${item.src}-thumb-${index}`}
                type="button"
                onClick={() => setSelected(index)}
                className={`
                  relative

                  h-10
                  w-14
                  flex-shrink-0
                  overflow-hidden

                  rounded-full
                  border

                  transition-all
                  duration-300

                  sm:h-12
                  sm:w-16

                  ${
                    active
                      ? "border-white opacity-100"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }
                `}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>,
    document.body
  );
}