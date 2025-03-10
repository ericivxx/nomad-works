import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import { Loader } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  
  const { data: categoryData, isLoading, error } = useQuery({
    queryKey: [`/api/categories/${slug}`],
  });
  
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

  return (
    <>
      <SEOHead 
        title={`${category.name} Remote Jobs | NomadWorks`}
        description={`Find remote ${category.name.toLowerCase()} jobs for digital nomads. Browse ${count}+ remote positions in ${category.name.toLowerCase()} for professionals worldwide.`}
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
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar />
          
          <JobList 
            endpoint={`/api/categories/${slug}`}
            title={`Remote ${category.name} Jobs`}
            subtitle={count > 0 ? `${count} ${category.name.toLowerCase()} jobs available` : "No jobs available in this category at the moment"}
          />
        </div>
      </main>
    </>
  );
}
