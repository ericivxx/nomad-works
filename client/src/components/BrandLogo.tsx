import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
// We're disabling local logos to use Brandfetch API
// import { 
//   NordVPNLogo, 
//   ExpressVPNLogo, 
//   SafetyWingLogo, 
//   UdemyLogo, 
//   WiseLogo,
//   LinkedInLogo,
//   SkillshareLogo,
//   KrispLogo,
//   OnePasswordLogo,
//   BitwardenLogo,
//   NotionLogo,
//   LoomLogo,
//   BackblazeLogo,
//   FlexJobsLogo
// } from "@/assets/logos";

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

// We're disabling local logos completely to use Brandfetch API
const localLogos: Record<string, React.FC<{className?: string}>> = {};

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
  
  // Check if we have a local logo component for this domain
  console.log(`BrandLogo: Checking for local logo for domain "${baseDomain}"`);
  
  // Check if we have a local logo available as fallback
  const hasLocalLogo = baseDomain in localLogos;
  const LogoComponent = hasLocalLogo ? localLogos[baseDomain] : null;
  console.log(`BrandLogo: ${hasLocalLogo ? "Found" : "No"} local logo for ${baseDomain}, but trying API first`);

  // Try the direct approach using Brand Search API from client-side
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand", baseDomain],
    queryFn: async () => {
      try {
        console.log(`BrandLogo: Fetching data for domain: ${baseDomain}`);
        
        // First try our own API endpoint
        const response = await fetch(`/api/brand/${baseDomain}`);
        console.log(`BrandLogo: Initial API response status: ${response.status}`);
        
        if (response.ok) {
          const responseText = await response.text();
          console.log(`BrandLogo: Raw API response: ${responseText}`);
          
          try {
            const result = JSON.parse(responseText) as BrandData;
            console.log(`BrandLogo: Successfully fetched data from our API for ${baseDomain}:`, result);
            
            // Make sure we have a logo - if not, we'll try fallback strategy below
            if (result.logo) {
              return result;
            }
          } catch (jsonError) {
            console.error(`BrandLogo: Error parsing JSON response: ${jsonError}`);
          }
        } else {
          console.error(`BrandLogo: API request failed with status ${response.status}: ${response.statusText}`);
          const errorText = await response.text();
          console.error(`BrandLogo: Error response body: ${errorText}`);
        }
        
        // If the above API call didn't give us a logo, try direct search through our backend API
        // This ensures proper authentication and error handling
        const domainSearchTerm = baseDomain.split('.')[0]; // Use the base name for better search results
        const searchUrl = `/api/brand/${domainSearchTerm}`;
        
        console.log(`BrandLogo: Trying search with different term: ${domainSearchTerm}`);
        const directResponse = await fetch(searchUrl);
        console.log(`BrandLogo: Secondary API response status: ${directResponse.status}`);
        
        if (directResponse.ok) {
          // This should already return a processed BrandData object from our API
          const directText = await directResponse.text();
          console.log(`BrandLogo: Raw secondary API response: ${directText}`);
          
          try {
            const result = JSON.parse(directText) as BrandData;
            console.log(`BrandLogo: Got secondary search result:`, result);
            
            if (result && result.logo) {
              return result;
            }
          } catch (jsonError) {
            console.error(`BrandLogo: Error parsing JSON from secondary response: ${jsonError}`);
          }
        } else {
          console.error(`BrandLogo: Secondary API request failed with status ${directResponse.status}: ${directResponse.statusText}`);
        }
        
        // If we still have nothing, return null
        console.log(`BrandLogo: All API attempts failed for ${baseDomain}, returning null`);
        return null;
      } catch (error) {
        console.error(`BrandLogo: Error fetching brand data for ${baseDomain}:`, error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    enabled: !!baseDomain, // Always run query if we have a domain
    retry: 1, // Only retry once to avoid too many failing requests
  });
  
  // Handle loading state
  if (isLoading) {
    return <Skeleton className={cn("h-10 w-28 rounded", className)} />;
  }
  
  // If we have a successful API response with a logo
  if (data && !isError && !imageError) {
    console.log(`BrandLogo: Using data for ${baseDomain}:`, data);
    
    if (data.logo && type === "logo") {
      return (
        <div className={cn("flex items-center justify-center", className)}>
          <img 
            src={data.logo} 
            alt={data.name || fallbackText || baseDomain} 
            className={cn("h-full w-auto", className)}
            onError={() => setImageError(true)}
          />
        </div>
      );
    } else if (data.icon && type === "icon") {
      return (
        <div className={cn("flex items-center justify-center", className)}>
          <img 
            src={data.icon} 
            alt={data.name || fallbackText || baseDomain} 
            className={cn("h-full w-auto", className)}
            onError={() => setImageError(true)}
          />
        </div>
      );
    }
    
    // If the API returned a primary color and we want to use colors, build a styled component
    if (useColors && data.primaryColor) {
      return (
        <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
          <span style={{ color: data.primaryColor }}>{data.name || fallbackText || baseDomain}</span>
        </div>
      );
    }
    
    // If we have a name but no logo/icon or colors
    if (data.name) {
      return (
        <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
          {data.name}
        </div>
      );
    }
  } 
  
  // Try local logo component if API failed and we have a local logo
  if (hasLocalLogo && LogoComponent) {
    console.log(`BrandLogo: API failed, using local logo for ${baseDomain}`);
    return <LogoComponent className={className} />;
  }
  
  // Fallback to text if no image is available and no local logo
  console.log(`BrandLogo: Using text fallback for ${baseDomain}`);
  return (
    <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
      {fallbackText || baseDomain.split('.')[0]}
    </div>
  );
}