import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Home } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Fetch categories for navigation
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Home className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">NomadWorks</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className={`font-medium ${location === '/' ? 'text-gray-900' : 'text-gray-500'} hover:text-primary transition-colors`}>
            Home
          </Link>
          <Link href="/search" className={`font-medium ${location.startsWith('/search') ? 'text-gray-900' : 'text-gray-500'} hover:text-primary transition-colors`}>
            Browse Jobs
          </Link>
          <Link href="/locations" className={`font-medium ${location.startsWith('/locations') ? 'text-gray-900' : 'text-gray-500'} hover:text-primary transition-colors`}>
            Locations
          </Link>
          <Link href="/categories" className={`font-medium ${location.startsWith('/categories') ? 'text-gray-900' : 'text-gray-500'} hover:text-primary transition-colors`}>
            Categories
          </Link>
          <Link href="/digital-nomad-toolkit" className={`font-medium ${location.startsWith('/digital-nomad-toolkit') ? 'text-gray-900' : 'text-gray-500'} hover:text-primary transition-colors`}>
            Toolkit
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </nav>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 border-t">
          <Link href="/" className={`block px-3 py-2 rounded-md text-base font-medium ${location === '/' ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
            Home
          </Link>
          <Link href="/search" className={`block px-3 py-2 rounded-md text-base font-medium ${location.startsWith('/search') ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
            Browse Jobs
          </Link>
          <Link href="/locations" className={`block px-3 py-2 rounded-md text-base font-medium ${location.startsWith('/locations') ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
            Locations
          </Link>
          <Link href="/categories" className={`block px-3 py-2 rounded-md text-base font-medium ${location.startsWith('/categories') ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
            Categories
          </Link>
          <Link href="/digital-nomad-toolkit" className={`block px-3 py-2 rounded-md text-base font-medium ${location.startsWith('/digital-nomad-toolkit') ? 'text-gray-900 bg-gray-100' : 'text-gray-700 hover:bg-gray-100'}`}>
            Toolkit
          </Link>
        </div>
      </div>
    </header>
  );
}
