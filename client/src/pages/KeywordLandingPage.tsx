import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import KeywordLinks from "@/components/KeywordLinks";
import { processedKeywords } from "@/components/KeywordLinks";

// Function to find related keywords - returns 5 similar keywords
function findRelatedKeywords(currentKeyword: string): string[] {
  // Convert the current keyword to regular form for comparison
  const normalizedKeyword = currentKeyword.replace(/-/g, ' ');
  
  // Find keywords that share words with the current keyword
  const words = normalizedKeyword.split(' ');
  
  // Filter to find keywords that contain at least one word from the current keyword
  const related = processedKeywords
    .filter(k => {
      const kNormalized = k.replace(/-/g, ' ');
      return (
        kNormalized !== normalizedKeyword && 
        words.some(word => kNormalized.includes(word))
      );
    })
    .slice(0, 5);
  
  return related;
}

// Generate SEO-friendly title and description based on the keyword
function generateSEOContent(keyword: string) {
  const readableKeyword = keyword.replace(/-/g, ' ');
  
  // Capitalized version for titles
  const capitalizedKeyword = readableKeyword
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${capitalizedKeyword} | NomadWorks`,
    description: `Find the best ${readableKeyword} for digital nomads. Browse our curated selection of remote opportunities that allow you to work from anywhere in the world.`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "title": `${capitalizedKeyword}`,
      "description": `Find remote ${readableKeyword} that let you work from anywhere.`,
      "datePosted": new Date().toISOString(),
      "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      "employmentType": "REMOTE",
      "jobLocationType": "TELECOMMUTE"
    }
  };
}

export default function KeywordLandingPage() {
  const { keyword } = useParams();
  const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
  const seoContent = generateSEOContent(decodedKeyword);
  
  // Get job count for this keyword
  const { data: jobCountData } = useQuery({
    queryKey: [`/api/jobs?search=${decodedKeyword.replace(/-/g, ' ')}&count=true`],
  });
  
  const jobCount = jobCountData?.count || 0;
  const relatedKeywords = findRelatedKeywords(decodedKeyword);
  
  return (
    <>
      <SEOHead 
        title={seoContent.title}
        description={seoContent.description}
        structuredData={seoContent.structuredData}
      />
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              {decodedKeyword.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} for Digital Nomads
            </h1>
            <p className="text-lg mb-6 text-blue-100">
              Discover {jobCount} remote opportunities for {decodedKeyword.replace(/-/g, ' ')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">About {decodedKeyword.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
              <p className="text-gray-700 mb-4">
                {decodedKeyword.replace(/-/g, ' ')} are in high demand for digital nomads who want to work remotely while traveling the world. 
                These opportunities allow you to have a flexible schedule and work from anywhere with an internet connection.
              </p>
              <p className="text-gray-700">
                Browse our curated list of {decodedKeyword.replace(/-/g, ' ')} below and find your next remote opportunity today.
              </p>
            </div>
            
            <JobList 
              endpoint={`/api/jobs?search=${decodedKeyword.replace(/-/g, ' ')}`}
              title={`${decodedKeyword.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Available Now`}
              subtitle={`Browse ${jobCount} open positions`}
            />
          </div>
          
          <div className="lg:w-1/3">
            {relatedKeywords.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Related Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {relatedKeywords.map((relKeyword, index) => (
                    <Link 
                      key={index} 
                      href={`/keywords/${relKeyword}`}
                      className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full transition-colors"
                    >
                      {relKeyword.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Why Choose Remote Work?</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Work from anywhere in the world</li>
                <li>Create your own schedule</li>
                <li>Avoid long commutes</li>
                <li>Improve work-life balance</li>
                <li>Access global job opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}