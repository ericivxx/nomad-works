import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section with Hook */}
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
                to="/jobs"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Browse Remote Jobs
              </Link>
              <Link
                to="/digital-nomad-toolkit"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors"
              >
                Get Free Toolkit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-gray-600 text-lg">Trusted by remote professionals from</p>
          </div>
          <div className="flex justify-center items-center flex-wrap gap-8 opacity-60">
            <img src="/company-logos/google.svg" alt="Google" className="h-8" />
            <img src="/company-logos/microsoft.svg" alt="Microsoft" className="h-8" />
            <img src="/company-logos/amazon.svg" alt="Amazon" className="h-8" />
            <img src="/company-logos/meta.svg" alt="Meta" className="h-8" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">Curated Remote Jobs</h3>
              <p className="text-gray-600">Hand-picked opportunities from top remote-first companies worldwide.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">Time Zone Friendly</h3>
              <p className="text-gray-600">Find jobs that match your preferred working hours and location.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">Digital Nomad Ready</h3>
              <p className="text-gray-600">All jobs support location-independent work and flexible schedules.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}