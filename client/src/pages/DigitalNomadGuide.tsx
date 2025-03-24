import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, ThumbsUp, Zap, MapPin, Compass, Globe, CreditCard, CheckCircle2 } from "lucide-react";
import SEOHead from '@/components/SEOHead';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

export default function DigitalNomadGuide() {
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success message
      toast({
        title: "Purchase successful!",
        description: "Check your email for download instructions.",
        variant: "default",
      });
      
      // Reset form
      setEmail('');
    } catch (error) {
      toast({
        title: "Purchase failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    { 
      icon: <Globe className="w-5 h-5 text-purple-500" />, 
      title: "Remote Work Blueprint", 
      description: "Step-by-step guide to finding and securing remote jobs worldwide" 
    },
    { 
      icon: <MapPin className="w-5 h-5 text-purple-500" />, 
      title: "Top 20 Digital Nomad Destinations", 
      description: "Detailed profiles of nomad-friendly cities with cost breakdowns" 
    },
    { 
      icon: <Compass className="w-5 h-5 text-purple-500" />, 
      title: "Productivity Systems", 
      description: "Proven workflows to maintain high output while traveling" 
    },
    { 
      icon: <Zap className="w-5 h-5 text-purple-500" />, 
      title: "Tax & Legal Guide", 
      description: "Navigate international tax considerations and visa requirements" 
    },
    { 
      icon: <FileText className="w-5 h-5 text-purple-500" />, 
      title: "Remote Job Application Templates", 
      description: "Ready-to-use resume and cover letter templates optimized for remote roles" 
    }
  ];
  
  const testimonials = [
    {
      name: "Sarah J.",
      job: "UX Designer",
      text: "This guide helped me land my first remote job within 2 weeks. I'm now working from Bali!"
    },
    {
      name: "Michael T.",
      job: "Software Developer",
      text: "The tax section alone saved me thousands of dollars. Incredibly detailed and practical."
    },
    {
      name: "Leila M.",
      job: "Content Strategist",
      text: "I was overwhelmed by all the digital nomad info online, but this guide organized everything perfectly."
    }
  ];

  return (
    <>
      <SEOHead
        title="The Ultimate Digital Nomad Guide 2025 | NomadWorks"
        description="Get our comprehensive 120-page digital nomad guide with actionable strategies, destination profiles, and remote work resources to kickstart your location-independent lifestyle."
      />
      
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          <div className="lg:w-1/2">
            <div className="flex items-center mb-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-semibold">
                2025 EDITION
              </Badge>
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200 font-semibold">
                120 PAGES
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              The Ultimate Digital Nomad Guide
            </h1>
            
            <p className="text-xl text-gray-700 mb-6">
              Everything you need to know to build your location-independent lifestyle, 
              find remote jobs, and thrive as a digital nomad in 2025.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                'Remote Job Strategies', 
                'Tax Planning', 
                'Best Destinations', 
                'Legal Considerations', 
                'Productivity Systems'
              ].map((tag, index) => (
                <div key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-1 text-purple-500" />
                  {tag}
                </div>
              ))}
            </div>
            
            <div className="flex items-center text-gray-700 mb-8">
              <ThumbsUp className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-medium">800+ successful nomads started with this guide</span>
            </div>
            
            <div className="hidden lg:block">
              <Button 
                size="lg" 
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 rounded-lg"
                onClick={() => document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get the guide for $12.99
              </Button>
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm">
            <div className="aspect-w-1 aspect-h-1.3 rounded-lg overflow-hidden shadow-lg bg-white border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Digital Nomad Guide Cover Preview" 
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white font-bold text-xl">The Ultimate Digital Nomad Guide</h3>
                <p className="text-white/90 text-sm">2025 Edition • PDF Format</p>
              </div>
            </div>
          </div>
          
          {/* Mobile CTA button */}
          <div className="lg:hidden w-full">
            <Button 
              size="lg" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 rounded-lg"
              onClick={() => document.getElementById('purchase-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get the guide for $12.99
            </Button>
          </div>
        </div>
        
        {/* What's Inside Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Inside The Guide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive 120-page handbook packed with actionable strategies and insider knowledge
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-purple-100 hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {benefit.icon}
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            What Nomads Are Saying
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardHeader>
                <CardFooter className="pt-0">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.job}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Purchase Section */}
        <div id="purchase-section" className="scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Copy Today</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Instant download after purchase. PDF format compatible with all devices.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-2/3 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">The Ultimate Digital Nomad Guide</h3>
              
              <div className="flex items-center mb-6">
                <div className="text-3xl font-bold text-gray-900">$12.99</div>
                <div className="ml-2 line-through text-gray-500">$29.99</div>
                <Badge className="ml-3 bg-green-100 text-green-800 border-none">56% OFF</Badge>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Comprehensive 120-page digital guide (PDF format)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">20 downloadable templates for remote job applications</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Digital nomad expense tracker spreadsheet</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Access to future updates for 1 year</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">30-day money-back guarantee</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email address for delivery</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Payment method</Label>
                    <div className="grid grid-cols-2 gap-4 mt-1">
                      <Button 
                        type="button"
                        variant={paymentMethod === 'card' ? 'default' : 'outline'} 
                        className={paymentMethod === 'card' ? 'bg-purple-50 text-purple-800 border-purple-200' : ''}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Credit Card
                      </Button>
                      <Button
                        type="button"
                        variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                        className={paymentMethod === 'paypal' ? 'bg-purple-50 text-purple-800 border-purple-200' : ''}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.146-.048.295-.077.448-.7 3.74-2.94 5.055-6.166 5.055h-4.7c-.83 0-1.366.657-1.5 1.478L7.076 21.337z" fill="#253B80"></path>
                          <path d="M9.003 5.333a.779.779 0 0 0-.792.91l1.123 7.126a.549.549 0 0 0 .544.47h4.324c3.986 0 6.3-2.335 6.896-6.254.317-2.076-.109-3.2-1.145-4.026-1.081-.86-2.85-1.221-5.392-1.221h-7.04c-.537 0-.979.378-1.06.91L5.529 8.97l-.3.025c.3-.15.66-.247 1.059-.247h2.445z" fill="#179BD7"></path>
                        </svg>
                        PayPal
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full text-base bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 h-auto"
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Purchase Now — $12.99"}
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500">
                    Secure payment · Instant delivery · 30-day money back guarantee
                  </p>
                </div>
              </form>
            </div>
            
            <div className="lg:w-1/3 bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900">What format is the guide?</h4>
                  <p className="text-gray-600 mt-1">The guide comes as a downloadable PDF that can be viewed on any device.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">How will I receive my purchase?</h4>
                  <p className="text-gray-600 mt-1">Immediately after purchase, you'll receive an email with download instructions.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Do you offer refunds?</h4>
                  <p className="text-gray-600 mt-1">Yes, we offer a 30-day money-back guarantee if you're not satisfied.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Is this a physical book?</h4>
                  <p className="text-gray-600 mt-1">No, this is a digital product only. No physical items will be shipped.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Will I get future updates?</h4>
                  <p className="text-gray-600 mt-1">Yes, you'll have access to updates for one full year after purchase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}