'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClockIcon,
  MapPinIcon,
  CheckCircleIcon,
  XCircleIcon,
  FunnelIcon,
  ChevronDownIcon,
  CalendarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface AccessHistoryProps {
  history: any[];
  student: any;
}

export default function AccessHistory({ history, student }: AccessHistoryProps) {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Access' },
    { value: 'granted', label: 'Granted' },
    { value: 'restricted', label: 'Restricted' },
    { value: 'entry', label: 'Entry Only' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'location', label: 'By Location' },
    { value: 'status', label: 'By Status' }
  ];

  const filteredHistory = history.filter(item => {
    if (filterType === 'all') return true;
    return item.status === filterType || item.type === filterType;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case 'location':
        return a.location.localeCompare(b.location);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return b.id - a.id; // Most recent first
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'restricted':
        return <XCircleIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'granted':
        return 'text-capas-palm bg-capas-palm/10';
      case 'restricted':
        return 'text-capas-coral bg-capas-coral/10';
      default:
        return 'text-capas-gold bg-capas-gold/10';
    }
  };

  const generateMockStats = () => {
    const totalEntries = history.length;
    const grantedEntries = history.filter(h => h.status === 'granted').length;
    const restrictedEntries = history.filter(h => h.status === 'restricted').length;
    const mostVisited = 'Main Library';
    
    return {
      totalEntries,
      grantedEntries,
      restrictedEntries,
      mostVisited,
      successRate: Math.round((grantedEntries / totalEntries) * 100)
    };
  };

  const stats = generateMockStats();

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-capas-turquoise/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-capas-ocean-dark">{stats.totalEntries}</div>
          <div className="text-sm text-capas-ocean-dark/70">Total Entries</div>
        </div>
        
        <div className="bg-capas-palm/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-capas-ocean-dark">{stats.grantedEntries}</div>
          <div className="text-sm text-capas-ocean-dark/70">Granted</div>
        </div>
        
        <div className="bg-capas-coral/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-capas-ocean-dark">{stats.restrictedEntries}</div>
          <div className="text-sm text-capas-ocean-dark/70">Restricted</div>
        </div>
        
        <div className="bg-capas-gold/10 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-capas-ocean-dark">{stats.successRate}%</div>
          <div className="text-sm text-capas-ocean-dark/70">Success Rate</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-capas-sand-light rounded-lg hover:bg-capas-sand transition-colors"
          >
            <FunnelIcon className="h-4 w-4" />
            <span className="text-sm">Filters</span>
            <ChevronDownIcon className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-capas-sand-light rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 text-capas-turquoise hover:text-capas-turquoise/80 transition-colors">
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span className="text-sm">Export</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-capas-sand-light rounded-lg p-4"
        >
          <div className="flex flex-wrap gap-2">
            {filterOptions.map(option => (
              <button
                key={option.value}
                onClick={() => setFilterType(option.value)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filterType === option.value
                    ? 'bg-capas-turquoise text-white'
                    : 'bg-white text-capas-ocean-dark hover:bg-capas-turquoise/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Access History List */}
      <div className="space-y-3">
        {sortedHistory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="card-capas p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="mt-1">
                  <item.icon className="h-6 w-6 text-capas-turquoise" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-capas-ocean-dark">{item.location}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="h-4 w-4" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getStatusIcon(item.status)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Most Visited Locations */}
      <div className="bg-gradient-to-r from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6">
        <h4 className="font-semibold text-capas-turquoise mb-4">Most Visited Locations</h4>
        
        <div className="space-y-3">
          {[
            { name: 'Main Library', visits: 45, percentage: 65 },
            { name: 'Music Practice Rooms', visits: 28, percentage: 40 },
            { name: 'Computer Lab', visits: 15, percentage: 22 },
            { name: 'Conch Café', visits: 12, percentage: 17 }
          ].map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-capas-turquoise rounded-full"></div>
                <span className="text-sm text-capas-ocean-dark">{location.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-white rounded-full h-2">
                  <div 
                    className="bg-capas-turquoise h-2 rounded-full transition-all duration-500"
                    style={{ width: `${location.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-capas-ocean-dark/70 w-8 text-right">
                  {location.visits}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-lg p-6 border border-capas-sand-light">
        <h4 className="font-semibold text-capas-ocean-dark mb-4">Weekly Activity</h4>
        
        <div className="flex items-end justify-between h-32 space-x-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
            const activity = Math.floor(Math.random() * 8) + 1;
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className="flex-1 flex items-end">
                  <div
                    className="w-full bg-capas-turquoise rounded-t transition-all duration-500 hover:bg-capas-turquoise/80"
                    style={{ height: `${(activity / 8) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-capas-ocean-dark/70 mt-2">{day}</div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-4 text-sm text-capas-ocean-dark/70">
          Average daily campus visits
        </div>
      </div>
    </div>
  );
}