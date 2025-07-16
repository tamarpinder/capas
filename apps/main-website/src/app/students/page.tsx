'use client';

import { motion } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  CalendarIcon,
  BuildingLibraryIcon,
  UserGroupIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';

export default function StudentsPage() {
  const studentResources = [
    {
      title: 'Preparing for Day 1',
      description: 'Everything you need to know before your first day at CAPAS',
      href: '/students/preparation',
      icon: AcademicCapIcon,
      color: 'bg-capas-turquoise',
      items: [
        'Orientation schedule and requirements',
        'What to bring on your first day',
        'Campus tour and facility introductions',
        'Academic advisor meetings'
      ]
    },
    {
      title: 'Code of Conduct',
      description: 'Community standards and behavioral expectations',
      href: '/students/conduct',
      icon: DocumentTextIcon,
      color: 'bg-capas-coral',
      items: [
        'Academic integrity policies',
        'Professional behavior standards',
        'Attendance and punctuality requirements',
        'Disciplinary procedures'
      ]
    },
    {
      title: 'School Calendar',
      description: 'Important dates, holidays, and academic schedules',
      href: '/students/calendar',
      icon: CalendarIcon,
      color: 'bg-capas-gold',
      items: [
        'Semester start and end dates',
        'Registration deadlines',
        'Performance and showcase dates',
        'Holiday breaks and closures'
      ]
    },
    {
      title: 'Campus Facilities',
      description: 'Explore our world-class facilities and resources',
      href: '/students/facilities',
      icon: BuildingLibraryIcon,
      color: 'bg-capas-palm',
      items: [
        'Performance halls and studios',
        'Practice rooms and equipment',
        'Library and study spaces',
        'Student common areas'
      ]
    }
  ];

  const quickLinks = [
    {
      title: 'Student Portal',
      description: 'Access grades, schedules, and academic records',
      href: 'https://capas-school-portal.netlify.app/',
      color: 'bg-capas-turquoise hover:bg-capas-turquoise-dark'
    },
    {
      title: 'Academic Calendar',
      description: 'View important dates and deadlines',
      href: '/students/calendar',
      color: 'bg-capas-gold hover:bg-capas-gold-dark'
    },
    {
      title: 'Contact Support',
      description: 'Get help with student services',
      href: '/contact',
      color: 'bg-capas-coral hover:bg-capas-coral-dark'
    }
  ];

  const emergencyInfo = {
    title: 'Emergency Information',
    contacts: [
      { label: 'Campus Security', phone: '(242) 123-4567', available: '24/7' },
      { label: 'Student Services', phone: '(242) 123-4568', available: 'Mon-Fri 8AM-5PM' },
      { label: 'Health Services', phone: '(242) 123-4569', available: 'Mon-Fri 9AM-4PM' }
    ]
  };

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
                Student Information
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Everything you need to succeed at CAPAS Bahamas
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-capas-sand-light border-b border-capas-ocean-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block ${link.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <h3 className="font-montserrat text-xl font-bold mb-2">
                      {link.title}
                    </h3>
                    <p className="opacity-90">
                      {link.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Student Resources */}
        <section className="py-20 bg-white" role="main" aria-label="Student resources">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Essential Resources
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                Access important information and resources for your CAPAS journey
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {studentResources.map((resource, index) => (
                <motion.article
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-capas-sand-light rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${resource.color} w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <resource.icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-3 group-hover:text-capas-turquoise-dark transition-colors">
                        {resource.title}
                      </h3>
                      
                      <p className="text-capas-ocean-dark mb-4 leading-relaxed">
                        {resource.description}
                      </p>

                      <ul className="space-y-2 mb-6">
                        {resource.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm text-capas-ocean-dark/80">
                            <span className="w-1.5 h-1.5 bg-capas-turquoise rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={resource.href}
                        className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors group-hover:translate-x-1 duration-200"
                      >
                        <span>Learn More</span>
                        <svg className="w-4 h-4 ml-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency Information */}
        <section className="py-20 bg-capas-sand-light" role="complementary" aria-labelledby="emergency-info">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 id="emergency-info" className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Emergency Information
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                Important contacts for urgent situations
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {emergencyInfo.contacts.map((contact) => (
                    <div key={contact.label} className="text-center">
                      <div className="bg-capas-coral w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PhoneIcon className="w-8 h-8 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                        {contact.label}
                      </h3>
                      <a
                        href={`tel:${contact.phone}`}
                        className="block text-capas-ocean-dark hover:text-capas-turquoise transition-colors font-medium mb-1"
                      >
                        {contact.phone}
                      </a>
                      <p className="text-sm text-capas-ocean-dark/70">
                        {contact.available}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-capas-coral/10 rounded-lg">
                  <div className="flex items-start">
                    <MapPinIcon className="w-5 h-5 text-capas-coral mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h4 className="font-medium text-capas-coral">Campus Location</h4>
                      <p className="text-sm text-capas-ocean-dark mt-1">
                        123 Creative Arts Boulevard<br />
                        Nassau, New Providence<br />
                        The Bahamas
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Support Services */}
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
                Student Support Services
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                We&apos;re here to support your academic and personal success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Academic Advising',
                  description: 'Get guidance on course selection, degree planning, and academic goals.',
                  icon: AcademicCapIcon,
                  color: 'bg-capas-turquoise'
                },
                {
                  title: 'Student Life',
                  description: 'Engage in campus activities, clubs, and social events.',
                  icon: UserGroupIcon,
                  color: 'bg-capas-gold'
                },
                {
                  title: 'Career Services',
                  description: 'Prepare for your future with career counseling and job placement assistance.',
                  icon: ClockIcon,
                  color: 'bg-capas-palm'
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <service.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                    {service.title}
                  </h3>
                  <p className="text-capas-ocean-dark leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}