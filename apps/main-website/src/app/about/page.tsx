'use client';

import { motion } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';

const leadership = [
  {
    name: 'Dr. Patricia Glinton-Meicholas',
    title: 'President & Founder',
    bio: 'Renowned Bahamian author and cultural advocate, leading CAPAS with a vision for creative excellence.',
    image: '/team/patricia.jpg',
    expertise: ['Cultural Studies', 'Creative Writing', 'Educational Leadership']
  },
  {
    name: 'Prof. Antonius Roberts',
    title: 'Director of Creative Arts',
    bio: 'Award-winning artist and educator, bringing international acclaim to Bahamian contemporary art.',
    image: '/team/antonius.jpg',
    expertise: ['Visual Arts', 'Cultural Heritage', 'Contemporary Art']
  },
  {
    name: 'Dr. Sarah Thompson',
    title: 'Head of Technology Division',
    bio: 'Computer science pioneer, integrating cutting-edge technology with creative education.',
    image: '/team/sarah.jpg',
    expertise: ['Computer Science', 'Educational Technology', 'Innovation']
  },
  {
    name: 'Prof. Marcus Williams',
    title: 'Director of Performing Arts',
    bio: 'Master musician and composer, preserving and evolving Bahamian musical traditions.',
    image: '/team/marcus.jpg',
    expertise: ['Music Production', 'Junkanoo Arts', 'Performance']
  }
];

const timeline = [
  {
    year: '2010',
    title: 'Foundation',
    description: 'CAPAS established with a vision to bridge Caribbean culture and modern education.',
    icon: '🌱'
  },
  {
    year: '2012',
    title: 'First Programs Launch',
    description: 'Creative Arts and Digital Media programs welcomed the first cohort of students.',
    icon: '🎨'
  },
  {
    year: '2015',
    title: 'Technology Integration',
    description: 'Computer Science and Marine Biology programs added, expanding our academic offerings.',
    icon: '💻'
  },
  {
    year: '2018',
    title: 'International Recognition',
    description: 'Received UNESCO recognition for excellence in cultural education.',
    icon: '🏆'
  },
  {
    year: '2020',
    title: 'Digital Innovation',
    description: 'Launched online learning platforms and virtual creative collaboration tools.',
    icon: '🚀'
  },
  {
    year: '2024',
    title: 'Expansion',
    description: 'Opening new campus facilities and launching the Creatives Hub platform.',
    icon: '🏛️'
  }
];

export default function About() {
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
                About CAPAS
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Where Caribbean culture meets creative innovation and academic excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-capas-sand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-capas-ocean-dark leading-relaxed mb-6">
                CAPAS Bahamas exists to nurture the creative spirit while providing world-class education 
                that honors our Caribbean heritage. We believe that the future belongs to those who can 
                think creatively, work collaboratively, and lead with cultural understanding.
              </p>
              <p className="text-lg text-capas-ocean-dark leading-relaxed mb-8">
                Our unique approach combines traditional Bahamian arts with cutting-edge technology, 
                marine science, and academic excellence, preparing students for a globally connected world 
                while keeping them rooted in their cultural identity.
              </p>
              <div className="space-y-4">
                {[
                  'Cultural preservation through innovative education',
                  'Excellence in creative and academic disciplines',
                  'Sustainable development and environmental stewardship',
                  'Global connectivity with local identity'
                ].map((value, index) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-capas-gold rounded-full"></div>
                    <span className="text-capas-ocean-dark">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-capas-ocean p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-capas-turquoise rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🌊</span>
                  </div>
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                    Vision 2030
                  </h3>
                  <p className="text-capas-ocean-dark leading-relaxed">
                    To be the Caribbean&apos;s premier institution for creative education, 
                    where students from across the region come to develop their talents 
                    and become cultural ambassadors for our beautiful islands.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* Leadership Grid */}
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
              Leadership Team
            </h2>
            <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
              Meet the visionaries who guide CAPAS towards excellence in education and cultural preservation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-capas group"
              >
                <div className="aspect-square rounded-lg mb-4 overflow-hidden">
                  <OptimizedImage
                    src={leader.image}
                    alt={`${leader.name} - ${leader.title}`}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackSrc="/images/placeholders/team-placeholder.jpg"
                  />
                </div>
                
                <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise mb-1">
                  {leader.name}
                </h3>
                <p className="text-capas-gold font-medium mb-3">{leader.title}</p>
                <p className="text-capas-ocean-dark text-sm leading-relaxed mb-4">
                  {leader.bio}
                </p>
                
                <div className="space-y-2">
                  {leader.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="inline-block bg-capas-ocean-light text-capas-ocean-dark text-xs px-2 py-1 rounded mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* History Timeline */}
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
              Our Journey
            </h2>
            <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
              From humble beginnings to regional excellence - the CAPAS story
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-capas-turquoise opacity-20"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-capas p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">{event.icon}</span>
                        <span className="font-montserrat text-2xl font-bold text-capas-turquoise">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise mb-2">
                        {event.title}
                      </h3>
                      <p className="text-capas-ocean-dark leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-capas-turquoise rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        </section>

        <Footer />
      </div>
    </>
  );
}