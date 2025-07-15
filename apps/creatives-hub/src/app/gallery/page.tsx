'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Float } from '@react-three/drei';
import moodleApi from '@/services/moodleApi';
import { CulturalHeader, CulturalCard, CulturalDivider } from '@/components/cultural/BahamianPatterns';
import BahamianCulturalScene from '@/components/cultural/BahamianCulturalScene';
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
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface StudentSubmission {
  id: string;
  title: string;
  description: string;
  type: '3d_model' | 'image' | 'video' | 'audio' | 'document';
  mediaUrl: string;
  thumbnailUrl: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    program: string;
  };
  course: {
    id: string;
    title: string;
    color: string;
  };
  submissionDate: string;
  likes: number;
  views: number;
  featured: boolean;
  tags: string[];
  culturalElements: string[];
  fileSize?: string;
  duration?: string;
  dimensions?: string;
}

export default function StudentGallery() {
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'featured'>('recent');
  const [likedSubmissions, setLikedSubmissions] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const submissionsData = await moodleApi.getStudentSubmissions();
      
      // Transform and enhance the submissions data
      const enhancedSubmissions = submissionsData.map((sub: any) => ({
        ...sub,
        likes: Math.floor(Math.random() * 50) + 5,
        views: Math.floor(Math.random() * 200) + 20,
        culturalElements: sub.tags?.filter((tag: string) => 
          ['bahamian', 'junkanoo', 'conch', 'coral', 'island', 'caribbean'].some(cultural => 
            tag.toLowerCase().includes(cultural)
          )
        ) || []
      }));
      
      setSubmissions(enhancedSubmissions);
    } catch (error) {
      console.error('Failed to load submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All Work', icon: PhotoIcon },
    { id: '3d_model', name: '3D Models', icon: CubeIcon },
    { id: 'image', name: 'Images', icon: PhotoIcon },
    { id: 'video', name: 'Videos', icon: PlayIcon },
    { id: 'audio', name: 'Audio', icon: PhotoIcon },
    { id: 'document', name: 'Documents', icon: DocumentIcon }
  ];

  const filteredSubmissions = submissions
    .filter(sub => {
      const matchesFilter = filter === 'all' || sub.type === filter;
      const matchesSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           sub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (sub.author?.name || sub.studentName || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.likes - a.likes;
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        case 'recent':
        default:
          return new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime();
      }
    });

  const toggleLike = (submissionId: string) => {
    const newLiked = new Set(likedSubmissions);
    if (newLiked.has(submissionId)) {
      newLiked.delete(submissionId);
    } else {
      newLiked.add(submissionId);
    }
    setLikedSubmissions(newLiked);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '3d_model': return CubeIcon;
      case 'image': return PhotoIcon;
      case 'video': return PlayIcon;
      case 'audio': return PhotoIcon;
      case 'document': return DocumentIcon;
      default: return PhotoIcon;
    }
  };

  const Gallery3DScene = () => (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {filteredSubmissions.slice(0, 12).map((submission, index) => {
        const angle = (index / 12) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 2;
        
        return (
          <Float key={submission.id} speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <Sphere 
              args={[0.3, 16, 16]} 
              position={[x, y, z]}
              onClick={() => setSelectedSubmission(submission)}
            >
              <meshStandardMaterial 
                color={submission.course?.color || '#0A8A98'}
                opacity={0.8}
                transparent
                emissive={submission.featured ? (submission.course?.color || '#0A8A98') : '#000000'}
                emissiveIntensity={submission.featured ? 0.3 : 0}
              />
            </Sphere>
          </Float>
        );
      })}
      
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark">Loading student gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Cultural Hero Header */}
      <CulturalHeader
        title="Student Gallery"
        subtitle="Celebrating creative excellence and cultural innovation"
        pattern="junkanoo"
      >
        <div className="mb-8">
          <BahamianCulturalScene 
            variant="carnival" 
            height={200} 
            showControls={false}
            interactive={false}
            className="rounded-lg overflow-hidden shadow-lg mx-auto max-w-2xl"
          />
        </div>
      </CulturalHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Submissions', value: submissions.length, icon: PhotoIcon, color: 'bg-capas-turquoise' },
            { title: 'Featured Works', value: submissions.filter(s => s.featured).length, icon: StarIcon, color: 'bg-capas-gold' },
            { title: 'Student Artists', value: new Set(submissions.map(s => s.author?.id || s.studentId).filter(Boolean)).size, icon: UserIcon, color: 'bg-capas-coral' },
            { title: 'Cultural Projects', value: submissions.filter(s => s.culturalElements && s.culturalElements.length > 0).length, icon: AcademicCapIcon, color: 'bg-capas-palm' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CulturalCard pattern="coral" className="p-6 text-center">
                <div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-capas-ocean-dark mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-capas-turquoise">{stat.title}</div>
              </CulturalCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CulturalCard pattern="waves" className="p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="flex-1 lg:mr-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-capas-ocean-dark/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or description..."
                    className="w-full pl-10 pr-4 py-3 border border-capas-ocean-light/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FunnelIcon className="h-5 w-5 text-capas-ocean-dark/60" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-capas-ocean-light/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border border-capas-ocean-light/30 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
          </CulturalCard>
        </motion.div>

        {/* 3D Gallery View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <CulturalCard className="p-0 h-64 relative overflow-hidden">
            <Gallery3DScene />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <h3 className="font-semibold text-capas-ocean-dark mb-1">3D Gallery View</h3>
              <p className="text-xs text-capas-ocean-dark/70">
                Click spheres to view submissions • Drag to explore
              </p>
            </div>
          </CulturalCard>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSubmissions.map((submission, index) => {
            const TypeIcon = getTypeIcon(submission.type);
            const isLiked = likedSubmissions.has(submission.id);
            
            return (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div onClick={() => setSelectedSubmission(submission)}>
                  <CulturalCard 
                    pattern="palm" 
                    className="overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
                  >
                  {/* Media Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-capas-sand-light to-capas-ocean-light/20">
                    {submission.featured && (
                      <div className="absolute top-3 left-3 bg-capas-gold text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 z-10">
                        <StarIcon className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 right-3 z-10">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: submission.course?.color || '#0A8A98' }}
                      >
                        <TypeIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    {/* Placeholder for media */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {submission.type === '3d_model' ? '🎨' : 
                         submission.type === 'video' ? '🎬' : 
                         submission.type === 'audio' ? '🎵' : '📸'}
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <PlayIcon className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-capas-ocean-dark group-hover:text-capas-turquoise transition-colors line-clamp-2">
                          {submission.title}
                        </h3>
                        <p className="text-sm text-capas-ocean-dark/70 mt-1 line-clamp-2">
                          {submission.description}
                        </p>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-capas-turquoise rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">
                          {(submission.author?.name || submission.studentName || 'U').charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-capas-ocean-dark">
                          {submission.author?.name || submission.studentName || 'Unknown Artist'}
                        </div>
                        <div className="text-xs text-capas-ocean-dark/60">
                          {submission.author?.program || 'Unknown Program'}
                        </div>
                      </div>
                    </div>

                    {/* Cultural Elements */}
                    {submission.culturalElements.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {submission.culturalElements.slice(0, 3).map((element) => (
                            <span 
                              key={element}
                              className="inline-block bg-capas-gold/20 text-capas-gold text-xs px-2 py-1 rounded"
                            >
                              🇧🇸 {element}
                            </span>
                          ))}
                          {submission.culturalElements.length > 3 && (
                            <span className="text-xs text-capas-ocean-dark/70">
                              +{submission.culturalElements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Stats and Actions */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-capas-ocean-dark/70">
                        <div className="flex items-center space-x-1">
                          <EyeIcon className="w-4 h-4" />
                          <span>{submission.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(submission.submissionDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(submission.id);
                          }}
                          className={`flex items-center space-x-1 transition-colors ${
                            isLiked ? 'text-capas-coral' : 'text-capas-ocean-dark/70 hover:text-capas-coral'
                          }`}
                        >
                          {isLiked ? (
                            <HeartSolidIcon className="w-4 h-4" />
                          ) : (
                            <HeartIcon className="w-4 h-4" />
                          )}
                          <span>{submission.likes + (isLiked ? 1 : 0)}</span>
                        </button>
                        
                        <button className="text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                          <ShareIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CulturalCard>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSubmissions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-2">
              No submissions found
            </h3>
            <p className="text-capas-ocean-dark mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="btn-capas-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Cultural Divider */}
        <CulturalDivider pattern="conch" height={60} />

        {/* Submission Modal */}
        <AnimatePresence>
          {selectedSubmission && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSubmission(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-6 border-b border-capas-ocean-light/30">
                  <h2 className="font-display text-xl font-semibold text-capas-turquoise">
                    {selectedSubmission.title}
                  </h2>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="text-capas-ocean-dark/50 hover:text-capas-ocean-dark transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Media Display */}
                    <div className="bg-capas-sand-light rounded-lg p-8 flex items-center justify-center min-h-[300px]">
                      <div className="text-center">
                        <div className="text-8xl mb-4">
                          {selectedSubmission.type === '3d_model' ? '🎨' : 
                           selectedSubmission.type === 'video' ? '🎬' : 
                           selectedSubmission.type === 'audio' ? '🎵' : '📸'}
                        </div>
                        <p className="text-capas-ocean-dark/70">
                          {selectedSubmission.type.replace('_', ' ').toUpperCase()} Preview
                        </p>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-capas-ocean-dark mb-2">Description</h3>
                        <p className="text-capas-ocean-dark/80 leading-relaxed">
                          {selectedSubmission.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-capas-ocean-dark mb-2">Author</h3>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {(selectedSubmission.author?.name || selectedSubmission.studentName || 'U').charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-capas-ocean-dark">
                              {selectedSubmission.author?.name || selectedSubmission.studentName || 'Unknown Artist'}
                            </div>
                            <div className="text-sm text-capas-ocean-dark/70">
                              {selectedSubmission.author?.program || 'Unknown Program'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-capas-ocean-dark mb-2">Course</h3>
                        <div 
                          className="inline-block px-3 py-1 rounded-full text-white text-sm"
                          style={{ backgroundColor: selectedSubmission.course.color }}
                        >
                          {selectedSubmission.course.title}
                        </div>
                      </div>
                      
                      {selectedSubmission.culturalElements.length > 0 && (
                        <div>
                          <h3 className="font-semibold text-capas-ocean-dark mb-2">Cultural Elements</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedSubmission.culturalElements.map((element) => (
                              <span 
                                key={element}
                                className="inline-block bg-capas-gold/20 text-capas-gold text-sm px-3 py-1 rounded-full"
                              >
                                🇧🇸 {element}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/30">
                        <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                          <span>{selectedSubmission.views} views</span>
                          <span>{selectedSubmission.likes} likes</span>
                          <span>{new Date(selectedSubmission.submissionDate).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="btn-capas-secondary text-sm flex items-center space-x-2">
                            <ArrowDownTrayIcon className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                          <button className="btn-capas-primary text-sm flex items-center space-x-2">
                            <ShareIcon className="w-4 h-4" />
                            <span>Share</span>
                          </button>
                        </div>
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