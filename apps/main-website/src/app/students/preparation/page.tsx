'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  CheckCircleIcon,
  HomeIcon,
  MapPinIcon,
  CreditCardIcon,
  PhoneIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  CalendarIcon,
  BookOpenIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const checklist = [
  {
    category: 'Application & Enrollment',
    items: [
      { task: 'Complete application form', completed: true },
      { task: 'Submit required documents', completed: true },
      { task: 'Attend audition/portfolio review', completed: true },
      { task: 'Receive acceptance letter', completed: true },
      { task: 'Confirm enrollment and pay deposit', pending: true },
      { task: 'Register for orientation session', pending: true }
    ],
    color: 'bg-capas-turquoise'
  },
  {
    category: 'Academic Preparation',
    items: [
      { task: 'Review program curriculum', pending: true },
      { task: 'Purchase required textbooks', pending: true },
      { task: 'Obtain art supplies/instruments', pending: true },
      { task: 'Set up student portal access', pending: true },
      { task: 'Schedule academic advising meeting', pending: true },
      { task: 'Plan course schedule', pending: true }
    ],
    color: 'bg-capas-gold'
  },
  {
    category: 'Campus Life',
    items: [
      { task: 'Secure housing arrangements', pending: true },
      { task: 'Apply for student ID card', pending: true },
      { task: 'Explore campus facilities', pending: true },
      { task: 'Join student organizations', pending: true },
      { task: 'Set up campus email account', pending: true },
      { task: 'Learn about student services', pending: true }
    ],
    color: 'bg-capas-coral'
  },
  {
    category: 'Financial Planning',
    items: [
      { task: 'Complete financial aid forms', pending: true },
      { task: 'Set up tuition payment plan', pending: true },
      { task: 'Apply for scholarships', pending: true },
      { task: 'Budget for living expenses', pending: true },
      { task: 'Open local bank account', pending: true },
      { task: 'Understand refund policies', pending: true }
    ],
    color: 'bg-capas-palm'
  }
];

const importantDates = [
  { date: 'June 1', event: 'Fall application deadline', type: 'deadline' },
  { date: 'July 15', event: 'Financial aid application due', type: 'deadline' },
  { date: 'August 10', event: 'Orientation week begins', type: 'event' },
  { date: 'August 15', event: 'Classes begin', type: 'event' },
  { date: 'September 1', event: 'Late registration deadline', type: 'deadline' },
  { date: 'September 15', event: 'Add/Drop period ends', type: 'deadline' }
];

const essentialInfo = [
  {
    title: 'Campus Location',
    icon: MapPinIcon,
    details: [
      'Main Campus: Nassau, New Providence',
      'Address: 123 Arts Boulevard, Nassau, Bahamas',
      'Parking: Available on campus',
      'Public Transport: Bus routes 5, 12, 18'
    ]
  },
  {
    title: 'Contact Information',
    icon: PhoneIcon,
    details: [
      'Main Office: (242) 123-4567',
      'Student Services: (242) 123-4568',
      'Email: info@capas.edu.bs',
      'Emergency: (242) 911'
    ]
  },
  {
    title: 'Office Hours',
    icon: ClockIcon,
    details: [
      'Monday - Friday: 8:00 AM - 6:00 PM',
      'Saturday: 9:00 AM - 2:00 PM',
      'Sunday: Closed',
      'Holiday hours may vary'
    ]
  },
  {
    title: 'Payment Methods',
    icon: CreditCardIcon,
    details: [
      'Cash payments accepted',
      'Credit/Debit cards (Visa, MasterCard)',
      'Bank transfers',
      'Payment plans available'
    ]
  }
];

const resources = [
  {
    title: 'Academic Resources',
    items: [
      'Library and Digital Resources',
      'Tutoring and Academic Support',
      'Career Services and Internships',
      'Study Abroad Programs'
    ]
  },
  {
    title: 'Student Support',
    items: [
      'Academic Advising',
      'Counseling Services',
      'Health and Wellness',
      'Disability Services'
    ]
  },
  {
    title: 'Campus Life',
    items: [
      'Student Organizations',
      'Cultural Events',
      'Recreation and Fitness',
      'Dining Services'
    ]
  },
  {
    title: 'Technology',
    items: [
      'WiFi and Computer Labs',
      'Student Portal Access',
      'Email and Communication',
      'Digital Learning Platforms'
    ]
  }
];

