'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import useUserStore from '@/stores/userStore';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const { isAuthenticated, user } = useUserStore();
  const [showLogin, setShowLogin] = useState(false);

  // Show login form if not authenticated
  if (!isAuthenticated && !showLogin) {
    return <LoginForm onSuccess={() => setShowLogin(false)} />;
  }

  const features = [
    {
      title: 'My Courses',
      description: 'Access your enrolled courses with 3D immersive learning experiences',
      icon: AcademicCapIcon,
      href: '/my-courses',
      color: 'bg-capas-turquoise'
    },
    {
      title: 'Learning Center',
      description: 'Organized modules and progress tracking for structured learning',
      icon: BookOpenIcon,
      href: '/learning-center',
      color: 'bg-capas-coral'
    },
    {
      title: 'Forums',
      description: 'Interactive 3D discussion spaces for community engagement',
      icon: ChatBubbleLeftRightIcon,
      href: '/forums',
      color: 'bg-capas-gold'
    },
    {
      title: 'Student Gallery',
      description: 'Showcase and explore creative works from fellow students',
      icon: PhotoIcon,
      href: '/gallery',
      color: 'bg-capas-palm'
    },
    {
      title: 'Cultural Showcase',
      description: 'Experience Bahamian cultural elements and 3D animations',
      icon: SparklesIcon,
      href: '/cultural-showcase',
      color: 'bg-capas-purple'
    },
    {
      title: 'Policies',
      description: 'Important academic policies and guidelines',
      icon: DocumentTextIcon,
      href: '/policies',
      color: 'bg-capas-ocean'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light">
      {/* Modern Hero Section */}
      <div className="relative bg-gradient-to-r from-capas-turquoise via-capas-turquoise-dark to-capas-ocean text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {user && user.profileimageurl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <img
                  src={user.profileimageurl}
                  alt={user.fullname}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white/20 shadow-xl"
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {user ? `Welcome back, ${user.firstname}!` : "CAPAS Bahamas"}
              </h1>
              <p className="text-xl lg:text-2xl text-capas-ocean-light mb-8 max-w-3xl mx-auto">
                {user ? 
                  `Continue your creative journey in ${user.department}` : 
                  "Creatives Hub - Where Culture Meets Innovation"
                }
              </p>
              {user ? (
                <Link 
                  href="/my-courses" 
                  className="inline-flex items-center px-8 py-4 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg text-lg"
                >
                  <AcademicCapIcon className="w-6 h-6 mr-2" />
                  View My Courses
                </Link>
              ) : (
                <button 
                  onClick={() => setShowLogin(true)}
                  className="inline-flex items-center px-8 py-4 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg text-lg"
                >
                  <AcademicCapIcon className="w-6 h-6 mr-2" />
                  Start Learning
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Explore Your Creative Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access all your learning tools and resources in one modern, intuitive platform 
            designed for creative excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-capas-turquoise">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-capas-turquoise to-capas-ocean flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-4 group-hover:text-capas-turquoise transition-colors">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Learning Progress Stats */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Your Learning Progress
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-capas-turquoise mb-2">3</div>
                <div className="text-gray-600">Courses in Progress</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-palm mb-2">2</div>
                <div className="text-gray-600">Assignments Due</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-coral mb-2">5</div>
                <div className="text-gray-600">Forum Notifications</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-purple mb-2">8</div>
                <div className="text-gray-600">New Resources</div>
              </div>
            </div>
          </motion.div>
        )}
        
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 bg-white rounded-xl shadow-sm border border-gray-100 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Why Choose CAPAS Creatives Hub?
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-capas-turquoise mb-2">🎨</div>
                <div className="text-gray-600">Creative Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-palm mb-2">🇧🇸</div>
                <div className="text-gray-600">Bahamian Heritage</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-coral mb-2">📱</div>
                <div className="text-gray-600">Mobile Optimized</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-capas-purple mb-2">🌟</div>
                <div className="text-gray-600">Professional Growth</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}