import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import ToolkitButton from "./ToolkitButton";
import QuickActionBubble from "./QuickActionBubble";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Determine if we should show Quick Action Bubble
  // We may want to hide it on certain pages
  const showQuickActions = !location.includes('/admin');
  
  // Don't show newsletter on homepage because we already have a similar CTA
  const showNewsletter = location !== '/' && location !== '/home';
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      {children}
      {showNewsletter && <Newsletter />}
      <Footer />
      
      {/* Quick Action Floating Navigation Bubble */}
      {showQuickActions && <QuickActionBubble />}
    </div>
  );
}
