import HeroSection from "@/components/HeroSection";
import CredibilitySection from "@/components/CredibilitySection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <CredibilitySection />
      <FeaturedWorkSection />
      <AboutPreviewSection />
    </main>
  );
}