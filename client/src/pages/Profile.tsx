
import { useUser } from "@/contexts/UserContext";

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="font-medium text-gray-700">Full Name</label>
            <p className="mt-1">{user.fullName}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <p className="mt-1">{user.email}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Gender</label>
            <p className="mt-1">{user.gender}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Location</label>
            <p className="mt-1">{user.location}</p>
          </div>
          <div>
            <label className="font-medium text-gray-700">Bio</label>
            <p className="mt-1">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useUser } from '@/contexts/UserContext';

export default function Profile() {
  const { user } = useUser();
  
  if (!user) {
    return <div className="container mx-auto px-4 py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="font-medium">Full Name</label>
              <p>{user.fullName}</p>
            </div>
            <div>
              <label className="font-medium">Email</label>
              <p>{user.email}</p>
            </div>
            <div>
              <label className="font-medium">Gender</label>
              <p>{user.gender}</p>
            </div>
            <div>
              <label className="font-medium">Location</label>
              <p>{user.location}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
          {user.savedJobs?.length ? (
            <div className="space-y-4">
              {user.savedJobs.map(job => (
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
    </div>
  );
}
