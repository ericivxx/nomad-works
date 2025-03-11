import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import JobList from "@/components/JobList";
import SEOHead from "@/components/SEOHead";
import KeywordLinks from "@/components/KeywordLinks";
import { processedKeywords } from "@/components/KeywordLinks";

// Function to find related keywords - returns highly relevant keywords
function findRelatedKeywords(currentKeyword: string): string[] {
  // Convert the current keyword to regular form for comparison
  const normalizedKeyword = currentKeyword.replace(/-/g, ' ');
  const words = normalizedKeyword.split(' ').filter(word => word.length > 2);
  
  // For exact category matches (more specific variations)
  let categoryMatches: {keyword: string, score: number}[] = [];
  
  // For partial matches
  let partialMatches: {keyword: string, score: number}[] = [];
  
  // Calculate related keywords with relevance scores
  processedKeywords.forEach(k => {
    const kNormalized = k.replace(/-/g, ' ');
    
    // Skip the current keyword
    if (kNormalized === normalizedKeyword) return;
    
    // Check category matches (e.g. "developer" keywords for "developer" search)
    // Identify primary category by looking at specific job types
    const currentKeywordCategory = getCategoryFromKeyword(normalizedKeyword);
    const candidateCategory = getCategoryFromKeyword(kNormalized);
    
    if (currentKeywordCategory && currentKeywordCategory === candidateCategory) {
      // Category match - score based on word overlap
      const kWords = kNormalized.split(' ');
      const commonWords = words.filter(word => kWords.includes(word)).length;
      categoryMatches.push({
        keyword: k,
        score: (commonWords / words.length) * 100 + 50 // Higher base score for category matches
      });
    } else {
      // Check for word overlap
      const relevanceScore = calculateRelevanceScore(words, kNormalized);
      if (relevanceScore > 0) {
        partialMatches.push({
          keyword: k, 
          score: relevanceScore
        });
      }
    }
  });
  
  // Sort by score (higher first) and combine the lists
  categoryMatches.sort((a, b) => b.score - a.score);
  partialMatches.sort((a, b) => b.score - a.score);
  
  // Create final related keywords list - prioritize category matches and then add partials
  const relatedKeywords = [
    ...categoryMatches.slice(0, 3).map(item => item.keyword),
    ...partialMatches.slice(0, 8).map(item => item.keyword)
  ].slice(0, 6); // Get up to 6 related keywords
  
  return relatedKeywords;
}

// Helper to determine keyword's primary category
function getCategoryFromKeyword(keyword: string): string | null {
  // Check for job roles
  const roles = [
    'developer', 'programmer', 'designer', 'writer', 'marketer', 'manager',
    'accountant', 'analyst', 'engineer', 'data entry', 'teaching', 'software'
  ];
  
  for (const role of roles) {
    if (keyword.includes(role)) return role;
  }
  
  // Check for job types
  if (keyword.includes('entry level') || keyword.includes('beginner')) return 'entry-level';
  if (keyword.includes('part time')) return 'part-time';
  if (keyword.includes('freelance')) return 'freelance';
  
  return null;
}

// Calculate relevance score based on word matches
function calculateRelevanceScore(searchWords: string[], candidateKeyword: string): number {
  let score = 0;
  const candidateWords = candidateKeyword.split(' ');
  
  // Score for common words
  for (const word of searchWords) {
    if (candidateWords.includes(word)) {
      score += 10; // Base score per matching word
      
      // Bonus for matching important terms
      if (['digital', 'nomad', 'remote', 'jobs'].includes(word)) {
        score += 5;
      }
    }
    // Partial word matches
    else if (candidateKeyword.includes(word)) {
      score += 5;
    }
  }
  
  // Bonus for sequence matches
  searchWords.forEach((word, i) => {
    if (i < searchWords.length - 1) {
      const twoWordSeq = `${word} ${searchWords[i+1]}`;
      if (candidateKeyword.includes(twoWordSeq)) {
        score += 15; // Higher score for phrase matches
      }
    }
  });
  
  return score;
}

// Helper to determine if a keyword is about a specific job role
function isJobRoleKeyword(keyword: string): boolean {
  const jobRoleIndicators = [
    'developer', 'programmer', 'designer', 'writer', 'marketer', 'manager',
    'consultant', 'assistant', 'accountant', 'analyst', 'engineer', 'data entry',
    'healthcare', 'finance', 'accounting', 'teaching', 'it', 'software', 'tech'
  ];
  
  return jobRoleIndicators.some(role => keyword.includes(role));
}

