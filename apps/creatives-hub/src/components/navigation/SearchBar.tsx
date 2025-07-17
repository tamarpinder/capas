'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  ClockIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'forum' | 'resource' | 'policy';
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: '3D Digital Sculpture',
    type: 'course',
    description: 'Advanced 3D modeling and digital sculpting techniques',
    href: '/courses/3d-digital-sculpture',
    icon: BookOpenIcon,
    color: 'text-capas-turquoise'
  },
  {
    id: '2',
    title: 'Music Production Fundamentals',
    type: 'course',
    description: 'Learn the basics of digital music production',
    href: '/courses/music-production',
    icon: BookOpenIcon,
    color: 'text-capas-turquoise'
  },
  {
    id: '3',
    title: 'Welcome to 3D Digital Sculpture',
    type: 'forum',
    description: 'Introduction and course discussion thread',
    href: '/forums/3d-sculpture-welcome',
    icon: ChatBubbleLeftRightIcon,
    color: 'text-capas-coral'
  },
  {
    id: '4',
    title: 'Blender Tutorial Series',
    type: 'resource',
    description: 'Complete video series for 3D modeling',
    href: '/gallery/blender-tutorials',
    icon: PhotoIcon,
    color: 'text-capas-gold'
  },
  {
    id: '5',
    title: 'Academic Integrity Policy',
    type: 'policy',
    description: 'Guidelines for academic honesty and ethics',
    href: '/policies#academic-integrity',
    icon: DocumentTextIcon,
    color: 'text-capas-palm'
  }
];

const recentSearches = [
  'Blender basics',
  'Music production',
  'Forum discussions',
  'Assignment help'
];

export default function SearchBar({ className = '', onSearch }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showRecent, setShowRecent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Mock search function
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowRecent(true);
      return;
    }

    setIsLoading(true);
    setShowRecent(false);

    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(
        result =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.href);
    setIsOpen(false);
    setQuery('');
    onSearch?.(result.title);
  };

  const handleRecentClick = (recentQuery: string) => {
    setQuery(recentQuery);
    handleSearch(recentQuery);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowRecent(true);
    inputRef.current?.focus();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-capas-turquoise/10 text-capas-turquoise';
      case 'forum': return 'bg-capas-coral/10 text-capas-coral';
      case 'resource': return 'bg-capas-gold/10 text-capas-gold';
      case 'policy': return 'bg-capas-palm/10 text-capas-palm';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => inputRef.current?.focus(), 100);
            }
          }}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isOpen
              ? 'bg-capas-ocean-light text-capas-turquoise shadow-md'
              : 'text-gray-700 hover:text-capas-turquoise hover:bg-capas-ocean-light/50'
          }`}
        >
          <MagnifyingGlassIcon className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Search</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              {/* Search Input */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search courses, forums, resources..."
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                  />
                  {query && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-capas-turquoise mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-2">Searching...</p>
                  </div>
                ) : showRecent && recentSearches.length > 0 ? (
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      {recentSearches.map((recent, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecentClick(recent)}
                          className="w-full text-left p-2 rounded-lg hover:bg-capas-ocean-light/50 text-gray-700 hover:text-capas-turquoise transition-colors"
                        >
                          {recent}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result) => {
                      const ResultIcon = result.icon;
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleResultClick(result)}
                          className="w-full p-3 hover:bg-capas-ocean-light/50 transition-colors text-left"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-capas-turquoise/10 flex items-center justify-center">
                              <ResultIcon className={`w-4 h-4 ${result.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">{result.title}</span>
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                                  {result.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {result.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : query && !isLoading ? (
                  <div className="p-4 text-center">
                    <p className="text-sm text-gray-500">No results found for "{query}"</p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}