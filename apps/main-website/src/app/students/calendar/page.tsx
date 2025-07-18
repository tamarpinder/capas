'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  AcademicCapIcon,
  MusicalNoteIcon,
  TrophyIcon,
  UserGroupIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import Footer from '@/components/Footer';
import { OrganizationStructuredData } from '@/components/StructuredData';

const currentYear = 2024;
const currentSemester = 'Fall';

const academicCalendar = {
  'Fall 2024': [
    { date: '2024-08-01', title: 'Fall Application Deadline', type: 'deadline', description: 'Final day to submit applications for Fall semester' },
    { date: '2024-08-10', title: 'New Student Orientation Begins', type: 'event', description: 'Week-long orientation for incoming students' },
    { date: '2024-08-15', title: 'Fall Classes Begin', type: 'academic', description: 'First day of Fall semester classes' },
    { date: '2024-08-30', title: 'Add/Drop Period Ends', type: 'deadline', description: 'Final day to add or drop courses without penalty' },
    { date: '2024-09-02', title: 'Labor Day - No Classes', type: 'holiday', description: 'Campus closed for Labor Day holiday' },
    { date: '2024-09-15', title: 'Scholarship Application Deadline', type: 'deadline', description: 'Final day to submit scholarship applications for Spring' },
    { date: '2024-10-14', title: 'Mid-Semester Break', type: 'holiday', description: 'No classes - mid-semester break' },
    { date: '2024-10-15-19', title: 'Culture Week', type: 'event', description: 'Week-long celebration of Caribbean arts and heritage' },
    { date: '2024-11-01', title: 'Spring Registration Opens', type: 'deadline', description: 'Registration opens for Spring semester courses' },
    { date: '2024-11-25-29', title: 'Thanksgiving Break', type: 'holiday', description: 'Campus closed for Thanksgiving holiday' },
    { date: '2024-12-06', title: 'Last Day of Classes', type: 'academic', description: 'Final day of Fall semester classes' },
    { date: '2024-12-09-13', title: 'Final Examinations', type: 'academic', description: 'Final examination period' },
    { date: '2024-12-15', title: 'Fall Semester Ends', type: 'academic', description: 'End of Fall semester' },
    { date: '2024-12-16', title: 'Junkanoo Festival Celebration', type: 'event', description: 'Annual celebration of Bahamian culture' }
  ],
  'Spring 2025': [
    { date: '2025-01-15', title: 'Spring Classes Begin', type: 'academic', description: 'First day of Spring semester classes' },
    { date: '2025-01-20', title: 'Martin Luther King Jr. Day - No Classes', type: 'holiday', description: 'Campus closed for MLK Day' },
    { date: '2025-01-31', title: 'Add/Drop Period Ends', type: 'deadline', description: 'Final day to add or drop courses without penalty' },
    { date: '2025-02-15', title: 'Career Fair', type: 'event', description: 'Annual career fair with industry professionals' },
    { date: '2025-03-03-07', title: 'Spring Break', type: 'holiday', description: 'No classes - Spring break' },
    { date: '2025-03-15', title: 'Community Service Day', type: 'event', description: 'Campus-wide community service initiatives' },
    { date: '2025-04-01', title: 'Fall Registration Opens', type: 'deadline', description: 'Registration opens for Fall semester courses' },
    { date: '2025-04-10-12', title: 'Spring Arts Showcase', type: 'event', description: 'Annual showcase of student performances and artwork' },
    { date: '2025-04-18', title: 'Good Friday - No Classes', type: 'holiday', description: 'Campus closed for Good Friday' },
    { date: '2025-05-02', title: 'Last Day of Classes', type: 'academic', description: 'Final day of Spring semester classes' },
    { date: '2025-05-05-09', title: 'Final Examinations', type: 'academic', description: 'Final examination period' },
    { date: '2025-05-12', title: 'Commencement Ceremony', type: 'event', description: 'Graduation ceremony for graduating students' },
    { date: '2025-05-15', title: 'Spring Semester Ends', type: 'academic', description: 'End of Spring semester' }
  ],
  'Summer 2025': [
    { date: '2025-06-02', title: 'Summer Session I Begins', type: 'academic', description: 'First summer session starts' },
    { date: '2025-06-15', title: 'Summer Arts Camp Registration Opens', type: 'event', description: 'Registration opens for youth summer programs' },
    { date: '2025-07-04', title: 'Independence Day - No Classes', type: 'holiday', description: 'Campus closed for Independence Day' },
    { date: '2025-07-11', title: 'Summer Session I Ends', type: 'academic', description: 'End of first summer session' },
    { date: '2025-07-14', title: 'Summer Session II Begins', type: 'academic', description: 'Second summer session starts' },
    { date: '2025-07-20-25', title: 'Summer Arts Intensive', type: 'event', description: 'Intensive workshops for continuing students' },
    { date: '2025-08-22', title: 'Summer Session II Ends', type: 'academic', description: 'End of second summer session' }
  ]
};

