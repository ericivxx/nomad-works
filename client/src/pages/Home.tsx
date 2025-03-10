import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/SearchForm";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  return (
    <>
      <SEOHead 
        title="NomadWorks | Find Remote Jobs for Digital Nomads"
        description="Discover remote jobs for digital nomads worldwide. Search thousands of remote positions in development, design, marketing, and more."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Find the Best Remote Jobs for Digital Nomads</h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">Discover remote opportunities that let you work from anywhere in the world.</p>
            
            {/* Search Box */}
            <SearchForm />
            
            <div className="mt-8 text-blue-100 text-sm md:text-base flex flex-wrap justify-center gap-4">
              <span>Popular: </span>
              {categories?.slice(0, 5).map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="text-white hover:underline">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-full">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Remote Jobs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our hand-picked selection of top remote opportunities for digital nomads
              </p>
            </div>
            
            <JobList 
              endpoint="/api/jobs?featured=true"
              showSorting={false}
            />
            
            <div className="mt-8 text-center">
              <Link 
                href="/search" 
                className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                View All Jobs
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Popular Categories Section */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse Jobs by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find remote jobs in your area of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.slug}`}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">Find remote {category.name.toLowerCase()} jobs for digital nomads</p>
                <span className="text-primary font-medium hover:underline">Browse Jobs &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose NomadWorks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to connecting digital nomads with the best remote job opportunities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Job Listings</h3>
              <p className="text-gray-600">
                We carefully review all job listings to ensure they're remote-friendly and suitable for digital nomads.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Work From Anywhere</h3>
              <p className="text-gray-600">
                Find jobs that allow you to work from anywhere in the world, on your own schedule.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-primary">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Application</h3>
              <p className="text-gray-600">
                Our streamlined application process helps you apply to multiple jobs quickly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
