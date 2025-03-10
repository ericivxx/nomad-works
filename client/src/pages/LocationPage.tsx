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

  return (
    <>
      <SEOHead 
        title={`Remote Jobs in ${location.name} | NomadWorks`}
        description={`Find remote jobs in ${location.name} for digital nomads. Browse ${count}+ remote positions available for professionals in ${location.name} time zones.`}
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
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          
          <JobList 
            endpoint={`/api/locations/${slug}`}
            title={`Remote Jobs in ${location.name}`}
            subtitle={count > 0 ? `${count} jobs available in ${location.name}` : "No jobs available in this location at the moment"}
          />
        </div>
      </main>
    </>
  );
}
