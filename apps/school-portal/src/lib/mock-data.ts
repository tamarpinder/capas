import { ExtendedUser } from './auth';

// Bahamian mock data with cultural context
export interface MockStudent extends ExtendedUser {
  studentId: string;
  bio: string;
  island: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notifications: Notification[];
  upcomingEvents: StudentEvent[];
  recentActivity: Activity[];
  courses: Course[];
  grades: Grade[];
  preferences: {
    timezone: string;
    language: string;
    notifications: boolean;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'urgent';
  timestamp: string;
  read: boolean;
  category: 'academic' | 'administrative' | 'event' | 'weather' | 'emergency';
}

export interface StudentEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'class' | 'assignment' | 'exam' | 'event' | 'festival' | 'excursion';
  color: string;
  weatherDependent?: boolean;
}

export interface Activity {
  id: string;
  action: string;
  subject: string;
  time: string;
  status: 'completed' | 'graded' | 'enrolled' | 'submitted' | 'pending';
  grade?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  semester: string;
  room: string;
  schedule: string;
  description: string;
  progress: number;
}

export interface Grade {
  courseId: string;
  courseName: string;
  assignments: {
    name: string;
    grade: string;
    weight: number;
    date: string;
  }[];
  currentGrade: string;
  gpa: number;
}

