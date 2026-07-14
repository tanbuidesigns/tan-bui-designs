import Image from "next/image";

import AnimatedHeadline from "@/components/AnimatedHeadline";
import AnimatedLabel from "@/components/AnimatedLabel";

import styles from "@/components/home/HomepageSections.module.css";

const services = [
  {
    title: "Branding",
    description:
      "Building identities, visual systems and guidelines people actually\u00A0use.",
    image: "/projects/urban-eat/brand-craft/brand-craft-13.webp",
    alt: "Urban Eat brand pattern artwork",
    layoutClass: styles.serviceBranding,
    positionClass: styles.serviceImageCentre,
  },
  {
    title: "Packaging",
    description:
      "From concept to production, including hundreds of commercial\u00A0SKUs.",
    image: "/projects/urban-eat/featured-card-02.webp",
    alt: "Urban Eat summer packaging range",
    layoutClass: styles.servicePackaging,
    positionClass: styles.serviceImageCentre,
  },
  {
    title: "Publications",
    description:
      "Books, educational resources and long-form content designed to be\u00A0read.",
    image: "/projects/islamiyah-series/gallery/gallery-03.webp",
    alt: "Open Islamiyah educational publication spread",
    layoutClass: styles.servicePublications,
    positionClass: styles.serviceImageCentre,
  },
  {
    title: "Websites",
    description:
      "Websites that simplify complex information and help people find what matters.",
    image: "/projects/islamiyah-series/hero-banner.webp",
    alt: "Islamiyah visual identity and digital interface presentation",
    layoutClass: styles.serviceWebsites,
    positionClass: styles.serviceImageRight,
  },
  {
    title: "3D & Exhibitions",
    description:
      "Exhibition concepts, environments and visualisations that bring ideas to life.",
    image: "/about/about-06.webp",
    alt: "Tan working on a three-dimensional visual composition",
    layoutClass: styles.serviceExhibitions,
    positionClass: styles.serviceImageCentre,
  },
  {
    title: "Creative Systems",
    description:
      "Design processes, workflows and assets that make future work\u00A0easier.",
    image: "/about/about-02.webp",
    alt: "Hands testing a printed packaging prototype",
    layoutClass: styles.serviceSystems,
    positionClass: styles.serviceImageCentre,
  },
] as const;

export default function ServicesBento() {
  return (
    <section
      className={styles.services}
      aria-labelledby="homepage-services-title"
    >
      <div className={styles.servicesInner}>
        <div className={styles.servicesHeading}>
          <AnimatedLabel className={styles.sectionLabelDark}>What I do</AnimatedLabel>
          <AnimatedHeadline
            as="h2"
            id="homepage-services-title"
            className={styles.servicesTitle}
          >
            A mix of creative thinking, technical execution and getting things
            over the line.
          </AnimatedHeadline>
        </div>

        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <article
              key={service.title}
              className={`${styles.serviceCard} ${service.layoutClass}`}
            >
              <Image
                src={service.image}
                alt={service.alt}
                fill
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 50vw, 58vw"
                className={`${styles.serviceImage} ${service.positionClass}`}
              />
              <div className={styles.serviceShade} aria-hidden="true" />
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
