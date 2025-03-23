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
      <div className="relative mb-16 md:mb-24">
        <HeroSection />
        
        {/* Floating Blog Preview Teaser - appears on top of hero */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10 pointer-events-none">
          <div className="container mx-auto px-4 pointer-events-auto">
            <Link href="/blog" className="block">
              <div className="bg-white rounded-xl shadow-xl border border-purple-100 p-5 flex items-center justify-between transition-all duration-200 hover:bg-purple-50 hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-purple-700">Nomad Blog</h3>
                    <p className="text-gray-600">Tips, gear reviews, and special deals</p>
                  </div>
                </div>
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
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