const eventTypes = {
  academic: { color: 'bg-capas-turquoise', textColor: 'text-capas-turquoise', icon: AcademicCapIcon },
  deadline: { color: 'bg-capas-coral', textColor: 'text-capas-coral', icon: ExclamationTriangleIcon },
  event: { color: 'bg-capas-gold', textColor: 'text-capas-gold', icon: MusicalNoteIcon },
  holiday: { color: 'bg-capas-palm', textColor: 'text-capas-palm', icon: InformationCircleIcon }
};

const importantReminders = [
  {
    title: 'Registration Priority',
    description: 'Registration priority is based on credit hours completed and academic standing.',
    icon: BookOpenIcon
  },
  {
    title: 'Financial Aid Deadlines',
    description: 'Submit FAFSA and institutional aid applications by priority deadlines for best consideration.',
    icon: ExclamationTriangleIcon
  },
  {
    title: 'Academic Standing',
    description: 'Maintain satisfactory academic progress to remain eligible for financial aid and good standing.',
    icon: TrophyIcon
  },
  {
    title: 'Course Prerequisites',
    description: 'Check course prerequisites before registering. Some courses require auditions or portfolio submissions.',
    icon: AcademicCapIcon
  }
];

const upcomingEvents = [
  {
    date: '2024-10-15',
    title: 'Culture Week Opening Ceremony',
    time: '7:00 PM',
    location: 'Patricia Glinton-Meicholas Performance Hall',
    description: 'Kick-off event featuring traditional Caribbean music and dance performances.'
  },
  {
    date: '2024-10-18',
    title: 'Guest Artist Masterclass: Steel Drum',
    time: '2:00 PM',
    location: 'Music Studio A',
    description: 'Masterclass with renowned steel drum artist from Trinidad & Tobago.'
  },
  {
    date: '2024-11-01',
    title: 'Spring Registration Information Session',
    time: '12:00 PM',
    location: 'Main Auditorium',
    description: 'Learn about course offerings and registration procedures for Spring 2025.'
  }
];

