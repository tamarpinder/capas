'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  DocumentTextIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import { PlayIcon } from '@heroicons/react/24/solid';
import PlaceholderImage from '@/components/PlaceholderImage';
import Footer from '@/components/Footer';
import programsData from '../../../../mocks/programs.json';

export default function AdmissionsPage() {
  const { admissionInfo } = programsData;

  const applicationSteps = [
    {
      step: 1,
      title: 'Submit Application',
      description: 'Complete our online application form with personal information and program preferences.',
      deadline: 'Before audition date',
      icon: DocumentTextIcon
    },
    {
      step: 2,
      title: 'Schedule Audition',
      description: 'Book your audition slot online. Virtual and in-person options available.',
      deadline: '2 weeks before deadline',
      icon: CalendarDaysIcon
    },
    {
      step: 3,
      title: 'Prepare Portfolio',
      description: 'Gather required documents, recordings, and prepare audition material.',
      deadline: '1 week before audition',
      icon: UserGroupIcon
    },
    {
      step: 4,
      title: 'Attend Audition',
      description: 'Showcase your talent and passion for the arts in your chosen discipline.',
      deadline: 'On scheduled date',
      icon: PlayIcon
    }
  ];

  const auditionRequirements = {
    'Vocal Performance': [
      'Prepare 2 contrasting songs (one classical, one contemporary)',
      'One song must demonstrate Caribbean musical style',
      'Scales and sight-reading assessment',
      'Brief interview about musical goals'
    ],
    'Instrumental Performance': [
      'Perform 2 pieces of contrasting styles',
      'Technical exercises (scales, arpeggios)',
      'Sight-reading assessment',
      'Instrument-specific requirements available online'
    ],
    'Dance Performance': [
      'Learn and perform a short choreographed routine',
      'Demonstrate basic technique in chosen style',
      'Improvisation exercise to music',
      'Physical fitness and flexibility assessment'
    ],
    'Theatre Arts': [
      'Perform 2 contrasting monologues (2 minutes each)',
      'One contemporary, one classical piece',
      'Cold reading exercise',
      'Basic movement and voice warm-up'
    ]
  };

  const importantDates = [
    { event: 'Application Opens', date: 'January 15', color: 'text-capas-turquoise' },
    { event: 'Early Application Deadline', date: 'March 15', color: 'text-capas-gold' },
    { event: 'Audition Period', date: 'April 1-30', color: 'text-capas-coral' },
    { event: 'Final Application Deadline', date: 'June 1', color: 'text-capas-palm' },
    { event: 'Notification of Acceptance', date: 'June 15', color: 'text-capas-turquoise' },
    { event: 'Enrollment Confirmation', date: 'July 15', color: 'text-capas-ocean-dark' }
  ];

  const scholarshipInfo = [
    {
      name: 'Merit Scholarship',
      amount: 'Up to 50% tuition',
      criteria: 'Outstanding audition performance and academic record',
      icon: GiftIcon
    },
    {
      name: 'Community Service Award',
      amount: 'Up to 25% tuition',
      criteria: 'Demonstrated commitment to community involvement',
      icon: UserGroupIcon
    },
    {
      name: 'Financial Need Grant',
      amount: 'Varies',
      criteria: 'Based on family income and financial circumstances',
      icon: CurrencyDollarIcon
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-gold via-capas-coral to-capas-palm py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="url(#gradient1)"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-6">
                Admissions & Auditions
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 font-montserrat">
                Take the first step toward your artistic future. Join the CAPAS community and 
                discover your creative potential in the heart of the Caribbean.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#application-process"
                  className="bg-white hover:bg-white/90 text-capas-coral font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
                >
                  Start Application
                </Link>
                <Link
                  href="#important-dates"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 font-montserrat"
                >
                  View Deadlines
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Application Process Section */}
        <section id="application-process" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Application Process
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Follow these simple steps to begin your journey at CAPAS
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-capas-sand-light rounded-xl p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-capas-turquoise rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise mb-2">
                      {step.title}
                    </h3>
                    <p className="text-capas-ocean-dark mb-4 flex-grow">
                      {step.description}
                    </p>
                    <div className="flex items-center text-sm text-capas-coral font-medium">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      {step.deadline}
                    </div>
                  </div>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-4 w-8 h-0.5 bg-capas-turquoise/30"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Audition Requirements */}
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
                Audition Requirements
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Prepare for success with these program-specific audition guidelines
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(auditionRequirements).map(([program, requirements], index) => (
                <motion.div
                  key={program}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                    {program}
                  </h3>
                  <ul className="space-y-3">
                    {requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-capas-gold mt-0.5 flex-shrink-0" />
                        <span className="text-capas-ocean-dark">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-capas-coral/10 border border-capas-coral/20 rounded-xl p-6 mt-12"
            >
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-capas-coral mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-capas-coral mb-2">Important Audition Notes</h3>
                  <ul className="text-capas-ocean-dark space-y-1 text-sm">
                    <li>• All audition material should be memorized</li>
                    <li>• Accompanist will be provided for vocal auditions</li>
                    <li>• Bring sheet music in the correct key</li>
                    <li>• Virtual auditions available for out-of-country applicants</li>
                    <li>• Recording equipment available on campus if needed</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Important Dates */}
        <section id="important-dates" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full order-2 lg:order-1"
              >
                <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-capas-turquoise mb-4 sm:mb-6 text-center lg:text-left">
                  Important Dates
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-capas-ocean-dark mb-6 sm:mb-8 text-center lg:text-left leading-relaxed">
                  Mark your calendar with these crucial admission deadlines and events. 
                  Early application is encouraged for the best chance of acceptance and scholarship consideration.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  {importantDates.map((item, index) => (
                    <motion.div
                      key={item.event}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-capas-sand-light rounded-lg space-y-1 sm:space-y-0"
                    >
                      <span className="font-medium text-capas-ocean-dark text-sm sm:text-base text-center sm:text-left">{item.event}</span>
                      <span className={`font-bold text-sm sm:text-base text-center ${item.color}`}>{item.date}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full relative order-1 lg:order-2"
              >
                <div className="aspect-square relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl">
                  <PlaceholderImage
                    width={500}
                    height={500}
                    text="CAPAS Auditions"
                    variant="gradient"
                    colorScheme="gold"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 bg-white p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl shadow-lg border-l-4 border-capas-coral">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-capas-turquoise">95%</div>
                  <div className="text-capas-ocean-dark text-xs sm:text-sm lg:text-base">Acceptance Rate</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Scholarships Section */}
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
                Scholarships & Financial Aid
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Make your artistic dreams affordable with our comprehensive financial aid options
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {scholarshipInfo.map((scholarship, index) => (
                <motion.div
                  key={scholarship.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-capas-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <scholarship.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2">
                    {scholarship.name}
                  </h3>
                  <div className="text-2xl font-bold text-capas-coral mb-4">
                    {scholarship.amount}
                  </div>
                  <p className="text-capas-ocean-dark text-sm">
                    {scholarship.criteria}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg text-capas-ocean-dark mb-6">
                All scholarship applications are due with your program application. No separate forms required.
              </p>
              <Link
                href="/students/financial-aid"
                className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
              >
                Learn More About Financial Aid
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-capas-turquoise to-capas-ocean">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-4xl font-bold text-white mb-6">
                Ready to Join CAPAS?
              </h2>
              <p className="text-xl text-white/90 mb-8 font-montserrat">
                Your creative journey starts here. Apply today and become part of the Caribbean&apos;s 
                premier performing arts community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/how-to-apply"
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 font-montserrat"
                >
                  Contact Admissions
                </Link>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white/90">
                  <div className="flex items-center space-x-2">
                    <span>📧</span>
                    <span>{admissionInfo.contactInfo.admissions}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>{admissionInfo.contactInfo.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}