'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load heavy components with loading fallbacks
export const LazySeaParticles = dynamic(() => import('./SeaParticles'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" aria-hidden="true" />
});

export const LazyFooter = dynamic(() => import('./Footer'), {
  loading: () => (
    <div className="bg-capas-ocean-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="animate-pulse">Loading footer...</div>
      </div>
    </div>
  )
});

// These would be loaded when actually needed
export const LazyBigCalendar = dynamic(
  () => Promise.resolve(() => (
    <div className="h-96 bg-capas-sand-light rounded-lg flex items-center justify-center">
      <div className="text-capas-ocean-dark">Calendar component would load here</div>
    </div>
  )),
  { ssr: false }
);

export const LazyGallery = dynamic(
  () => Promise.resolve(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-capas-sand-light animate-pulse h-64 rounded-lg" />
      ))}
    </div>
  )),
  { ssr: false }
);

// Wrapper component for heavy animations
export function AnimationWrapper({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback || <div className="opacity-50">{children}</div>}>
      {children}
    </Suspense>
  );
}

// Performance monitoring component
export function PerformanceMonitor({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                  });
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
              }
            `
          }}
        />
      )}
    </>
  );
}