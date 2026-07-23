"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

import type { BlogPromoImage } from "@/lib/blog-promo-media";
import styles from "./BlogPromoCarousel.module.css";

const tapThreshold = 8;
const swipeThreshold = 48;

export function nextPromoIndex(index: number, length: number) { return Math.min(index + 1, length - 1); }
export function previousPromoIndex(index: number) { return Math.max(index - 1, 0); }

export default function BlogPromoCarousel({ images, href, title }: { images: readonly BlogPromoImage[]; href: string; title: string }) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const direction = useRef<"horizontal" | "vertical" | null>(null);
  const regionId = useId();

  const move = (step: 1 | -1) => { setHasInteracted(true); setActive((current) => step === 1 ? nextPromoIndex(current, images.length) : previousPromoIndex(current)); };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x; const dy = event.clientY - start.current.y;
    if (!direction.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) direction.current = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
    if (direction.current === "horizontal") { dragged.current = true; setDragOffset(dx); }
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return;
    const dx = event.clientX - start.current.x; const dy = event.clientY - start.current.y;
    const gesture = direction.current; start.current = null; direction.current = null; setIsDragging(false); setDragOffset(0);
    if (gesture === "vertical" || Math.abs(dy) > Math.abs(dx)) { dragged.current = false; return; }
    if (Math.abs(dx) >= swipeThreshold) { dragged.current = true; move(dx < 0 ? 1 : -1); return; }
    if (Math.hypot(dx, dy) > tapThreshold) { dragged.current = true; return; }
    if (!dragged.current) window.location.assign(href);
  };

  const transform = `translate3d(calc(-${active * 100}% + ${dragOffset}px),0,0)`;
  return <div className={styles.carousel} role="region" aria-roledescription="carousel" aria-labelledby={regionId}>
    <span id={regionId} className="sr-only">{title} images</span>
    <div className={styles.viewport} role="button" tabIndex={0} aria-label={`Open ${title}`} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); window.location.assign(href); } }} onPointerDown={(event) => { start.current = { x: event.clientX, y: event.clientY }; direction.current = null; dragged.current = false; setIsDragging(true); event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <div className={styles.track} style={{ transform, transition: isDragging ? "none" : undefined }}>
      {images.map((image) => <div key={image.src} className={styles.slide}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 899px) calc(100vw - 64px), 30rem" draggable={false} className={styles.image} />
      </div>)}
      </div>
    </div>
    <div className={styles.controls}>
      <button type="button" disabled={active === 0} onClick={() => move(-1)} aria-label={`Previous ${title} image`}>←</button>
      <button type="button" disabled={active === images.length - 1} onClick={() => move(1)} aria-label={`Next ${title} image`}>→</button>
    </div>
    {!hasInteracted && images.length > 1 ? <div className={styles.swipe} aria-hidden="true">↔ <span>Swipe</span></div> : null}
  </div>;
}
