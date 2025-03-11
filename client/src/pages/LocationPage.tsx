import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import { Loader } from "lucide-react";

export default function LocationPage() {
  const { slug } = useParams();
  
  const { data: locationData, isLoading, error } = useQuery({
    queryKey: [`/api/locations/${slug}`],
  });
  
  console.log("Location data:", locationData);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error || !locationData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Location Not Found</h1>
          <p className="text-red-600">The location you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const { location, count } = locationData;

  // Build structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Remote Jobs in ${location.name} for Digital Nomads`,
    "description": `Find remote jobs in ${location.name} for digital nomads.`,
    "numberOfItems": count,
    "itemListElement": locationData.jobs?.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": new Date(job.postedAt).toISOString(),
        "employmentType": "REMOTE",
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": location.name === "Worldwide" ? "Remote" : location.name
          }
        },
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.company.name,
          "logo": job.company.logo || undefined
        }
      }
    })) || []
  };

  // Region-specific content
  const getRegionContent = () => {
    if (location.name === "Worldwide") {
      return "Work for companies from anywhere in the world with no location restrictions.";
    } else if (location.region === "Americas") {
      return `Work remotely with companies in ${location.name} while staying in the Americas timezone (UTC -4 to -10).`;
    } else if (location.region === "Europe") {
      return `Find remote opportunities with ${location.name}-based companies in European time zones (UTC -1 to +3).`;
    } else if (location.region === "Asia") {
      return `Connect with remote employers in ${location.name} while working in Asian/Pacific time zones (UTC +5 to +12).`;
    } else {
      return `Find the perfect remote job with companies based in ${location.name}.`;
    }
  };

  return (
    <>
      <SEOHead 
        title={`Remote Jobs in ${location.name} | NomadWorks`}
        description={`Find remote jobs in ${location.name} for digital nomads. Browse ${count}+ remote positions available for professionals in ${location.name === "Worldwide" ? "any" : location.name} time zones.`}
        structuredData={structuredData}
      />
      
      {/* Location Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Remote Jobs in {location.name}</h1>
            <p className="text-lg md:text-xl text-blue-100">
              {location.name === "Worldwide" 
                ? "Find the best remote opportunities with no location restrictions"
                : `Find the best remote opportunities for digital nomads in ${location.name} time zones`
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Location Info Box - DISPLAYED ABOVE EVERYTHING */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">About Remote Jobs in {location.name}</h2>
          <p className="text-gray-700 mb-4">
            {getRegionContent()}
          </p>
          <p className="text-gray-700">
            Browse our curated list of {count} remote jobs in {location.name} below and find your next opportunity today.
          </p>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>
          
          {/* Main Content Column */}
          <div className="lg:w-3/4">
            <JobList 
              endpoint={`/api/jobs?location=${slug}`}
              title={`Remote Jobs in ${location.name}`}
              subtitle={count > 0 ? `${count} jobs available in ${location.name}` : "No jobs available in this location at the moment"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
