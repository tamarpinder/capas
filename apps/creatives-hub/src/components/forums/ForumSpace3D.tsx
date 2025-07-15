'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Html, Float, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import {
  ChatBubbleLeftIcon,
  UserIcon,
  ClockIcon,
  HeartIcon,
  EyeIcon,
  PlusIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface ForumThread {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  lastReply: string;
  replies: number;
  views: number;
  likes: number;
  pinned?: boolean;
  attachments?: number;
  tags?: string[];
}

interface DiscussionBubbleProps {
  thread: ForumThread;
  position: [number, number, number];
  isSelected: boolean;
  onClick: () => void;
  forumColor: string;
}

const DiscussionBubble = ({ thread, position, isSelected, onClick, forumColor }: DiscussionBubbleProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      if (isSelected) {
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      } else if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  return (
    <group position={position}>
      {/* Main Discussion Sphere */}
      <Sphere
        ref={meshRef}
        args={[0.8, 32, 32]}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={isSelected ? '#FFCE00' : forumColor}
          opacity={0.8}
          transparent
          emissive={isSelected ? '#0A8A98' : '#000000'}
          emissiveIntensity={isSelected ? 0.2 : 0}
        />
      </Sphere>

      {/* Reply Indicators */}
      {Array.from({ length: Math.min(thread.replies, 8) }).map((_, index) => (
        <Float key={index} speed={1 + index * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
          <Sphere 
            args={[0.15, 16, 16]} 
            position={[
              Math.cos((index / 8) * Math.PI * 2) * 1.5,
              Math.sin((index / 8) * Math.PI * 2) * 0.5,
              Math.sin((index / 8) * Math.PI * 2) * 1.5
            ]}
          >
            <meshStandardMaterial color="#A8D5E2" opacity={0.6} transparent />
          </Sphere>
        </Float>
      ))}

      {/* Pin Indicator */}
      {thread.pinned && (
        <Cylinder args={[0.1, 0.1, 0.5]} position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#FFCE00" />
        </Cylinder>
      )}

      {/* Thread Info Panel */}
      <Html position={[0, -1.5, 0]} center>
        <div className={`bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg transition-all ${
          isSelected || hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`} style={{ minWidth: '200px' }}>
          <h4 className="font-semibold text-sm text-capas-ocean-dark mb-1 line-clamp-2">
            {thread.title}
          </h4>
          <div className="flex items-center space-x-2 text-xs text-capas-ocean-dark/70 mb-2">
            <UserIcon className="w-3 h-3" />
            <span>{thread.author.name}</span>
            <span>•</span>
            <span>{getTimeAgo(thread.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="w-3 h-3 text-capas-turquoise" />
                <span>{thread.replies}</span>
              </div>
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-3 h-3 text-capas-coral" />
                <span>{thread.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <HeartIcon className="w-3 h-3 text-capas-gold" />
                <span>{thread.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
};

interface ForumSpace3DProps {
  forumTitle: string;
  threads: ForumThread[];
  forumColor?: string;
  courseId?: string;
}

const ForumSpace3D = ({ forumTitle, threads, forumColor = '#0A8A98', courseId }: ForumSpace3DProps) => {
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 10]);

  const generateThreadPositions = () => {
    const positions: [number, number, number][] = [];
    const gridSize = Math.ceil(Math.sqrt(threads.length));
    
    threads.forEach((_, index) => {
      const x = (index % gridSize - gridSize / 2) * 3;
      const z = (Math.floor(index / gridSize) - gridSize / 2) * 3;
      const y = (Math.random() - 0.5) * 2; // Add some vertical variation
      positions.push([x, y, z]);
    });
    
    return positions;
  };

  const threadPositions = generateThreadPositions();

  const Forum3DScene = () => (
    <Canvas camera={{ position: cameraPosition, fov: 60 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#FFE4B5" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#87CEEB" />
      <spotLight 
        position={[0, 20, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={0.8}
        color={forumColor}
      />
      
      {/* Ocean Floor */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#A8D5E2" opacity={0.3} transparent />
      </mesh>
      
      {/* Discussion Bubbles */}
      {threads.map((thread, index) => (
        <DiscussionBubble
          key={thread.id}
          thread={thread}
          position={threadPositions[index]}
          isSelected={selectedThread?.id === thread.id}
          onClick={() => setSelectedThread(thread)}
          forumColor={forumColor}
        />
      ))}
      
      {/* Forum Title */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Text component temporarily disabled due to missing font file */}
        {/* <Text
          position={[0, 8, 0]}
          fontSize={1.5}
          color={forumColor}
          anchorX="center"
          anchorY="middle"
          font="/fonts/capas-font.json"
        >
          {forumTitle}
        </Text> */}
      </Float>
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );

  const handleCreateThread = () => {
    if (newThreadTitle.trim() && newThreadContent.trim()) {
      // In a real app, this would call the API
      console.log('Creating new thread:', { title: newThreadTitle, content: newThreadContent });
      setNewThreadTitle('');
      setNewThreadContent('');
      setShowNewThreadForm(false);
    }
  };

  return (
    <div className="creative-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-capas-ocean-light/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-1">
              {forumTitle}
            </h2>
            <p className="text-capas-ocean-dark">
              Navigate the 3D discussion space • {threads.length} active discussions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewThreadForm(true)}
              className="btn-capas-primary text-sm flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>New Topic</span>
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 text-capas-turquoise hover:bg-capas-sand-light rounded-lg transition-colors"
            >
              <ArrowsPointingOutIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 3D Forum Space */}
      <div className="relative">
        <div className="h-96 bg-gradient-to-b from-capas-ocean-light/20 to-capas-sand-light">
          <Forum3DScene />
        </div>

        {/* Instructions Overlay */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
          <h4 className="font-semibold text-sm text-capas-ocean-dark mb-2">
            🌊 Navigation Tips
          </h4>
          <ul className="text-xs text-capas-ocean-dark/80 space-y-1">
            <li>• Click bubbles to select discussions</li>
            <li>• Drag to rotate the view</li>
            <li>• Scroll to zoom in/out</li>
            <li>• Golden bubbles are pinned topics</li>
          </ul>
        </div>

        {/* Forum Stats */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="grid grid-cols-3 gap-4 text-center text-xs">
            <div>
              <div className="font-bold text-capas-turquoise">{threads.length}</div>
              <div className="text-capas-ocean-dark/70">Topics</div>
            </div>
            <div>
              <div className="font-bold text-capas-coral">
                {threads.reduce((sum, t) => sum + t.replies, 0)}
              </div>
              <div className="text-capas-ocean-dark/70">Replies</div>
            </div>
            <div>
              <div className="font-bold text-capas-gold">
                {threads.reduce((sum, t) => sum + t.views, 0)}
              </div>
              <div className="text-capas-ocean-dark/70">Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Thread Details */}
      {selectedThread && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-t border-capas-ocean-light/30 bg-capas-sand-light"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-display text-xl font-semibold text-capas-turquoise">
                  {selectedThread.title}
                </h3>
                {selectedThread.pinned && (
                  <span className="px-2 py-1 bg-capas-gold/20 text-capas-gold rounded-full text-xs font-medium">
                    Pinned
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70 mb-3">
                <div className="flex items-center space-x-1">
                  <UserIcon className="w-4 h-4" />
                  <span>{selectedThread.author.name}</span>
                  <span className="px-2 py-0.5 bg-capas-turquoise/20 text-capas-turquoise rounded text-xs">
                    {selectedThread.author.role}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{new Date(selectedThread.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-capas-ocean-dark leading-relaxed">
                {selectedThread.content}
              </p>
            </div>
            <button
              onClick={() => setSelectedThread(null)}
              className="p-2 text-capas-ocean-dark/50 hover:text-capas-ocean-dark rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Thread Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <ChatBubbleLeftIcon className="w-4 h-4 text-capas-turquoise" />
                <span>{selectedThread.replies} replies</span>
              </div>
              <div className="flex items-center space-x-1">
                <EyeIcon className="w-4 h-4 text-capas-coral" />
                <span>{selectedThread.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <HeartIcon className="w-4 h-4 text-capas-gold" />
                <span>{selectedThread.likes} likes</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="btn-capas-secondary text-sm">
                View Full Discussion
              </button>
              <button className="btn-capas-primary text-sm">
                Reply
              </button>
            </div>
          </div>

          {/* Tags */}
          {selectedThread.tags && selectedThread.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-capas-ocean-light/30">
              <div className="flex flex-wrap gap-2">
                {selectedThread.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-capas-sand text-capas-ocean-dark rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Traditional Thread List */}
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-capas-turquoise mb-4">
          Discussion List
        </h3>
        <div className="space-y-3">
          {threads.slice(0, 5).map((thread) => (
            <div
              key={thread.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                selectedThread?.id === thread.id
                  ? 'border-capas-turquoise bg-capas-turquoise/10'
                  : 'border-capas-ocean-light/30 bg-white hover:border-capas-turquoise/50'
              }`}
              onClick={() => setSelectedThread(thread)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-capas-ocean-dark">{thread.title}</h4>
                    {thread.pinned && (
                      <span className="text-capas-gold">📌</span>
                    )}
                  </div>
                  <p className="text-sm text-capas-ocean-dark/70 line-clamp-2 mb-2">
                    {thread.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-capas-ocean-dark/60">
                    <span>{thread.author.name}</span>
                    <span>{thread.replies} replies</span>
                    <span>{thread.views} views</span>
                    <span>Last: {new Date(thread.lastReply).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-xs text-capas-ocean-dark/60">
                  {new Date(thread.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Thread Modal */}
      <AnimatePresence>
        {showNewThreadForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg w-full max-w-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-semibold text-capas-turquoise">
                  Start New Discussion
                </h3>
                <button
                  onClick={() => setShowNewThreadForm(false)}
                  className="p-2 text-capas-ocean-dark/50 hover:text-capas-ocean-dark rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Discussion Title
                  </label>
                  <input
                    type="text"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-capas-ocean-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                    Content
                  </label>
                  <textarea
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-capas-ocean-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise resize-none"
                    placeholder="Share your thoughts, questions, or ideas..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-capas-ocean-dark/70">
                    Your post will appear as a new bubble in the 3D space
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setShowNewThreadForm(false)}
                      className="btn-capas-secondary text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateThread}
                      disabled={!newThreadTitle.trim() || !newThreadContent.trim()}
                      className="btn-capas-primary text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      <span>Create Discussion</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
          >
            <div className="h-full">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h3 className="font-display text-lg font-semibold text-capas-turquoise mb-2">
                  {forumTitle} - Immersive View
                </h3>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="btn-capas-secondary text-sm"
                >
                  Exit Fullscreen
                </button>
              </div>
              <Forum3DScene />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForumSpace3D;