'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail, type MockStudent, type StudentEvent } from '@/lib/mock-data';
import { generateCalendarEvents, getEventsForDate, getUpcomingEvents, type CalendarEvent as CalendarEventType } from '@/lib/calendar-events';
import CalendarView from '@/components/calendar/CalendarView';
import EventDetails from '@/components/calendar/EventDetails';
import { CalendarEvent } from '@/components/calendar/CalendarView';
import {
  CalendarIcon,
  SparklesIcon,
  SunIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

type ExtendedUser = {
  email: string;
  name: string;
  firstName: string;
  // add other properties as needed
};

export default function CalendarPage() {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | CalendarEventType | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [currentTime, setCurrentTime] = useState(new Date());

  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent: MockStudent | null = studentData?.email ? getStudentByEmail(studentData.email) : null;
  
  // Get calendar events from our new calendar system
  const allCalendarEvents = generateCalendarEvents();
  const todaysCalendarEvents = getEventsForDate(allCalendarEvents, new Date());
  const upcomingCalendarEvents = getUpcomingEvents(allCalendarEvents, 14); // Next 2 weeks

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Get Caribbean cultural events and academic events
  const culturalEvents = [
    {
      id: 'junkanoo-workshop',
      title: 'Junkanoo Workshop',
      date: '2024-07-20',
      time: '14:00',
      duration: '3 hours',
      type: 'cultural',
      location: 'Cultural Arts Center',
      description: 'Learn traditional Junkanoo music and dance techniques from master artists.',
      instructor: 'Master Johnny "Rush" Thompson',
      capacity: 25,
      registered: 18,
      color: 'text-capas-coral',
      bgColor: 'bg-capas-coral/10',
      borderColor: 'border-capas-coral/20'
    },
    {
      id: 'rake-scrape-session',
      title: 'Rake & Scrape Music Session',
      date: '2024-07-25',
      time: '19:00',
      duration: '2 hours',
      type: 'cultural',
      location: 'Music Hall',
      description: 'Traditional Bahamian folk music jam session.',
      instructor: 'Prof. Maria Fernandez',
      capacity: 20,
      registered: 12,
      color: 'text-capas-gold',
      bgColor: 'bg-capas-gold/10',
      borderColor: 'border-capas-gold/20'
    },
    {
      id: 'conch-shell-art',
      title: 'Conch Shell Art Workshop',
      date: '2024-07-30',
      time: '10:00',
      duration: '4 hours',
      type: 'cultural',
      location: 'Visual Arts Studio',
      description: 'Create beautiful art pieces using traditional conch shells.',
      instructor: 'Artist Sarah Williams',
      capacity: 15,
      registered: 8,
      color: 'text-capas-ocean',
      bgColor: 'bg-capas-ocean/10',
      borderColor: 'border-capas-ocean/20'
    }
  ];

  // Combine student events with calendar events for today
  const studentTodaysEvents = mockStudent?.upcomingEvents.filter((event: StudentEvent) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }) || [];
  
  const todaysEvents = [...studentTodaysEvents, ...todaysCalendarEvents];

  // Convert calendar events to match the CalendarEvent interface for the calendar component
  const convertedCalendarEvents: CalendarEvent[] = upcomingCalendarEvents.map(event => ({
    id: event.id,
    title: event.title,
    date: event.start.toISOString().split('T')[0],
    time: event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    duration: event.isAllDay ? 'All Day' : `${Math.round((event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60))} hours`,
    type: event.type,
    location: event.location || 'TBA',
    description: event.description || '',
    instructor: event.instructor,
    capacity: event.capacity,
    registered: event.enrolled,
    color: getEventTypeColor(event.type),
    bgColor: getEventTypeBgColor(event.type),
    borderColor: getEventTypeBorderColor(event.type)
  }));
  
  const upcomingEventsFiltered = [...(mockStudent?.upcomingEvents || []), ...convertedCalendarEvents, ...culturalEvents as CalendarEvent[]]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const firstName = studentData?.firstName || 'Student';
    
    if (hour < 12) {
      return `Good morning, ${firstName}! 🌅`;
    } else if (hour < 17) {
      return `Good afternoon, ${firstName}! ☀️`;
    } else {
      return `Good evening, ${firstName}! 🌙`;
    }
  };

  // Helper functions for event type styling
  const getEventTypeColor = (type: CalendarEventType['type']) => {
    const colorMap = {
      academic: 'text-capas-turquoise',
      cultural: 'text-capas-coral',
      exam: 'text-red-600',
      assignment: 'text-capas-gold',
      holiday: 'text-capas-coral',
      weather: 'text-orange-600',
      emergency: 'text-red-700',
      personal: 'text-capas-ocean'
    };
    return colorMap[type] || 'text-capas-ocean';
  };
  
  const getEventTypeBgColor = (type: CalendarEventType['type']) => {
    const bgMap = {
      academic: 'bg-capas-turquoise/10',
      cultural: 'bg-capas-coral/10',
      exam: 'bg-red-50',
      assignment: 'bg-capas-gold/10',
      holiday: 'bg-capas-coral/10',
      weather: 'bg-orange-50',
      emergency: 'bg-red-50',
      personal: 'bg-capas-ocean/10'
    };
    return bgMap[type] || 'bg-capas-ocean/10';
  };
  
  const getEventTypeBorderColor = (type: CalendarEventType['type']) => {
    const borderMap = {
      academic: 'border-capas-turquoise/20',
      cultural: 'border-capas-coral/20',
      exam: 'border-red-200',
      assignment: 'border-capas-gold/20',
      holiday: 'border-capas-coral/20',
      weather: 'border-orange-200',
      emergency: 'border-red-200',
      personal: 'border-capas-ocean/20'
    };
    return borderMap[type] || 'border-capas-ocean/20';
  };

  const getWeatherInfo = () => {
    // Mock Caribbean weather - typically warm and sunny
    const weatherOptions = [
      { temp: '84°F', condition: 'Sunny', icon: '☀️', humidity: '65%', wind: '12 mph E' },
      { temp: '82°F', condition: 'Partly Cloudy', icon: '⛅', humidity: '70%', wind: '8 mph SE' },
      { temp: '79°F', condition: 'Light Rain', icon: '🌦️', humidity: '85%', wind: '15 mph E' }
    ];
    
    return weatherOptions[0]; // Default to sunny for demo
  };

  const weather = getWeatherInfo();

  return (
    <div className="space-y-8">
      {/* Header with Caribbean Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-ocean to-capas-turquoise rounded-2xl p-8 text-white relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,150 Q100,100 200,150 T400,150 L400,200 L0,200 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CalendarIcon className="h-8 w-8" />
              <h1 className="font-display text-3xl md:text-4xl font-bold">
                {getGreeting()}
              </h1>
              <SparklesIcon className="h-6 w-6" />
            </div>
            
            {/* Nassau Weather */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl mb-1">{weather.icon}</div>
              <div className="text-lg font-semibold">{weather.temp}</div>
              <div className="text-xs opacity-90">Nassau</div>
            </div>
          </div>
          
          <p className="text-white/90 text-lg mb-4">
            Your Caribbean academic calendar - plan your island time wisely! 🏝️
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>
                {currentTime.toLocaleTimeString('en-US', { 
                  hour: 'numeric',
                  minute: '2-digit',
                  timeZone: 'America/Nassau'
                })} BST
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-5 w-5" />
              <span>{mockStudent?.island || 'New Providence'}, Bahamas</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-5 w-5" />
              <span>{todaysEvents.length} events today</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>{upcomingCalendarEvents.length} upcoming events</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Today's Schedule & Weather */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2 card-capas p-6"
        >
          <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
            Today's Schedule
          </h3>
          
          {todaysEvents.length > 0 ? (
            <div className="space-y-4">
              {todaysEvents.map((event) => {
                // Handle both student events and calendar events
                const isCalendarEvent = 'start' in event;
                const displayTime = isCalendarEvent 
                  ? (event as CalendarEventType).start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                  : (event as any).time;
                const displayLocation = isCalendarEvent 
                  ? (event as CalendarEventType).location || 'TBA'
                  : (event as any).location;
                const displayType = isCalendarEvent 
                  ? (event as CalendarEventType).type
                  : (event as any).type;
                const displayColor = isCalendarEvent 
                  ? getEventTypeColor((event as CalendarEventType).type)
                  : (event as any).color;
                  
                return (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-capas-sand-light rounded-lg hover:bg-capas-sand transition-colors cursor-pointer"
                       onClick={() => setSelectedEvent(event)}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        isCalendarEvent && (event as CalendarEventType).priority === 'urgent' 
                          ? 'bg-red-500' 
                          : isCalendarEvent && (event as CalendarEventType).priority === 'high'
                          ? 'bg-capas-coral'
                          : 'bg-capas-turquoise'
                      }`}></div>
                      <div>
                        <h4 className="font-medium text-capas-ocean-dark">{event.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-capas-ocean-dark/70">
                          <span className="flex items-center space-x-1">
                            <ClockIcon className="h-4 w-4" />
                            <span>{displayTime}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPinIcon className="h-4 w-4" />
                            <span>{displayLocation}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${displayColor}`}>
                      {displayType.charAt(0).toUpperCase() + displayType.slice(1)}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <SunIcon className="h-16 w-16 text-capas-gold mx-auto mb-4" />
              <h4 className="font-medium text-capas-ocean-dark mb-2">Free Island Day!</h4>
              <p className="text-capas-ocean-dark/70">No scheduled events today. Perfect time for beach study sessions! 🏖️</p>
            </div>
          )}
        </motion.div>

        {/* Weather & Island Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card-capas p-6">
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
              Nassau Weather
            </h3>
            <div className="text-center">
              <div className="text-6xl mb-2">{weather.icon}</div>
              <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{weather.temp}</div>
              <div className="text-lg text-capas-ocean-dark/80 mb-4">{weather.condition}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-capas-ocean-dark/60">Humidity</div>
                  <div className="font-medium">{weather.humidity}</div>
                </div>
                <div>
                  <div className="text-capas-ocean-dark/60">Wind</div>
                  <div className="font-medium">{weather.wind}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-capas p-6">
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
              Cultural Events
            </h3>
            <div className="space-y-3">
              {upcomingCalendarEvents
                .filter(event => event.type === 'cultural' || event.type === 'holiday')
                .slice(0, 3)
                .map((event) => (
                  <div key={event.id} className={`p-3 rounded-lg border ${getEventTypeBgColor(event.type)} ${getEventTypeBorderColor(event.type)} cursor-pointer hover:shadow-sm transition-shadow`}
                       onClick={() => setSelectedEvent(event)}>
                    <h4 className="font-medium text-capas-ocean-dark text-sm">{event.title}</h4>
                    <p className="text-xs text-capas-ocean-dark/70 mt-1">
                      {event.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • 
                      {event.isAllDay ? 'All Day' : event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </p>
                    {event.weatherDependent && (
                      <span className="inline-flex items-center text-xs text-orange-600 mt-1">
                        ⛅ Weather dependent
                      </span>
                    )}
                  </div>
                ))
              }
              {upcomingCalendarEvents.filter(event => event.type === 'cultural' || event.type === 'holiday').length === 0 && (
                <p className="text-sm text-capas-ocean-dark/60 italic">No upcoming cultural events</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Calendar Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="card-capas p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-semibold text-capas-turquoise">
            Academic Calendar
          </h3>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            {['month', 'week', 'day'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  viewMode === mode
                    ? 'bg-capas-turquoise text-white'
                    : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <CalendarView 
          viewMode={viewMode}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          events={upcomingEventsFiltered}
          onEventClick={(event: CalendarEvent) => setSelectedEvent(event)}
        />
        
        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-capas-turquoise/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-capas-turquoise">
              {upcomingCalendarEvents.filter(e => e.type === 'academic').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Academic Events</div>
          </div>
          <div className="bg-capas-coral/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-capas-coral">
              {upcomingCalendarEvents.filter(e => e.type === 'cultural' || e.type === 'holiday').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Cultural Events</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {upcomingCalendarEvents.filter(e => e.type === 'exam').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Exams</div>
          </div>
          <div className="bg-capas-gold/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-capas-gold">
              {upcomingCalendarEvents.filter(e => e.type === 'assignment').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Assignments</div>
          </div>
        </div>
      </motion.div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetails 
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}