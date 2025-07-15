'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { AcademicCapIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';

interface HeroContent {
  id: string;
  type: 'program' | 'event' | 'spotlight';
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
    icon: any;
  };
  secondaryCTA?: {
    text: string;
    href: string;
    icon: any;
  };
  backgroundMedia: {
    type: 'video' | 'image';
    src: string;
    fallbackImage: string;
    alt: string;
  };
  featured?: boolean;
}

interface VideoHeroProps {
  heroContent: HeroContent[];
  autoRotate?: boolean;
  rotationInterval?: number;
  showVideoControls?: boolean;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  heroContent,
  autoRotate = true,
  rotationInterval = 8000,
  showVideoControls = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const currentContent = heroContent[currentIndex];

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate || heroContent.length <= 1) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, rotationInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, rotationInterval, heroContent.length]);

  // Video controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  };

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Restart auto-rotation after manual navigation
    if (autoRotate) {
      setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % heroContent.length);
        }, rotationInterval);
      }, rotationInterval);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {currentContent.backgroundMedia.type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  src={currentContent.backgroundMedia.src}
                  poster={currentContent.backgroundMedia.fallbackImage}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                  onLoadedData={handleVideoLoad}
                  onError={() => setIsVideoLoaded(false)}
                >
                  <source src={currentContent.backgroundMedia.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Fallback Image */}
                {!isVideoLoaded && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${currentContent.backgroundMedia.fallbackImage})` }}
                  />
                )}
              </div>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${currentContent.backgroundMedia.src})` }}
              />
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Controls */}
      {showVideoControls && currentContent.backgroundMedia.type === 'video' && (
        <div className="absolute top-4 right-4 z-20 flex space-x-2">
          <button
            onClick={togglePlayPause}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <PauseIcon className="w-5 h-5" />
            ) : (
              <PlayIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentContent.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Featured Badge */}
            {currentContent.featured && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center bg-capas-gold/90 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                  <StarIcon className="w-4 h-4 mr-2" />
                  Featured {currentContent.type.charAt(0).toUpperCase() + currentContent.type.slice(1)}
                </span>
              </motion.div>
            )}

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-montserrat text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            >
              {currentContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-capas-gold mb-4 font-semibold font-montserrat"
            >
              {currentContent.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed font-montserrat"
            >
              {currentContent.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <Link
                href={currentContent.primaryCTA.href}
                className="bg-capas-gold hover:bg-capas-gold-dark text-capas-ocean-dark font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-montserrat inline-flex items-center space-x-2"
              >
                <span>{currentContent.primaryCTA.text}</span>
                <currentContent.primaryCTA.icon className="w-5 h-5" />
              </Link>

              {currentContent.secondaryCTA && (
                <Link
                  href={currentContent.secondaryCTA.href}
                  className="border-2 border-white text-white hover:bg-white hover:text-capas-turquoise font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 font-montserrat inline-flex items-center space-x-2"
                >
                  <span>{currentContent.secondaryCTA.text}</span>
                  <currentContent.secondaryCTA.icon className="w-5 h-5" />
                </Link>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Navigation Dots */}
      {heroContent.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-3">
            {heroContent.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-capas-gold scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 w-24 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-capas-gold"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: rotationInterval / 1000, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        </div>
      )}

      {/* Content Type Indicator */}
      <div className="absolute top-8 left-8 z-20">
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold capitalize">
          {currentContent.type}
        </span>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoHero;