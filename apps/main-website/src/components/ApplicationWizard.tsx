'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CloudArrowUpIcon,
  XMarkIcon,
  SparklesIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ApplicationData {
  // Personal Information
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    address: {
      street: string;
      city: string;
      country: string;
      postalCode: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  
  // Academic Information
  academicInfo: {
    currentEducationLevel: string;
    institution: string;
    graduationYear: string;
    gpa: string;
    previousArtsTraining: string;
    musicTheoryBackground: string;
    performanceExperience: string;
  };
  
  // Program Selection
  programSelection: {
    primaryProgram: string;
    secondaryProgram: string;
    studyType: 'full-time' | 'part-time';
    startSemester: string;
    specializations: string[];
    careerGoals: string;
  };
  
  // Documents & Portfolio
  documents: {
    transcript: File | null;
    personalStatement: string;
    portfolioItems: File[];
    letters: File[];
    auditionSelection: string;
    additionalDocuments: File[];
  };
  
  // Financial Information
  financialInfo: {
    scholarshipInterest: boolean;
    financialAidNeeded: boolean;
    sponsorInfo: string;
    paymentMethod: string;
    applicationFeeWaiver: boolean;
  };
}

interface ValidationErrors {
  [key: string]: string | ValidationErrors;
}

interface ApplicationWizardProps {
  onComplete: (data: ApplicationData) => void;
  onClose: () => void;
}

const STEPS = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: UserIcon,
    description: 'Tell us about yourself'
  },
  {
    id: 'academic',
    title: 'Academic Background',
    icon: AcademicCapIcon,
    description: 'Your educational history'
  },
  {
    id: 'program',
    title: 'Program Selection',
    icon: DocumentTextIcon,
    description: 'Choose your path at CAPAS'
  },
  {
    id: 'documents',
    title: 'Documents & Portfolio',
    icon: CloudArrowUpIcon,
    description: 'Upload required materials'
  },
  {
    id: 'financial',
    title: 'Financial Information',
    icon: CreditCardIcon,
    description: 'Payment and aid details'
  },
  {
    id: 'review',
    title: 'Review & Submit',
    icon: CheckCircleIcon,
    description: 'Final review of your application'
  }
];

