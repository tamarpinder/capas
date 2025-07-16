'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  UserGroupIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function InstructorStudentsPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const students = [
    {
      id: '1',
      name: 'Sophia Chen',
      email: 'sophia.chen@capas.edu.bs',
      studentId: 'CAP2024-001',
      program: 'Music Performance & Production',
      year: 2,
      courses: ['MUS-150', 'MUS-201'],
      grades: {
        'MUS-150': { current: 'A-', gpa: 3.7 },
        'MUS-201': { current: 'B+', gpa: 3.3 }
      },
      attendance: 92,
      assignments: {
        submitted: 12,
        pending: 2,
        late: 1
      },
      lastActivity: '2024-07-15T14:30:00',
      status: 'active',
      island: 'New Providence',
      avatar: '/images/students/sophia-chen.jpg'
    },
    {
      id: '2',
      name: 'Marcus Williams',
      email: 'marcus.williams@capas.edu.bs',
      studentId: 'CAP2024-156',
      program: 'Marine Conservation & Arts',
      year: 1,
      courses: ['MUS-150'],
      grades: {
        'MUS-150': { current: 'A', gpa: 4.0 }
      },
      attendance: 98,
      assignments: {
        submitted: 8,
        pending: 0,
        late: 0
      },
      lastActivity: '2024-07-15T16:00:00',
      status: 'active',
      island: 'Eleuthera',
      avatar: '/images/students/marcus-williams.jpg'
    },
    {
      id: '3',
      name: 'Aaliyah Thompson',
      email: 'aaliyah.thompson@capas.edu.bs',
      studentId: 'CAP2022-089',
      program: 'Contemporary Dance & Choreography',
      year: 4,
      courses: ['MUS-150'],
      grades: {
        'MUS-150': { current: 'B-', gpa: 2.7 }
      },
      attendance: 85,
      assignments: {
        submitted: 9,
        pending: 3,
        late: 2
      },
      lastActivity: '2024-07-14T10:00:00',
      status: 'attention',
      island: 'Grand Bahama',
      avatar: '/images/students/aaliyah-thompson.jpg'
    }
  ];

  const courses = [
    { id: 'MUS-150', name: 'Music Theory & Composition' },
    { id: 'MUS-201', name: 'Caribbean Music Production' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'attention':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-capas-palm/10 text-capas-palm';
      case 'attention':
        return 'bg-capas-coral/10 text-capas-coral';
      default:
        return 'bg-capas-gold/10 text-capas-gold';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-capas-palm';
    if (grade.startsWith('B')) return 'text-capas-turquoise';
    if (grade.startsWith('C')) return 'text-capas-gold';
    return 'text-capas-coral';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.courses.includes(selectedCourse);
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            My Students
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Monitor student progress and engagement
          </p>
        </div>
      </div>

      {/* Student Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Students</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Active Students</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {students.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Need Attention</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {students.filter(s => s.status === 'attention').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Avg Attendance</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-capas p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-capas-ocean-dark/50" />
              <input
                type="text"
                placeholder="Search students by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
            >
              <option value="all">All Courses</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="grade">Sort by Grade</option>
              <option value="attendance">Sort by Attendance</option>
              <option value="activity">Sort by Last Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="card-capas p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {getInitials(student.name)}
              </div>

              {/* Student Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center gap-2">
                      {student.name}
                      {getStatusIcon(student.status)}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-capas-ocean-dark/70">
                      <span>{student.studentId}</span>
                      <span>•</span>
                      <span>{student.email}</span>
                      <span>•</span>
                      <span>Year {student.year}</span>
                      <span>•</span>
                      <span>{student.island}</span>
                    </div>
                    <p className="text-sm text-capas-turquoise mt-1">{student.program}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </div>
                </div>

                {/* Course Grades */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Course Grades</h4>
                    <div className="space-y-1">
                      {student.courses.map(courseId => {
                        const course = courses.find(c => c.id === courseId);
                        const grade = student.grades[courseId];
                        return (
                          <div key={courseId} className="flex justify-between text-sm">
                            <span className="text-capas-ocean-dark/70">{course?.name}</span>
                            <span className={`font-medium ${getGradeColor(grade.current)}`}>
                              {grade.current}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Attendance</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-capas-sand-light rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${student.attendance >= 90 ? 'bg-capas-palm' : student.attendance >= 80 ? 'bg-capas-gold' : 'bg-capas-coral'}`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-capas-ocean-dark">{student.attendance}%</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Assignments</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-capas-ocean-dark/70">Submitted</span>
                        <span className="text-capas-palm font-medium">{student.assignments.submitted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-capas-ocean-dark/70">Pending</span>
                        <span className="text-capas-gold font-medium">{student.assignments.pending}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-capas-ocean-dark/70">Late</span>
                        <span className="text-capas-coral font-medium">{student.assignments.late}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/10">
                  <div className="text-sm text-capas-ocean-dark/70">
                    Last active: {new Date(student.lastActivity).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-capas-secondary text-sm flex items-center gap-1">
                      <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      Message
                    </button>
                    <button className="btn-capas-secondary text-sm flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="card-capas p-12 text-center">
          <UserGroupIcon className="h-12 w-12 text-capas-ocean-light mx-auto mb-4" />
          <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">No students found</h3>
          <p className="text-capas-ocean-dark/70">
            Try adjusting your search criteria or course filter.
          </p>
        </div>
      )}
    </div>
  );
}