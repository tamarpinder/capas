'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  CalendarIcon,
  HeartIcon,
  MusicalNoteIcon,
  SparklesIcon,
  TrophyIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const timeline = [
  {
    year: '2010',
    title: 'Foundation & Vision',
    description: 'CAPAS Bahamas was founded with a mission to preserve Caribbean cultural heritage while providing world-class arts education.',
    achievements: [
      'Established initial campus in Nassau',
      'Welcomed first cohort of 45 students',
      'Launched partnerships with local cultural organizations'
    ],
    icon: BookOpenIcon,
    color: 'bg-capas-turquoise'
  },
  {
    year: '2012',
    title: 'Program Expansion',
    description: 'Added comprehensive dance and theatre programs, establishing CAPAS as a multi-disciplinary arts institution.',
    achievements: [
      'Introduced Traditional Caribbean Dance curriculum',
      'Established Theatre Arts department',
      'First annual Spring Arts Showcase'
    ],
    icon: MusicalNoteIcon,
    color: 'bg-capas-coral'
  },
  {
    year: '2015',
    title: 'Cultural Innovation',
    description: 'Pioneered the Caribbean Arts Preservation Project, documenting traditional art forms for future generations.',
    achievements: [
      'Launched digital archive of traditional songs',
      'Documented 50+ traditional Bahamian folk tales',
      'UNESCO recognition for cultural preservation efforts'
    ],
    icon: HeartIcon,
    color: 'bg-capas-palm'
  },
  {
    year: '2018',
    title: 'Academic Excellence',
    description: 'Achieved full accreditation and expanded academic offerings to include degree programs.',
    achievements: [
      'Received full institutional accreditation',
      'Launched Bachelor of Fine Arts programs',
      'Established merit-based scholarship program'
    ],
    icon: TrophyIcon,
    color: 'bg-capas-gold'
  },
  {
    year: '2020',
    title: 'Global Recognition',
    description: 'CAPAS graduates began achieving international recognition, bringing Caribbean arts to global stages.',
    achievements: [
      'Alumni performed at Caribbean Festival in London',
      'Established international exchange programs',
      'Virtual programming reached 15+ countries during pandemic'
    ],
    icon: SparklesIcon,
    color: 'bg-capas-ocean'
  },
  {
    year: '2024',
    title: 'Modern Excellence',
    description: 'Opening of the Patricia Glinton-Meicholas Performance Hall marks our commitment to providing world-class facilities.',
    achievements: [
      'Opened state-of-the-art performance hall',
      'Enrollment reached 300+ students',
      'Launched new Creative Technologies program'
    ],
    icon: CalendarIcon,
    color: 'bg-capas-turquoise'
  }
];

const culturalHeritage = [
  {
    title: 'Junkanoo Traditions',
    description: 'Preserving and teaching the vibrant art of Junkanoo music, dance, and costume creation.',
    impact: 'Documented over 100 traditional Junkanoo rhythms and techniques'
  },
  {
    title: 'Folk Music Archive',
    description: 'Collecting and preserving traditional Bahamian folk songs and storytelling traditions.',
    impact: 'Archived 200+ traditional songs and 150+ folk tales'
  },
  {
    title: 'Traditional Crafts',
    description: 'Teaching traditional basketry, woodcarving, and other indigenous crafts.',
    impact: 'Certified 50+ students in traditional craft techniques'
  },
  {
    title: 'Oral History Project',
    description: 'Recording stories and memories from Bahamian cultural elders.',
    impact: 'Collected 300+ hours of oral history recordings'
  }
];

const milestones = [
  { year: '2010', event: 'CAPAS Founded', description: 'Institution established with 45 students' },
  { year: '2011', event: 'First Graduation', description: '22 students graduate from inaugural programs' },
  { year: '2013', event: 'Community Outreach', description: 'Launched free community arts workshops' },
  { year: '2016', event: 'International Recognition', description: 'UNESCO partnership for cultural preservation' },
  { year: '2019', event: 'Alumni Success', description: 'First graduate performs at Kennedy Center' },
  { year: '2021', event: 'Digital Innovation', description: 'Launched virtual learning platforms' },
  { year: '2023', event: 'Campus Expansion', description: 'Completed new performance and studio facilities' },
  { year: '2024', event: 'Excellence Milestone', description: '300+ students enrolled across all programs' }
];

