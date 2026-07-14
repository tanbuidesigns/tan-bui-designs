import AnimatedHeadline from "@/components/AnimatedHeadline";

import styles from "@/components/home/HomepageSections.module.css";

const credentials = [
  { value: "15+", label: "Years Experience" },
  { value: "400+", label: "Packaging SKUs" },
  { value: "55+", label: "Exhibition Designs" },
  { value: "12+", label: "Publications" },
  { value: "80k+", label: "Readers Reached" },
] as const;

export default function HomepageCredentials() {
  return (
    <section
      className={styles.credentials}
      aria-labelledby="homepage-credentials-title"
    >
      <div className={styles.credentialsAtmosphere} aria-hidden="true" />

      <div className={styles.credentialsInner}>
        <div className={styles.credentialsHeading}>
          <AnimatedHeadline
            as="h2"
            tone="dark"
            id="homepage-credentials-title"
            className={styles.credentialsTitle}
          >
            Credentials and experience
          </AnimatedHeadline>
        </div>

        <svg
          className={styles.credentialsWave}
          viewBox="0 0 1440 220"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className={styles.credentialsWaveMuted}
            d="M-40 128C140 34 295 204 484 108C687 5 817 214 1027 104C1194 17 1331 137 1492 70"
            pathLength="1"
          />
          <path
            className={styles.credentialsWaveAccent}
            d="M-40 128C140 34 295 204 484 108C687 5 817 214 1027 104C1194 17 1331 137 1492 70"
            pathLength="1"
          />
        </svg>

        <div className={styles.credentialsGrid}>
          {credentials.map((credential) => (
            <article key={credential.label} className={styles.credentialItem}>
              <strong className={styles.credentialValue}>
                {credential.value}
              </strong>
              <span className={styles.credentialRule} aria-hidden="true" />
              <span className={styles.credentialLabel}>{credential.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
