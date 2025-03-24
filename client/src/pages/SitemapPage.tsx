import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import SEOHead from "@/components/SEOHead";
import { processedKeywords } from "@/components/KeywordLinks";

function groupKeywordsByFirstLetter(keywords: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  keywords.forEach(keyword => {
    // Get the first letter and capitalize it
    const firstLetter = keyword.charAt(0).toUpperCase();
    
    // Create array for this letter if it doesn't exist
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    
    // Add keyword to the appropriate group
    groups[firstLetter].push(keyword);
  });
  
  return groups;
}

export default function SitemapPage() {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
  });
  
  // Group keywords by first letter for better organization
  const keywordGroups = groupKeywordsByFirstLetter(processedKeywords);
  const alphabet = Object.keys(keywordGroups).sort();
  
  // Structure data for sitemap
  const sitemapStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": processedKeywords.map((keyword, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${window.location.origin}/keywords/${keyword}`
    }))
  };
  
  return (
    <>
      <SEOHead 
        title="Sitemap | Complete Index of Remote Jobs for Digital Nomads | NomadWorks"
        description="Browse our complete sitemap of remote job keywords, categories, locations, and resources. Find the perfect remote job opportunity tailored for digital nomads."
        structuredData={sitemapStructuredData}
        type="website"
        keywords="remote jobs sitemap, digital nomad sitemap, remote work index, remote job categories, remote job keywords, digital nomad destinations, remote work resources, remote job listings index"
        canonicalUrl={`${window.location.origin}/sitemap`}
      />
      
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Keywords Section */}
          <div className="col-span-full">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Browse by Keyword</h2>
              
              <div className="flex gap-2 mb-6 flex-wrap">
                {alphabet.map(letter => (
                  <a 
                    key={letter} 
                    href={`#letter-${letter}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded transition-colors"
                  >
                    {letter}
                  </a>
                ))}
              </div>
              
              {alphabet.map(letter => (
                <div key={letter} id={`letter-${letter}`} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 border-b pb-2">{letter}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {keywordGroups[letter].map((keyword, index) => (
                      <Link 
                        key={index} 
                        href={`/keywords/${keyword}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {keyword.replace(/-/g, ' ')}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Categories Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Job Categories</h2>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <Link 
                    key={category.id} 
                    href={`/categories/${category.slug}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Locations Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Job Locations</h2>
              <div className="space-y-2">
                {locations?.map((location) => (
                  <Link 
                    key={location.id} 
                    href={`/locations/${location.slug}`}
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {location.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main Pages Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Main Pages</h2>
              <div className="space-y-2">
                <Link href="/" className="block text-blue-600 hover:text-blue-800 hover:underline">Home</Link>
                <Link href="/search" className="block text-blue-600 hover:text-blue-800 hover:underline">Job Search</Link>
                <Link href="/sitemap" className="block text-blue-600 hover:text-blue-800 hover:underline">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}