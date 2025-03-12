import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolkitButton from "@/components/ToolkitButton";

interface ApplicationSuccessProps {
  jobTitle: string;
  companyName: string;
  onClose: () => void;
}

export default function ApplicationSuccess({ 
  jobTitle, 
  companyName, 
  onClose 
}: ApplicationSuccessProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
        <p className="text-gray-600">
          Your application for <span className="font-medium">{jobTitle}</span> at {companyName} has been successfully submitted.
        </p>
      </div>
      
      {/* Next Steps */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full mr-2 text-blue-600 text-xs font-bold">1</span>
            <span>The employer will review your application</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full mr-2 text-blue-600 text-xs font-bold">2</span>
            <span>You'll receive an email if they want to proceed</span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full mr-2 text-blue-600 text-xs font-bold">3</span>
            <span>Meanwhile, prepare yourself with our recommended tools</span>
          </li>
        </ul>
      </div>
      
      {/* Recommended Tools */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Essential Tools for Remote Success</h3>
          <ToolkitButton variant="compact" className="animate-pulse" />
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Equip yourself with these top tools used by successful remote workers:
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Secure Your Work</h4>
              <p className="text-xs text-blue-800 mb-1">NordVPN protects your data on public WiFi</p>
              <Link href="/digital-nomad-toolkit?tab=vpn" className="text-xs text-blue-600 hover:underline inline-flex items-center">
                <span>Learn more</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 flex items-center">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-purple-900">Health Coverage</h4>
              <p className="text-xs text-purple-800 mb-1">SafetyWing insurance for digital nomads</p>
              <Link href="/digital-nomad-toolkit?tab=insurance" className="text-xs text-purple-600 hover:underline inline-flex items-center">
                <span>Learn more</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={onClose} 
          className="flex-1"
          variant="outline"
        >
          Return to Job
        </Button>
        <Link href="/digital-nomad-toolkit" className="flex-1">
          <Button className="w-full">
            Explore Toolkit
          </Button>
        </Link>
      </div>
    </div>
  );
}