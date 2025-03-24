import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import BlogHighlights from "@/components/BlogHighlights";
import { BookOpen, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();
  
  // SEO structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": window.location.origin,
    "name": "NomadWorks - Remote Jobs for Digital Nomads",
    "description": "Find the best remote jobs for digital nomads, along with tools, resources, and guides for location-independent professionals.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEOHead 
        title="NomadWorks - Find Remote Jobs for Digital Nomads & Work from Anywhere" 
        description="Discover top remote jobs for digital nomads. Access exclusive resources, tools, and guides to build a successful location-independent career worldwide."
        structuredData={structuredData}
        keywords="remote jobs, digital nomad jobs, work from anywhere, remote work, location independent, digital nomad guide, remote career"
      />
      
      {/* Hero section */}
      <div className="relative mb-16 md:mb-20 lg:mb-28">
        <HeroSection />
        
        {/* Floating Blog Preview Teaser - appears on top of hero */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10 pointer-events-none">
          <div className="container mx-auto px-4 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/blog" className="block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-purple-100 p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-200 hover:bg-purple-50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-purple-600 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base md:text-lg text-purple-700">Nomad Blog</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">Tips, gear reviews, and special deals</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto text-xs sm:text-sm">
                    Read Blog
                  </Button>
                </div>
              </Link>
              
              <Link href="/nomad-guide" className="block">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-green-100 p-3 sm:p-4 lg:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 transition-all duration-200 hover:bg-green-50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full bg-green-600 flex items-center justify-center">
                      <BookMarked className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base md:text-lg text-green-700">Digital Nomad Guide</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">Complete guide for only $12.99</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-xs sm:text-sm">
                    Get Guide
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Only show Blog Highlights on desktop */}
      {!isMobile && <BlogHighlights />}
    </>
  );
}