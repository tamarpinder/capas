'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  MusicalNoteIcon, 
  BeakerIcon,
  ArrowRightIcon,
  SparklesIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { getDemoUserEmails, getStudentByEmail } from '@/lib/mock-data';

interface DemoUser {
  email: string;
  name: string;
  program: string;
  year: number;
  island: string;
  bio: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgGradient: string;
}

export default function DemoSelectionPage() {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers: DemoUser[] = getDemoUserEmails().map(email => {
    const student = getStudentByEmail(email)!;
    
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'Music Performance & Production': MusicalNoteIcon,
      'Marine Conservation & Arts': BeakerIcon,
      'Contemporary Dance & Choreography': AcademicCapIcon,
    };

    const colorMap: Record<string, { color: string; bgGradient: string }> = {
      'Music Performance & Production': {
        color: 'text-capas-turquoise',
        bgGradient: 'from-capas-turquoise/10 to-capas-ocean/10'
      },
      'Marine Conservation & Arts': {
        color: 'text-capas-ocean',
        bgGradient: 'from-capas-ocean/10 to-capas-palm/10'
      },
      'Contemporary Dance & Choreography': {
        color: 'text-capas-coral',
        bgGradient: 'from-capas-coral/10 to-capas-gold/10'
      },
    };

    const styling = colorMap[student.program] || colorMap['Music Performance & Production'];

    return {
      email,
      name: student.name,
      program: student.program,
      year: student.year,
      island: student.island,
      bio: student.bio,
      icon: iconMap[student.program] || MusicalNoteIcon,
      color: styling.color,
      bgGradient: styling.bgGradient
    };
  });

  const handleUserSelect = async (email: string) => {
    setIsLoading(true);
    setSelectedUser(email);

    try {
      const result = await signIn('credentials', {
        email,
        password: 'capas123',
        redirect: false
      });

      if (result?.ok) {
        router.push('/dashboard');
      } else {
        console.error('Sign in failed');
        setIsLoading(false);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light via-white to-capas-ocean-light">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-capas-ocean-light/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold text-capas-turquoise">
                  CAPAS School Portal
                </h1>
                <p className="text-capas-ocean-dark/70 text-sm">
                  Experience the Caribbean's premier arts education platform
                </p>
              </div>
            </div>
            <a
              href="https://capas.edu.bs"
              className="text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors text-sm flex items-center space-x-1"
            >
              <span>← Back to Main Site</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <SparklesIcon className="w-8 h-8 text-capas-gold" />
            <h2 className="font-display text-4xl font-bold text-capas-turquoise">
              Demo Experience
            </h2>
            <SparklesIcon className="w-8 h-8 text-capas-gold" />
          </div>
          <p className="text-xl text-capas-ocean-dark mb-6 max-w-3xl mx-auto">
            Choose a student persona to explore the CAPAS School Portal. 
            Each profile showcases different features and demonstrates the platform's capabilities.
          </p>
          <div className="bg-capas-gold/10 border border-capas-gold/20 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-capas-ocean-dark text-sm">
              <strong>Demo Password:</strong> capas123
            </p>
          </div>
        </motion.div>

        {/* Demo User Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {demoUsers.map((user, index) => (
            <motion.div
              key={user.email}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative group cursor-pointer h-80 ${
                selectedUser === user.email ? 'ring-2 ring-capas-turquoise' : ''
              }`}
              onClick={() => handleUserSelect(user.email)}
            >
              <div className={`bg-gradient-to-br ${user.bgGradient} p-8 rounded-2xl border border-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full flex flex-col ${
                isLoading && selectedUser === user.email ? 'animate-pulse' : ''
              }`}>
                {/* Loading Overlay */}
                {isLoading && selectedUser === user.email && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 border-2 border-capas-turquoise border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-capas-turquoise font-medium">Signing In...</span>
                    </div>
                  </div>
                )}

                {/* User Icon */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md">
                  <user.icon className={`w-8 h-8 ${user.color}`} />
                </div>

                {/* User Info */}
                <div className="mb-6 flex-grow">
                  <h3 className="font-display text-xl font-bold text-capas-ocean-dark mb-2">
                    {user.name}
                  </h3>
                  <p className={`text-sm font-medium ${user.color} mb-2`}>
                    {user.program}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-capas-ocean-dark/70 mb-3">
                    <span>Year {user.year}</span>
                    <div className="flex items-center space-x-1">
                      <GlobeAltIcon className="w-3 h-3" />
                      <span>{user.island}</span>
                    </div>
                  </div>
                  <p className="text-sm text-capas-ocean-dark/80 leading-relaxed line-clamp-3">
                    {user.bio}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-capas-ocean-dark/60">
                    Click to sign in as {user.name.split(' ')[0]}
                  </span>
                  <ArrowRightIcon className={`w-5 h-5 ${user.color} group-hover:translate-x-1 transition-transform`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}