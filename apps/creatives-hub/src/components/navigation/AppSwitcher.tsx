'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon,
  AcademicCapIcon,
  PaintBrushIcon
} from '@heroicons/react/24/solid';

interface CapasApp {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
  isExternal: boolean;
  isCurrent?: boolean;
}

const capasApps: CapasApp[] = [
  {
    id: 'main-website',
    name: 'Main Website',
    description: 'CAPAS Bahamas homepage and information',
    url: process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL || 'https://capas.netlify.app',
    icon: HomeIcon,
    color: 'text-capas-turquoise',
    isExternal: true
  },
  {
    id: 'school-portal',
    name: 'School Portal',
    description: 'Administrative tools and student management',
    url: process.env.NEXT_PUBLIC_SCHOOL_PORTAL_URL || 'https://capas-school-portal.netlify.app',
    icon: AcademicCapIcon,
    color: 'text-capas-palm',
    isExternal: true
  },
  {
    id: 'creatives-hub',
    name: 'Creatives Hub',
    description: 'Learning platform for creative arts',
    url: '#',
    icon: PaintBrushIcon,
    color: 'text-capas-coral',
    isExternal: false,
    isCurrent: true
  }
];

export default function AppSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentApp = capasApps.find(app => app.isCurrent);

  const handleAppSelect = (app: CapasApp) => {
    setIsOpen(false);
    if (app.isExternal) {
      window.open(app.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-capas-ocean-light/50 transition-all duration-200 group"
        aria-label="CAPAS App Switcher"
      >
        {/* CAPAS Logo */}
        <div className="w-8 h-8 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        
        {/* Current App Info */}
        <div className="hidden md:block">
          <div className="text-sm font-medium text-gray-900">CAPAS</div>
          <div className="text-xs text-gray-500">{currentApp?.name}</div>
        </div>
        
        <ChevronDownIcon 
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* App Switcher Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              {/* Header */}
              <div className="px-4 pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm">CAPAS Applications</h3>
                <p className="text-xs text-gray-500 mt-1">Switch between CAPAS platforms</p>
              </div>

              {/* App List */}
              <div className="py-2">
                {capasApps.map((app) => {
                  const IconComponent = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => handleAppSelect(app)}
                      disabled={app.isCurrent}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-start space-x-3 group ${
                        app.isCurrent ? 'bg-capas-ocean-light/20 cursor-default' : 'cursor-pointer'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        app.isCurrent ? 'bg-capas-turquoise' : 'bg-gray-100 group-hover:bg-capas-ocean-light'
                      } transition-colors`}>
                        <IconComponent className={`w-5 h-5 ${
                          app.isCurrent ? 'text-white' : app.color
                        }`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium text-sm ${
                            app.isCurrent ? 'text-capas-turquoise' : 'text-gray-900'
                          }`}>
                            {app.name}
                          </span>
                          {app.isCurrent && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-capas-turquoise text-white">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                          {app.description}
                        </p>
                      </div>

                      {app.isExternal && !app.isCurrent && (
                        <div className="flex-shrink-0">
                          <div className="w-4 h-4 text-gray-400 group-hover:text-capas-turquoise">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 text-center">
                  <span className="font-medium text-capas-turquoise">CAPAS</span> College of Arts, Performing Arts & Sciences
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}