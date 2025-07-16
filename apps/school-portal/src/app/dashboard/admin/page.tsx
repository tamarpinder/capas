'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const sessionTyped = session as { user: ExtendedUser } | null;

  // Remove unused session variable warning by using it
  const userRole = sessionTyped?.user?.role || 'admin';

  const stats = [
    {
      name: 'Total Students',
      value: '247',
      change: '+12',
      changeType: 'positive',
      icon: UserGroupIcon,
    },
    {
      name: 'Active Courses',
      value: '18',
      change: '+2',
      changeType: 'positive',
      icon: AcademicCapIcon,
    },
    {
      name: 'Pending Forms',
      value: '15',
      change: '+5',
      changeType: 'negative',
      icon: DocumentTextIcon,
    },
    {
      name: 'System Health',
      value: '98%',
      change: '0%',
      changeType: 'neutral',
      icon: ChartBarIcon,
    },
  ];

  const pendingTasks = [
    {
      id: 1,
      title: 'Registration Form Approvals',
      count: 8,
      priority: 'high',
      description: 'New student enrollment requests'
    },
    {
      id: 2,
      title: 'Scholarship Applications',
      count: 5,
      priority: 'medium',
      description: 'Financial aid applications'
    },
    {
      id: 3,
      title: 'Program Change Requests',
      count: 3,
      priority: 'low',
      description: 'Student program transfers'
    },
    {
      id: 4,
      title: 'Hurricane Preparedness Review',
      count: 1,
      priority: 'high',
      description: 'Emergency response protocol update'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Approved 8 student registrations',
      user: 'Sarah McKenzie',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      action: 'Updated Hurricane Response Protocol',
      user: 'Sarah McKenzie',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 3,
      action: 'Generated Q3 Enrollment Report',
      user: 'System',
      time: '2 days ago',
      status: 'success'
    },
    {
      id: 4,
      action: 'Weather alert sent to all students',
      user: 'Auto-system',
      time: '3 days ago',
      status: 'warning'
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
            Welcome back, {sessionTyped?.user?.firstName || 'Administrator'}! 👋
          </h1>
          <p className="text-capas-sand-light/90">
            Here&apos;s your administrative overview for CAPAS School Portal ({userRole})
          </p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-xl p-6 shadow-sm border border-capas-ocean-light/20"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-capas-turquoise" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <p className="text-sm font-medium text-capas-ocean-dark/70">
                  {stat.name}
                </p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-bold text-capas-ocean-dark">
                    {stat.value}
                  </p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    'text-capas-ocean-dark/60'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-capas-ocean-light/20"
        >
          <div className="p-6 border-b border-capas-ocean-light/20">
            <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center">
              <ClockIcon className="w-5 h-5 text-capas-coral mr-2" />
              Pending Tasks
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-capas-ocean-dark">
                      {task.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-capas-ocean-dark/60 mt-1">
                    {task.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className="bg-capas-turquoise text-white px-3 py-1 rounded-full text-sm font-medium">
                    {task.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-capas-ocean-light/20"
        >
          <div className="p-6 border-b border-capas-ocean-light/20">
            <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center">
              <ChartBarIcon className="w-5 h-5 text-capas-turquoise mr-2" />
              Recent Activity
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.status === 'success' ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : activity.status === 'warning' ? (
                    <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-capas-ocean-dark">
                    {activity.action}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-capas-ocean-dark/60 mt-1">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-capas-ocean-light/20 p-6"
      >
        <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { name: 'Review Registrations', icon: UserGroupIcon, color: 'capas-turquoise' },
            { name: 'Manage Users', icon: UserGroupIcon, color: 'capas-ocean' },
            { name: 'Generate Reports', icon: ChartBarIcon, color: 'capas-coral' },
            { name: 'System Settings', icon: DocumentTextIcon, color: 'capas-palm' },
            { name: 'Emergency Alerts', icon: ExclamationTriangleIcon, color: 'capas-gold' },
          ].map((action) => (
            <button
              key={action.name}
              className={`flex flex-col items-center p-4 rounded-lg border-2 border-${action.color}/20 hover:border-${action.color} hover:bg-${action.color}/5 transition-all duration-200`}
            >
              <action.icon className={`w-6 h-6 text-${action.color} mb-2`} />
              <span className="text-sm font-medium text-capas-ocean-dark text-center">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}