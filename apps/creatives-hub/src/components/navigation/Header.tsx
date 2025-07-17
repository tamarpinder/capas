'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useUserStore from '@/stores/userStore';
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
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'My Courses', href: '/my-courses', icon: AcademicCapIcon },
  { name: 'Learning Center', href: '/learning-center', icon: BookOpenIcon },
  { name: 'Forums', href: '/forums', icon: ChatBubbleLeftRightIcon },
  { name: 'Gallery', href: '/gallery', icon: PhotoIcon },
  { name: 'Cultural Showcase', href: '/cultural-showcase', icon: SparklesIcon },
  { name: 'Policies', href: '/policies', icon: DocumentTextIcon },
];

export default function Header() {
  const { user, logout } = useUserStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                <span className="text-capas-turquoise">CAPAS</span> Creatives Hub
              </h1>
              <p className="text-xs text-capas-ocean-dark">Bahamas</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.slice(1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-capas-turquoise hover:bg-capas-ocean-light transition-all duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side - School Portal & Profile */}
          <div className="flex items-center space-x-4">
            {/* School Portal Link */}
            <Link
              href="http://localhost:4000"
              target="_blank"
              className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg bg-capas-ocean-light text-capas-turquoise hover:bg-capas-gold hover:text-white transition-all duration-200 text-sm font-medium"
            >
              <span>School Portal</span>
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>

            {/* User Profile */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.profileimageurlsmall || user.profileimageurl}
                    alt={user.fullname}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.firstname}</p>
                    <p className="text-xs text-gray-500">{user.department}</p>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.fullname}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <UserCircleIcon className="w-4 h-4 mr-3" />
                      My Profile
                    </Link>
                    <Link
                      href="http://localhost:4000"
                      target="_blank"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 sm:hidden"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-3" />
                      School Portal
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <div className="space-y-2">
              {navigation.slice(1).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-capas-turquoise hover:bg-capas-ocean-light transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              
              {/* Mobile School Portal Link */}
              <Link
                href="http://localhost:4000"
                target="_blank"
                className="flex items-center space-x-3 p-3 rounded-lg text-capas-turquoise bg-capas-ocean-light hover:bg-capas-gold hover:text-white font-medium transition-all duration-200"
              >
                <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                <span>School Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}