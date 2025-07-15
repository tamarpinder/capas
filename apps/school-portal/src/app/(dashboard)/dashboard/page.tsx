'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StudentQRCode from '@/components/dashboard/StudentQRCode';
import { getStudentByEmail, generateGreeting } from '@/lib/mock-data';
import {
  AcademicCapIcon,
  CalendarIcon,
  TrophyIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

interface QuickStat {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      const student = getStudentByEmail(session.user.email);
      if (student) {
        const hour = new Date().getHours();
        const aiGreeting = generateGreeting(hour, student.firstName, student.upcomingEvents);
        setGreeting(aiGreeting);
      }
    }
  }, [session]);

  const studentData = session?.user as any;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  const quickStats: QuickStat[] = [
    {
      title: 'Current GPA',
      value: studentData?.gpa?.toString() || '3.7',
      subtitle: 'Semester Average',
      icon: ChartBarIcon,
      color: 'bg-capas-turquoise'
    },
    {
      title: 'Enrolled Courses',
      value: studentData?.enrolledCourses?.length?.toString() || '3',
      subtitle: 'Active Registrations',
      icon: BookOpenIcon,
      color: 'bg-capas-coral'
    },
    {
      title: 'Year Level',
      value: studentData?.year?.toString() || '2',
      subtitle: 'Academic Year',
      icon: AcademicCapIcon,
      color: 'bg-capas-gold'
    },
    {
      title: 'Achievements',
      value: studentData?.achievements?.length?.toString() || '2',
      subtitle: 'Awards Earned',
      icon: TrophyIcon,
      color: 'bg-capas-palm'
    }
  ];

  // Use real data from mock student profiles
  const upcomingEvents = mockStudent?.upcomingEvents.slice(0, 4).map(event => ({
    id: event.id,
    title: event.title,
    date: new Date(event.date + 'T' + event.time).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),
    type: event.type.charAt(0).toUpperCase() + event.type.slice(1),
    color: event.color
  })) || [];

  const recentActivity = mockStudent?.recentActivity || [];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-turquoise to-capas-ocean rounded-2xl p-8 text-white relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
            {greeting || `Hello, ${studentData?.firstName || 'Student'}! 👋`}
          </h1>
          <p className="text-white/90 text-lg mb-4">
            Welcome back to your CAPAS portal. Here's what's happening today.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'America/Nassau'
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZone: 'America/Nassau'
                })} BST
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AcademicCapIcon className="h-5 w-5" />
              <span>{studentData?.program || 'Program'} • Year {studentData?.year || 2}</span>
            </div>
            {mockStudent?.notifications.filter(n => !n.read).length > 0 && (
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <BellIcon className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {mockStudent.notifications.filter(n => !n.read).length} unread
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card-capas p-6 text-center"
          >
            <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-capas-turquoise mb-1">{stat.title}</div>
            <div className="text-xs text-capas-ocean-dark/70">{stat.subtitle}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Upcoming Events */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card-capas p-6"
          >
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-capas-sand-light rounded-lg">
                  <div>
                    <h4 className="font-medium text-capas-ocean-dark">{event.title}</h4>
                    <p className="text-sm text-capas-ocean-dark/70">{event.date}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${event.color}`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-capas p-6"
          >
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-capas-palm' :
                    activity.status === 'graded' ? 'bg-capas-gold' : 'bg-capas-turquoise'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-capas-ocean-dark">
                      <span className="font-medium">{activity.action}</span> for {activity.subject}
                    </p>
                    <p className="text-xs text-capas-ocean-dark/70">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Student ID & QR Code */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StudentQRCode />
          </motion.div>
        </div>
      </div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}