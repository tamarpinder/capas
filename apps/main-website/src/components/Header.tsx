'use client';

import Link from 'next/link';
import { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import CollapsibleSearchBar from './CollapsibleSearchBar';
import { useTheme } from './ThemeProvider';

// Modern navigation structure with better organization
const navigation = [
  {
    name: 'About',
    items: [
      { name: 'Mission & Vision', href: '/about/mission', description: 'Our purpose and future aspirations' },
      { name: 'Leadership Team', href: '/about/leadership', description: 'Meet our administrative team' },
      { name: 'History & Heritage', href: '/about/history', description: 'CAPAS legacy and tradition' },
      { name: 'Governance', href: '/about/governance', description: 'Board and institutional structure' },
    ],
  },
  {
    name: 'Academics',
    items: [
      { name: 'Program Overview', href: '/programs', description: 'All our educational offerings' },
      { name: 'Full-Time Programs', href: '/programs/full-time', description: 'Comprehensive arts education' },
      { name: 'Part-Time Programs', href: '/programs/part-time', description: 'Flexible learning options' },
      { name: 'Admissions & Auditions', href: '/programs/admissions', description: 'Application process and requirements' },
    ],
  },
  {
    name: 'Students',
    items: [
      { name: 'Getting Started', href: '/students/preparation', description: 'Prepare for your CAPAS journey' },
      { name: 'Student Life', href: '/students/life', description: 'Campus culture and community' },
      { name: 'Academic Calendar', href: '/students/calendar', description: 'Important dates and schedules' },
      { name: 'Campus & Facilities', href: '/students/facilities', description: 'Resources and amenities' },
    ],
  },
  {
    name: 'Community',
    items: [
      { name: 'Faculty & Staff', href: '/community/faculty', description: 'Meet our talented team' },
      { name: 'Alumni Stories', href: '/community/alumni', description: 'Success stories and achievements' },
      { name: 'News & Events', href: '/community/news', description: 'Latest updates and happenings' },
      { name: 'Gallery', href: '/community/gallery', description: 'Visual stories and memories' },
    ],
  },
];

// Primary action buttons (prominently displayed)
const primaryActions = [
  { name: 'Apply Now', href: '/how-to-apply', type: 'primary' },
];

// Secondary actions (right side)
const secondaryActions = [
  { name: 'Support CAPAS', href: '/support', type: 'secondary' },
];

// Portal access organized as dropdown
const portalAccess = {
  name: 'Portals',
  items: [
    { name: 'School Portal', href: '/school-portal', description: 'Student and staff access', color: 'text-capas-turquoise' },
    { name: 'Creatives Hub', href: '/creatives-hub', description: 'Creative community platform', color: 'text-capas-coral' },
  ],
};

// Memoize heavy components
const MemoizedDropdownMenu = memo(DropdownMenu);

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-50 border-b border-capas-ocean-light/20 dark:border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-capas-turquoise/5 to-capas-gold/5 dark:from-capas-turquoise/10 dark:to-capas-gold/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <span className="text-white font-montserrat font-bold text-lg sm:text-xl">C</span>
            </div>
            <div className="min-w-0">
              <h1 className="font-montserrat text-xl sm:text-2xl font-bold text-capas-gold group-hover:text-capas-gold-dark transition-colors duration-300 truncate">CAPAS</h1>
              <p className="text-xs sm:text-sm text-capas-ocean-dark dark:text-gray-400 font-montserrat">Bahamas</p>
            </div>
          </Link>

          {/* Desktop Navigation - Moved search to right side */}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {/* Main navigation dropdowns */}
            {navigation.map((item) => (
              <MemoizedDropdownMenu
                key={item.name}
                title={item.name}
                items={item.items}
                className="text-sm xl:text-base"
              />
            ))}
            
            {/* Primary CTA Button */}
            <div className="ml-2 xl:ml-4">
              {primaryActions.map((action) => (
                <Link
                  key={action.name}
                  href={action.href}
                  className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-3 xl:px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-montserrat whitespace-nowrap text-sm xl:text-base"
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Collapsible Search */}
            <CollapsibleSearchBar />
            
            {/* Secondary action button */}
            {secondaryActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="bg-capas-coral hover:bg-capas-coral-dark text-white px-3 py-2 rounded-lg font-semibold font-montserrat shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm whitespace-nowrap"
              >
                {action.name}
              </Link>
            ))}
            
            {/* Portal Access Dropdown */}
            <MemoizedDropdownMenu
              title={portalAccess.name}
              items={portalAccess.items}
              className="text-sm"
            />
            
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-capas-sand-light dark:bg-gray-700 text-capas-ocean-dark dark:text-gray-200 hover:bg-capas-sand dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2 hover:scale-105 active:scale-95"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 transition-transform duration-200" />
                ) : (
                  <Sun className="h-5 w-5 transition-transform duration-200" />
                )}
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-capas-ocean-dark dark:text-gray-200 hover:text-capas-turquoise dark:hover:text-capas-turquoise transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2"
            aria-label={`${isMenuOpen ? 'Close' : 'Open'} menu`}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="lg:hidden border-t border-capas-ocean-light/30 dark:border-gray-700 max-h-[calc(100vh-80px)] overflow-y-auto"
            >
              <div className="py-6 space-y-6">
                {/* Mobile Search */}
                <div className="px-2">
                  <CollapsibleSearchBar />
                </div>
                
                {/* Mobile Navigation Items */}
                <div className="space-y-4">
                  {navigation.map((section) => (
                    <div key={section.name} className="space-y-2">
                      <h3 className="font-montserrat font-semibold text-capas-turquoise dark:text-capas-turquoise px-2">
                        {section.name}
                      </h3>
                      <div className="pl-4 space-y-2">
                        {section.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block text-capas-ocean-dark dark:text-gray-200 hover:text-capas-turquoise dark:hover:text-capas-turquoise transition-colors duration-200 font-montserrat py-1 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-inset rounded-md px-2"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Primary Action Button for Mobile */}
                  <div className="border-t border-capas-ocean-light/30 dark:border-gray-700 pt-4">
                    {primaryActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        className="block bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-4 py-3 rounded-lg text-center shadow-md font-montserrat mb-4"
                        onClick={closeMenu}
                      >
                        {action.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Actions */}
                <div className="border-t border-capas-ocean-light/30 dark:border-gray-700 pt-6 space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <span className="font-montserrat font-medium text-capas-ocean-dark dark:text-gray-200">
                      Theme
                    </span>
                    {mounted && (
                      <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-capas-sand-light dark:bg-gray-700 text-capas-ocean-dark dark:text-gray-200 hover:bg-capas-sand dark:hover:bg-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2 hover:scale-105 active:scale-95"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                      >
                        {theme === 'light' ? (
                          <Moon className="h-5 w-5 transition-transform duration-200" />
                        ) : (
                          <Sun className="h-5 w-5 transition-transform duration-200" />
                        )}
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3 max-w-full">
                    {/* Secondary Action */}
                    {secondaryActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        className="block bg-capas-coral hover:bg-capas-coral-dark text-white px-4 py-3 rounded-lg font-semibold font-montserrat text-center shadow-md"
                        onClick={closeMenu}
                      >
                        {action.name}
                      </Link>
                    ))}
                    
                    {/* Portal Links */}
                    <div className="pt-2 border-t border-capas-ocean-light/20 dark:border-gray-600">
                      <h4 className="text-sm font-semibold text-capas-ocean-dark dark:text-gray-200 mb-2 px-2">
                        Quick Access
                      </h4>
                      {portalAccess.items.map((portal) => (
                        <Link
                          key={portal.name}
                          href={portal.href}
                          className="block text-capas-ocean-dark dark:text-gray-200 hover:text-capas-turquoise dark:hover:text-capas-turquoise transition-colors duration-200 font-montserrat py-2 px-2 rounded-md"
                          onClick={closeMenu}
                        >
                          <span className={portal.color}>{portal.name}</span>
                          <span className="text-sm text-capas-ocean-dark/60 dark:text-gray-400 block">
                            {portal.description}
                          </span>
                        </Link>
                      ))}
                    </div>
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

export default memo(Header);