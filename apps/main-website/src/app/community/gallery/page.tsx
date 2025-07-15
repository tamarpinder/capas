'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotoIcon,
  PlayIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import PlaceholderImage from '@/components/PlaceholderImage';
import Footer from '@/components/Footer';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'image' | 'video';
  date: string;
  photographer?: string;
  tags: string[];
  featured: boolean;
  likes: number;
  views: number;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: 'gallery-1',
      title: 'Spring Concert Performance',
      description: 'Students showcase their vocal talents during our annual spring concert series.',
      category: 'performances',
      type: 'image',
      date: '2024-03-15',
      photographer: 'Maria Santos',
      tags: ['concert', 'vocal', 'students', 'spring'],
      featured: true,
      likes: 142,
      views: 1250
    },
    {
      id: 'gallery-2',
      title: 'Dance Workshop Highlights',
      description: 'Contemporary dance workshop led by visiting master instructor.',
      category: 'workshops',
      type: 'video',
      date: '2024-02-28',
      tags: ['dance', 'workshop', 'contemporary', 'masterclass'],
      featured: false,
      likes: 98,
      views: 856
    },
    {
      id: 'gallery-3',
      title: 'Campus Life - Student Commons',
      description: 'Students relax and study in our newly renovated common areas.',
      category: 'campus',
      type: 'image',
      date: '2024-01-20',
      photographer: 'James Wilson',
      tags: ['campus', 'students', 'commons', 'lifestyle'],
      featured: false,
      likes: 76,
      views: 623
    },
    {
      id: 'gallery-4',
      title: 'Theatre Production: Caribbean Stories',
      description: 'Behind-the-scenes moments from our latest theatrical production.',
      category: 'productions',
      type: 'image',
      date: '2024-03-08',
      photographer: 'Lisa Chen',
      tags: ['theatre', 'production', 'backstage', 'caribbean'],
      featured: true,
      likes: 203,
      views: 1890
    },
    {
      id: 'gallery-5',
      title: 'Steel Drum Ensemble Practice',
      description: 'Weekly practice session with our award-winning steel drum ensemble.',
      category: 'music',
      type: 'video',
      date: '2024-02-14',
      tags: ['steel drum', 'ensemble', 'practice', 'caribbean'],
      featured: false,
      likes: 134,
      views: 1120
    },
    {
      id: 'gallery-6',
      title: 'Graduation Ceremony 2024',
      description: 'Celebrating our graduating class and their achievements.',
      category: 'events',
      type: 'image',
      date: '2024-05-18',
      photographer: 'Robert Taylor',
      tags: ['graduation', 'ceremony', 'students', 'achievement'],
      featured: true,
      likes: 298,
      views: 2340
    },
    {
      id: 'gallery-7',
      title: 'Master Class with International Artist',
      description: 'Special vocal masterclass with renowned international opera singer.',
      category: 'masterclasses',
      type: 'video',
      date: '2024-04-10',
      tags: ['masterclass', 'vocal', 'opera', 'international'],
      featured: false,
      likes: 167,
      views: 1456
    },
    {
      id: 'gallery-8',
      title: 'Community Outreach Program',
      description: 'Students perform for local community centers and schools.',
      category: 'community',
      type: 'image',
      date: '2024-03-22',
      photographer: 'Sarah Johnson',
      tags: ['community', 'outreach', 'performance', 'students'],
      featured: false,
      likes: 89,
      views: 743
    },
    {
      id: 'gallery-9',
      title: 'Recording Studio Sessions',
      description: 'Students work on their final projects in our state-of-the-art recording studio.',
      category: 'facilities',
      type: 'image',
      date: '2024-04-05',
      photographer: 'Michael Brown',
      tags: ['recording', 'studio', 'technology', 'students'],
      featured: false,
      likes: 112,
      views: 934
    }
  ];

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const featuredItems = galleryItems.filter(item => item.featured);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setCurrentIndex(filteredItems.indexOf(item));
  };

  const closeLightbox = () => {
    setSelectedItem(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    
    setCurrentIndex(newIndex);
    setSelectedItem(filteredItems[newIndex]);
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      'performances': 'text-capas-gold bg-capas-gold/10 border-capas-gold/20',
      'workshops': 'text-capas-turquoise bg-capas-turquoise/10 border-capas-turquoise/20',
      'campus': 'text-capas-palm bg-capas-palm/10 border-capas-palm/20',
      'productions': 'text-capas-coral bg-capas-coral/10 border-capas-coral/20',
      'music': 'text-capas-ocean bg-capas-ocean/10 border-capas-ocean/20',
      'events': 'text-capas-gold bg-capas-gold/10 border-capas-gold/20',
      'masterclasses': 'text-capas-turquoise bg-capas-turquoise/10 border-capas-turquoise/20',
      'community': 'text-capas-coral bg-capas-coral/10 border-capas-coral/20',
      'facilities': 'text-capas-palm bg-capas-palm/10 border-capas-palm/20'
    };
    return colorMap[category] || 'text-capas-ocean-dark bg-gray-100 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-capas-palm via-capas-turquoise to-capas-ocean py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none">
              <path
                d="M0,400 C300,200 600,600 900,300 C1200,0 1440,400 1440,400 L1440,800 L0,800 Z"
                fill="url(#gradient1)"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0A8A98" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-5xl lg:text-6xl font-bold text-white mb-6">
                Gallery
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-8 font-montserrat">
                Explore the vibrant life at CAPAS through our collection of photos and videos. 
                Witness the passion, creativity, and community that defines our arts education.
              </p>
              <div className="flex justify-center space-x-6 text-white/80">
                <div className="text-center">
                  <div className="text-3xl font-bold">{galleryItems.length}</div>
                  <div className="text-sm">Media Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{categories.length - 1}</div>
                  <div className="text-sm">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{galleryItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</div>
                  <div className="text-sm">Total Views</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Gallery */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-4">
                Featured Highlights
              </h2>
              <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto font-montserrat">
                Our most popular and memorable moments from the CAPAS community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
                >
                  <div
                    onClick={() => openLightbox(item)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`relative ${index === 0 ? 'h-96' : 'h-64'} overflow-hidden`}>
                      <PlaceholderImage
                        width={index === 0 ? 800 : 400}
                        height={index === 0 ? 384 : 256}
                        text={item.title}
                        variant="gradient"
                        colorScheme={item.category === 'performances' ? 'gold' : item.category === 'workshops' ? 'turquoise' : 'coral'}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>

                      {/* Media Type Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          {item.type === 'video' ? (
                            <PlayIcon className="w-4 h-4 text-white" />
                          ) : (
                            <PhotoIcon className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center text-white">
                          <EyeIcon className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm font-medium">View {item.type === 'video' ? 'Video' : 'Image'}</p>
                        </div>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mt-2 text-white/70 text-xs">
                          <span>{formatDate(item.date)}</span>
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <EyeIcon className="w-3 h-3 mr-1" />
                              {item.views}
                            </span>
                            <span className="flex items-center">
                              <HeartIcon className="w-3 h-3 mr-1" />
                              {item.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-8">
                Browse by Category
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full border transition-all duration-200 font-medium capitalize ${
                      selectedCategory === category
                        ? 'bg-capas-turquoise text-white border-capas-turquoise shadow-md transform scale-105'
                        : 'bg-white text-capas-ocean-dark border-capas-ocean-light/30 hover:border-capas-turquoise hover:text-capas-turquoise'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-capas-ocean-dark">
                Showing <span className="font-semibold">{filteredItems.length}</span> items
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 12) * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div
                    onClick={() => openLightbox(item)}
                    className="group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <PlaceholderImage
                        width={300}
                        height={192}
                        text={item.title}
                        variant="gradient"
                        colorScheme={item.category === 'performances' ? 'gold' : item.category === 'workshops' ? 'turquoise' : 'coral'}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getCategoryColor(item.category)}`}>
                          {item.category}
                        </span>
                      </div>

                      {/* Media Type Icon */}
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          {item.type === 'video' ? (
                            <PlayIcon className="w-3 h-3 text-white" />
                          ) : (
                            <PhotoIcon className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <EyeIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white">
                      <h4 className="font-medium text-capas-ocean-dark line-clamp-1 mb-1">{item.title}</h4>
                      <p className="text-sm text-capas-ocean-dark/70 line-clamp-2 mb-2">{item.description}</p>
                      <div className="flex items-center justify-between text-xs text-capas-ocean-dark/60">
                        <span>{formatDate(item.date)}</span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center">
                            <EyeIcon className="w-3 h-3 mr-1" />
                            {item.views}
                          </span>
                          <span className="flex items-center">
                            <HeartIcon className="w-3 h-3 mr-1" />
                            {item.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-white" />
                </button>

                {/* Navigation Buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateLightbox('prev')}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeftIcon className="w-6 h-6 text-white" />
                    </button>
                    <button
                      onClick={() => navigateLightbox('next')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRightIcon className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}

                {/* Media Display */}
                <div className="relative">
                  <PlaceholderImage
                    width={800}
                    height={600}
                    text={selectedItem.title}
                    variant="gradient"
                    colorScheme={selectedItem.category === 'performances' ? 'gold' : selectedItem.category === 'workshops' ? 'turquoise' : 'coral'}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                  {selectedItem.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <PlayIcon className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Media Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-capas-turquoise mb-2">{selectedItem.title}</h3>
                      <p className="text-capas-ocean-dark mb-4">{selectedItem.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedItem.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-capas-sand-light text-capas-ocean-dark text-sm rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-capas-sand-light rounded-full transition-colors">
                      <ShareIcon className="w-5 h-5 text-capas-ocean-dark" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70 border-t border-capas-ocean-light/20 pt-4">
                    <div className="flex items-center space-x-4">
                      <span>{formatDate(selectedItem.date)}</span>
                      {selectedItem.photographer && (
                        <span>Photo by {selectedItem.photographer}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {selectedItem.views} views
                      </span>
                      <span className="flex items-center">
                        <HeartIcon className="w-4 h-4 mr-1" />
                        {selectedItem.likes} likes
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Footer />
    </>
  );
}