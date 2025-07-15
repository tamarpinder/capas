'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  MapPinIcon,
  PlayIcon,
  PauseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
  EyeIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  InformationCircleIcon,
  BuildingOffice2Icon,
  MusicalNoteIcon,
  AcademicCapIcon,
  UserGroupIcon,
  ArrowsPointingOutIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import { PlayIcon as PlayIconSolid } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';

interface TourStop {
  id: string;
  name: string;
  shortName: string;
  description: string;
  detailedDescription: string;
  type: 'performance' | 'studio' | 'classroom' | 'outdoor' | 'common';
  coordinates: { x: number; y: number }; // Percentage coordinates on the map
  features: string[];
  capacity?: number;
  hours: string;
  accessibility: string[];
  virtualTourAvailable: boolean;
  imageUrl: string;
  audioDescription?: string;
  relatedPrograms: string[];
  funFacts: string[];
}

const tourStops: TourStop[] = [
  {
    id: 'entrance',
    name: 'Main Entrance & Welcome Center',
    shortName: 'Entrance',
    description: 'Welcome to CAPAS! Your journey into Caribbean arts education begins here.',
    detailedDescription: 'The main entrance features beautiful Caribbean architectural elements and serves as the welcome center for all visitors. Here you\'ll find information about programs, events, and can arrange guided tours.',
    type: 'common',
    coordinates: { x: 20, y: 85 },
    features: ['Visitor Information', 'Program Brochures', 'Event Calendar', 'Tour Scheduling'],
    hours: '8:00 AM - 6:00 PM (Mon-Fri)',
    accessibility: ['Wheelchair accessible', 'Audio announcements', 'Braille signage'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/entrance.jpg',
    relatedPrograms: [],
    funFacts: [
      'The entrance mosaic was created by local Bahamian artists',
      'Over 1,000 visitors take tours here each year',
      'The building incorporates traditional Bahamian architectural elements'
    ]
  },
  {
    id: 'performance-hall',
    name: 'Patricia Glinton-Meicholas Performance Hall',
    shortName: 'Performance Hall',
    description: 'Our flagship 300-seat performance venue with world-class acoustics.',
    detailedDescription: 'This state-of-the-art performance hall is the heart of CAPAS, featuring professional acoustics designed for both amplified and acoustic performances. The hall hosts student recitals, faculty concerts, and community events.',
    type: 'performance',
    coordinates: { x: 50, y: 60 },
    features: ['300 seats', 'Professional acoustics', 'Advanced lighting', 'Recording capabilities'],
    capacity: 300,
    hours: 'Event-based scheduling',
    accessibility: ['Wheelchair accessible seating', 'Assisted listening devices', 'Sign language interpretation available'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/performance-hall.jpg',
    relatedPrograms: ['All performance programs', 'Community events'],
    funFacts: [
      'The acoustics were designed by the same firm that worked on Carnegie Hall',
      'The stage can accommodate a full orchestra',
      'The hall has hosted performers from 15 different countries'
    ]
  },
  {
    id: 'recording-studio',
    name: 'Caribbean Music Recording Studio',
    shortName: 'Recording Studio',
    description: 'Professional recording facilities for students to create and produce music.',
    detailedDescription: 'Our recording studio features industry-standard equipment and is designed specifically for Caribbean music production. Students learn both performance and technical skills in this professional environment.',
    type: 'studio',
    coordinates: { x: 75, y: 40 },
    features: ['Pro Tools HDX', 'SSL Console', 'Isolation booths', 'Vintage outboard gear'],
    capacity: 12,
    hours: '9:00 AM - 9:00 PM (by appointment)',
    accessibility: ['Wheelchair accessible', 'Adjustable workstations'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/recording-studio.jpg',
    relatedPrograms: ['Music Production', 'Vocal Performance', 'Instrumental Performance'],
    funFacts: [
      'The first song recorded here became a regional hit',
      'The studio has vintage equipment from the 1970s',
      'Students have recorded over 200 original songs here'
    ]
  },
  {
    id: 'dance-studios',
    name: 'Hamilton Dance Studios',
    shortName: 'Dance Studios',
    description: 'Three spacious studios for traditional and contemporary dance training.',
    detailedDescription: 'Our dance studios feature professional Marley flooring, floor-to-ceiling mirrors, and sound systems. Students train in everything from classical ballet to traditional Caribbean dance forms.',
    type: 'studio',
    coordinates: { x: 30, y: 30 },
    features: ['Marley flooring', 'Mirror walls', 'Sound systems', 'Climate control'],
    capacity: 25,
    hours: '7:00 AM - 10:00 PM',
    accessibility: ['Wheelchair accessible entrance', 'Accessible changing rooms', 'Adaptive equipment'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/dance-studios.jpg',
    relatedPrograms: ['Dance Performance', 'Musical Theatre', 'Movement for Actors'],
    funFacts: [
      'The floors are imported from the same company that supplies Broadway',
      'Students practice over 15 different dance styles here',
      'The mirrors are specially designed to prevent distortion'
    ]
  },
  {
    id: 'steel-drum-pavilion',
    name: 'Clarke Steel Drum Pavilion',
    shortName: 'Steel Drum Pavilion',
    description: 'Outdoor pavilion designed specifically for Caribbean percussion ensemble.',
    detailedDescription: 'This unique outdoor space celebrates the Caribbean\'s most iconic instrument. The pavilion\'s design provides excellent acoustics while connecting musicians with the natural environment.',
    type: 'outdoor',
    coordinates: { x: 80, y: 70 },
    features: ['Weather protection', 'Natural acoustics', 'Instrument storage', 'Tiered platform'],
    capacity: 50,
    hours: '8:00 AM - 8:00 PM (weather permitting)',
    accessibility: ['Wheelchair accessible', 'Adaptive instruments available'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/steel-drum-pavilion.jpg',
    relatedPrograms: ['Steel Drum Ensemble', 'Caribbean Percussion', 'Community Programs'],
    funFacts: [
      'Home to a complete steel orchestra with 40 instruments',
      'The pavilion hosts the annual Caribbean Music Festival',
      'Students learn to tune their own steel drums here'
    ]
  },
  {
    id: 'practice-rooms',
    name: 'Individual Practice Rooms',
    shortName: 'Practice Rooms',
    description: 'Fifteen soundproof rooms for individual practice and small ensembles.',
    detailedDescription: 'These acoustically treated rooms provide students with quiet spaces for focused practice. Each room is equipped with a piano and can be booked through our digital system.',
    type: 'studio',
    coordinates: { x: 60, y: 25 },
    features: ['Soundproof', 'Upright pianos', 'Digital booking', 'Security access'],
    capacity: 4,
    hours: '6:00 AM - 11:00 PM',
    accessibility: ['Several wheelchair accessible rooms', 'Adjustable piano benches'],
    virtualTourAvailable: false,
    imageUrl: '/virtual-tour/practice-rooms.jpg',
    relatedPrograms: ['All music programs', 'Individual lessons'],
    funFacts: [
      'Students book over 3,000 hours of practice time annually',
      'Each room has different acoustic properties',
      'The rooms are popular study spaces during exam week'
    ]
  },
  {
    id: 'theatre-workshop',
    name: 'Mitchell Theatre Workshop',
    shortName: 'Theatre Workshop',
    description: 'Flexible black box theatre for experimental performances and classes.',
    detailedDescription: 'This versatile space transforms to meet the needs of different productions and classes. Students learn technical theatre skills while developing their performance abilities.',
    type: 'classroom',
    coordinates: { x: 40, y: 50 },
    features: ['Flexible seating', 'Lighting grid', 'Costume storage', 'Green room'],
    capacity: 60,
    hours: '8:00 AM - 10:00 PM',
    accessibility: ['Wheelchair accessible', 'Assistive listening devices'],
    virtualTourAvailable: true,
    imageUrl: '/virtual-tour/theatre-workshop.jpg',
    relatedPrograms: ['Theatre Arts', 'Directing', 'Technical Theatre'],
    funFacts: [
      'The space can be reconfigured in over 20 different ways',
      'Students have performed Shakespeare, Caribbean drama, and original works here',
      'The lighting system is controlled by student technicians'
    ]
  },
  {
    id: 'student-lounge',
    name: 'Creative Commons Student Lounge',
    shortName: 'Student Lounge',
    description: 'Collaborative space for studying, socializing, and informal performances.',
    detailedDescription: 'The heart of student life at CAPAS, this space encourages collaboration and creativity. Students gather here between classes, host open mic nights, and work on group projects.',
    type: 'common',
    coordinates: { x: 50, y: 80 },
    features: ['Comfortable seating', 'Kitchenette', 'Study areas', 'Performance stage'],
    capacity: 80,
    hours: '7:00 AM - 11:00 PM',
    accessibility: ['Fully wheelchair accessible', 'Service animal friendly'],
    virtualTourAvailable: false,
    imageUrl: '/virtual-tour/student-lounge.jpg',
    relatedPrograms: ['All programs', 'Student organizations'],
    funFacts: [
      'Weekly open mic nights feature over 50 student performances per semester',
      'The space was designed by students in the first graduating class',
      'Free coffee is available during finals week'
    ]
  }
];

const typeColors = {
  performance: 'bg-capas-coral',
  studio: 'bg-capas-turquoise',
  classroom: 'bg-capas-gold',
  outdoor: 'bg-capas-palm',
  common: 'bg-capas-ocean'
};

const typeIcons = {
  performance: PlayIconSolid,
  studio: MusicalNoteIcon,
  classroom: AcademicCapIcon,
  outdoor: MapPinIcon,
  common: UserGroupIcon
};

export default function VirtualTourPage() {
  const [currentStop, setCurrentStop] = useState<TourStop | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredStops = selectedType === 'all' 
    ? tourStops 
    : tourStops.filter(stop => stop.type === selectedType);

  const startGuidedTour = () => {
    setTourActive(true);
    setCurrentStopIndex(0);
    setCurrentStop(tourStops[0]);
  };

  const nextStop = () => {
    if (currentStopIndex < tourStops.length - 1) {
      const nextIndex = currentStopIndex + 1;
      setCurrentStopIndex(nextIndex);
      setCurrentStop(tourStops[nextIndex]);
    }
  };

  const prevStop = () => {
    if (currentStopIndex > 0) {
      const prevIndex = currentStopIndex - 1;
      setCurrentStopIndex(prevIndex);
      setCurrentStop(tourStops[prevIndex]);
    }
  };

  const selectStop = (stop: TourStop) => {
    setCurrentStop(stop);
    const index = tourStops.findIndex(s => s.id === stop.id);
    setCurrentStopIndex(index);
  };

  const stopTypes = [
    { key: 'all', label: 'All Locations', count: tourStops.length },
    { key: 'performance', label: 'Performance', count: tourStops.filter(s => s.type === 'performance').length },
    { key: 'studio', label: 'Studios', count: tourStops.filter(s => s.type === 'studio').length },
    { key: 'classroom', label: 'Classrooms', count: tourStops.filter(s => s.type === 'classroom').length },
    { key: 'outdoor', label: 'Outdoor', count: tourStops.filter(s => s.type === 'outdoor').length },
    { key: 'common', label: 'Common Areas', count: tourStops.filter(s => s.type === 'common').length }
  ];

  return (
    <>
      {/* NextSeo temporarily removed */}
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-capas-turquoise via-capas-ocean to-capas-turquoise-dark text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,100 C300,0 600,200 900,100 C1200,0 1440,100 1440,100 L1440,400 L0,400 Z" fill="currentColor" />
            </svg>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-montserrat text-4xl md:text-6xl font-bold mb-6">
                Virtual Campus Tour
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat mb-8">
                Explore our beautiful campus and world-class facilities from anywhere in the world
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startGuidedTour}
                  className="bg-capas-gold hover:bg-capas-gold-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  <PlayIcon className="w-6 h-6 mr-2" />
                  Start Guided Tour
                </button>
                
                <Link
                  href="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center backdrop-blur-sm"
                >
                  <MapPinIcon className="w-6 h-6 mr-2" />
                  Schedule In-Person Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive Campus Map */}
        <section className="py-12 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter Controls */}
            <div className="mb-8">
              <h2 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-4 text-center">
                Interactive Campus Map
              </h2>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {stopTypes.map((type) => {
                  const IconComponent = typeIcons[type.key as keyof typeof typeIcons] || BuildingOffice2Icon;
                  return (
                    <button
                      key={type.key}
                      onClick={() => setSelectedType(type.key)}
                      className={`flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                        selectedType === type.key
                          ? 'bg-capas-turquoise text-white'
                          : 'bg-white text-capas-ocean-dark hover:bg-capas-sand'
                      }`}
                    >
                      {type.key !== 'all' && <IconComponent className="w-4 h-4 mr-2" />}
                      {type.label} ({type.count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campus Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-capas-ocean-light/20 mb-8">
              <div className="relative aspect-video bg-gradient-to-br from-capas-palm/20 to-capas-turquoise/20">
                {/* Map Background */}
                <PlaceholderImage
                  width={1200}
                  height={675}
                  text="CAPAS Campus Map"
                  variant="landscape"
                  colorScheme="ocean"
                  className="w-full h-full opacity-30"
                />
                
                {/* Overlay Campus Layout */}
                <div className="absolute inset-0">
                  {/* Campus Buildings Outline */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Main Building */}
                    <rect x="35" y="45" width="30" height="25" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" rx="2"/>
                    {/* Performance Hall */}
                    <rect x="45" y="55" width="20" height="15" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" rx="2"/>
                    {/* Studio Complex */}
                    <rect x="25" y="25" width="15" height="20" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" rx="2"/>
                    {/* Recording Studio */}
                    <rect x="70" y="35" width="12" height="10" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5" rx="2"/>
                    {/* Steel Drum Pavilion */}
                    <circle cx="80" cy="70" r="6" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.5"/>
                    {/* Walkways */}
                    <path d="M20,85 Q50,75 80,85" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
                  </svg>
                </div>

                {/* Interactive Map Points */}
                {filteredStops.map((stop) => {
                  const IconComponent = typeIcons[stop.type];
                  const isSelected = currentStop?.id === stop.id;
                  
                  return (
                    <motion.button
                      key={stop.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectStop(stop)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                        isSelected ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        left: `${stop.coordinates.x}%`,
                        top: `${stop.coordinates.y}%`
                      }}
                    >
                      <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
                        {/* Pin */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-all duration-200 ${
                          isSelected ? typeColors[stop.type] + ' scale-125' : typeColors[stop.type] + ' hover:scale-110'
                        }`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        
                        {/* Label */}
                        <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-lg border transition-all duration-200 ${
                          isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                        }`}>
                          <div className="text-xs font-medium text-capas-ocean-dark whitespace-nowrap">
                            {stop.shortName}
                          </div>
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white border-l border-t rotate-45"></div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}

                {/* Tour Controls Overlay */}
                {tourActive && (
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                      <div className="text-sm">
                        Guided Tour: Stop {currentStopIndex + 1} of {tourStops.length}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setAudioEnabled(!audioEnabled)}
                        className="bg-black/70 text-white w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors"
                      >
                        {audioEnabled ? (
                          <SpeakerWaveIcon className="w-5 h-5" />
                        ) : (
                          <SpeakerXMarkIcon className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => setShowFullscreen(true)}
                        className="bg-black/70 text-white w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors"
                      >
                        <ArrowsPointingOutIcon className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={() => setTourActive(false)}
                        className="bg-black/70 text-white w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm hover:bg-black/80 transition-colors"
                      >
                        <XMarkIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Tour Navigation */}
              {tourActive && (
                <div className="bg-capas-sand-light p-4 border-t border-capas-ocean-light/20">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={prevStop}
                      disabled={currentStopIndex === 0}
                      className="flex items-center text-capas-turquoise px-4 py-2 rounded-lg bg-white hover:bg-capas-sand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowLeftIcon className="w-4 h-4 mr-2" />
                      Previous
                    </button>

                    <div className="flex space-x-1">
                      {tourStops.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentStopIndex(index);
                            setCurrentStop(tourStops[index]);
                          }}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentStopIndex ? 'bg-capas-turquoise' : 'bg-capas-ocean-light/30'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextStop}
                      disabled={currentStopIndex === tourStops.length - 1}
                      className="flex items-center text-capas-turquoise px-4 py-2 rounded-lg bg-white hover:bg-capas-sand disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Location Details */}
        {currentStop && (
          <section className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                key={currentStop.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-capas-ocean-light/20"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <PlaceholderImage
                      width={600}
                      height={400}
                      text={currentStop.name}
                      variant="landscape"
                      colorScheme="turquoise"
                      className="w-full h-full"
                    />
                    
                    {currentStop.virtualTourAvailable && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <EyeIcon className="w-4 h-4 mr-1" />
                          360° View Available
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${typeColors[currentStop.type]}`}>
                        {currentStop.type.charAt(0).toUpperCase() + currentStop.type.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                      {currentStop.name}
                    </h2>
                    
                    <p className="text-lg text-capas-ocean-dark mb-6">
                      {currentStop.detailedDescription}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-capas-turquoise mb-3">Features</h3>
                        <ul className="space-y-2">
                          {currentStop.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-capas-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-capas-ocean-dark">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4">
                        {currentStop.capacity && (
                          <div>
                            <div className="text-sm text-capas-ocean-dark/70">Capacity</div>
                            <div className="text-2xl font-bold text-capas-turquoise">{currentStop.capacity}</div>
                          </div>
                        )}
                        
                        <div>
                          <div className="text-sm text-capas-ocean-dark/70">Hours</div>
                          <div className="font-medium text-capas-ocean-dark">{currentStop.hours}</div>
                        </div>
                      </div>
                    </div>

                    {currentStop.relatedPrograms.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-capas-turquoise mb-3">Related Programs</h3>
                        <div className="flex flex-wrap gap-2">
                          {currentStop.relatedPrograms.map((program, index) => (
                            <span
                              key={index}
                              className="bg-capas-sand-light text-capas-ocean-dark px-3 py-1 rounded-full text-sm"
                            >
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-capas-sand-light rounded-lg p-4">
                      <h4 className="font-semibold text-capas-turquoise mb-3 flex items-center">
                        <InformationCircleIcon className="w-5 h-5 mr-2" />
                        Did You Know?
                      </h4>
                      <ul className="space-y-2 text-sm text-capas-ocean-dark">
                        {currentStop.funFacts.map((fact, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-1 h-1 bg-capas-gold rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {currentStop.virtualTourAvailable && (
                      <div className="mt-6 text-center">
                        <button className="bg-capas-gold text-white px-6 py-3 rounded-lg font-semibold hover:bg-capas-gold-dark transition-colors inline-flex items-center">
                          <CameraIcon className="w-5 h-5 mr-2" />
                          View 360° Virtual Tour
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Quick Tour Statistics */}
        <section className="py-16 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '8', label: 'Tour Stops', icon: MapPinIcon },
                { number: '15', label: 'Virtual Views', icon: EyeIcon },
                { number: '300+', label: 'Seat Capacity', icon: UserGroupIcon },
                { number: '24/7', label: 'Virtual Access', icon: BuildingOffice2Icon }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-capas-turquoise w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="font-montserrat text-4xl font-bold text-capas-turquoise mb-2">
                    {stat.number}
                  </div>
                  <div className="text-capas-ocean-dark font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-6">
                Experience CAPAS in Person
              </h2>
              <p className="text-xl text-capas-ocean-dark mb-8">
                Ready to see our campus for yourself? Schedule a personal tour or attend one of our open house events.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Schedule In-Person Tour
                </Link>
                <Link
                  href="/how-to-apply"
                  className="bg-white text-capas-turquoise border-2 border-capas-turquoise hover:bg-capas-turquoise hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}