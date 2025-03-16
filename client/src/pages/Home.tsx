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

//New component for the hook section (This needs to be created separately and imported into a routing solution.)
//Example:
import React from 'react';

const HookPage = () => {
    return (
        <div>
            <h1>Hook Page</h1>
            {/* Add your hook-related content here */}
        </div>
    );
};

export default HookPage;