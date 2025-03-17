import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <SEOHead title="Home" />
      <HeroSection />
    </div>
  );
}