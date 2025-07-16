// Calendar events data for CAPAS School Portal
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  type: 'academic' | 'cultural' | 'personal' | 'assignment' | 'exam' | 'holiday' | 'weather' | 'emergency';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attendees?: string[];
  instructor?: string;
  course?: string;
  isAllDay: boolean;
  isRecurring: boolean;
  color: string;
  tags: string[];
  weatherDependent?: boolean;
  registrationRequired?: boolean;
  capacity?: number;
  enrolled?: number;
}

// Generate calendar events for the academic year
export function generateCalendarEvents(): CalendarEvent[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const events: CalendarEvent[] = [
    // Academic Events
    {
      id: 'fall-orientation',
      title: 'Fall Semester Orientation',
      description: 'Welcome new and returning students to CAPAS for Fall 2024',
      start: new Date(2024, 7, 26, 9, 0), // August 26, 2024
      end: new Date(2024, 7, 26, 17, 0),
      location: 'Main Amphitheater',
      type: 'academic',
      priority: 'high',
      attendees: ['All Students', 'Faculty', 'Staff'],
      isAllDay: false,
      isRecurring: false,
      color: '#0A8A98',
      tags: ['Orientation', 'Academic', 'Required'],
      registrationRequired: true,
      capacity: 300,
      enrolled: 247
    },
    {
      id: 'classes-begin',
      title: 'Fall Classes Begin',
      description: 'First day of Fall 2024 semester classes',
      start: new Date(2024, 7, 28, 8, 0), // August 28, 2024
      end: new Date(2024, 7, 28, 18, 0),
      type: 'academic',
      priority: 'high',
      isAllDay: true,
      isRecurring: false,
      color: '#0A8A98',
      tags: ['Academic', 'Semester Start']
    },
    {
      id: 'add-drop-deadline',
      title: 'Add/Drop Deadline',
      description: 'Last day to add or drop courses without penalty',
      start: new Date(2024, 8, 6, 23, 59), // September 6, 2024
      end: new Date(2024, 8, 6, 23, 59),
      type: 'academic',
      priority: 'urgent',
      isAllDay: true,
      isRecurring: false,
      color: '#FF8B87',
      tags: ['Deadline', 'Registration', 'Important']
    },

    // Cultural Events
    {
      id: 'junkanoo-festival',
      title: 'CAPAS Junkanoo Festival',
      description: 'Annual celebration of Bahamian culture with student performances, traditional music, and local food',
      start: new Date(2024, 6, 19, 18, 0), // July 19, 2024
      end: new Date(2024, 6, 19, 22, 0),
      location: 'Main Courtyard',
      type: 'cultural',
      priority: 'high',
      attendees: ['Students', 'Faculty', 'Community'],
      isAllDay: false,
      isRecurring: true,
      color: '#FFCE00',
      tags: ['Junkanoo', 'Cultural', 'Performance', 'Community'],
      weatherDependent: true,
      registrationRequired: false
    },
    {
      id: 'independence-day',
      title: 'Bahamas Independence Day',
      description: 'Celebration of Bahamian independence with special ceremonies and cultural activities',
      start: new Date(2024, 6, 10, 0, 0), // July 10, 2024
      end: new Date(2024, 6, 10, 23, 59),
      type: 'holiday',
      priority: 'high',
      isAllDay: true,
      isRecurring: true,
      color: '#FFCE00',
      tags: ['Independence', 'National Holiday', 'Cultural']
    },
    {
      id: 'emancipation-day',
      title: 'Emancipation Day',
      description: 'Commemoration with historical presentations and cultural performances',
      start: new Date(2024, 7, 1, 0, 0), // August 1, 2024
      end: new Date(2024, 7, 1, 23, 59),
      type: 'holiday',
      priority: 'high',
      isAllDay: true,
      isRecurring: true,
      color: '#FFCE00',
      tags: ['Emancipation', 'History', 'Cultural']
    },

    // Course-specific Events
    {
      id: 'music-theory-midterm',
      title: 'Music Theory Midterm Exam',
      description: 'MUS-150 midterm examination covering Caribbean harmonic structures',
      start: new Date(2024, 6, 16, 14, 0), // July 16, 2024
      end: new Date(2024, 6, 16, 16, 0),
      location: 'Music Studio A',
      type: 'exam',
      priority: 'high',
      instructor: 'Dr. James Roberts',
      course: 'MUS-150',
      isAllDay: false,
      isRecurring: false,
      color: '#FF8B87',
      tags: ['Exam', 'Music', 'Midterm']
    },
    {
      id: 'steel-drum-rehearsal',
      title: 'Steel Drum Ensemble Rehearsal',
      description: 'Weekly rehearsal for upcoming performance',
      start: new Date(2024, 6, 19, 13, 0), // July 19, 2024
      end: new Date(2024, 6, 19, 16, 0),
      location: 'Steel Drum Pavilion',
      type: 'academic',
      priority: 'medium',
      instructor: 'Master Tony Williams',
      course: 'MUS-350',
      isAllDay: false,
      isRecurring: true,
      color: '#7FA900',
      tags: ['Music', 'Performance', 'Rehearsal']
    },
    {
      id: 'marine-field-trip',
      title: 'Marine Biology Field Trip',
      description: 'Exploration of Andros Blue Hole ecosystem with underwater photography',
      start: new Date(2024, 6, 16, 8, 0), // July 16, 2024
      end: new Date(2024, 6, 16, 17, 0),
      location: 'Andros Island - Blue Hole',
      type: 'academic',
      priority: 'high',
      instructor: 'Dr. Sarah Bethel',
      course: 'MAR-101',
      isAllDay: false,
      isRecurring: false,
      color: '#A8D5E2',
      tags: ['Field Trip', 'Marine Biology', 'Excursion'],
      weatherDependent: true,
      registrationRequired: true,
      capacity: 18,
      enrolled: 15
    },

    // Assignment Deadlines
    {
      id: 'digital-arts-project',
      title: 'Digital Arts Project Due',
      description: 'Caribbean Music Production final project submission deadline',
      start: new Date(2024, 6, 15, 23, 59), // July 15, 2024
      end: new Date(2024, 6, 15, 23, 59),
      type: 'assignment',
      priority: 'urgent',
      course: 'MUS-201',
      instructor: 'Prof. Marcus Thompson',
      isAllDay: false,
      isRecurring: false,
      color: '#FF8B87',
      tags: ['Assignment', 'Deadline', 'Digital Arts']
    },
    {
      id: 'choreography-presentation',
      title: 'Senior Choreography Presentation',
      description: 'Final choreographic work presentation to faculty panel',
      start: new Date(2024, 6, 20, 15, 0), // July 20, 2024
      end: new Date(2024, 6, 20, 17, 0),
      location: 'Main Dance Studio',
      type: 'exam',
      priority: 'high',
      instructor: 'Prof. Denise Miller',
      course: 'DAN-401',
      isAllDay: false,
      isRecurring: false,
      color: '#FF8B87',
      tags: ['Presentation', 'Dance', 'Senior Project']
    },

    // Weather Events
    {
      id: 'hurricane-watch',
      title: 'Hurricane Watch - Classes Online',
      description: 'Tropical storm approaching. All classes moved to online format.',
      start: new Date(2024, 6, 15, 0, 0), // July 15, 2024
      end: new Date(2024, 6, 16, 23, 59),
      type: 'weather',
      priority: 'urgent',
      isAllDay: true,
      isRecurring: false,
      color: '#FF8B87',
      tags: ['Weather', 'Hurricane', 'Online Classes', 'Emergency']
    },

    // Personal Events (would be user-specific in real app)
    {
      id: 'study-group',
      title: 'Music Theory Study Group',
      description: 'Group study session for upcoming midterm',
      start: new Date(2024, 6, 15, 19, 0), // July 15, 2024
      end: new Date(2024, 6, 15, 21, 0),
      location: 'Library Study Room B',
      type: 'personal',
      priority: 'medium',
      isAllDay: false,
      isRecurring: false,
      color: '#A8D5E2',
      tags: ['Study', 'Group', 'Academic']
    },

    // Upcoming Events
    {
      id: 'graduation-rehearsal',
      title: 'Graduation Ceremony Rehearsal',
      description: 'Final rehearsal for commencement ceremony',
      start: new Date(2024, 6, 25, 10, 0), // July 25, 2024
      end: new Date(2024, 6, 25, 12, 0),
      location: 'Amphitheater',
      type: 'academic',
      priority: 'high',
      isAllDay: false,
      isRecurring: false,
      color: '#FFCE00',
      tags: ['Graduation', 'Ceremony', 'Rehearsal']
    },
    {
      id: 'parent-info-session',
      title: 'Parent Information Session',
      description: 'Virtual Q&A session for prospective student families',
      start: new Date(2024, 6, 20, 16, 0), // July 20, 2024
      end: new Date(2024, 6, 20, 17, 30),
      location: 'Virtual/Zoom',
      type: 'academic',
      priority: 'medium',
      isAllDay: false,
      isRecurring: false,
      color: '#0A8A98',
      tags: ['Information', 'Parents', 'Virtual', 'Admission']
    }
  ];

  return events;
}

// Filter events by type
export function getEventsByType(events: CalendarEvent[], type: CalendarEvent['type']): CalendarEvent[] {
  return events.filter(event => event.type === type);
}

// Get events for a specific date
export function getEventsForDate(events: CalendarEvent[], date: Date): CalendarEvent[] {
  return events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === date.toDateString();
  });
}

// Get upcoming events (next 7 days)
export function getUpcomingEvents(events: CalendarEvent[], daysAhead: number = 7): CalendarEvent[] {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + daysAhead);

  return events
    .filter(event => event.start >= now && event.start <= futureDate)
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

// Get events by priority
export function getEventsByPriority(events: CalendarEvent[], priority: CalendarEvent['priority']): CalendarEvent[] {
  return events.filter(event => event.priority === priority);
}

// Check for weather-dependent events
export function getWeatherDependentEvents(events: CalendarEvent[]): CalendarEvent[] {
  return events.filter(event => event.weatherDependent === true);
}