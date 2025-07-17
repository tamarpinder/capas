'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float } from '@react-three/drei';
import { CreativeCourse, CourseContentData, CourseContentModule } from '@/types/moodle';
import moodleApi from '@/services/moodleApi';
import ResourceLibrary3D from '@/components/resources/ResourceLibrary3D';
import ProgressTracker from '@/components/ui/ProgressTracker';
import {
  PlayIcon,
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  AcademicCapIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CourseDetail({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<CreativeCourse | null>(null);
  const [courseContent, setCourseContent] = useState<CourseContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'modules' | 'resources' | 'assignments'>('overview');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  useEffect(() => {
    loadCourseData();
  }, [params.courseId]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      const [enrolledCourses, content] = await Promise.all([
        moodleApi.getEnrolledCourses('inprogress'),
        moodleApi.getCourseContent(params.courseId)
      ]);
      
      const foundCourse = enrolledCourses.find(c => c.id === params.courseId);
      setCourse(foundCourse || null);
      setCourseContent(content);
    } catch (error) {
      console.error('Failed to load course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const Scene3D = () => (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color={course?.color || '#0A8A98'} opacity={0.8} transparent />
        </Sphere>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );

  const getModuleProgress = (module: CourseContentModule) => {
    if (!module.lessons) return 0;
    const completedLessons = module.lessons.filter((lesson) => lesson.completed).length;
    return Math.round((completedLessons / module.lessons.length) * 100);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayIcon;
      case 'interactive': return BookOpenIcon;
      case 'hands-on': return AcademicCapIcon;
      case 'project': return DocumentTextIcon;
      default: return BookOpenIcon;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="font-display text-2xl font-bold text-capas-turquoise mb-2">Course Not Found</h1>
          <p className="text-capas-ocean-dark mb-6">The course you&apos;re looking for doesn&apos;t exist or isn&apos;t available.</p>
          <Link href="/my-courses" className="btn-capas-primary">
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Hero Header */}
      <section className="relative h-80 overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${course.color}90, ${course.color}60)` 
      }}>
        <div className="absolute inset-0 opacity-20">
          <Scene3D />
        </div>
        
        <div className="relative z-10 h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="w-full">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-white/80 mb-6"
              >
                <Link href="/my-courses" className="flex items-center space-x-1 hover:text-white transition-colors">
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>My Courses</span>
                </Link>
                <ChevronRightIcon className="w-4 h-4" />
                <span>{course.title}</span>
              </motion.div>

              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-white"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: course.color, color: 'white' }}
                      >
                        {course.department}
                      </span>
                      <span className="text-white/80">{course.credits} Credits</span>
                    </div>
                    
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                      {course.title}
                    </h1>
                    
                    <p className="text-xl opacity-90 mb-6 leading-relaxed">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-5 h-5" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpenIcon className="w-5 h-5" />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ClockIcon className="w-5 h-5" />
                        <span>{courseContent?.modules?.length || 0} modules</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Progress Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center text-white"
                >
                  <ProgressTracker 
                    value={course.progress} 
                    size={120}
                    strokeWidth={8}
                    color="white"
                    backgroundColor="rgba(255,255,255,0.3)"
                  />
                  <div className="mt-4">
                    <div className="text-2xl font-bold">{course.progress}%</div>
                    <div className="text-white/80">Course Progress</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-capas-ocean-light/30">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BookOpenIcon },
                { id: 'modules', name: 'Modules', icon: AcademicCapIcon },
                { id: 'resources', name: 'Resources', icon: DocumentTextIcon },
                { id: 'assignments', name: 'Assignments', icon: CheckCircleIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as 'overview' | 'modules' | 'resources' | 'assignments')}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'border-capas-turquoise text-capas-turquoise'
                      : 'border-transparent text-capas-ocean-dark hover:text-capas-turquoise'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {selectedTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-4">
                      Course Overview
                    </h2>
                    <div className="prose max-w-none text-capas-ocean-dark">
                      <p className="text-lg leading-relaxed mb-6">
                        {course.description}
                      </p>
                      <p>
                        This course is designed to provide you with hands-on experience in {course.department.toLowerCase()}, 
                        combining traditional Bahamian cultural elements with modern creative techniques. 
                        Through interactive lessons, practical projects, and collaborative discussions, 
                        you&apos;ll develop both technical skills and cultural appreciation.
                      </p>
                    </div>
                  </div>

                  {/* Skills & Tags */}
                  <div>
                    <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
                      Skills You&apos;ll Learn
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags?.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-capas-sand-light text-capas-ocean-dark rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-capas-sand-light rounded-lg">
                      <div className="text-3xl font-bold text-capas-turquoise">{course.totalLessons}</div>
                      <div className="text-capas-ocean-dark">Total Lessons</div>
                    </div>
                    <div className="text-center p-4 bg-capas-sand-light rounded-lg">
                      <div className="text-3xl font-bold text-capas-coral">{course.assignments?.length || 0}</div>
                      <div className="text-capas-ocean-dark">Assignments</div>
                    </div>
                    <div className="text-center p-4 bg-capas-sand-light rounded-lg">
                      <div className="text-3xl font-bold text-capas-gold">{course.credits}</div>
                      <div className="text-capas-ocean-dark">Credits</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedTab === 'modules' && (
                <motion.div
                  key="modules"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6">
                    Course Modules
                  </h2>
                  
                  <div className="space-y-4">
                    {courseContent?.modules?.map((module: any, index: number) => {
                      const moduleProgress = getModuleProgress(module);
                      const isExpanded = expandedModule === module.id;
                      
                      return (
                        <div key={module.id} className="border border-capas-ocean-light/30 rounded-lg overflow-hidden">
                          <button
                            onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                            className="w-full p-6 text-left hover:bg-capas-sand-light transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                  <span className="text-sm font-medium text-capas-turquoise">
                                    Module {index + 1}
                                  </span>
                                  <span className="text-sm text-capas-ocean-dark/70">
                                    {module.duration}
                                  </span>
                                </div>
                                <h3 className="font-display text-lg font-semibold text-capas-ocean-dark mb-2">
                                  {module.title}
                                </h3>
                                <p className="text-capas-ocean-dark/80 text-sm">
                                  {module.description}
                                </p>
                              </div>
                              <div className="flex items-center space-x-4">
                                <ProgressTracker 
                                  value={moduleProgress} 
                                  size={60}
                                  strokeWidth={6}
                                  color={course.color}
                                  showText={false}
                                />
                                <ChevronDownIcon className={`w-5 h-5 text-capas-ocean-dark transition-transform ${
                                  isExpanded ? 'transform rotate-180' : ''
                                }`} />
                              </div>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-capas-ocean-light/30 bg-capas-sand-light"
                              >
                                <div className="p-6 space-y-3">
                                  {module.lessons?.map((lesson: any, lessonIndex: number) => {
                                    const LessonIcon = getLessonIcon(lesson.type);
                                    
                                    return (
                                      <div key={lesson.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg">
                                        <div className={`p-2 rounded-lg ${
                                          lesson.completed ? 'bg-capas-turquoise text-white' : 'bg-capas-sand text-capas-turquoise'
                                        }`}>
                                          {lesson.completed ? (
                                            <CheckCircleIcon className="w-5 h-5" />
                                          ) : (
                                            <LessonIcon className="w-5 h-5" />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <h4 className="font-medium text-capas-ocean-dark">
                                            {lesson.title}
                                          </h4>
                                          <div className="flex items-center space-x-3 text-sm text-capas-ocean-dark/70">
                                            <span className="capitalize">{lesson.type}</span>
                                            <span>•</span>
                                            <span>{lesson.duration}</span>
                                          </div>
                                        </div>
                                        <button className="btn-capas-primary text-sm">
                                          {lesson.completed ? 'Review' : 'Start'}
                                        </button>
                                      </div>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {selectedTab === 'resources' && (
                <motion.div
                  key="resources"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResourceLibrary3D 
                    resources={courseContent?.resources || []}
                    courseTitle={course.title}
                    courseColor={course.color}
                  />
                </motion.div>
              )}

              {selectedTab === 'assignments' && (
                <motion.div
                  key="assignments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6">
                    Course Assignments
                  </h2>
                  
                  {courseContent?.assignments?.map((assignment: any, index: number) => (
                    <div key={assignment.id} className="creative-card p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
                            {assignment.title}
                          </h3>
                          <p className="text-capas-ocean-dark mb-4">
                            {assignment.description}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-capas-coral/20 text-capas-coral rounded-full text-sm font-medium">
                          {assignment.maxPoints} points
                        </span>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-capas-ocean-dark/70">Due Date:</span>
                          <span className="ml-2 font-medium text-capas-ocean-dark">
                            {new Date(assignment.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-capas-ocean-dark/70">Format:</span>
                          <span className="ml-2 font-medium text-capas-ocean-dark">
                            {assignment.submissionFormat}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex space-x-3">
                        <button className="btn-capas-primary text-sm">
                          View Details
                        </button>
                        <button className="btn-capas-secondary text-sm">
                          Download Rubric
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}