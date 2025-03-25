import React, { useEffect, useRef } from 'react';

interface GoogleAdUnitProps {
  className?: string;
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidth?: boolean;
}

/**
 * A reusable Google AdSense ad unit component
 * 
 * @param className Optional CSS class name for styling the container
 * @param adSlot Optional ad slot ID from Google AdSense
 * @param adFormat The format of the ad unit ('auto', 'rectangle', 'horizontal', 'vertical')
 * @param fullWidth Whether the ad should take up the full width of its container
 */
export default function GoogleAdUnit({ 
  className = '',
  adSlot = '',
  adFormat = 'auto',
  fullWidth = true
}: GoogleAdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Skip if window.adsbygoogle is not available
    if (typeof window === 'undefined' || !window.adsbygoogle) return;
    
    try {
      // Push the ad to Google AdSense for rendering
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading Google AdSense ad:', error);
    }
  }, []);

  // Map ad format to the appropriate AdSense data-ad-format
  const getAdFormat = () => {
    switch (adFormat) {
      case 'rectangle': return 'rectangle';
      case 'horizontal': return 'horizontal';
      case 'vertical': return 'vertical';
      case 'auto':
      default: return 'auto';
    }
  };

  return (
    <div className={`google-ad-unit ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-client="ca-pub-8166100374404073"
        data-ad-slot={adSlot || null}
        data-ad-format={getAdFormat()}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  );
}

// Add this to global.d.ts or include it here
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}