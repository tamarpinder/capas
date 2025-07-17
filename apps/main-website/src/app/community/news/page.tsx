'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CalendarIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  NewspaperIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';
import PlaceholderImage from '@/components/PlaceholderImage';
import Footer from '@/components/Footer';
import newsEventsData from '../../../../mocks/news-events.json';

export default function NewsEventsHub() {
  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'events'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { newsArticles, upcomingEvents } = newsEventsData;

  // Combine and filter data
  const allItems = [
    ...newsArticles.map(item => ({ ...item, type: 'news' as const })),
    ...upcomingEvents.map(item => ({ ...item, type: 'event' as const }))
  ];

  // Get unique categories
  const categories = Array.from(new Set(allItems.map(item => item.category)));

  // Filter items based on active filters
  const filteredItems = allItems.filter(item => {
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.type === 'news' && 'excerpt' in item && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.type === 'event' && 'description' in item && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesTab && matchesCategory && matchesSearch;
  });

  // Featured items (first 3 news articles)
  const featuredNews = newsArticles.slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'performances': 'text-capas-gold bg-capas-gold/10',
      'partnerships': 'text-capas-palm bg-capas-palm/10',
      'achievements': 'text-capas-coral bg-capas-coral/10',
      'workshops': 'text-capas-turquoise bg-capas-turquoise/10',
      'community': 'text-capas-ocean bg-capas-ocean/10',
      'auditions': 'text-capas-coral bg-capas-coral/10',
      'showcase': 'text-capas-gold bg-capas-gold/10',
      'masterclass': 'text-capas-turquoise bg-capas-turquoise/10'
    };
    return colorMap[category] || 'text-capas-ocean-dark bg-gray-100';
  };

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-coral via-capas-gold to-capas-turquoise mobile-section-padding overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="url(#gradient1)"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0A8A98" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-6">
                News & Events
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 font-montserrat">
                Stay connected with the vibrant CAPAS community. Discover the latest news, 
                upcoming events, and celebrate our achievements together.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured News Section */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Featured Stories
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Highlighting the most important news and achievements from our community
              </p>
            </motion.div>

            <div className="mobile-grid-auto lg:grid-cols-3">
              {featuredNews.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={index === 0 ? 'lg:col-span-2' : ''}
                >
                  <Link href={`/news-events/${article.id}`} className="block group h-full">
                    <article className="mobile-card-enhanced bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-capas-ocean-light/20 h-full flex flex-col">
                      <div className={`mobile-image-wrapper ${index === 0 ? 'h-64' : 'h-48'}`}>
                        <PlaceholderImage
                          width={index === 0 ? 800 : 400}
                          height={index === 0 ? 256 : 192}
                          text={article.category}
                          variant="gradient"
                          colorScheme={article.category === 'performances' ? 'gold' : article.category === 'partnerships' ? 'palm' : 'coral'}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-4 right-4">
                            <span className="inline-block bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className={`font-montserrat font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2 ${index === 0 ? 'text-2xl' : 'text-xl'}`}>
                          {article.title}
                        </h3>
                        <p className={`text-capas-ocean-dark mb-4 flex-grow ${index === 0 ? 'line-clamp-3' : 'line-clamp-2'}`}>
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70 mt-auto">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {formatDate(article.publishDate)}
                            </span>
                            {article.author && (
                              <span>By {article.author}</span>
                            )}
                          </div>
                          <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col lg:flex-row gap-6 items-center justify-between"
            >
              {/* Tab Navigation */}
              <div className="flex bg-white rounded-lg p-1 shadow-md">
                {[
                  { key: 'all', label: 'All', icon: NewspaperIcon },
                  { key: 'news', label: 'News', icon: NewspaperIcon },
                  { key: 'events', label: 'Events', icon: CalendarIcon }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-capas-turquoise text-white shadow-md'
                        : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Search and Category Filter */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50" />
                  <input
                    type="text"
                    placeholder="Search news & events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-capas-ocean-light/30 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat w-full sm:w-64"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-capas-ocean-light/30 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat w-full sm:w-48 appearance-none bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <p className="text-capas-ocean-dark">
                Showing <span className="font-semibold">{filteredItems.length}</span> {filteredItems.length === 1 ? 'item' : 'items'}
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* News & Events Grid */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center py-12"
              >
                <MagnifyingGlassIcon className="w-16 h-16 text-capas-ocean-light mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-capas-ocean-dark mb-2">No items found</h3>
                <p className="text-capas-ocean-dark/70">Try adjusting your search or filter criteria</p>
              </motion.div>
            ) : (
              <div className="mobile-grid-auto lg:grid-cols-3">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.type}-${item.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (index % 12) * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/news-events/${item.id}`} className="block group h-full">
                      <article className="mobile-card-enhanced bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-capas-ocean-light/20 h-full flex flex-col">
                        <div className="mobile-image-wrapper h-48">
                          <PlaceholderImage
                            width={400}
                            height={192}
                            text={item.type === 'event' ? item.title : item.category}
                            variant="gradient"
                            colorScheme={item.category === 'performances' ? 'gold' : item.category === 'partnerships' ? 'palm' : 'coral'}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                          <div className="absolute top-4 right-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              item.type === 'event' 
                                ? 'bg-capas-palm text-white' 
                                : 'bg-capas-coral text-white'
                            }`}>
                              {item.type === 'event' ? 'Event' : 'News'}
                            </span>
                          </div>
                          {item.type === 'event' && (
                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="flex items-center text-white text-sm bg-black/50 rounded px-2 py-1">
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                <span>{formatDate(item.date)}</span>
                                {'time' in item && (
                                  <>
                                    <ClockIcon className="w-4 h-4 ml-3 mr-1" />
                                    <span>{item.time}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mobile-card-container flex-grow flex flex-col">
                          <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-capas-ocean-dark mb-4 line-clamp-3 flex-grow">
                            {item.type === 'news' && 'excerpt' in item ? item.excerpt : 'description' in item ? item.description : ''}
                          </p>
                          <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70 mt-auto">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="w-4 h-4" />
                              <span>
                                {item.type === 'news' ? formatDate(item.publishDate) : formatDate(item.date)}
                              </span>
                            </div>
                            <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                              {item.type === 'event' ? 'Learn More' : 'Read More'} →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mobile-section-padding bg-gradient-to-r from-capas-turquoise to-capas-ocean">
          <div className="mobile-safe-container mobile-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MegaphoneIcon className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="font-montserrat text-4xl font-bold text-white mb-6">
                Stay in the Loop
              </h2>
              <p className="text-xl text-white/90 mb-8 font-montserrat">
                Subscribe to our newsletter and never miss an important update, event, or achievement from the CAPAS community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-capas-gold focus:outline-none font-montserrat"
                />
                <button className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}