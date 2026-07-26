import type { Metadata } from "next";

import HomepageHero from "@/components/home/HomepageHero";
import ClientLogoShowcase from "@/components/home/ClientLogoShowcase";
import HomepageCredentials from "@/components/home/HomepageCredentials";
import ServicesBento from "@/components/home/ServicesBento";
import HomepageAboutPreview from "@/components/home/HomepageAboutPreview";
import HomepageCTA from "@/components/home/HomepageCTA";
import HomepageFAQ from "@/components/home/HomepageFAQ";
import HomepageScrollHoverPlayback from "@/components/home/HomepageScrollHoverPlayback";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

export const metadata: Metadata = {
  title: {
    absolute: "Tan Bui Designs | Multidisciplinary Design Consultant",
  },
  description:
    "Tan Bui Designs helps organisations turn complex briefs into clear design systems across branding, packaging, publications, websites and exhibitions.",
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://tanbuidesigns.com/about#tan-bui",
      name: "Tan Bui",
      url: "https://tanbuidesigns.com/about",
      jobTitle: "Multidisciplinary Design Consultant",
      worksFor: { "@id": "https://tanbuidesigns.com/#professional-service" },
      sameAs: ["https://www.linkedin.com/in/tanbuidesigns/"],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://tanbuidesigns.com/#professional-service",
      name: "Tan Bui Designs",
      url: "https://tanbuidesigns.com/",
      description:
        "Design consultancy across branding, packaging, publications, websites, exhibitions and creative systems.",
      founder: { "@id": "https://tanbuidesigns.com/about#tan-bui" },
      areaServed: "Worldwide",
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black [overflow-x:clip]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomepageScrollHoverPlayback />
      <HomepageHero />
      <ClientLogoShowcase />
      <FeaturedWorkSection />
      <HomepageCredentials />
      <ServicesBento />
      <HomepageAboutPreview />
      <HomepageFAQ />
      <HomepageCTA />
    </main>
  );
}
