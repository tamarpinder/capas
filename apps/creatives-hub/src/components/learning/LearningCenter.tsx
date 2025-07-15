'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float } from '@react-three/drei';
import ProgressTracker, { MiniProgressTracker } from '@/components/ui/ProgressTracker';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  LockClosedIcon,
  StarIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  PencilIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'interactive' | 'hands-on' | 'project' | 'quiz' | 'reading';
  duration: string;
  completed: boolean;
  locked?: boolean;
  content: {
    videoUrl?: string;
    interactiveUrl?: string;
    resources?: string[];
    downloadables?: string[];
    instructions?: string;
    referenceImages?: string[];
    startingFile?: string;
    practice_files?: string[];
    brief?: string;
    references?: string[];
    templateFile?: string;
    audioUrl?: string;
    practice_tracks?: string[];
    audioSamples?: string[];
    sheet_music?: string[];
    equipment_list?: string;
    project_templates?: string[];
  };
}

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  lessons: Lesson[];
  locked?: boolean;
  prerequisite?: string;
}

interface LearningCenterProps {
  modules: Module[];
  courseTitle: string;
  courseColor?: string;
  onLessonSelect?: (moduleId: string, lessonId: string) => void;
}

const LessonItem = ({ lesson, moduleId, onSelect }: { 
  lesson: Lesson; 
  moduleId: string; 
  onSelect?: (moduleId: string, lessonId: string) => void;
}) => {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return PlayIcon;
      case 'interactive': return BookOpenIcon;
      case 'hands-on': return AcademicCapIcon;
      case 'project': return PencilIcon;
      case 'quiz': return CheckCircleIcon;
      case 'reading': return DocumentTextIcon;
      default: return BookOpenIcon;
    }
  };

  const getLessonColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-capas-coral';
      case 'interactive': return 'text-capas-turquoise';
      case 'hands-on': return 'text-capas-gold';
      case 'project': return 'text-capas-palm';
      case 'quiz': return 'text-capas-purple';
      case 'reading': return 'text-capas-ocean-dark';
      default: return 'text-capas-turquoise';
    }
  };

  const getResourceCount = () => {
    let count = 0;
    if (lesson.content.resources) count += lesson.content.resources.length;
    if (lesson.content.downloadables) count += lesson.content.downloadables.length;
    if (lesson.content.referenceImages) count += lesson.content.referenceImages.length;
    if (lesson.content.practice_files) count += lesson.content.practice_files.length;
    if (lesson.content.audioSamples) count += lesson.content.audioSamples.length;
    if (lesson.content.sheet_music) count += lesson.content.sheet_music.length;
    return count;
  };

  const IconComponent = getLessonIcon(lesson.type);
  const resourceCount = getResourceCount();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`group relative ${lesson.locked ? 'opacity-50' : ''}`}
    >
      <div 
        className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
          lesson.completed 
            ? 'bg-capas-turquoise/10 border-capas-turquoise' 
            : lesson.locked
            ? 'bg-capas-sand-light border-capas-ocean-light/30 cursor-not-allowed'
            : 'bg-white border-capas-ocean-light/30 hover:border-capas-turquoise/50 hover:bg-capas-sand-light'
        }`}
        onClick={() => !lesson.locked && onSelect?.(moduleId, lesson.id)}
      >
        {/* Status Icon */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          lesson.completed 
            ? 'bg-capas-turquoise text-white' 
            : lesson.locked
            ? 'bg-capas-sand text-capas-ocean-dark/50'
            : 'bg-capas-sand-light text-capas-turquoise'
        }`}>
          {lesson.locked ? (
            <LockClosedIcon className="w-5 h-5" />
          ) : lesson.completed ? (
            <CheckCircleSolidIcon className="w-5 h-5" />
          ) : (
            <IconComponent className="w-5 h-5" />
          )}
        </div>

        {/* Lesson Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-capas-ocean-dark group-hover:text-capas-turquoise transition-colors">
                {lesson.title}
              </h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-capas-ocean-dark/70">
                <div className="flex items-center space-x-1">
                  <span className={`capitalize ${getLessonColor(lesson.type)}`}>
                    {lesson.type}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{lesson.duration}</span>
                </div>
                {resourceCount > 0 && (
                  <div className="flex items-center space-x-1">
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    <span>{resourceCount} resources</span>
                  </div>
                )}
              </div>
            </div>
            
            {!lesson.locked && (
              <ChevronRightIcon className="w-5 h-5 text-capas-ocean-dark/40 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>

          {/* Progress Bar for In-Progress Lessons */}
          {!lesson.completed && !lesson.locked && (
            <div className="mt-3">
              <MiniProgressTracker value={Math.random() * 100} color="#0A8A98" />
            </div>
          )}

          {/* Resource Preview */}
          {!lesson.locked && resourceCount > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {lesson.content.resources?.slice(0, 2).map((resource, idx) => (
                <span key={idx} className="text-xs bg-capas-sand px-2 py-1 rounded text-capas-ocean-dark">
                  {resource.split('/').pop()}
                </span>
              ))}
              {resourceCount > 2 && (
                <span className="text-xs text-capas-ocean-dark/60">
                  +{resourceCount - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ModuleAccordion = ({ 
  module, 
  isExpanded, 
  onToggle, 
  onLessonSelect,
  courseColor 
}: {
  module: Module;
  isExpanded: boolean;
  onToggle: () => void;
  onLessonSelect?: (moduleId: string, lessonId: string) => void;
  courseColor: string;
}) => {
  const completedLessons = module.lessons.filter(lesson => lesson.completed).length;
  const totalLessons = module.lessons.length;
  const isModuleLocked = module.locked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`creative-card overflow-hidden ${isModuleLocked ? 'opacity-60' : ''}`}
    >
      {/* Module Header */}
      <button
        onClick={() => !isModuleLocked && onToggle()}
        disabled={isModuleLocked}
        className={`w-full p-6 text-left transition-colors ${
          isModuleLocked ? 'cursor-not-allowed' : 'hover:bg-capas-sand-light'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isModuleLocked 
                  ? 'bg-capas-sand text-capas-ocean-dark/50'
                  : module.progress === 100
                  ? 'bg-capas-turquoise text-white'
                  : 'text-white'
              }`} style={{ 
                backgroundColor: isModuleLocked ? '' : module.progress === 100 ? '' : courseColor 
              }}>
                {isModuleLocked ? (
                  <LockClosedIcon className="w-6 h-6" />
                ) : module.progress === 100 ? (
                  <CheckCircleSolidIcon className="w-6 h-6" />
                ) : (
                  <BookOpenIcon className="w-6 h-6" />
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-1">
                  {module.title}
                </h3>
                <p className="text-capas-ocean-dark/80 text-sm line-clamp-2">
                  {module.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-capas-ocean-dark/70">
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{module.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <BookOpenIcon className="w-4 h-4" />
                <span>{completedLessons}/{totalLessons} lessons</span>
              </div>
              {module.prerequisite && (
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4" />
                  <span>Prerequisite: {module.prerequisite}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Progress Tracker */}
            <ProgressTracker 
              value={module.progress} 
              size={80}
              strokeWidth={6}
              color={courseColor}
              showText={false}
            />
            
            {/* Expand Icon */}
            {!isModuleLocked && (
              <ChevronDownIcon className={`w-6 h-6 text-capas-ocean-dark transition-transform ${
                isExpanded ? 'transform rotate-180' : ''
              }`} />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-capas-ocean-dark">Module Progress</span>
            <span className="font-medium" style={{ color: courseColor }}>
              {module.progress}%
            </span>
          </div>
          <div className="w-full bg-capas-ocean-light/30 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ backgroundColor: courseColor }}
              initial={{ width: 0 }}
              animate={{ width: `${module.progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
      </button>

      {/* Module Content */}
      <AnimatePresence>
        {isExpanded && !isModuleLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-capas-ocean-light/30"
          >
            <div className="p-6 bg-capas-sand-light space-y-3">
              {module.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  moduleId={module.id}
                  onSelect={onLessonSelect}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Locked Module Info */}
      {isModuleLocked && (
        <div className="p-6 border-t border-capas-ocean-light/30 bg-capas-sand-light">
          <div className="text-center py-4">
            <LockClosedIcon className="w-8 h-8 text-capas-ocean-dark/50 mx-auto mb-2" />
            <p className="text-capas-ocean-dark/70 text-sm">
              Complete previous modules to unlock this content
            </p>
            {module.prerequisite && (
              <p className="text-capas-ocean-dark/60 text-xs mt-1">
                Prerequisite: {module.prerequisite}
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const LearningCenter = ({ 
  modules, 
  courseTitle, 
  courseColor = '#0A8A98',
  onLessonSelect 
}: LearningCenterProps) => {
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [selectedView, setSelectedView] = useState<'modules' | 'progress' | 'achievements'>('modules');

  const toggleModule = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completedLessons = modules.reduce(
    (sum, module) => sum + module.lessons.filter(lesson => lesson.completed).length, 
    0
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const Scene3D = () => (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {modules.map((module, index) => {
        const angle = (index / modules.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (module.progress / 100) * 2 - 1;
        
        return (
          <Float key={module.id} speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <Sphere args={[0.5, 32, 32]} position={[x, y, z]}>
              <meshStandardMaterial 
                color={module.locked ? '#BDC3C7' : courseColor}
                opacity={0.8}
                transparent
                emissive={module.progress === 100 ? courseColor : '#000000'}
                emissiveIntensity={module.progress === 100 ? 0.3 : 0}
              />
            </Sphere>
          </Float>
        );
      })}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="creative-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-capas-turquoise mb-2">
              Learning Center
            </h1>
            <p className="text-capas-ocean-dark">
              {courseTitle} • {modules.length} modules • {totalLessons} lessons
            </p>
          </div>
          
          {/* 3D Preview */}
          <div className="w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-capas-sand-light to-capas-ocean-light/20">
            <Scene3D />
          </div>
        </div>

        {/* Overall Progress */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center space-x-4">
            <ProgressTracker 
              value={overallProgress} 
              size={100}
              strokeWidth={8}
              color={courseColor}
            />
            <div>
              <h3 className="font-semibold text-capas-ocean-dark">Course Progress</h3>
              <p className="text-sm text-capas-ocean-dark/70">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-capas-turquoise">{modules.length}</div>
              <div className="text-sm text-capas-ocean-dark/70">Modules</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-capas-coral">{completedLessons}</div>
              <div className="text-sm text-capas-ocean-dark/70">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-capas-gold">
                {modules.filter(m => m.progress === 100).length}
              </div>
              <div className="text-sm text-capas-ocean-dark/70">Finished</div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex space-x-1 bg-capas-sand-light rounded-lg p-1">
          {[
            { id: 'modules', name: 'Modules', icon: BookOpenIcon },
            { id: 'progress', name: 'Progress', icon: ChartBarIcon },
            { id: 'achievements', name: 'Achievements', icon: StarIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-white text-capas-turquoise shadow-sm'
                  : 'text-capas-ocean-dark hover:text-capas-turquoise'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {selectedView === 'modules' && (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {modules.map((module, index) => (
              <ModuleAccordion
                key={module.id}
                module={module}
                isExpanded={expandedModules.has(module.id)}
                onToggle={() => toggleModule(module.id)}
                onLessonSelect={onLessonSelect}
                courseColor={courseColor}
              />
            ))}
          </motion.div>
        )}

        {selectedView === 'progress' && (
          <motion.div
            key="progress"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="creative-card p-6"
          >
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6">
              Progress Analytics
            </h2>
            
            <div className="space-y-6">
              {modules.map((module, index) => (
                <div key={module.id} className="flex items-center space-x-4 p-4 bg-capas-sand-light rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <span className="font-bold text-capas-turquoise">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-capas-ocean-dark mb-1">{module.title}</h3>
                    <MiniProgressTracker value={module.progress} color={courseColor} />
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: courseColor }}>
                      {module.progress}%
                    </div>
                    <div className="text-sm text-capas-ocean-dark/70">
                      {module.lessons.filter(l => l.completed).length}/{module.lessons.length}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedView === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="creative-card p-6"
          >
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6">
              Learning Achievements
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'First Steps', 
                  description: 'Started your first lesson',
                  earned: completedLessons > 0,
                  icon: '🌟'
                },
                { 
                  title: 'Dedicated Learner', 
                  description: 'Completed 5 lessons',
                  earned: completedLessons >= 5,
                  icon: '📚'
                },
                { 
                  title: 'Module Master', 
                  description: 'Completed your first module',
                  earned: modules.some(m => m.progress === 100),
                  icon: '🏆'
                },
                { 
                  title: 'Consistent Progress', 
                  description: 'Maintained 50% course progress',
                  earned: overallProgress >= 50,
                  icon: '⚡'
                },
                { 
                  title: 'Creative Explorer', 
                  description: 'Accessed 3D resources',
                  earned: true, // Assume true for demo
                  icon: '🎨'
                },
                { 
                  title: 'Community Contributor', 
                  description: 'Participated in forum discussions',
                  earned: true, // Assume true for demo
                  icon: '💬'
                }
              ].map((achievement, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.earned 
                    ? 'border-capas-gold bg-capas-gold/10' 
                    : 'border-capas-ocean-light/30 bg-capas-sand-light opacity-50'
                }`}>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="font-semibold text-capas-ocean-dark mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-capas-ocean-dark/70">
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-capas-gold text-white">
                          Earned
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearningCenter;