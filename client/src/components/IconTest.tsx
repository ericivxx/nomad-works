import { Laptop, Shield, Book, CreditCard, Globe, HeartPulse, File, Wifi } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/components/ui/tabs-fix.css";

// Inline SVG icons to test
const WifiIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ minWidth: '16px', display: 'inline-block' }}
    className="forced-visible"
  >
    <path d="M5 13a10 10 0 0 1 14 0" />
    <path d="M8.5 16.5a5 5 0 0 1 7 0" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <line x1="12" x2="12.01" y1="20" y2="20" />
  </svg>
);

const FileIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={{ minWidth: '16px', display: 'inline-block' }}
    className="forced-visible"
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
);

export default function IconTest() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6">Icon Test</h2>
      
      <h3 className="text-lg font-medium mb-4">Tab Test with Inline SVG</h3>
      <Tabs defaultValue="tab1" className="mb-8">
        <TabsList className="grid w-full grid-cols-3 gap-2 mb-6">
          <TabsTrigger value="tab1" className="flex items-center gap-2" style={{ display: 'flex !important' }}>
            <div style={{ display: 'inline-block', minWidth: '16px', marginRight: '4px' }}>
              <WifiIcon />
            </div>
            <span>VPN Services</span>
          </TabsTrigger>
          <TabsTrigger value="tab2" className="flex items-center gap-2" style={{ display: 'flex !important' }}>
            <div style={{ display: 'inline-block', minWidth: '16px', marginRight: '4px' }}>
              <FileIcon />
            </div>
            <span>Resume Tools</span>
          </TabsTrigger>
          <TabsTrigger value="tab3" className="flex items-center gap-2" style={{ display: 'flex !important' }}>
            <Laptop style={{ display: 'inline-block !important', minWidth: '16px' }} className="h-4 w-4" />
            <span>Productivity</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">VPN Services Content</TabsContent>
        <TabsContent value="tab2">Resume Tools Content</TabsContent>
        <TabsContent value="tab3">Productivity Content</TabsContent>
      </Tabs>
      
      <h3 className="text-lg font-medium mb-4">Default Icons (Outline)</h3>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-2 p-2 border rounded">
          <Laptop className="h-6 w-6 text-blue-500" />
          <span>Laptop</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Shield className="h-6 w-6 text-blue-500" />
          <span>Shield</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Book className="h-6 w-6 text-blue-500" />
          <span>Book</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Globe className="h-6 w-6 text-blue-500" />
          <span>Globe</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <HeartPulse className="h-6 w-6 text-blue-500" />
          <span>HeartPulse</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Wifi className="h-6 w-6 text-blue-500" />
          <span>Wifi</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <File className="h-6 w-6 text-blue-500" />
          <span>File</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <CreditCard className="h-6 w-6 text-blue-500" />
          <span>CreditCard</span>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4">Filled Icons (with fill-current)</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 p-2 border rounded">
          <Laptop className="h-6 w-6 text-blue-500 fill-current" />
          <span>Laptop</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Shield className="h-6 w-6 text-blue-500 fill-current" />
          <span>Shield</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Book className="h-6 w-6 text-blue-500 fill-current" />
          <span>Book</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Globe className="h-6 w-6 text-blue-500 fill-current" />
          <span>Globe</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <HeartPulse className="h-6 w-6 text-blue-500 fill-current" />
          <span>HeartPulse</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <Wifi className="h-6 w-6 text-blue-500 fill-current" />
          <span>Wifi</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <File className="h-6 w-6 text-blue-500 fill-current" />
          <span>File</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <CreditCard className="h-6 w-6 text-blue-500 fill-current" />
          <span>CreditCard</span>
        </div>
      </div>
    </div>
  );
}