'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  SparklesIcon,
  DocumentTextIcon
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
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-capas-ocean-light/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-display font-bold text-lg">C</span>
            </motion.div>
            <div>
              <h1 className="font-display text-xl font-bold text-capas-turquoise">
                CAPAS Creatives Hub
              </h1>
              <p className="text-xs text-capas-ocean-dark/60">Student Portal</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-turquoise/5 transition-all duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Portal Link */}
          <div className="flex items-center space-x-4">
            <Link
              href="http://localhost:4000"
              target="_blank"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-capas-coral/10 text-capas-coral hover:bg-capas-coral hover:text-white transition-all duration-200"
            >
              <span className="text-sm font-medium">School Portal</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 rounded-lg text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-turquoise/5">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-3 gap-2">
            {navigation.slice(0, 6).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center p-3 rounded-lg text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-turquoise/5 transition-all duration-200"
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}