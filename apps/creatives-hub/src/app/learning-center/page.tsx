'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import useCourseStore from '@/stores/courseStore';
import useUserStore from '@/stores/userStore';
import {
  BookOpenIcon,
  ClockIcon,
  ChevronLeftIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ChevronRightIcon,
  ChartBarIcon,
  CalendarIcon,
  VideoCameraIcon,
  DocumentIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'reading' | 'assignment' | 'quiz' | 'project';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  locked: boolean;
  progress: number;
  dueDate?: string;
  resources: {
    id: string;
    title: string;
    type: 'video' | 'document' | 'link' | 'file';
    url: string;
    duration?: string;
  }[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalModules: number;
  completedModules: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: LearningModule[];
}

const mockLearningPaths: LearningPath[] = [
  {
    id: 'blender-fundamentals',
    title: 'Blender 3D Fundamentals',
    description: 'Master the basics of 3D modeling, texturing, and rendering with Blender',
    totalModules: 8,
    completedModules: 3,
    estimatedTime: '12 hours',
    difficulty: 'beginner',
    modules: [
      {
        id: 'intro',
        title: 'Introduction to Blender Interface',
        description: 'Learn the basic navigation and interface elements of Blender',
        type: 'video',
        duration: '45 minutes',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        progress: 100,
        resources: [
          { id: '1', title: 'Interface Overview Video', type: 'video', url: '/videos/blender-intro', duration: '25 min' },
          { id: '2', title: 'Keyboard Shortcuts Guide', type: 'document', url: '/docs/shortcuts.pdf' }
        ]
      },
      {
        id: 'basic-modeling',
        title: 'Basic 3D Modeling Techniques',
        description: 'Create your first 3D objects using basic modeling tools',
        type: 'project',
        duration: '2 hours',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        progress: 100,
        resources: [
          { id: '3', title: 'Modeling Tutorial', type: 'video', url: '/videos/basic-modeling', duration: '1h 30min' },
          { id: '4', title: 'Project Files', type: 'file', url: '/files/modeling-project.zip' }
        ]
      },
      {
        id: 'materials',
        title: 'Materials and Texturing',
        description: 'Apply realistic materials and textures to your 3D models',
        type: 'video',
        duration: '1.5 hours',
        difficulty: 'intermediate',
        completed: true,
        locked: false,
        progress: 100,
        resources: [
          { id: '5', title: 'Materials Workshop', type: 'video', url: '/videos/materials', duration: '1h 20min' },
          { id: '6', title: 'Texture Library', type: 'link', url: '/textures' }
        ]
      },
      {
        id: 'lighting',
        title: 'Lighting and Rendering Setup',
        description: 'Set up professional lighting for realistic renders',
        type: 'assignment',
        duration: '2 hours',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        progress: 60,
        dueDate: '2024-02-15',
        resources: [
          { id: '7', title: 'Lighting Techniques', type: 'video', url: '/videos/lighting', duration: '45 min' },
          { id: '8', title: 'Assignment Brief', type: 'document', url: '/assignments/lighting-assignment.pdf' }
        ]
      },
      {
        id: 'advanced-modeling',
        title: 'Advanced Modeling with Modifiers',
        description: 'Use Blender modifiers to create complex geometric forms',
        type: 'video',
        duration: '3 hours',
        difficulty: 'advanced',
        completed: false,
        locked: true,
        progress: 0,
        resources: []
      }
    ]
  },
  {
    id: 'bahamian-cultural-design',
    title: 'Bahamian Cultural Design Elements',
    description: 'Explore traditional Bahamian art forms and incorporate them into modern digital design',
    totalModules: 6,
    completedModules: 1,
    estimatedTime: '8 hours',
    difficulty: 'intermediate',
    modules: [
      {
        id: 'junkanoo-history',
        title: 'History and Significance of Junkanoo',
        description: 'Learn about the cultural heritage and artistic traditions of Junkanoo',
        type: 'reading',
        duration: '1 hour',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        progress: 100,
        resources: [
          { id: '9', title: 'Junkanoo Historical Overview', type: 'document', url: '/docs/junkanoo-history.pdf' },
          { id: '10', title: 'Cultural Context Video', type: 'video', url: '/videos/junkanoo-context', duration: '30 min' }
        ]
      },
      {
        id: 'mask-design',
        title: 'Traditional Mask Design Patterns',
        description: 'Study traditional Junkanoo mask designs and their symbolic meanings',
        type: 'project',
        duration: '2 hours',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        progress: 25,
        resources: [
          { id: '11', title: 'Mask Pattern Library', type: 'document', url: '/patterns/masks.pdf' },
          { id: '12', title: 'Design Workshop', type: 'video', url: '/videos/mask-design', duration: '1h 15min' }
        ]
      }
    ]
  }
];

export default function LearningCenter() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(mockLearningPaths[0]);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'resources'>('overview');
  
  const { courses, fetchEnrolledCourses } = useCourseStore();
  const { user, isAuthenticated } = useUserStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchEnrolledCourses('inprogress');
    }
  }, [isAuthenticated, fetchEnrolledCourses]);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return VideoCameraIcon;
      case 'reading': return DocumentIcon;
      case 'assignment': return DocumentTextIcon;
      case 'quiz': return CheckCircleIcon;
      case 'project': return CubeIcon;
      default: return BookOpenIcon;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-capas-palm text-white';
      case 'intermediate': return 'bg-capas-gold text-white';
      case 'advanced': return 'bg-capas-coral text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-capas-palm';
    if (progress > 50) return 'bg-capas-gold';
    if (progress > 0) return 'bg-capas-turquoise';
    return 'bg-gray-300';
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
                Learning Resource Centre
              </h1>
              <p className="text-xl text-capas-ocean-light max-w-2xl mx-auto mb-8">
                Structured learning paths with interactive modules, progress tracking, and comprehensive resources
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/my-courses" className="inline-flex items-center px-6 py-3 bg-white text-capas-turquoise font-semibold rounded-lg hover:bg-capas-gold hover:text-white transition-colors shadow-lg">
                  <ChevronLeftIcon className="w-5 h-5 mr-2" />
                  Back to Courses
                </Link>
                <Link href="/gallery" className="inline-flex items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors">
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  Browse Resources
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learning Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Learning Paths', value: mockLearningPaths.length, icon: BookOpenIcon, color: 'text-capas-turquoise' },
            { title: 'Completed Modules', value: mockLearningPaths.reduce((sum, path) => sum + path.completedModules, 0), icon: CheckCircleIcon, color: 'text-capas-palm' },
            { title: 'In Progress', value: mockLearningPaths.filter(path => path.completedModules > 0 && path.completedModules < path.totalModules).length, icon: ChartBarIcon, color: 'text-capas-gold' },
            { title: 'Total Hours', value: mockLearningPaths.reduce((sum, path) => sum + parseInt(path.estimatedTime), 0), icon: ClockIcon, color: 'text-capas-coral' }
          ].map((stat, index) => (
            <div key={stat.title} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Paths Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Paths</h2>
              <div className="space-y-4">
                {mockLearningPaths.map((path) => (
                  <div
                    key={path.id}
                    onClick={() => setSelectedPath(path)}
                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedPath?.id === path.id
                        ? 'bg-capas-turquoise text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${selectedPath?.id === path.id ? 'text-white' : 'text-gray-900'}`}>
                        {path.title}
                      </h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedPath?.id === path.id ? 'bg-white/20 text-white' : getDifficultyColor(path.difficulty)
                      }`}>
                        {path.difficulty}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 ${selectedPath?.id === path.id ? 'text-white/80' : 'text-gray-600'}`}>
                      {path.description}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className={`w-full bg-gray-200 rounded-full h-2 ${selectedPath?.id === path.id ? 'bg-white/20' : ''}`}>
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            selectedPath?.id === path.id ? 'bg-white' : getProgressColor((path.completedModules / path.totalModules) * 100)
                          }`}
                          style={{ width: `${(path.completedModules / path.totalModules) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between text-xs ${
                      selectedPath?.id === path.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      <span>{path.completedModules}/{path.totalModules} modules</span>
                      <span>{path.estimatedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedPath && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedPath.title}</h1>
                      <p className="text-gray-600">{selectedPath.description}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedPath.difficulty)}`}>
                      {selectedPath.difficulty}
                    </span>
                  </div>
                  
                  {/* Path Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-capas-turquoise">{selectedPath.totalModules}</div>
                      <div className="text-sm text-gray-600">Modules</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-capas-palm">{selectedPath.completedModules}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-capas-gold">{selectedPath.estimatedTime}</div>
                      <div className="text-sm text-gray-600">Est. Time</div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', name: 'Overview' },
                      { id: 'modules', name: 'Modules' },
                      { id: 'resources', name: 'Resources' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-capas-turquoise text-capas-turquoise'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Learning Objectives</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-capas-palm mr-2 mt-0.5 flex-shrink-0" />
                            Master fundamental concepts and techniques
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-capas-palm mr-2 mt-0.5 flex-shrink-0" />
                            Apply knowledge through hands-on projects
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-capas-palm mr-2 mt-0.5 flex-shrink-0" />
                            Develop professional-level skills
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="w-5 h-5 text-capas-palm mr-2 mt-0.5 flex-shrink-0" />
                            Create portfolio-worthy work
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
                        <p className="text-gray-600">
                          Basic computer skills and familiarity with creative software concepts. No prior experience required.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                          <div>• Interface navigation</div>
                          <div>• Basic to advanced techniques</div>
                          <div>• Professional workflows</div>
                          <div>• Project management</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'modules' && (
                    <div className="space-y-4">
                      {selectedPath.modules.map((module, index) => {
                        const ModuleIcon = getModuleIcon(module.type);
                        return (
                          <div
                            key={module.id}
                            onClick={() => !module.locked && setSelectedModule(module)}
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              module.locked
                                ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                                : 'border-gray-200 hover:border-capas-turquoise cursor-pointer hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    module.completed ? 'bg-capas-palm' : module.locked ? 'bg-gray-400' : 'bg-capas-turquoise'
                                  }`}>
                                    {module.locked ? (
                                      <LockClosedIcon className="w-4 h-4 text-white" />
                                    ) : module.completed ? (
                                      <CheckCircleSolidIcon className="w-4 h-4 text-white" />
                                    ) : (
                                      <ModuleIcon className="w-4 h-4 text-white" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{module.title}</h4>
                                    <p className="text-sm text-gray-600">{module.description}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <ClockIcon className="w-4 h-4 mr-1" />
                                    {module.duration}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs ${getDifficultyColor(module.difficulty)}`}>
                                    {module.difficulty}
                                  </span>
                                  {module.dueDate && (
                                    <span className="flex items-center text-capas-coral">
                                      <CalendarIcon className="w-4 h-4 mr-1" />
                                      Due {new Date(module.dueDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                                
                                {!module.locked && module.progress > 0 && (
                                  <div className="mt-3">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(module.progress)}`}
                                        style={{ width: `${module.progress}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1 block">{module.progress}% complete</span>
                                  </div>
                                )}
                              </div>
                              
                              {!module.locked && (
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeTab === 'resources' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Available Resources</h3>
                        <div className="grid gap-4">
                          {selectedPath.modules.flatMap(module => module.resources).map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-capas-turquoise rounded-lg flex items-center justify-center">
                                  {resource.type === 'video' && <VideoCameraIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'document' && <DocumentIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'file' && <DocumentTextIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'link' && <BookOpenIcon className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                                  {resource.duration && (
                                    <span className="text-sm text-gray-500">{resource.duration}</span>
                                  )}
                                </div>
                              </div>
                              <button className="text-capas-turquoise hover:text-capas-turquoise-dark transition-colors">
                                <ChevronRightIcon className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Module Detail Modal */}
        <AnimatePresence>
          {selectedModule && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedModule(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedModule.completed ? 'bg-capas-palm' : 'bg-capas-turquoise'
                    }`}>
                      {selectedModule.completed ? (
                        <CheckCircleSolidIcon className="w-6 h-6 text-white" />
                      ) : (
                        React.createElement(getModuleIcon(selectedModule.type), { className: "w-6 h-6 text-white" })
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedModule.title}</h2>
                      <p className="text-gray-600">{selectedModule.type.toUpperCase()} • {selectedModule.duration}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-700">{selectedModule.description}</p>
                    </div>
                    
                    {selectedModule.resources.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Learning Resources</h3>
                        <div className="space-y-3">
                          {selectedModule.resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-capas-turquoise rounded-lg flex items-center justify-center">
                                  {resource.type === 'video' && <VideoCameraIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'document' && <DocumentIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'file' && <DocumentTextIcon className="w-4 h-4 text-white" />}
                                  {resource.type === 'link' && <BookOpenIcon className="w-4 h-4 text-white" />}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{resource.title}</h4>
                                  {resource.duration && (
                                    <span className="text-sm text-gray-500">{resource.duration}</span>
                                  )}
                                </div>
                              </div>
                              <button className="px-4 py-2 bg-capas-turquoise text-white rounded-lg hover:bg-capas-turquoise-dark transition-colors">
                                Open
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-4 pt-4 border-t border-gray-200">
                      {!selectedModule.completed && (
                        <button className="flex-1 bg-capas-turquoise text-white font-semibold py-3 rounded-lg hover:bg-capas-turquoise-dark transition-colors">
                          {selectedModule.progress > 0 ? 'Continue Learning' : 'Start Module'}
                        </button>
                      )}
                      <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                        Download Materials
                      </button>
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