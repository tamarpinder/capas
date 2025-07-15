'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface BahamianPatternsProps {
  pattern?: 'waves' | 'conch' | 'palm' | 'junkanoo' | 'coral';
  color?: string;
  opacity?: number;
  className?: string;
  animated?: boolean;
}

const BahamianPatterns = ({ 
  pattern = 'waves',
  color = '#0A8A98',
  opacity = 0.1,
  className = '',
  animated = true
}: BahamianPatternsProps) => {
  const [currentPattern, setCurrentPattern] = useState(pattern);

  const renderWavePattern = () => (
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
    >
      <defs>
        <pattern id="waves" x="0" y="0" width="200" height="120" patternUnits="userSpaceOnUse">
          <motion.path
            d="M0,60 Q50,20 100,60 T200,60 V120 H0 Z"
            fill={color}
            fillOpacity={opacity}
            animate={animated ? {
              d: [
                "M0,60 Q50,20 100,60 T200,60 V120 H0 Z",
                "M0,60 Q50,100 100,60 T200,60 V120 H0 Z",
                "M0,60 Q50,20 100,60 T200,60 V120 H0 Z"
              ]
            } : {}}
            transition={animated ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#waves)" />
    </svg>
  );

  const renderConchPattern = () => (
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 400"
    >
      <defs>
        <pattern id="conch" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <motion.g
            animate={animated ? { rotate: 360 } : {}}
            transition={animated ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
            style={{ transformOrigin: "50px 50px" }}
          >
            <ellipse cx="50" cy="50" rx="20" ry="30" fill={color} fillOpacity={opacity} />
            <ellipse cx="50" cy="35" rx="8" ry="15" fill={color} fillOpacity={opacity * 0.7} />
            <circle cx="50" cy="65" r="3" fill={color} fillOpacity={opacity * 1.2} />
          </motion.g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#conch)" />
    </svg>
  );

  const renderPalmPattern = () => (
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 200 200"
    >
      <defs>
        <pattern id="palm" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <motion.g
            animate={animated ? { 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={animated ? {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{ transformOrigin: "50px 80px" }}
          >
            {/* Palm fronds */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360;
              return (
                <motion.ellipse
                  key={i}
                  cx="50"
                  cy="30"
                  rx="3"
                  ry="20"
                  fill={color}
                  fillOpacity={opacity}
                  style={{ 
                    transformOrigin: "50px 50px",
                    transform: `rotate(${angle}deg)`
                  }}
                  animate={animated ? {
                    ry: [20, 22, 20]
                  } : {}}
                  transition={animated ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2
                  } : {}}
                />
              );
            })}
            {/* Trunk */}
            <rect x="46" y="50" width="8" height="30" fill={color} fillOpacity={opacity * 0.8} />
          </motion.g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#palm)" />
    </svg>
  );

  const renderJunkanooPattern = () => (
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 300 300"
    >
      <defs>
        <pattern id="junkanoo" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse">
          <motion.g
            animate={animated ? { 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            } : {}}
            transition={animated ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{ transformOrigin: "75px 75px" }}
          >
            {/* Central circle */}
            <circle cx="75" cy="75" r="25" fill={color} fillOpacity={opacity} />
            
            {/* Radiating feathers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * 360;
              const colorVariant = i % 3 === 0 ? color : 
                                 i % 3 === 1 ? '#FFD700' : '#FF4500';
              return (
                <motion.ellipse
                  key={i}
                  cx="75"
                  cy="35"
                  rx="8"
                  ry="25"
                  fill={colorVariant}
                  fillOpacity={opacity}
                  style={{ 
                    transformOrigin: "75px 75px",
                    transform: `rotate(${angle}deg)`
                  }}
                  animate={animated ? {
                    ry: [25, 30, 25],
                    fillOpacity: [opacity, opacity * 1.3, opacity]
                  } : {}}
                  transition={animated ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1
                  } : {}}
                />
              );
            })}
          </motion.g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#junkanoo)" />
    </svg>
  );

  const renderCoralPattern = () => (
    <svg 
      className="absolute inset-0 w-full h-full" 
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 200 200"
    >
      <defs>
        <pattern id="coral" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <motion.g
            animate={animated ? { 
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0]
            } : {}}
            transition={animated ? {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            } : {}}
            style={{ transformOrigin: "40px 40px" }}
          >
            {/* Coral branches */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * 360;
              return (
                <motion.g key={i}>
                  <circle 
                    cx={40 + Math.cos(angle * Math.PI / 180) * 15} 
                    cy={40 + Math.sin(angle * Math.PI / 180) * 15} 
                    r="8" 
                    fill={color} 
                    fillOpacity={opacity}
                  />
                  <circle 
                    cx={40 + Math.cos(angle * Math.PI / 180) * 25} 
                    cy={40 + Math.sin(angle * Math.PI / 180) * 25} 
                    r="4" 
                    fill={color} 
                    fillOpacity={opacity * 0.7}
                  />
                </motion.g>
              );
            })}
            <circle cx="40" cy="40" r="6" fill={color} fillOpacity={opacity * 1.2} />
          </motion.g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#coral)" />
    </svg>
  );

  const renderPattern = () => {
    switch (currentPattern) {
      case 'waves': return renderWavePattern();
      case 'conch': return renderConchPattern();
      case 'palm': return renderPalmPattern();
      case 'junkanoo': return renderJunkanooPattern();
      case 'coral': return renderCoralPattern();
      default: return renderWavePattern();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {renderPattern()}
    </div>
  );
};

// Cultural Header Component
export const CulturalHeader = ({ 
  title, 
  subtitle, 
  pattern = 'waves',
  children 
}: {
  title: string;
  subtitle?: string;
  pattern?: 'waves' | 'conch' | 'palm' | 'junkanoo' | 'coral';
  children?: React.ReactNode;
}) => {
  return (
    <div className="relative bg-gradient-to-br from-capas-turquoise to-capas-ocean overflow-hidden">
      <BahamianPatterns 
        pattern={pattern} 
        color="#FFFFFF" 
        opacity={0.1} 
        className="absolute inset-0" 
      />
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl opacity-90 mb-8"
            >
              {subtitle}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Cultural Card Wrapper
export const CulturalCard = ({ 
  children, 
  pattern = 'coral',
  className = '' 
}: {
  children: React.ReactNode;
  pattern?: 'waves' | 'conch' | 'palm' | 'junkanoo' | 'coral';
  className?: string;
}) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <BahamianPatterns 
        pattern={pattern} 
        color="#0A8A98" 
        opacity={0.03} 
        className="absolute inset-0" 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Cultural Section Divider
export const CulturalDivider = ({ 
  pattern = 'waves',
  height = 60,
  color = '#0A8A98'
}: {
  pattern?: 'waves' | 'conch' | 'palm' | 'junkanoo' | 'coral';
  height?: number;
  color?: string;
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      <BahamianPatterns 
        pattern={pattern} 
        color={color} 
        opacity={0.2} 
        className="w-full h-full" 
      />
    </div>
  );
};

export default BahamianPatterns;