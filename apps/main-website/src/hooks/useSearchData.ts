'use client';

import { useState, useEffect } from 'react';
import programsData from '../../mocks/programs.json';
import facultyData from '../../mocks/faculty.json';
import newsEventsData from '../../mocks/news-events.json';
import alumniData from '../../mocks/alumni.json';

interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  duration: string;
  description: string;
  featured: boolean;
}

interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  specialization: string[];
  bio: string;
}

interface NewsEvent {
  id: string;
  type: 'news' | 'event';
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  publishDate?: string;
  date?: string;
}

interface Alumni {
  id: string;
  firstName: string;
  lastName: string;
  graduationYear: number;
  currentPosition: string;
  currentOrganization: string;
}

interface PageData {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface SearchResult {
  id: string;
  type: 'program' | 'faculty' | 'news' | 'event' | 'alumni' | 'page';
  title: string;
  description: string;
  url: string;
}

interface SearchDataType {
  programs: Program[];
  faculty: Faculty[];
  news: NewsEvent[];
  events: NewsEvent[];
  alumni: Alumni[];
  pages: PageData[];
}

export const useSearchData = () => {
  const [searchData, setSearchData] = useState<SearchDataType>({
    programs: [],
    faculty: [],
    news: [],
    events: [],
    alumni: [],
    pages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading and processing
    setTimeout(() => {
      // Process and combine all searchable data
      const processedData: SearchDataType = {
        programs: programsData.programs,
        faculty: facultyData.faculty,
        news: newsEventsData.newsArticles,
        events: newsEventsData.upcomingEvents,
        alumni: alumniData.alumni,
        pages: [
          // Static pages that should be searchable
          {
            id: 'about',
            title: 'About CAPAS',
            description: 'Learn about our mission, vision, and history',
            url: '/about',
            type: 'page',
            keywords: ['about', 'mission', 'vision', 'history', 'school', 'information']
          },
          {
            id: 'admissions',
            title: 'How to Apply',
            description: 'Application process and requirements',
            url: '/how-to-apply',
            type: 'page',
            keywords: ['apply', 'admissions', 'application', 'requirements', 'audition']
          },
          {
            id: 'contact',
            title: 'Contact Us',
            description: 'Get in touch with CAPAS',
            url: '/contact',
            type: 'page',
            keywords: ['contact', 'phone', 'email', 'address', 'directions']
          },
          {
            id: 'students',
            title: 'Student Information',
            description: 'Resources and information for current students',
            url: '/students',
            type: 'page',
            keywords: ['students', 'resources', 'information', 'calendar', 'handbook']
          },
          {
            id: 'scholarships',
            title: 'Scholarships & Financial Aid',
            description: 'Financial assistance opportunities',
            url: '/students/financial-aid',
            type: 'page',
            keywords: ['scholarships', 'financial aid', 'assistance', 'funding', 'grants']
          },
          {
            id: 'facilities',
            title: 'Campus & Facilities',
            description: 'Explore our state-of-the-art facilities',
            url: '/students/facilities',
            type: 'page',
            keywords: ['facilities', 'campus', 'buildings', 'studios', 'equipment']
          },
          {
            id: 'calendar',
            title: 'Academic Calendar',
            description: 'Important dates and schedules',
            url: '/students/calendar',
            type: 'page',
            keywords: ['calendar', 'dates', 'schedule', 'semester', 'holidays']
          }
        ]
      };

      setSearchData(processedData);
      setLoading(false);
    }, 300);
  }, []);

  // Search function that can be used across the app
  const search = (query: string, types?: string[]): SearchResult[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search programs
    if (!types || types.includes('programs')) {
      searchData.programs.forEach(program => {
        if (
          program.title.toLowerCase().includes(searchTerm) ||
          program.description.toLowerCase().includes(searchTerm) ||
          program.category.toLowerCase().includes(searchTerm) ||
          program.type.toLowerCase().includes(searchTerm)
        ) {
          results.push({ ...program, searchType: 'program' });
        }
      });
    }

    // Search faculty
    if (!types || types.includes('faculty')) {
      searchData.faculty.forEach(member => {
        const fullName = `${member.firstName} ${member.lastName}`;
        if (
          fullName.toLowerCase().includes(searchTerm) ||
          member.title.toLowerCase().includes(searchTerm) ||
          member.department.toLowerCase().includes(searchTerm) ||
          member.specialization.some((spec: string) => spec.toLowerCase().includes(searchTerm)) ||
          member.bio.toLowerCase().includes(searchTerm)
        ) {
          results.push({ ...member, searchType: 'faculty', fullName });
        }
      });
    }

    // Search news
    if (!types || types.includes('news')) {
      searchData.news.forEach(article => {
        if (
          article.title.toLowerCase().includes(searchTerm) ||
          article.excerpt.toLowerCase().includes(searchTerm) ||
          article.category.toLowerCase().includes(searchTerm) ||
          (article.author && article.author.toLowerCase().includes(searchTerm))
        ) {
          results.push({ ...article, searchType: 'news' });
        }
      });
    }

    // Search events
    if (!types || types.includes('events')) {
      searchData.events.forEach(event => {
        if (
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.category.toLowerCase().includes(searchTerm) ||
          (event.location && event.location.toLowerCase().includes(searchTerm))
        ) {
          results.push({ ...event, searchType: 'event' });
        }
      });
    }

    // Search alumni
    if (!types || types.includes('alumni')) {
      searchData.alumni.forEach(alum => {
        const fullName = `${alum.firstName} ${alum.lastName}`;
        if (
          fullName.toLowerCase().includes(searchTerm) ||
          alum.currentPosition.toLowerCase().includes(searchTerm) ||
          alum.currentOrganization.toLowerCase().includes(searchTerm) ||
          alum.program.toLowerCase().includes(searchTerm) ||
          alum.industry.toLowerCase().includes(searchTerm) ||
          alum.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm))
        ) {
          results.push({ ...alum, searchType: 'alumni', fullName });
        }
      });
    }

