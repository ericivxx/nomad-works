import fetch from 'node-fetch';

interface BrandfetchLogoFormat {
  src: string;
  format: string;
  width?: number;
  height?: number;
  size?: number;
  background?: string;
}

interface BrandfetchLogo {
  theme: string;
  formats: BrandfetchLogoFormat[];
  tags: string[];
  type: string;
}

interface BrandfetchResponse {
  name: string;
  domain: string;
  icon?: BrandfetchLogoFormat | string;
  logo?: string;
  logos?: BrandfetchLogo[];
  colors?: {
    hex: string;
    type: string;
    brightness: number;
  }[];
  fonts?: {
    name: string;
    type: string;
    origin: string;
  }[];
  images?: {
    formats: BrandfetchLogoFormat[];
    tags: string[];
    type: string;
  }[];
}

export async function getBrandAssets(domain: string): Promise<BrandfetchResponse | null> {
  try {
    const apiKey = process.env.BRANDFETCH_API_KEY;
    
    if (!apiKey) {
      console.error('Brandfetch API key is not configured');
      return null;
    }
    
    console.log(`Fetching brand assets for domain: ${domain}`);
    
    // Try the Brand Search API first to get information (requires clientId)
    const searchResponse = await fetch(`https://api.brandfetch.io/v2/search/${domain}?c=${apiKey}`);
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json() as any[];
      console.log(`Brand search results for ${domain}:`, JSON.stringify(searchData));
      
      if (Array.isArray(searchData) && searchData.length > 0) {
        // Find the best match from the search results
        const bestMatch = searchData.find((result: any) => 
          result.domain === domain || 
          domain.includes(result.domain) || 
          result.domain.includes(domain)
        ) || searchData[0];
        
        console.log(`Best match for ${domain}:`, JSON.stringify(bestMatch));
        
        // Create a simpler response with just what we need
        return {
          name: bestMatch.name,
          domain: bestMatch.domain,
          logo: bestMatch.icon || null,
          icon: bestMatch.icon || null,
          colors: bestMatch.colors || []
        };
      }
    }
    
    // Fallback to full API if search doesn't work
    const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    
    if (!response.ok) {
      console.error(`Error fetching brand assets for ${domain}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json() as BrandfetchResponse;
    console.log(`Successfully fetched brand data for ${domain}: Raw response:`, JSON.stringify(data));
    return data;
  } catch (error) {
    console.error(`Error fetching brand assets for ${domain}:`, error);
    return null;
  }
}

export function getBestLogo(logos?: BrandfetchLogo[]): string | null {
  if (!logos || logos.length === 0) {
    return null;
  }
  
  // First, find all logos that are actual logos (not symbols or icons)
  const actualLogos = logos.filter(logo => logo.type === 'logo');
  
  // If we have actual logos, prefer those, otherwise use any logo we have
  const logosToUse = actualLogos.length > 0 ? actualLogos : logos;
  
  // Prefer light theme logos
  const lightLogos = logosToUse.filter(logo => logo.theme === 'light');
  const bestLogos = lightLogos.length > 0 ? lightLogos : logosToUse;
  
  // Get all available formats from the best logo
  const allFormats = bestLogos[0].formats;
  
  // Prefer SVG formats for scalability
  const svgFormat = allFormats.find(format => format.format === 'svg');
  if (svgFormat) {
    return svgFormat.src;
  }
  
  // Then prefer PNG with transparency
  const pngFormats = allFormats.filter(format => format.format === 'png');
  if (pngFormats.length > 0) {
    // Sort by size (largest first) if size information is available
    const sortedPngFormats = pngFormats.sort((a, b) => {
      if (a.width && b.width) {
        return b.width - a.width;
      }
      return 0;
    });
    return sortedPngFormats[0].src;
  }
  
  // Fallback to any format available
  return allFormats[0].src;
}

export function getBrandPrimaryColor(colors?: { hex: string; type: string }[]): string | null {
  if (!colors || colors.length === 0) {
    return null;
  }
  
  // Look for primary color
  const primaryColor = colors.find(color => color.type === 'primary');
  if (primaryColor) {
    return primaryColor.hex;
  }
  
  // Fallback to first color
  return colors[0].hex;
}