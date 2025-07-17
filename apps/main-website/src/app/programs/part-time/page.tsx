'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon,
  CalendarIcon,
  AcademicCapIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import PlaceholderImage from '@/components/PlaceholderImage';
import Footer from '@/components/Footer';
import programsData from '../../../../mocks/programs.json';

export default function PartTimePrograms() {
  const partTimePrograms = programsData.programs.filter(program => program.category === 'part-time');

  const benefits = [
    {
      icon: ClockIcon,
      title: 'Flexible Scheduling',
      description: 'Evening and weekend classes designed for working adults and busy lifestyles.'
    },
    {
      icon: UserGroupIcon,
      title: 'Community Focus',
      description: 'Build connections with fellow community members sharing similar interests.'
    },
    {
      icon: StarIcon,
      title: 'Quality Education',
      description: 'Same expert faculty and high standards as our full-time programs.'
    },
    {
      icon: AcademicCapIcon,
      title: 'Affordable Options',
      description: 'Accessible tuition rates with scholarship opportunities available.'
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark mobile-section-padding overflow-hidden">
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
          
          <div className="relative mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-6">
                Part-Time Programs
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 font-montserrat">
                Pursue your artistic passion while maintaining your current lifestyle with our flexible, 
                community-focused part-time programs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/programs/admissions"
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
                >
                  Apply Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 font-montserrat"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
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
                Why Choose Part-Time Study?
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Our part-time programs are designed to fit your life, not disrupt it
              </p>
            </motion.div>

            <div className="mobile-grid-auto lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-capas-sand-light rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-capas-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-capas-ocean-dark">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Available Part-Time Programs
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Choose from our selection of community-focused programs
              </p>
            </motion.div>

            <div className="mobile-grid-auto lg:grid-cols-3">
              {partTimePrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/programs/${program.slug}`} className="block group h-full">
                    <div className="mobile-card-enhanced bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-capas-ocean-light/20 h-full flex flex-col">
                      <div className="mobile-image-wrapper h-48 flex-shrink-0">
                        <PlaceholderImage
                          width={400}
                          height={192}
                          text={program.type}
                          variant="gradient"
                          colorScheme="coral"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-block bg-capas-coral text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Part-Time
                          </span>
                        </div>
                      </div>
                      <div className="mobile-card-container flex-grow flex flex-col">
                        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors">
                          {program.title}
                        </h3>
                        <p className="text-capas-ocean-dark mb-4 line-clamp-3 flex-grow">
                          {program.description}
                        </p>
                        <div className="space-y-2 mt-auto">
                          <div className="flex items-center text-sm text-capas-ocean-dark/70">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            <span>{program.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-capas-ocean-dark/70">
                            <AcademicCapIcon className="w-4 h-4 mr-2" />
                            <span>{program.credits} credits</span>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-capas-gold font-semibold">{program.tuition}</span>
                            <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                              Learn More →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Class Schedule Information */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <div className="mobile-grid-auto lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-6">
                  Flexible Class Schedules
                </h2>
                <p className="text-lg text-capas-ocean-dark mb-6">
                  Our part-time programs are specifically designed to accommodate working adults and 
                  community members with busy schedules. We offer multiple timing options to ensure 
                  you can pursue your artistic goals.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="w-6 h-6 text-capas-turquoise mt-1" />
                    <div>
                      <h3 className="font-semibold text-capas-ocean-dark">Evening Classes</h3>
                      <p className="text-capas-ocean-dark/70">Monday - Thursday, 6:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CalendarIcon className="w-6 h-6 text-capas-turquoise mt-1" />
                    <div>
                      <h3 className="font-semibold text-capas-ocean-dark">Weekend Workshops</h3>
                      <p className="text-capas-ocean-dark/70">Saturdays, 9:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="w-6 h-6 text-capas-turquoise mt-1" />
                    <div>
                      <h3 className="font-semibold text-capas-ocean-dark">Community Locations</h3>
                      <p className="text-capas-ocean-dark/70">Main campus and select community centers</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/students/calendar"
                  className="inline-flex items-center space-x-2 bg-capas-coral hover:bg-capas-coral-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat mt-6"
                >
                  <span>View Full Calendar</span>
                  <CalendarIcon className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative mobile-content-wrapper"
              >
                <div className="mobile-image-wrapper aspect-square rounded-2xl shadow-2xl">
                  <PlaceholderImage
                    width={500}
                    height={500}
                    text="Community Arts Classes"
                    variant="gradient"
                    colorScheme="palm"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 lg:p-6 rounded-xl shadow-lg border-l-4 border-capas-gold max-w-max">
                  <div className="text-responsive-xl font-bold text-capas-turquoise">150+</div>
                  <div className="text-capas-ocean-dark text-responsive-sm">Community Members</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Application CTA */}
        <section className="mobile-section-padding bg-gradient-to-r from-capas-turquoise to-capas-ocean">
          <div className="mobile-safe-container mobile-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-4xl font-bold text-white mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 font-montserrat">
                Join our vibrant community of part-time learners and discover your artistic potential
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/programs/admissions"
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg font-montserrat"
                >
                  Start Application
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 font-montserrat"
                >
                  Contact Admissions
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}