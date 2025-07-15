'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  BuildingOfficeIcon,
  CameraIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import contactData from '../../../mocks/contact-info.json';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
  preferredContact: string;
  virtualTour: boolean;
  tourDate: string;
  tourTime: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    virtualTour: false,
    tourDate: '',
    tourTime: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time for Bahamas timezone
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const inquiryTypes = [
    { value: 'admissions', label: 'Admissions & Applications' },
    { value: 'programs', label: 'Program Information' },
    { value: 'financial-aid', label: 'Financial Aid & Scholarships' },
    { value: 'student-services', label: 'Student Services' },
    { value: 'tour', label: 'Campus Tour Request' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'media', label: 'Media & Press' },
    { value: 'partnerships', label: 'Partnerships & Collaborations' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    if (formData.virtualTour) {
      if (!formData.tourDate) newErrors.tourDate = 'Please select a tour date';
      if (!formData.tourTime) newErrors.tourTime = 'Please select a tour time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful submission
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          inquiryType: '',
          subject: '',
          message: '',
          preferredContact: 'email',
          virtualTour: false,
          tourDate: '',
          tourTime: ''
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      timeZone: 'America/Nassau',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDayName = (dayKey: string) => {
    const days = {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday'
    };
    return days[dayKey as keyof typeof days] || dayKey;
  };

  const isOfficeOpen = (hours: Record<string, string>) => {
    const now = new Date();
    const dayKey = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const todayHours = hours[dayKey as keyof typeof hours];
    
    if (!todayHours || todayHours === 'Closed') return false;
    
    return true; // Simplified for demo
  };

  return (
    <>
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
                Contact CAPAS
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat">
                Connect with our team, schedule a campus tour, or get answers to your questions
              </p>
            </motion.div>
          </div>
        </section>

        {/* Current Time & Status */}
        <section className="py-8 bg-capas-sand-light border-b border-capas-ocean-light/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <ClockIcon className="w-6 h-6 text-capas-turquoise" />
                <div>
                  <p className="font-montserrat font-semibold text-capas-ocean-dark">
                    Current Time in Nassau: {formatTime(currentTime)}
                  </p>
                  <p className="text-sm text-capas-ocean-dark/70">
                    {currentTime.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isOfficeOpen(contactData.officeHours.mainOffice) ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium text-capas-ocean-dark">
                  Main Office {isOfficeOpen(contactData.officeHours.mainOffice) ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Contact Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg p-8 border border-capas-ocean-light/20"
                >
                  <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-6">
                    Send us a Message
                  </h2>

                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      <div>
                        <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                        <p className="text-green-700">We&apos;ll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                      <div>
                        <h3 className="font-semibold text-red-800">Error Sending Message</h3>
                        <p className="text-red-700">Please try again or contact us directly.</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                          placeholder="Enter your first name"
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                          placeholder="Enter your last name"
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                          placeholder="+1 (242) 555-0123"
                        />
                      </div>
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Type of Inquiry *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.inquiryType ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                      >
                        <option value="">Select an inquiry type</option>
                        {inquiryTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.inquiryType && <p className="mt-1 text-sm text-red-600">{errors.inquiryType}</p>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                        placeholder="Brief subject of your message"
                      />
                      {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                        placeholder="Please provide details about your inquiry..."
                      />
                      {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                    </div>

                    {/* Virtual Tour Request */}
                    <div className="bg-capas-sand-light rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <input
                          type="checkbox"
                          id="virtualTour"
                          name="virtualTour"
                          checked={formData.virtualTour}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-capas-turquoise focus:ring-capas-turquoise border-capas-ocean-light/30 rounded"
                        />
                        <label htmlFor="virtualTour" className="flex items-center space-x-2 text-capas-ocean-dark font-medium">
                          <CameraIcon className="w-5 h-5 text-capas-turquoise" />
                          <span>Request Virtual Campus Tour</span>
                        </label>
                      </div>

                      {formData.virtualTour && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <label htmlFor="tourDate" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                              Preferred Date *
                            </label>
                            <input
                              type="date"
                              id="tourDate"
                              name="tourDate"
                              value={formData.tourDate}
                              onChange={handleInputChange}
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.tourDate ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                            />
                            {errors.tourDate && <p className="mt-1 text-sm text-red-600">{errors.tourDate}</p>}
                          </div>

                          <div>
                            <label htmlFor="tourTime" className="block text-sm font-medium text-capas-ocean-dark mb-2">
                              Preferred Time *
                            </label>
                            <select
                              id="tourTime"
                              name="tourTime"
                              value={formData.tourTime}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 rounded-lg border ${errors.tourTime ? 'border-red-500' : 'border-capas-ocean-light/30'} focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                            >
                              <option value="">Select a time</option>
                              {contactData.virtualTourBooking.availableSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                            </select>
                            {errors.tourTime && <p className="mt-1 text-sm text-red-600">{errors.tourTime}</p>}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preferred Contact Method */}
                    <div>
                      <label className="block text-sm font-medium text-capas-ocean-dark mb-3">
                        Preferred Contact Method
                      </label>
                      <div className="flex space-x-6">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === 'email'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-capas-turquoise focus:ring-capas-turquoise border-capas-ocean-light/30"
                          />
                          <span className="ml-2 text-capas-ocean-dark">Email</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === 'phone'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-capas-turquoise focus:ring-capas-turquoise border-capas-ocean-light/30"
                          />
                          <span className="ml-2 text-capas-ocean-dark">Phone</span>
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-capas-turquoise hover:bg-capas-turquoise-dark disabled:bg-capas-ocean-light/50 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl font-montserrat"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending Message...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </form>
                </motion.div>
              </div>

              {/* Contact Information Sidebar */}
              <div className="space-y-8">
                {/* Main Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-capas-turquoise text-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="font-montserrat text-xl font-bold mb-4 flex items-center">
                    <BuildingOfficeIcon className="w-6 h-6 mr-2" />
                    Main Office
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="w-5 h-5 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{contactData.contactInfo.mainOffice.address.street}</p>
                        <p>{contactData.contactInfo.mainOffice.address.city}, {contactData.contactInfo.mainOffice.address.country}</p>
                        <p>{contactData.contactInfo.mainOffice.address.postalCode}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                      <a href={`tel:${contactData.contactInfo.mainOffice.phone}`} className="hover:underline">
                        {contactData.contactInfo.mainOffice.phone}
                      </a>
                    </div>

                    <div className="flex items-center space-x-3">
                      <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                      <a href={`mailto:${contactData.contactInfo.mainOffice.email}`} className="hover:underline">
                        {contactData.contactInfo.mainOffice.email}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Office Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-capas-ocean-light/20"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4 flex items-center">
                    <ClockIcon className="w-6 h-6 mr-2" />
                    Office Hours
                  </h3>
                  
                  <div className="space-y-3">
                    {Object.entries(contactData.officeHours.mainOffice).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center">
                        <span className="font-medium text-capas-ocean-dark capitalize">
                          {getDayName(day)}
                        </span>
                        <span className="text-capas-ocean-dark/70">
                          {typeof hours === 'string' ? hours : `${hours.open} - ${hours.close}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-capas-ocean-light/20"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                    Quick Contact
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-capas-ocean-dark">Admissions</h4>
                      <p className="text-sm text-capas-ocean-dark/70">{contactData.contactInfo.admissions.phone}</p>
                      <a href={`mailto:${contactData.contactInfo.admissions.email}`} className="text-sm text-capas-turquoise hover:underline">
                        {contactData.contactInfo.admissions.email}
                      </a>
                    </div>

                    <div>
                      <h4 className="font-semibold text-capas-ocean-dark">Student Services</h4>
                      <p className="text-sm text-capas-ocean-dark/70">{contactData.contactInfo.studentServices.phone}</p>
                      <a href={`mailto:${contactData.contactInfo.studentServices.email}`} className="text-sm text-capas-turquoise hover:underline">
                        {contactData.contactInfo.studentServices.email}
                      </a>
                    </div>

                    <div>
                      <h4 className="font-semibold text-capas-ocean-dark">Financial Aid</h4>
                      <p className="text-sm text-capas-ocean-dark/70">{contactData.contactInfo.financialAid.phone}</p>
                      <a href={`mailto:${contactData.contactInfo.financialAid.email}`} className="text-sm text-capas-turquoise hover:underline">
                        {contactData.contactInfo.financialAid.email}
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-capas-ocean-light/20"
                >
                  <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4 flex items-center">
                    <GlobeAltIcon className="w-6 h-6 mr-2" />
                    Connect With Us
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(contactData.socialMedia).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-3 bg-capas-sand-light hover:bg-capas-turquoise hover:text-white rounded-lg transition-all duration-200 text-sm font-medium capitalize"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                </motion.div>

                {/* Emergency Contact */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-red-50 border border-red-200 rounded-xl p-6"
                >
                  <h3 className="font-montserrat text-lg font-bold text-red-800 mb-3">
                    Emergency Contact
                  </h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-700">Campus Security:</span>
                      <a href={`tel:${contactData.emergencyContact.security}`} className="text-red-800 font-semibold hover:underline">
                        {contactData.emergencyContact.security}
                      </a>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-700">After Hours:</span>
                      <a href={`tel:${contactData.emergencyContact.afterHours}`} className="text-red-800 font-semibold hover:underline">
                        {contactData.emergencyContact.afterHours}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
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
                Find Us
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                Located in the heart of Nassau, easily accessible by public transport and car
              </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Mock Map - Replace with actual map integration */}
              <div className="h-96 bg-gradient-to-br from-capas-turquoise/20 to-capas-ocean/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPinIcon className="w-16 h-16 text-capas-turquoise mx-auto mb-4" />
                  <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-capas-ocean-dark mb-4 max-w-md">
                    Interactive campus map with directions, parking information, and building locations coming soon.
                  </p>
                  <button className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}