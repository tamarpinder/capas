'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import useCourseStore from '@/stores/courseStore';
import useUserStore from '@/stores/userStore';
import {
  PhotoIcon,
  PlayIcon,
  DocumentIcon,
  CubeIcon,
  HeartIcon,
  EyeIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  StarIcon,
  CalendarIcon,
  UserIcon,
  AcademicCapIcon,
  FolderIcon,
  CloudArrowUpIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'image' | 'video' | 'audio' | 'software' | 'tutorial' | 'template';
  category: string;
  fileUrl: string;
  thumbnailUrl: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  course?: {
    id: string;
    title: string;
    color: string;
  };
  uploadDate: string;
  downloads: number;
  views: number;
  rating: number;
  featured: boolean;
  tags: string[];
  fileSize?: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Complete Blender 3D Modeling Tutorial Series',
    description: 'A comprehensive video series covering 3D modeling fundamentals, from basic primitives to advanced sculpting techniques.',
    type: 'tutorial',
    category: '3D Modeling',
    fileUrl: '/resources/blender-tutorial-series',
    thumbnailUrl: '/thumbnails/blender-tutorial.jpg',
    author: {
      id: 'prof1',
      name: 'Prof. Maria Rodriguez',
      avatar: '/avatars/prof-rodriguez.jpg',
      role: 'Instructor'
    },
    course: {
      id: '301',
      title: '3D Digital Sculpture',
      color: '#0A8A98'
    },
    uploadDate: '2024-01-15',
    downloads: 156,
    views: 890,
    rating: 4.8,
    featured: true,
    tags: ['blender', '3d-modeling', 'tutorial', 'beginner'],
    duration: '3h 45m',
    difficulty: 'beginner'
  },
  {
    id: '2',
    title: 'Junkanoo Mask Design Templates',
    description: 'Traditional Bahamian Junkanoo mask patterns and templates for digital art projects. Includes historical context and cultural significance.',
    type: 'template',
    category: 'Cultural Design',
    fileUrl: '/resources/junkanoo-templates.zip',
    thumbnailUrl: '/thumbnails/junkanoo-masks.jpg',
    author: {
      id: 'cultural1',
      name: 'Dr. Patricia Johnson',
      avatar: '/avatars/dr-johnson.jpg',
      role: 'Cultural Arts Specialist'
    },
    uploadDate: '2024-01-20',
    downloads: 89,
    views: 234,
    rating: 4.9,
    featured: true,
    tags: ['junkanoo', 'bahamian-culture', 'templates', 'masks'],
    fileSize: '45.2 MB',
    difficulty: 'intermediate'
  },
  {
    id: '3',
    title: 'Logic Pro X Student License Setup Guide',
    description: 'Step-by-step instructions for downloading and setting up Logic Pro X with educational licensing. Includes basic workflow tutorials.',
    type: 'document',
    category: 'Music Production',
    fileUrl: '/resources/logic-pro-setup.pdf',
    thumbnailUrl: '/thumbnails/logic-pro.jpg',
    author: {
      id: 'tech1',
      name: 'James Wilson',
      avatar: '/avatars/james-wilson.jpg',
      role: 'Technical Coordinator'
    },
    course: {
      id: '201',
      title: 'Music Production',
      color: '#7FA900'
    },
    uploadDate: '2024-01-18',
    downloads: 203,
    views: 567,
    rating: 4.6,
    featured: false,
    tags: ['logic-pro', 'daw', 'setup', 'music-production'],
    fileSize: '8.5 MB',
    difficulty: 'beginner'
  },
  {
    id: '4',
    title: 'Adobe Creative Suite for Students',
    description: 'Complete installation package and tutorials for Adobe Creative Cloud including Photoshop, Illustrator, and Premiere Pro.',
    type: 'software',
    category: 'Design Software',
    fileUrl: '/resources/adobe-creative-suite',
    thumbnailUrl: '/thumbnails/adobe-cc.jpg',
    author: {
      id: 'admin1',
      name: 'CAPAS IT Department',
      avatar: '/avatars/capas-logo.jpg',
      role: 'Administrator'
    },
    uploadDate: '2024-01-10',
    downloads: 445,
    views: 1234,
    rating: 4.7,
    featured: true,
    tags: ['adobe', 'photoshop', 'illustrator', 'premiere'],
    fileSize: '2.1 GB',
    difficulty: 'beginner'
  },
  {
    id: '5',
    title: 'Caribbean Photography Lighting Techniques',
    description: 'Video tutorial exploring how natural Caribbean lighting affects photography. Covers golden hour, harsh sunlight, and tropical storm lighting.',
    type: 'video',
    category: 'Photography',
    fileUrl: '/resources/caribbean-lighting.mp4',
    thumbnailUrl: '/thumbnails/caribbean-photo.jpg',
    author: {
      id: 'photo1',
      name: 'Prof. Lisa Thompson',
      avatar: '/avatars/prof-thompson.jpg',
      role: 'Photography Instructor'
    },
    course: {
      id: '401',
      title: 'Digital Photography',
      color: '#FF8B87'
    },
    uploadDate: '2024-01-22',
    downloads: 67,
    views: 189,
    rating: 4.5,
    featured: false,
    tags: ['photography', 'lighting', 'caribbean', 'techniques'],
    duration: '1h 20m',
    difficulty: 'intermediate'
  },
  {
    id: '6',
    title: 'Graphic Design Portfolio Template',
    description: 'Professional portfolio template designed specifically for creative arts students. Includes multiple layout options and branding guidelines.',
    type: 'template',
    category: 'Graphic Design',
    fileUrl: '/resources/portfolio-template.zip',
    thumbnailUrl: '/thumbnails/portfolio-template.jpg',
    author: {
      id: 'design1',
      name: 'Sarah Martinez',
      avatar: '/avatars/sarah-martinez.jpg',
      role: 'Design Instructor'
    },
    course: {
      id: '501',
      title: 'Graphic Design',
      color: '#FFCE00'
    },
    uploadDate: '2024-01-25',
    downloads: 134,
    views: 456,
    rating: 4.8,
    featured: false,
    tags: ['portfolio', 'template', 'branding', 'layout'],
    fileSize: '127 MB',
    difficulty: 'intermediate'
  }
];

