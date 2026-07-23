import type { ReactNode } from "react";
import BlogMediaPromo from "./BlogMediaPromo";
import styles from "./BlogArticleBlocks.module.css";
import type { BlogPromoMediaKey } from "@/lib/blog-promo-media";

export function CardGrid({ children }: { children: ReactNode }) { return <div className={styles.cardGrid}>{children}</div>; }
export function Card({ title, children }: { title: string; children: ReactNode }) { return <section className={styles.card} data-homepage-scroll-hover><span className={styles.marker} aria-hidden="true" /><h3>{title}</h3><div>{children}</div></section>; }
export function AccordionGroup({ children }: { children: ReactNode }) { return <div className={styles.accordionGroup}>{children}</div>; }
export function Accordion({ question, children }: { question: string; children: ReactNode }) { return <details className={styles.accordion}><summary>{question}</summary><div>{children}</div></details>; }
export function MediaPromo(props: { mediaKey: BlogPromoMediaKey; eyebrow: string; title: string; href: "/contact" | "/work/islamiyah-series"; linkLabel: string; icon: "learning-system" | "conversation"; children: ReactNode }) { return <BlogMediaPromo {...props} />; }
