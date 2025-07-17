'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  StarIcon,
  TrophyIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import alumniData from '../../../../mocks/alumni.json';

interface Alumni {
  id: string;
  name: string;
  graduationYear: number;
  program: string;
  currentPosition: string;
  company: string;
  location: string;
  story: string;
  achievements: string[];
  quote: string;
  image: string;
  social: {
    linkedin?: string;
    instagram?: string;
    website?: string;
    twitter?: string;
  };
  featured: boolean;
}

interface FilterState {
  graduationYear: string;
  program: string;
  industry: string;
  location: string;
}

export default function Alumni() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([]);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    graduationYear: 'all',
    program: 'all',
    industry: 'all',
    location: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 300], [0, 100]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setAlumni(alumniData.alumni);
      setFilteredAlumni(alumniData.alumni);
      setLoading(false);
    }, 500);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = alumni;

    // Apply filters
    if (filters.graduationYear !== 'all') {
      const year = parseInt(filters.graduationYear);
      filtered = filtered.filter(alum => alum.graduationYear === year);
    }
    if (filters.program !== 'all') {
      filtered = filtered.filter(alum => alum.program === filters.program);
    }
    if (filters.industry !== 'all') {
      filtered = filtered.filter(alum => alum.industry === filters.industry);
    }
    if (filters.location !== 'all') {
      filtered = filtered.filter(alum => alum.location.includes(filters.location));
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(alum =>
        alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.currentPosition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alum.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredAlumni(filtered);
    setCurrentSlide(0);
  }, [alumni, filters, searchTerm]);

  // Get unique filter options
  const getFilterOptions = (key: keyof Alumni) => {
    return ['all', ...Array.from(new Set(alumni.map(alum => alum[key] as string)))];
  };

  const graduationYears = Array.from(new Set(alumni.map(alum => alum.graduationYear))).sort((a, b) => b - a);
  const programs = getFilterOptions('program');
  const industries = getFilterOptions('industry');
  const locations = Array.from(new Set(alumni.map(alum => alum.location))).sort();

  // Carousel controls
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredAlumni.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredAlumni.length) % filteredAlumni.length);
  };

  // Auto-advance carousel
  useEffect(() => {
    if (viewMode === 'carousel' && filteredAlumni.length > 1) {
      const timer = setInterval(nextSlide, 8000);
      return () => clearInterval(timer);
    }
  }, [viewMode, filteredAlumni.length]);

  const featuredAlumni = alumni.filter(alum => alum.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark font-montserrat">Loading alumni stories...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative mobile-section-padding bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
          <motion.div 
            style={{ y: heroY }}
            className="absolute inset-0 opacity-20"
          >
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,100 C300,0 600,200 900,100 C1200,0 1440,100 1440,100 L1440,400 L0,400 Z" fill="currentColor" />
            </svg>
          </motion.div>
          
          <div className="relative mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mobile-center"
            >
              <h1 className="font-montserrat text-responsive-3xl font-bold mb-6">
                Alumni Success Stories
              </h1>
              <p className="text-responsive-lg max-w-4xl mx-auto opacity-90 font-montserrat mb-8">
                Celebrating the achievements of CAPAS graduates who are making their mark around the world
              </p>
              
              {/* Stats */}
              <div className="mobile-grid-auto max-w-4xl mx-auto">
                {[
                  { label: 'Alumni Worldwide', value: '500+' },
                  { label: 'Countries', value: '25+' },
                  { label: 'Award Winners', value: '150+' },
                  { label: 'Years of Success', value: '20+' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    className="mobile-center mobile-card-container"
                  >
                    <div className="text-responsive-2xl font-bold text-capas-gold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-responsive-sm opacity-90">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="mobile-section-padding bg-white border-b border-capas-ocean-light/30">
          <div className="mobile-safe-container">
            
            {/* Search and View Toggle */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50" />
                <input
                  type="text"
                  placeholder="Search alumni by name, position, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-capas-sand-light rounded-lg p-1">
                <button
                  onClick={() => setViewMode('carousel')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === 'carousel'
                      ? 'bg-capas-turquoise text-white shadow'
                      : 'text-capas-ocean-dark hover:bg-white'
                  }`}
                >
                  Showcase
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-capas-turquoise text-white shadow'
                      : 'text-capas-ocean-dark hover:bg-white'
                  }`}
                >
                  Browse All
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mobile-grid-auto">
              
              {/* Graduation Year Filter */}
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Graduation Year
                </label>
                <select
                  value={filters.graduationYear}
                  onChange={(e) => setFilters(prev => ({ ...prev, graduationYear: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors text-sm"
                >
                  <option value="all">All Years</option>
                  {graduationYears.map(year => (
                    <option key={year} value={year.toString()}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Program Filter */}
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Program
                </label>
                <select
                  value={filters.program}
                  onChange={(e) => setFilters(prev => ({ ...prev, program: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors text-sm"
                >
                  <option value="all">All Programs</option>
                  {programs.slice(1).map(program => (
                    <option key={program} value={program}>{program}</option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors text-sm"
                >
                  <option value="all">All Industries</option>
                  {industries.slice(1).map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors text-sm"
                >
                  <option value="all">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 text-center">
              <p className="text-capas-ocean-dark font-montserrat">
                Showing {filteredAlumni.length} alumni
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        {viewMode === 'carousel' ? (
          /* Carousel View */
          <section className="mobile-section-padding bg-capas-sand-light">
            <div className="mobile-safe-container">
              
              {/* Featured Alumni Carousel */}
              {filteredAlumni.length > 0 && (
                <div className="relative">
                  <div className="text-center mb-12">
                    <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                      Success Spotlight
                    </h2>
                    <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                      Discover the inspiring journeys of our accomplished alumni
                    </p>
                  </div>

                  <div ref={carouselRef} className="relative overflow-hidden rounded-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className="bg-white shadow-xl"
                      >
                        {filteredAlumni[currentSlide] && (
                          <div className="mobile-content-wrapper">
                            <div className="grid lg:grid-cols-2 gap-6 min-h-[400px] lg:min-h-[600px]">
                            
                            {/* Image Section */}
                            <div className="mobile-image-wrapper lg:relative lg:overflow-hidden">
                              <PlaceholderImage
                                width={600}
                                height={600}
                                text={filteredAlumni[currentSlide].name}
                                variant="portrait"
                                colorScheme="turquoise"
                                className="w-full h-64 lg:h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                              
                              {/* Achievement Badges */}
                              <div className="absolute top-6 left-6 space-y-2">
                                {filteredAlumni[currentSlide].featured && (
                                  <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    <StarIcon className="w-4 h-4 mr-1" />
                                    Featured
                                  </span>
                                )}
                                {filteredAlumni[currentSlide].mentorshipAvailable && (
                                  <span className="block bg-capas-turquoise text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Mentor Available
                                  </span>
                                )}
                              </div>

                              {/* Graduation Year */}
                              <div className="absolute bottom-6 left-6">
                                <span className="bg-white/90 text-capas-turquoise px-4 py-2 rounded-lg font-bold">
                                  Class of {filteredAlumni[currentSlide].graduationYear}
                                </span>
                              </div>
                            </div>

                            {/* Content Section */}
                            <div className="mobile-card-container lg:p-12 flex flex-col justify-center">
                              <div className="space-y-6">
                                
                                {/* Header */}
                                <div>
                                  <h3 className="font-montserrat text-3xl lg:text-4xl font-bold text-capas-turquoise mb-3">
                                    {filteredAlumni[currentSlide].name}
                                  </h3>
                                  <p className="text-xl text-capas-gold font-semibold mb-2">
                                    {filteredAlumni[currentSlide].currentPosition}
                                  </p>
                                  <p className="text-lg text-capas-ocean-dark">
                                    {filteredAlumni[currentSlide].company}
                                  </p>
                                  <p className="text-capas-ocean-dark/70 flex items-center mt-2">
                                    <GlobeAltIcon className="w-5 h-5 mr-2" />
                                    {filteredAlumni[currentSlide].location}
                                  </p>
                                </div>

                                {/* Program Badge */}
                                <div>
                                  <span className="inline-block bg-capas-sand-light text-capas-ocean-dark px-4 py-2 rounded-lg font-medium">
                                    {filteredAlumni[currentSlide].program}
                                  </span>
                                </div>

                                {/* Testimonial */}
                                <blockquote className="border-l-4 border-capas-turquoise pl-6 italic text-lg text-capas-ocean-dark">
                                  &quot;{filteredAlumni[currentSlide].quote}&quot;
                                  <footer className="text-sm text-capas-ocean-dark/70 mt-2">
                                    — {filteredAlumni[currentSlide].name}
                                  </footer>
                                </blockquote>

                                {/* Key Achievements */}
                                <div>
                                  <h4 className="font-semibold text-capas-turquoise mb-3">Recent Achievements</h4>
                                  <ul className="space-y-2">
                                    {filteredAlumni[currentSlide].achievements.slice(0, 3).map((achievement, index) => (
                                      <li key={index} className="flex items-start space-x-2">
                                        <TrophyIcon className="w-5 h-5 text-capas-gold mt-0.5 flex-shrink-0" />
                                        <span className="text-capas-ocean-dark">{achievement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                  <button
                                    onClick={() => setSelectedAlumni(filteredAlumni[currentSlide])}
                                    className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
                                  >
                                    Read Full Story
                                  </button>
                                  
                                  {filteredAlumni[currentSlide].social.linkedin && (
                                    <a
                                      href={filteredAlumni[currentSlide].social.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="border-2 border-capas-turquoise text-capas-turquoise hover:bg-capas-turquoise hover:text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 font-montserrat"
                                    >
                                      Connect
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Carousel Controls */}
                    {filteredAlumni.length > 1 && (
                      <>
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-capas-turquoise rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                          aria-label="Previous alumni"
                        >
                          <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white text-capas-turquoise rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                          aria-label="Next alumni"
                        >
                          <ChevronRightIcon className="w-6 h-6" />
                        </button>
                      </>
                    )}

                    {/* Slide Indicators */}
                    {filteredAlumni.length > 1 && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                        <div className="flex space-x-2">
                          {filteredAlumni.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                  ? 'bg-capas-gold scale-125'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                              aria-label={`Go to slide ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Currently Featured', value: featuredAlumni.length },
                  { label: 'Available Mentors', value: alumni.filter(a => a.mentorshipAvailable).length },
                  { label: 'Industries Represented', value: industries.length - 1 },
                  { label: 'Recent Graduates', value: alumni.filter(a => new Date().getFullYear() - a.graduationYear <= 5).length }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center bg-white rounded-xl p-6 shadow-lg"
                  >
                    <div className="text-3xl font-bold text-capas-turquoise mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-capas-ocean-dark">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* Grid View */
          <section className="mobile-section-padding bg-capas-sand-light">
            <div className="mobile-safe-container">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${searchTerm}-${JSON.stringify(filters)}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mobile-grid-auto"
                >
                  {filteredAlumni.map((alum, index) => (
                    <motion.div
                      key={alum.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="mobile-card-enhanced bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedAlumni(alum)}
                    >
                      <div className="relative">
                        <div className="mobile-image-wrapper h-48">
                          <PlaceholderImage
                            width={300}
                            height={192}
                            text={alum.name}
                            variant="portrait"
                            colorScheme={alum.industry === 'Entertainment' ? 'coral' : 
                                        alum.industry === 'Education' ? 'turquoise' : 
                                        alum.industry === 'Technology' ? 'palm' : 'gold'}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 space-y-1">
                          {alum.featured && (
                            <span className="block bg-capas-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          )}
                          {alum.mentorshipAvailable && (
                            <span className="block bg-capas-turquoise text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Mentor
                            </span>
                          )}
                        </div>

                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 text-capas-ocean-dark px-2 py-1 rounded-full text-xs font-semibold">
                            &apos;{alum.graduationYear.toString().slice(-2)}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-1 group-hover:text-capas-turquoise-dark transition-colors">
                          {alum.name}
                        </h3>
                        <p className="text-capas-gold font-medium text-sm mb-1">{alum.currentPosition}</p>
                        <p className="text-capas-ocean-dark text-sm mb-2 line-clamp-1">{alum.company}</p>
                        
                        {/* Location and Program */}
                        <div className="flex items-center justify-between text-xs text-capas-ocean-dark/70 mb-3">
                          <span>{alum.location}</span>
                          <span>{alum.program}</span>
                        </div>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {alum.skills.slice(0, 2).map((skill) => (
                            <span key={skill} className="text-xs bg-capas-sand-light text-capas-ocean-dark px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {alum.skills.length > 2 && (
                            <span className="text-xs text-capas-turquoise">
                              +{alum.skills.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Achievement Count */}
                        <div className="pt-3 border-t border-capas-ocean-light/20">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-capas-ocean-dark/70">
                              {alum.achievements.length} achievement{alum.achievements.length !== 1 ? 's' : ''}
                            </span>
                            <div className="flex space-x-1">
                              {alum.social.linkedin && <GlobeAltIcon className="w-4 h-4 text-capas-turquoise" />}
                              {alum.social.website && <GlobeAltIcon className="w-4 h-4 text-capas-coral" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {filteredAlumni.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <UserGroupIcon className="w-16 h-16 text-capas-ocean-light/50 mx-auto mb-4" />
                  <h3 className="font-montserrat text-2xl font-semibold text-capas-turquoise mb-2">
                    No Alumni Found
                  </h3>
                  <p className="text-capas-ocean-dark mb-6">
                    Try adjusting your search criteria or browse all alumni.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilters({
                        graduationYear: 'all',
                        program: 'all',
                        industry: 'all',
                        location: 'all'
                      });
                    }}
                    className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 font-montserrat"
                  >
                    Show All Alumni
                  </button>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* Alumni Detail Modal */}
        <AnimatePresence>
          {selectedAlumni && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedAlumni(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal content would go here - similar structure to faculty modal */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                      {selectedAlumni.name}
                    </h2>
                    <button
                      onClick={() => setSelectedAlumni(null)}
                      className="w-8 h-8 bg-capas-sand-light hover:bg-capas-ocean-light rounded-full flex items-center justify-center text-capas-ocean-dark hover:text-white transition-colors"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <p className="text-capas-ocean-dark leading-relaxed mb-6">
                        {selectedAlumni.story}
                      </p>
                      
                      {/* More detailed content would be here */}
                    </div>
                    
                    <div>
                      <div className="bg-capas-sand-light rounded-lg p-6">
                        <h3 className="font-bold text-capas-turquoise mb-4">Current Position</h3>
                        <p className="text-capas-gold font-semibold">{selectedAlumni.currentPosition}</p>
                        <p className="text-capas-ocean-dark">{selectedAlumni.company}</p>
                        <p className="text-capas-ocean-dark/70 text-sm mt-2">{selectedAlumni.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}