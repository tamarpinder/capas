'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import CourseCard from '@/components/courses/CourseCard';
import ProgressTracker from '@/components/ui/ProgressTracker';
import UpcomingTasks from '@/components/courses/UpcomingTasks';
import useCourseStore from '@/stores/courseStore';
import useUserStore from '@/stores/userStore';
import {
  AcademicCapIcon,
  TrophyIcon,
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function MyCourses() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Use our new state management
  const { 
    courses, 
    loading, 
    error, 
    fetchEnrolledCourses, 
    clearError 
  } = useCourseStore();
  
  const { user, isAuthenticated } = useUserStore();

  // Authentication guard - redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="font-display text-2xl font-bold text-capas-turquoise mb-2">Login Required</h1>
          <p className="text-capas-ocean-dark mb-6">Please log in to access your courses.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-capas-turquoise text-white font-semibold rounded-lg hover:bg-capas-turquoise-dark transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses('inprogress');
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  // Clear any errors when component mounts
  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpenIcon, color: '#0A8A98' },
    { id: 'visual_arts', name: 'Visual Arts', icon: SparklesIcon, color: '#FF8B87' },
    { id: 'music_tech', name: 'Music Tech', icon: SparklesIcon, color: '#FFCE00' },
    { id: 'design', name: 'Design', icon: SparklesIcon, color: '#7FA900' },
    { id: 'media_arts', name: 'Media Arts', icon: SparklesIcon, color: '#A8D5E2' },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => {
        const categoryMap: { [key: string]: string } = {
          'visual_arts': 'Visual Arts',
          'music_tech': 'Music Technology',
          'design': 'Design',
          'media_arts': 'Media Arts'
        };
        return course.department === categoryMap[selectedCategory];
      });

  const stats = {
    totalCourses: courses.length,
    completedCourses: courses.filter(c => c.progress === 100).length,
    averageProgress: courses.length > 0 
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
      : 0,
    totalCredits: courses.reduce((sum, c) => sum + c.credits, 0)
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your creative journey...</p>
          {user && (
            <p className="text-gray-500 mt-2">Welcome back, {user.firstname}!</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              clearError();
              fetchEnrolledCourses('inprogress');
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light">
      {/* Modern Hero Header */}
      <div className="bg-gradient-to-r from-capas-turquoise via-capas-turquoise-dark to-capas-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              My Creative Courses
            </h1>
            <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto">
              Your journey through creative excellence and professional development
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              title: 'Enrolled Courses', 
              value: stats.totalCourses, 
              icon: BookOpenIcon, 
              color: 'bg-capas-turquoise',
              subtitle: 'Active Learning'
            },
            { 
              title: 'Average Progress', 
              value: `${stats.averageProgress}%`, 
              icon: ChartBarIcon, 
              color: 'bg-capas-palm',
              subtitle: 'Completion Rate'
            },
            { 
              title: 'Total Credits', 
              value: stats.totalCredits, 
              icon: AcademicCapIcon, 
              color: 'bg-orange-600',
              subtitle: 'Academic Units'
            },
            { 
              title: 'Completed', 
              value: stats.completedCourses, 
              icon: TrophyIcon, 
              color: 'bg-purple-600',
              subtitle: 'Achievements'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-gray-700 mb-1">{stat.title}</div>
                <div className="text-xs text-gray-500">{stat.subtitle}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-capas-turquoise text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-capas-ocean-light border border-gray-200'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Courses ({filteredCourses.length})
              </h2>
              <p className="text-gray-600">
                Continue your creative journey with these active courses
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-xl border border-gray-200"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses in this category
                </h3>
                <p className="text-gray-600">
                  Try selecting a different category or enroll in new courses
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Progress Overview
                </h3>
                <ProgressTracker 
                  value={stats.averageProgress} 
                  size={120}
                  strokeWidth={8}
                  color="#0A8A98"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Courses Active</span>
                    <span className="font-medium text-gray-900">{stats.totalCourses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Credits Earned</span>
                    <span className="font-medium text-gray-900">{stats.totalCredits}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <UpcomingTasks courses={courses} />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-capas-turquoise text-white font-medium rounded-lg px-4 py-2 text-sm hover:bg-capas-turquoise-dark transition-colors">
                    Browse Course Catalog
                  </button>
                  <button className="w-full bg-capas-ocean-light text-capas-ocean-dark font-medium rounded-lg px-4 py-2 text-sm hover:bg-capas-ocean transition-colors">
                    Join Study Groups
                  </button>
                  <button className="w-full bg-capas-gold-light text-capas-gold-dark border border-capas-gold rounded-lg px-4 py-2 text-sm hover:bg-capas-gold transition-colors">
                    View Achievements
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}