'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import moodleApi from '@/services/moodleApi';
import LearningCenter from '@/components/learning/LearningCenter';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  UserIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LearningCenterPage() {
  const [courseContent, setCourseContent] = useState<any>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>('ART301');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadCourseContent(selectedCourse);
    }
  }, [selectedCourse]);

  const loadData = async () => {
    try {
      setLoading(true);
      const courses = await moodleApi.getEnrolledCourses('inprogress');
      setEnrolledCourses(courses);
      
      // Load content for the first course by default
      if (courses.length > 0) {
        const content = await moodleApi.getCourseContent(courses[0].id);
        setCourseContent(content);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCourseContent = async (courseId: string) => {
    try {
      const content = await moodleApi.getCourseContent(courseId);
      setCourseContent(content);
    } catch (error) {
      console.error('Failed to load course content:', error);
    }
  };

  const handleLessonSelect = (moduleId: string, lessonId: string) => {
    console.log('Selected lesson:', { moduleId, lessonId });
    // In a real app, this would navigate to the lesson or open a lesson modal
  };

  const getCurrentCourse = () => {
    return enrolledCourses.find(course => course.id === selectedCourse);
  };

  const Scene3D = () => (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* Text3D temporarily disabled due to missing font file */}
      {/* <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text3D
          font="/fonts/capas-font.json"
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Learning
          <meshStandardMaterial color="#0A8A98" />
        </Text3D>
      </Float> */}
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark">Loading learning center...</p>
        </div>
      </div>
    );
  }

  const currentCourse = getCurrentCourse();

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Hero Header */}
      <section className="relative h-80 bg-gradient-to-br from-capas-turquoise to-capas-ocean overflow-hidden">
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
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span>My Courses</span>
                </Link>
                <span>/</span>
                <span>Learning Center</span>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white"
                >
                  <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                    Learning Center
                  </h1>
                  <p className="text-xl opacity-90 mb-6">
                    Organize your learning journey with interactive modules and progress tracking
                  </p>
                  
                  {currentCourse && (
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <UserIcon className="w-5 h-5" />
                        <span>{currentCourse.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AcademicCapIcon className="w-5 h-5" />
                        <span>{currentCourse.credits} Credits</span>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Course Selection */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-white/20 backdrop-blur-sm rounded-lg p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-white mb-4">
                    Select Course
                  </h3>
                  <div className="space-y-3">
                    {enrolledCourses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => setSelectedCourse(course.id)}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          selectedCourse === course.id
                            ? 'bg-white text-capas-turquoise'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm opacity-80">{course.department}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Center Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {courseContent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LearningCenter
              modules={courseContent.modules || []}
              courseTitle={currentCourse?.title || 'Course'}
              courseColor={currentCourse?.color || '#0A8A98'}
              onLessonSelect={handleLessonSelect}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
              No Content Available
            </h3>
            <p className="text-capas-ocean-dark mb-6">
              Course content will appear here when available
            </p>
            <Link href="/my-courses" className="btn-capas-primary">
              Back to Courses
            </Link>
          </motion.div>
        )}

        {/* Learning Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6 text-center">
            Learning Tips & Navigation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-capas-turquoise/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpenIcon className="w-8 h-8 text-capas-turquoise" />
              </div>
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Organized Learning</h3>
              <p className="text-sm text-capas-ocean-dark/70">
                Course content is organized into modules with clear progression paths
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-capas-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-capas-coral" />
              </div>
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Progress Tracking</h3>
              <p className="text-sm text-capas-ocean-dark/70">
                Monitor your progress through visual indicators and completion percentages
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-capas-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-capas-gold" />
              </div>
              <h3 className="font-semibold text-capas-ocean-dark mb-2">Interactive Content</h3>
              <p className="text-sm text-capas-ocean-dark/70">
                Engage with videos, interactive exercises, and hands-on projects
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 pt-6 border-t border-capas-ocean-light/30">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/my-courses" className="btn-capas-secondary text-sm">
                View All Courses
              </Link>
              <Link href="/forums" className="btn-capas-secondary text-sm">
                Join Discussions
              </Link>
              <button className="bg-capas-sand text-capas-ocean-dark border border-capas-ocean-light rounded-lg px-4 py-2 text-sm hover:bg-capas-sand-dark transition-colors">
                Download Course Materials
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}