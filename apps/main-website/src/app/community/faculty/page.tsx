'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AcademicCapIcon,
  EnvelopeIcon,
  StarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  TrophyIcon,
  GlobeAltIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import facultyData from '../../../../mocks/faculty.json';

interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  specialization: string[];
  bio: string;
  education: {
    degree: string;
    institution: string;
    year: number;
  }[];
  experience: {
    position: string;
    organization: string;
    years: string;
  }[];
  achievements: string[];
  courses: string[];
  contactEmail: string;
  officeHours: string;
  profileImage: string;
  isFullTime: boolean;
  yearsAtCAPAS: number;
  socialMedia?: {
    linkedin?: string;
    website?: string;
    instagram?: string;
  };
  featured: boolean;
  studentTestimonials: {
    name: string;
    program: string;
    year: number;
    quote: string;
    rating: number;
  }[];
}

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [filteredFaculty, setFilteredFaculty] = useState<Faculty[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setFaculty(facultyData.faculty);
      setFilteredFaculty(facultyData.faculty);
      setLoading(false);
    }, 300);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = faculty;

    // Filter by department
    if (selectedDepartment !== 'all') {
      filtered = filtered.filter(member => member.department === selectedDepartment);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(member =>
        `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        member.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFaculty(filtered);
  }, [faculty, selectedDepartment, searchTerm]);

  // Get unique departments
  const departments = ['all', ...Array.from(new Set(faculty.map(member => member.department)))];

  const getDepartmentLabel = (dept: string) => {
    const labels: { [key: string]: string } = {
      'all': 'All Faculty',
      'music': 'Music',
      'theatre': 'Theatre',
      'dance': 'Dance',
      'visual-arts': 'Visual Arts',
      'academic': 'Academic Studies',
      'administration': 'Administration'
    };
    return labels[dept] || dept;
  };

  const departmentStats = departments.map(dept => ({
    id: dept,
    name: getDepartmentLabel(dept),
    count: dept === 'all' ? faculty.length : faculty.filter(f => f.department === dept).length
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark font-montserrat">Loading faculty profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <>
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
                Our Faculty & Staff
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Meet the passionate educators, artists, and mentors who make CAPAS an extraordinary place to learn and grow
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-white border-b border-capas-ocean-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-capas-ocean-dark/50" />
                <input
                  type="text"
                  placeholder="Search faculty by name, specialization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors font-montserrat"
                />
              </div>

              {/* Department Filter */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2 mr-4">
                  <FunnelIcon className="h-5 w-5 text-capas-ocean-dark" />
                  <span className="text-capas-ocean-dark font-medium font-montserrat">Filter:</span>
                </div>
                {departmentStats.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 font-montserrat text-sm ${
                      selectedDepartment === dept.id
                        ? 'bg-capas-turquoise text-white shadow-lg'
                        : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light hover:shadow-md'
                    }`}
                  >
                    {dept.name}
                    <span className="ml-1 text-xs opacity-75">({dept.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 text-center">
              <p className="text-capas-ocean-dark font-montserrat">
                Showing {filteredFaculty.length} faculty member{filteredFaculty.length !== 1 ? 's' : ''}
                {selectedDepartment !== 'all' && ` in ${getDepartmentLabel(selectedDepartment)}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Featured Faculty */}
            {selectedDepartment === 'all' && !searchTerm && (
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                    Featured Faculty
                  </h2>
                  <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                    Spotlight on our distinguished educators and their outstanding contributions
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {faculty.filter(member => member.featured).slice(0, 3).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedFaculty(member)}
                    >
                      {/* Featured Badge */}
                      <div className="relative">
                        <div className="h-64 relative overflow-hidden">
                          <PlaceholderImage
                            width={400}
                            height={256}
                            text={`${member.firstName} ${member.lastName}`}
                            variant="portrait"
                            colorScheme="turquoise"
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                            <StarIcon className="w-4 h-4 mr-1" />
                            Featured
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="inline-block bg-white/90 text-capas-turquoise px-3 py-1 rounded-full text-sm font-semibold capitalize">
                            {member.department}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-capas-gold font-semibold mb-2">{member.title}</p>
                        <p className="text-capas-ocean-dark text-sm mb-4 line-clamp-3">
                          {member.bio}
                        </p>
                        
                        {/* Specializations */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.specialization.slice(0, 2).map((spec) => (
                            <span key={spec} className="text-xs bg-capas-sand-light text-capas-ocean-dark px-2 py-1 rounded-full">
                              {spec}
                            </span>
                          ))}
                          {member.specialization.length > 2 && (
                            <span className="text-xs text-capas-turquoise">
                              +{member.specialization.length - 2} more
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-capas-ocean-light/20">
                          <div className="text-center">
                            <p className="text-lg font-bold text-capas-turquoise">{member.yearsAtCAPAS}</p>
                            <p className="text-xs text-capas-ocean-dark/70">Years at CAPAS</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-bold text-capas-turquoise">{member.courses.length}</p>
                            <p className="text-xs text-capas-ocean-dark/70">Courses</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All Faculty Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedDepartment}-${searchTerm}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!selectedDepartment.includes('all') || searchTerm ? (
                  <div className="mb-8">
                    <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                      {selectedDepartment !== 'all' ? getDepartmentLabel(selectedDepartment) : 'Search Results'}
                    </h2>
                  </div>
                ) : null}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredFaculty.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedFaculty(member)}
                    >
                      <div className="relative">
                        <div className="h-48 relative overflow-hidden">
                          <PlaceholderImage
                            width={300}
                            height={192}
                            text={`${member.firstName} ${member.lastName}`}
                            variant="portrait"
                            colorScheme={member.department === 'music' ? 'turquoise' : 
                                        member.department === 'theatre' ? 'coral' : 
                                        member.department === 'dance' ? 'palm' : 'gold'}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                        </div>
                        
                        {/* Status Indicators */}
                        <div className="absolute top-3 left-3">
                          {member.isFullTime && (
                            <span className="inline-block bg-capas-turquoise text-white px-2 py-1 rounded-full text-xs font-semibold">
                              Full-Time
                            </span>
                          )}
                        </div>
                        
                        <div className="absolute top-3 right-3">
                          <span className="inline-block bg-white/90 text-capas-ocean-dark px-2 py-1 rounded-full text-xs font-semibold capitalize">
                            {member.department}
                          </span>
                        </div>
                        
                        {/* Verification Badge */}
                        {member.achievements.length > 0 && (
                          <div className="absolute bottom-3 right-3">
                            <CheckBadgeIcon className="w-6 h-6 text-capas-gold" />
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-1 group-hover:text-capas-turquoise-dark transition-colors">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-capas-gold font-medium text-sm mb-2">{member.title}</p>
                        
                        {/* Quick Info */}
                        <div className="flex items-center justify-between text-xs text-capas-ocean-dark/70 mb-3">
                          <span>{member.yearsAtCAPAS} years</span>
                          <span>{member.courses.length} courses</span>
                        </div>
                        
                        {/* Primary Specialization */}
                        <div className="mb-3">
                          <span className="text-xs bg-capas-sand-light text-capas-ocean-dark px-2 py-1 rounded-full">
                            {member.specialization[0]}
                          </span>
                        </div>

                        {/* Student Rating (if testimonials exist) */}
                        {member.studentTestimonials.length > 0 && (
                          <div className="flex items-center justify-between pt-3 border-t border-capas-ocean-light/20">
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.round(member.studentTestimonials.reduce((acc, t) => acc + t.rating, 0) / member.studentTestimonials.length)
                                      ? 'text-capas-gold fill-current'
                                      : 'text-capas-ocean-light/30'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-capas-ocean-dark/70">
                              {member.studentTestimonials.length} review{member.studentTestimonials.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredFaculty.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <UserCircleIcon className="w-16 h-16 text-capas-ocean-light/50 mx-auto mb-4" />
                <h3 className="font-montserrat text-2xl font-semibold text-capas-turquoise mb-2">
                  No Faculty Found
                </h3>
                <p className="text-capas-ocean-dark mb-6">
                  Try adjusting your search criteria or browse all faculty members.
                </p>
                <button
                  onClick={() => {
                    setSelectedDepartment('all');
                    setSearchTerm('');
                  }}
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 font-montserrat"
                >
                  Show All Faculty
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Faculty Detail Modal */}
        <AnimatePresence>
          {selectedFaculty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedFaculty(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Content */}
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedFaculty(null)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-capas-ocean-dark hover:text-capas-turquoise transition-colors"
                  >
                    ×
                  </button>

                  {/* Header */}
                  <div className="relative h-64 bg-gradient-to-br from-capas-turquoise to-capas-ocean">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative p-8 h-full flex items-end">
                      <div className="flex items-end space-x-6">
                        <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                          <PlaceholderImage
                            width={128}
                            height={128}
                            text={`${selectedFaculty.firstName} ${selectedFaculty.lastName}`}
                            variant="portrait"
                            colorScheme="turquoise"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="text-white">
                          <h2 className="font-montserrat text-3xl font-bold mb-2">
                            {selectedFaculty.firstName} {selectedFaculty.lastName}
                          </h2>
                          <p className="text-capas-gold text-xl font-semibold mb-2">
                            {selectedFaculty.title}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="bg-white/20 px-3 py-1 rounded-full capitalize">
                              {selectedFaculty.department}
                            </span>
                            <span>{selectedFaculty.yearsAtCAPAS} years at CAPAS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                      
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        
                        {/* Bio */}
                        <div>
                          <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                            About
                          </h3>
                          <p className="text-capas-ocean-dark leading-relaxed">
                            {selectedFaculty.bio}
                          </p>
                        </div>

                        {/* Specializations */}
                        <div>
                          <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                            Specializations
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedFaculty.specialization.map((spec) => (
                              <span key={spec} className="bg-capas-sand-light text-capas-ocean-dark px-3 py-2 rounded-lg text-sm font-medium">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Courses */}
                        <div>
                          <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                            Courses Taught
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {selectedFaculty.courses.map((course) => (
                              <div key={course} className="bg-white border border-capas-ocean-light/20 rounded-lg p-3">
                                <p className="text-capas-ocean-dark font-medium text-sm">{course}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Student Testimonials */}
                        {selectedFaculty.studentTestimonials.length > 0 && (
                          <div>
                            <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                              Student Reviews
                            </h3>
                            <div className="space-y-4">
                              {selectedFaculty.studentTestimonials.map((testimonial, index) => (
                                <div key={index} className="bg-capas-sand-light rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="font-semibold text-capas-ocean-dark">{testimonial.name}</p>
                                      <p className="text-sm text-capas-ocean-dark/70">{testimonial.program} • Class of {testimonial.year}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < testimonial.rating
                                              ? 'text-capas-gold fill-current'
                                              : 'text-capas-ocean-light/30'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-capas-ocean-dark italic">&quot;{testimonial.quote}&quot;</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6">
                        
                        {/* Contact Info */}
                        <div className="bg-capas-sand-light rounded-lg p-6">
                          <h4 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4">
                            Contact Information
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <EnvelopeIcon className="w-5 h-5 text-capas-turquoise" />
                              <a href={`mailto:${selectedFaculty.contactEmail}`} className="text-capas-turquoise hover:underline text-sm">
                                {selectedFaculty.contactEmail}
                              </a>
                            </div>
                            <div className="flex items-center space-x-3">
                              <ClockIcon className="w-5 h-5 text-capas-turquoise" />
                              <span className="text-capas-ocean-dark text-sm">{selectedFaculty.officeHours}</span>
                            </div>
                          </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white border border-capas-ocean-light/20 rounded-lg p-6">
                          <h4 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4 flex items-center">
                            <AcademicCapIcon className="w-5 h-5 mr-2" />
                            Education
                          </h4>
                          <div className="space-y-3">
                            {selectedFaculty.education.map((edu, index) => (
                              <div key={index}>
                                <p className="font-semibold text-capas-ocean-dark text-sm">{edu.degree}</p>
                                <p className="text-capas-ocean-dark/70 text-sm">{edu.institution}</p>
                                <p className="text-capas-turquoise text-sm">{edu.year}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Experience */}
                        <div className="bg-white border border-capas-ocean-light/20 rounded-lg p-6">
                          <h4 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4">
                            Experience
                          </h4>
                          <div className="space-y-3">
                            {selectedFaculty.experience.map((exp, index) => (
                              <div key={index}>
                                <p className="font-semibold text-capas-ocean-dark text-sm">{exp.position}</p>
                                <p className="text-capas-ocean-dark/70 text-sm">{exp.organization}</p>
                                <p className="text-capas-turquoise text-sm">{exp.years}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Achievements */}
                        {selectedFaculty.achievements.length > 0 && (
                          <div className="bg-white border border-capas-ocean-light/20 rounded-lg p-6">
                            <h4 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4 flex items-center">
                              <TrophyIcon className="w-5 h-5 mr-2" />
                              Achievements
                            </h4>
                            <ul className="space-y-2">
                              {selectedFaculty.achievements.map((achievement, index) => (
                                <li key={index} className="text-capas-ocean-dark text-sm flex items-start space-x-2">
                                  <StarIcon className="w-4 h-4 text-capas-gold mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Social Media */}
                        {selectedFaculty.socialMedia && (
                          <div className="bg-white border border-capas-ocean-light/20 rounded-lg p-6">
                            <h4 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4 flex items-center">
                              <GlobeAltIcon className="w-5 h-5 mr-2" />
                              Connect
                            </h4>
                            <div className="space-y-2">
                              {Object.entries(selectedFaculty.socialMedia).map(([platform, url]) => (
                                <a
                                  key={platform}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block text-capas-turquoise hover:text-capas-turquoise-dark text-sm capitalize transition-colors"
                                >
                                  {platform} →
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}