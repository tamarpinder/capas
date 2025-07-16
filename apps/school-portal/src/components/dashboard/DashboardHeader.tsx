'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import moment from 'moment-timezone';
import Link from 'next/link';
import { Fragment } from 'react';
import { type ExtendedUser } from '@/lib/auth';

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [currentTime, setCurrentTime] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New assignment posted', message: 'Digital Arts Project due Friday', time: '10 mins ago', unread: true },
    { id: 2, title: 'Grade updated', message: 'Computer Science midterm graded', time: '2 hours ago', unread: true },
    { id: 3, title: 'Event reminder', message: 'Junkanoo Festival tomorrow', time: '1 day ago', unread: false },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const bahamasTime = moment().tz('America/Nassau').format('dddd, MMMM D, YYYY • h:mm A');
      setCurrentTime(bahamasTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Scroll detection for header transparency
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 border-b border-capas-ocean-light/20 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-lg' 
        : 'bg-white shadow-sm'
    }`}>
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Mobile menu button */}
        <button className="lg:hidden p-2 rounded-md text-capas-ocean-dark hover:text-capas-turquoise">
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">C</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-display text-xl font-bold text-capas-turquoise">CAPAS Portal</h1>
            </div>
          </Link>
        </div>

        {/* Bahamas Time Clock */}
        <div className="hidden lg:block text-center">
          <div className="text-sm text-capas-ocean-dark/70 font-medium">Nassau, Bahamas</div>
          <div className="text-sm font-mono text-capas-turquoise">
            {currentTime}
          </div>
        </div>

        {/* Right side - Portal Links, Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Portal Navigation */}
          <div className="hidden lg:flex items-center space-x-2 border-r border-capas-ocean-light/20 pr-4">
            <Link
              href="http://localhost:4001"
              target="_blank"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-capas-turquoise/10 text-capas-turquoise hover:bg-capas-turquoise hover:text-white transition-all duration-200"
            >
              <span className="text-sm font-medium">Creatives Hub</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
          {/* Notifications */}
          <Menu as="div" className="relative">
            <Menu.Button className="relative p-2 rounded-full text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
              <BellIcon className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-capas-coral text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-4 border-b border-capas-ocean-light/20">
                  <h3 className="font-semibold text-capas-turquoise">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                      <div
                        className={`p-4 border-b border-capas-ocean-light/10 hover:bg-capas-sand-light cursor-pointer ${
                          notification.unread ? 'bg-capas-turquoise/5' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-capas-ocean-dark text-sm">
                              {notification.title}
                            </h4>
                            <p className="text-capas-ocean-dark/70 text-sm mt-1">
                              {notification.message}
                            </p>
                            <p className="text-capas-ocean-dark/50 text-xs mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-capas-turquoise rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    </Menu.Item>
                  ))}
                </div>
                <div className="p-4">
                  <button className="w-full text-center text-capas-turquoise text-sm font-medium hover:text-capas-turquoise-dark">
                    View all notifications
                  </button>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-capas-sand-light transition-colors">
              <div className="w-8 h-8 bg-capas-turquoise rounded-full flex items-center justify-center text-white text-sm font-medium">
                {session?.user?.name ? getInitials(session.user.name) : 'U'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-capas-ocean-dark">
                  {session?.user?.name || 'User'}
                </div>
                <div className="text-xs text-capas-ocean-dark/70 flex items-center space-x-2">
                  <span>{(session?.user as ExtendedUser)?.program || 'Student'}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    (session?.user as ExtendedUser)?.role === 'admin' ? 'bg-capas-coral/10 text-capas-coral' :
                    (session?.user as ExtendedUser)?.role === 'instructor' ? 'bg-capas-turquoise/10 text-capas-turquoise' :
                    'bg-capas-ocean/10 text-capas-ocean'
                  }`}>
                    {(session?.user as ExtendedUser)?.role === 'admin' ? 'Admin' :
                     (session?.user as ExtendedUser)?.role === 'instructor' ? 'Instructor' :
                     'Student'}
                  </span>
                </div>
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-4 border-b border-capas-ocean-light/20">
                  <div className="font-medium text-capas-ocean-dark">
                    {session?.user?.name}
                  </div>
                  <div className="text-sm text-capas-ocean-dark/70">
                    {session?.user?.email}
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      (session?.user as ExtendedUser)?.role === 'admin' ? 'bg-capas-coral/10 text-capas-coral' :
                      (session?.user as ExtendedUser)?.role === 'instructor' ? 'bg-capas-turquoise/10 text-capas-turquoise' :
                      'bg-capas-ocean/10 text-capas-ocean'
                    }`}>
                      {(session?.user as ExtendedUser)?.role === 'admin' ? 'Administrator' :
                       (session?.user as ExtendedUser)?.role === 'instructor' ? 'Instructor' :
                       'Student'}
                    </span>
                    {(session?.user as ExtendedUser)?.island && (
                      <span className="text-xs text-capas-ocean-dark/50">
                        {(session?.user as ExtendedUser)?.island}
                      </span>
                    )}
                  </div>
                </div>
                <div className="py-2">
                  <Menu.Item>
                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light"
                    >
                      Profile Settings
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link
                      href="/dashboard/help"
                      className="block px-4 py-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light"
                    >
                      Help & Support
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                      className="w-full text-left px-4 py-2 text-sm text-capas-coral hover:bg-capas-sand-light"
                    >
                      Sign Out
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
}