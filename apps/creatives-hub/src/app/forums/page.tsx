'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Text, Float } from '@react-three/drei';
import moodleApi from '@/services/moodleApi';
import ForumSpace3D from '@/components/forums/ForumSpace3D';
import {
  ChatBubbleLeftRightIcon,
  UsersIcon,
  FireIcon,
  SparklesIcon,
  AcademicCapIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface Forum {
  id: string;
  title: string;
  description: string;
  courseId?: string;
  category: string;
  color: string;
  totalThreads: number;
  totalPosts: number;
  lastActivity: string;
  moderators: string[];
  threads: any[];
}

export default function Forums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'immersive'>('grid');

  useEffect(() => {
    loadForums();
  }, []);

  const loadForums = async () => {
    try {
      setLoading(true);
      const forumsData = await moodleApi.getForums();
      
      // Transform forum data to include mock discussions
      const enhancedForums = await Promise.all(
        forumsData.map(async (forum: any) => {
          const discussions = await moodleApi.getForumDiscussions(forum.id);
          return {
            id: forum.id,
            title: forum.name || forum.title || 'Untitled Forum',
            description: forum.intro || forum.description || 'No description available',
            courseId: forum.course || forum.courseId || '',
            category: forum.category || 'General',
            color: forum.color || '#0A8A98',
            totalThreads: forum.totalThreads,
            totalPosts: forum.totalPosts,
            lastActivity: forum.lastActivity,
            moderators: forum.moderators || [],
            threads: discussions.data?.discussions || []
          };
        })
      );
      
      setForums(enhancedForums);
    } catch (error) {
      console.error('Failed to load forums:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Forums', icon: ChatBubbleLeftRightIcon, color: '#0A8A98' },
    { id: 'General', name: 'General Discussion', icon: UsersIcon, color: '#FF8B87' },
    { id: 'Visual Arts', name: 'Visual Arts', icon: SparklesIcon, color: '#FFCE00' },
    { id: 'Music Technology', name: 'Music Tech', icon: SparklesIcon, color: '#7FA900' },
    { id: 'Cultural Heritage', name: 'Cultural Heritage', icon: AcademicCapIcon, color: '#A8D5E2' },
  ];

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || forum.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const Scene3D = () => (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      {filteredForums.map((forum, index) => {
        const angle = (index / filteredForums.length) * Math.PI * 2;
        const radius = 8;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 4;
        
        return (
          <Float key={forum.id} speed={0.5 + index * 0.1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group position={[x, y, z]} onClick={() => setSelectedForum(forum)}>
              <Sphere args={[1, 32, 32]}>
                <meshStandardMaterial 
                  color={forum.color} 
                  opacity={0.8} 
                  transparent 
                  emissive={selectedForum?.id === forum.id ? forum.color : '#000000'}
                  emissiveIntensity={selectedForum?.id === forum.id ? 0.3 : 0}
                />
              </Sphere>
              <Text
                position={[0, -2, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={4}
              >
                {forum.title}
              </Text>
            </group>
          </Float>
        );
      })}
      
      <Float speed={0.3} rotationIntensity={0.1} floatIntensity={0.2}>
        {/* Text component temporarily disabled due to missing font file */}
        {/* <Text
          position={[0, 8, 0]}
          fontSize={2}
          color="#0A8A98"
          anchorX="center"
          anchorY="middle"
          font="/fonts/capas-font.json"
        >
          CAPAS Forums
        </Text> */}
      </Float>
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={10}
        maxDistance={30}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark">Loading forum spaces...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Hero Header */}
      <section className="relative h-80 bg-gradient-to-br from-capas-turquoise to-capas-ocean overflow-hidden">
        {viewMode === 'immersive' && (
          <div className="absolute inset-0 opacity-30">
            <Scene3D />
          </div>
        )}
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
                Creative Community Forums
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Dive into immersive 3D discussions about Bahamian culture and creative arts
              </p>
              
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
                  onClick={() => setViewMode('immersive')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    viewMode === 'immersive' 
                      ? 'bg-white text-capas-turquoise' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  3D Immersive
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex-1 lg:mr-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-capas-ocean-dark/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forums and discussions..."
                  className="w-full pl-10 pr-4 py-3 border border-capas-ocean-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-capas-ocean-dark/60" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-capas-ocean-light/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <button className="btn-capas-primary flex items-center space-x-2">
                <PlusIcon className="w-4 h-4" />
                <span>New Forum</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Forums Grid */}
        {!selectedForum ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredForums.map((forum, index) => (
              <motion.div
                key={forum.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="creative-card overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => setSelectedForum(forum)}
              >
                {/* Forum Header */}
                <div 
                  className="h-32 relative"
                  style={{ background: `linear-gradient(135deg, ${forum.color}40, ${forum.color}20)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="font-display text-xl font-bold text-white mb-1">
                      {forum.title}
                    </h3>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: forum.color }}
                    >
                      {forum.category}
                    </span>
                  </div>
                </div>

                {/* Forum Content */}
                <div className="p-6">
                  <p className="text-capas-ocean-dark mb-4 line-clamp-2">
                    {forum.description}
                  </p>

                  {/* Forum Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-capas-turquoise">
                        {forum.totalThreads}
                      </div>
                      <div className="text-xs text-capas-ocean-dark/70">Topics</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-capas-coral">
                        {forum.totalPosts}
                      </div>
                      <div className="text-xs text-capas-ocean-dark/70">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-capas-gold">
                        {forum.threads.length}
                      </div>
                      <div className="text-xs text-capas-ocean-dark/70">Active</div>
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70">
                    <span>Last activity: {new Date(forum.lastActivity).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-1">
                      <FireIcon className="w-4 h-4 text-capas-coral" />
                      <span>Active</span>
                    </div>
                  </div>

                  {/* Recent Thread Preview */}
                  {forum.threads.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-capas-ocean-light/30">
                      <div className="text-xs text-capas-ocean-dark/60 mb-2">Latest Discussion:</div>
                      <div className="text-sm font-medium text-capas-ocean-dark line-clamp-1">
                        {forum.threads[0].title}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Selected Forum Detail */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <button
                onClick={() => setSelectedForum(null)}
                className="text-capas-turquoise hover:text-capas-turquoise-dark transition-colors mb-4"
              >
                ← Back to Forums
              </button>
            </div>
            
            <ForumSpace3D
              forumTitle={selectedForum.title}
              threads={selectedForum.threads}
              forumColor={selectedForum.color}
              courseId={selectedForum.courseId}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {filteredForums.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🌊</div>
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
              No forums found
            </h3>
            <p className="text-capas-ocean-dark mb-6">
              Try adjusting your search or category filter
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn-capas-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Community Stats */}
        {!selectedForum && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-6 text-center">
              Community Activity
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-capas-turquoise">
                  {forums.reduce((sum, f) => sum + f.totalThreads, 0)}
                </div>
                <div className="text-capas-ocean-dark">Total Discussions</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-capas-coral">
                  {forums.reduce((sum, f) => sum + f.totalPosts, 0)}
                </div>
                <div className="text-capas-ocean-dark">Total Posts</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-capas-gold">
                  {forums.length}
                </div>
                <div className="text-capas-ocean-dark">Active Forums</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-capas-palm">
                  {categories.length - 1}
                </div>
                <div className="text-capas-ocean-dark">Categories</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}