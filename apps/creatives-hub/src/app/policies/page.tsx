'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CulturalHeader, CulturalCard, CulturalDivider } from '@/components/cultural/BahamianPatterns';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface PolicySection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  content: {
    overview: string;
    sections: {
      title: string;
      content: string;
    }[];
  };
  lastUpdated: string;
  version: string;
}

export default function PoliciesPage() {
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const policies: PolicySection[] = [
    {
      id: 'academic-integrity',
      title: 'Academic Integrity Policy',
      description: 'Guidelines for maintaining academic honesty and ethical standards in coursework and assessments.',
      icon: ShieldCheckIcon,
      lastUpdated: '2024-01-15',
      version: '2.1',
      content: {
        overview: 'CAPAS Bahamas is committed to fostering an environment of academic integrity where all students can thrive while maintaining the highest ethical standards.',
        sections: [
          {
            title: 'Definition of Academic Integrity',
            content: 'Academic integrity encompasses honesty, trust, fairness, respect, and responsibility in all academic endeavors. It requires students to present their own work and properly credit the contributions of others.'
          },
          {
            title: 'Prohibited Behaviors',
            content: 'Academic dishonesty includes but is not limited to: plagiarism, cheating on examinations, unauthorized collaboration, falsification of data, and misrepresentation of academic credentials.'
          },
          {
            title: 'Creative Work Guidelines',
            content: 'For creative projects, students must clearly distinguish between original work, collaborative efforts, and use of existing resources. All inspirations, references, and collaborative contributions must be properly documented.'
          },
          {
            title: 'Digital Asset Usage',
            content: 'When using digital assets, 3D models, audio samples, or visual references, students must ensure proper licensing and provide complete attribution. Use of copyrighted material without permission is strictly prohibited.'
          },
          {
            title: 'Consequences',
            content: 'Violations may result in course failure, academic probation, or dismissal from the program. The severity of consequences depends on the nature and extent of the violation.'
          }
        ]
      }
    },
    {
      id: 'student-conduct',
      title: 'Student Code of Conduct',
      description: 'Behavioral expectations and guidelines for creating a respectful learning environment.',
      icon: UserGroupIcon,
      lastUpdated: '2024-02-01',
      version: '1.8',
      content: {
        overview: 'This code outlines the behavioral standards expected of all CAPAS students to maintain a positive, inclusive, and culturally respectful learning environment.',
        sections: [
          {
            title: 'Respect and Inclusion',
            content: 'Students must treat all members of the CAPAS community with respect, regardless of race, gender, religion, sexual orientation, or cultural background. Discrimination and harassment are strictly prohibited.'
          },
          {
            title: 'Cultural Sensitivity',
            content: 'Given the rich cultural heritage of The Bahamas, students are expected to approach cultural topics with sensitivity and respect. Appropriation or misrepresentation of cultural elements is not tolerated.'
          },
          {
            title: 'Digital Citizenship',
            content: 'In online forums and digital spaces, students must maintain professional conduct, protect privacy, and engage constructively in discussions. Cyberbullying and inappropriate content sharing are prohibited.'
          },
          {
            title: 'Community Engagement',
            content: 'Students are encouraged to actively participate in the learning community while respecting diverse perspectives and contributing positively to group dynamics.'
          }
        ]
      }
    },
    {
      id: 'technology-use',
      title: 'Technology and Digital Resources Policy',
      description: 'Acceptable use guidelines for digital platforms, software, and creative tools.',
      icon: AcademicCapIcon,
      lastUpdated: '2024-01-30',
      version: '3.0',
      content: {
        overview: 'This policy governs the use of technology, software, and digital resources provided by CAPAS for educational purposes.',
        sections: [
          {
            title: 'Acceptable Use',
            content: 'Technology resources are provided for educational purposes only. Students may use software, 3D tools, and digital platforms solely for coursework and approved creative projects.'
          },
          {
            title: 'Software Licensing',
            content: 'Students must comply with all software licensing agreements. Sharing login credentials, unauthorized software installation, or license violations are prohibited.'
          },
          {
            title: 'Data Security',
            content: 'Students are responsible for maintaining the security of their accounts and protecting sensitive information. Regular password updates and secure practices are required.'
          },
          {
            title: '3D Asset Management',
            content: 'When creating or using 3D models, students must respect intellectual property rights, maintain organized file structures, and follow naming conventions for collaborative projects.'
          },
          {
            title: 'Platform Etiquette',
            content: 'In 3D environments and virtual spaces, students must maintain appropriate avatars, respectful interactions, and constructive use of immersive features.'
          }
        ]
      }
    },
    {
      id: 'assessment-policy',
      title: 'Assessment and Evaluation Policy',
      description: 'Guidelines for grading, feedback, and evaluation of creative work and academic performance.',
      icon: DocumentTextIcon,
      lastUpdated: '2024-01-20',
      version: '2.3',
      content: {
        overview: 'This policy outlines the assessment methods, grading criteria, and evaluation standards for all CAPAS courses and creative programs.',
        sections: [
          {
            title: 'Assessment Methods',
            content: 'Assessments include traditional exams, creative projects, portfolio submissions, peer evaluations, and practical demonstrations. Each method is designed to evaluate different aspects of learning.'
          },
          {
            title: 'Creative Work Evaluation',
            content: 'Creative projects are assessed on technical skill, conceptual development, cultural relevance, innovation, and presentation quality. Rubrics are provided for all major assignments.'
          },
          {
            title: 'Feedback and Revision',
            content: 'Students receive detailed feedback on all submissions and are encouraged to revise work based on instructor guidance. Multiple submission opportunities support iterative learning.'
          },
          {
            title: 'Portfolio Development',
            content: 'Students maintain digital portfolios showcasing their growth and achievements. Portfolio requirements include reflection essays and documentation of creative processes.'
          },
          {
            title: 'Grading Appeals',
            content: 'Students may appeal grades through established procedures. Appeals must be submitted within two weeks of grade posting with supporting documentation.'
          }
        ]
      }
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const downloadPolicy = (policyId: string) => {
    // In a real app, this would trigger a PDF download
    console.log(`Downloading policy: ${policyId}`);
  };

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Cultural Hero Header */}
      <CulturalHeader
        title="Policies & Guidelines"
        subtitle="Important information for students and faculty at CAPAS Bahamas"
        pattern="waves"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedPolicy ? (
          /* Policy Overview Grid */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold text-capas-turquoise mb-4">
                Academic Policies & Guidelines
              </h2>
              <p className="text-capas-ocean-dark max-w-3xl mx-auto">
                Please review these important policies to ensure a successful and compliant academic experience at CAPAS Bahamas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {policies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div onClick={() => setSelectedPolicy(policy.id)}>
                    <CulturalCard 
                      pattern="coral" 
                      className="p-6 h-full cursor-pointer hover:shadow-xl transition-shadow group"
                    >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-capas-turquoise rounded-lg flex items-center justify-center">
                        <policy.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors">
                          {policy.title}
                        </h3>
                        <p className="text-capas-ocean-dark text-sm leading-relaxed">
                          {policy.description}
                        </p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-capas-ocean-dark/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-capas-ocean-dark/60">
                      <span>Version {policy.version}</span>
                      <span>Updated {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </CulturalCard>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Important Notice */}
            <CulturalCard pattern="waves" className="p-6">
              <div className="flex items-start space-x-4">
                <InformationCircleIcon className="w-8 h-8 text-capas-coral flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-capas-ocean-dark mb-2">Important Notice</h3>
                  <p className="text-capas-ocean-dark/80 text-sm leading-relaxed">
                    All students are required to read and acknowledge these policies. 
                    Policies are regularly updated to reflect best practices and regulatory requirements. 
                    Students will be notified of any significant changes via email and platform announcements.
                  </p>
                </div>
              </div>
            </CulturalCard>
          </motion.div>
        ) : (
          /* Individual Policy View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {(() => {
              const policy = policies.find(p => p.id === selectedPolicy)!;
              return (
                <>
                  {/* Back Button */}
                  <button
                    onClick={() => setSelectedPolicy(null)}
                    className="flex items-center space-x-2 text-capas-turquoise hover:text-capas-turquoise-dark transition-colors mb-8"
                  >
                    <ChevronRightIcon className="w-4 h-4 transform rotate-180" />
                    <span>Back to Policies</span>
                  </button>

                  {/* Policy Header */}
                  <CulturalCard pattern="palm" className="p-8 mb-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-capas-turquoise rounded-lg flex items-center justify-center">
                          <policy.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h1 className="font-display text-3xl font-bold text-capas-turquoise mb-2">
                            {policy.title}
                          </h1>
                          <p className="text-capas-ocean-dark leading-relaxed mb-4">
                            {policy.description}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-capas-ocean-dark/70">
                            <span>Version {policy.version}</span>
                            <span>Last Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => downloadPolicy(policy.id)}
                        className="flex items-center space-x-2 btn-capas-secondary text-sm"
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </CulturalCard>

                  {/* Policy Overview */}
                  <CulturalCard pattern="conch" className="p-6 mb-8">
                    <h2 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
                      Overview
                    </h2>
                    <p className="text-capas-ocean-dark leading-relaxed">
                      {policy.content.overview}
                    </p>
                  </CulturalCard>

                  {/* Policy Sections */}
                  <div className="space-y-4">
                    {policy.content.sections.map((section, index) => (
                      <CulturalCard key={index} pattern="waves" className="overflow-hidden">
                        <button
                          onClick={() => toggleSection(`${policy.id}-${index}`)}
                          className="w-full p-6 text-left hover:bg-capas-sand-light/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="font-display text-lg font-semibold text-capas-turquoise">
                              {section.title}
                            </h3>
                            <ChevronDownIcon className={`w-5 h-5 text-capas-ocean-dark transition-transform ${
                              expandedSections.has(`${policy.id}-${index}`) ? 'transform rotate-180' : ''
                            }`} />
                          </div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedSections.has(`${policy.id}-${index}`) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-capas-ocean-light/30"
                            >
                              <div className="p-6 bg-capas-sand-light/30">
                                <p className="text-capas-ocean-dark leading-relaxed">
                                  {section.content}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CulturalCard>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <CulturalCard pattern="junkanoo" className="p-6 mt-8">
                    <div className="text-center">
                      <h3 className="font-display text-lg font-semibold text-capas-turquoise mb-2">
                        Questions About This Policy?
                      </h3>
                      <p className="text-capas-ocean-dark mb-4">
                        Contact the Student Affairs office for clarification or additional information.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a href="mailto:studentaffairs@capas.edu.bs" className="btn-capas-primary text-sm">
                          Email Student Affairs
                        </a>
                        <a href="tel:+1242-555-0123" className="btn-capas-secondary text-sm">
                          Call (242) 555-0123
                        </a>
                      </div>
                    </div>
                  </CulturalCard>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Cultural Divider */}
        <CulturalDivider pattern="palm" height={60} />

        {/* Additional Resources */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-8 text-center">
            Additional Resources
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <CulturalCard pattern="coral" className="p-6 text-center">
              <ExclamationTriangleIcon className="w-8 h-8 text-capas-coral mx-auto mb-4" />
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Report a Violation</h3>
              <p className="text-sm text-capas-ocean-dark/70 mb-4">
                Confidentially report policy violations or academic misconduct
              </p>
              <button className="btn-capas-primary text-sm w-full">
                Report Issue
              </button>
            </CulturalCard>

            <CulturalCard pattern="waves" className="p-6 text-center">
              <UserGroupIcon className="w-8 h-8 text-capas-turquoise mx-auto mb-4" />
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Student Support</h3>
              <p className="text-sm text-capas-ocean-dark/70 mb-4">
                Get help understanding policies and academic requirements
              </p>
              <button className="btn-capas-secondary text-sm w-full">
                Contact Support
              </button>
            </CulturalCard>

            <CulturalCard pattern="palm" className="p-6 text-center">
              <DocumentTextIcon className="w-8 h-8 text-capas-gold mx-auto mb-4" />
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Policy Updates</h3>
              <p className="text-sm text-capas-ocean-dark/70 mb-4">
                Subscribe to notifications about policy changes and updates
              </p>
              <button className="btn-capas-secondary text-sm w-full">
                Subscribe
              </button>
            </CulturalCard>
          </div>
        </motion.section>
      </div>
    </div>
  );
}