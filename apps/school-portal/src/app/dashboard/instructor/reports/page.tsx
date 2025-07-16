'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

export default function InstructorReportsPage() {
  const { data: session } = useSession();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('current_semester');

  const reportTypes = [
    { id: 'overview', name: 'Teaching Overview', icon: ChartBarIcon },
    { id: 'attendance', name: 'Attendance Reports', icon: ClockIcon },
    { id: 'grades', name: 'Grade Distribution', icon: AcademicCapIcon },
    { id: 'engagement', name: 'Student Engagement', icon: UserGroupIcon },
  ];

  const overviewStats = {
    totalStudents: 33,
    totalCourses: 2,
    avgAttendance: 89.5,
    avgGrade: 86.2,
    assignmentsGraded: 124,
    hoursTeaching: 8,
    trends: {
      attendance: 2.3,
      grades: -1.2,
      engagement: 5.1
    }
  };

  const coursePerformance = [
    {
      id: 'MUS-150',
      name: 'Music Theory & Composition',
      students: 18,
      avgGrade: 84.5,
      attendance: 92.3,
      assignments: 15,
      trend: 'up'
    },
    {
      id: 'MUS-201',
      name: 'Caribbean Music Production',
      students: 15,
      avgGrade: 88.1,
      attendance: 86.7,
      assignments: 12,
      trend: 'down'
    }
  ];

  const recentTrends = [
    {
      metric: 'Student Attendance',
      current: '89.5%',
      previous: '87.2%',
      change: '+2.3%',
      trend: 'up',
      period: 'vs last month'
    },
    {
      metric: 'Average Grade',
      current: '86.2%',
      previous: '87.4%',
      change: '-1.2%',
      trend: 'down',
      period: 'vs last month'
    },
    {
      metric: 'Assignment Submissions',
      current: '94.1%',
      previous: '89.0%',
      change: '+5.1%',
      trend: 'up',
      period: 'vs last month'
    }
  ];

  const attendanceData = [
    { course: 'MUS-150', week1: 95, week2: 92, week3: 89, week4: 94 },
    { course: 'MUS-201', week1: 87, week2: 85, week3: 88, week4: 87 }
  ];

  const gradeDistribution = {
    'MUS-150': { A: 6, B: 8, C: 3, D: 1, F: 0 },
    'MUS-201': { A: 8, B: 5, C: 2, D: 0, F: 0 }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <ArrowTrendingUpIcon className="h-4 w-4 text-capas-palm" /> : 
      <ArrowTrendingDownIcon className="h-4 w-4 text-capas-coral" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-capas-palm' : 'text-capas-coral';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Teaching Reports
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Analytics and insights on your teaching performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
          >
            <option value="current_semester">Current Semester</option>
            <option value="last_month">Last Month</option>
            <option value="last_semester">Last Semester</option>
            <option value="academic_year">Academic Year</option>
          </select>
          <button className="btn-capas-secondary flex items-center gap-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedReport(type.id)}
            className={`card-capas p-4 text-left transition-all ${
              selectedReport === type.id
                ? 'ring-2 ring-capas-turquoise bg-capas-turquoise/5'
                : 'hover:shadow-md'
            }`}
          >
            <type.icon className={`h-6 w-6 mb-2 ${
              selectedReport === type.id ? 'text-capas-turquoise' : 'text-capas-ocean-dark/70'
            }`} />
            <h3 className="font-medium text-capas-ocean-dark">{type.name}</h3>
          </button>
        ))}
      </div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-capas p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-8 w-8 text-capas-turquoise" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Total Students</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{overviewStats.totalStudents}</p>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AcademicCapIcon className="h-8 w-8 text-capas-palm" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Avg Grade</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{overviewStats.avgGrade}%</p>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-8 w-8 text-capas-gold" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Avg Attendance</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{overviewStats.avgAttendance}%</p>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentChartBarIcon className="h-8 w-8 text-capas-coral" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Assignments Graded</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{overviewStats.assignmentsGraded}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trends */}
          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Performance Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-capas-ocean-dark">{trend.metric}</h4>
                    <p className="text-2xl font-semibold text-capas-ocean-dark">{trend.current}</p>
                    <p className="text-sm text-capas-ocean-dark/70">{trend.period}</p>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center gap-1 ${getTrendColor(trend.trend)}`}>
                      {getTrendIcon(trend.trend)}
                      <span className="font-medium">{trend.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Performance */}
          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Course Performance</h3>
            <div className="space-y-4">
              {coursePerformance.map((course) => (
                <div key={course.id} className="border border-capas-ocean-light/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">{course.name}</h4>
                      <p className="text-sm text-capas-turquoise">{course.id}</p>
                    </div>
                    {getTrendIcon(course.trend)}
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-capas-ocean-dark/70">Students</p>
                      <p className="font-semibold text-capas-ocean-dark">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-capas-ocean-dark/70">Avg Grade</p>
                      <p className="font-semibold text-capas-ocean-dark">{course.avgGrade}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-capas-ocean-dark/70">Attendance</p>
                      <p className="font-semibold text-capas-ocean-dark">{course.attendance}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-capas-ocean-dark/70">Assignments</p>
                      <p className="font-semibold text-capas-ocean-dark">{course.assignments}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Attendance Report */}
      {selectedReport === 'attendance' && (
        <div className="space-y-6">
          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Weekly Attendance Trends</h3>
            <div className="space-y-4">
              {attendanceData.map((course) => (
                <div key={course.course} className="border border-capas-ocean-light/20 rounded-lg p-4">
                  <h4 className="font-medium text-capas-ocean-dark mb-3">{course.course}</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {['week1', 'week2', 'week3', 'week4'].map((week, index) => (
                      <div key={week} className="text-center">
                        <p className="text-sm text-capas-ocean-dark/70 mb-1">Week {index + 1}</p>
                        <p className="text-xl font-semibold text-capas-ocean-dark">{course[week as keyof typeof course]}%</p>
                        <div className="w-full bg-capas-sand-light rounded-full h-2 mt-2">
                          <div 
                            className="bg-capas-turquoise h-2 rounded-full"
                            style={{ width: `${course[week as keyof typeof course]}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grade Distribution */}
      {selectedReport === 'grades' && (
        <div className="space-y-6">
          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Grade Distribution</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(gradeDistribution).map(([course, grades]) => (
                <div key={course} className="border border-capas-ocean-light/20 rounded-lg p-4">
                  <h4 className="font-medium text-capas-ocean-dark mb-3">{course}</h4>
                  <div className="space-y-2">
                    {Object.entries(grades).map(([grade, count]) => (
                      <div key={grade} className="flex items-center justify-between">
                        <span className="text-capas-ocean-dark">{grade}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-capas-sand-light rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                grade === 'A' ? 'bg-capas-palm' :
                                grade === 'B' ? 'bg-capas-turquoise' :
                                grade === 'C' ? 'bg-capas-gold' :
                                grade === 'D' ? 'bg-capas-coral' : 'bg-capas-ocean-dark'
                              }`}
                              style={{ width: `${(count / Object.values(grades).reduce((a, b) => a + b, 0)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-capas-ocean-dark w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Engagement Report */}
      {selectedReport === 'engagement' && (
        <div className="space-y-6">
          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Student Engagement Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-capas-sand-light/30 rounded-lg">
                <p className="text-2xl font-semibold text-capas-ocean-dark">94.1%</p>
                <p className="text-sm text-capas-ocean-dark/70">Assignment Submission Rate</p>
              </div>
              <div className="text-center p-4 bg-capas-sand-light/30 rounded-lg">
                <p className="text-2xl font-semibold text-capas-ocean-dark">78.5%</p>
                <p className="text-sm text-capas-ocean-dark/70">Active Participation</p>
              </div>
              <div className="text-center p-4 bg-capas-sand-light/30 rounded-lg">
                <p className="text-2xl font-semibold text-capas-ocean-dark">8.5/10</p>
                <p className="text-sm text-capas-ocean-dark/70">Course Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}