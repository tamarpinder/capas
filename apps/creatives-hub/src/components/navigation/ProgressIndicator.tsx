'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useCourseStore from '@/stores/courseStore';
import useUserStore from '@/stores/userStore';
import {
  AcademicCapIcon,
  TrophyIcon,
  ClockIcon,
  ChevronRightIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface ProgressIndicatorProps {
  className?: string;
}

export default function ProgressIndicator({ className = '' }: ProgressIndicatorProps) {
  const { courses } = useCourseStore();
  const { user } = useUserStore();

  if (!user || courses.length === 0) return null;

  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const averageProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) / totalCourses
  );

  const activeCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
  const mostRecentCourse = activeCourses.length > 0 ? activeCourses[0] : null;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-capas-palm';
    if (progress >= 60) return 'text-capas-gold';
    if (progress >= 40) return 'text-capas-turquoise';
    return 'text-capas-coral';
  };

  const getProgressBgColor = (progress: number) => {
    if (progress >= 80) return 'bg-capas-palm';
    if (progress >= 60) return 'bg-capas-gold';
    if (progress >= 40) return 'bg-capas-turquoise';
    return 'bg-capas-coral';
  };

  return (
    <div className={`relative ${className}`}>
      <Link
        href="/my-courses"
        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-capas-ocean-light/50 transition-colors group"
      >
        {/* Progress Circle */}
        <div className="relative w-8 h-8">
          <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200"
            />
            <motion.circle
              cx="16"
              cy="16"
              r="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 12}
              strokeDashoffset={2 * Math.PI * 12 * (1 - averageProgress / 100)}
              strokeLinecap="round"
              className={getProgressColor(averageProgress)}
              initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 12 * (1 - averageProgress / 100) }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-xs font-semibold ${getProgressColor(averageProgress)}`}>
              {averageProgress}%
            </span>
          </div>
        </div>

        {/* Progress Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-900">
              Learning Progress
            </span>
            {activeCourses.length > 0 && (
              <FireIcon className="w-4 h-4 text-capas-coral" />
            )}
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span className="flex items-center">
              <AcademicCapIcon className="w-3 h-3 mr-1" />
              {totalCourses} courses
            </span>
            <span className="flex items-center">
              <TrophyIcon className="w-3 h-3 mr-1" />
              {completedCourses} completed
            </span>
            {mostRecentCourse && (
              <span className="flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                {mostRecentCourse.shortname}
              </span>
            )}
          </div>
        </div>

        <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-capas-turquoise transition-colors" />
      </Link>

      {/* Active Courses Quick Access */}
      {activeCourses.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <div className="px-3 py-2 border-b border-gray-100">
            <h3 className="font-medium text-gray-900 text-sm">Active Courses</h3>
          </div>
          <div className="py-2 max-h-48 overflow-y-auto">
            {activeCourses.slice(0, 4).map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="block px-3 py-2 hover:bg-capas-ocean-light/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-capas-turquoise"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {course.shortname}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${getProgressBgColor(course.progress)}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}