export default function AcademicCalendarPage() {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [selectedEventType, setSelectedEventType] = useState('all');

  const semesters = Object.keys(academicCalendar);
  const currentEvents = academicCalendar[selectedSemester] || [];
  
  const filteredEvents = selectedEventType === 'all' 
    ? currentEvents 
    : currentEvents.filter(event => event.type === selectedEventType);

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-palm mobile-section-padding">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="currentColor"
              />
            </svg>
          </div>
          
          <div className="relative mobile-safe-container">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
              <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/50" />
                <li>
                  <Link href="/students" className="text-white/70 hover:text-white transition-colors">
                    Students
                  </Link>
                </li>
                <ChevronRightIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white/50" />
                <li>
                  <span className="text-white font-medium">Academic Calendar</span>
                </li>
              </ol>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-montserrat text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6">
                Academic Calendar
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto text-white/90 px-4">
                Stay organized with important dates, deadlines, and events throughout the academic year
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calendar Controls */}
        <section className="py-8 sm:py-12 lg:py-16 bg-capas-sand-light border-b border-capas-ocean-light/20">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Semester Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="font-semibold text-capas-ocean-dark text-sm sm:text-base">Semester:</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="bg-white border border-capas-ocean-light/30 rounded-lg px-3 py-2 sm:px-4 font-semibold text-capas-turquoise focus:outline-none focus:ring-2 focus:ring-capas-turquoise text-sm sm:text-base"
                >
                  {semesters.map(semester => (
                    <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>

              {/* Event Type Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-capas-ocean-dark text-sm sm:text-base sm:mr-2">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedEventType('all')}
                    className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                      selectedEventType === 'all' 
                        ? 'bg-capas-turquoise text-white' 
                        : 'bg-white text-capas-turquoise border border-capas-turquoise'
                    }`}
                  >
                    All
                  </button>
                  {Object.entries(eventTypes).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setSelectedEventType(type)}
                      className={`px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold transition-colors capitalize ${
                        selectedEventType === type 
                          ? `${config.color} text-white` 
                          : `bg-white ${config.textColor} border border-current`
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Events */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-2">
                {selectedSemester} Events
              </h2>
              <p className="text-capas-ocean-dark">
                {filteredEvents.length} events
                {selectedEventType !== 'all' && ` (${selectedEventType} only)`}
              </p>
            </motion.div>

            <div className="space-y-4">
              {filteredEvents.map((event, index) => {
                const eventConfig = eventTypes[event.type];
                const EventIcon = eventConfig.icon;
                
                return (
                  <motion.div
                    key={`${event.date}-${event.title}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="mobile-card-enhanced bg-white border-l-4 border-capas-turquoise shadow-md hover:shadow-lg transition-shadow duration-300"
                    style={{ borderLeftColor: eventConfig.color.replace('bg-', '#') }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${eventConfig.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <EventIcon className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h3 className="font-montserrat text-lg font-bold text-capas-turquoise">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark">
                            <span className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {new Date(event.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${eventConfig.color} text-white`}>
                              {event.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-capas-ocean-dark">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <CalendarIcon className="w-12 h-12 text-capas-ocean-light mx-auto mb-4" />
                <p className="text-capas-ocean-dark">No events found for the selected criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Events Spotlight */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mr-3">
                  <ClockIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Upcoming Events
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Don't miss these exciting events happening soon on campus
              </p>
            </motion.div>

            <div className="mobile-grid-auto lg:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mobile-card-enhanced bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center">
                    <div className="bg-capas-turquoise text-white text-2xl font-bold py-3 px-4 rounded-lg mb-4">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-capas-ocean-dark mb-4">
                      <div className="flex items-center justify-center">
                        <ClockIcon className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center justify-center">
                        <UserGroupIcon className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-capas-ocean-dark text-sm">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Reminders */}
        <section className="mobile-section-padding bg-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-capas-coral rounded-full flex items-center justify-center mr-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise">
                  Important Reminders
                </h2>
              </div>
              <p className="text-lg text-capas-ocean-dark max-w-3xl mx-auto">
                Key information to help you stay on track throughout the academic year
              </p>
            </motion.div>

            <div className="mobile-grid-auto">
              {importantReminders.map((reminder, index) => (
                <motion.div
                  key={reminder.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-capas-sand-light rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center flex-shrink-0">
                    <reminder.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-2">
                      {reminder.title}
                    </h3>
                    <p className="text-capas-ocean-dark">
                      {reminder.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Resources */}
        <section className="mobile-section-padding bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white">
          <div className="mobile-safe-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="font-montserrat text-3xl font-bold mb-6">
                Academic Planning Resources
              </h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                Take advantage of these resources to plan your academic journey and make the most 
                of your time at CAPAS. Our academic advisors are here to help you succeed.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <BookOpenIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Course Catalog</h3>
                  <p className="text-white/80">Browse all available courses and requirements</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <AcademicCapIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Academic Advising</h3>
                  <p className="text-white/80">Get personalized guidance for your academic path</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <CalendarIcon className="w-8 h-8 mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Registration</h3>
                  <p className="text-white/80">Plan and register for your courses online</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mobile-section-padding bg-capas-sand-light">
          <div className="mobile-safe-container">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4">
                Need Academic Support?
              </h3>
              <p className="text-lg text-capas-ocean-dark mb-8 max-w-2xl mx-auto">
                Our Student Services team is here to help you navigate your academic journey and stay on track
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  Contact Academic Advising
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/students/preparation"
                  className="bg-white hover:bg-capas-sand-light text-capas-turquoise border-2 border-capas-turquoise font-semibold px-8 py-3 rounded-lg transition-all duration-200 inline-flex items-center justify-center"
                >
                  Getting Started Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}