'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  AcademicCapIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  StarIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  BuildingOffice2Icon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import programsData from '../../../../mocks/programs.json';

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

interface ComparisonFeature {
  key: string;
  label: string;
  type: 'text' | 'list' | 'boolean' | 'currency';
  category: 'basic' | 'academic' | 'financial' | 'career';
}

const comparisonFeatures: ComparisonFeature[] = [
  { key: 'type', label: 'Program Type', type: 'text', category: 'basic' },
  { key: 'category', label: 'Study Mode', type: 'text', category: 'basic' },
  { key: 'duration', label: 'Duration', type: 'text', category: 'academic' },
  { key: 'credits', label: 'Total Credits', type: 'text', category: 'academic' },
  { key: 'tuition', label: 'Annual Tuition', type: 'currency', category: 'financial' },
  { key: 'scholarships', label: 'Scholarships Available', type: 'boolean', category: 'financial' },
  { key: 'admissionRequirements', label: 'Admission Requirements', type: 'list', category: 'academic' },
  { key: 'careerOutcomes', label: 'Career Outcomes', type: 'list', category: 'career' }
];

const categoryColors = {
  basic: 'bg-capas-turquoise',
  academic: 'bg-capas-coral',
  financial: 'bg-capas-gold',
  career: 'bg-capas-palm'
};

const categoryIcons = {
  basic: InformationCircleIcon,
  academic: AcademicCapIcon,
  financial: CurrencyDollarIcon,
  career: UserGroupIcon
};

