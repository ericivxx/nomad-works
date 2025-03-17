
import { Link } from "wouter";
import { Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Join the Thousands of Digital Nomads Already Living Their Dream Life! Get Started Now!
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12">
            Browse thousands of remote opportunities and work from anywhere
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Browse Remote Jobs
            </Link>
            <Link
              href="/digital-nomad-toolkit"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl animate-pulse"
            >
              <Globe className="h-5 w-5" />
              Digital Nomad Tools
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
