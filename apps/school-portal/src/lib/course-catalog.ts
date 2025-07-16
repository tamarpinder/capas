// Mock course catalog data for CAPAS
export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  prerequisites: string[];
  instructor: string;
  department: string;
  semester: string;
  schedule: {
    days: string[];
    time: string;
    location: string;
  };
  capacity: number;
  enrolled: number;
  waitlist: number;
  status: 'open' | 'waitlist' | 'closed';
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const courseCatalog: Course[] = [
  // Music Department
  {
    id: 'MUS-101',
    code: 'MUS-101',
    title: 'Introduction to Caribbean Music',
    description: 'Explore the rich musical traditions of the Caribbean, including calypso, reggae, soca, and traditional folk music. Learn about cultural contexts and historical significance.',
    credits: 3,
    prerequisites: [],
    instructor: 'Dr. James Roberts',
    department: 'Music',
    semester: 'Fall 2024',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '10:00 AM - 11:30 AM',
      location: 'Music Hall 101'
    },
    capacity: 25,
    enrolled: 18,
    waitlist: 2,
    status: 'open',
    tags: ['Caribbean Culture', 'Music Theory', 'Cultural Studies'],
    level: 'beginner'
  },
  {
    id: 'MUS-201',
    code: 'MUS-201',
    title: 'Caribbean Music Production',
    description: 'Learn digital music production techniques with focus on Caribbean genres. Covers software, recording, mixing, and mastering.',
    credits: 4,
    prerequisites: ['MUS-101'],
    instructor: 'Prof. Marcus Thompson',
    department: 'Music',
    semester: 'Fall 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '2:00 PM - 4:00 PM',
      location: 'Digital Studio A'
    },
    capacity: 15,
    enrolled: 12,
    waitlist: 0,
    status: 'open',
    tags: ['Digital Production', 'Technology', 'Recording'],
    level: 'intermediate'
  },
  {
    id: 'MUS-350',
    code: 'MUS-350',
    title: 'Steel Drum Ensemble',
    description: 'Practical ensemble experience playing traditional Caribbean steel drums. Performance opportunities and cultural immersion.',
    credits: 2,
    prerequisites: ['MUS-101'],
    instructor: 'Master Tony Williams',
    department: 'Music',
    semester: 'Fall 2024',
    schedule: {
      days: ['Friday'],
      time: '1:00 PM - 4:00 PM',
      location: 'Steel Drum Pavilion'
    },
    capacity: 20,
    enrolled: 20,
    waitlist: 5,
    status: 'waitlist',
    tags: ['Performance', 'Traditional Music', 'Ensemble'],
    level: 'intermediate'
  },

  // Visual Arts Department
  {
    id: 'ART-110',
    code: 'ART-110',
    title: 'Caribbean Visual Arts History',
    description: 'Survey of visual arts in the Caribbean from pre-Columbian times to contemporary works. Focus on local Bahamian artists.',
    credits: 3,
    prerequisites: [],
    instructor: 'Dr. Sarah Johnson',
    department: 'Visual Arts',
    semester: 'Fall 2024',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '9:00 AM - 10:00 AM',
      location: 'Art Building 201'
    },
    capacity: 30,
    enrolled: 25,
    waitlist: 1,
    status: 'open',
    tags: ['Art History', 'Caribbean Culture', 'Cultural Studies'],
    level: 'beginner'
  },
  {
    id: 'ART-205',
    code: 'ART-205',
    title: 'Digital Arts & Design',
    description: 'Introduction to digital art creation using industry-standard software. Focus on graphic design, digital illustration, and web design.',
    credits: 4,
    prerequisites: ['ART-110'],
    instructor: 'Prof. Maria Rodriguez',
    department: 'Visual Arts',
    semester: 'Fall 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '10:00 AM - 12:00 PM',
      location: 'Computer Lab 1'
    },
    capacity: 20,
    enrolled: 15,
    waitlist: 0,
    status: 'open',
    tags: ['Digital Art', 'Technology', 'Design'],
    level: 'intermediate'
  },
  {
    id: 'ART-310',
    code: 'ART-310',
    title: 'Traditional Bahamian Crafts',
    description: 'Hands-on workshop in traditional Bahamian crafts including straw work, wood carving, and ceramics.',
    credits: 3,
    prerequisites: [],
    instructor: 'Master Craftsman John Rolle',
    department: 'Visual Arts',
    semester: 'Fall 2024',
    schedule: {
      days: ['Saturday'],
      time: '9:00 AM - 3:00 PM',
      location: 'Craft Workshop'
    },
    capacity: 12,
    enrolled: 12,
    waitlist: 8,
    status: 'closed',
    tags: ['Traditional Crafts', 'Hands-on', 'Cultural Heritage'],
    level: 'beginner'
  },

  // Dance & Theatre
  {
    id: 'DAN-150',
    code: 'DAN-150',
    title: 'Caribbean Dance Forms',
    description: 'Study and practice traditional Caribbean dance forms including Junkanoo, calypso, and contemporary Caribbean fusion.',
    credits: 3,
    prerequisites: [],
    instructor: 'Prof. Aaliyah Williams',
    department: 'Dance & Theatre',
    semester: 'Fall 2024',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '11:00 AM - 12:00 PM',
      location: 'Dance Studio A'
    },
    capacity: 25,
    enrolled: 22,
    waitlist: 3,
    status: 'open',
    tags: ['Dance', 'Performance', 'Cultural Expression'],
    level: 'beginner'
  },
  {
    id: 'THE-200',
    code: 'THE-200',
    title: 'Caribbean Theatre & Performance',
    description: 'Exploration of Caribbean theatre traditions, storytelling, and performance arts with emphasis on Bahamian folklore.',
    credits: 4,
    prerequisites: [],
    instructor: 'Dr. Michael Clarke',
    department: 'Dance & Theatre',
    semester: 'Fall 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '6:00 PM - 8:00 PM',
      location: 'Black Box Theatre'
    },
    capacity: 20,
    enrolled: 16,
    waitlist: 0,
    status: 'open',
    tags: ['Theatre', 'Performance', 'Storytelling'],
    level: 'intermediate'
  },

  // Marine Arts & Conservation
  {
    id: 'MAR-101',
    code: 'MAR-101',
    title: 'Marine Ecosystem Fundamentals',
    description: 'Introduction to Caribbean marine ecosystems, biodiversity, and conservation principles with field study components.',
    credits: 4,
    prerequisites: [],
    instructor: 'Dr. Sarah Bethel',
    department: 'Marine Studies',
    semester: 'Fall 2024',
    schedule: {
      days: ['Monday', 'Wednesday'],
      time: '8:00 AM - 10:00 AM',
      location: 'Marine Lab'
    },
    capacity: 18,
    enrolled: 15,
    waitlist: 1,
    status: 'open',
    tags: ['Marine Biology', 'Conservation', 'Field Study'],
    level: 'beginner'
  },
  {
    id: 'MAR-250',
    code: 'MAR-250',
    title: 'Underwater Photography & Arts',
    description: 'Combine marine conservation with artistic expression through underwater photography and marine-inspired visual arts.',
    credits: 3,
    prerequisites: ['MAR-101', 'ART-110'],
    instructor: 'Prof. David Miller',
    department: 'Marine Studies',
    semester: 'Fall 2024',
    schedule: {
      days: ['Friday'],
      time: '9:00 AM - 3:00 PM',
      location: 'Marine Station'
    },
    capacity: 10,
    enrolled: 8,
    waitlist: 0,
    status: 'open',
    tags: ['Photography', 'Marine Arts', 'Conservation'],
    level: 'intermediate'
  },

  // General Education
  {
    id: 'GEN-101',
    code: 'GEN-101',
    title: 'Caribbean Cultural Studies',
    description: 'Comprehensive study of Caribbean culture, history, and contemporary issues with focus on Bahamian heritage.',
    credits: 3,
    prerequisites: [],
    instructor: 'Dr. Patricia Rolle',
    department: 'General Education',
    semester: 'Fall 2024',
    schedule: {
      days: ['Tuesday', 'Thursday'],
      time: '1:00 PM - 2:30 PM',
      location: 'Lecture Hall B'
    },
    capacity: 40,
    enrolled: 35,
    waitlist: 2,
    status: 'open',
    tags: ['Cultural Studies', 'History', 'Required Course'],
    level: 'beginner'
  },
  {
    id: 'ENG-102',
    code: 'ENG-102',
    title: 'Caribbean Literature & Writing',
    description: 'Study of Caribbean literature with emphasis on Bahamian authors. Develop writing skills through creative and academic assignments.',
    credits: 3,
    prerequisites: [],
    instructor: 'Prof. Janet Cooper',
    department: 'General Education',
    semester: 'Fall 2024',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '2:00 PM - 3:00 PM',
      location: 'Literature Room'
    },
    capacity: 25,
    enrolled: 20,
    waitlist: 0,
    status: 'open',
    tags: ['Literature', 'Writing', 'Required Course'],
    level: 'beginner'
  }
];