    // Search pages
    if (!types || types.includes('pages')) {
      searchData.pages.forEach(page => {
        if (
          page.title.toLowerCase().includes(searchTerm) ||
          page.description.toLowerCase().includes(searchTerm) ||
          page.keywords.some((keyword: string) => keyword.toLowerCase().includes(searchTerm))
        ) {
          results.push({ ...page, searchType: 'page' });
        }
      });
    }

    return results;
  };

  // Get trending/popular searches based on common terms
  const getTrendingSearches = (): string[] => {
    return [
      'Musical Theatre',
      'Admissions',
      'Faculty',
      'Scholarships',
      'Events',
      'Campus Tour',
      'Alumni',
      'Dance Program',
      'Acting Classes',
      'Application Deadline'
    ];
  };

  // Get search suggestions based on partial query
  const getSuggestions = (partialQuery: string): string[] => {
    if (!partialQuery.trim()) return [];

    const suggestions = new Set<string>();
    const query = partialQuery.toLowerCase();

    // Add program titles that match
    searchData.programs.forEach(program => {
      if (program.title.toLowerCase().includes(query)) {
        suggestions.add(program.title);
      }
    });

    // Add faculty names that match
    searchData.faculty.forEach(member => {
      const fullName = `${member.firstName} ${member.lastName}`;
      if (fullName.toLowerCase().includes(query)) {
        suggestions.add(fullName);
      }
    });

    // Add common search terms
    const commonTerms = [
      'admissions', 'application', 'audition', 'scholarship', 'financial aid',
      'faculty', 'staff', 'programs', 'courses', 'events', 'news',
      'musical theatre', 'dance', 'acting', 'voice', 'music',
      'campus', 'facilities', 'tours', 'calendar', 'contact'
    ];

    commonTerms.forEach(term => {
      if (term.includes(query)) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, 8);
  };

  return {
    searchData,
    loading,
    search,
    getTrendingSearches,
    getSuggestions
  };
};