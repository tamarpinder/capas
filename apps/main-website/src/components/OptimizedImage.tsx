'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  fallbackSrc?: string;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  placeholder = 'empty',
  sizes,
  fallbackSrc,
  quality = 80,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate placeholder background based on alt text
  const generatePlaceholder = () => {
    const hash = alt.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colors = [
      'from-capas-turquoise to-capas-ocean',
      'from-capas-coral to-capas-gold',
      'from-capas-palm to-capas-turquoise',
      'from-capas-gold to-capas-coral',
      'from-capas-ocean to-capas-turquoise-dark'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Show placeholder while loading or on error (when no fallback)
  if (isLoading || (hasError && !fallbackSrc)) {
    return (
      <div 
        className={`bg-gradient-to-br ${generatePlaceholder()} flex items-center justify-center ${className}`}
        style={fill ? {} : { width, height }}
        role="img"
        aria-label={alt}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-white text-sm opacity-80">Loading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-white">
            <svg className="w-12 h-12 mb-2 opacity-60" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm opacity-80 text-center">{alt}</span>
          </div>
        )}
      </div>
    );
  }

  const imageProps = {
    src: imgSrc,
    alt,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    onError: handleError,
    onLoad: handleLoad,
    quality,
    ...props
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        alt={alt}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        priority={priority}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      priority={priority}
      placeholder={placeholder}
    />
  );
}