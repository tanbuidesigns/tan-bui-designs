import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import WhatIDoSection from "@/components/WhatIDoSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import ContactCTASection from "@/components/ContactCTASection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
<CredibilitySection />
<WhatIDoSection />
<FeaturedWorkSection />
      <AboutPreviewSection />
      <ContactCTASection />
    </main>
  );
}