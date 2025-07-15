'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  AcademicCapIcon,
  UserIcon,
  NewspaperIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useSearchData } from '@/hooks/useSearchData';

interface SearchResult {
  id: string;
  type: 'program' | 'faculty' | 'news' | 'event' | 'page';
  title: string;
  description: string;
  url: string;
  category?: string;
  tags?: string[];
  relevanceScore: number;
  metadata?: {
    date?: string;
    author?: string;
    department?: string;
    location?: string;
  };
}

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  showRecentSearches?: boolean;
  showPopularSearches?: boolean;
  maxResults?: number;
}

export default function GlobalSearch({
  className = '',
  placeholder = 'Search CAPAS...',
  showRecentSearches = true,
  showPopularSearches = true,
  maxResults = 8
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches] = useState([
    'Musical Theatre',
    'Faculty',
    'Admissions',
    'Events',
    'Scholarships',
    'Campus Tour',
    'Alumni',
    'Dance Program'
  ]);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { searchData, loading: dataLoading } = useSearchData();
  
  // Add safety check for search data
  const safeSearchData = searchData || {
    programs: [],
    faculty: [],
    news: [],
    events: [],
    alumni: [],
    pages: []
  };

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('capas-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('capas-recent-searches', JSON.stringify(updated));
  };

  // Perform search with debouncing
  const performSearch = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm.trim() || dataLoading) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 200));

      const searchResults: SearchResult[] = [];
      const searchTermLower = searchTerm.toLowerCase();

      // Search programs
      safeSearchData.programs.forEach(program => {
        let relevanceScore = 0;
        
        // Title match (highest weight)
        if (program.title.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 10;
        }
        
        // Description match
        if (program.description.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 5;
        }
        
        // Category match
        if (program.category.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 3;
        }
        
        // Type match
        if (program.type.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 3;
        }

        if (relevanceScore > 0) {
          searchResults.push({
            id: program.id,
            type: 'program',
            title: program.title,
            description: program.description,
            url: `/programs/${program.slug}`,
            category: program.category,
            relevanceScore,
            metadata: {
              department: program.type
            }
          });
        }
      });

      // Search faculty
      safeSearchData.faculty.forEach(member => {
        let relevanceScore = 0;
        const fullName = `${member.firstName} ${member.lastName}`;
        
        // Name match (highest weight)
        if (fullName.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 10;
        }
        
        // Title match
        if (member.title.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 8;
        }
        
        // Department match
        if (member.department.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 5;
        }
        
        // Specialization match
        if (member.specialization.some(spec => spec.toLowerCase().includes(searchTermLower))) {
          relevanceScore += 6;
        }
        
        // Bio match
        if (member.bio.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 3;
        }

        if (relevanceScore > 0) {
          searchResults.push({
            id: member.id,
            type: 'faculty',
            title: fullName,
            description: `${member.title} - ${member.department}`,
            url: `/community/faculty?id=${member.id}`,
            category: member.department,
            relevanceScore,
            metadata: {
              department: member.department
            }
          });
        }
      });

      // Search news
      safeSearchData.news.forEach(article => {
        let relevanceScore = 0;
        
        // Title match
        if (article.title.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 10;
        }
        
        // Excerpt match
        if (article.excerpt.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 5;
        }
        
        // Category match
        if (article.category.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 3;
        }
        
        // Author match
        if (article.author?.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 4;
        }

        if (relevanceScore > 0) {
          searchResults.push({
            id: article.id,
            type: 'news',
            title: article.title,
            description: article.excerpt,
            url: `/news-events/${article.id}`,
            category: article.category,
            relevanceScore,
            metadata: {
              date: article.publishDate,
              author: article.author
            }
          });
        }
      });

      // Search events
      safeSearchData.events.forEach(event => {
        let relevanceScore = 0;
        
        // Title match
        if (event.title.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 10;
        }
        
        // Description match
        if (event.description.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 5;
        }
        
        // Category match
        if (event.category.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 3;
        }
        
        // Location match
        if (event.location?.toLowerCase().includes(searchTermLower)) {
          relevanceScore += 4;
        }

        if (relevanceScore > 0) {
          searchResults.push({
            id: event.id,
            type: 'event',
            title: event.title,
            description: event.description,
            url: `/news-events/${event.id}`,
            category: event.category,
            relevanceScore,
            metadata: {
              date: event.date,
              location: event.location
            }
          });
        }
      });

      // Sort by relevance score and limit results
      const sortedResults = searchResults
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, maxResults);

      setResults(sortedResults);
      setIsLoading(false);
    },
    [searchData, dataLoading, maxResults]
  );

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  // Handle keyboard navigation
  const handleResultClick = useCallback((result: SearchResult) => {
    saveRecentSearch(result.title);
    setIsOpen(false);
    setQuery('');
    router.push(result.url);
  }, [router]);

  const handleSearch = useCallback((searchTerm: string) => {
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm);
      setIsOpen(false);
      setQuery('');
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          } else if (query.trim()) {
            handleSearch(query);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, results, query, handleResultClick, handleSearch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleQuickSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    inputRef.current?.focus();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'program':
        return <AcademicCapIcon className="w-4 h-4" />;
      case 'faculty':
        return <UserIcon className="w-4 h-4" />;
      case 'news':
        return <NewspaperIcon className="w-4 h-4" />;
      case 'event':
        return <CalendarIcon className="w-4 h-4" />;
      default:
        return <MagnifyingGlassIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'program':
        return 'text-capas-turquoise';
      case 'faculty':
        return 'text-capas-coral';
      case 'news':
        return 'text-capas-gold';
      case 'event':
        return 'text-capas-palm';
      default:
        return 'text-capas-ocean-dark';
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat"
          autoComplete="off"
        />
        
        {/* Clear Button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50 hover:text-capas-ocean-dark transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-capas-turquoise border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-capas-ocean-light/20 py-2 z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Results */}
            {query && results.length > 0 && (
              <div>
                <div className="px-4 py-2 text-sm font-semibold text-capas-ocean-dark/70 border-b border-capas-ocean-light/20">
                  Search Results
                </div>
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full text-left px-4 py-3 hover:bg-capas-sand-light transition-colors ${
                      index === selectedIndex ? 'bg-capas-sand-light' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-capas-ocean-dark truncate">
                          {result.title}
                        </h4>
                        <p className="text-sm text-capas-ocean-dark/70 line-clamp-2 mt-1">
                          {result.description}
                        </p>
                        <div className="flex items-center space-x-3 mt-2 text-xs text-capas-ocean-dark/50">
                          <span className="capitalize">{result.type}</span>
                          {result.category && (
                            <>
                              <span>•</span>
                              <span>{result.category}</span>
                            </>
                          )}
                          {result.metadata?.date && (
                            <>
                              <span>•</span>
                              <span>{new Date(result.metadata.date).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ArrowRightIcon className="w-4 h-4 text-capas-ocean-dark/30 mt-1" />
                    </div>
                  </button>
                ))}
                
                {/* View All Results */}
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full text-left px-4 py-3 border-t border-capas-ocean-light/20 text-capas-turquoise hover:bg-capas-sand-light transition-colors font-medium"
                >
                  View all results for &quot;{query}&quot;
                </button>
              </div>
            )}

            {/* No Results */}
            {query && !isLoading && results.length === 0 && (
              <div className="px-4 py-6 text-center">
                <MagnifyingGlassIcon className="w-8 h-8 text-capas-ocean-light/50 mx-auto mb-2" />
                <p className="text-capas-ocean-dark/70 mb-2">No results found for &quot;{query}&quot;</p>
                <p className="text-sm text-capas-ocean-dark/50">Try different keywords or browse our programs</p>
              </div>
            )}

            {/* Recent Searches */}
            {!query && showRecentSearches && recentSearches.length > 0 && (
              <div>
                <div className="px-4 py-2 text-sm font-semibold text-capas-ocean-dark/70 border-b border-capas-ocean-light/20 flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search)}
                    className="w-full text-left px-4 py-2 text-capas-ocean-dark hover:bg-capas-sand-light transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!query && showPopularSearches && (
              <div className={recentSearches.length > 0 ? 'border-t border-capas-ocean-light/20' : ''}>
                <div className="px-4 py-2 text-sm font-semibold text-capas-ocean-dark/70 border-b border-capas-ocean-light/20 flex items-center">
                  <FireIcon className="w-4 h-4 mr-2" />
                  Popular Searches
                </div>
                <div className="grid grid-cols-2 gap-1 p-2">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(search)}
                      className="text-left px-2 py-1 text-sm text-capas-ocean-dark hover:bg-capas-sand-light transition-colors rounded"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Links */}
            {!query && (
              <div className="border-t border-capas-ocean-light/20">
                <div className="px-4 py-2 text-sm font-semibold text-capas-ocean-dark/70">
                  Quick Links
                </div>
                {[
                  { name: 'All Programs', url: '/programs', icon: AcademicCapIcon },
                  { name: 'Faculty Directory', url: '/community/faculty', icon: UserIcon },
                  { name: 'Latest News', url: '/news-events', icon: NewspaperIcon },
                  { name: 'Upcoming Events', url: '/news-events?type=events', icon: CalendarIcon }
                ].map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.url}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-2 text-capas-ocean-dark hover:bg-capas-sand-light transition-colors"
                    >
                      <IconComponent className="w-4 h-4 text-capas-turquoise" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}