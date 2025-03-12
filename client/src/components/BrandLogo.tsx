import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BrandLogoProps {
  domain: string;
  className?: string;
  fallbackText?: string;
  type?: "logo" | "icon";
  useColors?: boolean;
}

interface BrandData {
  name: string;
  domain: string;
  logo: string | null;
  icon: string | null;
  primaryColor: string | null;
}

export default function BrandLogo({ 
  domain, 
  className, 
  fallbackText, 
  type = "logo",
  useColors = false
}: BrandLogoProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extract the base domain for the API request
  const baseDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/^www\./, '');
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand", baseDomain],
    queryFn: async () => {
      try {
        console.log(`BrandLogo: Fetching data for domain: ${baseDomain}`);
        const response = await fetch(`/api/brand/${baseDomain}`);
        if (!response.ok) {
          console.error(`BrandLogo: Failed to fetch brand data for ${baseDomain} - Status: ${response.status}`);
          throw new Error("Failed to fetch brand data");
        }
        const result = await response.json() as BrandData;
        console.log(`BrandLogo: Successfully fetched data for ${baseDomain}:`, result);
        return result;
      } catch (error) {
        console.error(`BrandLogo: Error fetching brand data for ${baseDomain}:`, error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    enabled: !!baseDomain, // Only run query if we have a domain
  });
  
  // Handle loading state
  if (isLoading) {
    return <Skeleton className={cn("h-10 w-28 rounded", className)} />;
  }
  
  // If we have a successful API response with a logo or icon
  if (data && !isError && !imageError) {
    console.log(`BrandLogo: Using data for ${baseDomain}:`, data);
    
    const imageUrl = type === "logo" 
      ? data.logo 
      : (data.icon || data.logo);
    
    console.log(`BrandLogo: Selected image URL for ${baseDomain}:`, imageUrl);
    
    if (imageUrl) {
      // If we have a valid image URL, display it
      return (
        <img 
          src={imageUrl} 
          alt={data.name || fallbackText || baseDomain}
          className={className}
          style={useColors && data.primaryColor ? { filter: `drop-shadow(0 0 3px ${data.primaryColor}aa)` } : undefined}
          onError={(e) => {
            console.error(`BrandLogo: Image error for ${baseDomain}:`, e);
            setImageError(true);
          }}
        />
      );
    } else {
      console.log(`BrandLogo: No image URL found for ${baseDomain}`);
    }
  } else {
    console.log(`BrandLogo: Using fallback for ${baseDomain}`, { 
      hasData: !!data, 
      isError, 
      imageError 
    });
  }
  
  // Fallback to text if no image is available or there was an error
  return (
    <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
      {fallbackText || baseDomain.split('.')[0]}
    </div>
  );
}