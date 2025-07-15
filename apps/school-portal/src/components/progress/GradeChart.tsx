'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  CalendarIcon,
  AcademicCapIcon,
  TrendingUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

interface GradeChartProps {
  semesterData: any[];
  selectedSemester: string;
  onSemesterChange: (semester: string) => void;
}

export default function GradeChart({ semesterData, selectedSemester, onSemesterChange }: GradeChartProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const maxGPA = 4.0;
  const getBarHeight = (gpa: number) => (gpa / maxGPA) * 100;

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'bg-capas-palm';
    if (gpa >= 3.0) return 'bg-capas-turquoise';
    if (gpa >= 2.5) return 'bg-capas-gold';
    return 'bg-capas-coral';
  };

  const calculateAverage = () => {
    const sum = semesterData.reduce((acc, sem) => acc + sem.gpa, 0);
    return (sum / semesterData.length).toFixed(2);
  };

  const selectedData = semesterData.find(s => s.semester === selectedSemester);

  // Mock course grades for selected semester
  const courseGrades = [
    { code: 'MUS 201', name: 'Music Theory II', grade: 'A-', credits: 3, points: 3.7 },
    { code: 'MUS 245', name: 'Digital Audio Production', grade: 'B+', credits: 3, points: 3.3 },
    { code: 'ENG 201', name: 'Creative Writing', grade: 'A', credits: 3, points: 4.0 },
    { code: 'THE 180', name: 'Stage Performance', grade: 'B', credits: 3, points: 3.0 }
  ];

  return (
    <div className="space-y-8">
      {/* GPA Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-lg p-6 border border-capas-sand-light"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-semibold text-capas-turquoise flex items-center space-x-2">
            <ChartBarIcon className="h-6 w-6" />
            <span>GPA Trend</span>
          </h3>
          
          <div className="text-sm text-capas-ocean-dark/70">
            Average: <span className="font-bold text-capas-ocean-dark">{calculateAverage()}</span>
          </div>
        </div>

        <div className="h-64 flex items-end justify-between space-x-4">
          {semesterData.map((semester, index) => (
            <motion.div
              key={semester.semester}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="relative w-full max-w-[80px] h-full flex items-end">
                <div
                  className={`w-full ${getGPAColor(semester.gpa)} rounded-t-lg transition-all duration-700 hover:opacity-80 cursor-pointer`}
                  style={{ height: `${getBarHeight(semester.gpa)}%` }}
                  onClick={() => onSemesterChange(semester.semester)}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-bold text-capas-ocean-dark">
                    {semester.gpa}
                  </div>
                </div>
              </div>
              
              <div className="mt-3 text-center">
                <div className="text-xs font-medium text-capas-ocean-dark">
                  {semester.semester.split(' ')[0]}
                </div>
                <div className="text-xs text-capas-ocean-dark/70">
                  {semester.semester.split(' ')[1]}
                </div>
                <div className="text-xs text-capas-ocean-dark/60 mt-1">
                  {semester.credits} cr
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-capas-palm rounded"></div>
            <span className="text-capas-ocean-dark/70">3.7+</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-capas-turquoise rounded"></div>
            <span className="text-capas-ocean-dark/70">3.0-3.69</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-capas-gold rounded"></div>
            <span className="text-capas-ocean-dark/70">2.5-2.99</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-capas-coral rounded"></div>
            <span className="text-capas-ocean-dark/70"><2.5</span>
          </div>
        </div>
      </motion.div>

      {/* Semester Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card-capas p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-semibold text-capas-turquoise">
            Semester Details
          </h3>
          
          {/* Semester Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-capas-sand-light rounded-lg hover:bg-capas-sand transition-colors"
            >
              <CalendarIcon className="h-4 w-4 text-capas-ocean-dark" />
              <span className="text-sm font-medium text-capas-ocean-dark">{selectedSemester}</span>
              <ChevronDownIcon className="h-4 w-4 text-capas-ocean-dark" />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-capas-sand-light z-10">
                {semesterData.map((sem) => (
                  <button
                    key={sem.semester}
                    onClick={() => {
                      onSemesterChange(sem.semester);
                      setShowDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light transition-colors"
                  >
                    {sem.semester}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedData && (
          <div className="space-y-4">
            {/* Semester Summary */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-capas-turquoise/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-capas-ocean-dark">{selectedData.gpa}</div>
                <div className="text-sm text-capas-ocean-dark/70">Semester GPA</div>
              </div>
              <div className="bg-capas-gold/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-capas-ocean-dark">{selectedData.credits}</div>
                <div className="text-sm text-capas-ocean-dark/70">Credits Earned</div>
              </div>
              <div className="bg-capas-coral/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-capas-ocean-dark">{courseGrades.length}</div>
                <div className="text-sm text-capas-ocean-dark/70">Courses</div>
              </div>
            </div>

            {/* Course Breakdown */}
            <div className="space-y-3">
              <h4 className="font-medium text-capas-ocean-dark flex items-center space-x-2">
                <AcademicCapIcon className="h-5 w-5" />
                <span>Course Grades</span>
              </h4>
              
              {courseGrades.map((course, index) => (
                <motion.div
                  key={course.code}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between p-3 bg-capas-sand-light rounded-lg"
                >
                  <div className="flex-1">
                    <div className="font-medium text-capas-ocean-dark">{course.code}</div>
                    <div className="text-sm text-capas-ocean-dark/70">{course.name}</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-capas-ocean-dark/70">{course.credits} credits</span>
                    <span className={`text-lg font-bold ${
                      course.grade.startsWith('A') ? 'text-capas-palm' :
                      course.grade.startsWith('B') ? 'text-capas-turquoise' :
                      course.grade.startsWith('C') ? 'text-capas-gold' :
                      'text-capas-coral'
                    }`}>
                      {course.grade}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Academic Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6"
      >
        <h4 className="font-display text-lg font-semibold text-capas-turquoise mb-4 flex items-center space-x-2">
          <TrendingUpIcon className="h-5 w-5" />
          <span>Academic Insights</span>
        </h4>
        
        <div className="space-y-3 text-sm text-capas-ocean-dark/80">
          <p>• Your strongest performance was in <span className="font-medium text-capas-ocean-dark">Creative Writing (A)</span></p>
          <p>• You've maintained consistent performance across {semesterData.length} semesters</p>
          <p>• Consider taking more advanced courses in your strong subjects</p>
          <p>• Your GPA trend shows steady improvement in recent semesters</p>
        </div>
      </motion.div>
    </div>
  );
}