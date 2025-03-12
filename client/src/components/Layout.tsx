import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";
import ToolkitButton from "./ToolkitButton";
import { useLocation } from "wouter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  
  // Don't show on the toolkit page itself
  const showToolkitButton = !location.includes('/digital-nomad-toolkit');
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      {children}
      {showToolkitButton && <ToolkitButton variant="floating" />}
      <Newsletter />
      <Footer />
    </div>
  );
}
