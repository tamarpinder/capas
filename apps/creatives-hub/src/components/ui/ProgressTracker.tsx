'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressTrackerProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showText?: boolean;
  className?: string;
  animated?: boolean;
  duration?: number;
}

export default function ProgressTracker({
  value,
  size = 80,
  strokeWidth = 6,
  color = '#0A8A98',
  backgroundColor = '#E6F4F1',
  showText = true,
  className = '',
  animated = true,
  duration = 1.5
}: ProgressTrackerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-30"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animated ? offset : circumference - (value / 100) * circumference }}
          transition={{ duration: animated ? duration : 0, ease: "easeInOut" }}
          className="drop-shadow-sm"
        />
        
        {/* Glow effect */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth / 2}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: animated ? offset : circumference - (value / 100) * circumference }}
          transition={{ duration: animated ? duration : 0, ease: "easeInOut" }}
          className="opacity-50 blur-sm"
        />
      </svg>
      
      {/* Text overlay */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: animated ? duration * 0.5 : 0 }}
            className="text-center"
          >
            <motion.span
              className="font-bold text-capas-ocean-dark"
              style={{ fontSize: size * 0.15 }}
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5, delay: animated ? duration * 0.7 : 0 }}
            >
              {Math.round(displayValue)}%
            </motion.span>
            {size > 60 && (
              <div 
                className="text-capas-ocean-dark/70 font-medium"
                style={{ fontSize: size * 0.08 }}
              >
                Complete
              </div>
            )}
          </motion.div>
        </div>
      )}
      
      {/* Pulse animation for high progress */}
      {value >= 90 && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ 
            border: `2px solid ${color}`,
            opacity: 0.3
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </div>
  );
}

// Variant for small inline progress indicators
export function MiniProgressTracker({ 
  value, 
  color = '#0A8A98',
  className = '' 
}: { 
  value: number; 
  color?: string; 
  className?: string;
}) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="w-16 h-2 bg-capas-ocean-light/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs font-medium text-capas-ocean-dark min-w-[2rem]">
        {value}%
      </span>
    </div>
  );
}

// Variant for skill progress with labels
export function SkillProgressTracker({
  skills,
  className = ''
}: {
  skills: Array<{ name: string; level: number; color?: string }>;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm font-medium text-capas-ocean-dark flex-1">
            {skill.name}
          </span>
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex-1 h-2 bg-capas-ocean-light/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color || '#0A8A98' }}
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
              />
            </div>
            <span className="text-xs font-medium text-capas-ocean-dark min-w-[2.5rem]">
              {skill.level}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}