'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  DocumentTextIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BookOpenIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  HeartIcon,
  LockClosedIcon,
  ClockIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  content: string[];
  lastUpdated: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportContact {
  id: string;
  title: string;
  description: string;
  contact: string;
  hours: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function PoliciesAndSupport() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicySection | null>(null);
  const [activeTab, setActiveTab] = useState<'policies' | 'faq' | 'support'>('policies');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>('all');

  const policyData: PolicySection[] = [
    {
      id: 'student-code',
      title: 'Student Code of Conduct',
      icon: UserGroupIcon,
      description: 'Guidelines for respectful and professional behavior in our creative community',
      lastUpdated: '2024-01-15',
      content: [
        'Students are expected to maintain the highest standards of personal and academic integrity.',
        'Respect for fellow students, faculty, and staff is fundamental to our learning environment.',
        'Collaborative work should acknowledge all contributors appropriately.',
        'Creative work must be original unless properly cited and attributed.',
        'Discrimination, harassment, or bullying of any kind will not be tolerated.',
        'Students must respect intellectual property rights and copyright laws.',
        'Use of CAPAS facilities and equipment requires responsible care and proper usage.',
        'Any violations should be reported to the Academic Affairs office immediately.'
      ]
    },
    {
      id: 'academic-integrity',
      title: 'Academic Integrity Policy',
      icon: AcademicCapIcon,
      description: 'Maintaining honesty and ethics in all academic work and creative projects',
      lastUpdated: '2024-01-10',
      content: [
        'All submitted work must be original and created by the student unless otherwise specified.',
        'Plagiarism, including unauthorized copying of text, images, or creative works, is prohibited.',
        'When using external resources, proper citation and attribution must be provided.',
        'Collaboration on group projects should follow guidelines specified by the instructor.',
        'Use of AI tools and software must be disclosed when required by the assignment.',
        'Students may not submit the same work for multiple assignments without permission.',
        'Academic dishonesty will result in consequences ranging from assignment failure to course dismissal.',
        'Students are encouraged to seek help from instructors when facing academic challenges.'
      ]
    },
    {
      id: 'privacy-policy',
      title: 'Privacy & Data Protection',
      icon: LockClosedIcon,
      description: 'How we protect and use your personal information and creative work',
      lastUpdated: '2024-01-08',
      content: [
        'CAPAS is committed to protecting student privacy and personal information.',
        'Personal data is collected only for educational and administrative purposes.',
        'Student work and portfolios are protected and not shared without explicit consent.',
        'Access to student records is limited to authorized personnel only.',
        'Students have the right to review and request corrections to their personal data.',
        'We use secure systems to protect against unauthorized access or data breaches.',
        'Third-party services used for education comply with privacy standards.',
        'Students will be notified of any changes to privacy policies or practices.'
      ]
    },
    {
      id: 'technology-use',
      title: 'Technology & Equipment Policy',
      icon: ComputerDesktopIcon,
      description: 'Guidelines for responsible use of digital tools and campus technology',
      lastUpdated: '2024-01-12',
      content: [
        'Students must use CAPAS technology resources responsibly and ethically.',
        'Personal accounts and passwords must be kept secure and not shared.',
        'Equipment must be returned in good condition after use.',
        'Software installations require approval from IT staff.',
        'Internet usage should be appropriate for educational purposes.',
        'Students are responsible for backing up their own work and files.',
        'Report any technical issues or equipment damage immediately.',
        'Violation of technology policies may result in loss of access privileges.'
      ]
    },
    {
      id: 'cultural-heritage',
      title: 'Cultural Heritage & Respect',
      icon: HeartIcon,
      description: 'Honoring Bahamian culture and promoting inclusive creative expression',
      lastUpdated: '2024-01-20',
      content: [
        'CAPAS celebrates and honors Bahamian cultural heritage in all creative endeavors.',
        'Students should approach cultural elements with respect and understanding.',
        'Traditional art forms and cultural expressions should be studied and represented accurately.',
        'Cultural appropriation is not acceptable; seek guidance when incorporating cultural elements.',
        'Diversity and inclusion are core values that enrich our creative community.',
        'Students are encouraged to explore their own cultural backgrounds in their work.',
        'Guest artists and cultural practitioners should be treated with utmost respect.',
        'Cultural events and celebrations provide learning opportunities for all students.'
      ]
    },
    {
      id: 'assessment-grading',
      title: 'Assessment & Grading Policy',
      icon: ClockIcon,
      description: 'Understanding evaluation criteria and grading standards',
      lastUpdated: '2024-01-05',
      content: [
        'All assessments are designed to measure learning outcomes and creative growth.',
        'Grading criteria are clearly communicated at the beginning of each course.',
        'Students receive regular feedback to support their creative development.',
        'Late submission policies are specified in individual course syllabi.',
        'Make-up opportunities may be available for excused absences.',
        'Students may request grade reviews following established procedures.',
        'Portfolio assessments consider both technical skill and creative expression.',
        'Final grades reflect overall achievement of course learning objectives.'
      ]
    }
  ];

  const faqData: FAQ[] = [
    {
      id: 'q1',
      question: 'How do I access course materials and assignments?',
      answer: 'Course materials are available through the Creatives Hub platform. Navigate to "My Courses" to view all enrolled courses, access assignments, download resources, and track your progress.',
      category: 'Platform'
    },
    {
      id: 'q2',
      question: 'What software is provided for students?',
      answer: 'CAPAS provides access to industry-standard creative software including Adobe Creative Suite, Blender, Logic Pro X, and various specialized tools. Check the Resource Library for installation guides and tutorials.',
      category: 'Software'
    },
    {
      id: 'q3',
      question: 'How can I get technical support?',
      answer: 'Technical support is available through multiple channels: live chat during business hours, email support, and in-person assistance at the IT Help Desk. Check our support hours and contact information below.',
      category: 'Support'
    },
    {
      id: 'q4',
      question: 'What is the policy on using AI tools in assignments?',
      answer: 'AI tools may be used when specifically permitted by the instructor. Always disclose AI usage and follow the guidelines provided in each course. The goal is to enhance learning while maintaining academic integrity.',
      category: 'Academic'
    },
    {
      id: 'q5',
      question: 'How do I report a technical issue or bug?',
      answer: 'Report technical issues through the support portal, email tech-support@capas.edu.bs, or use the chat feature. Include details about the problem, steps to reproduce it, and any error messages.',
      category: 'Support'
    },
    {
      id: 'q6',
      question: 'Can I collaborate with students from other courses?',
      answer: 'Cross-course collaboration is encouraged! Use the Forums to connect with students from other programs. Always ensure that collaborative work meets the requirements of your specific assignments.',
      category: 'Academic'
    },
    {
      id: 'q7',
      question: 'How do I update my profile information?',
      answer: 'Profile information can be updated through your account settings. Some changes may require verification through the Student Services office. Contact support if you need assistance with profile updates.',
      category: 'Platform'
    },
    {
      id: 'q8',
      question: 'What are the system requirements for course software?',
      answer: 'System requirements vary by software. Check the Resource Library for detailed specifications for each program. CAPAS computer labs are available if your personal device doesn\'t meet requirements.',
      category: 'Software'
    }
  ];

  const supportContacts: SupportContact[] = [
    {
      id: 'tech-support',
      title: 'Technical Support',
      description: 'Platform issues, software problems, and general technical assistance',
      contact: 'tech-support@capas.edu.bs',
      hours: 'Mon-Fri: 8:00 AM - 6:00 PM',
      icon: ComputerDesktopIcon,
      color: 'bg-capas-turquoise'
    },
    {
      id: 'academic-affairs',
      title: 'Academic Affairs',
      description: 'Course enrollment, academic policies, and student conduct matters',
      contact: 'academic@capas.edu.bs',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      icon: AcademicCapIcon,
      color: 'bg-capas-palm'
    },
    {
      id: 'student-services',
      title: 'Student Services',
      description: 'General support, counseling, and student life assistance',
      contact: 'students@capas.edu.bs',
      hours: 'Mon-Fri: 8:30 AM - 4:30 PM',
      icon: UserGroupIcon,
      color: 'bg-capas-gold'
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      description: 'Urgent technical or academic issues requiring immediate attention',
      contact: '(242) 555-HELP',
      hours: '24/7 Emergency Line',
      icon: ExclamationTriangleIcon,
      color: 'bg-capas-coral'
    }
  ];

  const faqCategories = [
    { id: 'all', name: 'All Questions' },
    { id: 'Platform', name: 'Platform' },
    { id: 'Software', name: 'Software' },
    { id: 'Academic', name: 'Academic' },
    { id: 'Support', name: 'Support' }
  ];

  const filteredFAQs = selectedFAQCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedFAQCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-capas-turquoise via-capas-turquoise-dark to-capas-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Policies & Support
              </h1>
              <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto mb-8">
                Guidelines, resources, and support to help you succeed in your creative journey
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/my-courses" className="inline-flex items-center px-6 py-3 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg">
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  Back to Courses
                </Link>
                <Link href="/forums" className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  Community Support
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'policies', name: 'Policies & Guidelines', icon: DocumentTextIcon },
              { id: 'faq', name: 'Frequently Asked Questions', icon: QuestionMarkCircleIcon },
              { id: 'support', name: 'Support & Contact', icon: ChatBubbleLeftRightIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-capas-turquoise text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-capas-ocean-light hover:text-capas-turquoise'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'policies' && (
            <motion.div
              key="policies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Policies List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Documents</h2>
                  <div className="space-y-3">
                    {policyData.map((policy) => (
                      <div
                        key={policy.id}
                        onClick={() => setSelectedPolicy(policy)}
                        className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          selectedPolicy?.id === policy.id
                            ? 'bg-capas-turquoise text-white shadow-lg'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedPolicy?.id === policy.id ? 'bg-white/20' : 'bg-capas-turquoise'
                          }`}>
                            <policy.icon className={`w-4 h-4 ${
                              selectedPolicy?.id === policy.id ? 'text-white' : 'text-white'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className={`font-semibold ${
                              selectedPolicy?.id === policy.id ? 'text-white' : 'text-gray-900'
                            }`}>
                              {policy.title}
                            </h3>
                            <p className={`text-sm mt-1 ${
                              selectedPolicy?.id === policy.id ? 'text-white/80' : 'text-gray-600'
                            }`}>
                              {policy.description}
                            </p>
                            <p className={`text-xs mt-2 ${
                              selectedPolicy?.id === policy.id ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              Updated: {new Date(policy.lastUpdated).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Policy Content */}
              <div className="lg:col-span-2">
                {selectedPolicy ? (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-12 h-12 bg-capas-turquoise rounded-xl flex items-center justify-center">
                        <selectedPolicy.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">{selectedPolicy.title}</h1>
                        <p className="text-gray-600 mt-1">{selectedPolicy.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Last updated: {new Date(selectedPolicy.lastUpdated).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <ul className="space-y-4">
                        {selectedPolicy.content.map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="inline-block w-2 h-2 bg-capas-turquoise rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                    <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Select a Policy Document
                    </h3>
                    <p className="text-gray-600">
                      Choose a policy from the left to view its details and guidelines
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'faq' && (
            <motion.div
              key="faq"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-8">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedFAQCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedFAQCategory === category.id
                        ? 'bg-capas-turquoise text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-capas-ocean-light border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {faq.question}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-capas-ocean-light text-capas-ocean-dark text-xs rounded-full">
                          {faq.category}
                        </span>
                      </div>
                      <ChevronDownIcon 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-gray-200 pt-4">
                              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {supportContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 ${contact.color} rounded-xl flex items-center justify-center`}>
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {contact.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {contact.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          {contact.contact.includes('@') ? (
                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                          ) : (
                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                          )}
                          <span className="text-sm font-medium text-gray-900">
                            {contact.contact}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {contact.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}