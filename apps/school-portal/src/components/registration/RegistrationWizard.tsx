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
import { courseCatalog, getAvailableCourses, departments, timeSlots, creditOptions, Course } from '@/lib/course-catalog';

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
  
  // Course registration state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('All Times');
  const [selectedCredits, setSelectedCredits] = useState('All Credits');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [cartCourses, setCartCourses] = useState<Course[]>([]);

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

  // Get filtered courses
  const filteredCourses = getAvailableCourses({
    department: selectedDepartment,
    timeSlot: selectedTimeSlot,
    credits: selectedCredits,
    searchTerm: searchTerm
  });

  // Course management functions
  const addToCart = (course: Course) => {
    if (!cartCourses.find(c => c.id === course.id)) {
      setCartCourses([...cartCourses, course]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCartCourses(cartCourses.filter(c => c.id !== courseId));
  };

  const getTotalCredits = () => {
    return cartCourses.reduce((total, course) => total + course.credits, 0);
  };

  const hasTimeConflict = (newCourse: Course) => {
    return cartCourses.some(course => {
      const hasCommonDay = course.schedule.days.some(day => 
        newCourse.schedule.days.includes(day)
      );
      if (!hasCommonDay) return false;
      
      // Simple time conflict check (would need more sophisticated logic in real app)
      return course.schedule.time === newCourse.schedule.time;
    });
  };

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

            {/* Search and Filters */}
            <div className="bg-white rounded-lg border border-capas-sand-light p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Search Courses
                  </label>
                  <input
                    type="text"
                    placeholder="Course title, code, or instructor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-capas"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Department
                  </label>
                  <select 
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="input-capas"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Time Preference
                  </label>
                  <select 
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="input-capas"
                  >
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Credits
                  </label>
                  <select 
                    value={selectedCredits}
                    onChange={(e) => setSelectedCredits(e.target.value)}
                    className="input-capas"
                  >
                    {creditOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Course Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-capas-ocean-dark">
                  Available Courses ({filteredCourses.length})
                </h4>
                <div className="text-sm text-capas-ocean-dark/70">
                  Selected: {cartCourses.length} courses ({getTotalCredits()} credits)
                </div>
              </div>

              <div className="grid gap-4 max-h-96 overflow-y-auto">
                {filteredCourses.map((course) => {
                  const isInCart = cartCourses.find(c => c.id === course.id);
                  const hasConflict = hasTimeConflict(course);
                  const isPrereqMet = course.prerequisites.length === 0; // Simplified for demo
                  
                  return (
                    <div 
                      key={course.id} 
                      className={`border rounded-lg p-4 ${
                        isInCart ? 'border-capas-turquoise bg-capas-turquoise/5' :
                        hasConflict ? 'border-capas-coral bg-capas-coral/5' :
                        'border-capas-sand-light bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h5 className="font-semibold text-capas-ocean-dark">
                              {course.code} - {course.title}
                            </h5>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              course.status === 'open' ? 'bg-green-100 text-green-800' :
                              course.status === 'waitlist' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {course.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-capas-ocean-dark/70 mb-3">
                            {course.description}
                          </p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-capas-ocean-dark/70">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{course.credits}</span>
                              <span>credits</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{course.schedule.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{course.schedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{course.instructor}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="text-xs text-capas-ocean-dark/60">
                              {course.enrolled}/{course.capacity} enrolled
                              {course.waitlist > 0 && ` • ${course.waitlist} waitlisted`}
                            </div>
                            <div className="flex space-x-1">
                              {course.tags.slice(0, 2).map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 text-xs bg-capas-sand-light text-capas-ocean-dark rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="ml-4 flex flex-col space-y-2">
                          {isInCart ? (
                            <button
                              onClick={() => removeFromCart(course.id)}
                              className="btn-capas-secondary text-sm px-4 py-2"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => addToCart(course)}
                              disabled={hasConflict || course.status === 'closed'}
                              className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                                hasConflict || course.status === 'closed' 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'btn-capas-primary'
                              }`}
                            >
                              {hasConflict ? 'Time Conflict' : 
                               course.status === 'closed' ? 'Closed' :
                               course.status === 'waitlist' ? 'Join Waitlist' : 'Add Course'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckIcon className="h-16 w-16 text-capas-turquoise mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-capas-ocean-dark mb-2">Review Your Selection</h3>
              <p className="text-capas-ocean-dark/70">Review and confirm your course selection</p>
            </div>

            {cartCourses.length === 0 ? (
              <div className="text-center py-12 bg-capas-sand-light/30 rounded-lg">
                <BookOpenIcon className="h-12 w-12 text-capas-ocean-dark/40 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-capas-ocean-dark mb-2">No Courses Selected</h4>
                <p className="text-capas-ocean-dark/70 mb-4">Go back to the search step to add courses to your cart.</p>
                <button
                  onClick={() => setCurrentStep(0)}
                  className="btn-capas-primary"
                >
                  Search Courses
                </button>
              </div>
            ) : (
              <>
                {/* Selected Courses */}
                <div className="space-y-4">
                  <h4 className="font-medium text-capas-ocean-dark">
                    Selected Courses ({cartCourses.length})
                  </h4>
                  
                  {cartCourses.map((course) => (
                    <div key={course.id} className="border border-capas-turquoise bg-capas-turquoise/5 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h5 className="font-semibold text-capas-ocean-dark mb-1">
                            {course.code} - {course.title}
                          </h5>
                          <p className="text-sm text-capas-ocean-dark/70 mb-2">
                            {course.description}
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-capas-ocean-dark/70">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{course.credits}</span>
                              <span>credits</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>{course.schedule.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{course.schedule.days.join(', ')}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <UserIcon className="h-4 w-4" />
                              <span>{course.instructor}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(course.id)}
                          className="btn-capas-secondary text-sm px-4 py-2 ml-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Schedule Summary */}
                <div className="bg-white border border-capas-sand-light rounded-lg p-6">
                  <h4 className="font-medium text-capas-ocean-dark mb-4">Registration Summary</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-capas-ocean-dark mb-2">Credit Hours</h5>
                      <div className="text-2xl font-bold text-capas-turquoise">
                        {getTotalCredits()} Credits
                      </div>
                      <p className="text-sm text-capas-ocean-dark/70">
                        {getTotalCredits() < 12 ? 'Part-time status' : 
                         getTotalCredits() <= 18 ? 'Full-time status' : 
                         'Overload - requires approval'}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-capas-ocean-dark mb-2">Estimated Cost</h5>
                      <div className="text-2xl font-bold text-capas-ocean">
                        ${(getTotalCredits() * 850).toLocaleString()}
                      </div>
                      <p className="text-sm text-capas-ocean-dark/70">
                        $850 per credit hour
                      </p>
                    </div>
                  </div>

                  {getTotalCredits() > 18 && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span className="text-sm font-medium text-yellow-800">
                          Course Overload - Academic Advisor Approval Required
                        </span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        You have selected more than 18 credits. Please contact your academic advisor for approval.
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(0)}
                    className="btn-capas-secondary"
                  >
                    ← Add More Courses
                  </button>
                  <button
                    onClick={() => handleNext()}
                    disabled={cartCourses.length === 0}
                    className="btn-capas-primary"
                  >
                    Continue to Review →
                  </button>
                </div>
              </>
            )}
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