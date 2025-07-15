'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  ClockIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';

interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  program: string;
  semester: string;
  previousEducation: string;
  portfolio: FileList | null;
  personalStatement: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export default function HowToApply() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<ApplicationFormData>();

  const totalSteps = 4;

  const onSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as (keyof ApplicationFormData)[]);
    
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'];
      case 2:
        return ['program', 'semester', 'previousEducation'];
      case 3:
        return ['personalStatement'];
      case 4:
        return ['emergencyContact', 'emergencyPhone'];
      default:
        return [];
    }
  };

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Basic details about you' },
    { number: 2, title: 'Program Selection', description: 'Choose your program and semester' },
    { number: 3, title: 'Portfolio & Statement', description: 'Upload your work and tell us about yourself' },
    { number: 4, title: 'Emergency Contact', description: 'Contact information for emergencies' }
  ];

  const requirements = [
    {
      title: 'Academic Requirements',
      items: [
        'High school diploma or equivalent',
        'Official transcripts from all previous institutions',
        'Minimum GPA of 2.5 (on a 4.0 scale)',
        'English proficiency (if applicable)'
      ],
      icon: AcademicCapIcon,
      color: 'bg-capas-turquoise'
    },
    {
      title: 'Portfolio Requirements',
      items: [
        '3-5 pieces showcasing your best work',
        'Digital format (PDF, JPG, MP4, MP3)',
        'Artist statement (500 words max)',
        'Letters of recommendation (2-3)'
      ],
      icon: DocumentTextIcon,
      color: 'bg-capas-coral'
    },
    {
      title: 'Application Timeline',
      items: [
        'Fall Semester: Apply by June 1st',
        'Spring Semester: Apply by November 1st',
        'Rolling admissions for some programs',
        'Early application encouraged'
      ],
      icon: ClockIcon,
      color: 'bg-capas-gold'
    }
  ];

  if (isSubmitted) {
    return (
      <>
        {/* NextSeo temporarily removed */}
        <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md mx-auto p-8"
          >
            <div className="w-24 h-24 bg-capas-palm rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-12 h-12 text-white" />
            </div>
            <h1 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
              Application Submitted!
            </h1>
            <p className="text-capas-ocean-dark mb-6">
              Thank you for applying to CAPAS Bahamas. We&apos;ll review your application and get back to you within 2-3 weeks.
            </p>
            <Link
              href="/"
              className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 font-montserrat"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

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
                Apply to CAPAS
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Start your journey in creative arts, performance, and academic excellence
              </p>
            </motion.div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Application Requirements
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                Everything you need to know before applying
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {requirements.map((requirement, index) => (
                <motion.div
                  key={requirement.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`${requirement.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                    <requirement.icon className="w-8 h-8 text-white" aria-hidden="true" />
                  </div>
                  
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                    {requirement.title}
                  </h3>
                  
                  <ul className="space-y-3">
                    {requirement.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-capas-palm mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
                        <span className="text-capas-ocean-dark">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Online Application
              </h2>
              <p className="text-xl text-capas-ocean-dark">
                Complete your application in {totalSteps} easy steps
              </p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.number <= currentStep 
                        ? 'bg-capas-turquoise text-white' 
                        : 'bg-capas-sand-light text-capas-ocean-dark'
                    }`}>
                      {step.number < currentStep ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-1 mx-4 ${
                        step.number < currentStep ? 'bg-capas-turquoise' : 'bg-capas-sand-light'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h3 className="font-montserrat text-xl font-semibold text-capas-turquoise">
                  {steps[currentStep - 1].title}
                </h3>
                <p className="text-capas-ocean-dark">
                  {steps[currentStep - 1].description}
                </p>
              </div>
            </div>

            {/* Form */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-capas-sand-light rounded-xl p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          First Name *
                        </label>
                        <input
                          {...register('firstName', { required: 'First name is required' })}
                          type="text"
                          id="firstName"
                          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Last Name *
                        </label>
                        <input
                          {...register('lastName', { required: 'Last name is required' })}
                          type="text"
                          id="lastName"
                          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Email Address *
                      </label>
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Phone Number *
                        </label>
                        <input
                          {...register('phone', { required: 'Phone number is required' })}
                          type="tel"
                          id="phone"
                          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                          placeholder="(242) 123-4567"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Date of Birth *
                        </label>
                        <input
                          {...register('dateOfBirth', { required: 'Date of birth is required' })}
                          type="date"
                          id="dateOfBirth"
                          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        />
                        {errors.dateOfBirth && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                            {errors.dateOfBirth.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Program Selection */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="program" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Preferred Program *
                      </label>
                      <select
                        {...register('program', { required: 'Please select a program' })}
                        id="program"
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                      >
                        <option value="">Select a program...</option>
                        <option value="full-time-singing">Full-Time Vocal Performance</option>
                        <option value="full-time-instrumental">Full-Time Instrumental Performance</option>
                        <option value="full-time-dance">Full-Time Dance Performance</option>
                        <option value="full-time-theatre">Full-Time Theatre Arts</option>
                        <option value="part-time-music">Part-Time Music Fundamentals</option>
                        <option value="part-time-dance">Part-Time Dance Basics</option>
                        <option value="part-time-theatre">Part-Time Theatre Workshop</option>
                      </select>
                      {errors.program && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.program.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="semester" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Preferred Start Semester *
                      </label>
                      <select
                        {...register('semester', { required: 'Please select a semester' })}
                        id="semester"
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                      >
                        <option value="">Select a semester...</option>
                        <option value="fall-2024">Fall 2024</option>
                        <option value="spring-2025">Spring 2025</option>
                        <option value="fall-2025">Fall 2025</option>
                      </select>
                      {errors.semester && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.semester.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="previousEducation" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Previous Education/Experience *
                      </label>
                      <textarea
                        {...register('previousEducation', { required: 'Please describe your background' })}
                        id="previousEducation"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        placeholder="Describe your educational background and relevant experience..."
                      />
                      {errors.previousEducation && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.previousEducation.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Portfolio & Statement */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Portfolio Upload
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-capas-ocean-light/30 border-dashed rounded-lg hover:border-capas-turquoise transition-colors">
                        <div className="space-y-1 text-center">
                          <DocumentTextIcon className="mx-auto h-12 w-12 text-capas-ocean-dark/50" />
                          <div className="flex text-sm text-capas-ocean-dark">
                            <label htmlFor="portfolio" className="relative cursor-pointer bg-white rounded-md font-medium text-capas-turquoise hover:text-capas-turquoise-dark">
                              <span>Upload files</span>
                              <input
                                {...register('portfolio')}
                                id="portfolio"
                                type="file"
                                multiple
                                accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3"
                                className="sr-only"
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-capas-ocean-dark/60">
                            PDF, JPG, PNG, MP4, MP3 up to 10MB each
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="personalStatement" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Personal Statement *
                      </label>
                      <textarea
                        {...register('personalStatement', { 
                          required: 'Personal statement is required',
                          minLength: {
                            value: 100,
                            message: 'Personal statement must be at least 100 characters'
                          }
                        })}
                        id="personalStatement"
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        placeholder="Tell us about yourself, your artistic goals, and why you want to join CAPAS..."
                      />
                      {errors.personalStatement && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.personalStatement.message}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-capas-ocean-dark/60">
                        {watch('personalStatement')?.length || 0} characters (minimum 100)
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Emergency Contact */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="bg-capas-turquoise/10 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <InformationCircleIcon className="w-5 h-5 text-capas-turquoise mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-capas-turquoise">Emergency Contact Information</h3>
                          <p className="text-sm text-capas-ocean-dark mt-1">
                            This information will only be used in case of emergencies and will be kept confidential.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        {...register('emergencyContact', { required: 'Emergency contact name is required' })}
                        type="text"
                        id="emergencyContact"
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        placeholder="Full name of emergency contact"
                      />
                      {errors.emergencyContact && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.emergencyContact.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="emergencyPhone" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        {...register('emergencyPhone', { required: 'Emergency contact phone is required' })}
                        type="tel"
                        id="emergencyPhone"
                        className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                        placeholder="(242) 123-4567"
                      />
                      {errors.emergencyPhone && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                          {errors.emergencyPhone.message}
                        </p>
                      )}
                    </div>

                    <div className="bg-capas-sand rounded-lg p-6">
                      <h3 className="font-montserrat text-lg font-semibold text-capas-turquoise mb-4">
                        Application Review
                      </h3>
                      <div className="space-y-2 text-sm text-capas-ocean-dark">
                        <p><strong>Name:</strong> {watch('firstName')} {watch('lastName')}</p>
                        <p><strong>Email:</strong> {watch('email')}</p>
                        <p><strong>Program:</strong> {watch('program')}</p>
                        <p><strong>Start Semester:</strong> {watch('semester')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 font-montserrat ${
                      currentStep === 1
                        ? 'bg-capas-sand text-capas-ocean-dark/50 cursor-not-allowed'
                        : 'bg-capas-sand text-capas-ocean-dark hover:bg-capas-sand-light'
                    }`}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </button>

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 font-montserrat inline-flex items-center"
                    >
                      Next Step
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-capas-gold hover:bg-capas-gold-dark text-white font-bold px-8 py-3 rounded-lg transition-all duration-200 font-montserrat inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Support Information */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Need Help?
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                Our admissions team is here to support you through the application process
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Admissions Office',
                  description: 'General questions about programs and requirements',
                  contact: 'admissions@capas.edu.bs',
                  phone: '(242) 123-4567',
                  icon: AcademicCapIcon
                },
                {
                  title: 'Technical Support',
                  description: 'Help with the online application portal',
                  contact: 'support@capas.edu.bs',
                  phone: '(242) 123-4568',
                  icon: EnvelopeIcon
                },
                {
                  title: 'Financial Aid',
                  description: 'Questions about scholarships and payment options',
                  contact: 'finaid@capas.edu.bs',
                  phone: '(242) 123-4569',
                  icon: CurrencyDollarIcon
                }
              ].map((support, index) => (
                <motion.div
                  key={support.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg text-center"
                >
                  <div className="bg-capas-turquoise w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <support.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2">
                    {support.title}
                  </h3>
                  <p className="text-capas-ocean-dark mb-4">
                    {support.description}
                  </p>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${support.contact}`}
                      className="block text-capas-turquoise hover:text-capas-turquoise-dark transition-colors"
                    >
                      {support.contact}
                    </a>
                    <a
                      href={`tel:${support.phone}`}
                      className="block text-capas-ocean-dark hover:text-capas-turquoise transition-colors"
                    >
                      {support.phone}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}