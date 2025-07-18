'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon,
  MusicalNoteIcon,
  FilmIcon,
  HeartIcon,
  SparklesIcon,
  CalendarIcon,
  TrophyIcon,
  HomeIcon,
  AcademicCapIcon,
  CameraIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BookOpenIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const studentOrganizations = [
  {
    name: 'CAPAS Student Government',
    type: 'Leadership',
    description: 'The voice of the student body, organizing events and advocating for student interests.',
    members: 25,
    activities: ['Monthly meetings', 'Student advocacy', 'Event planning', 'Policy input'],
    icon: UserGroupIcon,
    color: 'bg-capas-turquoise'
  },
  {
    name: 'Caribbean Music Ensemble',
    type: 'Performance',
    description: 'Celebrating traditional and contemporary Caribbean music through performances and workshops.',
    members: 45,
    activities: ['Weekly rehearsals', 'Public performances', 'Cultural workshops', 'Community outreach'],
    icon: MusicalNoteIcon,
    color: 'bg-capas-gold'
  },
  {
    name: 'Drama Society',
    type: 'Theatre',
    description: 'Producing original and classic theatrical works while exploring Caribbean storytelling.',
    members: 35,
    activities: ['Three annual productions', 'Script writing workshops', 'Acting masterclasses'],
    icon: FilmIcon,
    color: 'bg-capas-coral'
  },
  {
    name: 'Visual Arts Collective',
    type: 'Arts',
    description: 'A community of visual artists showcasing work and collaborating on creative projects.',
    members: 30,
    activities: ['Monthly exhibitions', 'Collaborative murals', 'Art therapy sessions'],
    icon: PaintBrushIcon,
    color: 'bg-capas-palm'
  },
  {
    name: 'CAPAS Ambassadors',
    type: 'Service',
    description: 'Representing CAPAS at events and supporting prospective students through their journey.',
    members: 20,
    activities: ['Campus tours', 'Prospective student mentoring', 'Community events'],
    icon: SparklesIcon,
    color: 'bg-capas-ocean'
  },
  {
    name: 'Photography Club',
    type: 'Media',
    description: 'Capturing campus life and developing photographic skills through workshops and exhibitions.',
    members: 18,
    activities: ['Photo walks', 'Digital workshops', 'Annual photo exhibition'],
    icon: CameraIcon,
    color: 'bg-capas-turquoise'
  }
];

const campusEvents = [
  {
    title: 'Spring Arts Showcase',
    frequency: 'Annual',
    description: 'The flagship event showcasing student talent across all disciplines.',
    highlights: ['Student performances', 'Art exhibitions', 'Community celebration'],
    month: 'April'
  },
  {
    title: 'Junkanoo Festival',
    frequency: 'Annual',
    description: 'Celebrating Bahamian culture with traditional music, dance, and costumes.',
    highlights: ['Traditional performances', 'Costume competition', 'Cultural workshops'],
    month: 'December'
  },
  {
    title: 'Open Mic Nights',
    frequency: 'Monthly',
    description: 'Casual performances where students share their creative work.',
    highlights: ['Student performances', 'Networking', 'Creative expression'],
    month: 'Every month'
  },
  {
    title: 'Culture Week',
    frequency: 'Semester',
    description: 'Week-long celebration of Caribbean arts and heritage.',
    highlights: ['Guest artists', 'Workshops', 'Cultural presentations'],
    month: 'October'
  },
  {
    title: 'Career Fair',
    frequency: 'Annual',
    description: 'Connecting students with internship and career opportunities.',
    highlights: ['Industry professionals', 'Portfolio reviews', 'Networking'],
    month: 'February'
  },
  {
    title: 'Community Service Day',
    frequency: 'Semester',
    description: 'Students give back to the community through arts-based service projects.',
    highlights: ['Community partnerships', 'Arts outreach', 'Social impact'],
    month: 'March & September'
  }
];

