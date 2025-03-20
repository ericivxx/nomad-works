import { Link } from "wouter";
import { Briefcase, MapPin, DollarSign, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { JobWithRelations } from "@shared/schema";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext"; 
import { useToast } from "@/hooks/use-toast";

interface JobCardProps {
  job: JobWithRelations;
}

export default function JobCard({ job }: JobCardProps) {
  const { isAuthenticated, saveJob, unsaveJob, isJobSaved } = useUser();
  const { toast } = useToast();
  const formattedDate = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  
  const isSaved = isJobSaved(job.slug);
  
  const handleSaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the job card click from triggering
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return;
    }
    
    if (isSaved) {
      const success = await unsaveJob(job.slug);
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
      const success = await saveJob(job.slug);
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

  // Format salary range
  const formatSalary = () => {
    const min = job.salaryMin;
    const max = job.salaryMax;

    if (!min && !max) return "Not specified";

    const formatNumber = (num: number) => {
      if (num >= 1000) {
        return `$${Math.floor(num / 1000)}k`;
      }
      return `$${num}`;
    };

    if (min && max) {
      return `${formatNumber(min)} - ${formatNumber(max)}`;
    } else if (min) {
      return `From ${formatNumber(min)}`;
    } else if (max) {
      return `Up to ${formatNumber(max)}`;
    }

    return "Not specified";
  };

  const salary = formatSalary();

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = `/jobs/${job.slug}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
            <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-700 mb-1">{job.company.name}</p>
            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mt-2">
              <span className="flex items-center">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{job.type}</span>
              </span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location.name}</span>
              </span>
              <span className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{salary}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col items-end">
          <span className="text-sm text-gray-500">Posted {formattedDate}</span>
          {job.featured && (
            <div className="mt-2">
              <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 line-clamp-2">{stripHtml(job.description)}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span key={skill.id} className="inline-flex px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
            {skill.name}
          </span>
        ))}
      </div>
      <div className="mt-5 flex justify-between items-center">
        <Button 
          variant={isSaved ? "outline" : "ghost"} 
          size="sm" 
          className={`flex items-center gap-1 ${isSaved ? 'text-red-500 border-red-200' : 'text-gray-500'}`}
          onClick={handleSaveClick}
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
          {isSaved ? 'Saved' : 'Save Job'}
        </Button>
        
        <Link href={`/jobs/${job.slug}`} onClick={(e) => e.stopPropagation()}>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
            View Job Details
          </Button>
        </Link>
      </div>
    </div>
  );
}