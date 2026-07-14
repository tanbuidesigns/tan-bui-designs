import Image from "next/image";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";
import Button from "@/components/ui/Button";

import styles from "@/components/home/HomepageSections.module.css";

export default function HomepageAboutPreview() {
  return (
    <section
      className={styles.aboutPreview}
      aria-labelledby="homepage-about-title"
    >
      <div className={styles.aboutGlow} aria-hidden="true" />

      <div className={styles.aboutInner}>
        <div className={styles.aboutCopy}>
          <AnimatedLabel className={styles.sectionLabelDark}>About</AnimatedLabel>
          <AnimatedHeadline
            as="h2"
            id="homepage-about-title"
            className={styles.aboutTitle}
          >
            From print shop floor to digital design systems.
          </AnimatedHeadline>

          <div className={styles.aboutText}>
            <p>
              My career began in commercial printing and reprographics, where I
              learned the craft behind production, layout and visual
              communication.
            </p>
            <p>
              Since then I&apos;ve worked across branding, packaging,
              publications, websites, exhibitions, video and 3D visualisation,
              combining technical expertise with creative thinking.
            </p>
            <p>
              That mix of hands-on production knowledge and digital design
              experience gives me a practical understanding of how ideas move
              from concept to finished work.
            </p>
          </div>

          <Button
            href="/about"
            variant="accent"
            size="lg"
            expandOnHover
            showArrow
            className={styles.aboutButton}
          >
            Read My Story
          </Button>
        </div>

        <div className={styles.aboutImages}>
          <div className={styles.aboutStudioImage}>
            <Image
              src="/about/about-04.webp"
              alt="A studio table filled with packaging prototypes prepared for photography"
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) 48vw, 42rem"
              className={styles.aboutImage}
            />
          </div>

          <div className={styles.aboutPortrait}>
            <Image
              src="/about/about-01.webp"
              alt="Portrait of Tan Bui"
              fill
              sizes="(max-width: 639px) 116px, 172px"
              className={styles.aboutImage}
            />
          </div>

          <span className={styles.aboutImageRule} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
