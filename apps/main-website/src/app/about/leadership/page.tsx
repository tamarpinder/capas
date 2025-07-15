'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  AcademicCapIcon,
  UserGroupIcon,
  StarIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { BuildingOfficeIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import { OrganizationStructuredData } from '@/components/StructuredData';

const executiveTeam = [
  {
    name: 'Dr. Patricia Glinton-Meicholas',
    title: 'President & CEO',
    department: 'Executive Leadership',
    bio: 'Distinguished educator and cultural advocate with over 25 years of experience in Caribbean arts education. Former UNESCO consultant on cultural preservation.',
    education: 'PhD in Cultural Studies, University of the West Indies',
    achievements: [
      'Established the first Caribbean Arts Preservation Program',
      'UNESCO Cultural Heritage Award recipient',
      'Published author of 12 books on Bahamian culture'
    ],
    contact: 'president@capas.edu.bs',
    colorScheme: 'turquoise'
  },
  {
    name: 'Prof. Antonius Roberts',
    title: 'Academic Dean',
    department: 'Academic Affairs',
    bio: 'Renowned visual artist and educator who has shaped contemporary Caribbean art education. Former director of the National Art Gallery of The Bahamas.',
    education: 'MFA Visual Arts, Rhode Island School of Design',
    achievements: [
      'Curated 30+ international Caribbean art exhibitions',
      'Bahamas National Arts Award recipient',
      'Founding member of Caribbean Arts Education Council'
    ],
    contact: 'academic.dean@capas.edu.bs',
    colorScheme: 'gold'
  },
  {
    name: 'Marcus Williams',
    title: 'Director of Operations',
    department: 'Operations & Administration',
    bio: 'Experienced administrator with expertise in educational operations and facility management. Champions student-centered operational excellence.',
    education: 'MBA Educational Administration, Nova Southeastern University',
    achievements: [
      'Implemented CAPAS\'s first sustainable campus initiative',
      'Led the design of the Patricia Glinton-Meicholas Performance Hall',
      'Excellence in Educational Operations Award'
    ],
    contact: 'operations@capas.edu.bs',
    colorScheme: 'coral'
  },
  {
    name: 'Sarah Thompson',
    title: 'Director of Student Affairs',
    department: 'Student Services',
    bio: 'Passionate advocate for student success with extensive experience in student support services and academic advising.',
    education: 'MA Student Affairs, University of Miami',
    achievements: [
      'Developed CAPAS student mentorship program',
      'Increased student retention rate by 35%',
      'Outstanding Student Affairs Professional Award'
    ],
    contact: 'student.affairs@capas.edu.bs',
    colorScheme: 'palm'
  }
];

const boardMembers = [
  {
    name: 'Hon. Hubert Minnis',
    title: 'Chairman of the Board',
    organization: 'Former Prime Minister of The Bahamas',
    expertise: 'Government Relations & Educational Policy'
  },
  {
    name: 'Paulette Bethel',
    title: 'Vice Chairman',
    organization: 'Central Bank of The Bahamas',
    expertise: 'Financial Management & Strategic Planning'
  },
  {
    name: 'Dr. Anne Higgs',
    title: 'Board Member',
    organization: 'University of The Bahamas',
    expertise: 'Higher Education & Academic Standards'
  },
  {
    name: 'Tony Curry',
    title: 'Board Member',
    organization: 'Curry Industries Ltd.',
    expertise: 'Business Development & Industry Relations'
  },
  {
    name: 'Nicolette Bethel',
    title: 'Board Member',
    organization: 'Ringplay Productions',
    expertise: 'Creative Industries & Cultural Programming'
  },
  {
    name: 'Rev. Dr. Philip McPhee',
    title: 'Board Member',
    organization: 'Bahamas Christian Council',
    expertise: 'Community Relations & Ethics'
  }
];

const departmentHeads = [
  {
    name: 'Prof. Isabella Rodriguez',
    title: 'Head of Music Department',
    specialization: 'Classical & Caribbean Music Performance',
    experience: '18 years'
  },
  {
    name: 'Michael Johnson',
    title: 'Head of Dance Department',
    specialization: 'Contemporary & Traditional Caribbean Dance',
    experience: '15 years'
  },
  {
    name: 'Dr. Camille Davis',
    title: 'Head of Theatre Arts',
    specialization: 'Caribbean Theatre & Playwriting',
    experience: '20 years'
  },
  {
    name: 'James Mitchell',
    title: 'Head of Visual Arts',
    specialization: 'Mixed Media & Digital Arts',
    experience: '12 years'
  }
];

export default function LeadershipPage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-gold via-capas-coral to-capas-turquoise py-24">
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
                  <span className="text-white font-medium">Leadership Team</span>
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
                Leadership Team
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-white/90">
                Visionary leaders dedicated to excellence in Caribbean arts education
              </p>
            </motion.div>
          </div>
        </section>

        {/* Executive Team */}
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
                <div className="w-12 h-12 bg-capas-turquoise rounded-full flex items-center justify-center mr-3">
                  <UserGroupIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Executive Team
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Meet the visionary leaders shaping the future of CAPAS Bahamas
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {executiveTeam.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <PlaceholderImage
                          width={80}
                          height={80}
                          text={member.name.split(' ').map(n => n[0]).join('')}
                          variant="solid"
                          colorScheme={member.colorScheme as 'turquoise' | 'coral' | 'gold' | 'palm' | 'ocean'}
                          className="w-20 h-20 rounded-full"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-1">
                          {member.name}
                        </h3>
                        <p className="text-capas-gold font-semibold mb-1">{member.title}</p>
                        <p className="text-sm text-capas-ocean-dark/70 mb-3">{member.department}</p>
                      </div>
                    </div>
                    
                    <p className="text-capas-ocean-dark mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-capas-turquoise mb-1">Education</h4>
                        <p className="text-sm text-capas-ocean-dark">{member.education}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-capas-turquoise mb-2">Key Achievements</h4>
                        <ul className="space-y-1">
                          {member.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-sm text-capas-ocean-dark">
                              <StarIcon className="w-3 h-3 text-capas-gold mt-1 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-3 border-t border-capas-ocean-light/20">
                        <a
                          href={`mailto:${member.contact}`}
                          className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark transition-colors text-sm"
                        >
                          <EnvelopeIcon className="w-4 h-4 mr-2" />
                          {member.contact}
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board of Directors */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mr-3">
                  <BuildingOfficeIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Board of Directors
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Distinguished leaders providing strategic guidance and governance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-capas-ocean-light/20 rounded-xl p-6 hover:border-capas-gold hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-center">
                    <PlaceholderImage
                      width={60}
                      height={60}
                      text={member.name.split(' ').map(n => n[0]).join('')}
                      variant="solid"
                      colorScheme="gold"
                      className="w-15 h-15 rounded-full mx-auto mb-4"
                    />
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                      {member.name}
                    </h3>
                    <p className="text-capas-gold font-semibold mb-2">{member.title}</p>
                    <p className="text-sm text-capas-ocean-dark mb-3">{member.organization}</p>
                    <p className="text-xs text-capas-ocean-dark/70">{member.expertise}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Department Heads */}
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
                  <AcademicCapIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Department Heads
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Academic leaders in their respective artistic disciplines
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentHeads.map((head, index) => (
                <motion.div
                  key={head.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <PlaceholderImage
                    width={64}
                    height={64}
                    text={head.name.split(' ').map(n => n[0]).join('')}
                    variant="gradient"
                    colorScheme="coral"
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                    {head.name}
                  </h3>
                  <p className="text-capas-coral font-semibold mb-2">{head.title}</p>
                  <p className="text-sm text-capas-ocean-dark mb-2">{head.specialization}</p>
                  <p className="text-xs text-capas-ocean-dark/70">{head.experience} experience</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Leadership */}
        <section className="py-16 bg-gradient-to-r from-capas-turquoise to-capas-ocean text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="font-montserrat text-2xl font-bold mb-4">
                Connect with Our Leadership
              </h3>
              <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                Have questions about CAPAS or want to discuss partnership opportunities? 
                Our leadership team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-white text-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Contact Leadership
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about/governance"
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:bg-white hover:text-capas-turquoise inline-flex items-center justify-center"
                >
                  View Governance
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