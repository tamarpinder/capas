'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import useUserStore from '@/stores/userStore';

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, loading, error, clearError } = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        onSuccess?.();
      }
    } catch (err) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false);
    }
  };

  const demoCredentials = [
    { 
      username: 'sophia.chen', 
      name: 'Sophia Chen - Music Performance Student',
      department: 'Music Performance' 
    },
    { 
      username: 'aaliyah.thompson', 
      name: 'Aaliyah Thompson - Dance Student',
      department: 'Dance' 
    },
    { 
      username: 'marcus.williams', 
      name: 'Marcus Williams - Visual Arts Student',
      department: 'Visual Arts' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Modern branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-2xl p-12 text-white text-center">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl font-bold">C</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              CAPAS Creatives Hub
            </h1>
            <p className="text-xl text-capas-ocean-light mb-8">
              Where Bahamian Culture Meets Digital Innovation
            </p>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Creative Learning Platform</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Interactive Course Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Collaborative Learning Environment</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-8 lg:p-10"
        >
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-capas-turquoise to-capas-ocean rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">C</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              CAPAS Creatives Hub
            </h1>
            <p className="text-gray-600 text-sm">
              Where Bahamian Culture Meets Digital Innovation
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome Back
          </h2>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
            >
              <p className="text-sm">{error}</p>
              <button 
                onClick={clearError}
                className="text-red-500 hover:text-red-700 mt-1 text-xs underline"
              >
                Dismiss
              </button>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-gradient-to-r from-capas-turquoise to-capas-ocean text-white font-semibold py-3 rounded-lg hover:from-capas-turquoise-dark hover:to-capas-ocean-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">
              Demo Accounts (Any password works):
            </h3>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.username}
                  onClick={() => {
                    setUsername(cred.username);
                    setPassword('demo123');
                  }}
                  className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-sm border border-gray-200"
                >
                  <div className="font-medium text-gray-900">{cred.name}</div>
                  <div className="text-gray-500">{cred.username}</div>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            This is a demo environment with mock data
          </p>
        </motion.div>
      </div>
    </div>
  );
}