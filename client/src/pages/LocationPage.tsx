import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import JobCard from "@/components/JobCard";
import SEOHead from "@/components/SEOHead";
import { Loader, Globe, Clock, DollarSign, Map, CheckCircle, Coffee, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobWithRelations } from "@shared/schema";
import { type ReactNode } from "react";

// Define types for our data structure
interface Location {
  id: number;
  name: string;
  slug: string;
  region: string;
}

interface LocationData {
  location: Location;
  count: number;
  jobs: JobWithRelations[];
}

interface LocationContent {
  intro: string;
  livingCost: string;
  workInfo: string;
  timezoneCompatibility: string;
  nomadTips: string[];
  coworkingSpaces: number;
  internetSpeed: string;
}

export default function LocationPage() {
  const { slug } = useParams();
  const currentYear = new Date().getFullYear();
  
  const { data: locationData, isLoading, error } = useQuery<LocationData>({
    queryKey: [`/api/locations/${slug}`],
  });
  
  // Fetch all locations for the location list
  const { data: allLocations = [] } = useQuery<Location[]>({
    queryKey: ['/api/locations'],
  });
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }
  
  if (error || !locationData) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Location Not Found</h1>
          <p className="text-red-600">The location you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const { location, count } = locationData;

  // Build structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Remote Jobs in ${location.name} for Digital Nomads`,
    "description": `Find remote jobs in ${location.name} for digital nomads.`,
    "numberOfItems": count,
    "itemListElement": locationData.jobs?.map((job, index) => ({
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
            "addressCountry": location.name === "Worldwide" ? "Remote" : location.name
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

  // Region-specific content with expanded information
  const getLocationContent = (): LocationContent => {
    if (location.name === "Worldwide") {
      return {
        intro: `Working with companies that hire worldwide in ${currentYear} gives you complete freedom to live and work from anywhere. These positions typically have asynchronous communication practices and rarely require specific working hours, making them ideal for digital nomads.`,
        livingCost: "With worldwide positions, you can choose to live in countries with lower costs of living while earning competitive global salaries, maximizing your savings potential.",
        workInfo: "Companies offering worldwide positions are often fully-remote organizations with well-established remote work cultures. They typically use tools like Slack, Asana, and Notion to coordinate across time zones.",
        timezoneCompatibility: "When working with worldwide companies, you'll typically have flexible hours with minimal synchronous meetings scheduled to accommodate teammates across various time zones.",
        nomadTips: [
          "Consider setting a consistent personal work schedule despite the flexibility",
          "Join global digital nomad communities to connect with other remote workers",
          "Maintain clear availability hours in your calendar for teammates",
          "Invest in quality internet backup solutions wherever you travel",
          "Use a VPN service to ensure secure connections when working from public networks"
        ],
        coworkingSpaces: 0,
        internetSpeed: "Requirements vary by position, but most worldwide jobs expect minimum 10-20 Mbps download speeds"
      };
    } else if (location.region === "Americas") {
      return {
        intro: `Remote jobs with companies in ${location.name} in ${currentYear} allow you to work while traveling throughout North and South America without crossing major time zones. These positions often offer a balance of independence and collaborative work.`,
        livingCost: `Living costs when working with ${location.name} companies can vary significantly depending on where you base yourself, from affordable Latin American digital nomad hubs to more expensive cities in the US and Canada.`,
        workInfo: `Companies in ${location.name} often operate on a hybrid remote model with occasional video meetings. Many prefer workers to be available during standard business hours in their time zone.`,
        timezoneCompatibility: `When working with ${location.name}-based companies, you'll typically align with time zones from UTC -4 to -10, making it ideal for digital nomads traveling throughout the Americas.`,
        nomadTips: [
          `Research tax implications before working with ${location.name} companies as a non-resident`,
          "Consider cost-of-living differences between major cities and smaller towns",
          "Many co-working spaces offer day passes if you're just passing through",
          "Internet reliability varies significantly across different regions - research before relocating",
          "Bank holidays and work customs may differ across North and South America"
        ],
        coworkingSpaces: location.name === "United States" ? 6000 : location.name === "Canada" ? 800 : 300,
        internetSpeed: location.name === "United States" || location.name === "Canada" ? "Generally excellent in urban areas with 100+ Mbps common" : "Varies by country; major cities offer reliable connections"
      };
    } else if (location.region === "Europe") {
      return {
        intro: `Finding remote work with ${location.name} companies in ${currentYear} provides an excellent opportunity to explore the diverse cultures of Europe while maintaining a stable income. European employers often offer strong work-life balance and excellent benefits.`,
        livingCost: `The cost of living when working with ${location.name} employers varies across Europe, with Western European cities being more expensive than Eastern European locations, which have become popular digital nomad bases.`,
        workInfo: `Companies in ${location.name} frequently embrace flexible working arrangements but may still expect some overlap with standard European business hours (9am-5pm CET/CEST).`,
        timezoneCompatibility: `Working with ${location.name}-based companies means aligning with time zones from UTC -1 to +3, ideal for digital nomads exploring Europe, Africa, and parts of the Middle East.`,
        nomadTips: [
          "European countries offer various digital nomad visa options worth researching",
          "Public transportation is excellent in most European cities - consider going car-free",
          "Many European cafés welcome remote workers with reliable wifi and all-day service",
          "Consider the Schengen Area's 90/180 day rule when planning your European travels",
          "Off-season travel in Europe can significantly reduce your cost of living"
        ],
        coworkingSpaces: location.name === "United Kingdom" ? 2800 : location.name === "Germany" ? 1900 : 600,
        internetSpeed: "Generally excellent throughout Europe with 50-100+ Mbps common in most urban areas"
      };
    } else if (location.region === "Asia") {
      return {
        intro: `Remote positions with ${location.name} employers in ${currentYear} offer unique opportunities to experience Asian markets while maintaining competitive compensation. Many multinational corporations have established significant presence in major Asian tech hubs.`,
        livingCost: `Working with ${location.name} companies can provide access to regions with highly variable living costs, from expensive cities like Tokyo, Singapore and Hong Kong to more affordable locations like Bali, Chiang Mai, and Ho Chi Minh City.`,
        workInfo: `Companies in ${location.name} may have expectations for some overlap with Asian business hours. Remote work culture varies significantly between different Asian countries and companies.`,
        timezoneCompatibility: `When working with ${location.name}-based employers, you'll align with time zones from UTC +5 to +12, making these roles ideal for digital nomads traveling throughout Asia, Australia, and eastern Russia.`,
        nomadTips: [
          "Research visa requirements carefully as they vary significantly across Asian countries",
          "Consider learning basic phrases in local languages - even small efforts are appreciated",
          "Test internet speeds and reliability before committing to accommodations",
          "Co-working spaces in major Asian cities often offer networking opportunities with local entrepreneurs",
          "Weather patterns and monsoon seasons can affect internet reliability in some regions"
        ],
        coworkingSpaces: location.name === "Japan" ? 450 : location.name === "Singapore" ? 250 : 150,
        internetSpeed: location.name === "South Korea" || location.name === "Japan" || location.name === "Singapore" ? "Excellent with some of the fastest average speeds globally" : "Varies significantly; major cities offer reliable connections while rural areas may be limited"
      };
    } else {
      return {
        intro: `Remote jobs with ${location.name}-based companies in ${currentYear} offer an excellent opportunity to work with international teams while enjoying location flexibility. These positions often provide valuable cross-cultural professional experience.`,
        livingCost: `The cost of living when working with ${location.name} employers depends entirely on where you choose to base yourself as a digital nomad. Many remote workers maximize their income by living in regions with lower costs.`,
        workInfo: `Companies in ${location.name} typically have established remote work policies with clear expectations about availability and communication. Research the specific company culture before applying.`,
        timezoneCompatibility: `Working with ${location.name}-based companies means considering potential time zone differences if you plan to travel extensively. Some positions require overlap with specific business hours.`,
        nomadTips: [
          "Research tax implications for your situation as a remote worker",
          "Consider getting a portable WiFi device as backup for unreliable connections",
          "Join digital nomad communities online to find location-specific advice",
          "Look into co-living spaces that cater specifically to remote workers",
          "Establish a consistent work routine regardless of your location"
        ],
        coworkingSpaces: 200,
        internetSpeed: "Requirements vary by company, but most remote positions expect reliable connections capable of video conferencing"
      };
    }
  };
  
  // FAQ content for each location
  const getFAQContent = () => {
    const faqs = [
      {
        question: `What types of remote jobs are available in ${location.name}?`,
        answer: `Remote jobs in ${location.name} span numerous industries, with the most common being software development, digital marketing, customer support, design, and content creation. ${location.name === "Worldwide" ? "Worldwide positions typically offer the most flexibility in terms of working hours and location." : `Companies in ${location.name} often hire remotely for positions that don't require physical presence and can be performed effectively through digital collaboration tools.`}`
      },
      {
        question: `Do I need to be a resident of ${location.name} to apply for these remote jobs?`,
        answer: `${location.name === "Worldwide" ? "For worldwide remote positions, you typically don't need to be a resident of any specific country. However, you should check each job posting for specific requirements about work authorization or contractor agreements." : `It depends on the company. Some ${location.name} employers hire remote workers as contractors regardless of location, while others may require you to have work authorization in their country due to legal and tax considerations. Always check the specific requirements in each job posting.`}`
      },
      {
        question: `What are the average salaries for remote jobs in ${location.name}?`,
        answer: `${location.name === "Worldwide" ? "Worldwide remote positions often offer competitive salaries, though they may vary based on your experience level and the company's size. Some companies offer location-based salary adjustments, while others provide the same compensation regardless of where you live." : `Remote salaries for ${location.name}-based companies typically reflect the local market rates, sometimes with adjustments based on your location. Senior roles and specialized positions generally command higher compensation packages.`}`
      },
      {
        question: `What time zone compatibility is expected for remote jobs in ${location.name}?`,
        answer: `${location.name === "Worldwide" ? "Worldwide remote positions usually offer the most flexible schedules, often with asynchronous communication. However, some may still require overlapping hours with specific teams or attendance at occasional company-wide meetings." : `For remote positions with ${location.name} companies, you'll typically need some overlap with their business hours. Many companies in this region operate between ${location.region === "Americas" ? "UTC -4 to -10" : location.region === "Europe" ? "UTC -1 to +3" : location.region === "Asia" ? "UTC +5 to +12" : "standard business hours"}, so consider how this aligns with your preferred working schedule.`}`
      },
      {
        question: `What tools and equipment do I need for remote jobs in ${location.name}?`,
        answer: `Most remote jobs require a reliable computer, stable high-speed internet connection, and communication tools like Slack, Zoom, or Microsoft Teams. Some ${location.name} companies provide equipment or stipends for home office setups, while others expect you to use your own resources. Always ensure you have backup internet options when working remotely, especially if traveling frequently.`
      }
    ];
    
    return faqs;
  };

  return (
    <>
      <SEOHead 
        title={`Remote Jobs in ${location.name} | NomadWorks`}
        description={`Find remote jobs in ${location.name} for digital nomads. Browse ${count}+ remote positions available for professionals in ${location.name === "Worldwide" ? "any" : location.name} time zones.`}
        structuredData={structuredData}
      />
      
      {/* Location Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Remote Jobs in {location.name}</h1>
            <p className="text-lg md:text-xl text-blue-100">
              {location.name === "Worldwide" 
                ? "Find the best remote opportunities with no location restrictions"
                : `Find the best remote opportunities for digital nomads in ${location.name} time zones`
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Location Info Box - DISPLAYED ABOVE EVERYTHING */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">About Remote Jobs in {location.name}</h2>
          
          {/* Expanded Location Content */}
          {(() => {
            const content = getLocationContent();
            
            return (
              <div className="space-y-6">
                {/* Introduction */}
                <p className="text-gray-700">{content.intro}</p>
                
                {/* Location Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-md font-semibold">Cost of Living</h3>
                    </div>
                    <p className="text-sm text-gray-600">{content.livingCost}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-md font-semibold">Timezone Compatibility</h3>
                    </div>
                    <p className="text-sm text-gray-600">{content.timezoneCompatibility}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Wifi className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-md font-semibold">Internet Reliability</h3>
                    </div>
                    <p className="text-sm text-gray-600">{content.internetSpeed}</p>
                  </div>
                </div>
                
                {/* Work Info Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Working with {location.name} Companies</h3>
                  <p className="text-gray-700">{content.workInfo}</p>
                </div>
                
                {/* Tips for Digital Nomads */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tips for Digital Nomads</h3>
                  <div className="space-y-2">
                    {content.nomadTips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <p className="text-gray-700">
                  Browse our curated list of {count} remote jobs in {location.name} below and find your next opportunity today.
                </p>
              </div>
            );
          })()}
          
          {/* Available Locations Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-3">Browse Jobs by Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {allLocations?.map(loc => (
                <a 
                  key={loc.id} 
                  href={`/locations/${loc.slug}`} 
                  className={`py-2 px-3 rounded-md ${loc.slug === slug ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                >
                  {loc.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Resources and Affiliate Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Essential Resources for Remote Workers</h2>
          <p className="text-gray-700 mb-6">
            These carefully selected resources can help you succeed in your remote career. We may receive a small commission if you purchase through these links at no extra cost to you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume & Profile Section */}
            <Card>
              <CardHeader>
                <CardTitle>Resume & Profile Builders</CardTitle>
                <CardDescription>Stand out to employers with professional profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">FlexJobs</h4>
                  <p className="text-sm text-gray-600 mb-2">Premium job board with career coaching and resume review services.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.flexjobs.com/', '_blank')}>
                    Explore FlexJobs
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">LinkedIn Premium</h4>
                  <p className="text-sm text-gray-600 mb-2">Get insights on who's viewed your profile and how you compare to other applicants.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://premium.linkedin.com/', '_blank')}>
                    Try LinkedIn Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Remote Work Tools */}
            <Card>
              <CardHeader>
                <CardTitle>Remote Work Tools</CardTitle>
                <CardDescription>Essential tools for productive remote work</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">NordVPN</h4>
                  <p className="text-sm text-gray-600 mb-2">Secure your connection when working from public WiFi networks.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://nordvpn.com/', '_blank')}>
                    Get NordVPN
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Krisp</h4>
                  <p className="text-sm text-gray-600 mb-2">AI-powered noise cancellation for professional video calls from anywhere.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://krisp.ai/', '_blank')}>
                    Try Krisp
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Learning Platforms */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Development</CardTitle>
                <CardDescription>Enhance your skills for better job opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Udemy</h4>
                  <p className="text-sm text-gray-600 mb-2">Affordable courses on virtually any skill needed for remote work.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.udemy.com/', '_blank')}>
                    Browse Udemy Courses
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Skillshare</h4>
                  <p className="text-sm text-gray-600 mb-2">Creative and practical courses with a subscription model.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.skillshare.com/', '_blank')}>
                    Explore Skillshare
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Digital Nomad Services */}
            <Card>
              <CardHeader>
                <CardTitle>Digital Nomad Services</CardTitle>
                <CardDescription>Services designed for location-independent professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">SafetyWing Insurance</h4>
                  <p className="text-sm text-gray-600 mb-2">Health insurance designed specifically for digital nomads.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://safetywing.com/', '_blank')}>
                    Get Nomad Insurance
                  </Button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Wise (formerly TransferWise)</h4>
                  <p className="text-sm text-gray-600 mb-2">Manage multiple currencies and receive payments internationally.</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://wise.com/', '_blank')}>
                    Open Wise Account
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">Remote Jobs in {location.name}</h1>
                  <p className="text-gray-600">
                    {count > 0 ? `${count} jobs available in ${location.name}` : "No jobs available in this location at the moment"}
                  </p>
                </div>
              </div>
              
              {/* Empty State */}
              {locationData.jobs.length === 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center my-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">We currently don't have any jobs in this location</p>
                </div>
              )}
              
              {/* Job Cards Container */}
              <div className="space-y-6">
                {locationData.jobs.map((job) => (
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
