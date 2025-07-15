'use client';

import { useEffect } from 'react';

export default function CriticalCSS() {
  useEffect(() => {
    // Preload critical fonts
    const preloadFont = (href: string, as: string = 'font') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload Montserrat font weights that are actually used
    preloadFont('https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.woff2');
    
    // Prefetch other pages
    const prefetchPages = ['/programs', '/how-to-apply', '/about'];
    prefetchPages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });

    // Remove unused CSS after load
    const removeUnusedCSS = () => {
      const stylesheets = Array.from(document.styleSheets);
      stylesheets.forEach(sheet => {
        try {
          if (sheet.href && sheet.href.includes('unused')) {
            sheet.disabled = true;
          }
        } catch {
          // Cross-origin stylesheets may throw errors
        }
      });
    };

    // Defer non-critical operations
    const timer = setTimeout(removeUnusedCSS, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return null;
}