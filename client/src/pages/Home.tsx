import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SearchForm from "@/components/SearchForm";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import KeywordLinks from "@/components/KeywordLinks";

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function Home() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  return (
    <>
      {/* Floating Toolkit Button - NEW */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <Link href="#tools-section" className="group flex flex-col items-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div className="mt-2 bg-white text-indigo-600 px-2 py-1 rounded shadow-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Nomad Tools
          </div>
        </Link>
      </div>
      
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
            
            {/* Tools Teaser - NEW */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-3 inline-block mx-auto">
              <Link href="#tools-section" className="flex items-center text-white gap-2 group">
                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
                <span className="font-medium group-hover:underline">Check out our Essential Digital Nomad Tools</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
            
            <div className="mt-8 text-blue-100 text-sm md:text-base flex flex-wrap justify-center gap-4">
              <span>Popular: </span>
              {categories.slice(0, 5).map((category: Category) => (
                <Link key={category.id} href={`/categories/${category.slug}`} className="text-white hover:underline">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Digital Nomad Toolkit Section - MOVED UP */}
      <section id="tools-section" className="bg-gradient-to-r from-indigo-50 to-blue-50 py-8 md:py-12 mt-6">
        <div className="container mx-auto px-4">
          {/* NEW: Attention-grabbing banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 md:p-6 rounded-xl mb-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">Essential Digital Nomad Toolkit</h3>
                  <p className="text-blue-100">Must-have resources curated by experienced digital nomads</p>
                </div>
              </div>
              <div className="md:flex-shrink-0">
                <span className="inline-block bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold shadow-sm">
                  Exclusive Deals!
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Essential Tools for Digital Nomads</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Equip yourself with the best tools and services used by successful remote workers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* VPN Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13a10 10 0 0 1 14 0M8.5 16.5a5 5 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0M12 20h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Secure VPN Services</h3>
                <p className="text-gray-600 text-center mb-4">
                  Protect your data on public networks with trusted VPN services used by digital nomads.
                </p>
                <div className="text-center">
                  <Link 
                    href="/digital-nomad-toolkit?tab=vpn" 
                    className="inline-block text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 font-medium rounded-full px-5 py-2.5 text-center"
                  >
                    View Recommended VPNs
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Productivity Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4 mx-auto">
                  <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Productivity Tools</h3>
                <p className="text-gray-600 text-center mb-4">
                  Boost your workflow with the essential productivity apps for remote work.
                </p>
                <div className="text-center">
                  <Link 
                    href="/digital-nomad-toolkit?tab=productivity" 
                    className="inline-block text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 font-medium rounded-full px-5 py-2.5 text-center"
                  >
                    Explore Productivity Tools
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Global Internet Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="h-3 bg-gradient-to-r from-cyan-500 to-teal-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 rounded-full mb-4 mx-auto">
                  <svg className="h-6 w-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Global Connectivity</h3>
                <p className="text-gray-600 text-center mb-4">
                  Stay connected anywhere with reliable eSIMs and internet solutions.
                </p>
                <div className="text-center">
                  <Link 
                    href="/digital-nomad-toolkit?tab=esim" 
                    className="inline-block text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 font-medium rounded-full px-5 py-2.5 text-center"
                  >
                    Find Connectivity Solutions
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              href="/digital-nomad-toolkit" 
              className="inline-flex items-center text-primary font-semibold hover:underline"
            >
              <span>View Complete Digital Nomad Toolkit</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-full">
            <div className="text-center mb-8">
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
        {/* Popular Keywords Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Popular Digital Nomad Job Keywords</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse remote jobs by popular digital nomad job categories and keywords
            </p>
          </div>
          
          <KeywordLinks limit={20} />
          
          <div className="mt-4 text-center">
            <Link 
              href="/keywords/digital-nomad-jobs" 
              className="inline-block text-primary font-semibold hover:underline"
            >
              View All Keywords
            </Link>
          </div>
        </div>
      </main>
      
      {/* Popular Categories Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse Jobs by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find remote jobs in your area of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category: Category) => (
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