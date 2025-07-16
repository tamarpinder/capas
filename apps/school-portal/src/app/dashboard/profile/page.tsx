'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import {
  UserIcon,
  SparklesIcon,
  MapPinIcon,
  AcademicCapIcon,
  CalendarIcon,
  GlobeAltIcon,
  PhoneIcon,
  EnvelopeIcon,
  PencilIcon,
  CameraIcon,
  CheckIcon,
  XMarkIcon,
  IdentificationIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<any>({});
  
  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  const profileData = {
    personal: {
      firstName: studentData?.firstName || 'Marcus',
      lastName: 'Williams',
      email: studentData?.email || 'marcus.williams@capas.edu.bs',
      phone: '+1 (242) 555-0123',
      emergencyContact: 'Sarah Williams - Mother (+1 242 555-0456)',
      dateOfBirth: 'June 15, 2002',
      nationality: 'Bahamian',
      hometown: 'Nassau, New Providence'
    },
    academic: {
      studentId: mockStudent?.studentId || 'CAPAS2024001',
      program: mockStudent?.program || 'Caribbean Music Performance',
      year: mockStudent?.year || 2,
      concentration: 'Steel Drum Performance',
      advisor: 'Dr. James Roberts',
      enrollmentDate: 'August 2023',
      expectedGraduation: 'May 2026',
      status: 'Full-time Student'
    },
    address: {
      campus: 'New Providence Campus',
      dormitory: 'Ocean View Residence Hall',
      room: '204B',
      homeAddress: '123 Paradise Lane, Nassau, Bahamas',
      mailingAddress: 'Same as home address'
    },
    preferences: {
      language: 'English',
      timezone: 'America/Nassau (BST)',
      notifications: 'Email and SMS',
      accessibility: 'None required',
      interests: ['Steel Drum', 'Caribbean Music', 'Cultural Arts', 'Marine Biology'],
      clubs: ['Steel Drum Ensemble', 'Cultural Arts Society', 'Student Government']
    }
  };

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
    // Show success message
  };

  const handleCancel = () => {
    setEditedData({});
    setIsEditing(false);
  };

  const updateEditedData = (section: string, field: string, value: string) => {
    setEditedData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const currentData = isEditing ? editedData : profileData;

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
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <UserIcon className="h-12 w-12 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-capas-coral rounded-full flex items-center justify-center hover:bg-capas-coral/90 transition-colors">
                  <CameraIcon className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold">
                    {profileData.personal.firstName} {profileData.personal.lastName}
                  </h1>
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <p className="text-white/90 text-lg mb-2">
                  {profileData.academic.program} • Year {profileData.academic.year}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-white/80">
                  <div className="flex items-center space-x-2">
                    <IdentificationIcon className="h-5 w-5" />
                    <span>{profileData.academic.studentId}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{profileData.personal.hometown}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <span>{profileData.academic.status}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-capas-palm text-white rounded-lg hover:bg-capas-palm/90 transition-colors"
                  >
                    <CheckIcon className="h-5 w-5" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                    <span>Cancel</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEdit}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Sections */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-capas p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-capas-coral/10 rounded-full flex items-center justify-center">
              <UserCircleIcon className="h-6 w-6 text-capas-coral" />
            </div>
            <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
              Personal Information
            </h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(currentData.personal).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-capas-sand-light last:border-b-0">
                <span className="text-sm font-medium text-capas-ocean-dark/70 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {isEditing && ['firstName', 'lastName', 'phone', 'emergencyContact'].includes(key) ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateEditedData('personal', key, e.target.value)}
                    className="text-right bg-transparent border-b border-capas-turquoise focus:outline-none text-capas-ocean-dark"
                  />
                ) : (
                  <span className="text-capas-ocean-dark">{value}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Academic Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-capas p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-capas-turquoise/10 rounded-full flex items-center justify-center">
              <AcademicCapIcon className="h-6 w-6 text-capas-turquoise" />
            </div>
            <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
              Academic Information
            </h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(currentData.academic).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-capas-sand-light last:border-b-0">
                <span className="text-sm font-medium text-capas-ocean-dark/70 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {isEditing && ['concentration', 'advisor'].includes(key) ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateEditedData('academic', key, e.target.value)}
                    className="text-right bg-transparent border-b border-capas-turquoise focus:outline-none text-capas-ocean-dark"
                  />
                ) : (
                  <span className="text-capas-ocean-dark">{value}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Address Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-capas p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-capas-gold/10 rounded-full flex items-center justify-center">
              <MapPinIcon className="h-6 w-6 text-capas-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
              Address & Housing
            </h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(currentData.address).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-capas-sand-light last:border-b-0">
                <span className="text-sm font-medium text-capas-ocean-dark/70 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {isEditing && ['homeAddress', 'mailingAddress'].includes(key) ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateEditedData('address', key, e.target.value)}
                    className="text-right bg-transparent border-b border-capas-turquoise focus:outline-none text-capas-ocean-dark"
                  />
                ) : (
                  <span className="text-capas-ocean-dark text-right max-w-xs">{value}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Preferences & Interests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-capas p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-capas-palm/10 rounded-full flex items-center justify-center">
              <SparklesIcon className="h-6 w-6 text-capas-palm" />
            </div>
            <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
              Preferences & Interests
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Basic Preferences */}
            <div className="space-y-4">
              {Object.entries(currentData.preferences).filter(([key]) => !['interests', 'clubs'].includes(key)).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-capas-sand-light last:border-b-0">
                  <span className="text-sm font-medium text-capas-ocean-dark/70 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  {isEditing && ['language', 'notifications'].includes(key) ? (
                    <select
                      value={value}
                      onChange={(e) => updateEditedData('preferences', key, e.target.value)}
                      className="text-right bg-transparent border-b border-capas-turquoise focus:outline-none text-capas-ocean-dark"
                    >
                      {key === 'language' ? (
                        <>
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                          <option value="French">French</option>
                        </>
                      ) : (
                        <>
                          <option value="Email and SMS">Email and SMS</option>
                          <option value="Email only">Email only</option>
                          <option value="SMS only">SMS only</option>
                          <option value="None">None</option>
                        </>
                      )}
                    </select>
                  ) : (
                    <span className="text-capas-ocean-dark">{value}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Interests */}
            <div>
              <h4 className="text-sm font-medium text-capas-ocean-dark/70 mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentData.preferences.interests.map((interest: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-capas-turquoise/10 text-capas-turquoise rounded-full text-sm">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Clubs */}
            <div>
              <h4 className="text-sm font-medium text-capas-ocean-dark/70 mb-3">Clubs & Organizations</h4>
              <div className="flex flex-wrap gap-2">
                {currentData.preferences.clubs.map((club: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-capas-coral/10 text-capas-coral rounded-full text-sm">
                    {club}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid md:grid-cols-3 gap-6"
      >
        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <EnvelopeIcon className="h-6 w-6 text-capas-turquoise" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">Update Email</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            Change your primary email address
          </p>
        </div>

        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-coral/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <PhoneIcon className="h-6 w-6 text-capas-coral" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">Emergency Contacts</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            Manage emergency contact information
          </p>
        </div>

        <div className="card-capas p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-capas-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <ClockIcon className="h-6 w-6 text-capas-gold" />
          </div>
          <h4 className="font-medium text-capas-ocean-dark mb-2">Account History</h4>
          <p className="text-sm text-capas-ocean-dark/70">
            View account changes and activity
          </p>
        </div>
      </motion.div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}