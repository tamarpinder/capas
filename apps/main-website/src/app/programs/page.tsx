'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  StarIcon, 
  UserGroupIcon,
  ArrowRightIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import programsData from '../../../mocks/programs.json';

interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  duration: string;
  credits: number;
  description: string;
  longDescription: string;
  tuition: string;
  scholarships: boolean;
  featured: boolean;
  admissionRequirements: string[];
  careerOutcomes: string[];
}

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setPrograms(programsData.programs);
      setLoading(false);
    }, 100);
  }, []);

  const filteredPrograms = programs.filter(program => {
    return selectedCategory === 'all' || program.category === selectedCategory;
  });

  const categories = [
    { id: 'all', name: 'All Programs', count: programs.length },
    { id: 'full-time', name: 'Full-Time Programs', count: programs.filter(p => p.category === 'full-time').length },
    { id: 'part-time', name: 'Part-Time Programs', count: programs.filter(p => p.category === 'part-time').length },
  ];

  if (loading) {
    return (
      <>
        {/* NextSeo temporarily removed */}
        <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-capas-ocean-dark font-montserrat">Loading programs...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* NextSeo temporarily removed */}
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,100 C300,0 600,200 900,100 C1200,0 1440,100 1440,100 L1440,400 L0,400 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
                Our Programs
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Discover innovative programs that blend Caribbean culture with cutting-edge education
              </p>
            </motion.div>
          </div>
        </section>

        {/* Program Categories Filter */}
        <section className="py-12 bg-white border-b border-capas-ocean-light/30" role="navigation" aria-label="Program categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center space-x-2 mb-4">
                <FunnelIcon className="h-5 w-5 text-capas-ocean-dark" aria-hidden="true" />
                <span className="text-capas-ocean-dark font-medium font-montserrat">Filter by Category:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 font-montserrat ${
                    selectedCategory === category.id
                      ? 'bg-capas-turquoise text-white shadow-lg'
                      : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light hover:shadow-md'
                  }`}
                  aria-pressed={selectedCategory === category.id}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-75">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-20 bg-capas-sand-light" role="main" aria-label="Programs listing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <p className="text-capas-ocean-dark font-montserrat">
                Showing {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPrograms.map((program, index) => (
                  <motion.article
                    key={program.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-capas-ocean-light/20"
                  >
                    {/* Program Header */}
                    <div className="h-48 relative overflow-hidden">
                      <PlaceholderImage
                        width={400}
                        height={192}
                        text={program.type}
                        variant="gradient"
                        colorScheme={program.category === 'full-time' ? 'turquoise' : 'coral'}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      
                      {/* Featured Badge */}
                      {program.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                            <StarIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-block bg-white/90 text-capas-turquoise px-3 py-1 rounded-full text-sm font-semibold capitalize">
                          {program.category === 'full-time' ? 'Full-Time' : 'Part-Time'}
                        </span>
                      </div>

                      {/* Program Type */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-semibold text-lg">
                          {program.type}
                        </span>
                      </div>
                    </div>

                    {/* Program Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                          {program.title}
                        </h3>
                      </div>

                      {/* Program Meta */}
                      <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70 mb-4">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <AcademicCapIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                          <span>{program.credits} Credits</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-capas-ocean-dark mb-4 line-clamp-3 leading-relaxed">
                        {program.description}
                      </p>

                      {/* Tuition & Scholarships */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-capas-gold font-bold text-lg">
                          {program.tuition}
                        </span>
                        {program.scholarships && (
                          <span className="inline-flex items-center text-capas-palm text-sm font-medium">
                            <CheckIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                            Scholarships Available
                          </span>
                        )}
                      </div>

                      {/* Call to Action */}
                      <Link
                        href={`/programs/${program.slug}`}
                        className="w-full bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-montserrat inline-flex items-center justify-center group"
                        aria-label={`Learn more about ${program.title}`}
                      >
                        <span>Learn More</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredPrograms.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4" aria-hidden="true">🎓</div>
                <h3 className="font-montserrat text-2xl font-semibold text-capas-turquoise mb-2">
                  No programs found
                </h3>
                <p className="text-capas-ocean-dark mb-6">
                  Try selecting a different category to see more programs.
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200 font-montserrat"
                >
                  Show All Programs
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Admissions Information */}
        <section className="py-20 bg-white" role="complementary" aria-labelledby="admissions-info">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 id="admissions-info" className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Ready to Apply?
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Join our vibrant community of creative learners and cultural innovators
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Application Deadlines',
                  items: [
                    `Fall Semester: ${programsData.admissionInfo.applicationDeadlines.fall}`,
                    `Spring Semester: ${programsData.admissionInfo.applicationDeadlines.spring}`
                  ],
                  icon: ClockIcon,
                  color: 'bg-capas-coral'
                },
                {
                  title: 'Scholarships Available',
                  items: [
                    'Merit-based scholarships up to 50%',
                    'Need-based financial aid',
                    'Cultural arts preservation scholarships'
                  ],
                  icon: StarIcon,
                  color: 'bg-capas-gold'
                },
                {
                  title: 'Support Services',
                  items: [
                    'Academic advisement',
                    'Career counseling',
                    'Student life programs'
                  ],
                  icon: UserGroupIcon,
                  color: 'bg-capas-palm'
                }
              ].map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                    {info.title}
                  </h3>
                  <ul className="space-y-2">
                    {info.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-capas-ocean-dark">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/how-to-apply"
                className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat inline-flex items-center space-x-2"
              >
                <span>Start Your Application</span>
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}