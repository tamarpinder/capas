'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  ChartBarIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

export default function InstructorCoursesPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('current');

  const currentCourses = [
    {
      id: 'MUS-150',
      name: 'Music Theory & Composition',
      code: 'MUS-150',
      semester: 'Summer 2024',
      students: 18,
      schedule: 'Tue/Thu 10:00-11:30 AM',
      room: 'Music Studio A',
      progress: 65,
      nextClass: '2024-07-16T10:00:00',
      assignments: {
        pending: 3,
        graded: 12,
        total: 15
      }
    },
    {
      id: 'MUS-201',
      name: 'Caribbean Music Production',
      code: 'MUS-201',
      semester: 'Summer 2024',
      students: 15,
      schedule: 'Mon/Wed 2:00-3:30 PM',
      room: 'Digital Lab 1',
      progress: 72,
      nextClass: '2024-07-17T14:00:00',
      assignments: {
        pending: 2,
        graded: 8,
        total: 10
      }
    }
  ];

  const upcomingCourses = [
    {
      id: 'MUS-301',
      name: 'Advanced Caribbean Harmony',
      code: 'MUS-301',
      semester: 'Fall 2024',
      students: 0,
      schedule: 'TBD',
      room: 'TBD',
      status: 'Planning'
    }
  ];

  const formatNextClass = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            My Courses
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Manage your teaching schedule and course content
          </p>
        </div>
        <button className="btn-capas-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Create Course
        </button>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpenIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Active Courses</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{currentCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Students</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {currentCourses.reduce((sum, course) => sum + course.students, 0)}
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
              <p className="text-sm font-medium text-capas-ocean-dark/70">Avg Progress</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {Math.round(currentCourses.reduce((sum, course) => sum + course.progress, 0) / currentCourses.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Pending Grades</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {currentCourses.reduce((sum, course) => sum + course.assignments.pending, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Tabs */}
      <div className="border-b border-capas-ocean-light/20">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'current'
                ? 'border-capas-turquoise text-capas-turquoise'
                : 'border-transparent text-capas-ocean-dark/70 hover:text-capas-ocean-dark hover:border-capas-ocean-light'
            }`}
          >
            Current Courses ({currentCourses.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-capas-turquoise text-capas-turquoise'
                : 'border-transparent text-capas-ocean-dark/70 hover:text-capas-ocean-dark hover:border-capas-ocean-light'
            }`}
          >
            Upcoming Courses ({upcomingCourses.length})
          </button>
        </nav>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {activeTab === 'current' && currentCourses.map((course) => (
          <div key={course.id} className="card-capas p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-capas-ocean-dark">
                    {course.name}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-capas-turquoise/10 text-capas-turquoise rounded-full">
                    {course.code}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm text-capas-ocean-dark/70">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    {course.students} students
                  </div>
                  <div className="flex items-center text-sm text-capas-ocean-dark/70">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {course.schedule}
                  </div>
                  <div className="flex items-center text-sm text-capas-ocean-dark/70">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {course.room}
                  </div>
                  <div className="flex items-center text-sm text-capas-ocean-dark/70">
                    <BookOpenIcon className="h-4 w-4 mr-2" />
                    {course.semester}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-capas-ocean-dark/70">Course Progress</span>
                      <span className="text-capas-ocean-dark font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-capas-sand-light rounded-full h-2">
                      <div 
                        className="bg-capas-turquoise h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="text-capas-ocean-dark/70">
                    Next class: <span className="font-medium text-capas-ocean-dark">
                      {formatNextClass(course.nextClass)}
                    </span>
                  </span>
                  <span className="text-capas-coral">
                    {course.assignments.pending} assignments to grade
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                  <EyeIcon className="h-5 w-5" />
                </button>
                <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                  <PencilIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeTab === 'upcoming' && upcomingCourses.map((course) => (
          <div key={course.id} className="card-capas p-6 border-dashed">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-capas-ocean-dark">
                    {course.name}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium bg-capas-gold/10 text-capas-gold rounded-full">
                    {course.code}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium bg-capas-ocean/10 text-capas-ocean rounded-full">
                    {course.status}
                  </span>
                </div>
                
                <p className="text-sm text-capas-ocean-dark/70 mb-4">
                  {course.semester} • Course setup in progress
                </p>

                <div className="text-sm text-capas-ocean-dark/70">
                  Schedule and room assignment pending
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button className="btn-capas-secondary text-sm">
                  Setup Course
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-capas-turquoise/5 to-capas-ocean/5 rounded-xl p-6">
        <h3 className="font-semibold text-capas-ocean-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="card-capas p-4 text-left hover:shadow-md transition-shadow">
            <BookOpenIcon className="h-6 w-6 text-capas-turquoise mb-2" />
            <h4 className="font-medium text-capas-ocean-dark">Create Assignment</h4>
            <p className="text-sm text-capas-ocean-dark/70">Add new coursework for students</p>
          </button>
          <button className="card-capas p-4 text-left hover:shadow-md transition-shadow">
            <ChartBarIcon className="h-6 w-6 text-capas-coral mb-2" />
            <h4 className="font-medium text-capas-ocean-dark">Grade Reports</h4>
            <p className="text-sm text-capas-ocean-dark/70">View student performance analytics</p>
          </button>
          <button className="card-capas p-4 text-left hover:shadow-md transition-shadow">
            <UserGroupIcon className="h-6 w-6 text-capas-gold mb-2" />
            <h4 className="font-medium text-capas-ocean-dark">Message Students</h4>
            <p className="text-sm text-capas-ocean-dark/70">Send course announcements</p>
          </button>
        </div>
      </div>
    </div>
  );
}