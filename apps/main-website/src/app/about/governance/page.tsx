'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BuildingOfficeIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  ScaleIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const governanceStructure = [
  {
    title: 'Board of Directors',
    description: 'Provides strategic oversight and ensures institutional accountability',
    responsibilities: [
      'Strategic planning and institutional direction',
      'Financial oversight and budget approval',
      'Policy development and governance',
      'Executive leadership accountability'
    ],
    members: 6,
    icon: BuildingOfficeIcon,
    color: 'bg-capas-turquoise'
  },
  {
    title: 'Executive Leadership',
    description: 'Manages day-to-day operations and implements board directives',
    responsibilities: [
      'Academic program development and delivery',
      'Student services and support',
      'Faculty recruitment and development',
      'Operational management and administration'
    ],
    members: 4,
    icon: UserGroupIcon,
    color: 'bg-capas-gold'
  },
  {
    title: 'Academic Senate',
    description: 'Ensures academic integrity and educational excellence',
    responsibilities: [
      'Curriculum development and approval',
      'Academic standards and assessment',
      'Faculty tenure and promotion',
      'Research and scholarship oversight'
    ],
    members: 12,
    icon: AcademicCapIcon,
    color: 'bg-capas-coral'
  }
];

const accreditations = [
  {
    organization: 'Ministry of Education, The Bahamas',
    type: 'Institutional License',
    status: 'Current',
    validUntil: '2027',
    description: 'Official authorization to operate as a post-secondary educational institution in The Bahamas'
  },
  {
    organization: 'Caribbean Association of Tertiary Education (CATE)',
    type: 'Institutional Accreditation',
    status: 'Current',
    validUntil: '2026',
    description: 'Regional accreditation ensuring quality standards across Caribbean higher education'
  },
  {
    organization: 'National Association of Schools of Art and Design (NASAD)',
    type: 'Program Accreditation',
    status: 'Current',
    validUntil: '2025',
    description: 'Specialized accreditation for visual arts and design programs'
  },
  {
    organization: 'National Association of Schools of Music (NASM)',
    type: 'Program Accreditation',
    status: 'Current',
    validUntil: '2025',
    description: 'Specialized accreditation for music performance and education programs'
  }
];

const policies = [
  {
    category: 'Academic Policies',
    policies: [
      'Academic Integrity and Honesty',
      'Grading and Assessment Standards',
      'Student Academic Progress',
      'Transfer Credit and Prior Learning'
    ]
  },
  {
    category: 'Student Policies',
    policies: [
      'Code of Student Conduct',
      'Non-Discrimination and Harassment',
      'Student Privacy Rights (FERPA)',
      'Campus Safety and Security'
    ]
  },
  {
    category: 'Faculty Policies',
    policies: [
      'Faculty Hiring and Tenure',
      'Professional Development',
      'Research and Creative Work',
      'Faculty Rights and Responsibilities'
    ]
  },
  {
    category: 'Institutional Policies',
    policies: [
      'Financial Aid and Scholarships',
      'Facilities Use and Management',
      'Technology and Data Privacy',
      'Emergency Response Procedures'
    ]
  }
];

const committees = [
  {
    name: 'Academic Standards Committee',
    purpose: 'Monitors academic quality and student learning outcomes',
    composition: '3 faculty, 2 administrators, 1 student representative'
  },
  {
    name: 'Student Affairs Committee',
    purpose: 'Addresses student life, services, and disciplinary matters',
    composition: '2 faculty, 2 staff, 2 student representatives'
  },
  {
    name: 'Finance and Audit Committee',
    purpose: 'Oversees financial planning, budgeting, and audit processes',
    composition: '3 board members, 1 external financial expert'
  },
  {
    name: 'Curriculum Committee',
    purpose: 'Reviews and approves curriculum changes and new programs',
    composition: '4 faculty representatives, 1 administrator'
  }
];

