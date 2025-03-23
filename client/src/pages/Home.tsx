import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import BlogHighlights from "@/components/BlogHighlights";
import { Rss, BookOpen } from "lucide-react";
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
      
      {/* Top section with hero and blog preview */}
      <div className="relative">
        <HeroSection />
        
        {/* Floating Blog Preview Teaser - appears on top of hero */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-10 pointer-events-none">
          <div className="container mx-auto px-4 pointer-events-auto">
            <Link href="/blog" className="block">
              <div className="bg-white rounded-xl shadow-xl border border-purple-100 p-4 flex items-center justify-between transition-all duration-200 hover:bg-purple-50 hover:shadow-2xl hover:scale-[1.01]">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-700">Nomad Blog</h3>
                    <p className="text-sm text-gray-600">Tips, gear reviews, and affiliate deals</p>
                  </div>
                </div>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Read Blog
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Add some space before the blog section */}
      <div className="h-24"></div>
      
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