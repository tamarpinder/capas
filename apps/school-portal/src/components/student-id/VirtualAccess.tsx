'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingLibraryIcon,
  LockClosedIcon,
  LockOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UsersIcon,
  WifiIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface VirtualAccessProps {
  locations: any[];
  onAccess: (locationId: string) => void;
  accessGranted: boolean;
}

export default function VirtualAccess({ locations, onAccess, accessGranted }: VirtualAccessProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  const handleAccessRequest = (locationId: string) => {
    setSelectedLocation(locationId);
    setScanning(true);
    
    setTimeout(() => {
      setScanning(false);
      onAccess(locationId);
    }, 2000);
  };

  const getAccessIcon = (access: string) => {
    switch (access) {
      case 'granted':
        return <LockOpenIcon className="h-5 w-5 text-capas-palm" />;
      case 'restricted':
        return <LockClosedIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
    }
  };

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage > 80) return 'text-capas-coral';
    if (percentage > 60) return 'text-capas-gold';
    return 'text-capas-palm';
  };

  return (
    <div className="space-y-6">
      {/* Campus Map Overview */}
      <div className="bg-gradient-to-br from-capas-ocean/10 to-capas-turquoise/10 rounded-lg p-6">
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4 flex items-center space-x-2">
          <MapPinIcon className="h-6 w-6" />
          <span>Virtual Campus Access</span>
        </h3>
        <p className="text-capas-ocean-dark/80 mb-4">
          Use your digital ID to access campus facilities. Tap on a location to simulate entry.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">{locations.length}</div>
            <div className="text-capas-ocean-dark/70">Total Locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-palm">
              {locations.filter(l => l.access === 'granted').length}
            </div>
            <div className="text-capas-ocean-dark/70">Accessible</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-coral">
              {locations.filter(l => l.access === 'restricted').length}
            </div>
            <div className="text-capas-ocean-dark/70">Restricted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-turquoise">
              <WifiIcon className="h-6 w-6 mx-auto" />
            </div>
            <div className="text-capas-ocean-dark/70">Connected</div>
          </div>
        </div>
      </div>

      {/* Location Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <motion.div
            key={location.id}
            whileHover={{ scale: 1.02 }}
            className={`card-capas p-6 cursor-pointer transition-all ${
              selectedLocation === location.id && scanning ? 'ring-2 ring-capas-turquoise animate-pulse' : ''
            }`}
            onClick={() => location.access === 'granted' && handleAccessRequest(location.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <BuildingLibraryIcon className="h-8 w-8 text-capas-turquoise" />
                <div>
                  <h4 className="font-semibold text-capas-ocean-dark">{location.name}</h4>
                  <p className="text-sm text-capas-ocean-dark/70">{location.description}</p>
                </div>
              </div>
              {getAccessIcon(location.access)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-capas-ocean-dark/60 mb-1">Hours</p>
                <p className="font-medium text-capas-ocean-dark">{location.hours}</p>
              </div>
              <div>
                <p className="text-capas-ocean-dark/60 mb-1">Occupancy</p>
                <p className={`font-medium ${getOccupancyColor(location.currentOccupancy, location.maxOccupancy)}`}>
                  {location.currentOccupancy}/{location.maxOccupancy}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {location.features.map((feature: string, index: number) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-capas-sand-light rounded-full text-capas-ocean-dark"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Access Button/Status */}
            {location.access === 'granted' ? (
              <button
                className="w-full btn-capas-primary text-sm py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAccessRequest(location.id);
                }}
              >
                {selectedLocation === location.id && scanning ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Scanning...</span>
                  </span>
                ) : (
                  'Tap to Enter'
                )}
              </button>
            ) : (
              <div className="w-full bg-capas-coral/10 text-capas-coral text-center py-2 rounded-lg text-sm font-medium">
                Access Restricted
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Access Granted Animation */}
      <AnimatePresence>
        {accessGranted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 bg-capas-palm rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircleIcon className="h-12 w-12 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-capas-ocean-dark mb-2">Access Granted!</h3>
              <p className="text-capas-ocean-dark/70">Welcome to the facility</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Activity */}
      <div className="bg-capas-sand-light rounded-lg p-6">
        <h4 className="font-semibold text-capas-ocean-dark mb-4 flex items-center space-x-2">
          <ClockIcon className="h-5 w-5" />
          <span>Live Campus Activity</span>
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-capas-palm rounded-full animate-pulse"></div>
              <span className="text-capas-ocean-dark">Library Main Entrance</span>
            </div>
            <span className="text-capas-ocean-dark/60">2 students entered</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-capas-turquoise rounded-full animate-pulse"></div>
              <span className="text-capas-ocean-dark">Music Hall Studio A</span>
            </div>
            <span className="text-capas-ocean-dark/60">Session in progress</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-capas-gold rounded-full animate-pulse"></div>
              <span className="text-capas-ocean-dark">Conch Café</span>
            </div>
            <span className="text-capas-ocean-dark/60">Peak hours (78% full)</span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-3">Access Tips</h4>
        <div className="space-y-2 text-sm text-capas-ocean-dark/80">
          <p>• Your digital ID works with NFC-enabled phones for tap access</p>
          <p>• Check occupancy levels before visiting to avoid crowds</p>
          <p>• Request special access through the portal for restricted areas</p>
          <p>• Access logs are recorded for security and safety purposes</p>
        </div>
      </div>
    </div>
  );
}