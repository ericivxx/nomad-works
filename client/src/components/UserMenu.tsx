
import { Link } from "wouter";
import { useUser } from "@/contexts/UserContext";

export default function UserMenu() {
  const { user, isAuthenticated, logout } = useUser();
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20">
        <span>{user.email}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
        <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
        <Link href="/saved-jobs" className="block px-4 py-2 hover:bg-gray-100">Saved Jobs</Link>
        <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  );
}
