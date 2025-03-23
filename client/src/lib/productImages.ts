// Map product titles to local SVG assets
export function getProductImage(title: string): string {
  const productMap: Record<string, string> = {
    "Laptop Stand": "/laptop-stand.svg",
    "Triple Monitor Setup": "/triple-monitor.svg",
    "Single Portable Monitor": "/portable-monitor.svg",
    "Power Bank (20,000mAh+)": "/power-bank.svg",
    "Global Travel Adapter": "/travel-adapter.svg",
    "AirPods (Noise-Canceling)": "/airpods.svg",
    "Over-Ear Headphones": "/headphones.svg",
    "Webcam with Privacy Shutter": "/webcam.svg",
    "Lightweight Laptop under $1K": "/laptop.svg",
    "MacBook Air 13\"": "/macbook.svg"
  };

  // Try to find an exact match
  if (productMap[title]) {
    return productMap[title];
  }

  // If no exact match, try to find a partial match
  for (const key in productMap) {
    if (title.toLowerCase().includes(key.toLowerCase())) {
      return productMap[key];
    }
  }

  // Default fallback
  return "/laptop.svg";
}

// Exported product data for use in components
export const productImages = {
  "Laptop Stand": "/laptop-stand.svg",
  "Triple Monitor Setup": "/triple-monitor.svg",
  "Single Portable Monitor": "/portable-monitor.svg",
  "Power Bank (20,000mAh+)": "/power-bank.svg",
  "Global Travel Adapter": "/travel-adapter.svg",
  "AirPods (Noise-Canceling)": "/airpods.svg",
  "Over-Ear Headphones": "/headphones.svg",
  "Webcam with Privacy Shutter": "/webcam.svg",
  "Lightweight Laptop under $1K": "/laptop.svg",
  "MacBook Air 13\"": "/macbook.svg"
};