import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Search, 
  BriefcaseBusiness, 
  CompassIcon, 
  Bookmark, 
  ChevronUp,
  X,
  Menu,
  BookOpen
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pb-6 mb-4">
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
            className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white border border-indigo-300 hover:from-purple-600 hover:to-indigo-600 relative"
            onClick={() => { setOpen(false); }}
            asChild
          >
            <Link href="/digital-nomad-toolkit">
              <span className="absolute -right-1 -top-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-300"></span>
              </span>
              <CompassIcon className="h-4 w-4 text-white" /> 
              <span className="whitespace-nowrap font-semibold">Nomad Toolkit</span>
            </Link>
          </Button>
          
          <Button
            size="sm"
            variant="secondary"
            className="rounded-full px-4 py-2 shadow-md flex items-center gap-2 bg-gradient-to-r from-rose-400 to-pink-500 text-white border border-pink-300 hover:from-rose-500 hover:to-pink-600"
            onClick={() => { 
              setOpen(false);
              // This will ensure scroll to top when user navigates to another page
              setTimeout(() => window.scrollTo(0, 0), 100);
            }}
            asChild
          >
            <Link href="/blog">
              <BookOpen className="h-4 w-4 text-white" /> 
              <span className="whitespace-nowrap font-semibold">Nomad Blog</span>
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
          "h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-r border-2",
          open 
            ? "from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 border-orange-300" 
            : "from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-indigo-300",
          showScrollTop && !open ? "animate-bounce" : ""
        )}
        onClick={() => setOpen(!open)}
      >
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300"></span>
          </span>
        )}
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <Menu className="h-6 w-6 text-white" />
        )}
      </Button>
    </div>
  );
}