// Demo student profiles with rich Bahamian context
export const mockStudents: Record<string, MockStudent> = {
  'sophia.chen@capas.edu.bs': {
    id: '1',
    email: 'sophia.chen@capas.edu.bs',
    name: 'Sophia Chen',
    firstName: 'Sophia',
    lastName: 'Chen',
    studentId: 'CAP2024-001',
    program: 'Music Performance & Production',
    year: 2,
    gpa: 3.7,
    avatar: '/images/students/sophia-chen.jpg',
    bio: 'Passionate about Caribbean music fusion and digital music production. Born in Nassau, moved from Hong Kong at age 12.',
    island: 'New Providence',
    role: 'student',
    enrolledCourses: ['MUS-201', 'MUS-150', 'GEN-101'],
    achievements: ['Dean\'s List Fall 2023', 'Outstanding Performance in Caribbean Music Studies'],
    emergencyContact: {
      name: 'Li Wei Chen',
      relationship: 'Mother',
      phone: '+1-242-555-0123'
    },
    preferences: {
      timezone: 'America/Nassau',
      language: 'English',
      notifications: true
    },
    notifications: [
      {
        id: '1',
        title: 'Hurricane Watch Issued',
        message: 'Tropical Storm approaching. All Tuesday classes will be online. Check your email for Zoom links.',
        type: 'warning',
        timestamp: '2024-07-15T08:00:00-05:00',
        read: false,
        category: 'weather'
      },
      {
        id: '2',
        title: 'Digital Arts Project Due Soon',
        message: 'Your Caribbean Music Production project is due tonight at 11:59 PM.',
        type: 'urgent',
        timestamp: '2024-07-15T10:30:00-05:00',
        read: false,
        category: 'academic'
      },
      {
        id: '3',
        title: 'Junkanoo Festival Registration Open',
        message: 'Sign up to perform at the annual CAPAS Junkanoo celebration!',
        type: 'info',
        timestamp: '2024-07-14T14:20:00-05:00',
        read: true,
        category: 'event'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Digital Arts Project Due',
        description: 'Submit your Caribbean Music Production final project',
        date: '2024-07-15',
        time: '23:59',
        location: 'Online Submission',
        type: 'assignment',
        color: 'text-capas-coral'
      },
      {
        id: '2',
        title: 'Music Theory Class',
        description: 'Advanced harmony and Caribbean rhythm patterns',
        date: '2024-07-16',
        time: '14:00',
        location: 'Music Studio A',
        type: 'class',
        color: 'text-capas-turquoise'
      },
      {
        id: '3',
        title: 'Junkanoo Arts Festival',
        description: 'Annual celebration of Bahamian culture with student performances',
        date: '2024-07-19',
        time: '18:00',
        location: 'CAPAS Main Courtyard',
        type: 'festival',
        color: 'text-capas-gold',
        weatherDependent: true
      },
      {
        id: '4',
        title: 'Studio Recording Session',
        description: 'Individual recording time for music portfolio',
        date: '2024-07-22',
        time: '09:00',
        location: 'Recording Studio B',
        type: 'class',
        color: 'text-capas-palm'
      }
    ] as StudentEvent[],
    recentActivity: [
      {
        id: '1',
        action: 'Submitted assignment',
        subject: 'Caribbean Music Production',
        time: '2 hours ago',
        status: 'submitted'
      },
      {
        id: '2',
        action: 'Grade received',
        subject: 'Music Theory Midterm',
        time: '1 day ago',
        status: 'graded',
        grade: 'A-'
      },
      {
        id: '3',
        action: 'Enrolled in workshop',
        subject: 'Steel Drum Techniques',
        time: '3 days ago',
        status: 'enrolled'
      }
    ],
    courses: [
      {
        id: 'MUS-201',
        name: 'Caribbean Music Production',
        code: 'MUS-201',
        instructor: 'Dr. Marcus Thompson',
        credits: 3,
        semester: 'Summer 2024',
        room: 'Digital Lab 1',
        schedule: 'Mon/Wed 2:00-3:30 PM',
        description: 'Explore traditional and contemporary Caribbean music production techniques',
        progress: 75
      },
      {
        id: 'MUS-150',
        name: 'Music Theory & Composition',
        code: 'MUS-150',
        instructor: 'Prof. Aaliyah Williams',
        credits: 4,
        semester: 'Summer 2024',
        room: 'Music Studio A',
        schedule: 'Tue/Thu 10:00-11:30 AM',
        description: 'Advanced music theory with focus on Caribbean harmonic structures',
        progress: 82
      },
      {
        id: 'GEN-101',
        name: 'Caribbean Cultural Studies',
        code: 'GEN-101',
        instructor: 'Dr. Patricia Rolle',
        credits: 3,
        semester: 'Summer 2024',
        room: 'Classroom C',
        schedule: 'Fri 1:00-4:00 PM',
        description: 'Comprehensive study of Bahamian and Caribbean cultural heritage',
        progress: 90
      }
    ],
    grades: [
      {
        courseId: 'MUS-201',
        courseName: 'Caribbean Music Production',
        assignments: [
          { name: 'Rhythm Pattern Assignment', grade: 'B+', weight: 20, date: '2024-07-01' },
          { name: 'Midterm Project', grade: 'A-', weight: 30, date: '2024-07-08' },
          { name: 'Final Project', grade: 'Pending', weight: 50, date: '2024-07-15' }
        ],
        currentGrade: 'A-',
        gpa: 3.7
      }
    ]
  },

  'marcus.williams@student.capas.edu.bs': {
    id: '2',
    email: 'marcus.williams@student.capas.edu.bs',
    name: 'Marcus Williams',
    firstName: 'Marcus',
    lastName: 'Williams',
    studentId: 'CAP2024-156',
    program: 'Marine Conservation & Arts',
    year: 1,
    gpa: 3.9,
    avatar: '/images/students/marcus-williams.jpg',
    bio: 'First-generation college student from Eleuthera, passionate about marine conservation and underwater photography.',
    island: 'Eleuthera',
    role: 'student',
    enrolledCourses: ['BIO-110', 'ART-105', 'GEN-101'],
    achievements: ['Presidential Scholarship Recipient', 'Outstanding Community Service'],
    emergencyContact: {
      name: 'Janet Williams',
      relationship: 'Grandmother',
      phone: '+1-242-555-0456'
    },
    preferences: {
      timezone: 'America/Nassau',
      language: 'English',
      notifications: true
    },
    notifications: [
      {
        id: '1',
        title: 'Field Trip Tomorrow',
        message: 'Marine Biology field trip to Andros Blue Hole. Meet at dock 8:00 AM.',
        type: 'info',
        timestamp: '2024-07-15T16:00:00-05:00',
        read: false,
        category: 'academic'
      },
      {
        id: '2',
        title: 'Scholarship Disbursement',
        message: 'Your Presidential Scholarship has been applied to your account.',
        type: 'success',
        timestamp: '2024-07-14T09:00:00-05:00',
        read: true,
        category: 'administrative'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Marine Biology Field Trip',
        description: 'Explore Andros Blue Hole ecosystem',
        date: '2024-07-16',
        time: '08:00',
        location: 'Nassau Harbor Dock 3',
        type: 'excursion',
        color: 'text-capas-ocean',
        weatherDependent: true
      },
      {
        id: '2',
        title: 'Underwater Photography Workshop',
        description: 'Learn techniques for marine life documentation',
        date: '2024-07-18',
        time: '13:00',
        location: 'Pool & Diving Center',
        type: 'class',
        color: 'text-capas-turquoise'
      }
    ] as StudentEvent[],
    recentActivity: [
      {
        id: '1',
        action: 'Completed assignment',
        subject: 'Marine Ecosystems Essay',
        time: '4 hours ago',
        status: 'submitted'
      },
      {
        id: '2',
        action: 'Enrolled in course',
        subject: 'Advanced Diving Certification',
        time: '2 days ago',
        status: 'enrolled'
      }
    ],
    courses: [
      {
        id: 'BIO-110',
        name: 'Marine Biology Fundamentals',
        code: 'BIO-110',
        instructor: 'Dr. Sarah Bethel',
        credits: 4,
        semester: 'Summer 2024',
        room: 'Marine Lab',
        schedule: 'Mon/Wed/Fri 9:00-10:30 AM',
        description: 'Introduction to Caribbean marine ecosystems and conservation',
        progress: 65
      }
    ],
    grades: []
  },

  'aaliyah.thompson@capas.edu.bs': {
    id: '3',
    email: 'aaliyah.thompson@capas.edu.bs',
    name: 'Aaliyah Thompson',
    firstName: 'Aaliyah',
    lastName: 'Thompson',
    studentId: 'CAP2022-089',
    program: 'Contemporary Dance & Choreography',
    year: 4,
    gpa: 3.8,
    avatar: '/images/students/aaliyah-thompson.jpg',
    bio: 'Senior dance major from Freeport, specializing in Caribbean contemporary fusion and traditional Junkanoo dance.',
    island: 'Grand Bahama',
    role: 'student',
    enrolledCourses: ['DAN-401', 'DAN-350', 'THE-200'],
    achievements: ['Outstanding Performer 2023', 'Choreography Competition Winner', 'Student Leadership Award'],
    emergencyContact: {
      name: 'Michael Thompson',
      relationship: 'Father',
      phone: '+1-242-555-0789'
    },
    preferences: {
      timezone: 'America/Nassau',
      language: 'English',
      notifications: true
    },
    notifications: [
      {
        id: '1',
        title: 'Senior Showcase Auditions',
        message: 'Submit your choreography piece for the graduation showcase by July 20th.',
        type: 'urgent',
        timestamp: '2024-07-15T11:00:00-05:00',
        read: false,
        category: 'academic'
      },
      {
        id: '2',
        title: 'Graduation Requirements Check',
        message: 'Schedule meeting with advisor to review graduation requirements.',
        type: 'info',
        timestamp: '2024-07-14T13:30:00-05:00',
        read: false,
        category: 'administrative'
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Senior Choreography Presentation',
        description: 'Present final choreographic work to faculty panel',
        date: '2024-07-20',
        time: '15:00',
        location: 'Main Dance Studio',
        type: 'exam',
        color: 'text-capas-coral'
      },
      {
        id: '2',
        title: 'Graduation Ceremony Rehearsal',
        description: 'Final rehearsal for commencement ceremony',
        date: '2024-07-25',
        time: '10:00',
        location: 'Amphitheater',
        type: 'event',
        color: 'text-capas-gold'
      }
    ] as StudentEvent[],
    recentActivity: [
      {
        id: '1',
        action: 'Submitted portfolio',
        subject: 'Senior Capstone Project',
        time: '6 hours ago',
        status: 'submitted'
      },
      {
        id: '2',
        action: 'Performance completed',
        subject: 'Contemporary Caribbean Fusion',
        time: '2 days ago',
        status: 'graded',
        grade: 'A'
      }
    ],
    courses: [
      {
        id: 'DAN-401',
        name: 'Senior Capstone Project',
        code: 'DAN-401',
        instructor: 'Prof. Denise Miller',
        credits: 6,
        semester: 'Summer 2024',
        room: 'Main Dance Studio',
        schedule: 'Independent Study',
        description: 'Original choreographic work demonstrating mastery of dance technique and cultural understanding',
        progress: 95
      }
    ],
    grades: []
  }
};

