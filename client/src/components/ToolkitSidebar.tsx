import { Link } from "wouter";
import { useEffect, useState } from "react";

/**
 * A sidebar component that promotes the Digital Nomad Toolkit
 * Can be displayed on job listing pages and search results
 */
export default function ToolkitSidebar({ variant = "default" }: { variant?: "default" | "compact" | "job-specific" }) {
  const [randomTool, setRandomTool] = useState<{ name: string; description: string; url: string; category: string }>();
  
  // Simulate getting a random tool recommendation based on variant
  useEffect(() => {
    const tools = [
      {
        name: "NordVPN",
        description: "Secure your connection when working from public WiFi",
        url: "/digital-nomad-toolkit?tab=vpn#nordvpn",
        category: "vpn"
      },
      {
        name: "SafetyWing Insurance",
        description: "Health insurance designed for digital nomads",
        url: "/digital-nomad-toolkit?tab=insurance#safetywing",
        category: "insurance"
      },
      {
        name: "Wise Multi-Currency Account",
        description: "Manage multiple currencies with minimal fees",
        url: "/digital-nomad-toolkit?tab=finance#wise",
        category: "finance"
      },
      {
        name: "Skyroam Global WiFi",
        description: "Stay connected with portable WiFi in 130+ countries",
        url: "/digital-nomad-toolkit?tab=esim#skyroam",
        category: "connectivity"
      },
    ];
    
    // Choose a random tool or one appropriate for the variant
    if (variant === "job-specific") {
      // In a real app, we might choose based on job category
      setRandomTool(tools[0]); // Default to VPN for job-specific
    } else {
      const randomIndex = Math.floor(Math.random() * tools.length);
      setRandomTool(tools[randomIndex]);
    }
  }, [variant]);
  
  if (!randomTool) return null;
  
  if (variant === "compact") {
    return (
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-medium text-blue-900">Digital Nomad Tip</h4>
            <p className="text-xs text-blue-700">Check out our <Link href="/digital-nomad-toolkit" className="font-medium underline">toolkit</Link> for essential remote work tools</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2">Digital Nomad Toolkit</h3>
        <p className="text-gray-600 text-sm mb-4">
          {variant === "job-specific" 
            ? "Equip yourself with the right tools for this remote position:" 
            : "Essential tools used by successful digital nomads:"}
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-medium text-blue-800">{randomTool.name}</h4>
          <p className="text-sm text-blue-600 mb-3">{randomTool.description}</p>
          <Link 
            href={randomTool.url}
            className="text-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-4 py-1.5 inline-block"
          >
            Learn More
          </Link>
        </div>
        
        <Link 
          href="/digital-nomad-toolkit" 
          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
        >
          View complete toolkit
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}