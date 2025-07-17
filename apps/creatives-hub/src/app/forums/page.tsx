'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import useCourseStore from '@/stores/courseStore';
import useUserStore from '@/stores/userStore';
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  FireIcon,
  ClockIcon,
  UserGroupIcon,
  EyeIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  course: string;
  courseId: string;
  replies: number;
  views: number;
  lastActivity: string;
  lastAuthor: string;
  isPinned: boolean;
  isHot: boolean;
  tags: string[];
}

const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    title: 'Welcome to 3D Digital Sculpture - Introduce Yourself!',
    content: 'Hello everyone! This is our space to get to know each other. Please introduce yourself, share your background in art, and what you hope to achieve in this course.',
    author: {
      name: 'Prof. Maria Rodriguez',
      avatar: '/avatars/prof-rodriguez.jpg',
      role: 'Instructor'
    },
    course: '3D Digital Sculpture',
    courseId: '301',
    replies: 24,
    views: 156,
    lastActivity: '2 hours ago',
    lastAuthor: 'Alex Thompson',
    isPinned: true,
    isHot: true,
    tags: ['introduction', 'course-info']
  },
  {
    id: '2',
    title: 'Struggling with Blender Interface - Need Help!',
    content: 'Hey everyone, I\'m having trouble navigating the Blender interface. The viewport controls feel different from other 3D software I\'ve used. Any tips?',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah-chen.jpg',
      role: 'Student'
    },
    course: '3D Digital Sculpture',
    courseId: '301',
    replies: 8,
    views: 89,
    lastActivity: '4 hours ago',
    lastAuthor: 'Marcus Williams',
    isPinned: false,
    isHot: true,
    tags: ['blender', 'help', 'interface']
  },
  {
    id: '3',
    title: 'Showcase: My First Digital Sculpture - "Island Breeze"',
    content: 'I wanted to share my first major project inspired by the beautiful Bahamian coastline. Used techniques we learned in weeks 1-3. Feedback welcome!',
    author: {
      name: 'Jamie Rolle',
      avatar: '/avatars/jamie-rolle.jpg',
      role: 'Student'
    },
    course: '3D Digital Sculpture',
    courseId: '301',
    replies: 15,
    views: 234,
    lastActivity: '6 hours ago',
    lastAuthor: 'Prof. Maria Rodriguez',
    isPinned: false,
    isHot: true,
    tags: ['showcase', 'bahamian-culture', 'feedback']
  },
  {
    id: '4',
    title: 'Assignment 2 Clarification - Texture Requirements',
    content: 'Can someone clarify the texture resolution requirements for Assignment 2? The brief mentions "high quality" but I want to make sure I meet the technical specs.',
    author: {
      name: 'Devon Smith',
      avatar: '/avatars/devon-smith.jpg',
      role: 'Student'
    },
    course: '3D Digital Sculpture',
    courseId: '301',
    replies: 3,
    views: 67,
    lastActivity: '1 day ago',
    lastAuthor: 'Prof. Maria Rodriguez',
    isPinned: false,
    isHot: false,
    tags: ['assignment', 'technical', 'textures']
  },
  {
    id: '5',
    title: 'Music Production Collaboration Opportunities',
    content: 'Looking for visual artists to collaborate on music video projects. I\'m working on tracks that blend traditional Bahamian sounds with modern production.',
    author: {
      name: 'Aaliyah Thompson',
      avatar: '/avatars/aaliyah-thompson.jpg',
      role: 'Student'
    },
    course: 'Music Production',
    courseId: '201',
    replies: 12,
    views: 145,
    lastActivity: '8 hours ago',
    lastAuthor: 'Marcus Williams',
    isPinned: false,
    isHot: true,
    tags: ['collaboration', 'music-video', 'bahamian-culture']
  },
  {
    id: '6',
    title: 'Digital Photography Workshop - Light and Shadow Techniques',
    content: 'This Saturday we\'ll explore how Caribbean lighting affects digital photography. Bring your cameras and we\'ll practice around the campus!',
    author: {
      name: 'Prof. Lisa Thompson',
      avatar: '/avatars/prof-thompson.jpg',
      role: 'Instructor'
    },
    course: 'Digital Photography',
    courseId: '401',
    replies: 7,
    views: 92,
    lastActivity: '12 hours ago',
    lastAuthor: 'Sophie Williams',
    isPinned: true,
    isHot: false,
    tags: ['workshop', 'photography', 'lighting']
  },
  {
    id: '7',
    title: 'Traditional Bahamian Art Influences in Modern Design',
    content: 'I\'ve been researching how traditional Bahamian art forms like junkanoo and straw work can inspire contemporary graphic design. Anyone else exploring cultural fusion?',
    author: {
      name: 'Marcus Williams',
      avatar: '/avatars/marcus-williams.jpg',
      role: 'Student'
    },
    course: 'Graphic Design',
    courseId: '501',
    replies: 18,
    views: 203,
    lastActivity: '5 hours ago',
    lastAuthor: 'Dr. Patricia Johnson',
    isPinned: false,
    isHot: true,
    tags: ['bahamian-culture', 'design', 'research', 'junkanoo']
  }
];

