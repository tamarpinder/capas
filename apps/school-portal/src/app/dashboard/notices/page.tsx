'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import NotificationCard from '@/components/notifications/NotificationCard';
import NotificationSettings from '@/components/notifications/NotificationSettings';
import {
  BellIcon,
  SparklesIcon,
  CheckIcon,
  XMarkIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function NoticesPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  // Add error boundary for component failures
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-capas-coral mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-capas-ocean-dark mb-2">Notices Temporarily Unavailable</h2>
          <p className="text-capas-ocean-dark/70 mb-4">We're working to fix this issue. Please try again later.</p>
          <button 
            onClick={() => setError(null)}
            className="bg-capas-turquoise text-white px-4 py-2 rounded-lg hover:bg-capas-turquoise-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    try {
      // Initialize with student notifications plus system notifications
      const systemNotifications = [
        {
          id: 'system-1',
          type: 'announcement',
          title: 'Junkanoo Festival Registration Open',
          message: 'Join the annual Junkanoo Festival celebration! Registration is now open for performers and volunteers.',
          time: '2 hours ago',
          read: false,
          priority: 'high',
          icon: '🎭',
          color: 'text-capas-coral',
          bgColor: 'bg-capas-coral/10',
          category: 'Cultural Events'
        },
        {
          id: 'system-2',
          type: 'academic',
          title: 'Midterm Grades Posted',
          message: 'Your midterm grades are now available in the academic portal. Check your progress and schedule advising if needed.',
          time: '1 day ago',
          read: false,
          priority: 'high',
          icon: '📊',
          color: 'text-capas-turquoise',
          bgColor: 'bg-capas-turquoise/10',
          category: 'Academic'
        },
        {
          id: 'system-3',
          type: 'weather',
          title: 'Tropical Storm Watch',
          message: 'A tropical storm watch has been issued for the Bahamas. Campus operations may be affected. Stay tuned for updates.',
          time: '3 hours ago',
          read: true,
          priority: 'urgent',
          icon: '🌊',
          color: 'text-capas-ocean',
          bgColor: 'bg-capas-ocean/10',
          category: 'Safety'
        },
        {
          id: 'system-4',
          type: 'social',
          title: 'Beach Cleanup Volunteer Event',
          message: 'Join us for a community beach cleanup at Cable Beach this Saturday. Contribute to keeping our islands beautiful!',
          time: '1 day ago',
          read: true,
          priority: 'medium',
          icon: '🏖️',
          color: 'text-capas-palm',
          bgColor: 'bg-capas-palm/10',
          category: 'Community'
        },
        {
          id: 'system-5',
          type: 'deadline',
          title: 'Financial Aid Applications Due',
          message: 'Reminder: Financial aid applications for the Spring semester are due by October 15th.',
          time: '2 days ago',
          read: false,
          priority: 'medium',
          icon: '💰',
          color: 'text-capas-gold',
          bgColor: 'bg-capas-gold/10',
          category: 'Financial'
        }
      ];

      const studentNotifications = mockStudent?.notifications || [];
      const allNotifications = [...systemNotifications, ...studentNotifications];
      setNotifications(allNotifications);
    } catch (err) {
      console.error('Error loading notifications:', err);
      setError('Failed to load notifications');
    }
  }, [mockStudent]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && !notification.read) ||
      (filter === 'read' && notification.read) ||
      notification.type === filter ||
      notification.category === filter;
    
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const toggleNotificationSelection = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const bulkMarkAsRead = () => {
    setNotifications(prev => prev.map(notification => 
      selectedNotifications.includes(notification.id)
        ? { ...notification, read: true }
        : notification
    ));
    setSelectedNotifications([]);
  };

  const bulkDelete = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.includes(notification.id)));
    setSelectedNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.type === 'urgent' && !n.read).length;

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'urgent', label: 'Urgent', count: urgentCount },
    { value: 'Academic', label: 'Academic', count: notifications.filter(n => n.category === 'Academic').length },
    { value: 'Cultural Events', label: 'Cultural', count: notifications.filter(n => n.category === 'Cultural Events').length },
    { value: 'Safety', label: 'Safety', count: notifications.filter(n => n.category === 'Safety').length }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-coral to-capas-gold rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,150 200,100 T400,100 L400,0 L0,0 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center space-x-3 mb-4">
            <BellIcon className="h-8 w-8" />
            <h1 className="font-display text-3xl md:text-4xl font-bold">
              Notifications
            </h1>
            <SparklesIcon className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="bg-white text-capas-coral rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {unreadCount}
              </span>
            )}
          </div>
          <p className="text-white/90 text-lg mb-4">
            Stay updated with important announcements and island happenings 🏝️
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center space-x-2">
              <InformationCircleIcon className="h-5 w-5" />
              <span>{notifications.length} total notifications</span>
            </div>
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span>{urgentCount} urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="h-5 w-5" />
              <span>Community updates enabled</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Search and Filter */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-capas-ocean-dark/40" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-capas-sand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <FunnelIcon className="h-5 w-5 text-capas-ocean-dark/60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-capas-sand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {selectedNotifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={bulkMarkAsRead}
                className="flex items-center space-x-1 px-3 py-2 bg-capas-turquoise text-white rounded-lg hover:bg-capas-turquoise/90 transition-colors"
              >
                <CheckIcon className="h-4 w-4" />
                <span>Mark Read</span>
              </button>
              <button
                onClick={bulkDelete}
                className="flex items-center space-x-1 px-3 py-2 bg-capas-coral text-white rounded-lg hover:bg-capas-coral/90 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
          
          <button
            onClick={markAllAsRead}
            className="flex items-center space-x-2 px-4 py-2 border border-capas-turquoise text-capas-turquoise rounded-lg hover:bg-capas-turquoise hover:text-white transition-colors"
          >
            <CheckIcon className="h-4 w-4" />
            <span>Mark All Read</span>
          </button>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center space-x-2 px-4 py-2 border border-capas-sand-light text-capas-ocean-dark rounded-lg hover:bg-capas-sand-light transition-colors"
          >
            <Cog6ToothIcon className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Notification Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NotificationSettings onClose={() => setShowSettings(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            try {
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <NotificationCard
                    notification={notification}
                    isSelected={selectedNotifications.includes(notification.id)}
                    onToggleSelection={() => toggleNotificationSelection(notification.id)}
                    onMarkAsRead={() => markAsRead(notification.id)}
                    onDelete={() => deleteNotification(notification.id)}
                  />
                </motion.div>
              );
            } catch (err) {
              console.error('Error rendering notification:', notification.id, err);
              return (
                <div key={notification.id} className="p-4 bg-capas-coral/10 rounded-lg border border-capas-coral/20">
                  <p className="text-capas-coral text-sm">Failed to load notification</p>
                </div>
              );
            }
          })
        ) : (
          <div className="text-center py-12">
            <BellIcon className="h-16 w-16 text-capas-ocean-dark/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">No notifications found</h3>
            <p className="text-capas-ocean-dark/70">
              {searchTerm 
                ? `No notifications match "${searchTerm}"`
                : 'You\'re all caught up! Enjoy your island time 🏝️'
              }
            </p>
          </div>
        )}
      </div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}