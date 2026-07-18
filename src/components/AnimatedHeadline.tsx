"use client";

import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactElement,
  ReactNode,
} from "react";

import styles from "@/components/EditorialMotion.module.css";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "div" | "span";

export type AnimatedHeadlineChunk =
  | string
  | {
      text: string;
      className?: string;
      block?: boolean;
    };

type AnimatedHeadlineBaseProps = {
  className?: string;
  as?: HeadingTag;
  id?: string;
  tone?: "light" | "dark";
};

type AnimatedHeadlineProps = AnimatedHeadlineBaseProps &
  (
    | {
        chunks: readonly AnimatedHeadlineChunk[];
        children?: never;
      }
    | {
        chunks?: undefined;
        children: ReactNode;
      }
  );

export default function AnimatedHeadline({
  children,
  className = "",
  as = "h2",
  id,
  tone = "light",
  chunks,
}: AnimatedHeadlineProps) {
  const Tag = as;
  const [activeChunk, setActiveChunk] = useState<number | null>(null);
  const tapTimeout = useRef<number | undefined>(undefined);
  let wordIndex = 0;

  const renderWords = (node: ReactNode, path = "headline"): ReactNode => {
    if (typeof node === "string") {
      return node.split(/(\s+)/).map((part, partIndex) => {
        if (!part || /^\s+$/.test(part)) return part;

        const currentWordIndex = wordIndex++;

        return (
          <span className={styles.wordClip} key={`${path}-${partIndex}`}>
            <span
              className={styles.word}
              style={
                {
                  animationDelay: `${Math.min(currentWordIndex * 45, 360)}ms`,
                  "--tbds-word-index": currentWordIndex,
                } as CSSProperties
              }
            >
              {part}
            </span>
          </span>
        );
      });
    }

    if (isValidElement(node)) {
      const element = node as ReactElement<{ children?: ReactNode }>;

      if (element.props.children === undefined) return element;

      return cloneElement(
        element,
        undefined,
        Children.map(element.props.children, (child, childIndex) =>
          renderWords(child, `${path}-${childIndex}`)
        )
      );
    }

    if (Array.isArray(node)) {
      return Children.map(node, (child, childIndex) =>
        renderWords(child, `${path}-${childIndex}`)
      );
    }

    return node;
  };

  useEffect(
    () => () => {
      if (tapTimeout.current !== undefined) {
        window.clearTimeout(tapTimeout.current);
      }
    },
    []
  );

  const triggerChunkTouch = (
    chunkIndex: number,
    event: ReactPointerEvent<HTMLSpanElement>
  ) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    if (tapTimeout.current !== undefined) window.clearTimeout(tapTimeout.current);
    setActiveChunk(chunkIndex);
    tapTimeout.current = window.setTimeout(() => {
      setActiveChunk(null);
      tapTimeout.current = undefined;
    }, 900);
  };

  return (
    <Tag
      id={id}
      data-tone={tone}
      className={`${styles.headline} tracking-[-0.05em] leading-[0.96] [text-wrap:balance] ${className}`}
    >
      {chunks
        ? chunks.map((chunk, chunkIndex) => {
            const chunkText = typeof chunk === "string" ? chunk : chunk.text;
            const chunkClassName =
              typeof chunk === "string" ? "" : chunk.className ?? "";
            const chunkIsBlock =
              typeof chunk === "string" ? false : chunk.block ?? false;

            return (
              <Fragment key={`${chunkText}-${chunkIndex}`}>
                <span
                  className={`${styles.chunk} ${
                    chunkIsBlock ? styles.chunkBlock : ""
                  } ${chunkClassName}`}
                  data-active={activeChunk === chunkIndex ? "true" : undefined}
                  onPointerUp={(event) =>
                    triggerChunkTouch(chunkIndex, event)
                  }
                >
                  {renderWords(chunkText, `chunk-${chunkIndex}`)}
                </span>
                {chunkIndex < chunks.length - 1 ? " " : null}
              </Fragment>
            );
          })
        : renderWords(children)}
    </Tag>
  );
}
