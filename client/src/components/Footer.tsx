import { Link } from "wouter";
import { Home, Twitter, Linkedin, Instagram } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const { data: locations } = useQuery({
    queryKey: ['/api/locations'],
  });

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">NomadWorks</span>
            </div>
            <p className="mb-4">Connecting digital nomads with remote opportunities worldwide.</p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Browse</h3>
            <ul className="space-y-2">
              <li><Link href="/search" className="hover:text-white transition-colors">All Remote Jobs</Link></li>
              {categories?.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.slug}`} className="hover:text-white transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Locations</h3>
            <ul className="space-y-2">
              {locations?.slice(0, 6).map((location) => (
                <li key={location.id}>
                  <Link href={`/locations/${location.slug}`} className="hover:text-white transition-colors">
                    Jobs in {location.name}
                  </Link>
                </li>
              ))}
              <li><Link href="/locations" className="hover:text-white transition-colors">All Locations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/digital-nomad-guide" className="hover:text-white transition-colors">Digital Nomad Guide</Link></li>
              <li><Link href="/remote-work-tips" className="hover:text-white transition-colors">Remote Work Tips</Link></li>
              <li><Link href="/visa-information" className="hover:text-white transition-colors">Visa Information</Link></li>
              <li><Link href="/cost-of-living" className="hover:text-white transition-colors">Cost of Living Data</Link></li>
              <li><Link href="/coworking-spaces" className="hover:text-white transition-colors">Co-working Spaces</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} NomadWorks. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
