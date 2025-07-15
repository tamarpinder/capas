'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Plane, Text, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  DocumentIcon,
  PlayIcon,
  SpeakerWaveIcon,
  PhotoIcon,
  CubeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowsPointingOutIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Resource {
  id: string;
  title: string;
  type: 'document_collection' | '3d_gallery' | 'audio_collection' | 'video' | 'interactive' | 'image_gallery';
  description: string;
  content: any;
}

interface ResourceLibrary3DProps {
  resources: Resource[];
  courseTitle: string;
  courseColor?: string;
}

interface BookPageProps {
  position: [number, number, number];
  rotation: [number, number, number];
  resource: Resource;
  isActive: boolean;
  pageNumber: number;
}

const BookPage = ({ position, rotation, resource, isActive, pageNumber }: BookPageProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.05;
    }
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document_collection': return '📚';
      case '3d_gallery': return '🎨';
      case 'audio_collection': return '🎵';
      case 'video': return '🎬';
      case 'interactive': return '⚡';
      case 'image_gallery': return '🖼️';
      default: return '📄';
    }
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Page Background */}
      <Box ref={meshRef} args={[2.8, 4, 0.05]}>
        <meshStandardMaterial color="#f8f8f8" />
      </Box>
      
      {/* Content Preview */}
      <Html
        position={[0, 0, 0.05]}
        transform
        occlude
        style={{
          width: '280px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
      >
        <div className="h-full flex flex-col">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{getResourceIcon(resource.type)}</div>
            <h3 className="font-bold text-sm text-capas-ocean-dark mb-1">
              {resource.title}
            </h3>
            <p className="text-xs text-capas-ocean-dark/70 line-clamp-2">
              {resource.description}
            </p>
          </div>
          
          <div className="flex-1">
            {resource.type === 'document_collection' && (
              <div className="space-y-2">
                {resource.content.documents?.slice(0, 4).map((doc: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-capas-sand-light rounded text-xs">
                    <DocumentIcon className="w-4 h-4 text-capas-turquoise" />
                    <span className="truncate">{doc.split('/').pop()}</span>
                  </div>
                ))}
              </div>
            )}
            
            {resource.type === '3d_gallery' && (
              <div className="space-y-2">
                {resource.content.models?.slice(0, 3).map((model: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-capas-sand-light rounded text-xs">
                    <CubeIcon className="w-4 h-4 text-capas-coral" />
                    <div>
                      <div className="font-medium">{model.name}</div>
                      <div className="text-capas-ocean-dark/70 text-xs">{model.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {resource.type === 'audio_collection' && (
              <div className="space-y-2">
                {resource.content.samples?.slice(0, 3).map((sample: any, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-capas-sand-light rounded text-xs">
                    <SpeakerWaveIcon className="w-4 h-4 text-capas-gold" />
                    <div>
                      <div className="font-medium">{sample.name}</div>
                      <div className="text-capas-ocean-dark/70">{sample.bpm} BPM • {sample.key}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="text-center mt-4">
            <div className="text-xs text-capas-ocean-dark/60">Page {pageNumber}</div>
          </div>
        </div>
      </Html>
    </group>
  );
};

const Book3D = ({ resources, currentPage, courseColor }: { resources: Resource[], currentPage: number, courseColor: string }) => {
  const bookRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={bookRef}>
      {/* Book Spine */}
      <Box position={[0, 0, -0.1]} args={[3, 4.2, 0.3]}>
        <meshStandardMaterial color={courseColor} />
      </Box>
      
      {/* Book Cover */}
      <Box position={[0.05, 0, 0.05]} args={[3, 4.2, 0.1]}>
        <meshStandardMaterial color="#2D3748" />
      </Box>
      
      {/* Title on Cover */}
      <Html position={[0, 1, 0.15]} transform>
        <div className="text-white text-center font-bold">
          Resource Library
        </div>
      </Html>
      
      {/* Pages */}
      {resources.map((resource, index) => {
        const isCurrentPage = index === currentPage;
        const pageOffset = index - currentPage;
        const xPos = pageOffset * 0.1;
        const rotationY = isCurrentPage ? 0 : pageOffset * 0.2;
        
        return (
          <BookPage
            key={resource.id}
            position={[xPos, 0, 0.2 + index * 0.01]}
            rotation={[0, rotationY, 0]}
            resource={resource}
            isActive={isCurrentPage}
            pageNumber={index + 1}
          />
        );
      })}
    </group>
  );
};

const ResourceLibrary3D = ({ resources, courseTitle, courseColor = '#0A8A98' }: ResourceLibrary3DProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const nextPage = () => {
    if (currentPage < resources.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'document_collection': return DocumentIcon;
      case '3d_gallery': return CubeIcon;
      case 'audio_collection': return SpeakerWaveIcon;
      case 'video': return PlayIcon;
      case 'image_gallery': return PhotoIcon;
      default: return DocumentIcon;
    }
  };

  if (resources.length === 0) {
    return (
      <div className="creative-card p-8 text-center">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
          No Resources Available
        </h3>
        <p className="text-capas-ocean-dark">
          Resources will appear here as they become available for this course.
        </p>
      </div>
    );
  }

  return (
    <div className="creative-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-capas-ocean-light/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-1">
              3D Resource Library
            </h2>
            <p className="text-capas-ocean-dark">{courseTitle}</p>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-capas-turquoise hover:bg-capas-sand-light rounded-lg transition-colors"
          >
            <ArrowsPointingOutIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 3D Book Viewer */}
      <div className="relative">
        <div className="h-96 bg-gradient-to-br from-capas-sand-light to-capas-ocean-light/20">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Book3D 
              resources={resources} 
              currentPage={currentPage}
              courseColor={courseColor}
            />
            
            <OrbitControls 
              enableZoom={true} 
              enablePan={false}
              minDistance={5}
              maxDistance={15}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 0 
                ? 'text-capas-ocean-dark/30 cursor-not-allowed' 
                : 'text-capas-turquoise hover:bg-capas-turquoise hover:text-white'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            {resources.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-capas-turquoise' : 'bg-capas-ocean-dark/30'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextPage}
            disabled={currentPage === resources.length - 1}
            className={`p-2 rounded-full transition-colors ${
              currentPage === resources.length - 1
                ? 'text-capas-ocean-dark/30 cursor-not-allowed'
                : 'text-capas-turquoise hover:bg-capas-turquoise hover:text-white'
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Page Counter */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-capas-ocean-dark">
          {currentPage + 1} of {resources.length}
        </div>
      </div>

      {/* Resource Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
            {resources[currentPage]?.title}
          </h3>
          <p className="text-capas-ocean-dark mb-4">
            {resources[currentPage]?.description}
          </p>
        </div>

        {/* Resource List */}
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((resource, index) => {
            const IconComponent = getResourceTypeIcon(resource.type);
            const isActive = index === currentPage;
            
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  isActive 
                    ? 'border-capas-turquoise bg-capas-turquoise/10' 
                    : 'border-capas-ocean-light/30 bg-white hover:border-capas-turquoise/50'
                }`}
                onClick={() => setCurrentPage(index)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-capas-turquoise text-white' : 'bg-capas-sand-light text-capas-turquoise'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-capas-ocean-dark mb-1">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-capas-ocean-dark/70 line-clamp-2">
                      {resource.description}
                    </p>
                    
                    {/* Resource Count */}
                    <div className="mt-2 text-xs text-capas-turquoise font-medium">
                      {resource.type === 'document_collection' && 
                        `${resource.content.documents?.length || 0} documents`
                      }
                      {resource.type === '3d_gallery' && 
                        `${resource.content.models?.length || 0} 3D models`
                      }
                      {resource.type === 'audio_collection' && 
                        `${resource.content.samples?.length || 0} audio samples`
                      }
                    </div>
                  </div>
                  
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-capas-turquoise"
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            onClick={() => setSelectedResource(resources[currentPage])}
            className="btn-capas-primary text-sm"
          >
            Open Resource
          </button>
          <button className="btn-capas-secondary text-sm">
            Download All
          </button>
          <button className="bg-capas-sand text-capas-ocean-dark border border-capas-ocean-light rounded-lg px-4 py-2 text-sm hover:bg-capas-sand-dark transition-colors">
            Add to Favorites
          </button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-6xl h-5/6 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-display text-xl font-semibold text-capas-turquoise">
                  3D Resource Library - Fullscreen
                </h3>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-2 text-capas-ocean-dark hover:bg-capas-sand-light rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="h-full">
                <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  
                  <Book3D 
                    resources={resources} 
                    currentPage={currentPage}
                    courseColor={courseColor}
                  />
                  
                  <OrbitControls 
                    enableZoom={true} 
                    enablePan={true}
                    minDistance={3}
                    maxDistance={20}
                  />
                </Canvas>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResourceLibrary3D;