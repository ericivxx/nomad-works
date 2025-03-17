
import { Link } from "wouter";

export default function HeroSection() {
  const hookText = "Join the Thousands of Digital Nomads Already Living Their Dream Life—Get Started Now!";
  
  return (
    <section className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {hookText}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-12">
            Join thousands of digital nomads who found their dream remote jobs through NomadWorks
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
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors border border-blue-400"
            >
              Get Free Toolkit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
