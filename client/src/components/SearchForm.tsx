import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function SearchForm({ variant = "primary" }: { variant?: "primary" | "compact" }) {
  const [, navigate] = useLocation();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  
  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (keyword) {
      params.append("search", keyword);
    }
    
    if (location) {
      params.append("location", location);
    }
    
    navigate(`/search?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Job title, skill or keyword"
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button 
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-2 md:p-4 flex flex-col md:flex-row items-center">
      <div className="flex-grow mb-2 md:mb-0 md:mr-4 w-full md:w-auto">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Job title, skill or keyword" 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      
      <div className="flex-grow mb-2 md:mb-0 md:mr-4 w-full md:w-auto">
        <div className="relative">
          <select 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none text-gray-900"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations?.map((loc: any) => (
              <option key={loc.id} value={loc.slug}>{loc.name}</option>
            ))}
          </select>
          <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <svg className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      <button 
        type="submit"
        className="w-full md:w-auto bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <span>Search Jobs</span>
        <ArrowRight className="h-5 w-5 ml-2" />
      </button>
    </form>
  );
}
