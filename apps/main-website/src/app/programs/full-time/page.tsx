'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  AcademicCapIcon,
  MusicalNoteIcon,
  FilmIcon,
  PaintBrushIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  BookOpenIcon,
  TrophyIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const fullTimePrograms = [
  {
    id: 'bfa-music-performance',
    title: 'BFA in Music Performance',
    subtitle: 'Classical & Caribbean Traditions',
    duration: '4 Years',
    credits: '120 Credits',
    category: 'Music',
    icon: MusicalNoteIcon,
    colorScheme: 'turquoise',
    description: 'Master both classical techniques and Caribbean musical traditions through intensive performance training.',
    highlights: [
      'One-on-one instruction with renowned faculty',
      'Weekly masterclasses and performance opportunities',
      'Caribbean music specialization track',
      'International exchange program opportunities'
    ],
    curriculum: [
      'Music Theory & Composition',
      'Performance Technique',
      'Music History & Caribbean Heritage',
      'Ensemble Performance',
      'Recording & Production',
      'Music Business & Career Development'
    ],
    careerPaths: [
      'Professional Musician',
      'Music Educator',
      'Recording Artist',
      'Music Director',
      'Arts Administrator'
    ],
    requirements: [
      'High school diploma or equivalent',
      'Audition with prepared pieces (classical & Caribbean)',
      'Music theory placement exam',
      'Academic transcripts with 3.0+ GPA',
      'Two letters of recommendation'
    ],
    tuition: '$18,000/year',
    featured: true
  },
  {
    id: 'bfa-dance',
    title: 'BFA in Dance',
    subtitle: 'Contemporary & Traditional Caribbean',
    duration: '4 Years',
    credits: '120 Credits',
    category: 'Dance',
    icon: UserGroupIcon,
    colorScheme: 'coral',
    description: 'Comprehensive dance training combining contemporary techniques with traditional Caribbean movement.',
    highlights: [
      'State-of-the-art dance studios',
      'Choreography creation opportunities',
      'Cultural immersion experiences',
      'Professional company collaborations'
    ],
    curriculum: [
      'Contemporary Dance Technique',
      'Traditional Caribbean Dance',
      'Choreography & Composition',
      'Dance History & Culture',
      'Anatomy & Injury Prevention',
      'Teaching Methodology'
    ],
    careerPaths: [
      'Professional Dancer',
      'Choreographer',
      'Dance Teacher',
      'Movement Director',
      'Dance Therapist'
    ],
    requirements: [
      'High school diploma or equivalent',
      'Dance audition demonstrating technique',
      'Physical fitness assessment',
      'Academic transcripts with 2.8+ GPA',
      'Personal statement'
    ],
    tuition: '$17,500/year',
    featured: true
  },
  {
    id: 'bfa-theatre-arts',
    title: 'BFA in Theatre Arts',
    subtitle: 'Acting, Directing & Playwriting',
    duration: '4 Years',
    credits: '120 Credits',
    category: 'Theatre',
    icon: FilmIcon,
    colorScheme: 'gold',
    description: 'Develop your craft in acting, directing, and playwriting within Caribbean storytelling traditions.',
    highlights: [
      'Multiple productions each semester',
      'Professional theatre partnerships',
      'Script development workshops',
      'Industry mentorship program'
    ],
    curriculum: [
      'Acting Technique & Method',
      'Voice & Speech',
      'Movement for Actors',
      'Directing & Stage Management',
      'Playwriting & Script Analysis',
      'Theatre History & Caribbean Drama'
    ],
    careerPaths: [
      'Professional Actor',
      'Theatre Director',
      'Playwright',
      'Drama Teacher',
      'Arts Administrator'
    ],
    requirements: [
      'High school diploma or equivalent',
      'Acting audition with monologues',
      'Creative writing sample',
      'Academic transcripts with 3.0+ GPA',
      'Interview with faculty'
    ],
    tuition: '$17,000/year',
    featured: false
  },
  {
    id: 'bfa-visual-arts',
    title: 'BFA in Visual Arts',
    subtitle: 'Traditional & Digital Media',
    duration: '4 Years',
    credits: '120 Credits',
    category: 'Visual Arts',
    icon: PaintBrushIcon,
    colorScheme: 'palm',
    description: 'Explore diverse visual media while developing your unique artistic voice rooted in Caribbean aesthetics.',
    highlights: [
      'Professional-grade studios and equipment',
      'Gallery exhibitions and art fairs',
      'Community mural projects',
      'Visiting artist residencies'
    ],
    curriculum: [
      'Drawing & Painting Fundamentals',
      'Sculpture & 3D Arts',
      'Digital Art & Design',
      'Art History & Caribbean Art',
      'Portfolio Development',
      'Professional Practices'
    ],
    careerPaths: [
      'Professional Artist',
      'Art Teacher',
      'Gallery Curator',
      'Graphic Designer',
      'Arts Therapist'
    ],
    requirements: [
      'High school diploma or equivalent',
      'Portfolio review (15-20 pieces)',
      'Artist statement',
      'Academic transcripts with 2.8+ GPA',
      'Creative interview'
    ],
    tuition: '$16,500/year',
    featured: false
  }
];

