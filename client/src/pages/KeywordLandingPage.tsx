import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import SearchForm from "@/components/SearchForm";
import { Loader } from "lucide-react";

export default function KeywordLandingPage() {
  const { keyword } = useParams();
  
  // Format keyword for display (replace hyphens with spaces, capitalize)
  const formattedKeyword = keyword
    ? keyword
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";
  
  // Query endpoint using the keyword
  const endpoint = `/api/jobs?search=${keyword}`;
  
  // Load job count for this keyword
  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint + '&count=true'],
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Error Loading Jobs</h1>
          <p className="text-red-600">Unable to load job listings. Please try again later.</p>
        </div>
      </div>
    );
  }
  
  const jobCount = data?.count || 0;
  
  // Create SEO-optimized meta content
  const title = `${formattedKeyword} Remote Jobs for Digital Nomads`;
  const description = `Find remote ${formattedKeyword.toLowerCase()} jobs for digital nomads. Browse ${jobCount}+ remote positions for ${formattedKeyword.toLowerCase()} professionals worldwide.`;
  
  // Generate page content based on keyword type
  let pageContent = {
    tagline: `Find the best remote ${formattedKeyword.toLowerCase()} opportunities for digital nomads`,
    benefitTitle: `Why Remote ${formattedKeyword} Jobs Are Perfect for Digital Nomads`,
    benefits: [
      `Freedom to work from anywhere while using your ${formattedKeyword.toLowerCase()} skills`,
      `Competitive salaries and flexible schedules`,
      `Connect with global teams and expand your professional network`,
      `Achieve better work-life balance while advancing your career`
    ],
    callToAction: `Find Your Next Remote ${formattedKeyword} Role Today`
  };

  return (
    <>
      <SEOHead 
        title={title}
        description={description}
        canonicalUrl={`/keywords/${keyword}`}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {pageContent.tagline}
            </p>
            
            <SearchForm variant="compact" />
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          
          <div className="lg:w-3/4">
            {/* Information Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{pageContent.benefitTitle}</h2>
              <div className="prose max-w-none text-gray-700">
                <p>
                  Remote {formattedKeyword} positions offer digital nomads the perfect combination of 
                  professional opportunity and lifestyle flexibility. Whether you're working from a beach 
                  in Bali, a café in Barcelona, or a co-working space in Bangkok, these jobs enable you 
                  to pursue your career while exploring the world.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-4">Key Benefits:</h3>
                <ul className="space-y-2">
                  {pageContent.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6">
                  Browse our curated list of remote {formattedKeyword.toLowerCase()} jobs below and 
                  apply today to start your digital nomad journey.
                </p>
              </div>
            </div>
            
            {/* Job Listings */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {jobCount > 0 
                ? `${jobCount} Remote ${formattedKeyword} Jobs Available`
                : `Remote ${formattedKeyword} Jobs`
              }
            </h2>
            
            <JobList 
              endpoint={endpoint}
              showSorting={true}
            />
            
            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About Remote {formattedKeyword} Jobs</h3>
              <p className="text-gray-700 mb-4">
                Remote {formattedKeyword.toLowerCase()} positions typically require strong skills in 
                communication, self-management, and technical expertise. Companies hiring remote 
                {formattedKeyword.toLowerCase()} professionals generally offer competitive salaries, 
                flexible schedules, and opportunities for career advancement.
              </p>
              <p className="text-gray-700">
                To stand out in your application, highlight your relevant experience, showcase 
                your portfolio, and emphasize your ability to work independently while 
                collaborating effectively with remote teams.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}