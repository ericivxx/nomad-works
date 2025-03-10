import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [, navigate] = useLocation();
  const search = useSearch();
  const searchParams = new URLSearchParams(search);
  
  const [filters, setFilters] = useState({
    type: [] as string[],
    experience: [] as string[],
    category: [] as string[],
    salary: [] as string[],
    timezone: [] as string[],
  });
  
  // Fetch categories for filters
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  // Update filters from URL on component mount
  useEffect(() => {
    const initialFilters = { ...filters };
    
    if (searchParams.has('type')) {
      initialFilters.type = searchParams.get('type')!.split(',');
    }
    
    if (searchParams.has('experience')) {
      initialFilters.experience = searchParams.get('experience')!.split(',');
    }
    
    if (searchParams.has('category')) {
      initialFilters.category = searchParams.get('category')!.split(',');
    }
    
    if (searchParams.has('salary')) {
      initialFilters.salary = searchParams.get('salary')!.split(',');
    }
    
    if (searchParams.has('timezone')) {
      initialFilters.timezone = searchParams.get('timezone')!.split(',');
    }
    
    setFilters(initialFilters);
  }, []);
  
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters };
    
    if (updatedFilters[filterType].includes(value)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== value);
    } else {
      updatedFilters[filterType].push(value);
    }
    
    setFilters(updatedFilters);
    
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };
  
  const handleApplyFilters = () => {
    // Keep existing search parameters
    const params = new URLSearchParams(search);
    
    // Update with filter values
    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0) {
        params.set(key, values.join(','));
      } else {
        params.delete(key);
      }
    });
    
    navigate(`/search?${params.toString()}`);
  };
  
  const handleClearFilters = () => {
    setFilters({
      type: [],
      experience: [],
      category: [],
      salary: [],
      timezone: [],
    });
    
    // Keep only search and location parameters
    const params = new URLSearchParams();
    if (searchParams.has('search')) {
      params.set('search', searchParams.get('search')!);
    }
    if (searchParams.has('location')) {
      params.set('location', searchParams.get('location')!);
    }
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <aside className="lg:w-1/4">
      <div className="sticky top-24">
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button 
              className="text-sm text-primary hover:underline"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
          </div>
          
          {/* Job Type Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Job Type</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.type.includes('full-time')}
                  onChange={() => handleFilterChange('type', 'full-time')}
                />
                <span className="ml-2 text-gray-700">Full-time</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.type.includes('part-time')}
                  onChange={() => handleFilterChange('type', 'part-time')}
                />
                <span className="ml-2 text-gray-700">Part-time</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.type.includes('contract')}
                  onChange={() => handleFilterChange('type', 'contract')}
                />
                <span className="ml-2 text-gray-700">Contract</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.type.includes('freelance')}
                  onChange={() => handleFilterChange('type', 'freelance')}
                />
                <span className="ml-2 text-gray-700">Freelance</span>
              </label>
            </div>
          </div>
          
          {/* Experience Level Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Experience Level</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.experience.includes('entry')}
                  onChange={() => handleFilterChange('experience', 'entry')}
                />
                <span className="ml-2 text-gray-700">Entry Level</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.experience.includes('mid')}
                  onChange={() => handleFilterChange('experience', 'mid')}
                />
                <span className="ml-2 text-gray-700">Mid Level</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.experience.includes('senior')}
                  onChange={() => handleFilterChange('experience', 'senior')}
                />
                <span className="ml-2 text-gray-700">Senior Level</span>
              </label>
            </div>
          </div>
          
          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories?.slice(0, 5).map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary rounded"
                    checked={filters.category.includes(category.slug)}
                    onChange={() => handleFilterChange('category', category.slug)}
                  />
                  <span className="ml-2 text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
            {categories && categories.length > 5 && (
              <button className="text-primary hover:underline text-sm mt-2">See all categories</button>
            )}
          </div>
          
          {/* Salary Range Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Salary Range</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.salary.includes('0-50000')}
                  onChange={() => handleFilterChange('salary', '0-50000')}
                />
                <span className="ml-2 text-gray-700">$0 - $50k</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.salary.includes('50000-100000')}
                  onChange={() => handleFilterChange('salary', '50000-100000')}
                />
                <span className="ml-2 text-gray-700">$50k - $100k</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.salary.includes('100000-150000')}
                  onChange={() => handleFilterChange('salary', '100000-150000')}
                />
                <span className="ml-2 text-gray-700">$100k - $150k</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.salary.includes('150000-1000000')}
                  onChange={() => handleFilterChange('salary', '150000-1000000')}
                />
                <span className="ml-2 text-gray-700">$150k+</span>
              </label>
            </div>
          </div>
          
          {/* Time Zones Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Time Zones</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.timezone.includes('americas')}
                  onChange={() => handleFilterChange('timezone', 'americas')}
                />
                <span className="ml-2 text-gray-700">Americas (UTC -4 to -10)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.timezone.includes('europe')}
                  onChange={() => handleFilterChange('timezone', 'europe')}
                />
                <span className="ml-2 text-gray-700">Europe/Africa (UTC -1 to +3)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-primary rounded"
                  checked={filters.timezone.includes('asia')}
                  onChange={() => handleFilterChange('timezone', 'asia')}
                />
                <span className="ml-2 text-gray-700">Asia/Oceania (UTC +5 to +12)</span>
              </label>
            </div>
          </div>
          
          <button 
            className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
