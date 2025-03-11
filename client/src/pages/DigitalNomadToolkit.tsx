import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { Laptop, Shield, Book, Briefcase, CreditCard, Globe, HeartPulse, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";

export default function DigitalNomadToolkit() {
  const currentYear = new Date().getFullYear();

  // SEO structured data for this page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Digital Nomad Toolkit - Essential Resources for Remote Workers",
    "description": `The complete toolkit for digital nomads and remote workers in ${currentYear}. Essential tools, services and resources for location-independent professionals.`,
    "url": "https://nomadworks.com/digital-nomad-toolkit"
  };

  return (
    <Layout>
      <SEOHead
        title={`Digital Nomad Toolkit - Essential Resources for Remote Workers (${currentYear})`}
        description={`Discover the essential tools, apps, and services for digital nomads and remote workers in ${currentYear}. From productivity tools to travel resources, find everything you need for location-independent work.`}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Digital Nomad Toolkit</h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Essential tools and resources for remote workers and digital nomads
            </p>
            <p className="text-md text-blue-200">
              Carefully curated resources to help you succeed in remote work. We may receive a small commission if you purchase through some links at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-10">
            <p>
              Working remotely requires more than just a laptop and good internet. The right set of tools can dramatically improve your productivity, security, and overall experience as a digital nomad. We've compiled this comprehensive toolkit based on years of experience and feedback from our community of remote workers.
            </p>
          </div>

          {/* Categories Tabs */}
          <Tabs defaultValue="productivity" className="mb-12">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              <TabsTrigger value="productivity" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>Productivity</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Learning</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Finance</span>
              </TabsTrigger>
            </TabsList>

            {/* Productivity Tab */}
            <TabsContent value="productivity" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Productivity & Work Tools</h2>
                <p className="text-gray-700 mb-8">
                  These tools will help you stay productive and communicate effectively with your team no matter where you're working from.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Premium Job Boards */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Premium Job Boards</CardTitle>
                      <CardDescription>Find better remote opportunities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">FlexJobs</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Premium job board with hand-screened remote jobs across industries. Includes career coaching and resume review services.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.flexjobs.com/', '_blank')}>
                          Explore FlexJobs
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">LinkedIn Premium</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Get insights on who's viewed your profile, how you compare to other applicants, and send InMail to recruiters.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://premium.linkedin.com/', '_blank')}>
                          Try LinkedIn Premium
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Productivity Tools */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Productivity Software</CardTitle>
                      <CardDescription>Tools to maximize your efficiency</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Notion</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          All-in-one workspace for notes, tasks, wikis, and collaboration. Perfect for organizing your work and personal projects.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.notion.so/', '_blank')}>
                          Get Notion
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Krisp</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          AI-powered noise cancellation for professional video calls from cafes, coworking spaces, or anywhere with background noise.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://krisp.ai/', '_blank')}>
                          Try Krisp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Remote Team Communication */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Remote Team Communication</CardTitle>
                      <CardDescription>Stay connected with your team</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Loom</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Record and share video messages of your screen, cam, or both. Perfect for asynchronous communication across time zones.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.loom.com/', '_blank')}>
                          Try Loom
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Miro</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Online collaborative whiteboard platform for remote brainstorming, design thinking, planning, and team collaboration.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://miro.com/', '_blank')}>
                          Explore Miro
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Internet Solutions */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Internet Solutions</CardTitle>
                      <CardDescription>Never lose connection while working</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Skyroam Solis</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Global WiFi hotspot that works in 130+ countries. Get unlimited data with day passes for reliable internet anywhere.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.skyroam.com/', '_blank')}>
                          Get Skyroam
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Speedify</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Channel bonding VPN that combines multiple internet connections for better reliability and speed while traveling.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://speedify.com/', '_blank')}>
                          Try Speedify
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Security & Privacy Tools</h2>
                <p className="text-gray-700 mb-8">
                  Protect your data and stay secure when working from public networks and unfamiliar locations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* VPN Services */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>VPN Services</CardTitle>
                      <CardDescription>Secure your internet connection</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">NordVPN</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Secure VPN with a wide range of server locations. Essential for accessing geo-restricted content and securing your connection on public WiFi.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://nordvpn.com/', '_blank')}>
                          Get NordVPN
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">ExpressVPN</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Fast, reliable VPN with servers in 94 countries. Works with streaming services and has excellent mobile apps.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.expressvpn.com/', '_blank')}>
                          Try ExpressVPN
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Password Management */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Password Management</CardTitle>
                      <CardDescription>Secure all your accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">1Password</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Secure password manager that works across all your devices. Generate strong passwords and store them safely.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://1password.com/', '_blank')}>
                          Get 1Password
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Bitwarden</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Open-source password manager with free and premium tiers. Securely store passwords, credit cards, and secure notes.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://bitwarden.com/', '_blank')}>
                          Try Bitwarden
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Device Security */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Device Security</CardTitle>
                      <CardDescription>Protect your hardware</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Kensington Laptop Lock</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Physical security lock for your laptop when working in public spaces. A simple but effective deterrent against theft.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.kensington.com/', '_blank')}>
                          Shop Laptop Locks
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Privacy Screen Filter</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Prevent visual hacking with a privacy screen that limits viewing angles. Essential for working in public places.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.3m.com/3M/en_US/p/c/office-supplies/privacy-screen-filters/', '_blank')}>
                          Get Privacy Screen
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Backup Solutions */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Backup Solutions</CardTitle>
                      <CardDescription>Never lose important files</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Backblaze</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Unlimited cloud backup for your computer. Essential for digital nomads who might face device loss or damage while traveling.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.backblaze.com/', '_blank')}>
                          Try Backblaze
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Portable SSD</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Physical backup for your most important files when cloud access isn't available. Compact and durable for travel.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.samsung.com/semiconductor/minisite/ssd/product/portable/', '_blank')}>
                          Shop Portable SSDs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Learning Tab */}
            <TabsContent value="learning" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Learning & Skill Development</h2>
                <p className="text-gray-700 mb-8">
                  Invest in your skills to stay competitive in the remote job market and increase your earning potential.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Online Course Platforms */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Online Course Platforms</CardTitle>
                      <CardDescription>Learn new skills to advance your career</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Udemy</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Affordable courses on virtually any skill needed for remote work. Regular sales make this an economical choice for learning.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.udemy.com/', '_blank')}>
                          Browse Udemy Courses
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Coursera</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          University-level courses and professional certificates from top institutions. Gain credentials recognized by employers.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.coursera.org/', '_blank')}>
                          Explore Coursera
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Creative Skill Learning */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Creative Skills</CardTitle>
                      <CardDescription>Develop your creative abilities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Skillshare</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Subscription-based platform focused on creative skills. Learn design, photography, writing, and more from professionals.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.skillshare.com/', '_blank')}>
                          Try Skillshare
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Domestika</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          High-quality courses in creative and digital skills. Beautifully produced lessons from top creative professionals.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.domestika.org/', '_blank')}>
                          Explore Domestika
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Technical Skills */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Technical Skills</CardTitle>
                      <CardDescription>Learn programming and tech skills</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Frontend Masters</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          In-depth courses on frontend development. Learn from industry experts and stay current with the latest technologies.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://frontendmasters.com/', '_blank')}>
                          Join Frontend Masters
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Codecademy</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Interactive coding lessons with hands-on practice. Great for beginners looking to learn programming languages.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.codecademy.com/', '_blank')}>
                          Try Codecademy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Language Learning */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Language Learning</CardTitle>
                      <CardDescription>Expand your global opportunities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Duolingo</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Free language learning app with gamification. Learn basics of multiple languages with just a few minutes daily.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.duolingo.com/', '_blank')}>
                          Start Duolingo
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">iTalki</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Connect with native language tutors for personalized 1-on-1 lessons. Perfect for serious language learners.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.italki.com/', '_blank')}>
                          Find a Tutor
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Finance Tab */}
            <TabsContent value="finance" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Finance & Insurance</h2>
                <p className="text-gray-700 mb-8">
                  Manage your money effectively while traveling and working across borders with these financial tools.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banking */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>International Banking</CardTitle>
                      <CardDescription>Manage money across borders</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Wise (formerly TransferWise)</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Multi-currency account with local bank details in multiple countries. Send and receive international payments at low rates.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://wise.com/', '_blank')}>
                          Open Wise Account
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Revolut</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Digital banking alternative with multi-currency accounts, currency exchange at interbank rates, and budgeting tools.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.revolut.com/', '_blank')}>
                          Try Revolut
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Credit Cards */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Travel-Friendly Cards</CardTitle>
                      <CardDescription>Avoid fees when spending abroad</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Travel Credit Cards</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Credit cards with no foreign transaction fees and travel rewards. Essential for digital nomads who frequently cross borders.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.nerdwallet.com/best/credit-cards/travel', '_blank')}>
                          Compare Travel Cards
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Charles Schwab Debit Card</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Reimburses all ATM fees worldwide with no foreign transaction fees. Perfect for accessing cash while traveling.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.schwab.com/checking', '_blank')}>
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insurance */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Travel & Health Insurance</CardTitle>
                      <CardDescription>Stay protected while abroad</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">SafetyWing Insurance</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Health insurance designed specifically for digital nomads and remote workers. Monthly subscription model with worldwide coverage.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://safetywing.com/', '_blank')}>
                          Get Nomad Insurance
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">World Nomads</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Travel insurance covering 200+ activities and gear like laptops and cameras. Flexible plans that can be purchased while already traveling.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.worldnomads.com/', '_blank')}>
                          Get World Nomads
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Services */}
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Expat Tax Services</CardTitle>
                      <CardDescription>Navigate complex tax situations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">TaxAct Expat Edition</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Tax preparation software specifically designed for US expats. Helps claim Foreign Earned Income Exclusion and other expat benefits.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://www.taxact.com/', '_blank')}>
                          Explore TaxAct
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Bright!Tax</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          US expat tax specialists offering full-service tax preparation. Expert guidance for complicated international tax situations.
                        </p>
                        <Button size="sm" variant="outline" className="w-full" onClick={() => window.open('https://brighttax.com/', '_blank')}>
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Recommendations Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Top Recommendations for Digital Nomads</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span>Must-Have</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full mr-2 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">NordVPN</p>
                        <p className="text-sm text-gray-600">Secure your connection on public WiFi</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full mr-2 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Wise Account</p>
                        <p className="text-sm text-gray-600">Multi-currency banking with low fees</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full mr-2 mt-0.5">
                        <span className="text-blue-600 text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">SafetyWing Insurance</p>
                        <p className="text-sm text-gray-600">Health coverage designed for nomads</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Laptop className="h-5 w-5 text-green-600" />
                    <span>Productivity Boosters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-100 rounded-full mr-2 mt-0.5">
                        <span className="text-green-600 text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Notion</p>
                        <p className="text-sm text-gray-600">All-in-one workspace for notes and tasks</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-100 rounded-full mr-2 mt-0.5">
                        <span className="text-green-600 text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Krisp</p>
                        <p className="text-sm text-gray-600">Noise cancellation for professional calls</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-green-100 rounded-full mr-2 mt-0.5">
                        <span className="text-green-600 text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Skyroam Solis</p>
                        <p className="text-sm text-gray-600">Global WiFi hotspot for reliable internet</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-purple-600" />
                    <span>Skill Builders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full mr-2 mt-0.5">
                        <span className="text-purple-600 text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Udemy Courses</p>
                        <p className="text-sm text-gray-600">Affordable skills training on demand</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full mr-2 mt-0.5">
                        <span className="text-purple-600 text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Skillshare</p>
                        <p className="text-sm text-gray-600">Creative and practical skills development</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-purple-100 rounded-full mr-2 mt-0.5">
                        <span className="text-purple-600 text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">iTalki</p>
                        <p className="text-sm text-gray-600">Learn languages from native speakers</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What are the essential tools every digital nomad needs?</AccordionTrigger>
                <AccordionContent>
                  At minimum, every digital nomad should have a reliable laptop, a VPN service for security, a portable WiFi device or local SIM card solution, cloud storage for backups, and international health insurance. Additionally, tools for productivity (like Notion) and communication (like Slack or Zoom) are crucial depending on your work.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I handle taxes as a digital nomad?</AccordionTrigger>
                <AccordionContent>
                  Tax requirements vary significantly based on your citizenship, residency status, and the countries you work from. Many digital nomads benefit from consulting with tax professionals who specialize in expat and international taxation. Services like TaxAct Expat Edition and Bright!Tax can help navigate complex international tax situations.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>What's the best banking setup for frequent international travel?</AccordionTrigger>
                <AccordionContent>
                  A combination of services typically works best: 1) A Wise multi-currency account for receiving payments in different currencies, 2) A travel credit card with no foreign transaction fees for daily spending, and 3) A Charles Schwab or similar checking account that reimburses ATM fees worldwide. This setup minimizes fees and gives you flexibility.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How can I ensure reliable internet connection while traveling?</AccordionTrigger>
                <AccordionContent>
                  Use a combination of solutions: research accommodation with verified fast internet before booking, carry a portable WiFi hotspot like Skyroam Solis for backup, get local SIM cards for data, know nearby coworking spaces or cafes with good WiFi, and use apps like Speedify that can bond multiple connections for greater reliability.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>What insurance do I need as a digital nomad?</AccordionTrigger>
                <AccordionContent>
                  At minimum, you need health insurance with international coverage. SafetyWing and World Nomads are popular options designed for digital nomads. Additionally, consider travel insurance that covers your electronics and gear, trip cancellations, and emergency evacuations. If you have valuable equipment, specific gear insurance might be worthwhile.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-8">
            <p>
              <strong>Disclosure:</strong> Some of the links on this page are affiliate links. This means if you click on the link and purchase the item, we may receive an affiliate commission at no extra cost to you. We only recommend products and services we personally believe will add value to our readers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}