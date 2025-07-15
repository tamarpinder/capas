'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  XMarkIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  UserGroupIcon,
  TagIcon,
  CalendarIcon,
  PlusIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface EventDetailsProps {
  event: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetails({ event, isOpen, onClose }: EventDetailsProps) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  if (!event) return null;

  const handleRegister = async () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(true);
      setIsRegistering(false);
    }, 1500);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      'cultural': 'bg-capas-coral text-white',
      'academic': 'bg-capas-turquoise text-white',
      'workshop': 'bg-capas-gold text-white',
      'social': 'bg-capas-palm text-white',
      'exam': 'bg-red-500 text-white',
      'assignment': 'bg-orange-500 text-white'
    };
    return colors[type as keyof typeof colors] || 'bg-capas-ocean text-white';
  };

  const getCapacityInfo = () => {
    if (!event.capacity) return null;
    
    const percentFull = (event.registered / event.capacity) * 100;
    let statusColor = 'text-capas-palm';
    let statusText = 'Available';
    
    if (percentFull >= 90) {
      statusColor = 'text-red-500';
      statusText = 'Nearly Full';
    } else if (percentFull >= 70) {
      statusColor = 'text-orange-500';
      statusText = 'Filling Up';
    }

    return {
      percentFull,
      statusColor,
      statusText,
      spotsLeft: event.capacity - event.registered
    };
  };

  const capacityInfo = getCapacityInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`relative p-6 text-white rounded-t-2xl ${event.bgColor ? event.bgColor.replace('/10', '') : 'bg-capas-turquoise'}`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className="pr-12">
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                  {capacityInfo && capacityInfo.percentFull >= 70 && (
                    <span className="flex items-center space-x-1 px-2 py-1 bg-white/20 rounded-full text-sm">
                      <ExclamationTriangleIcon className="h-4 w-4" />
                      <span>{capacityInfo.statusText}</span>
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="h-5 w-5" />
                    <span>{formatTime(event.time)} {event.duration && `(${event.duration})`}</span>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center space-x-2">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  
                  {event.instructor && (
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-5 w-5" />
                      <span>{event.instructor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              {event.description && (
                <div>
                  <h3 className="font-semibold text-capas-ocean-dark mb-3">About This Event</h3>
                  <p className="text-capas-ocean-dark/80 leading-relaxed">{event.description}</p>
                </div>
              )}

              {/* Capacity Information */}
              {capacityInfo && (
                <div>
                  <h3 className="font-semibold text-capas-ocean-dark mb-3">Registration Status</h3>
                  <div className="bg-capas-sand-light rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <UserGroupIcon className="h-5 w-5 text-capas-ocean-dark" />
                        <span className="font-medium text-capas-ocean-dark">
                          {event.registered} of {event.capacity} registered
                        </span>
                      </div>
                      <span className={`text-sm font-medium ${capacityInfo.statusColor}`}>
                        {capacityInfo.spotsLeft} spots left
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white rounded-full h-2">
                      <div 
                        className="bg-capas-turquoise h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(capacityInfo.percentFull, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {event.type === 'cultural' && (
                <div className="bg-capas-gold/10 border border-capas-gold/20 rounded-lg p-4">
                  <h4 className="font-medium text-capas-gold mb-2 flex items-center space-x-2">
                    <TagIcon className="h-4 w-4" />
                    <span>Caribbean Cultural Experience</span>
                  </h4>
                  <p className="text-capas-ocean-dark/80 text-sm">
                    This event is part of our Caribbean Cultural Arts program, celebrating the rich heritage 
                    and traditions of the Bahamas and the wider Caribbean region.
                  </p>
                </div>
              )}

              {/* Registration Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-capas-sand-light">
                {!isRegistered ? (
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering || (capacityInfo && capacityInfo.spotsLeft <= 0)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all ${
                      isRegistering 
                        ? 'bg-capas-turquoise/80 text-white cursor-not-allowed'
                        : capacityInfo && capacityInfo.spotsLeft <= 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'btn-capas-primary hover:scale-105'
                    }`}
                  >
                    {isRegistering ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Registering...</span>
                      </>
                    ) : capacityInfo && capacityInfo.spotsLeft <= 0 ? (
                      <>
                        <ExclamationTriangleIcon className="h-5 w-5" />
                        <span>Event Full</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon className="h-5 w-5" />
                        <span>Register for Event</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 bg-capas-palm text-white rounded-lg font-medium">
                    <CheckIcon className="h-5 w-5" />
                    <span>Successfully Registered!</span>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="sm:flex-none px-6 py-3 border border-capas-sand-light text-capas-ocean-dark rounded-lg hover:bg-capas-sand-light transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Success Message */}
              {isRegistered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-capas-palm/10 border border-capas-palm/20 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3">
                    <CheckIcon className="h-5 w-5 text-capas-palm mt-0.5" />
                    <div>
                      <h4 className="font-medium text-capas-palm mb-1">Registration Confirmed!</h4>
                      <p className="text-capas-ocean-dark/80 text-sm">
                        You'll receive a confirmation email with event details and any preparation materials. 
                        Looking forward to seeing you there! 🏝️
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}