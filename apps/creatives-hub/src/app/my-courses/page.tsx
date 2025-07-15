'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Float } from '@react-three/drei';
import { CreativeCourse } from '@/types/moodle';
import moodleApi from '@/services/moodleApi';
import CourseCard from '@/components/courses/CourseCard';
import ProgressTracker from '@/components/ui/ProgressTracker';
import UpcomingTasks from '@/components/courses/UpcomingTasks';
import BahamianCulturalScene from '@/components/cultural/BahamianCulturalScene';
import { CulturalHeader, CulturalCard, CulturalDivider } from '@/components/cultural/BahamianPatterns';
import {
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  BookOpenIcon,
  ChartBarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function MyCourses() {
  const [courses, setCourses] = useState<CreativeCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const enrolledCourses = await moodleApi.getEnrolledCourses('inprogress');
      setCourses(enrolledCourses);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Courses', icon: BookOpenIcon, color: '#0A8A98' },
    { id: 'visual_arts', name: 'Visual Arts', icon: SparklesIcon, color: '#FF8B87' },
    { id: 'music_tech', name: 'Music Tech', icon: SparklesIcon, color: '#FFCE00' },
    { id: 'design', name: 'Design', icon: SparklesIcon, color: '#7FA900' },
    { id: 'media_arts', name: 'Media Arts', icon: SparklesIcon, color: '#A8D5E2' },
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => {
        const categoryMap: { [key: string]: string } = {
          'visual_arts': 'Visual Arts',
          'music_tech': 'Music Technology',
          'design': 'Design',
          'media_arts': 'Media Arts'
        };
        return course.department === categoryMap[selectedCategory];
      });

  const stats = {
    totalCourses: courses.length,
    completedCourses: courses.filter(c => c.progress === 100).length,
    averageProgress: courses.length > 0 
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length)
      : 0,
    totalCredits: courses.reduce((sum, c) => sum + c.credits, 0)
  };

  const Scene3D = () => (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* Text3D temporarily disabled due to missing font file */}
      {/* <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Text3D
          font="/fonts/capas-font.json"
          size={1}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          CAPAS
          <meshStandardMaterial color="#0A8A98" />
        </Text3D>
      </Float> */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark loading-3d">Loading your creative journey...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Cultural Hero Header */}
      <CulturalHeader
        title="My Creative Courses"
        subtitle="Your journey through Bahamian culture and creative innovation"
        pattern="waves"
      >
        {/* 3D Cultural Scene Integration */}
        <div className="mb-8">
          <BahamianCulturalScene 
            variant="heritage" 
            height={200} 
            showControls={false}
            interactive={false}
            className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl"
          />
        </div>
        
        {/* View Mode Toggle */}
        <div className="inline-flex bg-white/20 rounded-lg p-1 backdrop-blur-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-white text-capas-turquoise' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === '3d' 
                ? 'bg-white text-capas-turquoise' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            3D Immersive
          </button>
        </div>
      </CulturalHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cultural Divider */}
        <CulturalDivider pattern="coral" height={40} />

        {/* Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              title: 'Enrolled Courses', 
              value: stats.totalCourses, 
              icon: BookOpenIcon, 
              color: 'bg-capas-turquoise',
              subtitle: 'Active Learning'
            },
            { 
              title: 'Average Progress', 
              value: `${stats.averageProgress}%`, 
              icon: ChartBarIcon, 
              color: 'bg-capas-coral',
              subtitle: 'Completion Rate'
            },
            { 
              title: 'Total Credits', 
              value: stats.totalCredits, 
              icon: AcademicCapIcon, 
              color: 'bg-capas-gold',
              subtitle: 'Academic Units'
            },
            { 
              title: 'Completed', 
              value: stats.completedCourses, 
              icon: TrophyIcon, 
              color: 'bg-capas-palm',
              subtitle: 'Achievements'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CulturalCard pattern="conch" className="p-6 text-center">
              <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-capas-turquoise mb-1">{stat.title}</div>
              <div className="text-xs text-capas-ocean-dark/70">{stat.subtitle}</div>
              </CulturalCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-capas-turquoise text-white shadow-lg transform -translate-y-0.5'
                  : 'bg-white text-capas-ocean-dark hover:bg-capas-sand-light'
              }`}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Courses Grid */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-2">
                Your Courses ({filteredCourses.length})
              </h2>
              <p className="text-capas-ocean-dark">
                Continue your creative journey with these active courses
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 gap-6"
              >
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
                  No courses in this category
                </h3>
                <p className="text-capas-ocean-dark">
                  Try selecting a different category or enroll in new courses
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CulturalCard pattern="palm" className="p-6">
              <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
                Progress Overview
              </h3>
              <ProgressTracker 
                value={stats.averageProgress} 
                size={120}
                strokeWidth={8}
                color="#0A8A98"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-capas-ocean-dark">Courses Active</span>
                  <span className="font-medium">{stats.totalCourses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-capas-ocean-dark">Credits Earned</span>
                  <span className="font-medium">{stats.totalCredits}</span>
                </div>
              </div>
              </CulturalCard>
            </motion.div>

            {/* Upcoming Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <UpcomingTasks courses={courses} />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <CulturalCard pattern="junkanoo" className="p-6">
              <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full btn-capas-primary text-sm py-2">
                  Browse Course Catalog
                </button>
                <button className="w-full btn-capas-secondary text-sm py-2">
                  Join Study Groups
                </button>
                <button className="w-full bg-capas-sand text-capas-ocean-dark border border-capas-ocean-light rounded-lg px-4 py-2 text-sm hover:bg-capas-sand-dark transition-colors">
                  View Achievements
                </button>
              </div>
              </CulturalCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}