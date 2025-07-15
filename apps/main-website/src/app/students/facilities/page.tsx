'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { NextSeo } from 'next-seo';
import Link from 'next/link';
import {
  BuildingOffice2Icon,
  ComputerDesktopIcon,
  MusicalNoteIcon,
  TvIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  CameraIcon,
  LightBulbIcon,
  MapPinIcon,
  PlayIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
  EyeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';

interface Facility {
  id: string;
  name: string;
  type: 'performance' | 'studio' | 'classroom' | 'technology' | 'common';
  description: string;
  features: string[];
  capacity: number;
  equipment: string[];
  bookingInfo: {
    available: boolean;
    restrictions: string;
    contact: string;
  };
  virtualTourAvailable: boolean;
  imageUrl: string;
  hours: {
    weekdays: string;
    weekends: string;
    holidays: string;
  };
  accessibility: string[];
}

const facilities: Facility[] = [
  {
    id: 'performance-hall',
    name: 'Patricia Glinton-Meicholas Performance Hall',
    type: 'performance',
    description: 'Our flagship 300-seat performance hall features state-of-the-art acoustics and lighting systems designed specifically for both amplified and acoustic performances.',
    features: [
      'Professional acoustic design',
      'Advanced lighting control systems',
      'Flexible seating arrangements',
      'High-quality audio recording capabilities',
      'Professional backstage facilities'
    ],
    capacity: 300,
    equipment: [
      'Yamaha CFX Concert Grand Piano',
      'Meyer Sound PA System',
      'ETC Ion Lighting Console',
      '32-channel digital mixing board',
      'Professional stage lighting rig',
      'Wireless microphone systems'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Student and faculty priority, community bookings welcome',
      contact: 'facilities@capas.edu.bs'
    },
    virtualTourAvailable: true,
    imageUrl: '/facilities/performance-hall.jpg',
    hours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '10:00 AM - 6:00 PM',
      holidays: 'By appointment'
    },
    accessibility: ['Wheelchair accessible', 'Assisted listening devices', 'Priority seating available']
  },
  {
    id: 'recording-studio',
    name: 'Caribbean Music Recording Studio',
    type: 'technology',
    description: 'Professional-grade recording studio equipped for everything from solo vocal recordings to full ensemble productions, specializing in Caribbean music styles.',
    features: [
      'Isolation booths for vocals and instruments',
      'Control room with monitoring speakers',
      'Professional mixing and mastering capabilities',
      'Digital and analog recording options',
      'Live room for ensemble recording'
    ],
    capacity: 12,
    equipment: [
      'Pro Tools HDX system',
      'SSL mixing console',
      'Neumann and AKG microphones',
      'Vintage outboard gear',
      'Steel drum recording setup',
      'Piano and keyboard station'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Training required, supervised sessions for beginners',
      contact: 'recording@capas.edu.bs'
    },
    virtualTourAvailable: true,
    imageUrl: '/facilities/recording-studio.jpg',
    hours: {
      weekdays: '9:00 AM - 9:00 PM',
      weekends: '12:00 PM - 5:00 PM',
      holidays: 'Closed'
    },
    accessibility: ['Wheelchair accessible', 'Adjustable workstations']
  },
  {
    id: 'dance-studios',
    name: 'Hamilton Dance Studios',
    type: 'studio',
    description: 'Three spacious dance studios with specialized flooring, mirror walls, and sound systems designed for various dance styles from ballet to Caribbean traditional dance.',
    features: [
      'Professional Marley dance flooring',
      'Floor-to-ceiling mirrors',
      'Adjustable barres',
      'Individual sound systems',
      'Climate control',
      'Storage for props and costumes'
    ],
    capacity: 25,
    equipment: [
      'Professional audio systems',
      'Portable barres',
      'Practice drums and percussion',
      'Yoga mats and props',
      'First aid station',
      'Water fountain'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Clean indoor shoes required, advance booking preferred',
      contact: 'dance@capas.edu.bs'
    },
    virtualTourAvailable: true,
    imageUrl: '/facilities/dance-studios.jpg',
    hours: {
      weekdays: '7:00 AM - 10:00 PM',
      weekends: '9:00 AM - 6:00 PM',
      holidays: 'Limited hours'
    },
    accessibility: ['Wheelchair accessible entrance', 'Accessible changing rooms', 'Adaptive equipment available']
  },
  {
    id: 'music-practice-rooms',
    name: 'Individual Practice Rooms',
    type: 'studio',
    description: 'Fifteen soundproof practice rooms equipped with pianos and acoustic treatment, providing students with dedicated space for individual practice and small ensemble work.',
    features: [
      'Soundproof construction',
      'Acoustic treatment',
      'Individual climate control',
      'Secure key card access',
      'Practice room booking system',
      'Security cameras for safety'
    ],
    capacity: 4,
    equipment: [
      'Yamaha upright pianos',
      'Music stands',
      'Metronomes',
      'Basic recording equipment',
      'Sheet music storage',
      'Adjustable seating'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Current students only, 2-hour booking limit during peak times',
      contact: 'practice@capas.edu.bs'
    },
    virtualTourAvailable: false,
    imageUrl: '/facilities/practice-rooms.jpg',
    hours: {
      weekdays: '6:00 AM - 11:00 PM',
      weekends: '8:00 AM - 10:00 PM',
      holidays: '10:00 AM - 6:00 PM'
    },
    accessibility: ['Several wheelchair accessible rooms', 'Adjustable piano benches', 'Large-print music available']
  },
  {
    id: 'steel-drum-pavilion',
    name: 'Clarke Steel Drum Pavilion',
    type: 'studio',
    description: 'Outdoor covered pavilion designed specifically for steel drum ensembles, featuring excellent acoustics and space for large group performances and classes.',
    features: [
      'Weather-protected outdoor space',
      'Natural acoustics design',
      'Tiered performance platform',
      'Storage for instruments',
      'Power outlets for amplification',
      'Seating for audiences'
    ],
    capacity: 50,
    equipment: [
      'Complete steel drum orchestra',
      'Bass pans and double seconds',
      'Tenor and alto pans',
      'Percussion accessories',
      'Amplification system',
      'Music stands and chairs'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Weather dependent, advance booking required for non-students',
      contact: 'steeldrum@capas.edu.bs'
    },
    virtualTourAvailable: true,
    imageUrl: '/facilities/steel-drum-pavilion.jpg',
    hours: {
      weekdays: '8:00 AM - 8:00 PM',
      weekends: '10:00 AM - 6:00 PM',
      holidays: 'Closed'
    },
    accessibility: ['Wheelchair accessible', 'Adaptive instruments available', 'Accessible seating']
  },
  {
    id: 'theatre-workshop',
    name: 'Mitchell Theatre Workshop',
    type: 'classroom',
    description: 'Flexible black box theatre space for experimental performances, scene study, and theatre workshops. Features moveable seating and professional lighting.',
    features: [
      'Black box theatre configuration',
      'Moveable seating platforms',
      'Professional lighting grid',
      'Sound system with wireless mics',
      'Costume and prop storage',
      'Green room and changing area'
    ],
    capacity: 60,
    equipment: [
      'Lighting control board',
      'Wireless microphone system',
      'Portable staging platforms',
      'Theatre props and furniture',
      'Costume collection',
      'Makeup station'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Theatre students priority, community theatre welcome',
      contact: 'theatre@capas.edu.bs'
    },
    virtualTourAvailable: true,
    imageUrl: '/facilities/theatre-workshop.jpg',
    hours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '12:00 PM - 8:00 PM',
      holidays: 'By arrangement'
    },
    accessibility: ['Wheelchair accessible', 'Accessible restrooms', 'Assistive listening devices']
  },
  {
    id: 'student-lounge',
    name: 'Creative Commons Student Lounge',
    type: 'common',
    description: 'Comfortable gathering space for students featuring study areas, collaboration spaces, kitchenette, and informal performance area for open mic nights.',
    features: [
      'Comfortable seating areas',
      'Study and collaboration spaces',
      'Kitchenette with appliances',
      'Informal performance stage',
      'Free WiFi and charging stations',
      'Vending machines and water fountain'
    ],
    capacity: 80,
    equipment: [
      'Tables and chairs',
      'Lounge furniture',
      'Refrigerator and microwave',
      'Coffee machine',
      'Sound system for events',
      'Bulletin boards'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Open to all students, events require advance booking',
      contact: 'student.services@capas.edu.bs'
    },
    virtualTourAvailable: false,
    imageUrl: '/facilities/student-lounge.jpg',
    hours: {
      weekdays: '7:00 AM - 11:00 PM',
      weekends: '9:00 AM - 11:00 PM',
      holidays: '10:00 AM - 8:00 PM'
    },
    accessibility: ['Fully wheelchair accessible', 'Accessible furniture', 'Service animal friendly']
  },
  {
    id: 'computer-lab',
    name: 'Digital Arts & Music Technology Lab',
    type: 'technology',
    description: 'State-of-the-art computer laboratory equipped with music production software, digital audio workstations, and multimedia creation tools.',
    features: [
      'High-performance workstations',
      'Professional music software',
      'Digital audio interfaces',
      'MIDI keyboards and controllers',
      'High-quality studio monitors',
      'Collaborative work spaces'
    ],
    capacity: 20,
    equipment: [
      'iMac Pro workstations',
      'Pro Tools and Logic Pro X',
      'Ableton Live and Reason',
      'MIDI controller keyboards',
      'Audio interfaces',
      'Professional headphones'
    ],
    bookingInfo: {
      available: true,
      restrictions: 'Software training required, supervised access for beginners',
      contact: 'technology@capas.edu.bs'
    },
    virtualTourAvailable: false,
    imageUrl: '/facilities/computer-lab.jpg',
    hours: {
      weekdays: '8:00 AM - 9:00 PM',
      weekends: '12:00 PM - 5:00 PM',
      holidays: 'Closed'
    },
    accessibility: ['Wheelchair accessible workstations', 'Assistive technology available', 'Adjustable desks']
  }
];

