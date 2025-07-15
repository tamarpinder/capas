'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import GlobalSearch from './GlobalSearch';

export default function CollapsibleSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus input when expanded
      setTimeout(() => {
        const searchInput = searchRef.current?.querySelector('input[type="search"]');
        if (searchInput) {
          (searchInput as HTMLInputElement).focus();
        }
      }, 300);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isExpanded]);

  return (
    <div ref={searchRef} className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="search-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsExpanded(true)}
            className="p-2 rounded-full bg-capas-sand-light dark:bg-gray-700 text-capas-ocean-dark dark:text-gray-200 hover:bg-capas-sand dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2 hover:scale-105 active:scale-95"
            aria-label="Open search"
            title="Search CAPAS"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.div
            key="search-expanded"
            initial={{ opacity: 0, width: 48 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 48 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="flex items-center space-x-2">
              <div className="w-80 lg:w-96">
                <GlobalSearch
                  placeholder="Search CAPAS..."
                  showRecentSearches={true}
                  showPopularSearches={true}
                  maxResults={6}
                />
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full bg-capas-sand-light dark:bg-gray-700 text-capas-ocean-dark dark:text-gray-200 hover:bg-capas-sand dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2"
                aria-label="Close search"
              >
                <XMarkIcon className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}