// Caribbean cultural calendar events
export const bahamianEvents = [
  {
    name: 'Junkanoo Boxing Day',
    date: '2024-12-26',
    description: 'Traditional Bahamian cultural parade and celebration'
  },
  {
    name: 'Junkanoo New Year',
    date: '2025-01-01',
    description: 'New Year Junkanoo parade in Nassau'
  },
  {
    name: 'Independence Day',
    date: '2024-07-10',
    description: 'Bahamas Independence Day celebration'
  },
  {
    name: 'Emancipation Day',
    date: '2024-08-01',
    description: 'Commemoration of the end of slavery in the British Empire'
  },
  {
    name: 'Discovery Day',
    date: '2024-10-12',
    description: 'Columbus Day/Indigenous Peoples Day'
  }
];

// Weather-aware messaging for Bahamas
export const weatherMessages = {
  hurricane: "Hurricane season is active. Stay tuned for updates and follow all evacuation orders if issued.",
  storm: "Tropical storm conditions expected. All outdoor activities moved indoors.",
  heat: "Heat advisory in effect. Stay hydrated and take breaks in air conditioning.",
  rain: "Heavy rain forecast. Outdoor events may be relocated to covered areas."
};

// Time-aware greetings with Caribbean context
export const generateGreeting = (hour: number, userName: string, upcomingEvents: StudentEvent[] = []) => {
  const hasExam = upcomingEvents.some(event => event.type === 'exam');
  const hasAssignment = upcomingEvents.some(event => event.type === 'assignment');
  const isJunkanoo = new Date().getMonth() === 11 && (new Date().getDate() === 26 || new Date().getDate() === 1);
  
  if (isJunkanoo) {
    return `Happy Junkanoo, ${userName}! 🥁 May your day be filled with rhythm and joy!`;
  }
  
  if (hour < 12) {
    if (hasExam) {
      return `Good morning, ${userName}! ☀️ Ready to ace that exam today? You've got this!`;
    }
    return `Good morning, ${userName}! ☀️ Another beautiful Caribbean day awaits!`;
  } else if (hour < 17) {
    if (hasAssignment) {
      return `Good afternoon, ${userName}! 🌴 Don't forget your assignment due today!`;
    }
    return `Good afternoon, ${userName}! 🌴 Hope you're having a productive day!`;
  } else {
    return `Good evening, ${userName}! 🌅 Time to unwind and reflect on the day's achievements.`;
  }
};

// Get student by email
export const getStudentByEmail = (email: string): MockStudent | null => {
  return mockStudents[email] || null;
};

// Get all available demo emails for login selection
export const getDemoUserEmails = (): string[] => {
  return Object.keys(mockStudents);
};