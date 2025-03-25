import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import ToolkitButton from "@/components/ToolkitButton";
import GoogleAdUnit from "@/components/GoogleAdUnit";
import { Loader } from "lucide-react";

interface Location {
  id: number;
  name: string;
  slug: string;
  region: string;
}

export default function LocationsListPage() {
  // Fetch all locations
  const { data: locations = [], isLoading } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  // Group locations by region
  const groupedLocations: Record<string, Location[]> = {};
  
  locations.forEach((location: Location) => {
    const region = location.region || 'Global';
    if (!groupedLocations[region]) {
      groupedLocations[region] = [];
    }
    groupedLocations[region].push(location);
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": locations.map((location: Location, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${location.name} Jobs`,
      "item": `${window.location.origin}/locations/${location.slug}`
    }))
  };

  return (
    <>
      <SEOHead 
        title="Remote Jobs by Location | Digital Nomad Destinations | NomadWorks"
        description="Find remote jobs by location. Work from anywhere and collaborate with companies worldwide. Browse opportunities by region, country, and time zone for digital nomads."
        structuredData={structuredData}
        keywords="remote jobs by location, digital nomad destinations, remote work locations, work from anywhere, worldwide remote jobs, remote work by timezone, international remote jobs, remote work by country, digital nomad friendly countries"
        type="website"
        canonicalUrl={`${window.location.origin}/locations`}
      />
      
      {/* Locations Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Remote Jobs by Location</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Find remote opportunities based on your preferred time zone and region
            </p>
            <div className="flex justify-center">
              <ToolkitButton variant="compact" className="animate-slow-pulse" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">All Locations</h2>
          
          {Object.entries(groupedLocations).map(([region, locationList]) => (
            <div key={region} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">{region}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {locationList.map((location) => (
                  <Link 
                    key={location.id} 
                    href={`/locations/${location.slug}`}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="text-lg font-medium mb-1">{location.name}</h4>
                    <p className="text-gray-600 text-sm">
                      Browse remote opportunities in {location.name === "Worldwide" ? "any time zone" : `${location.name} time zone`}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ad Unit */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
            <GoogleAdUnit adFormat="horizontal" fullWidth />
          </div>
        </div>
        
        {/* Worldwide Benefits */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Benefits of Remote Work Across Time Zones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Global Talent Pool</h3>
              <p className="text-gray-700">Access opportunities from companies worldwide without geographical limitations.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Work-Life Balance</h3>
              <p className="text-gray-700">Choose jobs that match your preferred working hours and time zone.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Cultural Exchange</h3>
              <p className="text-gray-700">Collaborate with diverse teams and gain international work experience.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}