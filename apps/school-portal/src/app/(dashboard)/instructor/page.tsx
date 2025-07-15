'use client';

import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  UserGroupIcon,
  PencilSquareIcon,
  ChartBarIcon,
  ClockIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function InstructorDashboard() {
  const { data: session } = useSession();

  const teachingStats = [
    {
      name: 'My Courses',
      value: '3',
      subtitle: 'Active this semester',
      icon: AcademicCapIcon,
      color: 'capas-turquoise'
    },
    {
      name: 'Total Students',
      value: '67',
      subtitle: 'Across all courses',
      icon: UserGroupIcon,
      color: 'capas-ocean'
    },
    {
      name: 'Assignments to Grade',
      value: '23',
      subtitle: 'Pending review',
      icon: PencilSquareIcon,
      color: 'capas-coral'
    },
    {
      name: 'Average Grade',
      value: '84%',
      subtitle: 'Class performance',
      icon: ChartBarIcon,
      color: 'capas-palm'
    },
  ];

  const myCourses = [
    {
      id: 'MUS-150',
      name: 'Music Theory & Composition',
      students: 25,
      nextClass: 'Today, 2:00 PM',
      location: 'Music Studio A',
      pendingAssignments: 8,
      progress: 75
    },
    {
      id: 'MUS-250',
      name: 'Advanced Caribbean Music',
      students: 18,
      nextClass: 'Tomorrow, 10:00 AM',
      location: 'Music Studio B',
      pendingAssignments: 7,
      progress: 65
    },
    {
      id: 'MUS-101',
      name: 'Introduction to Music',
      students: 24,
      nextClass: 'Wednesday, 1:00 PM',
      location: 'Lecture Hall A',
      pendingAssignments: 8,
      progress: 80
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Grade Midterm Assignments',
      course: 'Music Theory & Composition',
      dueDate: 'Today',
      priority: 'high',
      count: 8
    },
    {
      id: 2,
      title: 'Prepare Caribbean Music Lecture',
      course: 'Advanced Caribbean Music',
      dueDate: 'Tomorrow',
      priority: 'medium',
      count: 1
    },
    {
      id: 3,
      title: 'Submit Grade Reports',
      course: 'All Courses',
      dueDate: 'Friday',
      priority: 'medium',
      count: 3
    },
    {
      id: 4,
      title: 'Faculty Meeting',
      course: 'Administration',
      dueDate: 'Next Tuesday',
      priority: 'low',
      count: 1
    }
  ];

  const recentStudentActivity = [
    {
      id: 1,
      student: 'Sophia Chen',
      action: 'Submitted Caribbean Music Production project',
      course: 'MUS-150',
      time: '2 hours ago',
      status: 'new'
    },
    {
      id: 2,
      student: 'Marcus Williams',
      action: 'Asked question in Music Theory forum',
      course: 'MUS-150',
      time: '4 hours ago',
      status: 'response_needed'
    },
    {
      id: 3,
      student: 'Aaliyah Thompson',
      action: 'Completed rhythm pattern exercise',
      course: 'MUS-250',
      time: '1 day ago',
      status: 'graded'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-capas-turquoise to-capas-ocean rounded-xl p-6 text-white">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, Dr. {session?.user?.lastName || 'Professor'}! 🎵
          </h1>
          <p className="text-capas-sand-light/90">
            Your teaching dashboard for CAPAS Music Department
          </p>
        </div>
      </motion.div>

      {/* Teaching Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {teachingStats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl p-6 shadow-sm border border-capas-ocean-light/20"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-capas-ocean-dark">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-capas-ocean-dark/70">
                  {stat.name}
                </p>
                <p className="text-xs text-capas-ocean-dark/50">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-capas-ocean-light/20"
        >
          <div className="p-6 border-b border-capas-ocean-light/20">
            <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center">
              <AcademicCapIcon className="w-5 h-5 text-capas-turquoise mr-2" />
              My Courses
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="p-4 border border-capas-ocean-light/20 rounded-lg hover:bg-capas-sand-light/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-capas-ocean-dark">
                        {course.name}
                      </h4>
                      <span className="text-xs bg-capas-turquoise/10 text-capas-turquoise px-2 py-1 rounded">
                        {course.id}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-capas-ocean-dark/60">
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {course.students} students
                      </div>
                      <div className="flex items-center">
                        <CalendarDaysIcon className="w-4 h-4 mr-1" />
                        {course.nextClass}
                      </div>
                      <div className="flex items-center">
                        <DocumentTextIcon className="w-4 h-4 mr-1" />
                        {course.location}
                      </div>
                      <div className="flex items-center">
                        <PencilSquareIcon className="w-4 h-4 mr-1" />
                        {course.pendingAssignments} to grade
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-capas-ocean-dark/60">Course Progress</span>
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
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-capas-ocean-light/20"
        >
          <div className="p-6 border-b border-capas-ocean-light/20">
            <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center">
              <ClockIcon className="w-5 h-5 text-capas-coral mr-2" />
              Upcoming Tasks
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className="p-3 bg-capas-sand-light/30 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="text-sm font-medium text-capas-ocean-dark">
                        {task.title}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-capas-ocean-dark/60 mb-1">
                      {task.course}
                    </p>
                    <p className="text-xs text-capas-ocean-dark/50">
                      Due: {task.dueDate}
                    </p>
                  </div>
                  {task.count > 1 && (
                    <span className="bg-capas-turquoise text-white px-2 py-1 rounded-full text-xs font-medium">
                      {task.count}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Student Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-capas-ocean-light/20"
      >
        <div className="p-6 border-b border-capas-ocean-light/20">
          <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-capas-palm mr-2" />
            Recent Student Activity
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {recentStudentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-capas-sand-light/20 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-capas-ocean-dark">
                    {activity.student}
                  </h4>
                  <span className="text-xs bg-capas-ocean/10 text-capas-ocean px-2 py-1 rounded">
                    {activity.course}
                  </span>
                </div>
                <p className="text-sm text-capas-ocean-dark/70">
                  {activity.action}
                </p>
                <p className="text-xs text-capas-ocean-dark/50 mt-1">
                  {activity.time}
                </p>
              </div>
              <div className="ml-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  activity.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  activity.status === 'response_needed' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {activity.status === 'new' ? 'New' :
                   activity.status === 'response_needed' ? 'Response Needed' :
                   'Graded'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}