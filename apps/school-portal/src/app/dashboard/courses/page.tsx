'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import { courseCatalog, getAvailableCourses, departments, timeSlots, creditOptions, type Course } from '@/lib/course-catalog';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  CalendarIcon,
  UserIcon,
  MapPinIcon,
  SparklesIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function CoursesPage() {
  const { data: session } = useSession();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('All Times');
  const [selectedCredits, setSelectedCredits] = useState('All Credits');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState<'title' | 'department' | 'credits' | 'availability'>('title');
  const [showFilters, setShowFilters] = useState(false);

  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  // Get student's enrolled courses
  const enrolledCourseIds = mockStudent?.courses?.map(course => course.code) || [];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let courses = getAvailableCourses({
      department: selectedDepartment,
      timeSlot: selectedTimeSlot,
      credits: selectedCredits,
      level: selectedLevel,
      searchTerm: searchTerm
    });

    // Sort courses
    courses = courses.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'department':
          return a.department.localeCompare(b.department);
        case 'credits':
          return b.credits - a.credits;
        case 'availability':
          const aAvailability = (a.capacity - a.enrolled) / a.capacity;
          const bAvailability = (b.capacity - b.enrolled) / b.capacity;
          return bAvailability - aAvailability;
        default:
          return 0;
      }
    });

    return courses;
  }, [searchTerm, selectedDepartment, selectedTimeSlot, selectedCredits, selectedLevel, sortBy]);

  // Course statistics
  const courseStats = useMemo(() => {
    const totalCourses = courseCatalog.length;
    const availableCourses = courseCatalog.filter(c => c.status === 'open').length;
    const enrolledCourses = enrolledCourseIds.length;
    const completedCredits = mockStudent?.courses?.reduce((total, course) => total + (course.credits || 3), 0) || 0;

    return {
      totalCourses,
      availableCourses,
      enrolledCourses,
      completedCredits
    };
  }, [enrolledCourseIds, mockStudent]);

  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'waitlist':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'beginner':
        return 'bg-capas-palm/20 text-capas-palm';
      case 'intermediate':
        return 'bg-capas-turquoise/20 text-capas-turquoise';
      case 'advanced':
        return 'bg-capas-coral/20 text-capas-coral';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const isEnrolled = (courseCode: string) => {
    return enrolledCourseIds.includes(courseCode);
  };

  const getAvailabilityPercentage = (course: Course) => {
    return ((course.capacity - course.enrolled) / course.capacity) * 100;
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
            <path d="M0,100 Q100,50 200,100 T400,100 L400,0 L0,0 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpenIcon className="h-8 w-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Course Catalog
            </h1>
            <SparklesIcon className="h-6 w-6" />
          </div>
          <p className="text-white/90 text-lg mb-4">
            Explore our Caribbean-focused academic programs and cultural arts courses
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-5 w-5" />
              <span>Fall 2024 Semester</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-5 w-5" />
              <span>{courseStats.availableCourses} Available Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="h-5 w-5" />
              <span>{courseStats.enrolledCourses} Enrolled</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Course Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="card-capas p-4 text-center">
          <div className="text-2xl font-bold text-capas-turquoise mb-1">
            {courseStats.totalCourses}
          </div>
          <div className="text-sm text-capas-ocean-dark/70">Total Courses</div>
        </div>
        <div className="card-capas p-4 text-center">
          <div className="text-2xl font-bold text-capas-palm mb-1">
            {courseStats.availableCourses}
          </div>
          <div className="text-sm text-capas-ocean-dark/70">Available</div>
        </div>
        <div className="card-capas p-4 text-center">
          <div className="text-2xl font-bold text-capas-coral mb-1">
            {courseStats.enrolledCourses}
          </div>
          <div className="text-sm text-capas-ocean-dark/70">Enrolled</div>
        </div>
        <div className="card-capas p-4 text-center">
          <div className="text-2xl font-bold text-capas-gold mb-1">
            {courseStats.completedCredits}
          </div>
          <div className="text-sm text-capas-ocean-dark/70">Credits</div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card-capas p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-capas-ocean-dark/40" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-capas pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-capas-turquoise text-white border-capas-turquoise' 
                  : 'border-capas-sand-light text-capas-ocean-dark hover:bg-capas-sand-light'
              }`}
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-capas-turquoise text-white' : 'text-capas-ocean-dark hover:bg-capas-sand-light'}`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-capas-turquoise text-white' : 'text-capas-ocean-dark hover:bg-capas-sand-light'}`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-capas-sand-light"
          >
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Department
              </label>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="input-capas"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Time Slot
              </label>
              <select 
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
                className="input-capas"
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Credits
              </label>
              <select 
                value={selectedCredits}
                onChange={(e) => setSelectedCredits(e.target.value)}
                className="input-capas"
              >
                {creditOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Level
              </label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="input-capas"
              >
                <option value="All Levels">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Sort By
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-capas"
              >
                <option value="title">Course Title</option>
                <option value="department">Department</option>
                <option value="credits">Credits</option>
                <option value="availability">Availability</option>
              </select>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70">
        <span>
          Showing {filteredCourses.length} of {courseCatalog.length} courses
        </span>
        {searchTerm && (
          <span>
            Search results for "{searchTerm}"
          </span>
        )}
      </div>

      {/* Course Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      >
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.code);
          const availability = getAvailabilityPercentage(course);
          
          if (viewMode === 'grid') {
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`card-capas p-6 hover:shadow-lg transition-shadow ${
                  enrolled ? 'ring-2 ring-capas-palm' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-capas-ocean-dark">
                        {course.code}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                      {enrolled && (
                        <span className="px-2 py-1 text-xs rounded-full bg-capas-palm text-white">
                          Enrolled
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-capas-ocean-dark mb-3 line-clamp-2">
                      {course.title}
                    </h4>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                <p className="text-sm text-capas-ocean-dark/70 mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{course.credits}</span>
                      <span className="text-capas-ocean-dark/70">credits</span>
                    </div>
                    <div className="text-capas-ocean-dark/70">{course.department}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{course.schedule.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{course.schedule.days.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="h-4 w-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{course.schedule.location}</span>
                    </div>
                  </div>
                </div>

                {/* Enrollment Status */}
                <div className="border-t border-capas-sand-light pt-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-capas-ocean-dark/70">
                      {course.enrolled}/{course.capacity} enrolled
                    </span>
                    <span className={`font-medium ${
                      availability > 50 ? 'text-capas-palm' : 
                      availability > 20 ? 'text-capas-gold' : 'text-capas-coral'
                    }`}>
                      {Math.round(availability)}% available
                    </span>
                  </div>
                  
                  <div className="w-full bg-capas-sand-light rounded-full h-2 mb-3">
                    <div 
                      className="bg-capas-turquoise h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((course.enrolled / course.capacity) * 100)}%` }}
                    ></div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-capas-sand-light text-capas-ocean-dark rounded">
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-capas-ocean-dark/60">
                        +{course.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          } else {
            // List view
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`card-capas p-6 hover:shadow-md transition-shadow ${
                  enrolled ? 'ring-2 ring-capas-palm' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-capas-ocean-dark text-lg">
                        {course.code} - {course.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                      {enrolled && (
                        <span className="px-2 py-1 text-xs rounded-full bg-capas-palm text-white">
                          Enrolled
                        </span>
                      )}
                    </div>
                    
                    <p className="text-capas-ocean-dark/80 mb-3">
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-capas-ocean-dark/70">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">{course.credits}</span>
                        <span>credits</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{course.schedule.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{course.schedule.days.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <UserIcon className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-right">
                    <div className="text-sm text-capas-ocean-dark/70 mb-1">
                      {course.enrolled}/{course.capacity} enrolled
                    </div>
                    <div className={`text-sm font-medium ${
                      availability > 50 ? 'text-capas-palm' : 
                      availability > 20 ? 'text-capas-gold' : 'text-capas-coral'
                    }`}>
                      {Math.round(availability)}% available
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }
        })}
      </motion.div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpenIcon className="h-16 w-16 text-capas-ocean-dark/40 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-capas-ocean-dark mb-2">
            No courses found
          </h3>
          <p className="text-capas-ocean-dark/70 mb-4">
            Try adjusting your search or filter criteria to find more courses.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedDepartment('All Departments');
              setSelectedTimeSlot('All Times');
              setSelectedCredits('All Credits');
              setSelectedLevel('All Levels');
            }}
            className="btn-capas-primary"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}