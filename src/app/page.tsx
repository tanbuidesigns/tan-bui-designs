import HeroSection from "@/components/HeroSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <HeroSection />
      <FeaturedWorkSection />
    </main>
  );
}