import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import ToolkitButton from "@/components/ToolkitButton";
import GoogleAdUnit from "@/components/GoogleAdUnit";
import { Loader } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function CategoriesListPage() {
  // Fetch all categories
  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": categories.map((category: Category, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": `${category.name} Jobs`,
      "item": `${window.location.origin}/categories/${category.slug}`
    }))
  };

  return (
    <>
      <SEOHead 
        title="Browse Remote Jobs by Category | Digital Nomad Careers | NomadWorks"
        description="Browse and find remote jobs by category. Explore opportunities in development, design, marketing, customer service, and more for digital nomads."
        structuredData={structuredData}
        keywords="remote jobs by category, digital nomad jobs, remote work categories, remote development jobs, remote design jobs, remote marketing jobs, remote customer service, work from anywhere, remote career categories"
        type="website"
        canonicalUrl={`${window.location.origin}/categories`}
      />
      
      {/* Categories Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Remote Jobs by Category</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Find the perfect remote job in your field of expertise
            </p>
            <div className="flex justify-center">
              <ToolkitButton variant="compact" className="animate-slow-pulse" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Ad Unit Above Categories */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
            <GoogleAdUnit adFormat="horizontal" fullWidth />
          </div>
        </div>
      
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">All Job Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col items-start"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">
                  Find remote {category.name.toLowerCase()} jobs for digital nomads
                </p>
                <span className="text-primary font-medium hover:underline mt-auto">
                  Browse Jobs &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}