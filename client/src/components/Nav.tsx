import { Link } from "wouter";
import UserMenu from "./UserMenu";
import { useUser } from "@/contexts/UserContext";

export default function Nav() {
  const { isAuthenticated } = useUser();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">Remote Jobs</Link>
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="text-white hover:text-blue-100">
                  Login
                </Link>
                <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-green-600 px-3 py-1 rounded">
                  <span className="text-white">✓ Logged in as {user?.email}</span>
                </div>
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
                <Link href="/saved-jobs" className="text-white hover:text-blue-100">
                  Saved Jobs
                </Link>
                <UserMenu />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}