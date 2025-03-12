import { Laptop, Shield, Book, CreditCard, Globe, HeartPulse, FileText, Network } from "lucide-react";

export default function IconTest() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Icon Test</h2>
      <div className="flex flex-wrap gap-4">
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
          <Network className="h-6 w-6 text-blue-500" />
          <span>Network</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <FileText className="h-6 w-6 text-blue-500" />
          <span>FileText</span>
        </div>
        <div className="flex items-center gap-2 p-2 border rounded">
          <CreditCard className="h-6 w-6 text-blue-500" />
          <span>CreditCard</span>
        </div>
      </div>
    </div>
  );
}