// Generate SEO-friendly title and description based on the keyword
function generateSEOContent(keyword: string) {
  const readableKeyword = keyword.replace(/-/g, ' ');
  
  // Capitalized version for titles
  const capitalizedKeyword = readableKeyword
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Determine the type of keyword to customize the content
  const isJobRole = isJobRoleKeyword(readableKeyword);
  const currentYear = new Date().getFullYear();
    
  // Generate keyword-specific title and description
  let title = `${capitalizedKeyword} | Find Remote Work Opportunities ${currentYear}`;
  let description = `Find the best ${readableKeyword} for digital nomads. Browse our curated selection of remote opportunities that allow you to work from anywhere in the world.`;
  
  // More specific descriptions based on keyword type
  if (readableKeyword.includes('best') || readableKeyword.includes('top')) {
    title = `${capitalizedKeyword} | Top-Rated Remote Opportunities ${currentYear}`;
    description = `Discover the ${readableKeyword} that enable location independence. Our carefully selected opportunities offer great pay, flexibility, and work-life balance for aspiring digital nomads.`;
  } 
  else if (readableKeyword.includes('beginner') || readableKeyword.includes('entry')) {
    title = `${capitalizedKeyword} | Start Your Remote Career ${currentYear}`;
    description = `Looking for ${readableKeyword}? Our platform features entry-level remote positions perfect for those just starting their digital nomad journey. No advanced skills required.`;
  }
  else if (isJobRole) {
    title = `${capitalizedKeyword} | Remote ${capitalizedKeyword} Opportunities ${currentYear}`;
    description = `Explore remote ${readableKeyword} that let you work from anywhere. Find high-paying, flexible positions with top companies hiring now for skilled ${readableKeyword.replace('digital nomad ', '')}.`;
  }
  
  return {
    title,
    description,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": `${capitalizedKeyword}`,
      "description": description,
      "url": window.location.href,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "JobPosting",
            "title": `Remote ${capitalizedKeyword}`,
            "description": `Find remote ${readableKeyword} that let you work from anywhere.`,
            "datePosted": new Date().toISOString(),
            "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            "employmentType": "REMOTE",
            "jobLocationType": "TELECOMMUTE"
          }
        }
      ]
    }
  };
}

