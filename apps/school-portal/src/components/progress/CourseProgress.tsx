'use client';

import { motion } from 'framer-motion';
import { 
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface CourseProgressProps {
  courses: Course[];
  getGradeColor: (grade: string) => string;
}

export default function CourseProgress({ courses, getGradeColor }: CourseProgressProps) {
  return (
    <div className="space-y-6">
      {/* Course Cards */}
      <div className="grid gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card-capas p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
                    {course.code} - {course.name}
                  </h3>
                  <span className={`text-lg font-bold ${getGradeColor(course.currentGrade)}`}>
                    {course.currentGrade}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpenIcon className="h-4 w-4" />
                    <span>{course.credits} credits</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-capas-ocean-dark">
                  {course.completion}%
                </div>
                <div className="text-sm text-capas-ocean-dark/70">Complete</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="w-full bg-capas-sand-light rounded-full h-3">
                <div 
                  className={`${course.color} h-3 rounded-full transition-all duration-1000`}
                  style={{ width: `${course.completion}%` }}
                ></div>
              </div>
            </div>

            {/* Assignments Overview */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-capas-palm/10 rounded-lg p-3 text-center">
                <CheckCircleIcon className="h-6 w-6 text-capas-palm mx-auto mb-1" />
                <div className="text-lg font-bold text-capas-ocean-dark">
                  {course.assignments.completed}
                </div>
                <div className="text-xs text-capas-ocean-dark/70">Completed</div>
              </div>
              
              <div className="bg-capas-gold/10 rounded-lg p-3 text-center">
                <ClockIcon className="h-6 w-6 text-capas-gold mx-auto mb-1" />
                <div className="text-lg font-bold text-capas-ocean-dark">
                  {course.assignments.upcoming}
                </div>
                <div className="text-xs text-capas-ocean-dark/70">Upcoming</div>
              </div>
              
              <div className="bg-capas-turquoise/10 rounded-lg p-3 text-center">
                <DocumentTextIcon className="h-6 w-6 text-capas-turquoise mx-auto mb-1" />
                <div className="text-lg font-bold text-capas-ocean-dark">
                  {course.assignments.total}
                </div>
                <div className="text-xs text-capas-ocean-dark/70">Total</div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            {course.assignments.upcoming > 0 && (
              <div className="bg-capas-coral/5 border border-capas-coral/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-capas-coral">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    Next assignment due in 3 days
                  </span>
                </div>
              </div>
            )}

            {/* Course Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-capas-sand-light">
              <button className="text-capas-turquoise hover:text-capas-turquoise/80 text-sm font-medium">
                View Syllabus
              </button>
              <button className="text-capas-turquoise hover:text-capas-turquoise/80 text-sm font-medium">
                Grade Details
              </button>
              <button className="text-capas-turquoise hover:text-capas-turquoise/80 text-sm font-medium">
                Resources
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6"
      >
        <h4 className="font-display text-lg font-semibold text-capas-turquoise mb-4">
          Semester Summary
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {courses.reduce((acc, c) => acc + c.assignments.completed, 0)}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Total Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {courses.reduce((acc, c) => acc + c.assignments.upcoming, 0)}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Due Soon</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {Math.round(courses.reduce((acc, c) => acc + c.completion, 0) / courses.length)}%
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Avg Progress</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {courses.reduce((acc, c) => acc + c.credits, 0)}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Total Credits</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}