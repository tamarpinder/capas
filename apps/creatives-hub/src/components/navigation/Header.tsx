'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import useUserStore from '@/stores/userStore';
import DropdownMenu from './DropdownMenu';
import SearchBar from './SearchBar';
import ProgressIndicator from './ProgressIndicator';
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  SparklesIcon,
  DocumentTextIcon,
  ArrowTopRightOnSquareIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  CogIcon,
  ChartBarIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  PhoneIcon,
  ClockIcon,
  RocketLaunchIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// Modern navigation structure with logical grouping
const navigation = [
  {
    name: 'Learning',
    items: [
      { name: 'My Courses', href: '/my-courses', description: 'View and manage your enrolled courses', icon: AcademicCapIcon },
      { name: 'Learning Center', href: '/learning-center', description: 'Structured learning paths and modules', icon: BookOpenIcon },
      { name: 'Progress Tracker', href: '/progress', description: 'Track your learning achievements', icon: ChartBarIcon },
    ],
  },
  {
    name: 'Community',
    items: [
      { name: 'Forums', href: '/forums', description: 'Connect with students and instructors', icon: ChatBubbleLeftRightIcon },
      { name: 'Resource Library', href: '/gallery', description: 'Access tutorials, templates, and resources', icon: PhotoIcon },
      { name: 'Cultural Showcase', href: '/cultural-showcase', description: 'Explore Bahamian arts and culture', icon: SparklesIcon },
    ],
  },
  {
    name: 'Resources',
    items: [
      { name: 'Policies & Support', href: '/policies', description: 'Guidelines, FAQ, and help center', icon: DocumentTextIcon },
      { name: 'Technical Support', href: '/policies#support', description: 'Get help with technical issues', icon: QuestionMarkCircleIcon },
      { name: 'Academic Support', href: '/policies#academic', description: 'Academic policies and guidelines', icon: ShieldCheckIcon },
    ],
  },
];

// Primary actions (prominently displayed)
const primaryActions = [
  { name: 'Start Learning', href: '/my-courses', type: 'primary' },
];

// Secondary actions
const secondaryActions = [
  { name: 'Join Community', href: '/forums', type: 'secondary' },
];

// External portal access
const portalAccess = {
  name: 'School Portal',
  href: 'http://localhost:4000',
  isExternal: true,
  description: 'Access school portal for administrative tasks',
  icon: ArrowTopRightOnSquareIcon,
  color: 'text-capas-palm'
};

export default function Header() {
  const { user, logout } = useUserStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMobileMenuOpen(prev => !prev), []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-capas-ocean-light/20"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-capas-turquoise/5 to-capas-gold/5"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-white font-bold text-xl">C</span>
            </motion.div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-capas-gold group-hover:text-capas-gold-dark transition-colors duration-300 truncate">
                CAPAS
              </h1>
              <p className="text-sm text-capas-ocean-dark">Creatives Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {/* Main navigation dropdowns */}
            {navigation.map((section) => (
              <DropdownMenu
                key={section.name}
                title={section.name}
                items={section.items}
                className="text-sm xl:text-base"
              />
            ))}
            
            {/* Primary CTA Button */}
            <div className="ml-4">
              {primaryActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap text-sm xl:text-base"
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Bar */}
            <SearchBar />
            
            {/* Progress Indicator */}
            {user && <ProgressIndicator />}
            
            {/* Secondary action button */}
            {secondaryActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="bg-capas-coral hover:bg-capas-coral-dark text-white px-3 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm whitespace-nowrap"
              >
                {action.name}
              </Link>
            ))}
            
            {/* School Portal Access */}
            <Link
              href={portalAccess.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-capas-ocean-light text-capas-turquoise hover:bg-capas-palm hover:text-white transition-all duration-200 text-sm font-medium"
            >
              <span>School Portal</span>
              <portalAccess.icon className="w-4 h-4" />
            </Link>
            
            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-capas-ocean-light/50 transition-colors"
                >
                  <img
                    src={user.profileimageurlsmall || user.profileimageurl}
                    alt={user.fullname}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.firstname}</p>
                    <p className="text-xs text-gray-500">{user.department}</p>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)'
                      }}
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.fullname}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-capas-ocean-light/50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <UserCircleIcon className="w-4 h-4 mr-3" />
                        My Profile
                      </Link>
                      <Link
                        href="/notifications"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-capas-ocean-light/50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <BellIcon className="w-4 h-4 mr-3" />
                        Notifications
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-capas-ocean-light/50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <CogIcon className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-capas-ocean-dark hover:text-capas-turquoise transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2"
            aria-label={`${isMobileMenuOpen ? 'Close' : 'Open'} menu`}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="lg:hidden border-t border-capas-ocean-light/30 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="py-6 space-y-6">
                {/* Mobile Search */}
                <div className="px-2">
                  <SearchBar />
                </div>
                
                {/* Mobile Navigation Items */}
                <div className="space-y-4">
                  {navigation.map((section) => (
                    <div key={section.name} className="space-y-2">
                      <h3 className="font-semibold text-capas-turquoise px-2">
                        {section.name}
                      </h3>
                      <div className="pl-4 space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center space-x-3 text-capas-ocean-dark hover:text-capas-turquoise transition-colors duration-200 py-2 px-2 rounded-md"
                            onClick={closeMenu}
                          >
                            <item.icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Primary Action Button for Mobile */}
                  <div className="border-t border-capas-ocean-light/30 pt-4">
                    {primaryActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        className="block bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-4 py-3 rounded-lg text-center shadow-md mb-4"
                        onClick={closeMenu}
                      >
                        {action.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Actions */}
                <div className="border-t border-capas-ocean-light/30 pt-6 space-y-4">
                  <div className="space-y-3">
                    {/* Secondary Action */}
                    {secondaryActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        className="block bg-capas-coral hover:bg-capas-coral-dark text-white px-4 py-3 rounded-lg font-semibold text-center shadow-md"
                        onClick={closeMenu}
                      >
                        {action.name}
                      </Link>
                    ))}
                    
                    {/* School Portal Link */}
                    <Link
                      href={portalAccess.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 bg-capas-ocean-light text-capas-turquoise px-4 py-3 rounded-lg font-medium"
                      onClick={closeMenu}
                    >
                      <span>School Portal</span>
                      <portalAccess.icon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}