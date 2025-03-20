import { useUser } from "@/contexts/UserContext";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, isAuthenticated } = useUser();
  const [, setLocation] = useLocation();

  if (!isAuthenticated) {
    setLocation("/register");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="text-lg">{user?.email}</div>
          </div>
          {user?.fullName && (
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <div className="text-lg">{user.fullName}</div>
            </div>
          )}
          {user?.location && (
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <div className="text-lg">{user.location}</div>
            </div>
          )}
          {user?.gender && (
            <div>
              <label className="text-sm text-gray-600">Gender</label>
              <div className="text-lg">{user.gender}</div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
        {user.savedJobs?.length ? (
          <div className="space-y-4">
            {user.savedJobs.map((job) => (
              <div key={job.id} className="border-b pb-4">
                <h3 className="font-medium">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No saved jobs yet.</p>
        )}
      </div>
    </div>
  );
}