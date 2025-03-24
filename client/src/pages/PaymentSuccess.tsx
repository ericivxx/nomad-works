import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { apiRequest } from '@/lib/queryClient';

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    async function fetchSessionDetails() {
      try {
        // Get the session ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('session_id');

        if (!sessionId) {
          setError('No session ID found in URL');
          setLoading(false);
          return;
        }

        // Fetch the session details from our API
        const response = await apiRequest(`/api/checkout/session/${sessionId}`);
        
        if (response.success) {
          setSession(response.session);
        } else {
          throw new Error('Failed to retrieve session details');
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to verify payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    }

    fetchSessionDetails();
  }, []);

  const handleDownload = () => {
    // In a real application, this would generate a unique download link or redirect to a secure download page
    // For demonstration purposes, we'll just show an alert
    alert('Your guide would be downloading now. In a real application, this would either email the guide or provide a secure download link.');
  };

  return (
    <>
      <SEOHead
        title="Payment Successful | Digital Nomad Guide Purchase Complete | NomadWorks"
        description="Thank you for purchasing The Ultimate Digital Nomad Guide. Your payment has been processed successfully. Your guide is now ready for download."
        type="website"
        canonicalUrl={`${window.location.origin}/payment-success`}
        keywords="digital nomad guide, purchase success, payment confirmation, nomad guide download, remote work resources"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Payment Success - Digital Nomad Guide",
          "description": "Thank you for purchasing The Ultimate Digital Nomad Guide. Your payment has been processed successfully.",
          "publisher": {
            "@type": "Organization",
            "name": "NomadWorks",
            "logo": {
              "@type": "ImageObject",
              "url": `${window.location.origin}/logo.png`
            }
          }
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <h2 className="text-2xl font-semibold text-gray-900">Verifying your payment...</h2>
              <p className="mt-2 text-gray-600">Please wait while we confirm your purchase.</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Payment Verification Failed</h2>
              <p className="mt-2 text-gray-600">{error}</p>
              <Button
                className="mt-6 bg-purple-600 hover:bg-purple-700"
                onClick={() => setLocation('/nomad-guide')}
              >
                Return to Guide Page
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Thank You For Your Purchase!</h1>
              <p className="mt-4 text-xl text-gray-600">
                Your payment has been processed successfully.
              </p>
              
              <Card className="mt-10 p-8 bg-gradient-to-br from-purple-50 to-white border border-purple-100">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    The Ultimate Digital Nomad Guide
                  </h2>
                  
                  <div className="mb-6">
                    <p className="text-gray-700">
                      {session?.customer_details?.email && (
                        <span>
                          We've sent a confirmation email to <strong>{session.customer_details.email}</strong> with your download link.
                        </span>
                      )}
                    </p>
                    <p className="text-gray-700 mt-2">
                      You can also download your guide directly from this page using the button below.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 h-auto text-lg"
                      onClick={handleDownload}
                    >
                      Download Your Guide
                    </Button>
                    <Button
                      variant="outline"
                      className="text-purple-600 border-purple-200 hover:bg-purple-50 px-8 py-6 h-auto text-lg"
                      onClick={() => setLocation('/')}
                    >
                      Return to Homepage
                    </Button>
                  </div>
                </div>
              </Card>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">What's Next?</h3>
                <p className="text-gray-700">
                  After downloading your guide, be sure to check out our <a href="/blog" className="text-purple-600 underline">Nomad Blog</a> for additional resources 
                  and join our community to connect with other digital nomads.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}