export default function GovernancePage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-ocean via-capas-turquoise to-capas-palm py-24">
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
                  <span className="text-white font-medium">Governance</span>
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
                Governance & Accountability
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Committed to transparency, integrity, and excellence in institutional governance
              </p>
            </motion.div>
          </div>
        </section>

        {/* Governance Overview */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-6">
                  Our Commitment to Excellence
                </h2>
                <div className="space-y-4 text-lg text-capas-ocean-dark leading-relaxed">
                  <p>
                    CAPAS Bahamas operates under a comprehensive governance framework designed to 
                    ensure institutional accountability, academic integrity, and continuous improvement 
                    in all aspects of our operations.
                  </p>
                  <p>
                    Our governance structure balances strategic oversight with operational flexibility, 
                    enabling us to respond effectively to the evolving needs of our students and the 
                    creative industries while maintaining the highest standards of educational excellence.
                  </p>
                  <p>
                    Through transparent processes, regular assessment, and stakeholder engagement, 
                    we maintain our commitment to serving the Caribbean arts community with integrity 
                    and purpose.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <PlaceholderImage
                  width={600}
                  height={400}
                  text="Governance"
                  variant="gradient"
                  colorScheme="ocean"
                  className="w-full h-96 rounded-xl shadow-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Governance Structure */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <h2 className="font-montserrat text-2xl sm:text-3xl font-bold text-capas-turquoise mb-3 sm:mb-4">
                Governance Structure
              </h2>
              <p className="text-base sm:text-lg text-capas-ocean-dark max-w-3xl mx-auto px-4">
                A collaborative framework ensuring effective leadership and institutional accountability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
              {governanceStructure.map((structure, index) => (
                <motion.div
                  key={structure.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full bg-white border-2 border-capas-ocean-light/20 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-capas-turquoise hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${structure.color} rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto`}>
                    <structure.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-lg sm:text-xl font-bold text-capas-turquoise mb-2 sm:mb-3 text-center">
                    {structure.title}
                  </h3>
                  <p className="text-capas-ocean-dark mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-center">
                    {structure.description}
                  </p>
                  <div className="mb-3 sm:mb-4 text-center">
                    <span className="text-sm font-semibold text-capas-gold">
                      {structure.members} Members
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-capas-ocean-dark mb-2 text-sm sm:text-base text-center">Key Responsibilities:</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {structure.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-capas-ocean-dark">
                          <CheckCircleIcon className="w-3 h-3 sm:w-4 sm:h-4 text-capas-palm mt-0.5 mr-2 flex-shrink-0" />
                          <span className="leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Accreditation & Compliance */}
        <section className="py-12 sm:py-16 lg:py-20 bg-capas-sand-light">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-palm rounded-full flex items-center justify-center mb-3">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-capas-turquoise text-center">
                  Accreditation & Compliance
                </h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-capas-ocean-dark max-w-3xl mx-auto px-4">
                Maintaining the highest standards through recognized accreditation and regulatory compliance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
              {accreditations.map((accreditation, index) => (
                <motion.div
                  key={accreditation.organization}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center mb-4">
                    <h3 className="font-montserrat text-base sm:text-lg font-bold text-capas-turquoise mb-2 leading-tight">
                      {accreditation.organization}
                    </h3>
                    <p className="text-capas-gold font-semibold text-sm sm:text-base mb-3">{accreditation.type}</p>
                    <div className="flex flex-col items-center gap-2">
                      <span className="inline-block bg-capas-palm text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {accreditation.status}
                      </span>
                      <p className="text-xs text-capas-ocean-dark/70">
                        Valid until {accreditation.validUntil}
                      </p>
                    </div>
                  </div>
                  <p className="text-capas-ocean-dark text-xs sm:text-sm leading-relaxed text-center">
                    {accreditation.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies & Procedures */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-coral rounded-full flex items-center justify-center mb-3">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-capas-turquoise text-center">
                  Policies & Procedures
                </h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-capas-ocean-dark max-w-3xl mx-auto px-4">
                Comprehensive policies ensuring fair, consistent, and transparent operations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {policies.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full bg-capas-sand-light rounded-lg sm:rounded-xl p-4 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="font-montserrat text-base sm:text-lg font-bold text-capas-turquoise mb-3 sm:mb-4 text-center">
                    {category.category}
                  </h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {category.policies.map((policy, idx) => (
                      <li key={idx} className="flex items-start text-xs sm:text-sm text-capas-ocean-dark">
                        <BookOpenIcon className="w-3 h-3 sm:w-4 sm:h-4 text-capas-gold mt-0.5 mr-2 flex-shrink-0" />
                        <span className="leading-relaxed">{policy}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <div className="bg-capas-sand-light rounded-xl p-6">
                <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-3">
                  Policy Access
                </h3>
                <p className="text-capas-ocean-dark mb-4">
                  All institutional policies are available to students, faculty, and staff through our 
                  internal portal and physical copies at the registrar&apos;s office.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark font-semibold transition-colors"
                >
                  Request Policy Information
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Committees */}
        <section className="py-12 sm:py-16 lg:py-20 bg-capas-sand-light">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="flex flex-col items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mb-3">
                  <ScaleIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-2xl lg:text-3xl font-bold text-capas-turquoise text-center">
                  Standing Committees
                </h2>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-capas-ocean-dark max-w-3xl mx-auto px-4">
                Collaborative bodies ensuring shared governance and institutional effectiveness
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
              {committees.map((committee, index) => (
                <motion.div
                  key={committee.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="font-montserrat text-lg sm:text-xl font-bold text-capas-turquoise mb-2 sm:mb-3 text-center">
                    {committee.name}
                  </h3>
                  <p className="text-capas-ocean-dark mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed text-center">
                    {committee.purpose}
                  </p>
                  <div className="bg-capas-sand-light rounded-lg p-3">
                    <h4 className="font-semibold text-capas-ocean-dark mb-1 text-sm sm:text-base text-center">Composition:</h4>
                    <p className="text-xs sm:text-sm text-capas-ocean-dark leading-relaxed text-center">
                      {committee.composition}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transparency & Reporting */}
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
                Transparency & Accountability
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                CAPAS Bahamas is committed to maintaining the highest standards of transparency 
                in our operations, finances, and decision-making processes. We regularly publish 
                annual reports, undergo independent audits, and engage with our community to 
                ensure accountability.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-2">Annual Reports</h3>
                  <p className="text-white/80">Comprehensive institutional reporting</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-2">Financial Audits</h3>
                  <p className="text-white/80">Independent financial verification</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h3 className="font-bold text-xl mb-2">Community Input</h3>
                  <p className="text-white/80">Regular stakeholder engagement</p>
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
                Questions About Our Governance?
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                We&apos;re committed to transparency and welcome questions about our institutional governance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Contact Administration
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