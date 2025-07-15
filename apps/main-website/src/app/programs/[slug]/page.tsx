'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  AcademicCapIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckIcon,
  ArrowLeftIcon,
  CalendarIcon,
  BookOpenIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import programsData from '../../../../mocks/programs.json';

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

interface ProgramPageProps {
  params: { slug: string };
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPrograms, setRelatedPrograms] = useState<Program[]>([]);

  useEffect(() => {
    // Find program by slug
    const foundProgram = programsData.programs.find(p => p.slug === params.slug);
    
    if (!foundProgram) {
      notFound();
      return;
    }

    // Find related programs (same category, different program)
    const related = programsData.programs
      .filter(p => p.category === foundProgram.category && p.id !== foundProgram.id)
      .slice(0, 3);

    setTimeout(() => {
      setProgram(foundProgram);
      setRelatedPrograms(related);
      setLoading(false);
    }, 100);
  }, [params.slug]);

  if (loading) {
    return (
      <>
        {/* NextSeo temporarily removed */}
        <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-capas-ocean-dark font-montserrat">Loading program details...</p>
          </div>
        </div>
      </>
    );
  }

  if (!program) {
    notFound();
  }

  return (
    <>
      {/* NextSeo
        title={`${program.title} | CAPAS Bahamas`}
        description={program.description}
        canonical={`https://capas.edu.bs/programs/${program.slug}`}
        openGraph={{
          url: `https://capas.edu.bs/programs/${program.slug}`,
          title: `${program.title} | CAPAS Bahamas`,
          description: program.description,
          images: [
            {
              url: `https://capas.edu.bs/programs/${program.slug}-og.jpg`,
              width: 1200,
              height: 630,
              alt: program.title,
            },
          ],
        }}
      */}

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <section className="bg-capas-sand-light py-4 border-b border-capas-ocean-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                    Home
                  </Link>
                </li>
                <span className="text-capas-ocean-dark/50">/</span>
                <li>
                  <Link href="/programs" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                    Programs
                  </Link>
                </li>
                <span className="text-capas-ocean-dark/50">/</span>
                <li className="text-capas-turquoise font-medium truncate">
                  {program.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Back Button */}
        <section className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/programs"
              className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark transition-colors font-montserrat font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
              Back to Programs
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,100 C300,0 600,200 900,100 C1200,0 1440,100 1440,100 L1440,400 L0,400 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold capitalize">
                    {program.category === 'full-time' ? 'Full-Time Program' : 'Part-Time Program'}
                  </span>
                  {program.featured && (
                    <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <StarIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                      Featured
                    </span>
                  )}
                </div>
                
                <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
                  {program.title}
                </h1>
                
                <p className="text-xl md:text-2xl opacity-90 font-montserrat mb-8">
                  {program.description}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <AcademicCapIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span>{program.credits} Credits</span>
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    <span className="font-semibold">{program.tuition}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:text-right"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="font-montserrat text-2xl font-bold mb-4">Ready to Apply?</h3>
                  <p className="text-white/90 mb-6">
                    Join our vibrant community and begin your creative journey.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/how-to-apply"
                      className="block w-full bg-capas-gold hover:bg-capas-gold-dark text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 font-montserrat text-center"
                    >
                      Apply Now
                    </Link>
                    <Link
                      href="/programs/admissions"
                      className="block w-full border-2 border-white text-white hover:bg-white hover:text-capas-turquoise font-semibold py-3 px-6 rounded-lg transition-all duration-200 font-montserrat text-center"
                    >
                      View Requirements
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Program Details */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Program Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-6">
                    Program Overview
                  </h2>
                  <div className="prose prose-lg max-w-none text-capas-ocean-dark">
                    <p className="leading-relaxed">{program.longDescription}</p>
                  </div>
                </motion.div>

                {/* Admission Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-6 flex items-center">
                    <BookOpenIcon className="w-6 h-6 mr-3" aria-hidden="true" />
                    Admission Requirements
                  </h3>
                  <ul className="space-y-3">
                    {program.admissionRequirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-capas-palm mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-capas-ocean-dark">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Career Outcomes */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-6 flex items-center">
                    <UserGroupIcon className="w-6 h-6 mr-3" aria-hidden="true" />
                    Career Outcomes
                  </h3>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {program.careerOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-capas-palm mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-capas-ocean-dark">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Program Quick Facts */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                    Quick Facts
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-capas-ocean-light/30">
                      <span className="font-medium text-capas-ocean-dark">Duration</span>
                      <span className="text-capas-turquoise font-semibold">{program.duration}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-capas-ocean-light/30">
                      <span className="font-medium text-capas-ocean-dark">Credits</span>
                      <span className="text-capas-turquoise font-semibold">{program.credits}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-capas-ocean-light/30">
                      <span className="font-medium text-capas-ocean-dark">Type</span>
                      <span className="text-capas-turquoise font-semibold capitalize">{program.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-capas-ocean-light/30">
                      <span className="font-medium text-capas-ocean-dark">Tuition</span>
                      <span className="text-capas-gold font-bold">{program.tuition}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-capas-ocean-dark">Scholarships</span>
                      <span className={`font-semibold ${program.scholarships ? 'text-capas-palm' : 'text-capas-ocean-dark/60'}`}>
                        {program.scholarships ? 'Available' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Important Dates */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Important Dates
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-capas-ocean-dark">Fall Application Deadline</p>
                      <p className="text-capas-turquoise font-semibold">{programsData.admissionInfo.applicationDeadlines.fall}</p>
                    </div>
                    <div>
                      <p className="font-medium text-capas-ocean-dark">Spring Application Deadline</p>
                      <p className="text-capas-turquoise font-semibold">{programsData.admissionInfo.applicationDeadlines.spring}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-capas-turquoise text-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="font-montserrat text-xl font-bold mb-4">
                    Have Questions?
                  </h3>
                  <p className="mb-4 opacity-90">
                    Our admissions team is here to help guide you through the application process.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-white text-capas-turquoise font-semibold py-3 px-4 rounded-lg text-center hover:bg-capas-sand-light transition-colors duration-200 font-montserrat"
                  >
                    Contact Admissions
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Programs */}
        {relatedPrograms.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                  Related Programs
                </h2>
                <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                  Explore other programs in the {program.category === 'full-time' ? 'full-time' : 'part-time'} category
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPrograms.map((relatedProgram, index) => (
                  <motion.article
                    key={relatedProgram.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-capas-sand-light rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-32 bg-gradient-to-br from-capas-turquoise to-capas-ocean relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white font-semibold">
                          {relatedProgram.type}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-3 line-clamp-2">
                        {relatedProgram.title}
                      </h3>
                      <p className="text-capas-ocean-dark mb-4 line-clamp-2">
                        {relatedProgram.description}
                      </p>
                      <Link
                        href={`/programs/${relatedProgram.slug}`}
                        className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}