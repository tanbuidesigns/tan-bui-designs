import Link from "next/link";
import type { ReactNode } from "react";

import BlogPromoCarousel from "./BlogPromoCarousel";
import styles from "./BlogMediaPromo.module.css";
import { getBlogPromoMedia, type BlogPromoMediaKey } from "@/lib/blog-promo-media";

export default function BlogMediaPromo({ mediaKey, eyebrow, title, href, linkLabel, icon, children }: { mediaKey: BlogPromoMediaKey; eyebrow: string; title: string; href: "/contact" | "/work/islamiyah-series"; linkLabel: string; icon: "learning-system" | "conversation"; children: ReactNode }) {
  const media = getBlogPromoMedia(mediaKey);
  return <aside className={styles.promo} data-homepage-scroll-hover>
    <BlogPromoCarousel images={media.images} href={href} title={title} />
    <div className={styles.copy}><p className={styles.eyebrow}>{eyebrow}</p><span className={styles.icon} aria-hidden="true">{icon === "learning-system" ? <svg viewBox="0 0 32 32"><path d="M6 8h14v14H6zM12 4h14v14" /></svg> : <svg viewBox="0 0 32 32"><path d="M5 7h22v15H14l-6 5v-5H5zM11 14h10" /></svg>}</span><h3>{title}</h3><div className={styles.body}>{children}</div><Link href={href} className={styles.link}>{linkLabel} <span aria-hidden="true">→</span></Link></div>
  </aside>;
}
