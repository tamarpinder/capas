'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  WifiIcon,
  ArrowPathIcon,
  HomeIcon,
  BookOpenIcon,
  PhoneIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const retryConnection = () => {
    setRetryCount(prev => prev + 1);
    
    // Simple connectivity check
    fetch('/api/health', { method: 'HEAD' })
      .then(() => {
        setIsOnline(true);
        // Redirect to home page on successful connection
        window.location.href = '/';
      })
      .catch(() => {
        setTimeout(() => setRetryCount(prev => prev - 1), 2000);
      });
  };

  const cachedPages = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Programs', path: '/programs', icon: BookOpenIcon },
    { name: 'Contact', path: '/contact', icon: PhoneIcon },
    { name: 'How to Apply', path: '/how-to-apply', icon: InformationCircleIcon }
  ];

  if (isOnline) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiIcon className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
            You&apos;re Back Online!
          </h1>
          <p className="text-capas-ocean-dark mb-6">
            Great! Your internet connection has been restored.
          </p>
          <Link
            href="/"
            className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-sand">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-capas-ocean-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-capas-turquoise font-montserrat">
              CAPAS Bahamas
            </div>
            <div className="ml-4 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              Offline Mode
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-32 h-32 bg-capas-coral rounded-full flex items-center justify-center mx-auto mb-8">
              <ExclamationTriangleIcon className="w-16 h-16 text-white" />
            </div>
            
            <h1 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
              You&apos;re Currently Offline
            </h1>
            
            <p className="text-xl text-capas-ocean-dark max-w-2xl mx-auto mb-8">
              Don&apos;t worry! While you&apos;re offline, you can still access some cached content 
              and learn about CAPAS Bahamas.
            </p>

            <button
              onClick={retryConnection}
              disabled={retryCount > 0}
              className="bg-capas-turquoise hover:bg-capas-turquoise-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 inline-flex items-center transform hover:scale-105 shadow-lg"
            >
              {retryCount > 0 ? (
                <>
                  <ArrowPathIcon className="w-6 h-6 mr-2 animate-spin" />
                  Checking Connection...
                </>
              ) : (
                <>
                  <ArrowPathIcon className="w-6 h-6 mr-2" />
                  Try Again
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Available Cached Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-6 text-center">
            Available Offline Content
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {cachedPages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="flex items-center p-4 bg-capas-sand-light rounded-lg hover:bg-capas-sand transition-colors duration-200 group"
              >
                <div className="bg-capas-turquoise w-12 h-12 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                  <page.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-capas-ocean-dark group-hover:text-capas-turquoise transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-sm text-capas-ocean-dark/70">
                    Cached content available
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Offline Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-8"
        >
          <div className="flex items-start">
            <InformationCircleIcon className="w-8 h-8 text-blue-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-800 mb-3">About CAPAS Bahamas</h3>
              <div className="text-blue-700 space-y-3 text-sm">
                <p>
                  <strong>Creative Arts, Performance & Academic Studies (CAPAS)</strong> is The Bahamas&apos; 
                  premier institution for creative arts education, where Caribbean culture meets creative innovation.
                </p>
                <p>
                  <strong>Our Programs:</strong> Full-time and part-time programs in Vocal Performance, 
                  Dance, Theatre Arts, Instrumental Performance, and more.
                </p>
                <p>
                  <strong>Our Mission:</strong> To provide world-class education that celebrates and preserves 
                  Caribbean cultural heritage while preparing students for successful careers in the creative arts.
                </p>
                <p>
                  <strong>Location:</strong> Nassau, The Bahamas<br />
                  <strong>Phone:</strong> (242) 123-4567<br />
                  <strong>Email:</strong> info@capas.edu.bs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Connection Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <h3 className="font-semibold text-capas-ocean-dark mb-4">
            Trouble Connecting?
          </h3>
          <div className="text-sm text-capas-ocean-dark/70 space-y-2">
            <p>• Check your WiFi or mobile data connection</p>
            <p>• Try moving to an area with better signal</p>
            <p>• Restart your browser and try again</p>
            <p>• Contact your internet service provider if the problem persists</p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-capas-ocean-light/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-capas-ocean-dark/70">
            <p>© 2024 CAPAS Bahamas. All rights reserved.</p>
            <p className="mt-2 text-sm">
              This page works offline thanks to our Progressive Web App technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}