'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials. Try: kiana.johnson@capas.edu.bs / capas123');
    } else {
      router.push('/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-ocean-light to-capas-turquoise flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-3">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-capas-turquoise font-display font-bold text-2xl">C</span>
            </div>
            <div className="text-left">
              <h1 className="font-display text-3xl font-bold text-white">CAPAS</h1>
              <p className="text-white/80 text-sm">School Portal</p>
            </div>
          </Link>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-2">
              Welcome Back
            </h2>
            <p className="text-capas-ocean-dark">
              Sign in to access your academic portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 border border-capas-ocean-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                placeholder="student@capas.edu.bs"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-capas-ocean-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="bg-capas-coral/10 border border-capas-coral/20 text-capas-coral text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-capas-primary py-3 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" />
                </svg>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-capas-sand-light rounded-lg">
            <h4 className="font-medium text-capas-ocean-dark text-sm mb-2">Demo Credentials:</h4>
            <div className="text-xs text-capas-ocean-dark space-y-1">
              <p><strong>Student:</strong> kiana.johnson@capas.edu.bs / capas123</p>
              <p><strong>Admin:</strong> admin@capas.edu.bs / capas123</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-capas-turquoise hover:text-capas-turquoise-dark text-sm">
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}