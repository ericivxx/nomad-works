import fetch from 'node-fetch';

interface BrandfetchLogo {
  format: string;
  src: string;
  width?: number;
  height?: number;
  size?: number;
  background?: string;
}

interface BrandfetchResponse {
  name: string;
  domain: string;
  icon?: BrandfetchLogo;
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
    format: string;
    src: string;
    width?: number;
    height?: number;
    size?: number;
    background?: string;
    label?: string;
  }[];
}

export async function getBrandAssets(domain: string): Promise<BrandfetchResponse | null> {
  try {
    const apiKey = process.env.BRANDFETCH_API_KEY;
    
    if (!apiKey) {
      console.error('Brandfetch API key is not configured');
      return null;
    }
    
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
  
  // Prefer SVG formats for scalability
  const svgLogo = logos.find(logo => logo.format === 'svg');
  if (svgLogo) {
    return svgLogo.src;
  }
  
  // Then prefer PNG with transparency
  const pngLogos = logos.filter(logo => logo.format === 'png');
  if (pngLogos.length > 0) {
    // Sort by size (largest first) if size information is available
    const sortedPngLogos = pngLogos.sort((a, b) => {
      if (a.width && b.width) {
        return b.width - a.width;
      }
      return 0;
    });
    return sortedPngLogos[0].src;
  }
  
  // Fallback to any logo available
  return logos[0].src;
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