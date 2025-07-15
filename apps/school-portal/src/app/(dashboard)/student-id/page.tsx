'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import StudentIDCard from '@/components/student-id/StudentIDCard';
import AccessHistory from '@/components/student-id/AccessHistory';
import VirtualAccess from '@/components/student-id/VirtualAccess';
import {
  IdentificationIcon,
  QrCodeIcon,
  SparklesIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  LockClosedIcon,
  CheckBadgeIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function StudentIDPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('id-card');
  const [accessGranted, setAccessGranted] = useState(false);

  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  // Mock access history
  const accessHistory = [
    {
      id: 1,
      location: 'Main Library',
      time: '08:45 AM',
      date: 'Today',
      type: 'entry',
      status: 'granted',
      icon: BuildingLibraryIcon
    },
    {
      id: 2,
      location: 'Music Practice Room 3',
      time: '10:30 AM',
      date: 'Today',
      type: 'entry',
      status: 'granted',
      icon: AcademicCapIcon
    },
    {
      id: 3,
      location: 'Computer Lab B',
      time: '02:15 PM',
      date: 'Yesterday',
      type: 'entry',
      status: 'granted',
      icon: BuildingLibraryIcon
    },
    {
      id: 4,
      location: 'After Hours Access - Art Studio',
      time: '07:30 PM',
      date: 'Yesterday',
      type: 'entry',
      status: 'restricted',
      icon: LockClosedIcon
    }
  ];

  // Campus locations with access permissions
  const campusLocations = [
    {
      id: 'library',
      name: 'Harry C. Moore Library',
      description: 'Main campus library with ocean views',
      access: 'granted',
      hours: '7:00 AM - 11:00 PM',
      currentOccupancy: 45,
      maxOccupancy: 200,
      features: ['Study Rooms', 'Computer Lab', 'Caribbean Collection']
    },
    {
      id: 'music-hall',
      name: 'Nathaniel Beneby Music Hall',
      description: 'State-of-the-art music facilities',
      access: 'granted',
      hours: '6:00 AM - 10:00 PM',
      currentOccupancy: 12,
      maxOccupancy: 50,
      features: ['Practice Rooms', 'Recording Studio', 'Concert Hall']
    },
    {
      id: 'art-center',
      name: 'Junkanoo Arts Center',
      description: 'Creative arts and cultural center',
      access: mockStudent?.program.includes('Dance') ? 'granted' : 'restricted',
      hours: '8:00 AM - 9:00 PM',
      currentOccupancy: 8,
      maxOccupancy: 40,
      features: ['Dance Studios', 'Art Gallery', 'Workshop Space']
    },
    {
      id: 'dining-hall',
      name: 'Conch Café',
      description: 'Main dining facility with local cuisine',
      access: 'granted',
      hours: '7:00 AM - 8:00 PM',
      currentOccupancy: 78,
      maxOccupancy: 150,
      features: ['Bahamian Cuisine', 'International Options', 'Ocean Terrace']
    }
  ];

  const handleVirtualAccess = (locationId: string) => {
    setAccessGranted(true);
    setTimeout(() => setAccessGranted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-turquoise to-capas-ocean rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <IdentificationIcon className="h-8 w-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Digital Student ID
            </h1>
            <SparklesIcon className="h-6 w-6" />
          </div>
          <p className="text-white/90 text-lg mb-4">
            Your all-access pass to CAPAS campus facilities and services 🏝️
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <CheckBadgeIcon className="h-5 w-5" />
              <span>Active Student</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5" />
              <span>{mockStudent?.island || 'New Providence'} Campus</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>Valid until Spring 2026</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card-capas p-6"
      >
        <div className="border-b border-capas-sand-light mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'id-card', name: 'Student ID Card', icon: IdentificationIcon },
              { id: 'virtual-access', name: 'Virtual Access', icon: QrCodeIcon },
              { id: 'access-history', name: 'Access History', icon: ClockIcon }
            ].map((tab) => (
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
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[500px]"
          >
            {activeTab === 'id-card' && (
              <StudentIDCard 
                student={mockStudent} 
                session={session}
              />
            )}
            
            {activeTab === 'virtual-access' && (
              <VirtualAccess 
                locations={campusLocations}
                onAccess={handleVirtualAccess}
                accessGranted={accessGranted}
              />
            )}
            
            {activeTab === 'access-history' && (
              <AccessHistory 
                history={accessHistory}
                student={mockStudent}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <BuildingLibraryIcon className="h-6 w-6 text-capas-turquoise" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">Library Services</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            Reserve study rooms and access digital resources
          </p>
        </div>

        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <LockClosedIcon className="h-6 w-6 text-capas-coral" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">Access Requests</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            Request special access to restricted areas
          </p>
        </div>

        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckBadgeIcon className="h-6 w-6 text-capas-gold" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">ID Replacement</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            Lost your ID? Request a digital replacement
          </p>
        </div>
      </motion.div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}