export default function KeywordLandingPage() {
  const { keyword } = useParams();
  const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
  const seoContent = generateSEOContent(decodedKeyword);
  
  // Get job count for this keyword
  const { data: jobCountData } = useQuery({
    queryKey: [`/api/search?q=${encodeURIComponent(decodedKeyword.replace(/-/g, ' '))}&count=true`],
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
              
              {/* Generate different content based on keyword type */}
              {isJobRoleKeyword(decodedKeyword.replace(/-/g, ' ')) ? (
                <>
                  <p className="text-gray-700 mb-4">
                    <strong>{decodedKeyword.replace(/-/g, ' ')}</strong> are highly sought-after positions for digital nomads who want to leverage their skills while traveling the world. 
                    These roles typically offer competitive salaries, flexible schedules, and the freedom to work from any location with a reliable internet connection.
                  </p>
                  <p className="text-gray-700 mb-4">
                    As a remote {decodedKeyword.replace(/-/g, ' ').replace('digital nomad ', '').replace(' jobs', '')}, you'll collaborate with global teams using digital communication tools, participate in virtual meetings, and deliver high-quality work while enjoying the freedom to design your ideal lifestyle.
                  </p>
                  <p className="text-gray-700">
                    Browse our curated list of {decodedKeyword.replace(/-/g, ' ')} below to find your next remote opportunity that matches your skills and career goals.
                  </p>
                </>
              ) : decodedKeyword.replace(/-/g, ' ').includes('beginner') || decodedKeyword.replace(/-/g, ' ').includes('entry') ? (
                <>
                  <p className="text-gray-700 mb-4">
                    <strong>{decodedKeyword.replace(/-/g, ' ')}</strong> are perfect for those who are new to remote work and the digital nomad lifestyle. These positions typically require minimal experience and provide an excellent entry point to location-independent careers.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Many companies now offer training and mentorship programs specifically designed for remote beginners, making it easier than ever to start your journey as a digital nomad without extensive prior experience.
                  </p>
                  <p className="text-gray-700">
                    Our carefully selected {decodedKeyword.replace(/-/g, ' ')} focus on opportunities that provide good work-life balance, clear expectations, and supportive environments for those just starting their remote career.
                  </p>
                </>
              ) : decodedKeyword.replace(/-/g, ' ').includes('best') || decodedKeyword.replace(/-/g, ' ').includes('top') ? (
                <>
                  <p className="text-gray-700 mb-4">
                    <strong>{decodedKeyword.replace(/-/g, ' ')}</strong> combine excellent compensation, flexibility, and work-life balance. These premium opportunities are ideal for digital nomads seeking high-quality remote positions with reputable companies.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The positions we've curated stand out for their competitive salaries, comprehensive benefits packages, flexible scheduling options, and opportunities for career advancement—all while allowing you to work from anywhere in the world.
                  </p>
                  <p className="text-gray-700">
                    Explore our selection of {decodedKeyword.replace(/-/g, ' ')} below to find top-tier remote opportunities that will enhance both your career and nomadic lifestyle.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-gray-700 mb-4">
                    <strong>{decodedKeyword.replace(/-/g, ' ')}</strong> offer the perfect combination of career growth and location freedom. Digital nomads worldwide are increasingly seeking these opportunities to maintain professional development while exploring new destinations.
                  </p>
                  <p className="text-gray-700 mb-4">
                    These remote positions typically come with flexible scheduling, collaborative online environments, and the tools needed to succeed from anywhere with a reliable internet connection.
                  </p>
                  <p className="text-gray-700">
                    Browse our curated selection of {decodedKeyword.replace(/-/g, ' ')} below and take the next step toward a location-independent career that aligns with your skills and interests.
                  </p>
                </>
              )}
            </div>
            
            {/* Add FAQ section for SEO benefit */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions About {decodedKeyword.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg">How can I find {decodedKeyword.replace(/-/g, ' ')}?</h3>
                  <p className="text-gray-700">
                    The best way to find {decodedKeyword.replace(/-/g, ' ')} is through specialized job boards like ours, networking with other digital nomads, and following companies known for hiring remote workers. Our platform aggregates opportunities from multiple sources to give you a comprehensive view of available positions.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">What skills are needed for {decodedKeyword.replace(/-/g, ' ')}?</h3>
                  <p className="text-gray-700">
                    Beyond role-specific technical skills, successful candidates for {decodedKeyword.replace(/-/g, ' ')} typically need excellent communication abilities, self-discipline, time management, and adaptability. Familiarity with remote collaboration tools is also highly valued by employers.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg">Are {decodedKeyword.replace(/-/g, ' ')} full-time or contract-based?</h3>
                  <p className="text-gray-700">
                    {decodedKeyword.replace(/-/g, ' ')} come in various arrangements including full-time employment, contract roles, freelance projects, and part-time positions. Our listings include all types, allowing you to filter based on your preferred working arrangement.
                  </p>
                </div>
              </div>
            </div>
            
            <JobList 
              endpoint={`/api/search?q=${encodeURIComponent(decodedKeyword.replace(/-/g, ' '))}`}
              title={`${decodedKeyword.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Available Now`}
              subtitle={`Browse ${jobCount} open positions`}
            />
          </div>
          
          <div className="lg:w-1/3">
            {/* Job-specific tips if it's a job role */}
            {isJobRoleKeyword(decodedKeyword.replace(/-/g, ' ')) && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Tips for Remote {decodedKeyword.replace(/-/g, ' ').replace('digital nomad ', '').replace(' jobs', '')}</h2>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Set up a dedicated workspace with reliable internet</li>
                  <li>Master the tools specific to your industry</li>
                  <li>Establish clear communication channels with your team</li>
                  <li>Create a structured daily routine to maintain productivity</li>
                  <li>Join online communities of remote {decodedKeyword.replace(/-/g, ' ').replace('digital nomad ', '').replace(' jobs', '')}</li>
                </ul>
              </div>
            )}
            
            {/* Popular destinations section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Popular Digital Nomad Destinations</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong>Bali, Indonesia</strong> - Great for tropical lifestyle and nomad community</li>
                <li><strong>Lisbon, Portugal</strong> - European hub with great infrastructure</li>
                <li><strong>Chiang Mai, Thailand</strong> - Affordable living with excellent amenities</li>
                <li><strong>Medellin, Colombia</strong> - Popular for timezone convenience with US</li>
                <li><strong>Mexico City, Mexico</strong> - Vibrant culture and strong nomad scene</li>
              </ul>
            </div>
            
            {/* Related keywords section */}
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
            
            {/* Digital nomad benefits section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Benefits of the Digital Nomad Lifestyle</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong>Freedom & Flexibility</strong> - Work on your own schedule</li>
                <li><strong>Global Exploration</strong> - Experience new cultures while working</li>
                <li><strong>Cost Optimization</strong> - Live in areas with lower cost of living</li>
                <li><strong>Personal Growth</strong> - Develop adaptability and independence</li>
                <li><strong>Work-Life Balance</strong> - Design a lifestyle that works for you</li>
              </ul>
            </div>
            
            {/* Newsletter signup card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 mb-8 text-white">
              <h2 className="text-xl font-bold mb-3">Get {decodedKeyword.replace(/-/g, ' ')} in Your Inbox</h2>
              <p className="mb-4 text-blue-100">
                Stay updated with the latest remote opportunities for {decodedKeyword.replace(/-/g, ' ')} delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-2 rounded-md flex-grow text-gray-900"
                />
                <button className="bg-white text-blue-600 font-bold px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Subscribe
                </button>
              </div>
              <p className="text-xs mt-2 text-blue-100">
                We respect your privacy and will never share your information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}