const facilityIcons = {
  performance: TvIcon,
  studio: MusicalNoteIcon,
  classroom: BuildingOffice2Icon,
  technology: ComputerDesktopIcon,
  common: UserGroupIcon
};

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [virtualTourActive, setVirtualTourActive] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [tourStep, setTourStep] = useState(0);

  const filteredFacilities = filterType === 'all' 
    ? facilities 
    : facilities.filter(facility => facility.type === filterType);

  const virtualTourSteps = [
    {
      title: "Welcome to CAPAS Facilities",
      description: "Take a guided tour through our state-of-the-art facilities designed for creative excellence.",
      image: "/virtual-tour/entrance.jpg"
    },
    {
      title: "Performance Hall",
      description: "Experience our main performance venue with professional acoustics and lighting.",
      image: "/virtual-tour/performance-hall-360.jpg"
    },
    {
      title: "Recording Studio",
      description: "Step inside our professional recording studio equipped with industry-standard gear.",
      image: "/virtual-tour/recording-studio-360.jpg"
    },
    {
      title: "Dance Studios",
      description: "Explore our spacious dance studios with professional flooring and equipment.",
      image: "/virtual-tour/dance-studio-360.jpg"
    },
    {
      title: "Steel Drum Pavilion",
      description: "Visit our unique outdoor steel drum pavilion designed for Caribbean music.",
      image: "/virtual-tour/steel-drum-360.jpg"
    }
  ];

  const startVirtualTour = () => {
    setVirtualTourActive(true);
    setTourStep(0);
  };

  const nextTourStep = () => {
    if (tourStep < virtualTourSteps.length - 1) {
      setTourStep(tourStep + 1);
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const facilityTypes = [
    { key: 'all', label: 'All Facilities', count: facilities.length },
    { key: 'performance', label: 'Performance Spaces', count: facilities.filter(f => f.type === 'performance').length },
    { key: 'studio', label: 'Studios', count: facilities.filter(f => f.type === 'studio').length },
    { key: 'technology', label: 'Technology', count: facilities.filter(f => f.type === 'technology').length },
    { key: 'classroom', label: 'Classrooms', count: facilities.filter(f => f.type === 'classroom').length },
    { key: 'common', label: 'Common Areas', count: facilities.filter(f => f.type === 'common').length }
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
                World-Class Facilities
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 font-montserrat mb-8">
                State-of-the-art spaces designed to inspire creativity and support artistic excellence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startVirtualTour}
                  className="bg-capas-gold hover:bg-capas-gold-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                >
                  <PlayIcon className="w-6 h-6 mr-2" />
                  Take Virtual Tour
                </button>
                
                <Link
                  href="/contact"
                  className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center backdrop-blur-sm"
                >
                  <MapPinIcon className="w-6 h-6 mr-2" />
                  Schedule Visit
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Facility Stats */}
        <section className="py-16 bg-capas-sand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '8', label: 'Major Facilities', icon: BuildingOffice2Icon },
                { number: '300', label: 'Seat Performance Hall', icon: TvIcon },
                { number: '15', label: 'Practice Rooms', icon: MusicalNoteIcon },
                { number: '24/7', label: 'Access Available', icon: LightBulbIcon }
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

        {/* Facility Filters */}
        <section className="py-8 bg-white border-b border-capas-ocean-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {facilityTypes.map((type) => {
                const IconComponent = facilityIcons[type.key as keyof typeof facilityIcons] || BuildingOffice2Icon;
                return (
                  <button
                    key={type.key}
                    onClick={() => setFilterType(type.key)}
                    className={`flex items-center px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
                      filterType === type.key
                        ? 'bg-capas-turquoise text-white'
                        : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-sand'
                    }`}
                  >
                    {type.key !== 'all' && <IconComponent className="w-4 h-4 mr-2" />}
                    {type.label} ({type.count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFacilities.map((facility, index) => {
                const IconComponent = facilityIcons[facility.type];
                return (
                  <motion.div
                    key={facility.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-capas-ocean-light/20 group cursor-pointer"
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <PlaceholderImage
                        width={400}
                        height={200}
                        text={facility.name}
                        variant="landscape"
                        colorScheme="turquoise"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-capas-turquoise text-white p-2 rounded-full">
                          <IconComponent className="w-5 h-5" />
                        </div>
                      </div>
                      {facility.virtualTourAvailable && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            Virtual Tour
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-montserrat text-xl font-bold text-capas-turquoise group-hover:text-capas-turquoise-dark transition-colors">
                          {facility.name}
                        </h3>
                        <span className="bg-capas-sand-light text-capas-ocean-dark px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {facility.type}
                        </span>
                      </div>

                      <p className="text-capas-ocean-dark mb-4 line-clamp-3">
                        {facility.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-capas-ocean-dark/70">
                          <UserGroupIcon className="w-4 h-4 mr-2" />
                          <span>Capacity: {facility.capacity} people</span>
                        </div>
                        <div className="flex items-center text-sm text-capas-ocean-dark/70">
                          <LightBulbIcon className="w-4 h-4 mr-2" />
                          <span>{facility.equipment.length} equipment items</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-capas-turquoise">
                          {facility.bookingInfo.available ? 'Available for booking' : 'Not available'}
                        </span>
                        <ArrowRightIcon className="w-5 h-5 text-capas-ocean-dark/50 group-hover:text-capas-turquoise group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-capas-sand-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat text-4xl font-bold text-capas-turquoise mb-6">
                Experience Our Facilities
              </h2>
              <p className="text-xl text-capas-ocean-dark mb-8">
                Schedule a personal tour or join one of our open house events to see our facilities in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-bold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Schedule Personal Tour
                </Link>
                <button
                  onClick={startVirtualTour}
                  className="bg-white text-capas-turquoise border-2 border-capas-turquoise hover:bg-capas-turquoise hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-200"
                >
                  Start Virtual Tour
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      {/* Facility Detail Modal */}
      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedFacility(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden">
                <PlaceholderImage
                  width={800}
                  height={256}
                  text={selectedFacility.name}
                  variant="landscape"
                  colorScheme="turquoise"
                  className="w-full h-full"
                />
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-2">
                      {selectedFacility.name}
                    </h2>
                    <span className="bg-capas-sand-light text-capas-ocean-dark px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {selectedFacility.type}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-capas-turquoise">{selectedFacility.capacity}</div>
                    <div className="text-sm text-capas-ocean-dark/70">Capacity</div>
                  </div>
                </div>

                <p className="text-capas-ocean-dark mb-6 text-lg">
                  {selectedFacility.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-capas-turquoise mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedFacility.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <StarIcon className="w-4 h-4 text-capas-gold mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-capas-ocean-dark">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-capas-turquoise mb-3">Equipment</h3>
                    <ul className="space-y-2">
                      {selectedFacility.equipment.slice(0, 6).map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-capas-coral rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-capas-ocean-dark">{item}</span>
                        </li>
                      ))}
                      {selectedFacility.equipment.length > 6 && (
                        <li className="text-capas-ocean-dark/70 text-sm">
                          And {selectedFacility.equipment.length - 6} more items...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-capas-turquoise mb-3">Hours</h3>
                    <div className="space-y-2 text-sm text-capas-ocean-dark">
                      <div><strong>Weekdays:</strong> {selectedFacility.hours.weekdays}</div>
                      <div><strong>Weekends:</strong> {selectedFacility.hours.weekends}</div>
                      <div><strong>Holidays:</strong> {selectedFacility.hours.holidays}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-capas-turquoise mb-3">Booking</h3>
                    <div className="space-y-2 text-sm text-capas-ocean-dark">
                      <div className={`font-medium ${selectedFacility.bookingInfo.available ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedFacility.bookingInfo.available ? 'Available' : 'Not Available'}
                      </div>
                      <div>{selectedFacility.bookingInfo.restrictions}</div>
                      <div className="text-capas-turquoise">{selectedFacility.bookingInfo.contact}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-capas-turquoise mb-3">Accessibility</h3>
                    <ul className="space-y-1 text-sm text-capas-ocean-dark">
                      {selectedFacility.accessibility.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1 h-1 bg-capas-palm rounded-full mt-2 mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedFacility.virtualTourAvailable && (
                  <div className="bg-capas-gold/10 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <EyeIcon className="w-5 h-5 text-capas-gold mr-2" />
                      <span className="font-semibold text-capas-gold">Virtual Tour Available</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedFacility(null);
                        startVirtualTour();
                      }}
                      className="bg-capas-gold text-white px-6 py-2 rounded-lg font-semibold hover:bg-capas-gold-dark transition-colors"
                    >
                      Start Virtual Tour
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Tour Modal */}
      <AnimatePresence>
        {virtualTourActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setVirtualTourActive(false)}
              className="absolute top-4 right-4 bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="w-full h-full flex flex-col">
              <div className="flex-1 relative">
                <PlaceholderImage
                  width={1920}
                  height={1080}
                  text={virtualTourSteps[tourStep].title}
                  variant="landscape"
                  colorScheme="ocean"
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h2 className="font-montserrat text-4xl font-bold mb-4">
                    {virtualTourSteps[tourStep].title}
                  </h2>
                  <p className="text-xl max-w-3xl">
                    {virtualTourSteps[tourStep].description}
                  </p>
                </div>
              </div>

              <div className="bg-black/80 p-6 flex items-center justify-between">
                <button
                  onClick={prevTourStep}
                  disabled={tourStep === 0}
                  className="flex items-center text-white px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-2">
                  {virtualTourSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTourStep(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === tourStep ? 'bg-capas-gold' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTourStep}
                  disabled={tourStep === virtualTourSteps.length - 1}
                  className="flex items-center text-white px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}