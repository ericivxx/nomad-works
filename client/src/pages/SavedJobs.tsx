
import { useUser } from "@/contexts/UserContext";
import JobCard from "@/components/JobCard";

export default function SavedJobs() {
  const { user } = useUser();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view saved jobs.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>
      <div className="space-y-6">
        {user.savedJobs?.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
        {(!user.savedJobs || user.savedJobs.length === 0) && (
          <p>No saved jobs yet. Browse jobs and click the save button to add them here.</p>
        )}
      </div>
    </div>
  );
}
