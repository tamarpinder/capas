'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import { AcademicCapIcon, StarIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import VideoHero from '@/components/VideoHero';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';
import { useHeroContent } from '@/hooks/useHeroContent';
import newsEventsData from '../../mocks/news-events.json';
import programsData from '../../mocks/programs.json';

export default function Home() {
  const { heroContent, settings, loading } = useHeroContent();

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen">
      
      {/* Hero Section with Dynamic Video Background */}
      {!loading && heroContent.length > 0 ? (
        <VideoHero
          heroContent={heroContent}
          autoRotate={settings.autoRotate}
          rotationInterval={settings.rotationInterval}
          showVideoControls={settings.showVideoControls}
        />
      ) : (
        // Loading state with ocean theme
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="url(#gradient1)"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0A8A98" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#A8D5E2" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-montserrat text-lg">Loading CAPAS Experience...</p>
          </div>
        </section>
      )}

      {/* Portal Quick Access */}
      <section className="py-8 bg-capas-sand-light border-b border-capas-ocean-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <span className="text-capas-ocean-dark font-medium font-montserrat">Quick Access:</span>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/school-portal"
                className="text-capas-turquoise hover:text-capas-turquoise-dark font-medium underline underline-offset-4 transition-colors duration-200 font-montserrat"
              >
                School Portal →
              </Link>
              <Link 
                href="/creatives-hub"
                className="text-capas-coral hover:text-capas-coral-dark font-medium underline underline-offset-4 transition-colors duration-200 font-montserrat"
              >
                Creatives Hub →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
              Featured Programs
            </h2>
            <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
              Discover our innovative programs that blend Caribbean culture with world-class education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {programsData.programs.filter(program => program.featured).map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/programs/${program.slug}`} className="block group h-full">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-capas-ocean-light/20 h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      <PlaceholderImage
                        width={400}
                        height={192}
                        text={program.type}
                        variant="gradient"
                        colorScheme="turquoise"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute top-4 right-4">
                        {program.featured && (
                          <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                            <StarIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-white/90 text-capas-turquoise px-3 py-1 rounded-full text-sm font-semibold">
                          {program.category === 'full-time' ? 'Full-Time Program' : 'Part-Time Program'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-capas-ocean-dark mb-4 line-clamp-3 flex-grow">
                        {program.description}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-capas-gold font-semibold">{program.duration}</span>
                        <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/programs"
              className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat inline-flex items-center space-x-2"
            >
              <span>View All Programs</span>
              <AcademicCapIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Latest News & Events */}
      <section className="py-20 bg-capas-sand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
              Latest News & Events
            </h2>
            <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
              Stay connected with the CAPAS community and discover what&apos;s happening on campus
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsEventsData.newsArticles.slice(0, 2).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="md:col-span-1"
              >
                <Link href={`/news-events/${article.id}`} className="block group h-full">
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      <PlaceholderImage
                        width={400}
                        height={192}
                        text={article.category}
                        variant="gradient"
                        colorScheme={article.category === 'performances' ? 'gold' : article.category === 'partnerships' ? 'palm' : 'coral'}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/90 text-capas-coral px-3 py-1 rounded-full text-sm font-semibold capitalize">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-capas-ocean-dark mb-4 line-clamp-3 flex-grow">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70 mt-auto">
                        <span>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
            
            {newsEventsData.upcomingEvents.slice(0, 1).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="md:col-span-1"
              >
                <Link href={`/news-events/${event.id}`} className="block group h-full">
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    <div className="h-48 relative overflow-hidden flex-shrink-0">
                      <PlaceholderImage
                        width={400}
                        height={192}
                        text={event.title}
                        variant="gradient"
                        colorScheme="palm"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/90 text-capas-palm px-3 py-1 rounded-full text-sm font-semibold capitalize">
                          {event.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center text-white text-sm">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-capas-ocean-dark mb-4 line-clamp-3 flex-grow">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between text-sm mt-auto">
                        <span className="text-capas-palm font-semibold">{event.time}</span>
                        <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/news-events"
              className="bg-capas-coral hover:bg-capas-coral-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat inline-flex items-center space-x-2"
            >
              <span>View All News & Events</span>
              <CalendarIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </>
  );
}