export default function Forums() {
  const [threads, setThreads] = useState<ForumThread[]>(mockForumThreads);
  const [filteredThreads, setFilteredThreads] = useState<ForumThread[]>(mockForumThreads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'hot' | 'pinned' | 'recent'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  
  const { courses, fetchEnrolledCourses } = useCourseStore();
  const { user, isAuthenticated } = useUserStore();

  // Authentication guard - redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="font-display text-2xl font-bold text-capas-turquoise mb-2">Login Required</h1>
          <p className="text-capas-ocean-dark mb-6">Please log in to access the community forums.</p>
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-capas-turquoise text-white font-semibold rounded-lg hover:bg-capas-turquoise-dark transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses('inprogress');
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  useEffect(() => {
    let filtered = threads;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(thread =>
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    switch (selectedFilter) {
      case 'hot':
        filtered = filtered.filter(thread => thread.isHot);
        break;
      case 'pinned':
        filtered = filtered.filter(thread => thread.isPinned);
        break;
      case 'recent':
        filtered = filtered.sort((a, b) => 
          new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        );
        break;
    }

    // Filter by course
    if (selectedCourse !== 'all') {
      filtered = filtered.filter(thread => thread.courseId === selectedCourse);
    }

    setFilteredThreads(filtered);
  }, [threads, searchTerm, selectedFilter, selectedCourse]);

  const filterOptions = [
    { id: 'all', name: 'All Discussions', icon: ChatBubbleLeftRightIcon },
    { id: 'hot', name: 'Hot Topics', icon: FireIcon },
    { id: 'pinned', name: 'Pinned', icon: PlusIcon },
    { id: 'recent', name: 'Recent Activity', icon: ClockIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-capas-sand-light to-capas-ocean-light">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-capas-turquoise via-capas-turquoise-dark to-capas-ocean text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Community Forums
              </h1>
              <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto mb-8">
                Connect, collaborate, and share your creative journey with fellow students and instructors
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg">
                <PlusIcon className="w-5 h-5 mr-2" />
                Start New Discussion
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions, topics, or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Course Filter */}
            <div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
              >
                <option value="all">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.fullname}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? 'bg-capas-turquoise text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-capas-ocean-light hover:text-capas-turquoise'
                }`}
              >
                <filter.icon className="w-4 h-4" />
                <span>{filter.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Discussions', value: '156', icon: ChatBubbleLeftRightIcon, color: 'text-capas-turquoise' },
            { title: 'Active Participants', value: '89', icon: UserGroupIcon, color: 'text-capas-palm' },
            { title: 'Messages Today', value: '24', icon: ClockIcon, color: 'text-capas-coral' },
            { title: 'Hot Topics', value: '12', icon: FireIcon, color: 'text-capas-purple' }
          ].map((stat, index) => (
            <div key={stat.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Forum Threads */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredThreads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/forums/${thread.id}`}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-capas-turquoise">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* Thread Header */}
                        <div className="flex items-center space-x-3 mb-3">
                          {thread.isPinned && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-capas-gold text-white">
                              Pinned
                            </span>
                          )}
                          {thread.isHot && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-capas-coral text-white">
                              <FireIcon className="w-3 h-3 mr-1" />
                              Hot
                            </span>
                          )}
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-capas-ocean-light text-capas-ocean-dark">
                            {thread.course}
                          </span>
                        </div>

                        {/* Thread Title and Content */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-capas-turquoise transition-colors">
                          {thread.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {thread.content}
                        </p>

                        {/* Author and Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={thread.author.avatar || '/default-avatar.png'}
                              alt={thread.author.name}
                              className="w-8 h-8 rounded-full border border-gray-200"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/default-avatar.png';
                              }}
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{thread.author.name}</p>
                              <p className="text-xs text-gray-500">{thread.author.role}</p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                              {thread.replies}
                            </span>
                            <span className="flex items-center">
                              <EyeIcon className="w-4 h-4 mr-1" />
                              {thread.views}
                            </span>
                          </div>
                        </div>

                        {/* Last Activity */}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            Last reply by <span className="font-medium">{thread.lastAuthor}</span> • {thread.lastActivity}
                          </p>
                        </div>
                      </div>

                      <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-capas-turquoise transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredThreads.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white rounded-xl border border-gray-200"
            >
              <ChatBubbleLeftRightIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No discussions found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters, or start a new discussion!
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-capas-turquoise text-white font-semibold rounded-lg hover:bg-capas-turquoise-dark transition-colors">
                <PlusIcon className="w-5 h-5 mr-2" />
                Start New Discussion
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}