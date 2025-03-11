import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import JobCard from "@/components/JobCard";
import SEOHead from "@/components/SEOHead";
import { Loader } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  
  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });
  
  // Fetch all categories for the category list
  const { data: allCategories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  console.log("Category data:", categoryData);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Category Not Found</h1>
          <p className="text-red-600">The category you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const { category, count } = categoryData;

  // Build structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Remote ${category.name} Jobs for Digital Nomads`,
    "description": `Find remote ${category.name.toLowerCase()} jobs for digital nomads.`,
    "numberOfItems": count,
    "itemListElement": categoryData.jobs?.map((job, index) => ({
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
            "addressCountry": "Remote"
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

  // Generate category-specific content
  const getCategoryContent = () => {
    switch(category.slug) {
      case 'development':
        return `Remote ${category.name.toLowerCase()} jobs are perfect for programmers, software engineers, and web developers who want to code from anywhere. These roles typically offer excellent compensation and the freedom to work asynchronously.`;
      case 'design':
        return `Remote ${category.name.toLowerCase()} positions allow UX/UI designers, graphic artists, and creative professionals to showcase their talents while enjoying location independence.`;
      case 'marketing':
        return `Remote ${category.name.toLowerCase()} roles are ideal for digital marketers, SEO specialists, and content creators who want to help businesses grow while maintaining a flexible lifestyle.`;
      case 'customer-service':
        return `Remote ${category.name.toLowerCase()} positions are excellent for support specialists and customer success managers who enjoy helping others while working from their preferred location.`;
      default:
        return `Remote ${category.name.toLowerCase()} jobs are a great opportunity for digital nomads looking to work in this field while traveling. These positions offer flexibility, competitive pay, and the ability to work from anywhere in the world.`;
    }
  };

  return (
    <>
      <SEOHead 
        title={`${category.name} Remote Jobs | NomadWorks`}
        description={`Find remote ${category.name.toLowerCase()} jobs for digital nomads. Browse ${count}+ remote positions in ${category.name.toLowerCase()} for professionals worldwide.`}
        structuredData={structuredData}
      />
      
      {/* Category Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Remote {category.name} Jobs</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Find the best remote {category.name.toLowerCase()} opportunities for digital nomads
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Category Info Box - DISPLAYED ABOVE EVERYTHING */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">About Remote {category.name} Jobs</h2>
          <p className="text-gray-700 mb-4">
            {getCategoryContent()}
          </p>
          <p className="text-gray-700 mb-4">
            Browse our curated list of {count} remote {category.name.toLowerCase()} jobs below and find your next opportunity today.
          </p>
          
          {/* Available Categories Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Browse All Job Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {allCategories?.map(cat => (
                <a 
                  key={cat.id} 
                  href={`/categories/${cat.slug}`} 
                  className={`py-2 px-3 rounded-md ${cat.slug === slug ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar />
          </div>
          
          {/* Main Content Column */}
          <div className="lg:w-3/4">
            <div>
              {/* Job Listings Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Remote {category.name} Jobs</h1>
                  <p className="text-gray-600">
                    {count > 0 ? `${count} ${category.name.toLowerCase()} jobs available` : "No jobs available in this category at the moment"}
                  </p>
                </div>
              </div>
              
              {/* Empty State */}
              {categoryData.jobs.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center my-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">We currently don't have any jobs in this category</p>
                </div>
              )}
              
              {/* Job Cards Container */}
              <div className="space-y-6">
                {categoryData.jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
