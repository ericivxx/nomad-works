import { Link } from "wouter";
import { Briefcase, MapPin, DollarSign } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { JobWithRelations } from "@shared/schema";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  job: JobWithRelations;
}

export default function JobCard({ job }: JobCardProps) {
  const formattedDate = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });
  
  // Format salary range
  const formatSalary = (min?: number, max?: number) => {
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
  
  const salary = formatSalary(job.salaryMin, job.salaryMax);
  
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 p-6">
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
      <div className="mt-5 flex justify-end">
        <Link href={`/jobs/${job.slug}`}>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
            View Job Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
