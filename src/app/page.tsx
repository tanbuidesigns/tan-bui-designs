import HomepageHero from "@/components/home/HomepageHero";
import ClientLogoShowcase from "@/components/home/ClientLogoShowcase";
import HomepageCredentials from "@/components/home/HomepageCredentials";
import ServicesBento from "@/components/home/ServicesBento";
import HomepageAboutPreview from "@/components/home/HomepageAboutPreview";
import HomepageCTA from "@/components/home/HomepageCTA";
import HomepageFAQ from "@/components/home/HomepageFAQ";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black [overflow-x:clip]">
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