const programBenefits = [
  {
    title: 'Small Class Sizes',
    description: 'Average 12:1 student-to-faculty ratio ensures personalized attention',
    icon: UserGroupIcon,
    stat: '12:1 Ratio'
  },
  {
    title: 'Professional Faculty',
    description: 'Learn from active professionals in their respective fields',
    icon: StarIcon,
    stat: '100% Working Artists'
  },
  {
    title: 'Performance Opportunities',
    description: 'Multiple showcases, exhibitions, and performances each semester',
    icon: TrophyIcon,
    stat: '50+ Events/Year'
  },
  {
    title: 'Career Success',
    description: 'High employment rate for graduates in creative industries',
    icon: AcademicCapIcon,
    stat: '92% Employment'
  }
];

const admissionTimeline = [
  {
    phase: 'Research & Prepare',
    timeframe: 'Spring (Year Before)',
    tasks: [
      'Research programs and requirements',
      'Begin portfolio/audition preparation',
      'Attend information sessions',
      'Visit campus or take virtual tour'
    ]
  },
  {
    phase: 'Application Submission',
    timeframe: 'Summer',
    tasks: [
      'Submit online application',
      'Request official transcripts',
      'Secure letters of recommendation',
      'Prepare audition/portfolio materials'
    ]
  },
  {
    phase: 'Audition/Review',
    timeframe: 'Fall',
    tasks: [
      'Schedule audition/portfolio review',
      'Attend audition day or submit materials',
      'Complete any additional requirements',
      'Interview with faculty (if required)'
    ]
  },
  {
    phase: 'Decision & Enrollment',
    timeframe: 'Winter/Spring',
    tasks: [
      'Receive admission decision',
      'Submit enrollment deposit',
      'Complete financial aid process',
      'Register for orientation'
    ]
  }
];