export const departments = [
  'All Departments',
  'Music',
  'Visual Arts', 
  'Dance & Theatre',
  'Marine Studies',
  'General Education'
];

export const timeSlots = [
  'All Times',
  'Morning (8:00 AM - 12:00 PM)',
  'Afternoon (12:00 PM - 5:00 PM)', 
  'Evening (5:00 PM - 9:00 PM)',
  'Weekend (Saturday - Sunday)'
];

export const creditOptions = [
  'All Credits',
  '1-2 Credits',
  '3 Credits',
  '4+ Credits'
];

export function getAvailableCourses(filters: {
  department?: string;
  timeSlot?: string;
  credits?: string;
  level?: string;
  searchTerm?: string;
}) {
  return courseCatalog.filter(course => {
    // Department filter
    if (filters.department && filters.department !== 'All Departments') {
      if (course.department !== filters.department) return false;
    }

    // Time slot filter
    if (filters.timeSlot && filters.timeSlot !== 'All Times') {
      const courseTime = course.schedule.time;
      const hour = parseInt(courseTime.split(':')[0]);
      const isPM = courseTime.includes('PM');
      const actualHour = isPM && hour !== 12 ? hour + 12 : hour;

      switch (filters.timeSlot) {
        case 'Morning (8:00 AM - 12:00 PM)':
          if (actualHour < 8 || actualHour >= 12) return false;
          break;
        case 'Afternoon (12:00 PM - 5:00 PM)':
          if (actualHour < 12 || actualHour >= 17) return false;
          break;
        case 'Evening (5:00 PM - 9:00 PM)':
          if (actualHour < 17 || actualHour >= 21) return false;
          break;
        case 'Weekend (Saturday - Sunday)':
          if (!course.schedule.days.some(day => ['Saturday', 'Sunday'].includes(day))) return false;
          break;
      }
    }

    // Credits filter
    if (filters.credits && filters.credits !== 'All Credits') {
      switch (filters.credits) {
        case '1-2 Credits':
          if (course.credits > 2) return false;
          break;
        case '3 Credits':
          if (course.credits !== 3) return false;
          break;
        case '4+ Credits':
          if (course.credits < 4) return false;
          break;
      }
    }

    // Level filter
    if (filters.level && filters.level !== 'All Levels') {
      if (course.level !== filters.level.toLowerCase()) return false;
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const searchFields = [
        course.title,
        course.code,
        course.description,
        course.instructor,
        ...course.tags
      ].join(' ').toLowerCase();
      
      if (!searchFields.includes(searchLower)) return false;
    }

    return true;
  });
}