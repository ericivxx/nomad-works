import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SEOHead from "@/components/SEOHead";
import { Laptop, Shield, Book, Briefcase, CreditCard, Globe, HeartPulse, MessageSquare, FileText, Network } from "lucide-react";
import Layout from "@/components/Layout";
import BrandLogo from "@/components/BrandLogo";
import { 
  NordVPNLogo, 
  FlexJobsLogo, 
  SafetyWingLogo, 
  UdemyLogo, 
  WiseLogo, 
  LinkedInLogo, 
  ExpressVPNLogo, 
  SkillshareLogo,
  KrispLogo,
  OnePasswordLogo,
  BitwardenLogo,
  NotionLogo,
  LoomLogo,
  BackblazeLogo
} from "@/assets/logos";

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
    <>
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-2 mb-8">
              <TabsTrigger value="productivity" className="flex items-center gap-2">
                <Laptop className="h-4 w-4" />
                <span>Productivity</span>
              </TabsTrigger>
              <TabsTrigger value="vpn" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                <span>VPN Services</span>
              </TabsTrigger>
              <TabsTrigger value="esim" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>eSIM Cards</span>
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center gap-2">
                <HeartPulse className="h-4 w-4" />
                <span>Insurance</span>
              </TabsTrigger>
              <TabsTrigger value="resume" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Resume Tools</span>
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
                <p className="text-gray-700 mb-6">
                  When working remotely from public networks and unfamiliar locations, protecting your data and maintaining your privacy is essential. These tools will help you secure your digital life while traveling.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* VPN Services */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">VPN Services</h3>
                    <p className="text-gray-700">Secure your internet connection and protect your browsing activity</p>
                    
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <div className="font-bold text-xl">
                            <span className="text-blue-500">Nord</span><span className="text-blue-700">VPN</span>
                          </div>
                        </div>
                        <CardTitle>NordVPN</CardTitle>
                        <CardDescription>Industry-leading VPN service with advanced security features</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-blue-800">Best Overall VPN for Digital Nomads</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>5500+ servers in 60+ countries</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Works with streaming services worldwide</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Connect up to 6 devices simultaneously</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://nordvpn.com/', '_blank')}>
                          Get NordVPN Deal
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <div className="font-bold text-xl">
                            <span className="text-red-600">Express</span><span className="text-red-700">VPN</span>
                          </div>
                        </div>
                        <CardTitle>ExpressVPN</CardTitle>
                        <CardDescription>Premium VPN with fast speeds and excellent global coverage</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-red-800">Best for High-Speed Connections</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>3000+ servers in 94 countries</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Consistently high speeds for streaming</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Connect up to 8 devices simultaneously</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" onClick={() => window.open('https://www.expressvpn.com/', '_blank')}>
                          Try ExpressVPN Risk-Free
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Password Management */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Password Management</h3>
                    <p className="text-gray-700">Keep all your accounts secure with strong, unique passwords</p>
                    
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <BrandLogo domain="1password.com" className="h-8 w-auto" fallbackText="1Password" useColors={true} />
                        </div>
                        <CardTitle>1Password</CardTitle>
                        <CardDescription>Secure password manager with travel mode for border crossings</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-indigo-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-indigo-800">Best for Frequent Travelers</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Travel Mode hides sensitive data</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Secure document storage for passports</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Apps for all platforms including mobile</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" onClick={() => window.open('https://1password.com/', '_blank')}>
                          Get 1Password
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <BrandLogo domain="bitwarden.com" className="h-8 w-auto" fallbackText="Bitwarden" useColors={true} />
                        </div>
                        <CardTitle>Bitwarden</CardTitle>
                        <CardDescription>Open-source password manager with free tier and premium features</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-teal-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-teal-800">Best Free Password Manager</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>100% free for basic personal use</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Open-source and audited security</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Premium features for only $10/year</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" onClick={() => window.open('https://bitwarden.com/', '_blank')}>
                          Try Bitwarden Free
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Device Security and Backup */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-10">
                  {/* Device Security - Kensington */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-purple-600">Kensington</span>
                        </div>
                      </div>
                      <CardTitle>Laptop Lock</CardTitle>
                      <CardDescription>Physical security for your devices</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-purple-800">Best for Theft Prevention</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Universal design fits most laptops</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Strong steel cable construction</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Simple key lock mechanism</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Compact and lightweight for travel</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://www.kensington.com/', '_blank')}>
                        Shop Laptop Locks
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Privacy Screen */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-green-600">3M</span><span className="text-green-700"> Privacy</span>
                        </div>
                      </div>
                      <CardTitle>Privacy Screen Filter</CardTitle>
                      <CardDescription>Prevent visual hacking in public places</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-green-800">Best for Visual Privacy</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Limits 60° viewing angles</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Reduces blue light exposure</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Available for laptops and phones</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Easy attachment and removal</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" onClick={() => window.open('https://www.3m.com/3M/en_US/p/c/office-supplies/privacy-screen-filters/', '_blank')}>
                        Get Privacy Screen
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Cloud Backup */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="backblaze.com" className="h-8 w-auto" fallbackText="Backblaze" useColors={true} />
                      </div>
                      <CardTitle>Backblaze</CardTitle>
                      <CardDescription>Unlimited cloud backup for your files</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-red-800">Best Cloud Backup Solution</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Truly unlimited storage space</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Automatic background backups</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>All files and operating systems</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>External drive backup included</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" onClick={() => window.open('https://www.backblaze.com/', '_blank')}>
                        Start Protecting Your Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Additional Security Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  {/* Physical Backup */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Physical Backup</h3>
                    <p className="text-gray-700">For times when cloud access isn't available</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <div className="font-bold text-xl">
                            <span className="text-blue-600">Portable SSD</span>
                          </div>
                        </div>
                        <CardTitle>Samsung T7 Portable SSD</CardTitle>
                        <CardDescription>Fast, reliable physical backup solution</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-blue-800">Best for Offline Backups</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Ultra-compact pocket-sized design</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Transfer speeds up to 1,050 MB/s</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Shock-resistant and drop-proof</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Password protection with encryption</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://www.samsung.com/semiconductor/minisite/ssd/product/portable/', '_blank')}>
                          Shop Portable SSDs
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Tracking Devices */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Device Tracking</h3>
                    <p className="text-gray-700">Locate your valuable devices if lost or stolen</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <div className="font-bold text-xl">
                            <span className="text-amber-600">Apple</span> <span className="text-amber-700">AirTag</span>
                          </div>
                        </div>
                        <CardTitle>AirTag Tracker</CardTitle>
                        <CardDescription>Location tracking for your valuable items</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-amber-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-amber-800">Best for Apple Users</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Precision finding with iPhone</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Global Find My network</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>One-year battery life</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Water and dust resistant</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" onClick={() => window.open('https://www.apple.com/airtag/', '_blank')}>
                          Get Apple AirTag
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Security Tips Section */}
                <div className="mt-10 bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-medium text-xl mb-4">Security Tips for Digital Nomads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-amber-800 mb-2">Use Two-Factor Authentication</h5>
                      <p className="text-sm text-gray-700">
                        Enable two-factor authentication on all important accounts (email, banking, cloud storage). Use an app like Authy rather than SMS for receiving codes.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-amber-800 mb-2">Encrypt Your Hard Drive</h5>
                      <p className="text-sm text-gray-700">
                        Use full-disk encryption on all your devices. MacOS has FileVault, Windows has BitLocker, and Linux has various encryption options to protect your data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* VPN Tab */}
            <TabsContent value="vpn" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">VPN Services for Digital Nomads</h2>
                <p className="text-gray-700 mb-8">
                  A reliable VPN (Virtual Private Network) is essential for digital nomads, providing security on public WiFi, access to geo-restricted content, and privacy protection while traveling internationally.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* NordVPN */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <svg viewBox="0 0 208 39" className="h-8 w-auto text-[#4687FF]" fill="currentColor">
                          <path d="M33 0c-18.1 0-33 9-33 20s14.9 20 33 20 33-9 33-20-14.9-20-33-20zm14.1 29l-14.1-17-14 17h-8.3l18.5-21.9c1.5-1.7 3.9-2.2 6.4-2.2s4.9.5 6.4 2.2l18.4 21.9h-13.3z" />
                          <path d="M101.7 14.6h-5.6l-.1.6c-.9.1-2.6.5-3.8 1.3-1 .8-1.6 2-1.6 3.9v8.5h-5.5v-17.4h5.5v2.8c0 0 1.7-2.8 6.8-2.8h4.8l-.5 3.1zM108.1 28.9h-5.5v-23.9h5.5v9c0 0 2.8-2.8 7.5-2.8 1.3 0 2.5.2 3.6.6 1.1.4 2.1 1 2.8 1.7.8.7 1.2 1.5 1.4 2.4s.1 1.8-.4 2.6v10.4h-5.5v-8.9c0-1-.4-1.8-1.1-2.4-.7-.6-1.7-.9-2.9-.9-1.6 0-2.8.5-3.7 1.4-.9 1-1.4 2.3-1.4 4v6.8h-.3z" />
                          <path d="M168.7 11.2c-5 0-9.6 2.2-10.9 6.4h5.3c.8-1.3 2.7-2.1 5.1-2.1 3.1 0 5.4 1.3 5.4 3.5v.5h-6.7c-5.1 0-9.1 2-9.1 5.3 0 3.3 4 5.3 9.1 5.3 2.4 0 4.8-.5 7-1.5v.4h4.9v-9.6c0-5.3-4.5-8.2-10.1-8.2zm4.8 14.3c0 1.8-2.3 3.1-5.4 3.1-2.4 0-4.4-.8-4.4-2.4 0-1.6 2-2.4 4.4-2.4h5.4v1.7zM194.4 11.2c-5 0-9.6 2.2-10.9 6.4h5.3c.8-1.3 2.7-2.1 5.1-2.1 3.1 0 5.4 1.3 5.4 3.5v.5h-6.7c-5.1 0-9.1 2-9.1 5.3 0 3.3 4 5.3 9.1 5.3 2.4 0 4.8-.5 7-1.5v.4h4.9v-9.6c0-5.3-4.5-8.2-10.1-8.2zm4.8 14.3c0 1.8-2.3 3.1-5.4 3.1-2.4 0-4.4-.8-4.4-2.4 0-1.6 2-2.4 4.4-2.4h5.4v1.7zM149.3 11.2c-3.9 0-7.3 1.6-9.7 4.7 0 0-1.6-4.3-8.4-4.3h-5.5v17.4h5.5v-10.4c0 0 .2-2.1 2.2-3.1 1-1 2.3-1.2 3.4-1.2 1.1 0 2.4.2 3.4.7 2 1.1 2.3 3.2 2.3 3.2v10.9h5.5v-10.4c0 0 .2-2.1 2.2-3.1 1-1 2.3-1.2 3.4-1.2 1.1 0 2.4.2 3.4.7 2 1.1 2.3 3.2 2.3 3.2v10.9h5.5v-10.9c0-2.7-.4-4.2-2.3-5.6-1.9-1.3-4.4-1.5-6.1-1.5-1.7 0-3.4.2-4.9.7-2 .6-3.3 1.4-4.2 2.7-.6-1.8-2.6-3.5 2.2-3.5z" />
                        </svg>
                      </div>
                      <CardTitle>NordVPN</CardTitle>
                      <CardDescription>Advanced security features & global coverage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best Overall VPN for Digital Nomads</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>5500+ servers in 60+ countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Double VPN for extra security</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Works with Netflix, BBC iPlayer & more</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>6 simultaneous connections</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>30-day money-back guarantee</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => window.open('https://nordvpn.com/', '_blank')}>
                        Get NordVPN
                      </Button>
                    </CardContent>
                  </Card>

                  {/* ExpressVPN */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <svg viewBox="0 0 300 90" className="h-8 w-auto" fill="none">
                          <path d="M142.7 26h-11.1V64h11.1V26z" fill="#DA3940"/>
                          <path d="M131.6 11.7c0-3.5 2.9-6.4 6.4-6.4s6.4 2.9 6.4 6.4-2.9 6.4-6.4 6.4c-3.5.1-6.4-2.8-6.4-6.4z" fill="#DA3940"/>
                          <path d="M169.9 24.7c-10.1 0-18.3 8.2-18.3 18.3 0 10.1 8.2 18.3 18.3 18.3 10.1 0 18.3-8.2 18.3-18.3 0-10.1-8.2-18.3-18.3-18.3zm0 27.8c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5c0 5.3-4.3 9.5-9.5 9.5z" fill="#DA3940"/>
                          <path d="M259 43c0-10.1-8.2-18.3-18.3-18.3-10.1 0-18.3 8.2-18.3 18.3 0 10.1 8.2 18.3 18.3 18.3 10.1 0 18.3-8.2 18.3-18.3zm-18.3 9.5c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5c0 5.3-4.3 9.5-9.5 9.5z" fill="#DA3940"/>
                          <path d="M106.6 24.7c-10.1 0-18.3 8.2-18.3 18.3 0 10.1 8.2 18.3 18.3 18.3 10.1 0 18.3-8.2 18.3-18.3 0-10.1-8.2-18.3-18.3-18.3zm0 27.8c-5.2 0-9.5-4.3-9.5-9.5s4.3-9.5 9.5-9.5 9.5 4.3 9.5 9.5c0 5.3-4.3 9.5-9.5 9.5z" fill="#DA3940"/>
                          <path d="M52.3 24.7c-2.7 0-5.2.6-7.5 1.7V5.3h-11.1v58.6h11.1V43c0-5.2 4.3-9.5 9.5-9.5 5.2 0 9.5 4.3 9.5 9.5v21h11.1V43c0-10.1-8.2-18.3-18.3-18.3h-4.3z" fill="#DA3940"/>
                          <path d="M88.3 43V26h11.1v-8.8H88.3v-12h-11.1v12h-7.8V26h7.8v17c0 10.1 8.2 18.3 18.3 18.3h.8V52.5c-4.4 0-8.3-4.3-8.3-9.5z" fill="#DA3940"/>
                          <path d="M202.1 24.7c-2.7 0-5.2.6-7.5 1.7v-5.3h-11.1v42.9h11.1V43c0-5.2 4.3-9.5 9.5-9.5 5.2 0 9.5 4.3 9.5 9.5v21h11.1V43c0-10.1-8.2-18.3-18.3-18.3h-4.3z" fill="#DA3940"/>
                          <path d="M299.8 42.2v-21h-11.1v21c0 5.2-4.3 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5v-21h-11.1v21c0 10.1 8.2 18.3 18.3 18.3H281c10.1 0 18.8-8.2 18.8-18.3z" fill="#DA3940"/>
                        </svg>
                      </div>
                      <CardTitle>ExpressVPN</CardTitle>
                      <CardDescription>Premium speed & server availability</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-red-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-red-800">Best for Speed & Streaming</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>3000+ servers in 94 countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Consistently high speeds</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>TrustedServer technology (RAM-only)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>5 simultaneous connections</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>30-day money-back guarantee</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => window.open('https://www.expressvpn.com/', '_blank')}>
                        Try ExpressVPN
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Surfshark */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="h-10 w-auto flex items-center">
                          <svg viewBox="0 0 300 70" fill="none" className="h-8 w-auto">
                            <path d="M245.156 40.5C245.156 27.0938 235.156 16.0938 222.812 16.0938C210.469 16.0938 200.469 27.0938 200.469 40.5C200.469 53.9062 210.469 64.9062 222.812 64.9062C235.156 64.9062 245.156 53.9062 245.156 40.5ZM234.062 40.5C234.062 47.3438 229.156 52.8438 222.812 52.8438C216.469 52.8438 211.562 47.3438 211.562 40.5C211.562 33.6562 216.469 28.1562 222.812 28.1562C229.156 28.1562 234.062 33.6562 234.062 40.5Z" fill="#2AB2F2"/>
                            <path d="M194.52 63H185.521L179.334 44.2188H154.834L148.646 63H139.646L164.865 5.14062H169.474L194.52 63ZM177.599 37.3125L167.053 12.0469L156.599 37.3125H177.599Z" fill="#2AB2F2"/>
                            <path d="M126.562 40.0781C126.562 38.3594 124.922 37.0312 121.812 37.0312H103.125V28.1562H124.031C130.828 28.1562 137.156 31.125 137.156 40.0781C137.156 49.0312 130.828 51.8438 124.031 51.8438H103.125V63H92.0312V16.0938H124.031C135.797 16.0938 137.156 25.7344 137.156 28.1562V40.0781H126.562Z" fill="#2AB2F2"/>
                            <path d="M78.4246 37.2147C80.8574 33.9014 82.0739 30.1257 82.0739 25.8876C82.0739 21.6495 80.8574 17.9014 78.4246 14.5435C75.9918 11.1855 72.6794 8.72316 68.4875 6.15645C64.2956 3.59044 59.5405 1.82373 54.2222 0.856322C48.9039 -0.110923 43.8388 -0.285649 39.0269 0.33282L56.8506 62.9813H67.9434L78.4246 37.2147Z" fill="#0082F0"/>
                            <path d="M65.9155 32.4148C66.9253 30.6481 67.4301 28.7114 67.4301 26.6047C67.4301 24.498 66.9253 22.5788 65.9155 20.8472C64.9058 19.1151 63.5316 17.7584 61.7927 16.7767C60.0537 15.795 58.0797 15.0884 55.8707 14.6567C53.6618 14.225 51.5748 14.0942 49.6097 14.2641L58.885 46.0996H64.3856L65.9155 32.4148Z" fill="#2AB2F2"/>
                            <path d="M51.3897 27.7139C51.8404 26.968 52.0658 26.163 52.0658 25.2991C52.0658 24.4352 51.8404 23.6477 51.3897 22.9369C50.939 22.2261 50.3371 21.6795 49.5841 21.2973C48.8316 20.915 47.9994 20.6504 47.0884 20.5036C46.1775 20.3565 45.3132 20.3002 44.4958 20.3346L48.4845 34.1084H50.9775L51.3897 27.7139Z" fill="#0082F0"/>
                          </svg>
                        </div>
                      </div>
                      <CardTitle>Surfshark</CardTitle>
                      <CardDescription>Unlimited devices & budget-friendly</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-green-800">Best Value VPN</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>3200+ servers in 100 countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Unlimited simultaneous connections</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>CleanWeb ad & malware blocker</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>MultiHop connections</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>30-day money-back guarantee</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => window.open('https://surfshark.com/', '_blank')}>
                        Try Surfshark
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* VPN Features Comparison Table */}
                <div className="mt-10 overflow-x-auto">
                  <h3 className="text-xl font-semibold mb-4">VPN Comparison</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-medium text-gray-700">Feature</th>
                        <th className="p-3 text-left font-medium text-gray-700">NordVPN</th>
                        <th className="p-3 text-left font-medium text-gray-700">ExpressVPN</th>
                        <th className="p-3 text-left font-medium text-gray-700">Surfshark</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Monthly Price</td>
                        <td className="p-3">$11.99/mo</td>
                        <td className="p-3">$12.95/mo</td>
                        <td className="p-3">$12.95/mo</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Yearly Price</td>
                        <td className="p-3">$4.99/mo <span className="text-green-600 font-medium">Save 58%</span></td>
                        <td className="p-3">$8.32/mo <span className="text-green-600 font-medium">Save 35%</span></td>
                        <td className="p-3">$2.49/mo <span className="text-green-600 font-medium">Save 81%</span></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Server Count</td>
                        <td className="p-3">5,500+</td>
                        <td className="p-3">3,000+</td>
                        <td className="p-3">3,200+</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Countries</td>
                        <td className="p-3">60+</td>
                        <td className="p-3">94</td>
                        <td className="p-3">100</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Devices</td>
                        <td className="p-3">6</td>
                        <td className="p-3">5</td>
                        <td className="p-3">Unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Speed</td>
                        <td className="p-3">⭐⭐⭐⭐</td>
                        <td className="p-3">⭐⭐⭐⭐⭐</td>
                        <td className="p-3">⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Mobile App</td>
                        <td className="p-3">⭐⭐⭐⭐⭐</td>
                        <td className="p-3">⭐⭐⭐⭐⭐</td>
                        <td className="p-3">⭐⭐⭐⭐</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Money-back</td>
                        <td className="p-3">30 days</td>
                        <td className="p-3">30 days</td>
                        <td className="p-3">30 days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Best For</td>
                        <td className="p-3">Overall Protection</td>
                        <td className="p-3">Speed & Streaming</td>
                        <td className="p-3">Budget & Multiple Devices</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">* Prices may vary based on promotions and subscription length</p>
                </div>
                
                {/* Why Digital Nomads Need VPN section */}
                <div className="mt-10 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Why Digital Nomads Need a VPN</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Security on Public WiFi</h4>
                      <p className="text-sm text-gray-700">
                        Working from cafes, airports, and coworking spaces means you're frequently using public WiFi networks. A VPN encrypts your internet connection, protecting your sensitive data from hackers on these unsecured networks.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Access Geo-Restricted Content</h4>
                      <p className="text-sm text-gray-700">
                        Maintain access to your home country's websites, services, and streaming platforms no matter where you travel. A VPN lets you bypass geographical restrictions by making it appear you're connecting from your home country.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Banking & Financial Security</h4>
                      <p className="text-sm text-gray-700">
                        Many banks and financial institutions flag or block access when detecting logins from foreign countries. Using a VPN with a server in your home country helps maintain normal access to your financial accounts.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Avoid Censorship & Surveillance</h4>
                      <p className="text-sm text-gray-700">
                        Some countries heavily restrict internet access or monitor online activity. A VPN helps you maintain your digital freedom and privacy when traveling through regions with restrictive internet policies.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Digital Nomad VPN Use Cases */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">VPN Use Cases for Digital Nomads</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Client Work in China</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          "I was working from Shanghai and needed to access Google services for a client project. My VPN allowed me to bypass restrictions and maintain my workflow without interruption."
                        </p>
                        <p className="text-sm font-medium mt-2">- Alex, Web Developer</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Banking from Thailand</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          "My bank locked me out when I tried accessing my account from Bangkok. Setting my VPN to a server in my home country solved the issue immediately."
                        </p>
                        <p className="text-sm font-medium mt-2">- Sarah, Content Creator</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Streaming While Traveling</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          "I couldn't miss the playoff games while working abroad. My VPN let me watch all my favorite sports and shows from my streaming subscriptions no matter where I was."
                        </p>
                        <p className="text-sm font-medium mt-2">- Miguel, Software Engineer</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Insurance Tab */}
            <TabsContent value="insurance" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Insurance for Digital Nomads</h2>
                <p className="text-gray-700 mb-8">
                  As a digital nomad, having the right insurance coverage is essential for your peace of mind and safety while traveling the world. These specialized insurance options are designed specifically for location-independent workers.
                </p>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-8">
                  <p className="text-sm text-amber-800">
                    <strong>Disclosure:</strong> Some links on this page are affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you. We only recommend insurance providers we've thoroughly researched and believe will genuinely benefit digital nomads.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* SafetyWing Nomad Insurance */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="safetywing.com" className="h-8 w-auto" fallbackText="SafetyWing" useColors={true} />
                      </div>
                      <CardTitle>SafetyWing Nomad Insurance</CardTitle>
                      <CardDescription>Travel medical insurance designed for digital nomads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best Overall Travel Medical Insurance</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Coverage in 180+ countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Starting at $45.08 per 4 weeks</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>COVID-19 coverage included</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Home country coverage for visits (15-30 days)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Subscribe and cancel anytime</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://safetywing.com/nomad-insurance?referenceID=nomadworks&utm_source=nomadworks&utm_medium=Ambassador', '_blank')}>
                          Get SafetyWing Insurance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* World Nomads */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-blue-600">World</span><span className="text-gray-700">Nomads</span>
                        </div>
                      </div>
                      <CardTitle>World Nomads</CardTitle>
                      <CardDescription>Comprehensive travel insurance for adventurous nomads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for Adventure Activities & Gear</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Coverage for 200+ adventure activities</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Electronics & gear coverage</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Trip cancellation protection</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Emergency evacuation & repatriation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Can purchase while already traveling</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" onClick={() => window.open('https://www.worldnomads.com/travel-insurance/', '_blank')}>
                          Get a Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Insured Nomads */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-purple-600">Insured</span><span className="text-gray-700">Nomads</span>
                        </div>
                      </div>
                      <CardTitle>Insured Nomads</CardTitle>
                      <CardDescription>Premium global health insurance for long-term nomads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for Comprehensive Health Coverage</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Global health insurance plans</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Digital health passport app</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Access to telemedicine services</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Wellness benefits included</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Annual plans for long-term nomads</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-4">
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://insurednoamds.com/', '_blank')}>
                          Get Health Insurance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Insurance Comparison Table */}
                <div className="mt-10 overflow-x-auto">
                  <h3 className="text-xl font-semibold mb-4">Digital Nomad Insurance Comparison</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-medium text-gray-700">Feature</th>
                        <th className="p-3 text-left font-medium text-gray-700">SafetyWing</th>
                        <th className="p-3 text-left font-medium text-gray-700">World Nomads</th>
                        <th className="p-3 text-left font-medium text-gray-700">Insured Nomads</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Monthly Cost</td>
                        <td className="p-3">$45.08/month</td>
                        <td className="p-3">$120-180/month</td>
                        <td className="p-3">$150-300/month</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Coverage Type</td>
                        <td className="p-3">Travel medical</td>
                        <td className="p-3">Travel + Adventure</td>
                        <td className="p-3">Global health</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Medical Coverage</td>
                        <td className="p-3">$250,000</td>
                        <td className="p-3">$100,000</td>
                        <td className="p-3">Up to $1,000,000</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Adventure Activities</td>
                        <td className="p-3">Basic</td>
                        <td className="p-3">200+ activities</td>
                        <td className="p-3">Limited</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Electronics Coverage</td>
                        <td className="p-3">No</td>
                        <td className="p-3">Yes, up to $1,500</td>
                        <td className="p-3">Optional add-on</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">COVID-19 Coverage</td>
                        <td className="p-3">Yes</td>
                        <td className="p-3">Yes</td>
                        <td className="p-3">Yes</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Emergency Evacuation</td>
                        <td className="p-3">$100,000</td>
                        <td className="p-3">$500,000</td>
                        <td className="p-3">$1,000,000</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Home Country Coverage</td>
                        <td className="p-3">15-30 days</td>
                        <td className="p-3">None</td>
                        <td className="p-3">Yes, with limitations</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Best For</td>
                        <td className="p-3">Budget-conscious nomads</td>
                        <td className="p-3">Adventure travelers</td>
                        <td className="p-3">Long-term health needs</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">* Prices and coverage details may vary based on age, nationality, and travel destinations</p>
                </div>
                
                {/* Why Digital Nomads Need Insurance */}
                <div className="mt-10 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Why Digital Nomads Need Insurance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">International Health Coverage</h4>
                      <p className="text-sm text-gray-700">
                        Your domestic health insurance likely doesn't cover you abroad. Nomad-specific insurance provides medical coverage in countries worldwide, preventing enormous out-of-pocket expenses for emergency treatment.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Emergency Evacuation</h4>
                      <p className="text-sm text-gray-700">
                        If you're injured in a remote location or need specialized care not available locally, emergency evacuation can cost $50,000-$100,000 without insurance. Nomad policies typically include this critical benefit.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Equipment Protection</h4>
                      <p className="text-sm text-gray-700">
                        Your laptop and devices are your livelihood. Some nomad insurance plans cover theft or damage to your equipment, ensuring you can quickly replace essential work tools while traveling.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Travel Disruption</h4>
                      <p className="text-sm text-gray-700">
                        When your travel plans are disrupted by unexpected events like natural disasters, political unrest, or pandemic restrictions, insurance can cover accommodation, rebooking fees, and related expenses.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Digital Nomad Insurance Tips */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold mb-4">Insurance Tips for Digital Nomads</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Understand Coverage Limitations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Read the fine print on your policy, particularly regarding high-risk activities, pre-existing conditions, and specific country exclusions. Many policies have limitations for countries under travel advisories.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Document Everything</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Keep digital copies of your insurance policy, receipts for valuable items, and medical records. When filing claims, thorough documentation will help ensure prompt reimbursement.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Consider Specialized Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Beyond basic travel insurance, consider specialized coverage based on your activities. Remote workers handling sensitive client data might need cyber liability insurance, while adventure enthusiasts should verify coverage for high-risk activities.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Check Electronics Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600">
                          Since most digital nomads rely on laptops, cameras, and other equipment, verify the per-item coverage limits and deductibles. Standard policies often have low electronics coverage, so a separate policy for high-value items may be necessary.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                

              </div>
            </TabsContent>

            {/* eSIM Tab */}
            <TabsContent value="esim" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">eSIMs for Digital Nomads</h2>
                <p className="text-gray-700 mb-6">
                  eSIMs (embedded SIM cards) have revolutionized how digital nomads stay connected while traveling. These digital SIM cards eliminate the need to purchase physical local SIM cards in each country you visit, saving time and reducing hassle at borders.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Airalo */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-blue-500">air</span><span className="text-blue-700">alo</span>
                        </div>
                      </div>
                      <CardTitle>Airalo</CardTitle>
                      <CardDescription>Global and regional eSIMs for 200+ countries</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best Overall eSIM Provider</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Trusted by 10M+ travelers</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Regional plans covering multiple countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Global plan covering 84+ countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Data plans from 1GB to 20GB</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Plans starting at $4.50</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://www.airalo.com/?rc=NOMAD10', '_blank')}>
                        Get Airalo eSIM
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Saily */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-teal-500">Saily</span><span className="text-teal-700">eSIM</span>
                        </div>
                      </div>
                      <CardTitle>Saily</CardTitle>
                      <CardDescription>NordVPN-backed security with global coverage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-teal-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-teal-800">Best for Security-Focused Nomads</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Enhanced privacy protection</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>One eSIM for all countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Built-in network security</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Backed by trusted VPN provider</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Flexible data packages</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" onClick={() => window.open('https://saily.com/?ref=DIGITALNOMAD15', '_blank')}>
                        Get Saily eSIM
                      </Button>
                    </CardContent>
                  </Card>

                  {/* BreezeSim */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-xl">
                          <span className="text-purple-500">Breeze</span><span className="text-purple-700">Sim</span>
                        </div>
                      </div>
                      <CardTitle>BreezeSim</CardTitle>
                      <CardDescription>User-friendly eSIM with flexible options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-purple-800">Best for Easy Setup</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Simple, beginner-friendly activation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Wide global coverage</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Competitive data rates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>30-day referral tracking</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Excellent customer service</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://breezesim.com/?partner=DIGITALNOMAD', '_blank')}>
                        Get BreezeSim
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* eSIM Comparison Table */}
                <div className="mt-6 overflow-x-auto">
                  <h4 className="text-lg font-semibold mb-4">eSIM Provider Comparison</h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left font-medium text-gray-700">Feature</th>
                        <th className="p-3 text-left font-medium text-gray-700">Airalo</th>
                        <th className="p-3 text-left font-medium text-gray-700">Saily</th>
                        <th className="p-3 text-left font-medium text-gray-700">BreezeSim</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Coverage</td>
                        <td className="p-3">200+ countries</td>
                        <td className="p-3">180+ countries</td>
                        <td className="p-3">170+ countries</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Unique Selling Point</td>
                        <td className="p-3">Largest user base (10M+)</td>
                        <td className="p-3">Enhanced security</td>
                        <td className="p-3">Easy setup</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Data Limits</td>
                        <td className="p-3">1GB to 20GB plans</td>
                        <td className="p-3">Varies by country</td>
                        <td className="p-3">Flexible packages</td>
                      </tr>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <td className="p-3 font-medium">Regional Plans</td>
                        <td className="p-3">Yes</td>
                        <td className="p-3">Global focus</td>
                        <td className="p-3">Yes</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Price Range</td>
                        <td className="p-3">$4.50 - $65</td>
                        <td className="p-3">$7 - $70</td>
                        <td className="p-3">$5 - $60</td>
                      </tr>

                      <tr className="border-b border-gray-200">
                        <td className="p-3 font-medium">Best For</td>
                        <td className="p-3">Reliability & reputation</td>
                        <td className="p-3">Security-focused users</td>
                        <td className="p-3">Beginners & ease of use</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">* Prices and plans may vary. Check provider websites for the latest information.</p>
                </div>
                
                {/* eSIM Tips Section */}
                <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-medium text-xl mb-4">eSIM Tips for Digital Nomads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Check Device Compatibility</h5>
                      <p className="text-sm text-gray-700">
                        Before purchasing an eSIM, verify that your device supports eSIM technology. Most newer iPhones (XS and later), Google Pixels (3 and later), and Samsung (S20 and later) support eSIMs, but it's worth checking your specific model.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Have Backup Connectivity</h5>
                      <p className="text-sm text-gray-700">
                        Always have a backup connectivity option. Your physical SIM slot can hold a local SIM as backup, or you can have a second eSIM ready to activate if your primary one has issues or runs out of data.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Check Network Coverage</h5>
                      <p className="text-sm text-gray-700">
                        eSIM providers partner with different local carriers in each country. Before purchasing, check which local networks your eSIM will connect to and research their coverage quality in the specific regions you'll be visiting.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Monitor Data Usage</h5>
                      <p className="text-sm text-gray-700">
                        Keep track of your data usage through your device settings or provider app. Most eSIMs don't auto-renew, so you'll need to purchase a new plan when your data runs out or validity period ends.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Resume Builder Tab */}
            <TabsContent value="resume" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Resume & Profile Building Tools</h2>
                <p className="text-gray-700 mb-6">
                  As a digital nomad, having a standout resume and professional online presence is crucial for landing remote opportunities. These tools will help you create impressive resumes and build your professional brand.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-8">
                  <p className="text-sm text-amber-800">
                    <strong>Disclosure:</strong> Some links on this page are affiliate links. If you make a purchase through these links, we may earn a commission at no extra cost to you. We only recommend tools we've personally vetted and believe will genuinely help digital nomads.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* LinkedIn Premium */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <svg viewBox="0 0 24 24" className="h-8 w-auto text-blue-600" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </div>
                      <CardTitle>LinkedIn Premium</CardTitle>
                      <CardDescription>Stand out to employers & recruiters</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for Networking & Job Applications</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>See who viewed your profile</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>InMail credits to message recruiters</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Applicant insights on job postings</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Featured applicant placement</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>LinkedIn Learning courses included</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full" onClick={() => window.open('https://premium.linkedin.com/', '_blank')}>
                        Try LinkedIn Premium
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Resume.io */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-lg">
                          <span className="text-blue-500">Resume</span><span className="text-gray-800">.io</span>
                        </div>
                      </div>
                      <CardTitle>Resume.io</CardTitle>
                      <CardDescription>Professional resume builder with ATS-friendly templates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for Quick & Polished Resumes</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Professional, HR-approved templates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Simple, intuitive editor with live preview</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Built-in content suggestions & examples</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Matching cover letter templates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Download in PDF, DOCX, TXT formats</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://resume.io/?partner=nomadworks&coupon=NOMAD10', '_blank')}>
                        Get 10% Off Resume.io
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Zety */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-lg">
                          <span className="text-purple-600">Zety</span>
                        </div>
                      </div>
                      <CardTitle>Zety</CardTitle>
                      <CardDescription>All-in-one resume and career advancement platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-purple-800">Best for Complete Career Toolkit</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>AI-powered resume builder & scoring</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Content optimizer with ATS keywords</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Cover letter builder & templates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Job application tracking tools</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Career advice & interview prep</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://zety.com/?ref=nomadworks&discount=REMOTE15', '_blank')}>
                        Claim 15% Discount
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* ResumeGenius */}
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <div className="font-bold text-lg">
                          <span className="text-green-600">Resume</span><span className="text-gray-800">Genius</span>
                        </div>
                      </div>
                      <CardTitle>ResumeGenius</CardTitle>
                      <CardDescription>Easy-to-use builder with industry-specific templates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-green-800">Best for Industry-Specific Templates</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Templates optimized for specific industries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Step-by-step resume building wizard</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Industry-specific content suggestions</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Cover letter & thank you note templates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Full editing capabilities for all sections</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" onClick={() => window.open('https://resumegenius.com/?aff=nomadworks&promo=NOMAD20', '_blank')}>
                        Save 20% Today
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Comparison Table */}
                <div className="mt-10 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h3 className="px-6 py-4 text-lg font-semibold bg-gray-50 border-b border-gray-200">Resume Builder Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Resume.io</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-purple-600 uppercase tracking-wider">Zety</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-600 uppercase tracking-wider">ResumeGenius</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Starting Price</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$2.95/mo</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5.99/mo</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7.95/mo</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Free Trial</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Template Count</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">20+</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30+</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25+</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ATS Optimization</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ease of Use</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓✓</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Industry Specific</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">✓✓✓</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="mt-10 bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Resume Tips for Remote Job Seekers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Highlight Remote Work Experience</h4>
                      <p className="text-sm text-gray-700">
                        Explicitly mention any previous remote work experience, even if it was only partial. Emphasize your ability to work independently, communicate effectively across time zones, and stay productive outside a traditional office.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Showcase Digital Communication Skills</h4>
                      <p className="text-sm text-gray-700">
                        List your proficiency with remote collaboration tools like Slack, Zoom, Asana, or Trello. Remote employers want to know you can seamlessly integrate into their virtual workflows without extensive training.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Include Self-Management Achievements</h4>
                      <p className="text-sm text-gray-700">
                        Demonstrate your ability to manage your time, prioritize tasks, and meet deadlines without supervision. Use specific examples where you successfully handled projects independently or led remote initiatives.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800 mb-2">Optimize for ATS Systems</h4>
                      <p className="text-sm text-gray-700">
                        Many remote companies use Applicant Tracking Systems (ATS) to filter resumes. Ensure your resume includes relevant keywords from the job description, uses standard section headings, and avoids complex formatting that ATS might misread.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Learning & Skill Development</h2>
                <p className="text-gray-700 mb-6">
                  Investing in your skills is crucial for digital nomads to stay competitive in the remote job market and increase earning potential. These platforms make it easy to learn from anywhere in the world.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Online Course Platforms */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="udemy.com" className="h-8 w-auto" fallbackText="Udemy" useColors={true} />
                      </div>
                      <CardTitle>Udemy</CardTitle>
                      <CardDescription>Affordable courses on virtually any skill or topic</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-purple-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-purple-800">Best for Affordable Skill Development</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Over 185,000 courses across all subjects</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Regular sales with courses from $9.99</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Lifetime access to purchased courses</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Downloadable for offline learning</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://www.udemy.com/', '_blank')}>
                        Browse Udemy Courses
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="skillshare.com" className="h-8 w-auto" fallbackText="Skillshare" useColors={true} />
                      </div>
                      <CardTitle>Skillshare</CardTitle>
                      <CardDescription>Subscription-based platform with unlimited access to creative courses</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for Creative Skills</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Unlimited access to all courses with subscription</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Focus on creative and business skills</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Taught by working professionals and creators</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>High-quality project-based classes</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://www.skillshare.com/', '_blank')}>
                        Get 60% Off Skillshare
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="linkedin.com" className="h-8 w-auto" fallbackText="LinkedIn" useColors={true} />
                      </div>
                      <CardTitle>LinkedIn Learning</CardTitle>
                      <CardDescription>Professional courses with LinkedIn profile integration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-indigo-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-indigo-800">Best for Career Development</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Certificates display on your LinkedIn profile</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Business, tech, and creative courses</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Expert-led professional training</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Personalized course recommendations</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" onClick={() => window.open('https://www.linkedin.com/learning/', '_blank')}>
                        Try LinkedIn Learning
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  {/* Language Learning */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Language Learning</h3>
                    <p className="text-gray-700">Communicate better while traveling around the world</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <BrandLogo domain="duolingo.com" className="h-8 w-auto" fallbackText="Duolingo" useColors={true} />
                        </div>
                        <CardTitle>Duolingo</CardTitle>
                        <CardDescription>Free language learning app with bite-sized lessons</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-green-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-green-800">Best Free Language Learning App</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>40+ languages available completely free</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Gamified approach makes learning fun</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>5-minute daily lessons fit busy schedules</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" onClick={() => window.open('https://www.duolingo.com/', '_blank')}>
                          Start Learning Languages
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-2">
                        <div className="h-12 flex items-center justify-start mb-2">
                          <BrandLogo domain="italki.com" className="h-8 w-auto" fallbackText="iTalki" useColors={true} />
                        </div>
                        <CardTitle>iTalki</CardTitle>
                        <CardDescription>Connect with native language teachers for online lessons</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-red-50 p-3 rounded-md">
                          <p className="text-sm font-medium text-red-800">Best for Conversation Practice</p>
                        </div>
                        <div>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>One-on-one video lessons with native speakers</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Lessons start as low as $5-10 per hour</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span>Flexible scheduling that fits nomad lifestyle</span>
                            </li>
                          </ul>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" onClick={() => window.open('https://www.italki.com/', '_blank')}>
                          Find a Language Teacher
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Tech Skills */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Tech Skills</h3>
                    <p className="text-gray-700">Learn in-demand digital skills that translate globally</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">Frontend Masters</h4>
                            <p className="text-sm text-gray-600">Advanced web development training</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          In-depth courses on frontend development from industry experts. High-quality workshops on the latest technologies for modern web development.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" onClick={() => window.open('https://frontendmasters.com/', '_blank')}>
                          Join Frontend Masters
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">Codecademy</h4>
                            <p className="text-sm text-gray-600">Interactive coding lessons with instant feedback</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Learn programming languages, full-stack development, data science, and more through interactive lessons with immediate feedback. Perfect for learning technical skills on the go.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://www.codecademy.com/', '_blank')}>
                          Try Codecademy Pro
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">freeCodeCamp</h4>
                            <p className="text-sm text-gray-600">Free, comprehensive coding curriculum</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Learn web development, data science, and more with hands-on projects. Completely free, with certificates upon completion of each major section. Perfect for beginners.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" onClick={() => window.open('https://www.freecodecamp.org/', '_blank')}>
                          Start Coding for Free
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Learning Tips Section */}
                <div className="mt-10 bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-medium text-xl mb-4">Learning Tips for Digital Nomads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Download for Offline Learning</h5>
                      <p className="text-sm text-gray-700">
                        When possible, download course materials in advance for offline access during travel days or in areas with unreliable internet. Most platforms offer this feature in their mobile apps.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Time Block Your Learning</h5>
                      <p className="text-sm text-gray-700">
                        Set aside specific times in your calendar for learning, treating it like any other important appointment. Even 30 minutes daily is more effective than occasional multi-hour sessions.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Join Online Communities</h5>
                      <p className="text-sm text-gray-700">
                        Connect with other learners through platform forums, Discord groups, or Reddit communities related to what you're studying. This provides accountability and help when you get stuck.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Apply Skills to Real Projects</h5>
                      <p className="text-sm text-gray-700">
                        Reinforce your learning by applying new skills to real-world projects or freelance work. This practical application helps solidify knowledge and builds your portfolio simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Finance Tab */}
            <TabsContent value="finance" className="space-y-10">
              <div>
                <h2 className="text-2xl font-bold mb-6">Finance & Money Management</h2>
                <p className="text-gray-700 mb-6">
                  Managing finances across borders is a unique challenge for digital nomads. These tools help you handle international banking, minimize fees, track expenses, and stay compliant with tax obligations.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* International Banking */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="wise.com" className="h-8 w-auto" fallbackText="Wise" useColors={true} />
                      </div>
                      <CardTitle>Wise</CardTitle>
                      <CardDescription>Multi-currency accounts for global living</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-blue-800">Best for International Transfers</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Local bank details in 10+ currencies</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Up to 8x cheaper than traditional banks</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Receive payments like a local business</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Debit card for spending worldwide</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://wise.com/', '_blank')}>
                        Get Free Transfer Up To $500
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Digital Banking */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="revolut.com" className="h-8 w-auto" fallbackText="Revolut" useColors={true} />
                      </div>
                      <CardTitle>Revolut</CardTitle>
                      <CardDescription>All-in-one digital banking solution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-indigo-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-indigo-800">Best All-In-One Financial App</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Hold 30+ currencies in one account</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Exchange at interbank rates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Built-in budgeting and analytics</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Crypto trading and stock investing</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700" onClick={() => window.open('https://www.revolut.com/', '_blank')}>
                        Free Premium For 3 Months
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Insurance */}
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="h-12 flex items-center justify-start mb-2">
                        <BrandLogo domain="safetywing.com" className="h-8 w-auto" fallbackText="SafetyWing" useColors={true} />
                      </div>
                      <CardTitle>SafetyWing</CardTitle>
                      <CardDescription>Health insurance for digital nomads</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-md">
                        <p className="text-sm font-medium text-green-800">Best Nomad Health Insurance</p>
                      </div>
                      <div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Coverage in 175+ countries</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Monthly subscription from $42</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Cancel anytime, no commitment</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span>Hospital, emergency, COVID-19 coverage</span>
                          </li>
                        </ul>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" onClick={() => window.open('https://safetywing.com/', '_blank')}>
                        Get Nomad Insurance
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Tax & Budgeting */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  {/* Tax Management */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Tax Management</h3>
                    <p className="text-gray-700">Stay compliant with tax obligations as you work remotely</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">Taxfyle</h4>
                            <p className="text-sm text-gray-600">Expert tax help for global workers</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Connect with licensed CPAs and EAs who understand the complex tax implications of working remotely across different countries. Get personalized advice for your unique situation.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700" onClick={() => window.open('https://taxfyle.com/', '_blank')}>
                          Find a Digital Nomad Tax Pro
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">Bright!Tax</h4>
                            <p className="text-sm text-gray-600">US expat tax specialists</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          US expat tax specialists offering full-service tax preparation. Expert guidance for complicated international tax situations, foreign income exclusions, and multi-country compliance.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" onClick={() => window.open('https://brighttax.com/', '_blank')}>
                          Get a Tax Consultation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Expense Tracking */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800">Expense Tracking</h3>
                    <p className="text-gray-700">Manage your finances across currencies and countries</p>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">YNAB (You Need A Budget)</h4>
                            <p className="text-sm text-gray-600">Budgeting for variable income</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Powerful budgeting app that works well for variable income and changing expenses, common challenges for digital nomads. Manage multiple currencies and track your spending habits.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" onClick={() => window.open('https://www.youneedabudget.com/', '_blank')}>
                          Try YNAB Free
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">Expensify</h4>
                            <p className="text-sm text-gray-600">Receipt scanning and expense reports</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">
                          Track business expenses and receipts while traveling. Perfect for freelancers who need to separate personal and business expenses or remote workers who need to submit expense reports.
                        </p>
                        <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700" onClick={() => window.open('https://www.expensify.com/', '_blank')}>
                          Start Free Individual Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Finance Tips Section */}
                <div className="mt-10 bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-medium text-xl mb-4">Financial Tips for Digital Nomads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Maintain a Financial Buffer</h5>
                      <p className="text-sm text-gray-700">
                        Keep at least 3-6 months of living expenses as an emergency fund in easily accessible accounts. As a digital nomad, unexpected expenses like emergency flights or medical care can arise.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Research Tax Treaties</h5>
                      <p className="text-sm text-gray-700">
                        Understand tax treaties between your home country and countries where you spend significant time. These agreements can prevent double taxation and potentially save you thousands.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Consider Payment Timing</h5>
                      <p className="text-sm text-gray-700">
                        When exchanging currency, monitor exchange rates and time large transfers when rates are favorable. Even small rate differences can significantly impact your finances over time.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Multiple Payment Options</h5>
                      <p className="text-sm text-gray-700">
                        Always have multiple ways to access funds—different cards, payment apps, and cash. If one card gets blocked or lost, you'll still have access to your money while traveling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Recommendations Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Our Top Recommendations for Digital Nomads</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
}