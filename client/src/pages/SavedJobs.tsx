
import { useUser } from "@/contexts/UserContext";
import JobCard from "@/components/JobCard";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Briefcase, Loader2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { JobWithRelations } from "@shared/schema";

interface SavedJobsResponse {
  jobs: JobWithRelations[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function SavedJobs() {
  const { user, isAuthenticated } = useUser();

  // Fetch saved jobs directly from our new API endpoint
  const { 
    data: savedJobsData,
    isLoading,
    isError 
  } = useQuery<SavedJobsResponse>({
    queryKey: ['/api/saved-jobs'],
    enabled: isAuthenticated,
    retry: 1
  });

  const savedJobs = savedJobsData?.jobs || [];

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
          <p className="text-gray-600 mb-6">You need to sign in to view and manage your saved jobs.</p>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Saved Jobs | NomadWorks"
        description="View and manage your saved remote job opportunities."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-gray-600 mb-8">Jobs you've saved for later application</p>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600 mb-4">Failed to load your saved jobs. Please try again.</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="space-y-6">
            {savedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center">
            <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">No Saved Jobs Yet</h2>
            <p className="text-gray-600 mb-6">
              Browse jobs and click the save button to add them to your saved jobs list for later reference.
            </p>
            <Link href="/search">
              <Button>Browse Jobs</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
