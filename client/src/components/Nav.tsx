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
                <span className="text-green-300">✓ Logged in</span>
                <Link href="/profile" className="text-white hover:text-blue-100">
                  Profile
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