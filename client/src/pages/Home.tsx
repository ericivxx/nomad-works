import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import BlogHighlights from "@/components/BlogHighlights";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      
      {/* Hero section */}
      <div className="relative mb-24 lg:mb-28">
        <HeroSection />
        
        {/* Floating Blog Preview Teaser - appears on top of hero */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10 pointer-events-none">
          <div className="container mx-auto px-4 pointer-events-auto">
            <Link href="/blog" className="block">
              <div className="bg-white rounded-xl shadow-xl border border-purple-100 p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 hover:bg-purple-50 hover:shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-600 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg text-purple-700">Nomad Blog</h3>
                    <p className="text-sm md:text-base text-gray-600">Tips, gear reviews, and special deals</p>
                  </div>
                </div>
                <Button size="default" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
                  Read Blog
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Blog Highlights Section */}
      <BlogHighlights />
    </div>
  );
}