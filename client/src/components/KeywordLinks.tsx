import { Link } from "wouter";

// Process the list of keywords to prepare them for URLs
function processKeywords(keywords: string[]): string[] {
  // Remove duplicates
  const uniqueKeywords = [...new Set(keywords)];
  
  // Format keywords for URLs (lowercase, replace spaces with hyphens)
  return uniqueKeywords.map(keyword => keyword.toLowerCase().replace(/\s+/g, '-'));
}

// Main keyword list - add all your target keywords here
const rawKeywords = [
  "digital nomad jobs",
  "nomad jobs",
  "digital nomad jobs for beginners",
  "best digital nomad jobs",
  "digital nomad work",
  "working nomad",
  "remote jobs for digital nomads",
  "digital nomad careers",
  "digital nomad jobs without degree",
  "digital nomad jobs 2022",
  "remote nomad jobs",
  "nomad jobs online",
  "nomad remote jobs",
  "remote jobs for nomads",
  "digital nomad remote jobs",
  "remote jobs digital nomad",
  "digital nomad data entry jobs",
  "nomad remote work",
  "digital nomad opportunities",
  "top digital nomad jobs",
  "digital nomad software developer",
  "nomad digital jobs",
  "remote digital nomad jobs",
  "digital nomad job boards",
  "online jobs for digital nomads",
  "digital nomad jobs hiring",
  "travel nomad jobs",
  "remote work digital nomad",
  "best nomad jobs",
  "digital nomad it jobs",
  "online jobs for nomads",
  "part time digital nomad jobs",
  "digital nomad accounting jobs",
  "entry level digital nomad jobs",
  "digital nomad roles",
  "work for nomads",
  "nomad job search",
  "best remote jobs for digital nomads",
  "tech nomad jobs",
  "software developer digital nomad",
  "digital nomad healthcare jobs",
  "best remote jobs for nomads",
  "digital nomad job sites",
  "digital nomad work from anywhere",
  "nomad online jobs",
  "best jobs for nomads",
  "digital nomad programmer",
  "remote jobs nomad",
  "best jobs to be a digital nomad",
  "jobs for a digital nomad",
  "virtual nomad jobs",
  "digital nomad finance jobs",
  "global nomad jobs",
  "digital nomad job offers",
  "careers for digital nomads",
  "easy digital nomad jobs",
  "it nomad jobs",
  "best careers for digital nomads",
  "best digital nomad careers",
  "best digital nomad jobs 2022",
  "best jobs digital nomad",
  "best jobs for a digital nomad",
  "best jobs for nomadic lifestyle",
  "best paying digital nomad jobs",
  "careers for nomads",
  "companies hiring digital nomads",
  "digital nomad employment",
  "digital nomad freelance",
  "digital nomad freelance jobs",
  "digital nomad job finder",
  "digital nomad job ideas",
  "digital nomad jobs entry level",
  "digital nomad jobs list",
  "digital nomad jobs psychology",
  "digital nomad professions",
  "digital nomad writing jobs",
  "easiest digital nomad jobs",
  "freelance digital nomad",
  "high paying digital nomad jobs",
  "internet nomad jobs",
  "jobs as a digital nomad",
  "jobs as digital nomad",
  "jobs for nomadic lifestyle",
  "jobs to be a digital nomad",
  "list of digital nomad jobs",
  "most common digital nomad jobs",
  "nomad it jobs",
  "nomad job list",
  "nomad jobs reddit",
  "nomad jobs website",
  "nomad lifestyle jobs",
  "nomad work from anywhere",
  "nomade jobs",
  "non tech digital nomad jobs",
  "online jobs digital nomad",
  "part time digital nomad",
  "teaching nomads jobs",
  "top 10 digital nomad jobs",
  "top jobs for digital nomads",
  "types of digital nomad jobs",
  "work as digital nomad"
];

// Process the keywords to remove duplicates and format them for URLs
export const processedKeywords = processKeywords(rawKeywords);

interface KeywordLinksProps {
  limit?: number;
  title?: string;
  showCount?: boolean;
}

export default function KeywordLinks({ limit, title = "Popular Keywords", showCount = true }: KeywordLinksProps) {
  // Get the specified number of keywords, or all if no limit is provided
  const displayKeywords = limit ? processedKeywords.slice(0, limit) : processedKeywords;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      
      <div className="flex flex-wrap gap-2">
        {displayKeywords.map((keyword, index) => (
          <Link 
            key={index} 
            href={`/keywords/${keyword}`}
            className="inline-block bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full transition-colors"
          >
            {keyword.replace(/-/g, ' ')}
          </Link>
        ))}
      </div>
      
      {showCount && (
        <p className="text-gray-500 mt-4 text-sm">
          Showing {displayKeywords.length} of {processedKeywords.length} keywords
        </p>
      )}
    </div>
  );
}