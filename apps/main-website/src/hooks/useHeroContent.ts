'use client';

import { useState, useEffect } from 'react';
import { AcademicCapIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';
import heroContentData from '../../mocks/hero-content.json';

// Icon mapping for dynamic icon resolution
const iconMap = {
  AcademicCapIcon,
  UserGroupIcon,
  StarIcon,
};

type IconComponent = typeof AcademicCapIcon | typeof UserGroupIcon | typeof StarIcon;

export interface ProcessedHeroContent {
  id: string;
  type: 'program' | 'event' | 'spotlight';
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
    icon: IconComponent;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    icon: IconComponent;
  };
  backgroundMedia: {
    type: 'video' | 'image';
    src: string;
    fallbackImage: string;
    alt: string;
  };
  featured?: boolean;
}

export const useHeroContent = () => {
  const [heroContent, setHeroContent] = useState<ProcessedHeroContent[]>([]);
  const [settings, setSettings] = useState(heroContentData.heroSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Add a small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      try {
        // Process hero content and map icons
        const processedContent = heroContentData.heroContent.map((content) => ({
          ...content,
          primaryCTA: {
            ...content.primaryCTA,
            icon: iconMap[content.primaryCTA.icon as keyof typeof iconMap] || AcademicCapIcon,
          },
          secondaryCTA: content.secondaryCTA ? {
            ...content.secondaryCTA,
            icon: iconMap[content.secondaryCTA.icon as keyof typeof iconMap] || UserGroupIcon,
          } : undefined,
        }));

        setHeroContent(processedContent);
        setLoading(false);
      } catch (err) {
        console.error('Error loading hero content:', err);
        setError('Failed to load hero content');
        
        // Use fallback content
        const fallbackContent = {
          ...heroContentData.fallbackContent,
          primaryCTA: {
            ...heroContentData.fallbackContent.primaryCTA,
            icon: AcademicCapIcon,
          },
        };
        
        setHeroContent([fallbackContent]);
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [mounted]);

  // Filter content by type
  const getContentByType = (type: 'program' | 'event' | 'spotlight') => {
    return heroContent.filter(content => content.type === type);
  };

  // Get featured content only
  const getFeaturedContent = () => {
    return heroContent.filter(content => content.featured);
  };

  // Get content for specific time-based scenarios
  const getTimeRelevantContent = () => {
    // Return all content to avoid hydration issues with time-based filtering
    // Time-based logic can be implemented in VideoHero component if needed
    return heroContent;
  };

  return {
    heroContent,
    settings,
    loading: loading || !mounted,
    error,
    getContentByType,
    getFeaturedContent,
    getTimeRelevantContent,
  };
};