const campusLife = [
  {
    category: 'Dining & Nutrition',
    icon: HomeIcon,
    features: [
      'On-campus café with Caribbean specialties',
      'Healthy meal options and dietary accommodations',
      'Student lounge with vending machines',
      'Community kitchen for special events'
    ]
  },
  {
    category: 'Recreation & Wellness',
    icon: HeartIcon,
    features: [
      'Fitness studio with dance and movement classes',
      'Outdoor performance amphitheater',
      'Student wellness counseling services',
      'Meditation and mindfulness programs'
    ]
  },
  {
    category: 'Technology & Resources',
    icon: BookOpenIcon,
    features: [
      'High-speed WiFi throughout campus',
      'Digital media lab with editing software',
      'Library with arts and performance collections',
      'Practice room booking system'
    ]
  },
  {
    category: 'Support Services',
    icon: AcademicCapIcon,
    features: [
      'Academic advising and tutoring',
      'Career services and internship placement',
      'Financial aid and scholarship guidance',
      'Disability services and accommodations'
    ]
  }
];

const traditions = [
  {
    name: 'First Year Ring Ceremony',
    description: 'New students receive their CAPAS ring, symbolizing their entry into the artistic community.',
    season: 'Fall'
  },
  {
    name: 'Senior Showcase Weekend',
    description: 'Graduating students present their capstone projects to faculty, family, and the community.',
    season: 'Spring'
  },
  {
    name: 'Founder&apos;s Day Celebration',
    description: 'Annual celebration honoring CAPAS founders with performances and community gathering.',
    season: 'Fall'
  },
  {
    name: 'Midnight Art Sessions',
    description: 'Late-night creative sessions where students collaborate across disciplines.',
    season: 'Year-round'
  }
];

const housingInfo = [
  {
    type: 'On-Campus Housing',
    description: 'Limited on-campus housing available for international and out-of-island students.',
    features: ['Shared common areas', 'Study spaces', 'Laundry facilities', 'Security access']
  },
  {
    type: 'Local Housing Partners',
    description: 'Verified off-campus housing options within commuting distance to campus.',
    features: ['Shuttle service', 'Student-friendly rates', 'Furnished options', 'Utilities included']
  },
  {
    type: 'Homestay Program',
    description: 'Cultural immersion opportunity living with local Bahamian families.',
    features: ['Cultural exchange', 'Meal plans included', 'Family support', 'Language practice']
  }
];