export default function ApplicationWizard({ onComplete, onClose }: ApplicationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      address: {
        street: '',
        city: '',
        country: '',
        postalCode: ''
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      }
    },
    academicInfo: {
      currentEducationLevel: '',
      institution: '',
      graduationYear: '',
      gpa: '',
      previousArtsTraining: '',
      musicTheoryBackground: '',
      performanceExperience: ''
    },
    programSelection: {
      primaryProgram: '',
      secondaryProgram: '',
      studyType: 'full-time',
      startSemester: '',
      specializations: [],
      careerGoals: ''
    },
    documents: {
      transcript: null,
      personalStatement: '',
      portfolioItems: [],
      letters: [],
      auditionSelection: '',
      additionalDocuments: []
    },
    financialInfo: {
      scholarshipInterest: false,
      financialAidNeeded: false,
      sponsorInfo: '',
      paymentMethod: '',
      applicationFeeWaiver: false
    }
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProgress, setSavedProgress] = useState(true);

  // Auto-save progress
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('capas-application-draft', JSON.stringify(applicationData));
      setSavedProgress(true);
    }, 2000);

    setSavedProgress(false);
    return () => clearTimeout(timer);
  }, [applicationData]);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('capas-application-draft');
    if (saved) {
      try {
        setApplicationData(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading saved application:', error);
      }
    }
  }, []);

  const updateData = (section: keyof ApplicationData, data: any) => {
    setApplicationData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const validateStep = (stepIndex: number): boolean => {
    const stepId = STEPS[stepIndex].id;
    const stepErrors: ValidationErrors = {};

    switch (stepId) {
      case 'personal':
        const { personalInfo } = applicationData;
        if (!personalInfo.firstName.trim()) stepErrors.firstName = 'First name is required';
        if (!personalInfo.lastName.trim()) stepErrors.lastName = 'Last name is required';
        if (!personalInfo.email.trim()) stepErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
          stepErrors.email = 'Invalid email format';
        }
        if (!personalInfo.phone.trim()) stepErrors.phone = 'Phone number is required';
        if (!personalInfo.dateOfBirth) stepErrors.dateOfBirth = 'Date of birth is required';
        if (!personalInfo.nationality.trim()) stepErrors.nationality = 'Nationality is required';
        if (!personalInfo.address.street.trim()) stepErrors.street = 'Street address is required';
        if (!personalInfo.address.city.trim()) stepErrors.city = 'City is required';
        if (!personalInfo.address.country.trim()) stepErrors.country = 'Country is required';
        break;

      case 'academic':
        const { academicInfo } = applicationData;
        if (!academicInfo.currentEducationLevel) stepErrors.currentEducationLevel = 'Education level is required';
        if (!academicInfo.institution.trim()) stepErrors.institution = 'Institution name is required';
        if (!academicInfo.graduationYear) stepErrors.graduationYear = 'Graduation year is required';
        if (!academicInfo.previousArtsTraining.trim()) stepErrors.previousArtsTraining = 'Please describe your arts training';
        break;

      case 'program':
        const { programSelection } = applicationData;
        if (!programSelection.primaryProgram) stepErrors.primaryProgram = 'Primary program is required';
        if (!programSelection.startSemester) stepErrors.startSemester = 'Start semester is required';
        if (!programSelection.careerGoals.trim()) stepErrors.careerGoals = 'Career goals are required';
        break;

      case 'documents':
        const { documents } = applicationData;
        if (!documents.transcript) stepErrors.transcript = 'Official transcript is required';
        if (!documents.personalStatement.trim()) stepErrors.personalStatement = 'Personal statement is required';
        else if (documents.personalStatement.length < 250) {
          stepErrors.personalStatement = 'Personal statement must be at least 250 characters';
        }
        if (!documents.auditionSelection) stepErrors.auditionSelection = 'Audition selection is required';
        break;

      case 'financial':
        const { financialInfo } = applicationData;
        if (!financialInfo.paymentMethod) stepErrors.paymentMethod = 'Payment method is required';
        break;
    }

    setErrors(prev => ({ ...prev, [stepId]: stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const submitApplication = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved draft
      localStorage.removeItem('capas-application-draft');
      
      onComplete(applicationData);
    } catch (error) {
      console.error('Application submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const stepId = STEPS[currentStep].id;
    const stepErrors = errors[stepId] as ValidationErrors || {};

    switch (stepId) {
      case 'personal':
        return (
          <PersonalInfoStep
            data={applicationData.personalInfo}
            errors={stepErrors}
            onChange={(data) => updateData('personalInfo', data)}
          />
        );
      case 'academic':
        return (
          <AcademicInfoStep
            data={applicationData.academicInfo}
            errors={stepErrors}
            onChange={(data) => updateData('academicInfo', data)}
          />
        );
      case 'program':
        return (
          <ProgramSelectionStep
            data={applicationData.programSelection}
            errors={stepErrors}
            onChange={(data) => updateData('programSelection', data)}
          />
        );
      case 'documents':
        return (
          <DocumentsStep
            data={applicationData.documents}
            errors={stepErrors}
            onChange={(data) => updateData('documents', data)}
          />
        );
      case 'financial':
        return (
          <FinancialInfoStep
            data={applicationData.financialInfo}
            errors={stepErrors}
            onChange={(data) => updateData('financialInfo', data)}
          />
        );
      case 'review':
        return (
          <ReviewStep
            data={applicationData}
            onSubmit={submitApplication}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="bg-capas-turquoise text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-montserrat text-2xl font-bold">CAPAS Application</h2>
              <p className="opacity-90">Step {currentStep + 1} of {STEPS.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              {!savedProgress && (
                <div className="flex items-center text-sm opacity-75">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full mr-2"></div>
                  Saving...
                </div>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-2">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    index < currentStep 
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                        ? 'bg-white text-capas-turquoise'
                        : 'bg-white/20 text-white/60'
                  }`}>
                    {index < currentStep ? (
                      <CheckIcon className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-8 h-1 mx-2 rounded-full transition-colors ${
                      index < currentStep ? 'bg-green-500' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm opacity-90">
              {STEPS[currentStep].title}: {STEPS[currentStep].description}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-capas-sand-light p-6 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-capas-ocean-light/30 rounded-lg font-semibold text-capas-ocean-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-capas-sand-light transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-capas-ocean-dark/70">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            
            {currentStep === STEPS.length - 1 ? (
              <button
                onClick={submitApplication}
                disabled={isSubmitting}
                className="flex items-center space-x-2 px-6 py-2 bg-capas-turquoise hover:bg-capas-turquoise-dark text-white rounded-lg font-semibold disabled:opacity-50 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <CheckCircleIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center space-x-2 px-4 py-2 bg-capas-turquoise hover:bg-capas-turquoise-dark text-white rounded-lg font-semibold transition-colors"
              >
                <span>Next</span>
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Step Components (we'll create these next)
const PersonalInfoStep = ({ data, errors, onChange }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Personal Information
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Please provide your basic personal information. All fields marked with * are required.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange({ firstName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.firstName ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange({ lastName: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.lastName ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.phone ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
            placeholder="+1 (242) 555-0123"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.dateOfBirth ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Nationality *
          </label>
          <select
            value={data.nationality}
            onChange={(e) => onChange({ nationality: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.nationality ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          >
            <option value="">Select nationality</option>
            <option value="bahamian">Bahamian</option>
            <option value="american">American</option>
            <option value="canadian">Canadian</option>
            <option value="british">British</option>
            <option value="other">Other</option>
          </select>
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
          )}
        </div>
      </div>

      {/* Address Section */}
      <div>
        <h4 className="font-semibold text-capas-ocean-dark mb-4">Address Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={data.address.street}
              onChange={(e) => onChange({ address: { ...data.address, street: e.target.value } })}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.street ? 'border-red-500' : 'border-capas-ocean-light/30'
              } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
              placeholder="123 Main Street"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-600">{errors.street}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                City *
              </label>
              <input
                type="text"
                value={data.address.city}
                onChange={(e) => onChange({ address: { ...data.address, city: e.target.value } })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.city ? 'border-red-500' : 'border-capas-ocean-light/30'
                } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
                placeholder="Nassau"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Country *
              </label>
              <select
                value={data.address.country}
                onChange={(e) => onChange({ address: { ...data.address, country: e.target.value } })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.country ? 'border-red-500' : 'border-capas-ocean-light/30'
                } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
              >
                <option value="">Select country</option>
                <option value="bahamas">Bahamas</option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="other">Other</option>
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={data.address.postalCode}
                onChange={(e) => onChange({ address: { ...data.address, postalCode: e.target.value } })}
                className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                placeholder="N-1234"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div>
        <h4 className="font-semibold text-capas-ocean-dark mb-4">Emergency Contact</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
              Contact Name
            </label>
            <input
              type="text"
              value={data.emergencyContact.name}
              onChange={(e) => onChange({ emergencyContact: { ...data.emergencyContact, name: e.target.value } })}
              className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
              placeholder="Full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
              Relationship
            </label>
            <select
              value={data.emergencyContact.relationship}
              onChange={(e) => onChange({ emergencyContact: { ...data.emergencyContact, relationship: e.target.value } })}
              className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
            >
              <option value="">Select relationship</option>
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
              <option value="sibling">Sibling</option>
              <option value="spouse">Spouse</option>
              <option value="friend">Friend</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={data.emergencyContact.phone}
              onChange={(e) => onChange({ emergencyContact: { ...data.emergencyContact, phone: e.target.value } })}
              className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
              placeholder="+1 (242) 555-0123"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional step components would be created similarly...
const AcademicInfoStep = ({ data, errors, onChange }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Academic Background
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Tell us about your educational background and any previous arts training.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Current Education Level *
          </label>
          <select
            value={data.currentEducationLevel}
            onChange={(e) => onChange({ currentEducationLevel: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.currentEducationLevel ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          >
            <option value="">Select education level</option>
            <option value="high-school-current">Currently in High School</option>
            <option value="high-school-graduate">High School Graduate</option>
            <option value="some-college">Some College</option>
            <option value="college-graduate">College Graduate</option>
            <option value="post-graduate">Post-Graduate</option>
          </select>
          {errors.currentEducationLevel && (
            <p className="mt-1 text-sm text-red-600">{errors.currentEducationLevel}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Institution Name *
          </label>
          <input
            type="text"
            value={data.institution}
            onChange={(e) => onChange({ institution: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.institution ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
            placeholder="Current/most recent school"
          />
          {errors.institution && (
            <p className="mt-1 text-sm text-red-600">{errors.institution}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Expected/Actual Graduation Year *
          </label>
          <select
            value={data.graduationYear}
            onChange={(e) => onChange({ graduationYear: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.graduationYear ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          >
            <option value="">Select year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.graduationYear && (
            <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            GPA (if applicable)
          </label>
          <input
            type="text"
            value={data.gpa}
            onChange={(e) => onChange({ gpa: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
            placeholder="e.g., 3.5 or 85%"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Previous Arts Training & Experience *
        </label>
        <textarea
          value={data.previousArtsTraining}
          onChange={(e) => onChange({ previousArtsTraining: e.target.value })}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.previousArtsTraining ? 'border-red-500' : 'border-capas-ocean-light/30'
          } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          placeholder="Describe any previous training in music, dance, theatre, or other performing arts..."
        />
        {errors.previousArtsTraining && (
          <p className="mt-1 text-sm text-red-600">{errors.previousArtsTraining}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Music Theory Background
        </label>
        <textarea
          value={data.musicTheoryBackground}
          onChange={(e) => onChange({ musicTheoryBackground: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
          placeholder="Describe your music theory knowledge, ability to read music, etc..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Performance Experience
        </label>
        <textarea
          value={data.performanceExperience}
          onChange={(e) => onChange({ performanceExperience: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
          placeholder="Describe any performances, recitals, competitions, or other stage experience..."
        />
      </div>
    </div>
  );
};

const ProgramSelectionStep = ({ data, errors, onChange }: any) => {
  const programs = [
    { value: 'full-time-vocal', label: 'Full-Time Vocal Performance', description: 'Comprehensive vocal training with performance opportunities' },
    { value: 'full-time-instrumental', label: 'Full-Time Instrumental Performance', description: 'Advanced training on your chosen instrument' },
    { value: 'full-time-dance', label: 'Full-Time Dance Performance', description: 'Professional dance training in multiple styles' },
    { value: 'full-time-theatre', label: 'Full-Time Theatre Arts', description: 'Acting, directing, and theatrical production' },
    { value: 'full-time-musical-theatre', label: 'Full-Time Musical Theatre', description: 'Combined training in singing, acting, and dancing' },
    { value: 'part-time-music', label: 'Part-Time Music Fundamentals', description: 'Evening and weekend music classes' },
    { value: 'part-time-dance', label: 'Part-Time Dance Classes', description: 'Recreational and semi-professional dance training' },
    { value: 'part-time-theatre', label: 'Part-Time Theatre Workshop', description: 'Acting and performance workshops' }
  ];

  const specializations = [
    'Classical Voice', 'Contemporary Voice', 'Jazz Voice', 'Gospel',
    'Piano', 'Guitar', 'Drums', 'Bass', 'Violin', 'Saxophone',
    'Ballet', 'Contemporary Dance', 'Jazz Dance', 'Hip-Hop', 'Caribbean Dance',
    'Acting', 'Directing', 'Playwriting', 'Stage Design', 'Lighting Design'
  ];

  const handleSpecializationChange = (specialization: string, checked: boolean) => {
    const currentSpecs = data.specializations || [];
    if (checked) {
      onChange({ specializations: [...currentSpecs, specialization] });
    } else {
      onChange({ specializations: currentSpecs.filter((s: string) => s !== specialization) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Program Selection
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Choose your preferred program and areas of focus at CAPAS.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-4">
          Primary Program *
        </label>
        <div className="space-y-3">
          {programs.map((program) => (
            <div key={program.value} className="border border-capas-ocean-light/30 rounded-lg p-4 hover:border-capas-turquoise transition-colors">
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="primaryProgram"
                  value={program.value}
                  checked={data.primaryProgram === program.value}
                  onChange={(e) => onChange({ primaryProgram: e.target.value })}
                  className="mt-1 mr-3 text-capas-turquoise focus:ring-capas-turquoise"
                />
                <div>
                  <div className="font-semibold text-capas-turquoise">{program.label}</div>
                  <div className="text-sm text-capas-ocean-dark/70">{program.description}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
        {errors.primaryProgram && (
          <p className="mt-1 text-sm text-red-600">{errors.primaryProgram}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Secondary Program (Optional)
        </label>
        <select
          value={data.secondaryProgram}
          onChange={(e) => onChange({ secondaryProgram: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
        >
          <option value="">Select a secondary program (optional)</option>
          {programs.filter(p => p.value !== data.primaryProgram).map((program) => (
            <option key={program.value} value={program.value}>{program.label}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Study Type
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="studyType"
                value="full-time"
                checked={data.studyType === 'full-time'}
                onChange={(e) => onChange({ studyType: e.target.value })}
                className="mr-2 text-capas-turquoise focus:ring-capas-turquoise"
              />
              <span>Full-Time (Daytime classes)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="studyType"
                value="part-time"
                checked={data.studyType === 'part-time'}
                onChange={(e) => onChange({ studyType: e.target.value })}
                className="mr-2 text-capas-turquoise focus:ring-capas-turquoise"
              />
              <span>Part-Time (Evening/Weekend)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
            Preferred Start Semester *
          </label>
          <select
            value={data.startSemester}
            onChange={(e) => onChange({ startSemester: e.target.value })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.startSemester ? 'border-red-500' : 'border-capas-ocean-light/30'
            } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          >
            <option value="">Select semester</option>
            <option value="fall-2024">Fall 2024</option>
            <option value="spring-2025">Spring 2025</option>
            <option value="fall-2025">Fall 2025</option>
          </select>
          {errors.startSemester && (
            <p className="mt-1 text-sm text-red-600">{errors.startSemester}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-4">
          Areas of Interest/Specialization (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {specializations.map((spec) => (
            <label key={spec} className="flex items-center bg-capas-sand-light rounded-lg p-3 hover:bg-capas-sand transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={(data.specializations || []).includes(spec)}
                onChange={(e) => handleSpecializationChange(spec, e.target.checked)}
                className="mr-2 text-capas-turquoise focus:ring-capas-turquoise rounded"
              />
              <span className="text-sm">{spec}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Career Goals & Aspirations *
        </label>
        <textarea
          value={data.careerGoals}
          onChange={(e) => onChange({ careerGoals: e.target.value })}
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.careerGoals ? 'border-red-500' : 'border-capas-ocean-light/30'
          } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          placeholder="Describe your career goals and what you hope to achieve through your studies at CAPAS..."
        />
        {errors.careerGoals && (
          <p className="mt-1 text-sm text-red-600">{errors.careerGoals}</p>
        )}
      </div>
    </div>
  );
};

const DocumentsStep = ({ data, errors, onChange }: any) => {
  const handleFileUpload = (field: string, files: FileList | null) => {
    if (files) {
      if (field === 'transcript') {
        onChange({ [field]: files[0] });
      } else {
        const fileArray = Array.from(files);
        onChange({ [field]: [...(data[field] || []), ...fileArray] });
      }
    }
  };

  const removeFile = (field: string, index?: number) => {
    if (field === 'transcript') {
      onChange({ [field]: null });
    } else if (index !== undefined) {
      const currentFiles = data[field] || [];
      onChange({ [field]: currentFiles.filter((_: any, i: number) => i !== index) });
    }
  };

  const auditionSelections = [
    { value: 'vocal-classical', label: 'Vocal - Classical Piece' },
    { value: 'vocal-contemporary', label: 'Vocal - Contemporary Song' },
    { value: 'vocal-musical-theatre', label: 'Vocal - Musical Theatre Song' },
    { value: 'instrumental-classical', label: 'Instrumental - Classical Piece' },
    { value: 'instrumental-jazz', label: 'Instrumental - Jazz Standard' },
    { value: 'instrumental-contemporary', label: 'Instrumental - Contemporary Piece' },
    { value: 'dance-ballet', label: 'Dance - Ballet Variation' },
    { value: 'dance-contemporary', label: 'Dance - Contemporary Piece' },
    { value: 'dance-jazz', label: 'Dance - Jazz Routine' },
    { value: 'acting-monologue', label: 'Acting - Dramatic Monologue' },
    { value: 'acting-scene', label: 'Acting - Scene Performance' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Documents & Portfolio
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Upload required documents and portfolio materials. All files should be under 10MB each.
        </p>
      </div>

      {/* Official Transcript */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Official Transcript *
        </label>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          errors.transcript ? 'border-red-500 bg-red-50' : 'border-capas-ocean-light/30 hover:border-capas-turquoise'
        }`}>
          {data.transcript ? (
            <div className="flex items-center justify-between bg-capas-sand-light rounded-lg p-3">
              <div className="flex items-center">
                <DocumentTextIcon className="w-5 h-5 text-capas-turquoise mr-2" />
                <span className="text-sm font-medium">{data.transcript.name}</span>
              </div>
              <button
                onClick={() => removeFile('transcript')}
                className="text-red-500 hover:text-red-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <CloudArrowUpIcon className="w-12 h-12 text-capas-ocean-dark/50 mx-auto mb-3" />
              <p className="text-capas-ocean-dark mb-2">Upload your official transcript</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload('transcript', e.target.files)}
                className="hidden"
                id="transcript-upload"
              />
              <label
                htmlFor="transcript-upload"
                className="bg-capas-turquoise text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-capas-turquoise-dark transition-colors"
              >
                Choose File
              </label>
              <p className="text-xs text-capas-ocean-dark/60 mt-2">PDF, JPG, PNG up to 10MB</p>
            </>
          )}
        </div>
        {errors.transcript && (
          <p className="mt-1 text-sm text-red-600">{errors.transcript}</p>
        )}
      </div>

      {/* Personal Statement */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Personal Statement *
        </label>
        <textarea
          value={data.personalStatement}
          onChange={(e) => onChange({ personalStatement: e.target.value })}
          rows={6}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.personalStatement ? 'border-red-500' : 'border-capas-ocean-light/30'
          } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
          placeholder="Tell us about yourself, your passion for the arts, your goals, and why you want to study at CAPAS. Share your artistic journey and what motivates you..."
        />
        <div className="flex justify-between items-center mt-2">
          {errors.personalStatement && (
            <p className="text-sm text-red-600">{errors.personalStatement}</p>
          )}
          <p className="text-xs text-capas-ocean-dark/60 ml-auto">
            {data.personalStatement?.length || 0} characters (minimum 250)
          </p>
        </div>
      </div>

      {/* Portfolio Items */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Portfolio Items (3-5 pieces recommended)
        </label>
        <div className="border-2 border-dashed border-capas-ocean-light/30 hover:border-capas-turquoise rounded-lg p-6 text-center transition-colors">
          <CloudArrowUpIcon className="w-12 h-12 text-capas-ocean-dark/50 mx-auto mb-3" />
          <p className="text-capas-ocean-dark mb-2">Upload your best work</p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3,.wav"
            onChange={(e) => handleFileUpload('portfolioItems', e.target.files)}
            className="hidden"
            id="portfolio-upload"
          />
          <label
            htmlFor="portfolio-upload"
            className="bg-capas-coral text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-capas-coral-dark transition-colors"
          >
            Add Files
          </label>
          <p className="text-xs text-capas-ocean-dark/60 mt-2">
            Images, PDFs, Audio, Video up to 10MB each
          </p>
        </div>
        
        {data.portfolioItems && data.portfolioItems.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.portfolioItems.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between bg-capas-sand-light rounded-lg p-3">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-5 h-5 text-capas-coral mr-2" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile('portfolioItems', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Letters of Recommendation */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Letters of Recommendation (2-3 recommended)
        </label>
        <div className="border-2 border-dashed border-capas-ocean-light/30 hover:border-capas-turquoise rounded-lg p-6 text-center transition-colors">
          <CloudArrowUpIcon className="w-12 h-12 text-capas-ocean-dark/50 mx-auto mb-3" />
          <p className="text-capas-ocean-dark mb-2">Upload recommendation letters</p>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileUpload('letters', e.target.files)}
            className="hidden"
            id="letters-upload"
          />
          <label
            htmlFor="letters-upload"
            className="bg-capas-palm text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-capas-palm-dark transition-colors"
          >
            Add Letters
          </label>
          <p className="text-xs text-capas-ocean-dark/60 mt-2">
            PDF, DOC, DOCX up to 10MB each
          </p>
        </div>
        
        {data.letters && data.letters.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.letters.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between bg-capas-sand-light rounded-lg p-3">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-5 h-5 text-capas-palm mr-2" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile('letters', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Audition Selection */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Audition/Portfolio Focus *
        </label>
        <p className="text-sm text-capas-ocean-dark/70 mb-4">
          What type of piece will you prepare for your audition or portfolio review?
        </p>
        <select
          value={data.auditionSelection}
          onChange={(e) => onChange({ auditionSelection: e.target.value })}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.auditionSelection ? 'border-red-500' : 'border-capas-ocean-light/30'
          } focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors`}
        >
          <option value="">Select your audition focus</option>
          {auditionSelections.map((selection) => (
            <option key={selection.value} value={selection.value}>
              {selection.label}
            </option>
          ))}
        </select>
        {errors.auditionSelection && (
          <p className="mt-1 text-sm text-red-600">{errors.auditionSelection}</p>
        )}
      </div>

      {/* Additional Documents */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Additional Documents (Optional)
        </label>
        <p className="text-sm text-capas-ocean-dark/70 mb-4">
          Any other relevant documents such as certificates, awards, programs, etc.
        </p>
        <div className="border-2 border-dashed border-capas-ocean-light/30 hover:border-capas-turquoise rounded-lg p-6 text-center transition-colors">
          <CloudArrowUpIcon className="w-12 h-12 text-capas-ocean-dark/50 mx-auto mb-3" />
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => handleFileUpload('additionalDocuments', e.target.files)}
            className="hidden"
            id="additional-upload"
          />
          <label
            htmlFor="additional-upload"
            className="bg-capas-gold text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-capas-gold-dark transition-colors"
          >
            Add Documents
          </label>
        </div>
        
        {data.additionalDocuments && data.additionalDocuments.length > 0 && (
          <div className="mt-4 space-y-2">
            {data.additionalDocuments.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between bg-capas-sand-light rounded-lg p-3">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-5 h-5 text-capas-gold mr-2" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile('additionalDocuments', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FinancialInfoStep = ({ data, errors, onChange }: any) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Financial Information
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Help us understand your financial needs and payment preferences.
        </p>
      </div>

      {/* Scholarship Interest */}
      <div className="bg-capas-sand-light rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-4 flex items-center">
          <SparklesIcon className="w-5 h-5 mr-2" />
          Scholarship Opportunities
        </h4>
        
        <div className="space-y-4">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={data.scholarshipInterest}
              onChange={(e) => onChange({ scholarshipInterest: e.target.checked })}
              className="mt-1 mr-3 text-capas-turquoise focus:ring-capas-turquoise rounded"
            />
            <div>
              <span className="font-medium text-capas-ocean-dark">I am interested in scholarship opportunities</span>
              <p className="text-sm text-capas-ocean-dark/70 mt-1">
                CAPAS offers merit-based, need-based, and talent scholarships. Check this to be considered for all available scholarships.
              </p>
            </div>
          </label>
          
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={data.financialAidNeeded}
              onChange={(e) => onChange({ financialAidNeeded: e.target.checked })}
              className="mt-1 mr-3 text-capas-turquoise focus:ring-capas-turquoise rounded"
            />
            <div>
              <span className="font-medium text-capas-ocean-dark">I will need financial assistance to attend CAPAS</span>
              <p className="text-sm text-capas-ocean-dark/70 mt-1">
                This helps our financial aid office understand your needs and provide appropriate support options.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Sponsor Information */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
          Sponsor/Financial Support Information
        </label>
        <p className="text-sm text-capas-ocean-dark/70 mb-4">
          If someone else will be paying for your education, please provide their information.
        </p>
        <textarea
          value={data.sponsorInfo}
          onChange={(e) => onChange({ sponsorInfo: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
          placeholder="Name, relationship, and contact information of sponsor (if applicable)..."
        />
      </div>

      {/* Payment Method */}
      <div>
        <label className="block text-sm font-medium text-capas-ocean-dark mb-4">
          Preferred Payment Method *
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              value: 'full-payment',
              label: 'Full Payment',
              description: 'Pay tuition in full at the beginning of each semester'
            },
            {
              value: 'installment-monthly',
              label: 'Monthly Installments',
              description: 'Spread payments over the semester (small processing fee may apply)'
            },
            {
              value: 'installment-quarterly',
              label: 'Quarterly Payments',
              description: 'Pay in 3 installments per semester'
            },
            {
              value: 'scholarship-pending',
              label: 'Pending Scholarship/Aid',
              description: 'Awaiting scholarship or financial aid decision'
            }
          ].map((option) => (
            <div key={option.value} className="border border-capas-ocean-light/30 rounded-lg p-4 hover:border-capas-turquoise transition-colors">
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={data.paymentMethod === option.value}
                  onChange={(e) => onChange({ paymentMethod: e.target.value })}
                  className="mt-1 mr-3 text-capas-turquoise focus:ring-capas-turquoise"
                />
                <div>
                  <div className="font-semibold text-capas-turquoise">{option.label}</div>
                  <div className="text-sm text-capas-ocean-dark/70">{option.description}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="mt-2 text-sm text-red-600">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Application Fee Waiver */}
      <div className="bg-capas-turquoise/10 rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-4 flex items-center">
          <CurrencyDollarIcon className="w-5 h-5 mr-2" />
          Application Fee
        </h4>
        
        <div className="space-y-4">
          <div className="text-sm text-capas-ocean-dark">
            <p className="mb-2">The CAPAS application fee is <strong>$50 USD</strong> (or <strong>$50 BSD</strong> for Bahamian residents).</p>
            <p>This fee covers application processing and audition/portfolio review.</p>
          </div>
          
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={data.applicationFeeWaiver}
              onChange={(e) => onChange({ applicationFeeWaiver: e.target.checked })}
              className="mt-1 mr-3 text-capas-turquoise focus:ring-capas-turquoise rounded"
            />
            <div>
              <span className="font-medium text-capas-ocean-dark">I would like to request an application fee waiver</span>
              <p className="text-sm text-capas-ocean-dark/70 mt-1">
                Fee waivers are available for students with demonstrated financial need. Our admissions office will contact you regarding documentation required.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Important Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm">
            <h4 className="font-semibold text-blue-800 mb-2">Financial Aid & Scholarships</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Merit scholarships are awarded based on artistic ability and academic achievement</li>
              <li>• Need-based aid requires submission of financial documentation</li>
              <li>• International students may be eligible for limited scholarship opportunities</li>
              <li>• Payment plans can be arranged through our Student Financial Services office</li>
              <li>• Scholarship decisions are typically made within 2-3 weeks of application completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewStep = ({ data, onSubmit, isSubmitting }: any) => {
  const getSectionCompletion = () => {
    const sections = [
      {
        name: 'Personal Information',
        completed: data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email && data.personalInfo.phone
      },
      {
        name: 'Academic Background',
        completed: data.academicInfo.currentEducationLevel && data.academicInfo.institution && data.academicInfo.previousArtsTraining
      },
      {
        name: 'Program Selection',
        completed: data.programSelection.primaryProgram && data.programSelection.startSemester && data.programSelection.careerGoals
      },
      {
        name: 'Documents & Portfolio',
        completed: data.documents.transcript && data.documents.personalStatement && data.documents.auditionSelection
      },
      {
        name: 'Financial Information',
        completed: data.financialInfo.paymentMethod
      }
    ];
    
    const completedCount = sections.filter(s => s.completed).length;
    return { sections, completedCount, total: sections.length };
  };

  const { sections, completedCount, total } = getSectionCompletion();
  const isComplete = completedCount === total;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
          Review Your Application
        </h3>
        <p className="text-capas-ocean-dark/70 mb-6">
          Please review all sections of your application before submitting. You can go back to make changes if needed.
        </p>
      </div>

      {/* Completion Status */}
      <div className="bg-capas-sand-light rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-4">Application Completion Status</h4>
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-capas-ocean-dark">{section.name}</span>
              {section.completed ? (
                <div className="flex items-center text-green-600">
                  <CheckCircleIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm">Complete</span>
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <ExclamationTriangleIcon className="w-5 h-5 mr-1" />
                  <span className="text-sm">Incomplete</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-capas-ocean-light/30">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-capas-ocean-dark">Overall Progress</span>
            <span className={`font-bold ${
              isComplete ? 'text-green-600' : 'text-orange-600'
            }`}>
              {completedCount}/{total} sections complete
            </span>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Personal & Academic Info */}
        <div className="bg-white rounded-lg p-6 border border-capas-ocean-light/20">
          <h4 className="font-semibold text-capas-turquoise mb-4">Personal & Academic</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Name:</span> {data.personalInfo.firstName} {data.personalInfo.lastName}
            </div>
            <div>
              <span className="font-medium">Email:</span> {data.personalInfo.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {data.personalInfo.phone}
            </div>
            <div>
              <span className="font-medium">Education:</span> {data.academicInfo.currentEducationLevel || 'Not specified'}
            </div>
            <div>
              <span className="font-medium">Institution:</span> {data.academicInfo.institution || 'Not specified'}
            </div>
          </div>
        </div>

        {/* Program & Goals */}
        <div className="bg-white rounded-lg p-6 border border-capas-ocean-light/20">
          <h4 className="font-semibold text-capas-turquoise mb-4">Program Selection</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Primary Program:</span>
              <br />
              <span className="text-capas-ocean-dark/70">{data.programSelection.primaryProgram || 'Not selected'}</span>
            </div>
            {data.programSelection.secondaryProgram && (
              <div>
                <span className="font-medium">Secondary Program:</span>
                <br />
                <span className="text-capas-ocean-dark/70">{data.programSelection.secondaryProgram}</span>
              </div>
            )}
            <div>
              <span className="font-medium">Study Type:</span> {data.programSelection.studyType}
            </div>
            <div>
              <span className="font-medium">Start Semester:</span> {data.programSelection.startSemester || 'Not selected'}
            </div>
            {data.programSelection.specializations && data.programSelection.specializations.length > 0 && (
              <div>
                <span className="font-medium">Specializations:</span>
                <br />
                <span className="text-capas-ocean-dark/70">{data.programSelection.specializations.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg p-6 border border-capas-ocean-light/20">
          <h4 className="font-semibold text-capas-turquoise mb-4">Documents</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span>Official Transcript:</span>
              {data.documents.transcript ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Uploaded
                </span>
              ) : (
                <span className="text-red-600">Missing</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Personal Statement:</span>
              {data.documents.personalStatement && data.documents.personalStatement.length >= 250 ? (
                <span className="text-green-600 flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-1" />
                  Complete ({data.documents.personalStatement.length} chars)
                </span>
              ) : (
                <span className="text-red-600">Incomplete</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span>Portfolio Items:</span>
              <span>{data.documents.portfolioItems?.length || 0} files</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Recommendation Letters:</span>
              <span>{data.documents.letters?.length || 0} files</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audition Focus:</span>
              <span>{data.documents.auditionSelection || 'Not selected'}</span>
            </div>
          </div>
        </div>

        {/* Financial */}
        <div className="bg-white rounded-lg p-6 border border-capas-ocean-light/20">
          <h4 className="font-semibold text-capas-turquoise mb-4">Financial Information</h4>
          <div className="space-y-3 text-sm">
            <div>
              <span className="font-medium">Scholarship Interest:</span> {data.financialInfo.scholarshipInterest ? 'Yes' : 'No'}
            </div>
            <div>
              <span className="font-medium">Financial Aid Needed:</span> {data.financialInfo.financialAidNeeded ? 'Yes' : 'No'}
            </div>
            <div>
              <span className="font-medium">Payment Method:</span> {data.financialInfo.paymentMethod || 'Not selected'}
            </div>
            <div>
              <span className="font-medium">Fee Waiver Requested:</span> {data.financialInfo.applicationFeeWaiver ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-700">
            <h4 className="font-semibold mb-2">Before You Submit</h4>
            <p className="mb-3">
              By submitting this application, you acknowledge that:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>All information provided is accurate and truthful</li>
              <li>You understand the admission process and requirements</li>
              <li>You agree to CAPAS terms and conditions</li>
              <li>You authorize CAPAS to contact you regarding your application</li>
              <li>You understand that submission of this application does not guarantee admission</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      {!isComplete && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="w-5 h-5 text-orange-600 mr-2" />
            <span className="text-orange-800 font-medium">
              Please complete all required sections before submitting your application.
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-center pt-6">
        <button
          onClick={onSubmit}
          disabled={!isComplete || isSubmitting}
          className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
            isComplete && !isSubmitting
              ? 'bg-capas-turquoise hover:bg-capas-turquoise-dark text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
              Submitting Application...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </div>
  );
};