import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Newsletter from "./Newsletter";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header />
      {children}
      <Newsletter />
      <Footer />
    </div>
  );
}
