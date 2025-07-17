'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useUserStore from '@/stores/userStore';
import useCourseStore from '@/stores/courseStore';
import {
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  BookOpenIcon,
  CheckCircleIcon,
  StarIcon,
  AcademicCapIcon,
  FireIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleSolidIcon,
  TrophyIcon as TrophySolidIcon
} from '@heroicons/react/24/solid';

interface ProgressData {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  totalAssignments: number;
  completedAssignments: number;
  averageGrade: number;
  totalStudyHours: number;
  weeklyGoal: number;
  currentStreak: number;
  longestStreak: number;
  certificates: number;
  badges: number;
}

const mockProgressData: ProgressData = {
  totalCourses: 5,
  completedCourses: 2,
  inProgressCourses: 3,
  totalAssignments: 24,
  completedAssignments: 18,
  averageGrade: 87.5,
  totalStudyHours: 156,
  weeklyGoal: 12,
  currentStreak: 7,
  longestStreak: 14,
  certificates: 2,
  badges: 8
};

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
}

const achievements: Achievement[] = [
  {
    id: 'first-course',
    title: 'First Steps',
    description: 'Complete your first course',
    icon: CheckCircleSolidIcon,
    color: 'text-capas-palm',
    unlocked: true,
    unlockedDate: '2024-01-15'
  },
  {
    id: 'week-streak',
    title: 'Weekly Warrior',
    description: 'Study 7 days in a row',
    icon: FireIcon,
    color: 'text-capas-coral',
    unlocked: true,
    unlockedDate: '2024-01-22'
  },
  {
    id: 'grade-master',
    title: 'Grade Master',
    description: 'Achieve 90% average grade',
    icon: TrophySolidIcon,
    color: 'text-capas-gold',
    unlocked: false
  },
  {
    id: 'community-leader',
    title: 'Community Leader',
    description: 'Help 10 fellow students in forums',
    icon: StarIcon,
    color: 'text-capas-purple',
    unlocked: false
  }
];

export default function ProgressTracker() {
  const { user, isAuthenticated } = useUserStore();
  const { courses, fetchEnrolledCourses } = useCourseStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses('inprogress');
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="font-display text-2xl font-bold text-capas-turquoise mb-2">Login Required</h1>
          <p className="text-capas-ocean-dark mb-6">Please log in to view your progress.</p>
          <Link href="/" className="btn-capas-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (mockProgressData.completedAssignments / mockProgressData.totalAssignments) * 100;
  const weeklyProgress = (mockProgressData.totalStudyHours / mockProgressData.weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light pt-20">
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
                Progress Tracker
              </h1>
              <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto mb-8">
                Track your learning journey, achievements, and academic growth
              </p>
              <div className="flex justify-center space-x-4">
                {['week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedPeriod === period
                        ? 'bg-white text-capas-turquoise'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              title: 'Courses Completed', 
              value: `${mockProgressData.completedCourses}/${mockProgressData.totalCourses}`, 
              icon: CheckCircleIcon, 
              color: 'text-capas-palm',
              change: '+1 this month',
              changeType: 'up'
            },
            { 
              title: 'Average Grade', 
              value: `${mockProgressData.averageGrade}%`, 
              icon: TrophyIcon, 
              color: 'text-capas-gold',
              change: '+2.5% this month',
              changeType: 'up'
            },
            { 
              title: 'Study Hours', 
              value: mockProgressData.totalStudyHours, 
              icon: ClockIcon, 
              color: 'text-capas-coral',
              change: '+8h this week',
              changeType: 'up'
            },
            { 
              title: 'Current Streak', 
              value: `${mockProgressData.currentStreak} days`, 
              icon: FireIcon, 
              color: 'text-capas-purple',
              change: mockProgressData.currentStreak > mockProgressData.longestStreak ? 'New record!' : 'Keep going!',
              changeType: mockProgressData.currentStreak > mockProgressData.longestStreak ? 'up' : 'neutral'
            }
          ].map((stat, index) => (
            <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="flex items-center space-x-1 text-sm">
                  {stat.changeType === 'up' && <ArrowUpIcon className="w-4 h-4 text-green-500" />}
                  {stat.changeType === 'down' && <ArrowDownIcon className="w-4 h-4 text-red-500" />}
                  <span className={`${
                    stat.changeType === 'up' ? 'text-green-600' : 
                    stat.changeType === 'down' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Progress */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Course Progress</h3>
              
              {courses.map((course, index) => (
                <div key={course.id} className="mb-6 last:mb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{course.fullname}</h4>
                    <span className="text-sm text-gray-500">{course.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${course.progress || 0}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-capas-turquoise to-capas-ocean h-3 rounded-full"
                    />
                  </div>
                </div>
              ))}

              {courses.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BookOpenIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No courses enrolled yet.</p>
                  <Link href="/my-courses" className="text-capas-turquoise hover:underline">
                    Browse available courses
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Weekly Goals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Study Goal</h3>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700">Study Hours This Week</span>
                  <span className="font-semibold">{mockProgressData.totalStudyHours}h / {mockProgressData.weeklyGoal}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(weeklyProgress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-4 rounded-full ${
                      weeklyProgress >= 100 ? 'bg-gradient-to-r from-capas-palm to-green-500' : 
                      weeklyProgress >= 75 ? 'bg-gradient-to-r from-capas-gold to-capas-coral' :
                      'bg-gradient-to-r from-capas-turquoise to-capas-ocean'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{day}</div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      index < mockProgressData.currentStreak ? 'bg-capas-palm text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-capas-turquoise bg-capas-turquoise/5'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <achievement.icon
                        className={`w-6 h-6 ${
                          achievement.unlocked ? achievement.color : 'text-gray-400'
                        }`}
                      />
                      <div className="flex-1">
                        <h4 className={`font-medium ${
                          achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.unlockedDate && (
                          <p className="text-xs text-capas-turquoise mt-2">
                            Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-capas-turquoise">
                    {achievements.filter(a => a.unlocked).length}/{achievements.length}
                  </div>
                  <div className="text-sm text-gray-600">Achievements Unlocked</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/my-courses"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-capas-turquoise hover:bg-capas-turquoise/5 transition-all"
            >
              <AcademicCapIcon className="w-8 h-8 text-capas-turquoise" />
              <div>
                <div className="font-medium text-gray-900">Continue Learning</div>
                <div className="text-sm text-gray-600">Resume your courses</div>
              </div>
            </Link>
            
            <Link
              href="/forums"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-capas-coral hover:bg-capas-coral/5 transition-all"
            >
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-capas-coral" />
              <div>
                <div className="font-medium text-gray-900">Join Discussions</div>
                <div className="text-sm text-gray-600">Connect with peers</div>
              </div>
            </Link>
            
            <Link
              href="/gallery"
              className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-capas-gold hover:bg-capas-gold/5 transition-all"
            >
              <BookOpenIcon className="w-8 h-8 text-capas-gold" />
              <div>
                <div className="font-medium text-gray-900">Browse Resources</div>
                <div className="text-sm text-gray-600">Find study materials</div>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}