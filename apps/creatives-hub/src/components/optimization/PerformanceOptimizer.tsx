'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Performance monitoring context
interface PerformanceContextType {
  isLowPerformance: boolean;
  isMobile: boolean;
  reducedMotion: boolean;
  enable3D: boolean;
  frameRate: number;
  memoryUsage: number;
  togglePerformanceMode: () => void;
  setReduce3D: (reduce: boolean) => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// Performance monitoring hook
const usePerformanceMonitoring = () => {
  const [frameRate, setFrameRate] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setFrameRate(fps);
        
        // Consider performance low if FPS drops below 30
        setIsLowPerformance(fps < 30);
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFrameRate);
    };

    // Start monitoring
    animationId = requestAnimationFrame(measureFrameRate);

    // Memory monitoring (if available)
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1048576);
        setMemoryUsage(usedMB);
      }
    };

    const memoryInterval = setInterval(measureMemory, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, []);

  return { frameRate, memoryUsage, isLowPerformance };
};

// Device detection hook
const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet'];
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
                            window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Reduced motion preference
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setReducedMotion(prefersReducedMotion);
    };

    checkMobile();
    checkReducedMotion();

    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    
    // Listen for motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  return { isMobile, reducedMotion };
};

// Performance Provider Component
export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const { frameRate, memoryUsage, isLowPerformance } = usePerformanceMonitoring();
  const { isMobile, reducedMotion } = useDeviceDetection();
  const [enable3D, setEnable3D] = useState(true);
  const [userOptimizedMode, setUserOptimizedMode] = useState(false);

  // Auto-disable 3D on low performance devices
  useEffect(() => {
    if (isLowPerformance || (isMobile && memoryUsage > 100)) {
      setEnable3D(false);
    }
  }, [isLowPerformance, isMobile, memoryUsage]);

  const togglePerformanceMode = () => {
    setUserOptimizedMode(!userOptimizedMode);
    setEnable3D(!userOptimizedMode);
  };

  const setReduce3D = (reduce: boolean) => {
    setEnable3D(!reduce);
  };

  const value: PerformanceContextType = {
    isLowPerformance: isLowPerformance || userOptimizedMode,
    isMobile,
    reducedMotion,
    enable3D: enable3D && !userOptimizedMode,
    frameRate,
    memoryUsage,
    togglePerformanceMode,
    setReduce3D
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Adaptive 3D Component
export const Adaptive3D = ({ 
  children, 
  fallback, 
  minFrameRate = 30,
  maxMemory = 150 
}: {
  children: ReactNode;
  fallback: ReactNode;
  minFrameRate?: number;
  maxMemory?: number;
}) => {
  const { enable3D, frameRate, memoryUsage, isMobile } = usePerformance();
  
  const shouldShowFallback = !enable3D || 
                           frameRate < minFrameRate || 
                           memoryUsage > maxMemory || 
                           (isMobile && memoryUsage > 80);

  return shouldShowFallback ? <>{fallback}</> : <>{children}</>;
};

// Performance Monitor Component
export const PerformanceMonitor = ({ 
  showDetails = false 
}: { 
  showDetails?: boolean 
}) => {
  const { 
    frameRate, 
    memoryUsage, 
    isLowPerformance, 
    isMobile, 
    enable3D,
    togglePerformanceMode 
  } = usePerformance();
  
  const [showMonitor, setShowMonitor] = useState(false);

  if (!showDetails && !isLowPerformance) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {(showDetails || isLowPerformance) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-capas-ocean-light/30"
          >
            {/* Performance Warning */}
            {isLowPerformance && (
              <div className="p-4 border-b border-capas-ocean-light/30">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-capas-coral rounded-full animate-pulse"></div>
                  <div>
                    <div className="text-sm font-medium text-capas-ocean-dark">
                      Performance Mode Enabled
                    </div>
                    <div className="text-xs text-capas-ocean-dark/70">
                      3D effects reduced for better performance
                    </div>
                  </div>
                </div>
                <button
                  onClick={togglePerformanceMode}
                  className="mt-2 text-xs text-capas-turquoise hover:text-capas-turquoise-dark"
                >
                  Toggle Performance Mode
                </button>
              </div>
            )}

            {/* Performance Details */}
            {showDetails && (
              <div className="p-4">
                <h4 className="font-semibold text-capas-ocean-dark mb-3 text-sm">
                  Performance Monitor
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-capas-ocean-dark/70">Frame Rate:</span>
                    <span className={`font-medium ${frameRate < 30 ? 'text-capas-coral' : 'text-capas-turquoise'}`}>
                      {frameRate} FPS
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-capas-ocean-dark/70">Memory:</span>
                    <span className={`font-medium ${memoryUsage > 100 ? 'text-capas-coral' : 'text-capas-turquoise'}`}>
                      {memoryUsage} MB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-capas-ocean-dark/70">Device:</span>
                    <span className="font-medium text-capas-ocean-dark">
                      {isMobile ? 'Mobile' : 'Desktop'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-capas-ocean-dark/70">3D Enabled:</span>
                    <span className={`font-medium ${enable3D ? 'text-capas-turquoise' : 'text-capas-coral'}`}>
                      {enable3D ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!showDetails && (
        <button
          onClick={() => setShowMonitor(!showMonitor)}
          className="w-10 h-10 bg-capas-turquoise text-white rounded-full flex items-center justify-center shadow-lg hover:bg-capas-turquoise-dark transition-colors"
        >
          📊
        </button>
      )}
    </div>
  );
};

// Optimized Animation Component
export const OptimizedMotion = ({ 
  children, 
  fallback,
  ...motionProps 
}: {
  children: ReactNode;
  fallback?: ReactNode;
  [key: string]: any;
}) => {
  const { reducedMotion, isLowPerformance } = usePerformance();

  if (reducedMotion || isLowPerformance) {
    return fallback ? <>{fallback}</> : <div>{children}</div>;
  }

  return <motion.div {...motionProps}>{children}</motion.div>;
};

// Lazy 3D Loader
export const Lazy3D = ({ 
  children, 
  fallback,
  threshold = 0.1 
}: {
  children: ReactNode;
  fallback: ReactNode;
  threshold?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { enable3D } = usePerformance();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && enable3D) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    const element = document.getElementById('lazy-3d-container');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, enable3D]);

  return (
    <div id="lazy-3d-container">
      {isVisible && enable3D ? children : fallback}
    </div>
  );
};

// Mobile Fallback Image Component
export const MobileFallback = ({ 
  src, 
  alt, 
  className = '' 
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={`relative bg-capas-sand-light rounded-lg overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-white text-sm font-medium">
          {alt}
        </div>
        <div className="text-white/80 text-xs">
          Optimized for mobile viewing
        </div>
      </div>
    </div>
  );
};

export default PerformanceProvider;