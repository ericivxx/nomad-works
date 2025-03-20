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
              <Link href="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg">
                Sign Up
              </Link>
            ) : (
              <UserMenu />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}