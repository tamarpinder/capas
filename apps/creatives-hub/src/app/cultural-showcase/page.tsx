'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BahamianCulturalScene from '@/components/cultural/BahamianCulturalScene';
import BahamianPatterns, { CulturalHeader, CulturalCard, CulturalDivider } from '@/components/cultural/BahamianPatterns';
import {
  HeartIcon,
  SparklesIcon,
  SunIcon,
  BeakerIcon,
  PaintBrushIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';

export default function CulturalShowcase() {
  const [selectedScene, setSelectedScene] = useState<'heritage' | 'beach' | 'carnival' | 'minimal'>('heritage');
  const [selectedPattern, setSelectedPattern] = useState<'waves' | 'conch' | 'palm' | 'junkanoo' | 'coral'>('waves');

  const sceneDescriptions = {
    heritage: {
      title: "Heritage Scene",
      description: "A comprehensive view of Bahamian cultural elements including conch shells, palm trees, Junkanoo masks, and ocean waves, representing the rich heritage of The Bahamas.",
      elements: ["Conch Shells", "Palm Trees", "Junkanoo Masks", "Ocean Waves", "Cultural Spheres"]
    },
    beach: {
      title: "Beach Paradise",
      description: "Experience the pristine beaches and tropical paradise that define Bahamian natural beauty, with swaying palms and crystal-clear waters.",
      elements: ["Tropical Palms", "Ocean Waves", "Conch Shells", "Paradise Text", "Turquoise Waters"]
    },
    carnival: {
      title: "Junkanoo Carnival",
      description: "The vibrant street parade and cultural celebration unique to The Bahamas, featuring colorful masks, feathers, and festive atmosphere.",
      elements: ["Junkanoo Masks", "Carnival Feathers", "Golden Sparkles", "Festival Colors", "Cultural Celebration"]
    },
    minimal: {
      title: "Minimal Design",
      description: "Clean and focused design highlighting the essential elements of Bahamian identity in a simplified, elegant presentation.",
      elements: ["Central Sphere", "Symmetrical Conch", "Balanced Composition", "Clean Aesthetics"]
    }
  };

  const patternDescriptions = {
    waves: "Animated ocean waves representing the surrounding waters of The Bahamas",
    conch: "Rotating conch shell patterns, a symbol of Bahamian marine life",
    palm: "Swaying palm fronds capturing the tropical island atmosphere",
    junkanoo: "Radiating feather patterns inspired by Junkanoo carnival costumes",
    coral: "Branching coral formations representing the living reefs"
  };

  return (
    <div className="min-h-screen bg-capas-sand-light">
      {/* Cultural Hero Header */}
      <CulturalHeader
        title="Bahamian Cultural Elements"
        subtitle="Immersive 3D scenes and animated patterns celebrating The Bahamas"
        pattern="waves"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 3D Cultural Scenes Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-capas-turquoise mb-4">
              Interactive 3D Cultural Scenes
            </h2>
            <p className="text-capas-ocean-dark max-w-3xl mx-auto">
              Explore different aspects of Bahamian culture through immersive 3D environments. 
              Each scene tells a unique story about the islands' heritage, natural beauty, and vibrant celebrations.
            </p>
          </div>

          {/* Scene Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {(Object.keys(sceneDescriptions) as Array<keyof typeof sceneDescriptions>).map((scene) => (
              <button
                key={scene}
                onClick={() => setSelectedScene(scene)}
                className={`px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  selectedScene === scene
                    ? 'bg-capas-turquoise text-white shadow-lg'
                    : 'bg-white text-capas-ocean-dark border border-capas-ocean-light/30 hover:border-capas-turquoise'
                }`}
              >
                {sceneDescriptions[scene].title}
              </button>
            ))}
          </div>

          {/* 3D Scene Display */}
          <CulturalCard className="p-0 overflow-hidden">
            <BahamianCulturalScene 
              variant={selectedScene}
              height={500}
              className="w-full"
            />
          </CulturalCard>

          {/* Scene Description */}
          <motion.div
            key={selectedScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <CulturalCard pattern="coral" className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-3">
                    {sceneDescriptions[selectedScene].title}
                  </h3>
                  <p className="text-capas-ocean-dark leading-relaxed">
                    {sceneDescriptions[selectedScene].description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-capas-ocean-dark mb-3">Cultural Elements:</h4>
                  <div className="space-y-2">
                    {sceneDescriptions[selectedScene].elements.map((element, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <SparklesIcon className="w-4 h-4 text-capas-gold" />
                        <span className="text-sm text-capas-ocean-dark">{element}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CulturalCard>
          </motion.div>
        </motion.section>

        {/* Cultural Divider */}
        <CulturalDivider pattern="junkanoo" height={80} />

        {/* Animated Patterns Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-capas-turquoise mb-4">
              Animated Cultural Patterns
            </h2>
            <p className="text-capas-ocean-dark max-w-3xl mx-auto">
              Dynamic SVG patterns inspired by Bahamian natural and cultural elements. 
              These patterns are used throughout the platform to create visual harmony and cultural connection.
            </p>
          </div>

          {/* Pattern Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {(Object.keys(patternDescriptions) as Array<keyof typeof patternDescriptions>).map((pattern) => (
              <button
                key={pattern}
                onClick={() => setSelectedPattern(pattern)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedPattern === pattern
                    ? 'bg-capas-coral text-white'
                    : 'bg-white text-capas-ocean-dark border border-capas-ocean-light/30 hover:border-capas-coral'
                }`}
              >
                {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
              </button>
            ))}
          </div>

          {/* Pattern Display */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Large Pattern Preview */}
            <CulturalCard className="p-0 h-80 relative overflow-hidden">
              <BahamianPatterns 
                pattern={selectedPattern}
                color="#0A8A98"
                opacity={0.3}
                className="w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 text-center">
                  <h3 className="font-semibold text-capas-ocean-dark capitalize">
                    {selectedPattern} Pattern
                  </h3>
                  <p className="text-sm text-capas-ocean-dark/70 mt-1">
                    Animated • SVG • Scalable
                  </p>
                </div>
              </div>
            </CulturalCard>

            {/* Pattern Information */}
            <div className="space-y-6">
              <CulturalCard pattern={selectedPattern} className="p-6">
                <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-3">
                  Pattern Details
                </h3>
                <p className="text-capas-ocean-dark mb-4">
                  {patternDescriptions[selectedPattern]}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-capas-ocean-light/30">
                    <span className="text-sm text-capas-ocean-dark/70">Type:</span>
                    <span className="text-sm font-medium text-capas-ocean-dark">Animated SVG</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-capas-ocean-light/30">
                    <span className="text-sm text-capas-ocean-dark/70">Usage:</span>
                    <span className="text-sm font-medium text-capas-ocean-dark">Background & Decoration</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-capas-ocean-light/30">
                    <span className="text-sm text-capas-ocean-dark/70">Cultural Significance:</span>
                    <span className="text-sm font-medium text-capas-ocean-dark">High</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-capas-ocean-dark/70">Performance:</span>
                    <span className="text-sm font-medium text-capas-ocean-dark">Optimized</span>
                  </div>
                </div>
              </CulturalCard>

              {/* Pattern Variations */}
              <CulturalCard className="p-6">
                <h4 className="font-semibold text-capas-ocean-dark mb-4">Color Variations</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['#0A8A98', '#FFD700', '#FF8B87'].map((color, index) => (
                    <div key={index} className="relative h-16 rounded-lg overflow-hidden border border-capas-ocean-light/30">
                      <BahamianPatterns 
                        pattern={selectedPattern}
                        color={color}
                        opacity={0.4}
                        className="w-full h-full"
                        animated={false}
                      />
                    </div>
                  ))}
                </div>
              </CulturalCard>
            </div>
          </div>
        </motion.section>

        {/* Cultural Components Showcase */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl font-bold text-capas-turquoise mb-4">
              Cultural Design Components
            </h2>
            <p className="text-capas-ocean-dark max-w-3xl mx-auto">
              Ready-to-use components that bring Bahamian culture into every aspect of the learning platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Cultural Cards */}
            <CulturalCard pattern="waves" className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-capas-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <PaintBrushIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-capas-ocean-dark mb-2">Cultural Cards</h3>
                <p className="text-sm text-capas-ocean-dark/70">
                  Enhanced card components with cultural pattern backgrounds
                </p>
              </div>
            </CulturalCard>

            <CulturalCard pattern="coral" className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-capas-coral rounded-full flex items-center justify-center mx-auto mb-4">
                  <SunIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-capas-ocean-dark mb-2">Cultural Headers</h3>
                <p className="text-sm text-capas-ocean-dark/70">
                  Hero sections with animated backgrounds and cultural themes
                </p>
              </div>
            </CulturalCard>

            <CulturalCard pattern="palm" className="p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-capas-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <MusicalNoteIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-capas-ocean-dark mb-2">Cultural Dividers</h3>
                <p className="text-sm text-capas-ocean-dark/70">
                  Section separators that maintain visual harmony
                </p>
              </div>
            </CulturalCard>
          </div>
        </motion.section>

        {/* Cultural Impact Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <CulturalCard pattern="junkanoo" className="p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <HeartIcon className="w-12 h-12 text-capas-coral mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-capas-turquoise mb-4">
                Cultural Preservation Through Technology
              </h2>
              <p className="text-capas-ocean-dark leading-relaxed mb-6">
                These cultural elements serve more than aesthetic purposes. They create a digital bridge between 
                traditional Bahamian heritage and modern educational technology, ensuring that students remain 
                connected to their cultural roots while engaging with cutting-edge learning tools.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="font-semibold text-capas-turquoise mb-1">Cultural Identity</div>
                  <div className="text-capas-ocean-dark/70">Preserving Bahamian visual heritage</div>
                </div>
                <div>
                  <div className="font-semibold text-capas-turquoise mb-1">Educational Value</div>
                  <div className="text-capas-ocean-dark/70">Learning through cultural immersion</div>
                </div>
                <div>
                  <div className="font-semibold text-capas-turquoise mb-1">Modern Innovation</div>
                  <div className="text-capas-ocean-dark/70">Technology meets tradition</div>
                </div>
              </div>
            </div>
          </CulturalCard>
        </motion.section>
      </div>
    </div>
  );
}