export default function HistoryPage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-palm via-capas-turquoise to-capas-ocean py-12 sm:py-16 lg:py-24">
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
                  <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">History & Heritage</span>
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
                History & Heritage
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto text-white/90 px-4">
                A journey through time, celebrating our commitment to Caribbean cultural preservation and artistic excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 sm:py-16 lg:py-20 bg-capas-sand-light">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center"
            >
              <div className="w-full order-2 lg:order-1">
                <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold text-capas-turquoise mb-4 sm:mb-6 text-center lg:text-left">
                  Our Founding Story
                </h2>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-capas-ocean-dark leading-relaxed">
                  <p className="text-center lg:text-left">
                    CAPAS Bahamas was born from a shared vision to create an institution that would honor 
                    the rich cultural heritage of The Bahamas while preparing students for success in the 
                    modern creative economy.
                  </p>
                  <p className="text-center lg:text-left">
                    Founded in 2010 by a consortium of educators, artists, and cultural advocates, CAPAS 
                    emerged as a response to the need for specialized arts education in the Caribbean. 
                    Our founders recognized that traditional educational models often overlooked the unique 
                    cultural context and artistic traditions of the region.
                  </p>
                  <p className="text-center lg:text-left">
                    From our modest beginnings with 45 students and a handful of dedicated faculty, we have 
                    grown into a leading institution that serves as a bridge between Caribbean cultural 
                    traditions and contemporary artistic expression.
                  </p>
                </div>
                <div className="mt-6 sm:mt-8 text-center lg:text-left">
                  <Link
                    href="/about/leadership"
                    className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors text-sm sm:text-base"
                  >
                    Meet Our Leadership Team
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </div>
              </div>
              
              <div className="w-full relative order-1 lg:order-2">
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl">
                  <PlaceholderImage
                    width={600}
                    height={400}
                    text="CAPAS Founding"
                    variant="gradient"
                    colorScheme="palm"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mobile-center mb-12"
            >
              <h2 className="font-montserrat text-responsive-2xl font-bold text-capas-turquoise mb-4">
                Our Journey Through Time
              </h2>
              <p className="text-responsive-base text-capas-ocean-dark max-w-3xl">
                Major milestones that have shaped CAPAS into the institution it is today
              </p>
            </motion.div>

            <div className="mobile-timeline">
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative mobile-content-wrapper"
                  >
                    <div className="mobile-card-enhanced bg-white border-2 border-capas-ocean-light/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <span className="text-responsive-xl font-bold text-capas-turquoise">{item.year}</span>
                          <h3 className="font-montserrat text-responsive-lg font-bold text-capas-ocean-dark">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-capas-ocean-dark mb-4 text-responsive-sm">
                        {item.description}
                      </p>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start text-responsive-xs text-capas-ocean-dark">
                            <SparklesIcon className="w-4 h-4 text-capas-gold mt-0.5 mr-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Heritage */}
        <section className="py-12 sm:py-16 lg:py-20 bg-capas-sand-light">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold text-capas-turquoise mb-3 sm:mb-4">
                Preserving Cultural Heritage
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-capas-ocean-dark max-w-3xl mx-auto px-4">
                Our commitment to documenting and teaching traditional Caribbean arts
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:gap-8">
              {culturalHeritage.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-montserrat text-lg sm:text-xl font-bold text-capas-turquoise mb-2 sm:mb-3 text-center sm:text-left">
                    {item.title}
                  </h3>
                  <p className="text-capas-ocean-dark mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                    {item.description}
                  </p>
                  <div className="bg-capas-sand-light rounded-lg p-3">
                    <p className="text-xs sm:text-sm font-semibold text-capas-ocean-dark text-center sm:text-left">
                      Impact: {item.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Milestones */}
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
                Key Milestones
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Celebrating the moments that have defined our journey
              </p>
            </motion.div>

            <div className="mobile-grid-auto lg:grid-cols-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-capas-sand-light rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-capas-turquoise mb-2">
                    {milestone.year}
                  </div>
                  <h3 className="font-semibold text-capas-ocean-dark mb-2">
                    {milestone.event}
                  </h3>
                  <p className="text-sm text-capas-ocean-dark/70">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Vision */}
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
                Looking Forward
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                As we continue our journey, CAPAS remains committed to evolving while staying true 
                to our core mission. We envision expanding our reach across the Caribbean, developing 
                new programs that address emerging creative industries, and deepening our impact on 
                cultural preservation.
              </p>
              <p className="text-lg leading-relaxed text-white/80">
                Our history has shown that when Caribbean creativity meets world-class education, 
                extraordinary things happen. The future holds even greater possibilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                Be Part of Our Story
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                Join a legacy of artistic excellence and cultural preservation that spans over a decade
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/how-to-apply"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Start Your Journey
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about/governance"
                  className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Learn About Governance
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