export default function ProgramComparePage() {
  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showProgramSelector, setShowProgramSelector] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState<string[]>(
    comparisonFeatures.map(f => f.key)
  );
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setAvailablePrograms(programsData.programs as Program[]);
  }, []);

  const filteredPrograms = availablePrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || program.category === filterCategory;
    const notSelected = !selectedPrograms.some(selected => selected.id === program.id);
    
    return matchesSearch && matchesCategory && notSelected;
  });

  const addProgram = (program: Program) => {
    if (selectedPrograms.length < 3 && !selectedPrograms.some(p => p.id === program.id)) {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const removeProgram = (programId: string) => {
    setSelectedPrograms(selectedPrograms.filter(p => p.id !== programId));
  };

  const toggleFeatureVisibility = (featureKey: string) => {
    setVisibleFeatures(prev => 
      prev.includes(featureKey) 
        ? prev.filter(k => k !== featureKey)
        : [...prev, featureKey]
    );
  };

  const renderFeatureValue = (program: Program, feature: ComparisonFeature) => {
    const value = program[feature.key as keyof Program];
    
    switch (feature.type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-center">
            {value ? (
              <CheckIcon className="w-6 h-6 text-green-600" />
            ) : (
              <XMarkIcon className="w-6 h-6 text-red-600" />
            )}
          </div>
        );
      case 'list':
        const items = value as string[];
        return (
          <ul className="space-y-2">
            {items.slice(0, 3).map((item, index) => (
              <li key={index} className="flex items-start text-sm">
                <div className="w-1.5 h-1.5 bg-capas-turquoise rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span>{item}</span>
              </li>
            ))}
            {items.length > 3 && (
              <li className="text-sm text-capas-ocean-dark/60">
                +{items.length - 3} more
              </li>
            )}
          </ul>
        );
      case 'currency':
        return (
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-turquoise">{value}</div>
          </div>
        );
      default:
        return <div className="text-center">{value}</div>;
    }
  };

  const categories = [
    { key: 'all', label: 'All Programs', count: availablePrograms.length },
    { key: 'full-time', label: 'Full-Time', count: availablePrograms.filter(p => p.category === 'full-time').length },
    { key: 'part-time', label: 'Part-Time', count: availablePrograms.filter(p => p.category === 'part-time').length }
  ];

  const featureCategories = [
    { key: 'basic', label: 'Basic Info', icon: InformationCircleIcon },
    { key: 'academic', label: 'Academic', icon: AcademicCapIcon },
    { key: 'financial', label: 'Financial', icon: CurrencyDollarIcon },
    { key: 'career', label: 'Career', icon: UserGroupIcon }
  ];

  return (
    <>
      {/* NextSeo temporarily removed */}
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,100 C300,0 600,200 900,100 C1200,0 1440,100 1440,100 L1440,400 L0,400 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
                Compare Programs
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat mb-8">
                Find the perfect program for your artistic journey by comparing curriculum, costs, and career outcomes
              </p>
              
              <button
                onClick={() => setShowProgramSelector(true)}
                className="bg-capas-gold hover:bg-capas-gold-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <PlusIcon className="w-6 h-6 mr-2" />
                Add Programs to Compare
              </button>
            </motion.div>
          </div>
        </section>

        {/* Comparison Interface */}
        <section className="py-12 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Selected Programs Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise">
                  Selected Programs ({selectedPrograms.length}/3)
                </h2>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowProgramSelector(true)}
                    className="bg-capas-turquoise text-white px-4 py-2 rounded-lg font-semibold hover:bg-capas-turquoise-dark transition-colors inline-flex items-center"
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Program
                  </button>
                  
                  {selectedPrograms.length > 0 && (
                    <button
                      onClick={() => setSelectedPrograms([])}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>

              {selectedPrograms.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-capas-ocean-light/30">
                  <AcademicCapIcon className="w-16 h-16 text-capas-ocean-light/50 mx-auto mb-4" />
                  <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise mb-2">
                    No Programs Selected
                  </h3>
                  <p className="text-capas-ocean-dark/70 mb-4">
                    Add up to 3 programs to compare their features side by side
                  </p>
                  <button
                    onClick={() => setShowProgramSelector(true)}
                    className="bg-capas-turquoise text-white px-6 py-2 rounded-lg font-semibold hover:bg-capas-turquoise-dark transition-colors"
                  >
                    Browse Programs
                  </button>
                </div>
              )}
            </div>

            {/* Feature Filter */}
            {selectedPrograms.length > 0 && (
              <div className="mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-capas-ocean-light/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-capas-turquoise flex items-center">
                      <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                      Customize Comparison View
                    </h3>
                    <span className="text-sm text-capas-ocean-dark/70">
                      {visibleFeatures.length} of {comparisonFeatures.length} features shown
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {featureCategories.map((category) => {
                      const categoryFeatures = comparisonFeatures.filter(f => f.category === category.key);
                      const visibleCount = categoryFeatures.filter(f => visibleFeatures.includes(f.key)).length;
                      
                      return (
                        <div key={category.key} className="space-y-2">
                          <h4 className="font-medium text-capas-ocean-dark flex items-center">
                            <category.icon className="w-4 h-4 mr-2" />
                            {category.label} ({visibleCount}/{categoryFeatures.length})
                          </h4>
                          {categoryFeatures.map((feature) => (
                            <label key={feature.key} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={visibleFeatures.includes(feature.key)}
                                onChange={() => toggleFeatureVisibility(feature.key)}
                                className="mr-2 text-capas-turquoise focus:ring-capas-turquoise rounded"
                              />
                              <span>{feature.label}</span>
                            </label>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Comparison Table */}
            {selectedPrograms.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-capas-ocean-light/20">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* Program Headers */}
                    <thead>
                      <tr className="bg-capas-sand-light">
                        <th className="text-left p-4 font-semibold text-capas-turquoise min-w-[200px]">
                          Program Features
                        </th>
                        {selectedPrograms.map((program) => (
                          <th key={program.id} className="p-4 text-center min-w-[280px]">
                            <div className="relative">
                              <button
                                onClick={() => removeProgram(program.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                              
                              <PlaceholderImage
                                width={120}
                                height={80}
                                text={program.title}
                                variant="landscape"
                                colorScheme="turquoise"
                                className="w-full h-20 rounded-lg mb-3"
                              />
                              
                              <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                                {program.title}
                              </h3>
                              
                              <div className="space-y-1">
                                <span className="bg-capas-turquoise/10 text-capas-turquoise px-2 py-1 rounded-full text-xs font-medium">
                                  {program.type}
                                </span>
                                <div className="text-sm text-capas-ocean-dark/70">
                                  {program.category}
                                </div>
                              </div>
                              
                              <Link
                                href={`/programs/${program.slug}`}
                                className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark text-sm font-medium mt-2 transition-colors"
                              >
                                View Details
                                <ArrowRightIcon className="w-3 h-3 ml-1" />
                              </Link>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Feature Rows */}
                    <tbody>
                      {comparisonFeatures
                        .filter(feature => visibleFeatures.includes(feature.key))
                        .map((feature, index) => (
                        <tr key={feature.key} className={index % 2 === 0 ? 'bg-white' : 'bg-capas-sand-light/30'}>
                          <td className="p-4 font-medium text-capas-ocean-dark border-r border-capas-ocean-light/20">
                            <div className="flex items-center">
                              <div className={`w-3 h-3 rounded-full mr-3 ${categoryColors[feature.category]}`}></div>
                              {feature.label}
                            </div>
                          </td>
                          {selectedPrograms.map((program) => (
                            <td key={program.id} className="p-4 text-capas-ocean-dark border-r border-capas-ocean-light/20 last:border-r-0">
                              {renderFeatureValue(program, feature)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="bg-capas-sand-light p-6 border-t border-capas-ocean-light/20">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/how-to-apply"
                      className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
                    >
                      Apply Now
                    </Link>
                    <Link
                      href="/contact"
                      className="bg-white text-capas-turquoise border-2 border-capas-turquoise hover:bg-capas-turquoise hover:text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 text-center"
                    >
                      Get More Information
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>

      {/* Program Selector Modal */}
      <AnimatePresence>
        {showProgramSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowProgramSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-capas-ocean-light/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise">
                    Select Programs to Compare
                  </h2>
                  <button
                    onClick={() => setShowProgramSelector(false)}
                    className="bg-capas-sand-light text-capas-ocean-dark w-8 h-8 rounded-full flex items-center justify-center hover:bg-capas-sand transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search programs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 border border-capas-ocean-light/30 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.key}
                        onClick={() => setFilterCategory(category.key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          filterCategory === category.key
                            ? 'bg-capas-turquoise text-white'
                            : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-sand'
                        }`}
                      >
                        {category.label} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-capas-ocean-dark/70 mb-4">
                  {selectedPrograms.length}/3 programs selected • {filteredPrograms.length} programs available
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredPrograms.map((program) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-capas-sand-light rounded-lg p-4 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-1">
                            {program.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="bg-capas-turquoise/10 text-capas-turquoise px-2 py-1 rounded-full text-xs font-medium">
                              {program.type}
                            </span>
                            <span className="text-sm text-capas-ocean-dark/70">{program.category}</span>
                          </div>
                        </div>
                        
                        <PlaceholderImage
                          width={80}
                          height={60}
                          text={program.title}
                          variant="landscape"
                          colorScheme="coral"
                          className="w-20 h-15 rounded-lg ml-4"
                        />
                      </div>

                      <p className="text-capas-ocean-dark text-sm mb-4 line-clamp-2">
                        {program.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {program.duration}
                          </div>
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                            {program.tuition}
                          </div>
                        </div>

                        <button
                          onClick={() => addProgram(program)}
                          disabled={selectedPrograms.length >= 3}
                          className="bg-capas-turquoise text-white px-4 py-2 rounded-lg font-medium hover:bg-capas-turquoise-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center"
                        >
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Add
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  {filteredPrograms.length === 0 && (
                    <div className="col-span-2 text-center py-8">
                      <BookOpenIcon className="w-12 h-12 text-capas-ocean-light/50 mx-auto mb-3" />
                      <p className="text-capas-ocean-dark/70">
                        No programs found matching your search criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-capas-sand-light border-t border-capas-ocean-light/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-capas-ocean-dark/70">
                    Selected: {selectedPrograms.map(p => p.title).join(', ') || 'None'}
                  </div>
                  <button
                    onClick={() => setShowProgramSelector(false)}
                    className="bg-capas-turquoise text-white px-6 py-2 rounded-lg font-semibold hover:bg-capas-turquoise-dark transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}