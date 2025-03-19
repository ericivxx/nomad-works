
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
