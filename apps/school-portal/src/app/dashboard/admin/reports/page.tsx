'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ChartBarIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function AdminReportsPage() {
  const { data: session } = useSession();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('current_semester');

  const reportTypes = [
    { id: 'overview', name: 'System Overview', icon: ChartBarIcon },
    { id: 'enrollment', name: 'Enrollment Analytics', icon: UserGroupIcon },
    { id: 'academic', name: 'Academic Performance', icon: AcademicCapIcon },
    { id: 'financial', name: 'Financial Reports', icon: DocumentChartBarIcon },
  ];

  const systemStats = {
    totalStudents: 247,
    totalInstructors: 18,
    totalCourses: 45,
    totalRevenue: 485750,
    enrollmentRate: 94.2,
    retentionRate: 87.5,
    graduationRate: 92.1,
    avgGPA: 3.45,
    trends: {
      students: 8.3,
      revenue: 12.1,
      satisfaction: 4.2
    }
  };

  const enrollmentData = {
    byProgram: [
      { program: 'Music Performance & Production', students: 85, capacity: 100 },
      { program: 'Contemporary Dance & Choreography', students: 62, capacity: 80 },
      { program: 'Marine Conservation & Arts', students: 45, capacity: 60 },
      { program: 'Visual Arts & Design', students: 38, capacity: 50 },
      { program: 'Theatre & Performing Arts', students: 17, capacity: 30 }
    ],
    byIsland: [
      { island: 'New Providence', students: 156 },
      { island: 'Grand Bahama', students: 42 },
      { island: 'Eleuthera', students: 28 },
      { island: 'Abaco', students: 15 },
      { island: 'Exuma', students: 6 }
    ],
    byYear: [
      { year: 1, students: 78, percentage: 31.6 },
      { year: 2, students: 65, percentage: 26.3 },
      { year: 3, students: 58, percentage: 23.5 },
      { year: 4, students: 46, percentage: 18.6 }
    ]
  };

  const academicData = {
    gradeDistribution: {
      'A': { count: 342, percentage: 38.5 },
      'B': { count: 298, percentage: 33.6 },
      'C': { count: 189, percentage: 21.3 },
      'D': { count: 45, percentage: 5.1 },
      'F': { count: 13, percentage: 1.5 }
    },
    departmentPerformance: [
      { department: 'Music', avgGPA: 3.62, students: 127, retention: 91.2 },
      { department: 'Dance', avgGPA: 3.58, students: 62, retention: 88.7 },
      { department: 'Marine Studies', avgGPA: 3.41, students: 45, retention: 93.3 },
      { department: 'Visual Arts', avgGPA: 3.39, students: 38, retention: 84.2 },
      { department: 'Theatre', avgGPA: 3.33, students: 17, retention: 82.4 }
    ],
    attendanceRates: {
      overall: 89.3,
      byProgram: [
        { program: 'Marine Conservation', rate: 94.1 },
        { program: 'Music Performance', rate: 91.2 },
        { program: 'Dance', rate: 88.7 },
        { program: 'Visual Arts', rate: 87.3 },
        { program: 'Theatre', rate: 85.9 }
      ]
    }
  };

  const financialData = {
    revenue: {
      tuition: 412500,
      fees: 45750,
      grants: 27500,
      total: 485750
    },
    expenses: {
      salaries: 245000,
      facilities: 89500,
      equipment: 45200,
      other: 67300,
      total: 447000
    },
    scholarships: {
      awarded: 145000,
      students: 89,
      avgAmount: 1629
    }
  };

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? 
      <ArrowTrendingUpIcon className="h-4 w-4 text-capas-palm" /> : 
      <ArrowTrendingDownIcon className="h-4 w-4 text-capas-coral" />;
  };

  const getTrendColor = (trend: number) => {
    return trend > 0 ? 'text-capas-palm' : 'text-capas-coral';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Administrative Reports
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Comprehensive analytics and institutional insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
          >
            <option value="current_semester">Current Semester</option>
            <option value="academic_year">Academic Year</option>
            <option value="last_year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button className="btn-capas-secondary flex items-center gap-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export Reports
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

      {/* System Overview */}
      {selectedReport === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-capas p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Total Students</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{systemStats.totalStudents}</p>
                </div>
                <UserGroupIcon className="h-8 w-8 text-capas-turquoise" />
              </div>
              <div className={`flex items-center gap-1 mt-2 ${getTrendColor(systemStats.trends.students)}`}>
                {getTrendIcon(systemStats.trends.students)}
                <span className="text-sm font-medium">+{systemStats.trends.students}%</span>
                <span className="text-xs text-capas-ocean-dark/70">vs last semester</span>
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Total Revenue</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">${systemStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DocumentChartBarIcon className="h-8 w-8 text-capas-palm" />
              </div>
              <div className={`flex items-center gap-1 mt-2 ${getTrendColor(systemStats.trends.revenue)}`}>
                {getTrendIcon(systemStats.trends.revenue)}
                <span className="text-sm font-medium">+{systemStats.trends.revenue}%</span>
                <span className="text-xs text-capas-ocean-dark/70">vs last semester</span>
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Retention Rate</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{systemStats.retentionRate}%</p>
                </div>
                <CheckCircleIcon className="h-8 w-8 text-capas-gold" />
              </div>
              <div className="text-xs text-capas-ocean-dark/70 mt-2">
                Above national average
              </div>
            </div>

            <div className="card-capas p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-capas-ocean-dark/70">Average GPA</p>
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{systemStats.avgGPA}</p>
                </div>
                <AcademicCapIcon className="h-8 w-8 text-capas-coral" />
              </div>
              <div className="text-xs text-capas-ocean-dark/70 mt-2">
                Institutional average
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Key Performance Indicators</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-capas-ocean-dark/70">Enrollment Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-capas-sand-light rounded-full h-2">
                      <div 
                        className="bg-capas-palm h-2 rounded-full"
                        style={{ width: `${systemStats.enrollmentRate}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-capas-ocean-dark">{systemStats.enrollmentRate}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-capas-ocean-dark/70">Graduation Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-capas-sand-light rounded-full h-2">
                      <div 
                        className="bg-capas-turquoise h-2 rounded-full"
                        style={{ width: `${systemStats.graduationRate}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-capas-ocean-dark">{systemStats.graduationRate}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-capas-ocean-dark/70">Student Satisfaction</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-capas-sand-light rounded-full h-2">
                      <div 
                        className="bg-capas-gold h-2 rounded-full"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <span className="font-medium text-capas-ocean-dark">8.5/10</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Alerts & Actions Needed</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-capas-coral/5 border border-capas-coral/20 rounded-lg">
                  <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-capas-coral">15 pending registration forms</p>
                    <p className="text-xs text-capas-coral/70">Require immediate review</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-capas-gold/5 border border-capas-gold/20 rounded-lg">
                  <CalendarDaysIcon className="h-5 w-5 text-capas-gold mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-capas-gold">Hurricane season protocols</p>
                    <p className="text-xs text-capas-gold/70">Update emergency procedures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-capas-turquoise/5 border border-capas-turquoise/20 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-capas-turquoise mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-capas-turquoise">Fall registration opens</p>
                    <p className="text-xs text-capas-turquoise/70">Next Monday, July 22nd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Analytics */}
      {selectedReport === 'enrollment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Enrollment by Program</h3>
              <div className="space-y-3">
                {enrollmentData.byProgram.map((program) => (
                  <div key={program.program}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-capas-ocean-dark">{program.program}</span>
                      <span className="text-capas-ocean-dark font-medium">{program.students}/{program.capacity}</span>
                    </div>
                    <div className="w-full bg-capas-sand-light rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (program.students / program.capacity) > 0.9 ? 'bg-capas-coral' :
                          (program.students / program.capacity) > 0.8 ? 'bg-capas-gold' :
                          'bg-capas-turquoise'
                        }`}
                        style={{ width: `${(program.students / program.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Students by Island</h3>
              <div className="space-y-3">
                {enrollmentData.byIsland.map((island) => (
                  <div key={island.island} className="flex justify-between items-center">
                    <span className="text-capas-ocean-dark">{island.island}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-capas-sand-light rounded-full h-2">
                        <div 
                          className="bg-capas-palm h-2 rounded-full"
                          style={{ width: `${(island.students / systemStats.totalStudents) * 100}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-capas-ocean-dark w-8">{island.students}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-capas p-6">
            <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Enrollment by Academic Year</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {enrollmentData.byYear.map((year) => (
                <div key={year.year} className="text-center p-4 bg-capas-sand-light/30 rounded-lg">
                  <p className="text-2xl font-semibold text-capas-ocean-dark">{year.students}</p>
                  <p className="text-sm text-capas-ocean-dark/70">Year {year.year}</p>
                  <p className="text-xs text-capas-turquoise">{year.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Academic Performance */}
      {selectedReport === 'academic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Grade Distribution</h3>
              <div className="space-y-3">
                {Object.entries(academicData.gradeDistribution).map(([grade, data]) => (
                  <div key={grade} className="flex items-center justify-between">
                    <span className="text-capas-ocean-dark font-medium">{grade}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-capas-sand-light rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            grade === 'A' ? 'bg-capas-palm' :
                            grade === 'B' ? 'bg-capas-turquoise' :
                            grade === 'C' ? 'bg-capas-gold' :
                            grade === 'D' ? 'bg-capas-coral' : 'bg-capas-ocean-dark'
                          }`}
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-capas-ocean-dark w-12">{data.count}</span>
                      <span className="text-xs text-capas-ocean-dark/70 w-12">{data.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Department Performance</h3>
              <div className="space-y-4">
                {academicData.departmentPerformance.map((dept) => (
                  <div key={dept.department} className="border border-capas-ocean-light/20 rounded-lg p-3">
                    <h4 className="font-medium text-capas-ocean-dark mb-2">{dept.department}</h4>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <p className="text-capas-ocean-dark/70">Avg GPA</p>
                        <p className="font-semibold text-capas-ocean-dark">{dept.avgGPA}</p>
                      </div>
                      <div>
                        <p className="text-capas-ocean-dark/70">Students</p>
                        <p className="font-semibold text-capas-ocean-dark">{dept.students}</p>
                      </div>
                      <div>
                        <p className="text-capas-ocean-dark/70">Retention</p>
                        <p className="font-semibold text-capas-ocean-dark">{dept.retention}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial Reports */}
      {selectedReport === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Tuition</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.revenue.tuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Fees</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.revenue.fees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Grants</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.revenue.grants.toLocaleString()}</span>
                </div>
                <div className="border-t border-capas-ocean-light/20 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-capas-ocean-dark">Total Revenue</span>
                    <span className="font-semibold text-capas-turquoise">${financialData.revenue.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Expense Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Salaries</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.expenses.salaries.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Facilities</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.expenses.facilities.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Equipment</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.expenses.equipment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-capas-ocean-dark/70">Other</span>
                  <span className="font-medium text-capas-ocean-dark">${financialData.expenses.other.toLocaleString()}</span>
                </div>
                <div className="border-t border-capas-ocean-light/20 pt-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-capas-ocean-dark">Total Expenses</span>
                    <span className="font-semibold text-capas-coral">${financialData.expenses.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-capas p-6">
              <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Financial Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-capas-ocean-dark/70 mb-1">Net Income</p>
                  <p className="text-2xl font-semibold text-capas-palm">
                    ${(financialData.revenue.total - financialData.expenses.total).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-capas-ocean-dark/70 mb-1">Scholarships Awarded</p>
                  <p className="text-xl font-semibold text-capas-ocean-dark">
                    ${financialData.scholarships.awarded.toLocaleString()}
                  </p>
                  <p className="text-xs text-capas-ocean-dark/70">
                    To {financialData.scholarships.students} students
                  </p>
                </div>
                <div>
                  <p className="text-sm text-capas-ocean-dark/70 mb-1">Avg Scholarship</p>
                  <p className="text-lg font-semibold text-capas-turquoise">
                    ${financialData.scholarships.avgAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}