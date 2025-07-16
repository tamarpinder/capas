'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-capas-ocean-light to-capas-turquoise flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-capas-turquoise font-display font-bold text-xl">C</span>
          </div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-ocean-light to-capas-turquoise flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <span className="text-capas-turquoise font-display font-bold text-3xl">C</span>
        </div>

        {/* Title */}
        <h1 className="font-display text-4xl font-bold text-white mb-4">
          CAPAS School Portal
        </h1>
        
        <p className="text-white/90 text-lg mb-8">
          Access your academic information and resources
        </p>

        {/* Demo Button */}
        <div className="space-y-4">
          <Link
            href="/demo"
            className="btn-capas-primary bg-white text-capas-turquoise hover:bg-white/90 text-lg px-8 py-4 rounded-xl font-semibold shadow-lg inline-flex items-center space-x-2"
          >
            <span>Explore Demo Portal</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="text-white/80 hover:text-white text-sm underline"
            >
              Direct Sign In →
            </Link>
          </div>
        </div>

        {/* Back to Main Site */}
        <div className="mt-8">
          <a
            href="https://capas.netlify.app/"
            className="text-white/80 hover:text-white text-sm underline"
          >
            ← Back to Main CAPAS Site
          </a>
        </div>

      </div>
    </div>
  );
}
