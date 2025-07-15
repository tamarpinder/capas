'use client';

import { motion } from 'framer-motion';

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  className?: string;
  text?: string;
  variant?: 'gradient' | 'pattern' | 'solid';
  colorScheme?: 'turquoise' | 'coral' | 'gold' | 'palm' | 'ocean';
}

export default function PlaceholderImage({
  width = 400,
  height = 300,
  className = '',
  text = 'Image',
  variant = 'gradient',
  colorScheme = 'turquoise'
}: PlaceholderImageProps) {
  const colorSchemes = {
    turquoise: {
      gradient: 'from-capas-turquoise to-capas-turquoise-dark',
      solid: 'bg-capas-turquoise',
      pattern: 'bg-capas-turquoise'
    },
    coral: {
      gradient: 'from-capas-coral to-capas-coral-dark',
      solid: 'bg-capas-coral',
      pattern: 'bg-capas-coral'
    },
    gold: {
      gradient: 'from-capas-gold to-capas-gold-dark',
      solid: 'bg-capas-gold',
      pattern: 'bg-capas-gold'
    },
    palm: {
      gradient: 'from-capas-palm to-capas-palm-dark',
      solid: 'bg-capas-palm',
      pattern: 'bg-capas-palm'
    },
    ocean: {
      gradient: 'from-capas-ocean to-capas-ocean-dark',
      solid: 'bg-capas-ocean',
      pattern: 'bg-capas-ocean'
    }
  };

  const getBackgroundClass = () => {
    if (variant === 'gradient') {
      return `bg-gradient-to-br ${colorSchemes[colorScheme].gradient}`;
    }
    return colorSchemes[colorScheme].solid;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`${getBackgroundClass()} flex items-center justify-center rounded-lg relative overflow-hidden ${className}`}
      style={{ width, height }}
      role="img"
      aria-label={text}
    >
      {/* Pattern overlay for pattern variant */}
      {variant === 'pattern' && (
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#dots)" />
          </svg>
        </div>
      )}
      
      {/* Content */}
      <div className="flex flex-col items-center justify-center text-white p-4 text-center relative z-10">
        {/* Camera icon */}
        <svg 
          className="w-8 h-8 mb-2 opacity-80" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
        
        {/* Text */}
        <span className="text-sm font-medium opacity-90 font-montserrat">
          {text}
        </span>
        
        {/* Dimensions indicator */}
        <span className="text-xs opacity-60 mt-1">
          {width} × {height}
        </span>
      </div>
      
      {/* Subtle animation overlay */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0.1 }}
        animate={{ opacity: [0.1, 0.05, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}