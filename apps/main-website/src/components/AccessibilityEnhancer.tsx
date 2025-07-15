'use client';

import { useEffect } from 'react';

interface AccessibilityEnhancerProps {
  children: React.ReactNode;
}

export default function AccessibilityEnhancer({ children }: AccessibilityEnhancerProps) {
  useEffect(() => {
    // Announce page changes to screen readers
    const announcePageChange = () => {
      const title = document.title;
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Page loaded: ${title}`;
      
      document.body.appendChild(announcement);
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    // Announce page change after a short delay to ensure content is loaded
    const timer = setTimeout(announcePageChange, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Focus management for route changes
    const handleRouteChange = () => {
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Listen for route changes (simplified approach)
    let currentPath = window.location.pathname;
    const checkForRouteChange = () => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        handleRouteChange();
      }
    };

    const interval = setInterval(checkForRouteChange, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Enhanced keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC key handling for modals/dropdowns
      if (e.key === 'Escape') {
        const openDropdowns = document.querySelectorAll('[data-dropdown-open="true"]');
        openDropdowns.forEach(dropdown => {
          const button = dropdown.querySelector('button');
          if (button) {
            button.click();
            button.focus();
          }
        });
      }

      // Tab trap for modals (if any)
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Color contrast warnings in development
    if (process.env.NODE_ENV === 'development') {
      const checkColorContrast = () => {
        const elements = document.querySelectorAll('*');
        elements.forEach((element) => {
          const computedStyle = window.getComputedStyle(element);
          const color = computedStyle.color;
          const backgroundColor = computedStyle.backgroundColor;
          
          // Basic contrast check (simplified)
          if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            const colorLuminance = getLuminance(color);
            const backgroundLuminance = getLuminance(backgroundColor);
            const contrast = getContrastRatio(colorLuminance, backgroundLuminance);
            
            if (contrast < 4.5) {
              console.warn(`Low contrast detected: ${contrast.toFixed(2)}:1`, element);
            }
          }
        });
      };

      // Check contrast after a delay to ensure styles are loaded
      const timer = setTimeout(checkColorContrast, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return <>{children}</>;
}

// Helper functions for contrast checking
function getLuminance(color: string): number {
  // Simplified luminance calculation
  // In a real implementation, you'd parse RGB values properly
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return 0;
  
  const [r, g, b] = rgb.map(n => {
    const val = parseInt(n) / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(lum1: number, lum2: number): number {
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}