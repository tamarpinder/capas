'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import RegistrationWizard from '@/components/registration/RegistrationWizard';
import {
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  BookOpenIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function RegistrationPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('courses');

  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  const tabs = [
    {
      id: 'courses',
      name: 'Course Registration',
      icon: BookOpenIcon,
      description: 'Register for upcoming semester courses'
    },
    {
      id: 'events',
      name: 'Events & Activities',
      icon: CalendarIcon,
      description: 'Sign up for campus events and activities'
    },
    {
      id: 'forms',
      name: 'Academic Forms',
      icon: ClipboardDocumentListIcon,
      description: 'Submit academic petitions and requests'
    },
    {
      id: 'housing',
      name: 'Housing Application',
      icon: UserGroupIcon,
      description: 'Apply for on-campus accommodation'
    }
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: 'Course Registration Deadline',
      date: '2024-08-15',
      type: 'Critical',
      color: 'text-capas-coral'
    },
    {
      id: 2,
      title: 'Housing Application Due',
      date: '2024-07-30',
      type: 'Important',
      color: 'text-capas-gold'
    },
    {
      id: 3,
      title: 'Scholarship Forms Due',
      date: '2024-08-01',
      type: 'Optional',
      color: 'text-capas-turquoise'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-coral to-capas-gold rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,150 200,100 T400,100 L400,0 L0,0 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <AcademicCapIcon className="h-8 w-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Registration Center
            </h1>
            <SparklesIcon className="h-6 w-6" />
          </div>
          <p className="text-white/90 text-lg mb-4">
            Welcome, {studentData?.firstName}! Register for courses, events, and submit forms for the upcoming semester.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Fall 2024 Registration</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-5 w-5" />
              <span>{mockStudent?.program || 'Program'} • Year {mockStudent?.year || 2}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Important Deadlines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card-capas p-6"
      >
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
          Important Deadlines
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {upcomingDeadlines.map((deadline) => (
            <div key={deadline.id} className="bg-capas-sand-light rounded-lg p-4">
              <h4 className="font-medium text-capas-ocean-dark mb-2">{deadline.title}</h4>
              <p className="text-sm text-capas-ocean-dark/70 mb-2">
                {new Date(deadline.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${deadline.color}`}>
                {deadline.type}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Registration Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card-capas p-6"
      >
        {/* Tab Navigation */}
        <div className="border-b border-capas-sand-light mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-1 text-center text-sm font-medium hover:text-capas-turquoise focus:z-10 ${
                  activeTab === tab.id
                    ? 'text-capas-turquoise border-capas-turquoise border-b-2'
                    : 'text-capas-ocean-dark/70 border-transparent hover:border-capas-turquoise/50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <tab.icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </div>
                <p className="text-xs text-capas-ocean-dark/60 mt-1 hidden md:block">
                  {tab.description}
                </p>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          <RegistrationWizard type={activeTab} student={mockStudent} />
        </div>
      </motion.div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}