export default function StudentLifePage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-gold via-capas-coral to-capas-palm py-12 sm:py-16 lg:py-24">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/50" />
                <li>
                  <Link href="/students" className="text-white/70 hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">Student Life</span>
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Student Life at CAPAS
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto text-white/90 px-4">
                Experience vibrant campus culture where creativity thrives, friendships flourish, and Caribbean heritage comes alive
              </p>
            </motion.div>
          </div>
        </section>

        {/* Campus Culture Overview */}
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
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-6">
                  Where Creativity Meets Community
                </h2>
                <div className="space-y-4 text-lg text-capas-ocean-dark leading-relaxed">
                  <p>
                    At CAPAS, student life extends far beyond the classroom. Our vibrant campus 
                    community celebrates creativity, cultural heritage, and personal growth in 
                    an environment that feels like family.
                  </p>
                  <p>
                    From spontaneous jam sessions in the courtyard to organized cultural events, 
                    every day brings new opportunities to connect, create, and celebrate the 
                    rich artistic traditions of The Bahamas and the wider Caribbean.
                  </p>
                  <p>
                    Our students don't just study the arts—they live them, breathe them, and 
                    share them with a community that supports their artistic journey every step of the way.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <PlaceholderImage
                  width={600}
                  height={400}
                  text="Campus Life"
                  variant="gradient"
                  colorScheme="gold"
                  className="w-full h-96 rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Organizations */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                Student Organizations
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Join passionate communities that share your interests and help you grow as an artist and leader
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentOrganizations.map((org, index) => (
                <motion.div
                  key={org.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-capas-ocean-light/20 hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 ${org.color} rounded-full flex items-center justify-center mr-4`}>
                      <org.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat text-lg font-bold text-capas-turquoise">
                        {org.name}
                      </h3>
                      <span className="text-sm text-capas-gold font-semibold">{org.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-capas-ocean-dark mb-4">
                    {org.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-capas-ocean-dark">
                      {org.members} Active Members
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-capas-turquoise mb-2">Activities:</h4>
                    <ul className="space-y-1">
                      {org.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                          <ArrowRightIcon className="w-3 h-3 text-capas-gold mt-1 mr-2 flex-shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Events */}
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
                <div className="w-12 h-12 bg-capas-coral rounded-full flex items-center justify-center mr-3">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Campus Events
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Year-round celebrations that bring our community together through arts and culture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campusEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise">
                      {event.title}
                    </h3>
                    <span className="text-xs bg-capas-gold text-white px-2 py-1 rounded-full">
                      {event.frequency}
                    </span>
                  </div>
                  
                  <p className="text-capas-ocean-dark mb-4 text-sm">
                    {event.description}
                  </p>
                  
                  <div className="mb-3">
                    <h4 className="font-semibold text-capas-ocean-dark text-sm mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {event.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start text-xs text-capas-ocean-dark">
                          <SparklesIcon className="w-3 h-3 text-capas-coral mt-0.5 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-sm font-semibold text-capas-palm">
                      {event.month}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Life Features */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                Campus Life & Amenities
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Everything you need for a comfortable, productive, and enjoyable campus experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {campusLife.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-capas-sand-light hover:bg-white hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center mr-3">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise">
                      {category.category}
                    </h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                        <ArrowRightIcon className="w-3 h-3 text-capas-gold mt-1 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditions */}
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
                  <TrophyIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  CAPAS Traditions
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Time-honored traditions that create lasting memories and strengthen our community bonds
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {traditions.map((tradition, index) => (
                <motion.div
                  key={tradition.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-montserrat text-xl font-bold text-capas-turquoise">
                      {tradition.name}
                    </h3>
                    <span className="text-sm bg-capas-coral text-white px-3 py-1 rounded-full">
                      {tradition.season}
                    </span>
                  </div>
                  <p className="text-capas-ocean-dark">
                    {tradition.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Housing Information */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-ocean rounded-full flex items-center justify-center mr-3">
                  <HomeIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Housing Options
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Comfortable living arrangements to support your academic and personal success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {housingInfo.map((housing, index) => (
                <motion.div
                  key={housing.type}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-capas-ocean-light/20 hover:border-capas-turquoise hover:shadow-lg transition-all duration-300 rounded-xl p-6"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-3">
                    {housing.type}
                  </h3>
                  <p className="text-capas-ocean-dark mb-4">
                    {housing.description}
                  </p>
                  <ul className="space-y-2">
                    {housing.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                        <ArrowRightIcon className="w-4 h-4 text-capas-gold mt-0.5 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Involved */}
        <section className="mobile-section-padding bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-montserrat text-3xl font-bold mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                CAPAS student life offers endless opportunities to grow, create, and connect. 
                From the moment you arrive, you'll be part of a supportive community that 
                celebrates your unique talents and helps you reach your full potential.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3 mb-6 sm:mb-8">
                <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
                  <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Connect</h3>
                  <p className="text-white/80 text-sm sm:text-base">Build lifelong friendships with fellow artists</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
                  <SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Create</h3>
                  <p className="text-white/80 text-sm sm:text-base">Express yourself in a supportive environment</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
                  <TrophyIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" />
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Achieve</h3>
                  <p className="text-white/80 text-sm sm:text-base">Reach your artistic and personal goals</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                Experience CAPAS Student Life
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                Visit our campus, meet our students, and discover what makes CAPAS such a special place to learn and grow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/virtual-tour"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Take Virtual Tour
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Schedule Visit
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