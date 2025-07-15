'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XMarkIcon,
  BellIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  ClockIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface NotificationSettingsProps {
  onClose: () => void;
}

export default function NotificationSettings({ onClose }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    // Notification Types
    academicUpdates: true,
    culturalEvents: true,
    weatherAlerts: true,
    socialEvents: false,
    financialNotices: true,
    systemMaintenance: false,
    
    // Delivery Methods
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    
    // Timing
    quietHours: true,
    quietStart: '22:00',
    quietEnd: '07:00',
    
    // Priority Settings
    urgentOnly: false,
    highPrioritySound: true,
    groupSimilar: true,
    
    // Frequency
    instantDelivery: true,
    dailyDigest: false,
    weeklyDigest: false
  });

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const notificationTypes = [
    {
      key: 'academicUpdates',
      label: 'Academic Updates',
      description: 'Grades, assignments, and course announcements',
      icon: '📚',
      color: 'text-capas-turquoise'
    },
    {
      key: 'culturalEvents',
      label: 'Cultural Events',
      description: 'Junkanoo, festivals, and Caribbean celebrations',
      icon: '🎭',
      color: 'text-capas-coral'
    },
    {
      key: 'weatherAlerts',
      label: 'Weather Alerts',
      description: 'Storm warnings and campus closures',
      icon: '🌊',
      color: 'text-capas-ocean'
    },
    {
      key: 'socialEvents',
      label: 'Social Events',
      description: 'Student gatherings and community activities',
      icon: '🎉',
      color: 'text-capas-palm'
    },
    {
      key: 'financialNotices',
      label: 'Financial Notices',
      description: 'Payment reminders and financial aid updates',
      icon: '💰',
      color: 'text-capas-gold'
    },
    {
      key: 'systemMaintenance',
      label: 'System Maintenance',
      description: 'Portal updates and technical notices',
      icon: '🔧',
      color: 'text-capas-sand'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg border border-capas-sand-light p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-capas-ocean-dark flex items-center space-x-2">
          <BellIcon className="h-6 w-6 text-capas-turquoise" />
          <span>Notification Settings</span>
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-capas-sand-light transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-capas-ocean-dark/60" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Notification Types */}
        <div>
          <h4 className="font-medium text-capas-ocean-dark mb-4">Notification Types</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-start space-x-3 p-3 rounded-lg border border-capas-sand-light">
                <div className="text-2xl">{type.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className={`font-medium ${type.color}`}>{type.label}</h5>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings[type.key as keyof typeof settings] as boolean}
                        onChange={(e) => handleSettingChange(type.key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
                    </label>
                  </div>
                  <p className="text-sm text-capas-ocean-dark/70">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div>
          <h4 className="font-medium text-capas-ocean-dark mb-4">Delivery Methods</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-capas-sand-light">
              <div className="flex items-center space-x-3">
                <DevicePhoneMobileIcon className="h-5 w-5 text-capas-turquoise" />
                <div>
                  <h5 className="font-medium text-capas-ocean-dark">Push Notifications</h5>
                  <p className="text-sm text-capas-ocean-dark/70">Real-time alerts on your device</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-capas-sand-light">
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-capas-coral" />
                <div>
                  <h5 className="font-medium text-capas-ocean-dark">Email Notifications</h5>
                  <p className="text-sm text-capas-ocean-dark/70">Detailed notifications via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-capas-sand-light">
              <div className="flex items-center space-x-3">
                <DevicePhoneMobileIcon className="h-5 w-5 text-capas-gold" />
                <div>
                  <h5 className="font-medium text-capas-ocean-dark">SMS Notifications</h5>
                  <p className="text-sm text-capas-ocean-dark/70">Critical alerts via text message</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div>
          <h4 className="font-medium text-capas-ocean-dark mb-4">Quiet Hours</h4>
          <div className="p-4 rounded-lg border border-capas-sand-light">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-capas-turquoise" />
                <span className="font-medium text-capas-ocean-dark">Enable Quiet Hours</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.quietHours}
                  onChange={(e) => handleSettingChange('quietHours', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
            
            {settings.quietHours && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={settings.quietStart}
                    onChange={(e) => handleSettingChange('quietStart', e.target.value)}
                    className="w-full px-3 py-2 border border-capas-sand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-capas-ocean-dark mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={settings.quietEnd}
                    onChange={(e) => handleSettingChange('quietEnd', e.target.value)}
                    className="w-full px-3 py-2 border border-capas-sand-light rounded-lg focus:outline-none focus:ring-2 focus:ring-capas-turquoise"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-capas-sand-light">
          <button
            onClick={onClose}
            className="px-4 py-2 text-capas-ocean-dark hover:bg-capas-sand-light rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Here you would save the settings to your backend
              console.log('Saving settings:', settings);
              onClose();
            }}
            className="btn-capas-primary px-6 py-2 flex items-center space-x-2"
          >
            <CheckIcon className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}