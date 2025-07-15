'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface NotificationCardProps {
  notification: Notification;
  isSelected: boolean;
  onToggleSelection: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
}

export default function NotificationCard({ 
  notification, 
  isSelected, 
  onToggleSelection, 
  onMarkAsRead, 
  onDelete 
}: NotificationCardProps) {
  const [showActions, setShowActions] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-capas-coral bg-capas-coral/5';
      case 'high':
        return 'border-l-capas-gold bg-capas-gold/5';
      case 'medium':
        return 'border-l-capas-turquoise bg-capas-turquoise/5';
      default:
        return 'border-l-capas-sand-light bg-white';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral" />;
      case 'high':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-gold" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-capas-turquoise" />;
    }
  };

  const formatTime = (timeStr: string) => {
    // Simple time formatting for demo
    return timeStr;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`relative border-l-4 ${getPriorityColor(notification.priority)} rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isSelected ? 'ring-2 ring-capas-turquoise' : ''
      } ${!notification.read ? 'bg-opacity-100' : 'opacity-75'}`}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection();
          }}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-capas-turquoise border-capas-turquoise' 
              : 'border-capas-sand-light hover:border-capas-turquoise'
          }`}
        >
          {isSelected && <CheckIcon className="h-3 w-3 text-white" />}
        </button>
      </div>

      {/* Notification Content */}
      <div className="ml-8 mr-12">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{notification.icon}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`font-semibold ${notification.read ? 'text-capas-ocean-dark/80' : 'text-capas-ocean-dark'}`}>
                  {notification.title}
                </h3>
                {!notification.read && (
                  <div className="w-2 h-2 bg-capas-turquoise rounded-full"></div>
                )}
              </div>
              <p className={`text-sm ${notification.read ? 'text-capas-ocean-dark/60' : 'text-capas-ocean-dark/80'}`}>
                {notification.message}
              </p>
            </div>
          </div>
          
          {getPriorityIcon(notification.priority)}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-capas-ocean-dark/60">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-3 w-3" />
              <span>{formatTime(notification.time)}</span>
            </div>
            <span className="px-2 py-1 bg-capas-sand-light rounded-full">
              {notification.category}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              notification.priority === 'urgent' ? 'bg-capas-coral/20 text-capas-coral' :
              notification.priority === 'high' ? 'bg-capas-gold/20 text-capas-gold' :
              'bg-capas-turquoise/20 text-capas-turquoise'
            }`}>
              {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Menu */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-1 rounded-full hover:bg-capas-sand-light transition-colors"
          >
            <EllipsisVerticalIcon className="h-5 w-5 text-capas-ocean-dark/60" />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-capas-sand-light z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead();
                  setShowActions(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light transition-colors"
              >
                <EyeIcon className="h-4 w-4" />
                <span>{notification.read ? 'Mark as Unread' : 'Mark as Read'}</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setShowActions(false);
                }}
                className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-capas-coral hover:bg-capas-coral/10 transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click overlay for mobile */}
      <div 
        className="absolute inset-0 z-0"
        onClick={() => {
          if (!notification.read) {
            onMarkAsRead();
          }
        }}
      />
    </motion.div>
  );
}