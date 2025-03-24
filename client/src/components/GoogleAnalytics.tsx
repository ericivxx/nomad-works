import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Safe implementation of Google Analytics
export default function GoogleAnalytics() {
  useEffect(() => {
    // Create script elements
    const createScripts = () => {
      try {
        // First script - the gtag.js script
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-62JWYE42MV';
        
        // Second script - the inline configuration script
        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-62JWYE42MV');
        `;
        
        // Append scripts to head
        document.head.appendChild(gtagScript);
        document.head.appendChild(inlineScript);
      } catch (error) {
        console.error('Error initializing Google Analytics:', error);
      }
    };

    // Only add the scripts if they don't already exist
    if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
      createScripts();
    }

    // No cleanup needed as we want the scripts to persist
  }, []);

  return null; // This component doesn't render anything
}