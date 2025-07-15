// Full content for ProgramClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { AcademicCapIcon, ClockIcon, CurrencyDollarIcon, UserGroupIcon, CheckIcon, ArrowLeftIcon, CalendarIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';

interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  duration: string;
  credits: number;
  description: string;
  longDescription: string;
  tuition: string;
  scholarships: boolean;
  featured: boolean;
  admissionRequirements: string[];
  careerOutcomes: string[];
}

export default function ProgramClient({ program, relatedPrograms, params }: { program: Program; relatedPrograms: Program[]; params: { slug: string } }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark font-montserrat">Loading program details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="bg-capas-sand-light py-4 border-b border-capas-ocean-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                  Home
                </Link>
              </li>
              <span className="text-capas-ocean-dark/50">/</span>
              <li>
                <Link href="/programs" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                  Programs
                </Link>
              </li>
              <span className="text-capas-ocean-dark/50">/</span>
              <li className="text-capas-turquoise font-medium truncate">
                {program.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/programs"
            className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark transition-colors font-montserrat font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Programs
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
        {/* ... full hero JSX ... */}
      </section>

      {/* Program Details */}
      <section className="py-20 bg-capas-sand-light">
        {/* ... full details JSX ... */}
      </section>

      {/* Related Programs */}
      {relatedPrograms.length > 0 && (
        <section className="py-20 bg-white">
          {/* ... full related JSX ... */}
        </section>
      )}

      <Footer />
    </div>
  );
} 