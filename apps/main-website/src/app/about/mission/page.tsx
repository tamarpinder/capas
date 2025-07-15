'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  GlobeAmericasIcon,
  ArrowRightIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const coreValues = [
  {
    title: 'Cultural Heritage',
    description: 'Preserving and celebrating Caribbean artistic traditions while embracing contemporary innovation.',
    icon: GlobeAmericasIcon,
    color: 'bg-capas-turquoise'
  },
  {
    title: 'Excellence',
    description: 'Striving for the highest standards in creative and academic pursuits.',
    icon: SparklesIcon,
    color: 'bg-capas-gold'
  },
  {
    title: 'Community',
    description: 'Building lasting connections that strengthen The Bahamas and the wider Caribbean.',
    icon: HeartIcon,
    color: 'bg-capas-coral'
  },
  {
    title: 'Innovation',
    description: 'Pioneering new approaches to arts education that prepare students for evolving creative industries.',
    icon: AcademicCapIcon,
    color: 'bg-capas-palm'
  }
];

const strategicPillars = [
  {
    number: '01',
    title: 'Academic Excellence',
    description: 'World-class curriculum combining traditional arts with modern techniques'
  },
  {
    number: '02',
    title: 'Cultural Preservation',
    description: 'Documenting and teaching indigenous Caribbean art forms'
  },
  {
    number: '03',
    title: 'Industry Partnership',
    description: 'Connecting students with professional opportunities'
  },
  {
    number: '04',
    title: 'Global Impact',
    description: 'Sharing Caribbean culture with the world'
  }
];

export default function MissionVisionPage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark py-24">
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
                  <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <ChevronRightIcon className="h-4 w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">Mission & Vision</span>
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
                Our Mission & Vision
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Shaping the future of Caribbean arts education while honoring our rich cultural heritage
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-capas-gold rounded-full flex items-center justify-center mr-4">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                    Our Mission
                  </h2>
                </div>
                
                <p className="text-lg text-capas-ocean-dark leading-relaxed mb-6">
                  CAPAS Bahamas is dedicated to nurturing creative excellence and academic achievement 
                  in the performing and visual arts. We provide transformative education that celebrates 
                  Caribbean cultural heritage while preparing students for successful careers in the 
                  global creative economy.
                </p>
                
                <p className="text-lg text-capas-ocean-dark leading-relaxed">
                  Through innovative programs, world-class instruction, and community engagement, 
                  we empower students to become cultural ambassadors who preserve tradition while 
                  pioneering new artistic expressions that reflect the vibrant spirit of The Bahamas.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-capas-turquoise rounded-full flex items-center justify-center mr-4">
                    <GlobeAmericasIcon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                    Our Vision
                  </h2>
                </div>
                
                <p className="text-lg text-capas-ocean-dark leading-relaxed mb-6">
                  To be the Caribbean&apos;s premier institution for creative arts education, recognized 
                  globally for excellence in nurturing artistic talent and preserving cultural heritage.
                </p>
                
                <p className="text-lg text-capas-ocean-dark leading-relaxed mb-8">
                  We envision a future where CAPAS graduates lead the cultural renaissance of The 
                  Bahamas and the Caribbean, creating art that inspires, educates, and transforms 
                  communities while achieving international acclaim.
                </p>

                <Link
                  href="/about/history"
                  className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors"
                >
                  Learn About Our History
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </div>
              
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <PlaceholderImage
                  width={600}
                  height={400}
                  text="Our Vision"
                  variant="gradient"
                  colorScheme="turquoise"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Values */}
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
                Our Core Values
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                The principles that guide everything we do at CAPAS Bahamas
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 ${value.color} rounded-full flex items-center justify-center mb-4`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-3">
                    {value.title}
                  </h3>
                  <p className="text-capas-ocean-dark">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategic Pillars */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                Strategic Pillars
              </h2>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Four key areas of focus that drive our institutional growth and student success
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {strategicPillars.map((pillar, index) => (
                <motion.div
                  key={pillar.number}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {pillar.number}
                  </div>
                  <div>
                    <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-capas-ocean-dark">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Philosophy */}
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
                Our Educational Philosophy
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                At CAPAS, we believe that true artistic excellence emerges when technical mastery 
                meets cultural authenticity. Our holistic approach integrates rigorous training 
                with personal development, ensuring students grow as both artists and individuals.
              </p>
              <p className="text-lg leading-relaxed text-white/80">
                We foster an environment where creativity flourishes through collaboration, 
                where tradition inspires innovation, and where every student&apos;s unique voice 
                contributes to the rich tapestry of Caribbean arts.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                Join Our Mission
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                Be part of a community dedicated to excellence in arts education and cultural preservation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/how-to-apply"
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Apply Now
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about/leadership"
                  className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Meet Our Leadership
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