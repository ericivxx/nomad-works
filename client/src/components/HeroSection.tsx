
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Remote Jobs That Let You
            <span className="block text-blue-200">Work From Anywhere</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
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
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors"
            >
              Get Free Toolkit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
