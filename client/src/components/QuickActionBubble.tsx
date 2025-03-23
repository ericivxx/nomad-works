import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, 
  BriefcaseBusiness, 
  CompassIcon, 
  Bookmark, 
  ChevronUp,
  X,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

export default function QuickActionBubble() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { user } = useUser();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Check if we need to show the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Generate a unique ID for the current page
  const pageId = location.replace(/[^a-zA-Z0-9]/g, '-');
  
  // Save current page (this is a placeholder - you'd need to implement actual page saving)
  const handleSavePage = () => {
    // This would typically save the current URL to user's bookmarks
    // For now, let's just toggle the bubble menu and show an alert
    alert('Page saved to your bookmarks!');
    setOpen(false);
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded action buttons - only shown when open */}
      {open && (
        <div className="flex flex-col gap-2 items-end mb-2 animate-in fade-in-50 slide-in-from-right-5 duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50"
            onClick={() => { setOpen(false); }}
            asChild
          >
            <Link href="/search">
              <Search className="h-4 w-4" /> 
              <span className="whitespace-nowrap">Find Jobs</span>
            </Link>
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50"
            onClick={() => { setOpen(false); }}
            asChild
          >
            <Link href="/jobs">
              <BriefcaseBusiness className="h-4 w-4" /> 
              <span className="whitespace-nowrap">Latest Jobs</span>
            </Link>
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50"
            onClick={() => { setOpen(false); }}
            asChild
          >
            <Link href="/digital-nomad-toolkit">
              <CompassIcon className="h-4 w-4" /> 
              <span className="whitespace-nowrap">Nomad Toolkit</span>
            </Link>
          </Button>
          
          {user && (
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50"
              onClick={handleSavePage}
            >
              <Bookmark className="h-4 w-4" /> 
              <span className="whitespace-nowrap">Save Page</span>
            </Button>
          )}
          
          {showScrollTop && (
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-white text-blue-600 border border-blue-100 hover:bg-blue-50"
              onClick={() => { scrollToTop(); setOpen(false); }}
            >
              <ChevronUp className="h-4 w-4" /> 
              <span className="whitespace-nowrap">Back to Top</span>
            </Button>
          )}
        </div>
      )}
      
      {/* Main floating action button */}
      <Button
        variant="default"
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 bg-gradient-to-r",
          open 
            ? "from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600" 
            : "from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
          showScrollTop && !open ? "animate-bounce" : ""
        )}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
}