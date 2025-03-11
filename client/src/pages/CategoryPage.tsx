import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import FilterSidebar from "@/components/FilterSidebar";
import JobList from "@/components/JobList";
import JobCard from "@/components/JobCard";
import SEOHead from "@/components/SEOHead";
import { Loader, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type ReactNode } from "react";
import { JobWithRelations } from "@shared/schema";

// Define types for our data structure
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Company {
  id: number;
  name: string;
  logo: string;
}

interface Location {
  id: number;
  name: string;
  slug: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Job {
  id: number | string;
  title: string;
  description: string;
  company: Company;
  category: Category;
  location: Location;
  skills: Skill[];
  salary: string;
  postedAt: string;
  experienceLevel: string;
  type: string;
  slug: string;
}

interface CategoryData {
  category: Category;
  count: number;
  jobs: JobWithRelations[];
}

interface CategoryContent {
  intro: string;
  skills: string[];
  benefits: string;
  outlook: string;
}

export default function CategoryPage() {
  const { slug } = useParams();
  
  const { data: categoryData, isLoading, error } = useQuery<CategoryData>({
    queryKey: [`/api/categories/${slug}`],
  });
  
  // Fetch all categories for the category list
  const { data: allCategories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
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

  // Generate category-specific content with expanded information
  const getCategoryContent = () => {
    const currentYear = new Date().getFullYear();
    
    switch(category.slug) {
      case 'development':
        return {
          intro: `Remote ${category.name.toLowerCase()} jobs are among the most sought-after positions for digital nomads in ${currentYear}. Software engineers, full-stack developers, and coding specialists can earn competitive salaries while working from anywhere with a reliable internet connection.`,
          skills: ['JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Cloud architecture'],
          benefits: `These roles typically offer excellent compensation packages, asynchronous work schedules, and the opportunity to collaborate with global tech teams. Many companies now prioritize skills and output over location, making this field ideal for location independence.`,
          outlook: `The demand for remote development talent continues to grow as companies embrace distributed teams. Digital nomad developers typically earn between $70,000-$150,000 annually depending on specialization and experience level.`
        };
      case 'design':
        return {
          intro: `Remote ${category.name.toLowerCase()} positions are perfect for UX/UI designers, graphic artists, and creative professionals who want to combine creative work with travel in ${currentYear}.`,
          skills: ['UI/UX Design', 'Figma', 'Adobe Creative Suite', 'Prototyping', 'Visual communication'],
          benefits: `Design roles offer excellent location flexibility, as they often require minimal real-time collaboration. Many digital nomad designers work with multiple clients across time zones, creating additional income streams while traveling.`,
          outlook: `Companies increasingly seek designers who understand global markets and diverse user experiences, making location-independent designers particularly valuable. Remote design roles typically pay between $60,000-$120,000 annually.`
        };
      case 'marketing':
        return {
          intro: `Remote ${category.name.toLowerCase()} roles are ideal for digital marketers, SEO specialists, and content creators who want to help businesses grow while maintaining a flexible lifestyle in ${currentYear}.`,
          skills: ['SEO/SEM', 'Content strategy', 'Social media management', 'Data analysis', 'Email marketing'],
          benefits: `Marketing professionals can often set their own hours, making it easier to balance work with exploration. The global perspective gained while traveling can provide valuable insights into different markets and consumer behaviors.`,
          outlook: `As businesses expand globally, remote marketers with international experience are increasingly valuable. Digital nomad marketers typically earn between $55,000-$110,000 annually, with specialized roles commanding premium rates.`
        };
      case 'customer-service':
        return {
          intro: `Remote ${category.name.toLowerCase()} positions are excellent entry points to the digital nomad lifestyle in ${currentYear}, offering stable income for support specialists and customer success managers who enjoy helping others.`,
          skills: ['Communication', 'Problem-solving', 'CRM software', 'Technical troubleshooting', 'Empathy'],
          benefits: `These roles often provide structured schedules but with the flexibility to work from anywhere. Many companies offer comprehensive training and clear advancement paths for customer service professionals.`,
          outlook: `With the rise of global user bases, multilingual customer service professionals are particularly in demand. Remote customer service roles typically pay between $40,000-$75,000 annually.`
        };
      default:
        return {
          intro: `Remote ${category.name.toLowerCase()} jobs offer digital nomads the perfect combination of career growth and location freedom in ${currentYear}. These positions typically provide competitive compensation while allowing professionals to work from anywhere in the world.`,
          skills: ['Remote collaboration', 'Time management', 'Digital communication', 'Self-motivation', 'Adaptability'],
          benefits: `Working remotely in ${category.name.toLowerCase()} allows professionals to design their ideal lifestyle while advancing their careers. Many digital nomads find that changing environments stimulates creativity and productivity.`,
          outlook: `As remote work becomes the norm rather than the exception, more opportunities continue to emerge in the ${category.name.toLowerCase()} field for location-independent professionals.`
        };
    }
  };

  return (
    <>
      <SEOHead 
        title={`${category.name} Remote Jobs for Digital Nomads in ${new Date().getFullYear()}`}
        description={`Find the best remote ${category.name.toLowerCase()} jobs for digital nomads. Browse ${count}+ positions with top companies hiring ${category.name.toLowerCase()} professionals worldwide.`}
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
          
          {/* Render the expanded content format */}
          {(() => {
            const content = getCategoryContent() as CategoryContent;
            
            return (
              <div className="space-y-6">
                {/* Introduction */}
                <p className="text-gray-700">{content.intro}</p>
                
                {/* Skills Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Top Skills for Remote {category.name} Professionals</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {content.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Benefits Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits of Remote {category.name} Work</h3>
                  <p className="text-gray-700">{content.benefits}</p>
                </div>
                
                {/* Outlook Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Job Market Outlook</h3>
                  <p className="text-gray-700">{content.outlook}</p>
                </div>
                
                <Separator className="my-2" />
                
                <p className="text-gray-700">
                  Browse our curated list of {count} remote {category.name.toLowerCase()} jobs below and find your next opportunity today.
                </p>
              </div>
            );
          })()}
          
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
