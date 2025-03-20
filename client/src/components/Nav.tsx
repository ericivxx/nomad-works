import { Link } from "wouter";
import { useUser } from "@/contexts/UserContext";

export default function Nav() {
  const { user, isAuthenticated, logout } = useUser();
  console.log("Nav auth state:", { user, isAuthenticated });

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
                  <span className="text-white">✓ {user?.email}</span>
                </div>
                <Link href="/profile" className="text-white hover:text-blue-100">
                  Profile
                </Link>
                <Link href="/saved-jobs" className="text-white hover:text-blue-100">
                  Saved Jobs
                </Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="text-white hover:text-blue-100 bg-blue-700 px-3 py-1 rounded">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    window.location.href = '/';
                  }}
                  className="text-white hover:text-blue-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}