export default function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'rating' | 'downloads'>('recent');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  const { courses, fetchEnrolledCourses } = useCourseStore();
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses('inprogress');
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  useEffect(() => {
    let filtered = resources;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(resource => resource.type === selectedType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.views - a.views;
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'recent':
        default:
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedCategory, selectedType, sortBy]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: '3D Modeling', name: '3D Modeling' },
    { id: 'Music Production', name: 'Music Production' },
    { id: 'Photography', name: 'Photography' },
    { id: 'Graphic Design', name: 'Graphic Design' },
    { id: 'Cultural Design', name: 'Cultural Design' },
    { id: 'Design Software', name: 'Design Software' }
  ];

  const types = [
    { id: 'all', name: 'All Types', icon: FolderIcon },
    { id: 'tutorial', name: 'Tutorials', icon: PlayIcon },
    { id: 'document', name: 'Documents', icon: DocumentIcon },
    { id: 'template', name: 'Templates', icon: CubeIcon },
    { id: 'software', name: 'Software', icon: BookOpenIcon },
    { id: 'video', name: 'Videos', icon: PlayIcon },
    { id: 'image', name: 'Images', icon: PhotoIcon }
  ];

  const getTypeIcon = (type: string) => {
    const typeData = types.find(t => t.id === type);
    return typeData?.icon || FolderIcon;
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-capas-palm text-white';
      case 'intermediate': return 'bg-capas-gold text-white';
      case 'advanced': return 'bg-capas-coral text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

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
                Resource Library
              </h1>
              <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto mb-8">
                Access tutorials, templates, software, and learning materials to enhance your creative journey
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg">
                <CloudArrowUpIcon className="w-5 h-5 mr-2" />
                Upload Resource
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Resources', value: resources.length, icon: FolderIcon, color: 'text-capas-turquoise' },
            { title: 'Featured Items', value: resources.filter(r => r.featured).length, icon: StarIcon, color: 'text-capas-gold' },
            { title: 'Total Downloads', value: resources.reduce((sum, r) => sum + r.downloads, 0), icon: ArrowDownTrayIcon, color: 'text-capas-palm' },
            { title: 'Categories', value: categories.length - 1, icon: AcademicCapIcon, color: 'text-capas-coral' }
          ].map((stat, index) => (
            <div key={stat.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8"
        >
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources, tutorials, templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors"
              >
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap gap-2 mt-6">
            {[
              { id: 'recent', name: 'Most Recent' },
              { id: 'popular', name: 'Most Popular' },
              { id: 'rating', name: 'Highest Rated' },
              { id: 'downloads', name: 'Most Downloaded' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  sortBy === option.id
                    ? 'bg-capas-turquoise text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-capas-ocean-light hover:text-capas-turquoise'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resource Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredResources.map((resource, index) => {
              const TypeIcon = getTypeIcon(resource.type);
              
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    onClick={() => setSelectedResource(resource)}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-capas-turquoise"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-capas-turquoise rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-capas-turquoise transition-colors line-clamp-2">
                            {resource.title}
                          </h3>
                          <p className="text-sm text-gray-500">{resource.category}</p>
                        </div>
                      </div>
                      {resource.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-capas-gold text-white">
                          <StarIcon className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    {/* Meta Info */}
                    <div className="space-y-3 mb-4">
                      {/* Author */}
                      <div className="flex items-center space-x-2">
                        <img
                          src={resource.author.avatar || '/default-avatar.png'}
                          alt={resource.author.name}
                          className="w-6 h-6 rounded-full border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/default-avatar.png';
                          }}
                        />
                        <span className="text-sm text-gray-700">{resource.author.name}</span>
                        <span className="text-xs text-gray-500">• {resource.author.role}</span>
                      </div>

                      {/* Course Badge */}
                      {resource.course && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: resource.course.color }}>
                          {resource.course.title}
                        </div>
                      )}

                      {/* Difficulty */}
                      {resource.difficulty && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          {resource.views}
                        </span>
                        <span className="flex items-center">
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          {resource.downloads}
                        </span>
                        <span className="flex items-center">
                          <StarIcon className="w-4 h-4 mr-1" />
                          {resource.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {resource.fileSize && (
                          <span className="text-xs">{resource.fileSize}</span>
                        )}
                        {resource.duration && (
                          <span className="text-xs">{resource.duration}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white rounded-xl border border-gray-200"
          >
            <FolderIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
              className="inline-flex items-center px-6 py-3 bg-capas-turquoise text-white font-semibold rounded-lg hover:bg-capas-turquoise-dark transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Resource Detail Modal */}
        <AnimatePresence>
          {selectedResource && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedResource(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-capas-turquoise rounded-xl flex items-center justify-center">
                      {React.createElement(getTypeIcon(selectedResource.type), { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedResource.title}
                      </h2>
                      <p className="text-gray-600">{selectedResource.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedResource(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {selectedResource.description}
                        </p>
                      </div>

                      {selectedResource.tags.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedResource.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Resource Details</h4>
                          <div className="space-y-1 text-gray-600">
                            <p>Type: {selectedResource.type.replace('_', ' ').toUpperCase()}</p>
                            {selectedResource.fileSize && <p>Size: {selectedResource.fileSize}</p>}
                            {selectedResource.duration && <p>Duration: {selectedResource.duration}</p>}
                            {selectedResource.difficulty && <p>Difficulty: {selectedResource.difficulty}</p>}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Statistics</h4>
                          <div className="space-y-1 text-gray-600">
                            <p>Views: {selectedResource.views}</p>
                            <p>Downloads: {selectedResource.downloads}</p>
                            <p>Rating: {selectedResource.rating}/5.0</p>
                            <p>Uploaded: {new Date(selectedResource.uploadDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Author */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Author</h3>
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedResource.author.avatar || '/default-avatar.png'}
                            alt={selectedResource.author.name}
                            className="w-10 h-10 rounded-full border border-gray-200"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/default-avatar.png';
                            }}
                          />
                          <div>
                            <div className="font-medium text-gray-900">{selectedResource.author.name}</div>
                            <div className="text-sm text-gray-600">{selectedResource.author.role}</div>
                          </div>
                        </div>
                      </div>

                      {/* Course */}
                      {selectedResource.course && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-3">Related Course</h3>
                          <div 
                            className="inline-flex items-center px-3 py-2 rounded-lg text-white text-sm font-medium"
                            style={{ backgroundColor: selectedResource.course.color }}
                          >
                            {selectedResource.course.title}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-3">
                        <button className="w-full bg-capas-turquoise text-white font-semibold py-3 rounded-lg hover:bg-capas-turquoise-dark transition-colors flex items-center justify-center space-x-2">
                          <ArrowDownTrayIcon className="w-5 h-5" />
                          <span>Download Resource</span>
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                          <ShareIcon className="w-5 h-5" />
                          <span>Share Resource</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}