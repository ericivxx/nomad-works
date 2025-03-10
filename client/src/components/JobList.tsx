import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { Loader } from "lucide-react";
import { JobWithRelations } from "@shared/schema";

interface JobListProps {
  endpoint: string;
  title?: string;
  subtitle?: string;
  showSorting?: boolean;
}

export default function JobList({ endpoint, title, subtitle, showSorting = true }: JobListProps) {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("relevant");
  const limit = 10;
  
  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint, page, limit, sortBy],
  });
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const sortJobs = (jobs: JobWithRelations[]) => {
    if (!jobs) return [];
    
    const jobsCopy = [...jobs];
    
    switch (sortBy) {
      case "newest":
        return jobsCopy.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
      case "highest":
        return jobsCopy.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
      default:
        // Most relevant - featured first, then by date
        return jobsCopy.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        });
    }
  };
  
  const jobs = data?.jobs || [];
  const sortedJobs = sortJobs(jobs);
  const totalJobs = data?.pagination?.total || 0;
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div className="lg:w-3/4">
      {/* Job Listings Header */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            {title && <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            {!subtitle && totalJobs > 0 && <p className="text-gray-600"><span className="font-medium">{totalJobs}</span> jobs available</p>}
          </div>
          
          {showSorting && (
            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
              <select 
                className="block w-full sm:w-auto bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="relevant">Most Relevant</option>
                <option value="newest">Newest First</option>
                <option value="highest">Highest Paid</option>
              </select>
            </div>
          )}
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="h-64 flex items-center justify-center">
          <Loader className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
          <p className="text-red-700">Failed to load jobs. Please try again later.</p>
        </div>
      )}
      
      {/* Empty State */}
      {!isLoading && !error && sortedJobs.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center my-8">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
      
      {/* Job Cards Container */}
      <div className="space-y-6">
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      
      {/* Pagination */}
      {!isLoading && !error && totalPages > 1 && (
        <div className="mt-8">
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
    </div>
  );
}
