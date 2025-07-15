'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  DocumentTextIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { MockStudent } from '@/lib/mock-data';

interface RegistrationWizardProps {
  type: 'courses' | 'events' | 'forms' | 'housing';
  student: MockStudent | null;
}

interface WizardStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function RegistrationWizard({ type, student }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const stepConfigs = {
    courses: [
      { id: 'search', title: 'Course Search', description: 'Find available courses for Fall 2024' },
      { id: 'select', title: 'Course Selection', description: 'Choose your courses and sections' },
      { id: 'review', title: 'Schedule Review', description: 'Review your class schedule' },
      { id: 'confirm', title: 'Confirmation', description: 'Confirm registration and payment' }
    ],
    events: [
      { id: 'browse', title: 'Browse Events', description: 'Explore upcoming campus events' },
      { id: 'select', title: 'Event Selection', description: 'Choose events to attend' },
      { id: 'details', title: 'Contact Details', description: 'Provide emergency contact info' },
      { id: 'confirm', title: 'Confirmation', description: 'Confirm event registrations' }
    ],
    forms: [
      { id: 'type', title: 'Form Type', description: 'Select the type of academic form' },
      { id: 'details', title: 'Form Details', description: 'Fill out required information' },
      { id: 'documents', title: 'Documents', description: 'Upload supporting documents' },
      { id: 'submit', title: 'Submit', description: 'Review and submit your form' }
    ],
    housing: [
      { id: 'preferences', title: 'Housing Preferences', description: 'Select your housing preferences' },
      { id: 'roommate', title: 'Roommate Matching', description: 'Find or request a roommate' },
      { id: 'meal', title: 'Meal Plan', description: 'Choose your dining options' },
      { id: 'review', title: 'Application Review', description: 'Review and submit application' }
    ]
  };

  const steps = stepConfigs[type].map((step) => ({
    ...step,
    completed: completedSteps.has(step.id)
  }));

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, steps[currentStep].id]));
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const getStepIcon = (stepType: string, stepId: string) => {
    const iconMap: Record<string, Record<string, React.ComponentType<{ className?: string }>>> = {
      courses: {
        search: BookOpenIcon,
        select: CheckIcon,
        review: CalendarIcon,
        confirm: StarIcon
      },
      events: {
        browse: CalendarIcon,
        select: CheckIcon,
        details: UserIcon,
        confirm: StarIcon
      },
      forms: {
        type: DocumentTextIcon,
        details: UserIcon,
        documents: BookOpenIcon,
        submit: CheckIcon
      },
      housing: {
        preferences: HomeIcon,
        roommate: UserIcon,
        meal: BookOpenIcon,
        review: CheckIcon
      }
    };

    return iconMap[stepType]?.[stepId] || BookOpenIcon;
  };

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];
    const IconComponent = getStepIcon(type, currentStepData.id);

    switch (type) {
      case 'courses':
        return renderCourseContent(currentStepData);
      case 'events':
        return renderEventContent(currentStepData);
      case 'forms':
        return renderFormContent(currentStepData);
      case 'housing':
        return renderHousingContent(currentStepData);
      default:
        return (
          <div className="text-center py-12">
            <IconComponent className="h-16 w-16 text-capas-turquoise mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-capas-ocean-dark/70">
              {currentStepData.description}
            </p>
          </div>
        );
    }
  };

  const renderCourseContent = (step: WizardStep) => {
    switch (step.id) {
      case 'search':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <BookOpenIcon className="h-16 w-16 text-capas-turquoise mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">Find Your Courses</h3>
              <p className="text-capas-ocean-dark/70">Search for available courses for Fall 2024 semester</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Course Subject
                </label>
                <select className="input-capas">
                  <option value="">All Subjects</option>
                  <option value="MUS">Music</option>
                  <option value="ART">Visual Arts</option>
                  <option value="THE">Theatre</option>
                  <option value="DAN">Dance</option>
                  <option value="ENG">English</option>
                  <option value="MAT">Mathematics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                  Course Level
                </label>
                <select className="input-capas">
                  <option value="">All Levels</option>
                  <option value="100">100-level (Introductory)</option>
                  <option value="200">200-level (Intermediate)</option>
                  <option value="300">300-level (Advanced)</option>
                  <option value="400">400-level (Senior)</option>
                </select>
              </div>
            </div>

            <div className="bg-capas-sand-light rounded-lg p-4">
              <h4 className="font-medium text-capas-ocean-dark mb-3">Recommended Courses for {student?.program}</h4>
              <div className="space-y-2">
                {[
                  'MUS 201 - Music Theory II',
                  'MUS 245 - Digital Audio Production',
                  'ENG 201 - Creative Writing',
                  'THE 180 - Stage Performance'
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded p-3">
                    <span className="text-sm text-capas-ocean-dark">{course}</span>
                    <button className="text-capas-turquoise text-sm font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckIcon className="h-16 w-16 text-capas-turquoise mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">Select Your Courses</h3>
              <p className="text-capas-ocean-dark/70">Choose courses and sections that fit your schedule</p>
            </div>

            <div className="grid gap-4">
              {[
                { code: 'MUS 201', name: 'Music Theory II', credits: 3, time: 'MW 10:00-11:30 AM', instructor: 'Prof. Johnson' },
                { code: 'MUS 245', name: 'Digital Audio Production', credits: 3, time: 'TTh 2:00-3:30 PM', instructor: 'Prof. Williams' },
                { code: 'ENG 201', name: 'Creative Writing', credits: 3, time: 'MWF 9:00-10:00 AM', instructor: 'Prof. Davis' }
              ].map((course, index) => (
                <div key={index} className="border border-capas-sand-light rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-capas-ocean-dark">{course.code} - {course.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70 mt-1">
                        <span>{course.credits} credits</span>
                        <span className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{course.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <UserIcon className="h-4 w-4" />
                          <span>{course.instructor}</span>
                        </span>
                      </div>
                    </div>
                    <button className="btn-capas-primary text-sm px-4 py-2">
                      Add Course
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-capas-turquoise/5 border border-capas-turquoise/20 rounded-lg p-4">
              <h4 className="font-medium text-capas-turquoise mb-2">Selected Courses (9 credits)</h4>
              <div className="text-sm text-capas-ocean-dark/80">
                • MUS 201 - Music Theory II (3 credits)<br />
                • MUS 245 - Digital Audio Production (3 credits)<br />
                • ENG 201 - Creative Writing (3 credits)
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <CheckIcon className="h-16 w-16 text-capas-palm mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">
              Step Complete!
            </h3>
            <p className="text-capas-ocean-dark/70">
              Continue to the next step in your registration process.
            </p>
          </div>
        );
    }
  };

  const renderEventContent = (step: WizardStep) => {
    return (
      <div className="text-center py-12">
        <CalendarIcon className="h-16 w-16 text-capas-coral mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">
          Event Registration Coming Soon
        </h3>
        <p className="text-capas-ocean-dark/70">
          Event registration features will be available soon. Stay tuned for Junkanoo Festival and other Caribbean cultural events!
        </p>
      </div>
    );
  };

  const renderFormContent = (step: WizardStep) => {
    return (
      <div className="text-center py-12">
        <DocumentTextIcon className="h-16 w-16 text-capas-gold mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">
          Academic Forms Portal
        </h3>
        <p className="text-capas-ocean-dark/70">
          Submit academic petitions, transcript requests, and other forms digitally.
        </p>
      </div>
    );
  };

  const renderHousingContent = (step: WizardStep) => {
    return (
      <div className="text-center py-12">
        <HomeIcon className="h-16 w-16 text-capas-palm mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">
          Campus Housing Application
        </h3>
        <p className="text-capas-ocean-dark/70">
          Apply for on-campus housing with ocean views and Caribbean-inspired accommodations.
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center flex-1">
            <button
              onClick={() => handleStepClick(steps.indexOf(step))}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                steps.indexOf(step) <= currentStep
                  ? 'bg-capas-turquoise border-capas-turquoise text-white'
                  : 'border-capas-sand-light text-capas-ocean-dark/40'
              } ${steps.indexOf(step) <= currentStep ? 'cursor-pointer hover:bg-capas-turquoise/90' : 'cursor-not-allowed'}`}
              disabled={steps.indexOf(step) > currentStep}
            >
              {step.completed ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <span className="text-sm font-medium">{steps.indexOf(step) + 1}</span>
              )}
            </button>
            
            <div className="ml-3 flex-1">
              <div className={`text-sm font-medium ${
                steps.indexOf(step) <= currentStep ? 'text-capas-ocean-dark' : 'text-capas-ocean-dark/40'
              }`}>
                {step.title}
              </div>
              <div className={`text-xs ${
                steps.indexOf(step) <= currentStep ? 'text-capas-ocean-dark/70' : 'text-capas-ocean-dark/40'
              }`}>
                {step.description}
              </div>
            </div>

            {steps.indexOf(step) < steps.length - 1 && (
              <div className={`h-0.5 w-full mx-4 ${
                steps.indexOf(step) < currentStep ? 'bg-capas-turquoise' : 'bg-capas-sand-light'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-capas-sand-light rounded-lg p-8 min-h-[400px]"
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-colors ${
            currentStep === 0
              ? 'border-capas-sand-light text-capas-ocean-dark/40 cursor-not-allowed'
              : 'border-capas-turquoise text-capas-turquoise hover:bg-capas-turquoise hover:text-white'
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-capas-ocean-dark/70">
          Step {currentStep + 1} of {steps.length}
        </div>

        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
            currentStep === steps.length - 1
              ? 'bg-capas-palm text-white cursor-not-allowed opacity-50'
              : 'btn-capas-primary'
          }`}
        >
          <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
          {currentStep < steps.length - 1 && <ChevronRightIcon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}