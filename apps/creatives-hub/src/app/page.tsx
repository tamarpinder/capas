'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BahamianCulturalScene from '@/components/cultural/BahamianCulturalScene';
import { CulturalHeader } from '@/components/cultural/BahamianPatterns';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Home() {
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
    <div className="min-h-screen bg-capas-sand-light">
      {/* Hero Section */}
      <CulturalHeader
        title="CAPAS Bahamas"
        subtitle="Creatives Hub - Where Culture Meets Innovation"
        pattern="waves"
      >
        <div className="mb-8">
          <BahamianCulturalScene 
            variant="heritage" 
            height={250} 
            showControls={true}
            interactive={true}
            className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-4xl"
          />
        </div>
        <Link href="/my-courses" className="btn-capas-primary text-lg px-8 py-3">
          Start Learning
        </Link>
      </CulturalHeader>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-capas-turquoise mb-4">
            Explore Your Creative Journey
          </h2>
          <p className="text-capas-ocean-dark max-w-3xl mx-auto">
            Navigate through immersive learning experiences designed to celebrate Bahamian culture 
            while providing world-class creative education.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={feature.href}>
                <div className="creative-card p-8 text-center hover:shadow-xl transition-shadow group cursor-pointer">
                  <div className={`${feature.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4 group-hover:text-capas-turquoise-dark transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-capas-ocean-dark leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="font-display text-2xl font-bold text-capas-turquoise mb-8 text-center">
            Platform Highlights
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-capas-turquoise mb-2">3D</div>
              <div className="text-capas-ocean-dark">Immersive Learning</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-capas-coral mb-2">🇧🇸</div>
              <div className="text-capas-ocean-dark">Cultural Heritage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-capas-gold mb-2">🎨</div>
              <div className="text-capas-ocean-dark">Creative Arts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-capas-palm mb-2">📱</div>
              <div className="text-capas-ocean-dark">Mobile Optimized</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}