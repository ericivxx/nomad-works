import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import BlogHighlights from "@/components/BlogHighlights";
import { Rss } from "lucide-react";

export default function Home() {
  // SEO structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://nomadworks.replit.app/",
    "name": "NomadWorks - Remote Jobs for Digital Nomads",
    "description": "Find the best remote jobs for digital nomads, along with tools, resources, and guides for location-independent professionals.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://nomadworks.replit.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div>
      <SEOHead 
        title="NomadWorks - Remote Jobs for Digital Nomads" 
        description="Find the best remote jobs for digital nomads, along with tools, resources, and guides for location-independent professionals."
        structuredData={structuredData}
      />
      <HeroSection />
      
      {/* Blog Highlights Section */}
      <BlogHighlights />
      
      {/* RSS Feed Promotion */}
      <div className="bg-gray-50 py-3 px-4 text-center">
        <a href="/rss" className="text-sm text-gray-600 hover:text-purple-600 inline-flex items-center gap-1 transition-colors">
          <Rss className="h-3.5 w-3.5" />
          <span>Subscribe to our RSS feed for the latest remote work tips and tools</span>
        </a>
      </div>
    </div>
  );
}