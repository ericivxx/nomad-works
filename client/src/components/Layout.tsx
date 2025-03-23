import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import ToolkitButton from "./ToolkitButton";
import QuickActionBubble from "./QuickActionBubble";
import { useLocation } from "wouter";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  
  // Determine if we should show Quick Action Bubble
  // We may want to hide it on certain pages
  const showQuickActions = !location.includes('/admin');
  
  // Show newsletter on all pages except homepage
  const showNewsletter = location !== '/' && location !== '/home';
  
  // Determine classes based on page
  const isHomePage = location === '/' || location === '/home';
  
  // Only hide footer on homepage in mobile view
  const showFooter = !(isHomePage && isMobile);
  
  return (
    <div className={`flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800 ${isHomePage ? 'home-page' : ''}`}>
      <Header />
      {children}
      {showNewsletter && <Newsletter />}
      {showFooter && <Footer />}
      
      {/* Quick Action Floating Navigation Bubble */}
      {showQuickActions && <QuickActionBubble />}
    </div>
  );
}
