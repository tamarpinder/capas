'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';
import Link from 'next/link';
import { CreativeCourse } from '@/types/moodle';
import ProgressTracker from '@/components/ui/ProgressTracker';
import {
  ClockIcon,
  UserIcon,
  CalendarIcon,
  PlayIcon,
  BookOpenIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';

interface CourseCardProps {
  course: CreativeCourse;
}

const RotatingGroup = ({ color }: { color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 32, 32]} position={[-1.5, 0, 0]}>
        <meshStandardMaterial color={color} opacity={0.8} transparent />
      </Sphere>
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={color} opacity={0.6} transparent />
      </Box>
      <Sphere args={[0.5, 16, 16]} position={[1.5, 0, 0]}>
        <meshStandardMaterial color={color} opacity={0.9} transparent />
      </Sphere>
    </group>
  );
};

const Course3DPreview = ({ color }: { color: string }) => (
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]} />
    <RotatingGroup color={color} />
    <OrbitControls enableZoom={false} enablePan={false} />
  </Canvas>
);

export default function CourseCard({ course }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [show3D, setShow3D] = useState(false);

  const formatDueDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const nextAssignment = course.assignments?.find(a => a.status === 'pending' || a.status === 'in_progress');
  const dueDateInfo = nextAssignment ? formatDueDate(nextAssignment.dueDate) : null;

  return (
    <motion.div
      className="creative-card group cursor-pointer overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Course Header with 3D Preview Toggle */}
      <div className="relative">
        <div 
          className="h-48 bg-gradient-to-br from-capas-ocean-light to-capas-turquoise rounded-t-lg overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${course.color}20, ${course.color}40)` }}
        >
          {show3D ? (
            <div className="canvas-container h-full">
              <Course3DPreview color={course.color} />
            </div>
          ) : (
            <div 
              className="h-full bg-cover bg-center relative"
              style={{ 
                backgroundImage: course.coverImage ? `url(${course.coverImage})` : 'none',
                backgroundColor: course.color + '20'
              }}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* 3D Toggle Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShow3D(!show3D);
                }}
                className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4 8-4M4 7l8 4m0 0v10m0-10L4 7m16 0v10l-8-4" />
                </svg>
              </button>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <PlayIcon className="w-8 h-8 text-white ml-1" />
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Department Badge */}
        <div 
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor: course.color }}
        >
          {course.department}
        </div>

        {/* Progress Ring */}
        <div className="absolute -bottom-6 left-6 bg-white rounded-full p-2 shadow-lg">
          <ProgressTracker 
            value={course.progress} 
            size={48} 
            strokeWidth={4}
            color={course.color}
            showText={false}
          />
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6 pt-8">
        {/* Course Title & Instructor */}
        <div className="mb-4">
          <h3 className="font-display text-lg font-semibold text-capas-turquoise mb-1 group-hover:text-capas-turquoise-dark transition-colors">
            {course.title}
          </h3>
          <div className="flex items-center text-sm text-capas-ocean-dark/70 mb-2">
            <UserIcon className="w-4 h-4 mr-1" />
            {course.instructor}
          </div>
          <p className="text-sm text-capas-ocean-dark/80 line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center text-capas-ocean-dark">
            <BookOpenIcon className="w-4 h-4 mr-2 text-capas-turquoise" />
            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
          </div>
          <div className="flex items-center text-capas-ocean-dark">
            <ClockIcon className="w-4 h-4 mr-2 text-capas-turquoise" />
            <span>{course.credits} credits</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-capas-ocean-dark">Progress</span>
            <span className="font-medium text-capas-turquoise">{course.progress}%</span>
          </div>
          <div className="w-full bg-capas-ocean-light/30 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: course.color }}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Next Assignment */}
        {nextAssignment && (
          <div className="mb-4 p-3 bg-capas-sand-light rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-capas-ocean-dark">Next Assignment</h4>
                <p className="text-xs text-capas-ocean-dark/70">{nextAssignment.title}</p>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${
                  dueDateInfo?.includes('today') || dueDateInfo?.includes('tomorrow') 
                    ? 'text-capas-coral' 
                    : 'text-capas-turquoise'
                }`}>
                  {dueDateInfo}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {course.tags?.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="inline-block bg-capas-ocean-light/20 text-capas-ocean-dark text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
            {course.tags?.length > 3 && (
              <span className="text-xs text-capas-ocean-dark/70">
                +{course.tags.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/courses/${course.id}`}
            className="flex-1 btn-capas-primary text-sm py-2 text-center inline-flex items-center justify-center space-x-1"
          >
            <span>Continue Learning</span>
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
          <button className="px-3 py-2 border border-capas-turquoise text-capas-turquoise rounded-lg hover:bg-capas-turquoise hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}