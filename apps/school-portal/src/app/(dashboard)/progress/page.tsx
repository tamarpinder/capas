'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import GradeChart from '@/components/progress/GradeChart';
import CourseProgress from '@/components/progress/CourseProgress';
import AchievementBadges from '@/components/progress/AchievementBadges';
import ProgressOverview from '@/components/progress/ProgressOverview';
import {
  ChartBarIcon,
  TrophyIcon,
  AcademicCapIcon,
  SparklesIcon,
  BookOpenIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ProgressPage() {
  const { data: session } = useSession();
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [viewType, setViewType] = useState<'overview' | 'courses' | 'grades' | 'achievements'>('overview');

  const studentData = session?.user as any;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  // Generate mock academic data
  const academicData = {
    currentGPA: mockStudent?.gpa || 3.7,
    cumulativeGPA: 3.65,
    totalCredits: 45,
    creditsThisSemester: 12,
    creditsNeeded: 120,
    expectedGraduation: 'Spring 2026',
    currentStanding: 'Good Standing',
    
    semesterGrades: [
      { semester: 'Fall 2023', gpa: 3.4, credits: 15 },
      { semester: 'Spring 2024', gpa: 3.8, credits: 15 },
      { semester: 'Summer 2024', gpa: 3.9, credits: 3 },
      { semester: 'Fall 2024', gpa: 3.7, credits: 12 }
    ],

    courseProgress: [
      {
        code: 'MUS 201',
        name: 'Music Theory II',
        instructor: 'Prof. Johnson',
        credits: 3,
        currentGrade: 'A-',
        completion: 75,
        assignments: { completed: 8, total: 12, upcoming: 2 },
        color: 'bg-capas-turquoise'
      },
      {
        code: 'MUS 245',
        name: 'Digital Audio Production',
        instructor: 'Prof. Williams',
        credits: 3,
        currentGrade: 'B+',
        completion: 60,
        assignments: { completed: 5, total: 10, upcoming: 3 },
        color: 'bg-capas-coral'
      },
      {
        code: 'ENG 201',
        name: 'Creative Writing',
        instructor: 'Prof. Davis',
        credits: 3,
        currentGrade: 'A',
        completion: 85,
        assignments: { completed: 6, total: 8, upcoming: 1 },
        color: 'bg-capas-gold'
      },
      {
        code: 'THE 180',
        name: 'Stage Performance',
        instructor: 'Prof. Martinez',
        credits: 3,
        currentGrade: 'B',
        completion: 70,
        assignments: { completed: 4, total: 8, upcoming: 2 },
        color: 'bg-capas-palm'
      }
    ],

    achievements: [
      {
        id: 'deans-list',
        title: 'Dean\'s List',
        description: 'Achieved GPA of 3.5 or higher',
        earnedDate: 'Spring 2024',
        icon: '🎖️',
        color: 'text-capas-gold',
        bgColor: 'bg-capas-gold/10'
      },
      {
        id: 'perfect-attendance',
        title: 'Perfect Attendance',
        description: 'No absences for entire semester',
        earnedDate: 'Fall 2023',
        icon: '📚',
        color: 'text-capas-turquoise',
        bgColor: 'bg-capas-turquoise/10'
      },
      {
        id: 'community-service',
        title: 'Community Service Award',
        description: '50+ hours of community service',
        earnedDate: 'Summer 2024',
        icon: '🤝',
        color: 'text-capas-coral',
        bgColor: 'bg-capas-coral/10'
      }
    ],

    studyGoals: [
      {
        id: 'gpa-target',
        title: 'Maintain 3.7+ GPA',
        progress: 95,
        target: 'Semester Goal',
        status: 'on-track'
      },
      {
        id: 'practice-hours',
        title: 'Complete 20 hours practice/week',
        progress: 80,
        target: 'Weekly Goal',
        status: 'on-track'
      },
      {
        id: 'research-project',
        title: 'Submit Research Proposal',
        progress: 45,
        target: 'Due Oct 15',
        status: 'needs-attention'
      }
    ]
  };

  const getGradeColor = (grade: string) => {
    const gradeColors: Record<string, string> = {
      'A': 'text-capas-palm',
      'A-': 'text-capas-palm',
      'B+': 'text-capas-turquoise',
      'B': 'text-capas-turquoise',
      'B-': 'text-capas-gold',
      'C+': 'text-capas-gold',
      'C': 'text-capas-coral',
      'C-': 'text-capas-coral',
      'D': 'text-red-500',
      'F': 'text-red-600'
    };
    return gradeColors[grade] || 'text-capas-ocean-dark';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'needs-attention':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-gold to-capas-coral rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,50 Q100,0 200,50 T400,50 L400,200 L0,200 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <ChartBarIcon className="h-8 w-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Academic Progress
            </h1>
            <SparklesIcon className="h-6 w-6" />
          </div>
          <p className="text-white/90 text-lg mb-4">
            Track your academic journey and celebrate your achievements, {studentData?.firstName}! 🎓
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-5 w-5" />
              <span>GPA: {academicData.currentGPA}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="h-5 w-5" />
              <span>{academicData.totalCredits}/{academicData.creditsNeeded} Credits</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrophyIcon className="h-5 w-5" />
              <span>{academicData.currentStanding}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats & Progress Overview */}
      <div className="grid lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-capas p-6 text-center"
        >
          <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mx-auto mb-3">
            <ChartBarIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{academicData.currentGPA}</div>
          <div className="text-sm font-medium text-capas-turquoise mb-1">Current GPA</div>
          <div className="text-xs text-capas-ocean-dark/70">Semester Average</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-capas p-6 text-center"
        >
          <div className="w-12 h-12 bg-capas-turquoise rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpenIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{academicData.totalCredits}</div>
          <div className="text-sm font-medium text-capas-turquoise mb-1">Credits Earned</div>
          <div className="text-xs text-capas-ocean-dark/70">{((academicData.totalCredits / academicData.creditsNeeded) * 100).toFixed(0)}% Complete</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-capas p-6 text-center"
        >
          <div className="w-12 h-12 bg-capas-coral rounded-full flex items-center justify-center mx-auto mb-3">
            <TrophyIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{academicData.achievements.length}</div>
          <div className="text-sm font-medium text-capas-turquoise mb-1">Achievements</div>
          <div className="text-xs text-capas-ocean-dark/70">Earned This Year</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-capas p-6 text-center"
        >
          <div className="w-12 h-12 bg-capas-palm rounded-full flex items-center justify-center mx-auto mb-3">
            <AcademicCapIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{academicData.expectedGraduation.split(' ')[0]}</div>
          <div className="text-sm font-medium text-capas-turquoise mb-1">Expected Graduation</div>
          <div className="text-xs text-capas-ocean-dark/70">{academicData.expectedGraduation.split(' ')[1]}</div>
        </motion.div>
      </div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="card-capas p-6"
      >
        <div className="border-b border-capas-sand-light mb-6">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: ChartBarIcon },
              { id: 'courses', name: 'Current Courses', icon: BookOpenIcon },
              { id: 'grades', name: 'Grade History', icon: AcademicCapIcon },
              { id: 'achievements', name: 'Achievements', icon: TrophyIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setViewType(tab.id as any)}
                className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-1 text-center text-sm font-medium hover:text-capas-turquoise focus:z-10 ${
                  viewType === tab.id
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
        <div className="min-h-[500px]">
          {viewType === 'overview' && (
            <ProgressOverview 
              data={academicData}
              getGradeColor={getGradeColor}
              getStatusIcon={getStatusIcon}
            />
          )}
          
          {viewType === 'courses' && (
            <CourseProgress 
              courses={academicData.courseProgress}
              getGradeColor={getGradeColor}
            />
          )}
          
          {viewType === 'grades' && (
            <GradeChart 
              semesterData={academicData.semesterGrades}
              selectedSemester={selectedSemester}
              onSemesterChange={setSelectedSemester}
            />
          )}
          
          {viewType === 'achievements' && (
            <AchievementBadges 
              achievements={academicData.achievements}
            />
          )}
        </div>
      </motion.div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}