export default function FullTimeProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedProgram, setExpandedProgram] = useState(null);

  const categories = ['all', 'Music', 'Dance', 'Theatre', 'Visual Arts'];
  const filteredPrograms = selectedCategory === 'all' 
    ? fullTimePrograms 
    : fullTimePrograms.filter(program => program.category === selectedCategory);

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-palm py-24">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Link href="/programs" className="text-white/70 hover:text-white transition-colors">
                    Programs
                  </Link>
                </li>
                <ChevronRightIcon className="h-4 w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">Full-Time Programs</span>
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-montserrat text-5xl font-bold mb-6">
                Full-Time Programs
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Comprehensive Bachelor of Fine Arts degrees that combine rigorous artistic training with Caribbean cultural heritage
              </p>
            </motion.div>
          </div>
        </section>

        {/* Program Benefits */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                Why Choose CAPAS Full-Time Programs?
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Our intensive programs provide the foundation for lifelong careers in the creative arts
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-capas-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-capas-gold mb-2">
                    {benefit.stat}
                  </div>
                  <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-capas-ocean-dark text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Filter */}
        <section className="py-8 bg-white border-b border-capas-ocean-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-semibold transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-capas-turquoise text-white'
                      : 'bg-capas-sand-light text-capas-turquoise hover:bg-capas-sand'
                  }`}
                >
                  {category === 'all' ? 'All Programs' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Programs Listing */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-capas-ocean-light/20 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="lg:flex">
                    {/* Program Image */}
                    <div className="lg:w-1/3 h-64 lg:h-auto relative">
                      <PlaceholderImage
                        width={400}
                        height={300}
                        text={program.category}
                        variant="gradient"
                        colorScheme={program.colorScheme as any}
                        className="w-full h-full object-cover"
                      />
                      {program.featured && (
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                            <StarIcon className="w-4 h-4 mr-1" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Program Content */}
                    <div className="lg:w-2/3 p-8">
                      <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-grow">
                            <div className="flex items-center mb-2">
                              <program.icon className="w-6 h-6 text-capas-turquoise mr-2" />
                              <span className="text-sm font-semibold text-capas-gold">
                                {program.category}
                              </span>
                            </div>
                            <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-1">
                              {program.title}
                            </h3>
                            <p className="text-capas-ocean-dark/70 mb-3">
                              {program.subtitle}
                            </p>
                          </div>
                          <div className="text-right text-sm text-capas-ocean-dark">
                            <div className="flex items-center mb-1">
                              <ClockIcon className="w-4 h-4 mr-1" />
                              {program.duration}
                            </div>
                            <div className="flex items-center mb-1">
                              <BookOpenIcon className="w-4 h-4 mr-1" />
                              {program.credits}
                            </div>
                            <div className="flex items-center">
                              <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                              {program.tuition}
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-capas-ocean-dark mb-6 leading-relaxed">
                          {program.description}
                        </p>

                        {/* Highlights */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-capas-turquoise mb-3">Program Highlights:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {program.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                                <CheckCircleIcon className="w-4 h-4 text-capas-palm mt-0.5 mr-2 flex-shrink-0" />
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expandable Details */}
                        <div className="mt-auto">
                          <button
                            onClick={() => setExpandedProgram(
                              expandedProgram === program.id ? null : program.id
                            )}
                            className="text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors mb-4 flex items-center"
                          >
                            {expandedProgram === program.id ? 'Hide Details' : 'View Details'}
                            <ChevronRightIcon 
                              className={`w-4 h-4 ml-1 transition-transform ${
                                expandedProgram === program.id ? 'rotate-90' : ''
                              }`} 
                            />
                          </button>

                          {expandedProgram === program.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-6 pt-6 border-t border-capas-ocean-light/20"
                            >
                              {/* Curriculum */}
                              <div>
                                <h4 className="font-semibold text-capas-turquoise mb-3">Curriculum Areas:</h4>
                                <div className="grid md:grid-cols-2 gap-2">
                                  {program.curriculum.map((course, idx) => (
                                    <div key={idx} className="text-sm text-capas-ocean-dark">
                                      • {course}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Career Paths */}
                              <div>
                                <h4 className="font-semibold text-capas-turquoise mb-3">Career Paths:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {program.careerPaths.map((career, idx) => (
                                    <span 
                                      key={idx}
                                      className="bg-capas-sand-light text-capas-ocean-dark px-3 py-1 rounded-full text-sm"
                                    >
                                      {career}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Requirements */}
                              <div>
                                <h4 className="font-semibold text-capas-turquoise mb-3">Admission Requirements:</h4>
                                <ul className="space-y-1">
                                  {program.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                                      <CheckCircleIcon className="w-4 h-4 text-capas-turquoise mt-0.5 mr-2 flex-shrink-0" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <Link
                              href="/how-to-apply"
                              className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md inline-flex items-center justify-center"
                            >
                              Apply Now
                              <ArrowRightIcon className="w-4 h-4 ml-2" />
                            </Link>
                            <Link
                              href="/contact"
                              className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                            >
                              Learn More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Admission Timeline */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Admission Timeline
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Plan your application journey with our step-by-step timeline
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {admissionTimeline.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-capas-turquoise text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                      {index + 1}
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-1">
                      {phase.phase}
                    </h3>
                    <p className="text-sm text-capas-gold font-semibold">
                      {phase.timeframe}
                    </p>
                  </div>
                  
                  <ul className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                        <CheckCircleIcon className="w-4 h-4 text-capas-palm mt-0.5 mr-2 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-montserrat text-3xl font-bold mb-6">
                Ready to Begin Your Artistic Journey?
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                Join a community of dedicated artists and scholars committed to excellence in the creative arts. 
                Our full-time programs provide the intensive training and cultural foundation you need to succeed 
                in today's creative economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/how-to-apply"
                  className="bg-white text-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Start Your Application
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/programs/admissions"
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:text-capas-turquoise inline-flex items-center justify-center"
                >
                  Admission Requirements
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}