'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number | null; // Cumulative Layout Shift
  ttfb: number | null; // Time to First Byte
}

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  enableConsoleLogging?: boolean;
}

export default function PerformanceMonitor({ 
  onMetricsUpdate, 
  enableConsoleLogging = false 
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMetrics = (newMetrics: Partial<PerformanceMetrics>) => {
      setMetrics(prev => {
        const updated = { ...prev, ...newMetrics };
        if (onMetricsUpdate) {
          onMetricsUpdate(updated);
        }
        if (enableConsoleLogging) {
          console.group('🚀 CAPAS Performance Metrics');
          Object.entries(updated).forEach(([key, value]) => {
            if (value !== null) {
              const formatted = typeof value === 'number' ? value.toFixed(2) : value;
              const unit = key === 'cls' ? '' : 'ms';
              console.log(`${key.toUpperCase()}: ${formatted}${unit}`);
            }
          });
          console.groupEnd();
        }
        return updated;
      });
    };

    // Web Vitals observer
    const observeWebVitals = () => {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            updateMetrics({ fcp: entry.startTime });
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        updateMetrics({ lcp: lastEntry.startTime });
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          updateMetrics({ fid: (entry as any).processingStart - entry.startTime });
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            updateMetrics({ cls: clsValue });
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Time to First Byte
    const measureTTFB = () => {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navigationEntries.length > 0) {
        const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart;
        updateMetrics({ ttfb });
      }
    };

    // Start monitoring
    measureTTFB();
    observeWebVitals();

    // Additional performance optimizations
    const optimizePerformance = () => {
      // Preload critical resources
      const preloadLinks = [
        { href: '/fonts/montserrat-400.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { href: '/fonts/montserrat-600.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { href: '/fonts/montserrat-700.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' }
      ];

      preloadLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'preload';
        linkElement.href = link.href;
        linkElement.as = link.as;
        if (link.type) linkElement.type = link.type;
        if (link.crossorigin) linkElement.crossOrigin = link.crossorigin;
        document.head.appendChild(linkElement);
      });

      // Critical resource hints
      const resourceHints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
      ];

      resourceHints.forEach(hint => {
        const linkElement = document.createElement('link');
        linkElement.rel = hint.rel;
        linkElement.href = hint.href;
        if (hint.crossorigin) linkElement.crossOrigin = hint.crossorigin;
        document.head.appendChild(linkElement);
      });
    };

    // Run optimizations after component mounts
    setTimeout(optimizePerformance, 100);

    // Performance budget warnings
    const performanceBudget = {
      fcp: 1800, // 1.8s
      lcp: 2500, // 2.5s
      fid: 100,  // 100ms
      cls: 0.1,  // 0.1
      ttfb: 600  // 600ms
    };

    const checkPerformanceBudget = () => {
      Object.entries(metrics).forEach(([metric, value]) => {
        if (value !== null && performanceBudget[metric as keyof typeof performanceBudget]) {
          const budget = performanceBudget[metric as keyof typeof performanceBudget];
          if (value > budget) {
            console.warn(`⚠️ Performance Budget Exceeded: ${metric.toUpperCase()} is ${value.toFixed(2)}${metric === 'cls' ? '' : 'ms'}, budget is ${budget}${metric === 'cls' ? '' : 'ms'}`);
          }
        }
      });
    };

    const budgetCheckInterval = setInterval(checkPerformanceBudget, 5000);

    return () => {
      clearInterval(budgetCheckInterval);
    };
  }, [onMetricsUpdate, enableConsoleLogging]);

  // Development-only performance display
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm">
      <div className="font-bold mb-2">Performance Metrics</div>
      <div className="space-y-1">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex justify-between space-x-3">
            <span className="uppercase">{key}:</span>
            <span className={`${
              value === null ? 'text-gray-400' : 
              key === 'fcp' && value < 1800 ? 'text-green-400' :
              key === 'lcp' && value < 2500 ? 'text-green-400' :
              key === 'fid' && value < 100 ? 'text-green-400' :
              key === 'cls' && value < 0.1 ? 'text-green-400' :
              key === 'ttfb' && value < 600 ? 'text-green-400' :
              'text-red-400'
            }`}>
              {value === null ? 'N/A' : `${value.toFixed(2)}${key === 'cls' ? '' : 'ms'}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}