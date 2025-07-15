'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  AcademicCapIcon,
  UserIcon,
  NewspaperIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { useSearchData } from '@/hooks/useSearchData';

interface SearchFilters {
  type: string;
  category: string;
  dateRange: string;
  sortBy: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    category: 'all',
    dateRange: 'all',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  const { search, loading: dataLoading } = useSearchData();

  // Perform search when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      setLoading(true);
      
      // Simulate search delay
      setTimeout(() => {
        const searchResults = search(searchQuery);
        setResults(searchResults);
        setLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [searchQuery, search]);

  // Apply filters to results
  useEffect(() => {
    let filtered = [...results];

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(item => item.searchType === filters.type);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => 
        item.category?.toLowerCase() === filters.category ||
        item.department?.toLowerCase() === filters.category ||
        item.program?.toLowerCase() === filters.category
      );
    }

    // Filter by date range
    if (filters.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.publishDate || item.date || item.graduationYear || 0);
        const daysDiff = Math.floor((now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'week':
            return daysDiff <= 7;
          case 'month':
            return daysDiff <= 30;
          case 'year':
            return daysDiff <= 365;
          default:
            return true;
        }
      });
    }

    // Sort results
    switch (filters.sortBy) {
      case 'date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.publishDate || a.date || a.graduationYear || 0);
          const dateB = new Date(b.publishDate || b.date || b.graduationYear || 0);
          return dateB.getTime() - dateA.getTime();
        });
        break;
      case 'alphabetical':
        filtered.sort((a, b) => {
          const titleA = a.title || a.fullName || '';
          const titleB = b.title || b.fullName || '';
          return titleA.localeCompare(titleB);
        });
        break;
      case 'relevance':
      default:
        // Already sorted by relevance from search function
        break;
    }

    setFilteredResults(filtered);
  }, [results, filters]);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('q', newQuery);
    window.history.replaceState({}, '', url.toString());
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'program':
        return <AcademicCapIcon className="w-5 h-5" />;
      case 'faculty':
        return <UserIcon className="w-5 h-5" />;
      case 'news':
        return <NewspaperIcon className="w-5 h-5" />;
      case 'event':
        return <CalendarIcon className="w-5 h-5" />;
      case 'alumni':
        return <UserGroupIcon className="w-5 h-5" />;
      case 'page':
        return <GlobeAltIcon className="w-5 h-5" />;
      default:
        return <MagnifyingGlassIcon className="w-5 h-5" />;
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
      case 'alumni':
        return 'text-purple-600';
      case 'page':
        return 'text-gray-600';
      default:
        return 'text-capas-ocean-dark';
    }
  };

  const getResultUrl = (item: any) => {
    switch (item.searchType) {
      case 'program':
        return `/programs/${item.slug}`;
      case 'faculty':
        return `/community/faculty?id=${item.id}`;
      case 'news':
      case 'event':
        return `/news-events/${item.id}`;
      case 'alumni':
        return `/community/alumni?id=${item.id}`;
      case 'page':
        return item.url;
      default:
        return '#';
    }
  };

  const typeStats = results.reduce((acc, item) => {
    acc[item.searchType] = (acc[item.searchType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = Array.from(new Set(
    results.map(item => 
      item.category || item.department || item.program || ''
    ).filter(Boolean)
  ));

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <section className="bg-capas-sand-light py-12 border-b border-capas-ocean-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-capas-ocean-dark/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search CAPAS..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat text-lg"
              />
            </div>
          </div>

          {/* Search Stats */}
          {searchQuery && (
            <div className="text-center">
              <p className="text-capas-ocean-dark font-montserrat">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-capas-turquoise border-t-transparent rounded-full animate-spin mr-2"></div>
                    Searching...
                  </span>
                ) : (
                  <>
                    Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {searchQuery && !loading && (
            <div className="grid lg:grid-cols-4 gap-8">
              
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden w-full flex items-center justify-between bg-capas-sand-light text-capas-ocean-dark px-4 py-3 rounded-lg mb-4 font-semibold"
                  >
                    <span className="flex items-center">
                      <FunnelIcon className="w-5 h-5 mr-2" />
                      Filters
                    </span>
                    <span>{Object.values(filters).filter(f => f !== 'all' && f !== 'relevance').length}</span>
                  </button>

                  <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    
                    {/* Type Filter */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-capas-ocean-light/20">
                      <h3 className="font-semibold text-capas-turquoise mb-4">Content Type</h3>
                      <div className="space-y-2">
                        {[
                          { key: 'all', label: 'All Results', count: results.length },
                          { key: 'program', label: 'Programs', count: typeStats.program || 0 },
                          { key: 'faculty', label: 'Faculty', count: typeStats.faculty || 0 },
                          { key: 'news', label: 'News', count: typeStats.news || 0 },
                          { key: 'event', label: 'Events', count: typeStats.event || 0 },
                          { key: 'alumni', label: 'Alumni', count: typeStats.alumni || 0 },
                          { key: 'page', label: 'Pages', count: typeStats.page || 0 }
                        ].map((type) => (
                          <button
                            key={type.key}
                            onClick={() => setFilters(prev => ({ ...prev, type: type.key }))}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                              filters.type === type.key
                                ? 'bg-capas-turquoise text-white'
                                : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                            }`}
                          >
                            <span className="flex items-center">
                              <span className={getTypeColor(type.key)}>
                                {getTypeIcon(type.key)}
                              </span>
                              <span className="ml-2">{type.label}</span>
                            </span>
                            <span className="text-sm">({type.count})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    {categories.length > 0 && (
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-capas-ocean-light/20">
                        <h3 className="font-semibold text-capas-turquoise mb-4">Category</h3>
                        <div className="space-y-2">
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              filters.category === 'all'
                                ? 'bg-capas-turquoise text-white'
                                : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                            }`}
                          >
                            All Categories
                          </button>
                          {categories.slice(0, 8).map((category) => (
                            <button
                              key={category}
                              onClick={() => setFilters(prev => ({ ...prev, category: category.toLowerCase() }))}
                              className={`w-full text-left px-3 py-2 rounded-md transition-colors capitalize ${
                                filters.category === category.toLowerCase()
                                  ? 'bg-capas-turquoise text-white'
                                  : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sort Options */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-capas-ocean-light/20">
                      <h3 className="font-semibold text-capas-turquoise mb-4">Sort By</h3>
                      <div className="space-y-2">
                        {[
                          { key: 'relevance', label: 'Relevance' },
                          { key: 'date', label: 'Date' },
                          { key: 'alphabetical', label: 'Alphabetical' }
                        ].map((sort) => (
                          <button
                            key={sort.key}
                            onClick={() => setFilters(prev => ({ ...prev, sortBy: sort.key }))}
                            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                              filters.sortBy === sort.key
                                ? 'bg-capas-turquoise text-white'
                                : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                            }`}
                          >
                            {sort.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3">
                
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-capas-ocean-dark font-montserrat">Searching...</p>
                    </motion.div>
                  ) : filteredResults.length > 0 ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {filteredResults.map((item, index) => (
                        <motion.div
                          key={`${item.searchType}-${item.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-capas-ocean-light/20 group"
                        >
                          <Link href={getResultUrl(item)} className="block">
                            <div className="flex">
                              
                              {/* Image */}
                              <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 relative overflow-hidden">
                                <PlaceholderImage
                                  width={128}
                                  height={128}
                                  text={item.title || item.fullName || ''}
                                  variant="square"
                                  colorScheme={item.searchType === 'program' ? 'turquoise' : 
                                              item.searchType === 'faculty' ? 'coral' : 
                                              item.searchType === 'news' ? 'gold' : 
                                              item.searchType === 'event' ? 'palm' : 'ocean'}
                                  className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 p-4 sm:p-6">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className={getTypeColor(item.searchType)}>
                                      {getTypeIcon(item.searchType)}
                                    </span>
                                    <span className="text-sm font-semibold text-capas-ocean-dark/70 capitalize">
                                      {item.searchType}
                                    </span>
                                  </div>
                                  
                                  {item.category && (
                                    <span className="bg-capas-sand-light text-capas-ocean-dark px-2 py-1 rounded-full text-xs font-medium capitalize">
                                      {item.category}
                                    </span>
                                  )}
                                </div>

                                <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                                  {item.title || item.fullName}
                                </h3>

                                <p className="text-capas-ocean-dark mb-4 line-clamp-3">
                                  {item.description || item.excerpt || item.bio || 
                                   `${item.currentPosition} at ${item.currentOrganization}` || ''}
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                                  {item.publishDate && (
                                    <div className="flex items-center">
                                      <ClockIcon className="w-4 h-4 mr-1" />
                                      <span>{new Date(item.publishDate).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                  {item.date && (
                                    <div className="flex items-center">
                                      <CalendarIcon className="w-4 h-4 mr-1" />
                                      <span>{new Date(item.date).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                  {item.author && (
                                    <div className="flex items-center">
                                      <UserIcon className="w-4 h-4 mr-1" />
                                      <span>{item.author}</span>
                                    </div>
                                  )}
                                  {item.location && (
                                    <div className="flex items-center">
                                      <GlobeAltIcon className="w-4 h-4 mr-1" />
                                      <span>{item.location}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : searchQuery ? (
                    <motion.div
                      key="no-results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <MagnifyingGlassIcon className="w-16 h-16 text-capas-ocean-light/50 mx-auto mb-4" />
                      <h3 className="font-montserrat text-2xl font-semibold text-capas-turquoise mb-2">
                        No results found
                      </h3>
                      <p className="text-capas-ocean-dark mb-6">
                        Try adjusting your search terms or filters
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-capas-ocean-dark/70">Suggestions:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {['programs', 'faculty', 'admissions', 'events', 'scholarships'].map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => handleSearch(suggestion)}
                              className="bg-capas-sand-light text-capas-ocean-dark px-3 py-1 rounded-full text-sm hover:bg-capas-ocean-light transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-16"
                    >
                      <MagnifyingGlassIcon className="w-16 h-16 text-capas-ocean-light/50 mx-auto mb-4" />
                      <h3 className="font-montserrat text-2xl font-semibold text-capas-turquoise mb-2">
                        Start Your Search
                      </h3>
                      <p className="text-capas-ocean-dark mb-6">
                        Enter a search term to find programs, faculty, news, events, and more
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Welcome State */}
          {!searchQuery && (
            <div className="text-center py-16">
              <MagnifyingGlassIcon className="w-20 h-20 text-capas-turquoise mx-auto mb-6" />
              <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                Search CAPAS
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-2xl mx-auto mb-8">
                Find programs, faculty, news, events, and everything else you need to know about CAPAS
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {[
                  { name: 'Programs', icon: AcademicCapIcon, query: 'programs' },
                  { name: 'Faculty', icon: UserIcon, query: 'faculty' },
                  { name: 'News', icon: NewspaperIcon, query: 'news' },
                  { name: 'Events', icon: CalendarIcon, query: 'events' }
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSearch(item.query)}
                    className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 border border-capas-ocean-light/20"
                  >
                    <item.icon className="w-8 h-8 text-capas-turquoise mx-auto mb-3" />
                    <h3 className="font-semibold text-capas-ocean-dark">{item.name}</h3>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark font-montserrat">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}