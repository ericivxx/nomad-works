import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [location] = useLocation();
  const isHomePage = location === '/' || location === '/home';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // For homepage, use a special version that looks more like a visual ending
  if (isHomePage) {
    return (
      <section className="bg-gradient-to-b from-blue-500/5 via-indigo-500/10 to-indigo-600/20 py-16 mt-24 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">Ready to Start Your Nomad Journey?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Create your account today and access all our premium features for digital nomads.
            </p>
            <div className="flex justify-center">
              <a 
                href="/register" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // For other pages, use the original newsletter section
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-blue-600 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Create Your Digital Nomad Account</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of digital nomads! Save your favorite jobs, get personalized alerts, and access exclusive remote work opportunities.
          </p>
          <div className="bg-white/10 p-6 rounded-xl mb-6 inline-block">
            <ul className="text-left text-blue-100 space-y-2">
              <li>✓ Save jobs and track applications</li>
              <li>✓ Get daily job alerts matching your skills</li>
              <li>✓ Access exclusive remote work resources</li>
              <li>✓ Special deals on nomad-friendly services</li>
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg flex-grow max-w-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          <p className="mt-4 text-sm text-blue-100">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