export default function PreparationPage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-coral via-capas-gold to-capas-turquoise py-24">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <div className="relative mobile-safe-container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRightIcon className="h-4 w-4 text-white/50" />
                <li>
                  <Link href="/students" className="text-white/70 hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
                <ChevronRightIcon className="h-4 w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">Getting Started</span>
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 px-4">
                Getting Started at CAPAS
              </h1>
              <p className="text-lg sm:text-xl max-w-3xl mx-auto text-white/90 px-4">
                Your comprehensive guide to preparing for an extraordinary journey in creative arts education
              </p>
            </motion.div>
          </div>
        </section>

        {/* Welcome Message */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise mb-6 text-center lg:text-left">
                  Welcome to the CAPAS Family!
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-capas-ocean-dark leading-relaxed text-center lg:text-left">
                  <p>
                    Congratulations on your acceptance to CAPAS Bahamas! You're about to embark on 
                    an exciting journey that will transform your artistic abilities and prepare you 
                    for a successful career in the creative industries.
                  </p>
                  <p>
                    This guide will help you navigate the transition to university life and ensure 
                    you're fully prepared for your first day. From enrollment procedures to campus 
                    resources, we've got everything covered.
                  </p>
                  <p>
                    Remember, our Student Services team is here to support you every step of the way. 
                    Don&apos;t hesitate to reach out if you have any questions or need assistance.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <PlaceholderImage
                  width={600}
                  height={400}
                  text="Welcome Students"
                  variant="gradient"
                  colorScheme="coral"
                  className="w-full h-96 rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pre-Arrival Checklist */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise mb-4">
                Pre-Arrival Checklist
              </h2>
              <p className="text-base sm:text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Stay organized and ensure you're fully prepared for your CAPAS experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {checklist.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-capas-ocean-light/20 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-8 h-8 ${category.color} rounded-full mr-3`}></div>
                    <h3 className="font-montserrat text-xl font-bold text-capas-turquoise">
                      {category.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircleIcon 
                          className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                            item.completed ? 'text-capas-palm' : 'text-capas-ocean-light'
                          }`} 
                        />
                        <span className={`${
                          item.completed 
                            ? 'text-capas-ocean-dark line-through' 
                            : 'text-capas-ocean-dark'
                        }`}>
                          {item.task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mr-3">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise">
                  Important Dates
                </h2>
              </div>
              <p className="text-base sm:text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Mark your calendar with these essential dates for the upcoming semester
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {importantDates.map((date, index) => (
                <motion.div
                  key={date.event}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-xl text-center ${
                    date.type === 'deadline' 
                      ? 'bg-capas-coral text-white' 
                      : 'bg-white border-2 border-capas-ocean-light/20'
                  }`}
                >
                  <div className={`text-2xl font-bold mb-2 ${
                    date.type === 'deadline' ? 'text-white' : 'text-capas-turquoise'
                  }`}>
                    {date.date}
                  </div>
                  <h3 className={`font-semibold ${
                    date.type === 'deadline' ? 'text-white' : 'text-capas-ocean-dark'
                  }`}>
                    {date.event}
                  </h3>
                  <span className={`text-sm px-3 py-1 rounded-full mt-3 inline-block ${
                    date.type === 'deadline' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-capas-palm text-white'
                  }`}>
                    {date.type === 'deadline' ? 'Deadline' : 'Event'}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Essential Information */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise mb-4">
                Essential Information
              </h2>
              <p className="text-base sm:text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Key details you'll need for your first semester at CAPAS
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {essentialInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-capas-sand-light hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center mr-3">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise">
                      {info.title}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-capas-ocean-dark">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Resources */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-palm rounded-full flex items-center justify-center mr-3">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise">
                  Campus Resources
                </h2>
              </div>
              <p className="text-base sm:text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Discover the wealth of resources available to support your academic and personal growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white hover:shadow-lg transition-shadow duration-300 rounded-xl p-6"
                >
                  <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4">
                    {resource.title}
                  </h3>
                  
                  <ul className="space-y-2">
                    {resource.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                        <ArrowRightIcon className="w-4 h-4 text-capas-gold mt-0.5 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mobile-section-padding bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold mb-6">
                Ready for Your CAPAS Journey?
              </h2>
              <p className="text-lg sm:text-xl leading-relaxed mb-8 text-white/90">
                You're well on your way to joining the CAPAS community. As you prepare for your 
                first semester, remember that this is just the beginning of an incredible journey 
                of artistic and personal growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <AcademicCapIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Learn</h3>
                  <p className="text-white/80">Excel in your chosen artistic discipline</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <UserGroupIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Connect</h3>
                  <p className="text-white/80">Build lifelong friendships and networks</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <HomeIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Belong</h3>
                  <p className="text-white/80">Become part of the CAPAS family</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <div className="bg-capas-sand-light rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                Need Help Getting Started?
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                Our Student Services team is here to help you every step of the way
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Contact Student Services
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/students/life"
                  className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Explore Student Life
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}