import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { stripHtml } from "@/lib/utils";
import { Briefcase, MapPin, DollarSign, Calendar, Globe, BarChart, ArrowLeft, Zap, Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { formatDistanceToNow, format } from "date-fns";
import SEOHead from "@/components/SEOHead";
import GoogleAdUnit from "@/components/GoogleAdUnit";
import ToolkitSidebar from "@/components/ToolkitSidebar";
import ToolkitButton from "@/components/ToolkitButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ApplicationSuccess from "@/components/ApplicationSuccess";

// Job interfaces
interface Company {
  id: number;
  name: string;
  logo: string;
  website: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Location {
  id: number;
  name: string;
  slug: string;
  region: string;
}

interface Skill {
  id: number;
  name: string;
}

interface Job {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  company: Company;
  category: Category;
  location: Location;
  skills: Skill[];
  salaryMin?: number;
  salaryMax?: number;
  type: string;
  experienceLevel?: string;
  timezone?: string;
  postedAt: string;
  featured?: boolean;
  source?: string;
  externalId?: string;
  applyUrl?: string;
}

type JobWithRelations = Job;

const applicationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  resume: z.string().min(1, "Resume link or information is required"),
  coverLetter: z.string().min(50, "Cover letter should be at least 50 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function JobDetail() {
  const { slug } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, saveJob, unsaveJob, isJobSaved } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Fetch job details
  const { data: job, isLoading, error } = useQuery<Job>({
    queryKey: [`/api/jobs/${slug}`],
  });
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume: "",
      coverLetter: "",
    },
  });
  
  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the application to the backend
      // For demo purposes, we'll just show a success toast and the success component
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Application Submitted",
        description: "Your job application has been successfully submitted!",
      });
      
      // Show application success component with toolkit recommendations
      setApplicationSubmitted(true);
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCloseSuccess = () => {
    setApplicationSubmitted(false);
  };
  
  // Create structured data for SEO
  const getJobPostingStructuredData = () => {
    if (!job) return null;
    
    // Type guard to ensure TypeScript recognizes job as Job type
    const typedJob = job as Job;
    
    return {
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      "title": typedJob.title,
      "description": typedJob.description,
      "datePosted": new Date(typedJob.postedAt).toISOString(),
      "validThrough": new Date(new Date(typedJob.postedAt).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      "employmentType": typedJob.type.toUpperCase().replace("-", "_"),
      "hiringOrganization": {
        "@type": "Organization",
        "name": typedJob.company.name,
        "sameAs": typedJob.company.website,
        "logo": typedJob.company.logo
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "Remote"
        }
      },
      "baseSalary": typedJob.salaryMin && typedJob.salaryMax ? {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": {
          "@type": "QuantitativeValue",
          "minValue": typedJob.salaryMin,
          "maxValue": typedJob.salaryMax,
          "unitText": "YEAR"
        }
      } : undefined
    };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <h1 className="text-2xl font-bold text-red-800 mb-2">Job Not Found</h1>
          <p className="text-red-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Link href="/search">
            <Button>Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Type guard to ensure job is recognized as Job type
  const typedJob: Job = job as Job;
  
  const postedDate = new Date(typedJob.postedAt);
  const postedAgo = formatDistanceToNow(postedDate, { addSuffix: true });
  const formattedDate = format(postedDate, "MMMM d, yyyy");
  
  const isSaved = isJobSaved(typedJob.slug);
  
  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return;
    }
    
    if (isSaved) {
      const success = await unsaveJob(typedJob.slug);
      if (success) {
        toast({
          title: "Job unsaved",
          description: "Job removed from your saved list"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to unsave job. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      const success = await saveJob(typedJob.slug);
      if (success) {
        toast({
          title: "Job saved",
          description: "Job added to your saved list"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save job. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <SEOHead 
        title={`${typedJob.title} at ${typedJob.company.name} | Remote Job | NomadWorks`}
        description={typedJob.description.substring(0, 160).replace(/(<([^>]+)>)/gi, '').trim()}
        structuredData={getJobPostingStructuredData()}
        type="article"
        keywords={`${typedJob.title.toLowerCase()}, ${typedJob.company.name.toLowerCase()}, remote job, ${typedJob.category.name.toLowerCase()} job, work from anywhere, ${typedJob.skills.map(skill => skill.name.toLowerCase()).join(', ')}, ${typedJob.experienceLevel ? typedJob.experienceLevel.toLowerCase() : ''} level, ${typedJob.type.toLowerCase()} position`}
        canonicalUrl={`${window.location.origin}/job/${typedJob.slug}`}
        publishedDate={typedJob.postedAt}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/search" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to jobs
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details - Left Column */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
                    <svg className="h-10 w-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{typedJob.title}</h1>
                    <p className="text-lg text-gray-700 mb-2">{typedJob.company.name}</p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted {postedAgo}</span>
                      </span>
                      {typedJob.featured && (
                        <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant={isSaved ? "outline" : "default"} 
                  size="default" 
                  className={`flex items-center gap-2 font-medium ${
                    isSaved 
                      ? 'text-red-500 border-red-300 hover:bg-red-50 hover:border-red-400' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-200'
                  }`}
                  onClick={handleSaveClick}
                >
                  <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-blue-600'}`} />
                  <span>{isSaved ? 'Saved' : 'Save Job'}</span>
                </Button>
              </div>
              
              {/* Job Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Job Type</span>
                    <p className="font-medium">{typedJob.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{typedJob.location.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Salary Range</span>
                    <p className="font-medium">
                      {typedJob.salaryMin && typedJob.salaryMax
                        ? `$${(typedJob.salaryMin/1000).toFixed(0)}k - $${(typedJob.salaryMax/1000).toFixed(0)}k`
                        : "Not specified"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <Globe className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Time Zone</span>
                    <p className="font-medium">{typedJob.timezone || "Flexible"}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <BarChart className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Experience</span>
                    <p className="font-medium">
                      {typedJob.experienceLevel
                        ? `${typedJob.experienceLevel.charAt(0).toUpperCase() + typedJob.experienceLevel.slice(1)} Level`
                        : "Not specified"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-md bg-gray-50">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <span className="text-sm text-gray-500">Posted Date</span>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{stripHtml(typedJob.description)}</p>
              </div>
            </div>
            
            {/* Skills & Requirements */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Requirements</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {typedJob.skills.map((skill) => (
                  <span key={skill.id} className="inline-flex px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Ad Unit */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                <GoogleAdUnit adFormat="rectangle" />
              </div>
            </div>
            
            {/* About Company */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About {typedJob.company.name}</h2>
              <p className="text-gray-600 mb-4">
                {typedJob.company.name} is a company offering remote opportunities for digital nomads.
              </p>
              {typedJob.company.website && (
                <a
                  href={typedJob.company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visit company website
                </a>
              )}
            </div>
          </div>
          
          {/* Right Column - Application Form and Toolkit */}
          <div className="lg:col-span-1">
            {/* Application Form */}
            {applicationSubmitted ? (
              <div className="sticky top-24">
                <ApplicationSuccess 
                  jobTitle={typedJob.title}
                  companyName={typedJob.company.name}
                  onClose={handleCloseSuccess}
                />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Apply for this position</h2>
                  <ToolkitButton variant="compact" className="animate-slow-pulse" />
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 123 456 7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume Link</FormLabel>
                          <FormControl>
                            <Input placeholder="https://drive.google.com/your-resume" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="coverLetter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cover Letter</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Why you're a great fit for this role..." 
                              rows={5}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>By applying for this job, you agree to our terms and privacy policy.</p>
                </div>
              </div>
            )}
            
            {/* Digital Nomad Toolkit */}
            <div className="mt-6">
              <ToolkitSidebar variant="job-specific" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}