import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { 
  NordVPNLogo, 
  ExpressVPNLogo, 
  SafetyWingLogo, 
  UdemyLogo, 
  WiseLogo,
  LinkedInLogo,
  SkillshareLogo,
  KrispLogo,
  OnePasswordLogo,
  BitwardenLogo,
  NotionLogo,
  LoomLogo,
  BackblazeLogo,
  FlexJobsLogo
} from "@/assets/logos";

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

// Map domains to local logo components
const localLogos: Record<string, React.FC<{className?: string}>> = {
  "nordvpn.com": NordVPNLogo,
  "expressvpn.com": ExpressVPNLogo,
  "safetywing.com": SafetyWingLogo,
  "udemy.com": UdemyLogo,
  "wise.com": WiseLogo,
  "linkedin.com": LinkedInLogo,
  "skillshare.com": SkillshareLogo,
  "krisp.ai": KrispLogo,
  "1password.com": OnePasswordLogo,
  "bitwarden.com": BitwardenLogo,
  "notion.so": NotionLogo,
  "loom.com": LoomLogo,
  "backblaze.com": BackblazeLogo,
  "flexjobs.com": FlexJobsLogo
};

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
  const LogoComponent = localLogos[baseDomain];
  if (LogoComponent) {
    console.log(`BrandLogo: Using local logo for ${baseDomain}`);
    return <LogoComponent className={className} />;
  }

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
    enabled: !!baseDomain && !LogoComponent, // Only run query if we have a domain and don't have a local logo
  });
  
  // Handle loading state
  if (isLoading) {
    return <Skeleton className={cn("h-10 w-28 rounded", className)} />;
  }
  
  // If we have a successful API response with a logo or icon
  if (data && !isError && !imageError) {
    console.log(`BrandLogo: Using data for ${baseDomain}:`, data);
    
    // If the API returned a primary color and we want to use colors, build a styled component
    if (useColors && data.primaryColor) {
      return (
        <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
          <span style={{ color: data.primaryColor }}>{data.name || fallbackText || baseDomain}</span>
        </div>
      );
    }
  } 
  
  // Fallback to text if no image is available or there was an error
  console.log(`BrandLogo: Using text fallback for ${baseDomain}`);
  return (
    <div className={cn("flex items-center justify-center font-bold text-xl", className)}>
      {fallbackText || baseDomain.split('.')[0]}
    </div>
  );
}