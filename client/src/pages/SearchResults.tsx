import { useEffect, useState } from "react";
import { useSearch, useLocation } from "wouter";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import SearchForm from "@/components/SearchForm";
import SEOHead from "@/components/SEOHead";

export default function SearchResults() {
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  const [endpoint, setEndpoint] = useState(`/api/jobs${search}`);
  
  // Update endpoint when search parameters change
  useEffect(() => {
    // Make sure to use the proper search API endpoint
    if (searchParams.has('search')) {
      // If we're searching, use the dedicated search endpoint
      const searchTerm = searchParams.get('search') || '';
      const locationTerm = searchParams.get('location') || '';
      
      let apiUrl = `/api/search?q=${encodeURIComponent(searchTerm)}`;
      if (locationTerm) {
        apiUrl += `&location=${encodeURIComponent(locationTerm)}`;
      }
      
      setEndpoint(apiUrl);
    } else {
      // Otherwise use the regular jobs endpoint with any other filter params
      setEndpoint(`/api/jobs${search}`);
    }
  }, [search, searchParams]);
  
  // Get search terms for title
  const searchTerm = searchParams.get('search') || '';
  const locationSlug = searchParams.get('location') || '';
  
  let title = "Remote Jobs for Digital Nomads";
  if (searchTerm) {
    title = `${searchTerm} Remote Jobs`;
    if (locationSlug) {
      title += ` in ${locationSlug.replace(/-/g, ' ')}`;
    }
  } else if (locationSlug) {
    title = `Remote Jobs in ${locationSlug.replace(/-/g, ' ')}`;
  }
  
  // Generate description for SEO
  const description = searchTerm 
    ? `Find remote ${searchTerm} jobs for digital nomads. Browse remote positions for ${searchTerm} professionals worldwide.`
    : "Discover remote jobs for digital nomads worldwide. Search thousands of remote positions in development, design, marketing, and more.";

  return (
    <>
      <SEOHead 
        title={`${title} | NomadWorks`}
        description={description}
      />
      
      {/* Search Hero (Smaller than Home) */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">Find Your Perfect Remote Job</h1>
            <SearchForm variant="compact" />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          <JobList endpoint={endpoint} title={title} />
        </div>
      </main>
    </>
  );
}
