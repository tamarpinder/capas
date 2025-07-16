'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { getStudentByEmail } from '@/lib/mock-data';
import {
  CogIcon,
  SparklesIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  LanguageIcon,
  LockClosedIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { type ExtendedUser } from '@/lib/auth';

export default function SettingsPage() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState('notifications');
  const [hasChanges, setHasChanges] = useState(false);
  
  const studentData = session?.user as ExtendedUser | undefined;
  const mockStudent = studentData?.email ? getStudentByEmail(studentData.email) : null;

  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      academicAlerts: true,
      culturalEvents: true,
      weatherAlerts: true,
      systemUpdates: false,
      marketingEmails: false,
      quietHours: { enabled: true, start: '22:00', end: '07:00' }
    },
    privacy: {
      profileVisibility: 'students',
      showEmail: false,
      showPhone: false,
      allowDirectMessages: true,
      showOnlineStatus: true,
      dataSharing: false,
      analyticsOptOut: false
    },
    appearance: {
      theme: 'auto',
      colorScheme: 'default',
      fontSize: 'medium',
      highContrast: false,
      reducedMotion: false,
      compactMode: false
    },
    language: {
      primaryLanguage: 'English',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour',
      timezone: 'America/Nassau',
      currency: 'BSD'
    },
    security: {
      twoFactorEnabled: false,
      loginAlerts: true,
      sessionTimeout: '60',
      passwordLastChanged: '2024-06-15',
      trustedDevices: 2,
      securityQuestions: true
    },
    accessibility: {
      screenReader: false,
      keyboardNavigation: false,
      voiceCommands: false,
      largeText: false,
      audioDescriptions: false,
      closedCaptions: true
    }
  });

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // In a real app, this would save to the backend
    setHasChanges(false);
    // Show success message
  };

  const resetToDefaults = () => {
    // Reset to default settings
    setHasChanges(true);
  };

  const settingsSections = [
    { id: 'notifications', name: 'Notifications', icon: BellIcon, description: 'Manage how you receive updates' },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon, description: 'Control your data and visibility' },
    { id: 'appearance', name: 'Appearance', icon: PaintBrushIcon, description: 'Customize your experience' },
    { id: 'language', name: 'Language & Region', icon: LanguageIcon, description: 'Set your preferences' },
    { id: 'security', name: 'Security', icon: LockClosedIcon, description: 'Protect your account' },
    { id: 'accessibility', name: 'Accessibility', icon: EyeIcon, description: 'Improve usability' }
  ];

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Notification Methods</h4>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
            { key: 'smsNotifications', label: 'SMS Notifications', description: 'Get text message alerts' },
            { key: 'pushNotifications', label: 'Push Notifications', description: 'Browser and mobile push alerts' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
              <div>
                <div className="font-medium text-capas-ocean-dark">{item.label}</div>
                <div className="text-sm text-capas-ocean-dark/70">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                  onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Content Types</h4>
        <div className="space-y-4">
          {[
            { key: 'academicAlerts', label: 'Academic Alerts', description: 'Grades, deadlines, and course updates' },
            { key: 'culturalEvents', label: 'Cultural Events', description: 'Junkanoo festivals and island celebrations' },
            { key: 'weatherAlerts', label: 'Weather Alerts', description: 'Tropical storm and hurricane updates' },
            { key: 'systemUpdates', label: 'System Updates', description: 'Platform maintenance and new features' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional content and offers' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
              <div>
                <div className="font-medium text-capas-ocean-dark">{item.label}</div>
                <div className="text-sm text-capas-ocean-dark/70">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                  onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Quiet Hours</h4>
        <div className="p-4 bg-capas-sand-light/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-capas-ocean-dark">Enable Quiet Hours</div>
              <div className="text-sm text-capas-ocean-dark/70">Pause non-urgent notifications during specified hours</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.quietHours.enabled}
                onChange={(e) => updateSetting('notifications', 'quietHours', { ...settings.notifications.quietHours, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
            </label>
          </div>
          {settings.notifications.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">Start Time</label>
                <input
                  type="time"
                  value={settings.notifications.quietHours.start}
                  onChange={(e) => updateSetting('notifications', 'quietHours', { ...settings.notifications.quietHours, start: e.target.value })}
                  className="input-capas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-capas-ocean-dark mb-2">End Time</label>
                <input
                  type="time"
                  value={settings.notifications.quietHours.end}
                  onChange={(e) => updateSetting('notifications', 'quietHours', { ...settings.notifications.quietHours, end: e.target.value })}
                  className="input-capas"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Profile Visibility</h4>
        <div className="space-y-4">
          <div className="p-4 bg-capas-sand-light/30 rounded-lg">
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">Who can see your profile?</label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value)}
              className="input-capas w-full"
            >
              <option value="public">Everyone</option>
              <option value="students">CAPAS Students Only</option>
              <option value="instructors">Instructors & Staff Only</option>
              <option value="private">Nobody</option>
            </select>
          </div>
          
          {[
            { key: 'showEmail', label: 'Show Email Address', description: 'Display your email on your profile' },
            { key: 'showPhone', label: 'Show Phone Number', description: 'Display your phone number on your profile' },
            { key: 'allowDirectMessages', label: 'Allow Direct Messages', description: 'Let other students message you directly' },
            { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Display when you\'re active on the platform' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
              <div>
                <div className="font-medium text-capas-ocean-dark">{item.label}</div>
                <div className="text-sm text-capas-ocean-dark/70">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy[item.key as keyof typeof settings.privacy] as boolean}
                  onChange={(e) => updateSetting('privacy', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Data & Analytics</h4>
        <div className="space-y-4">
          {[
            { key: 'dataSharing', label: 'Data Sharing', description: 'Share anonymized data to improve services' },
            { key: 'analyticsOptOut', label: 'Opt Out of Analytics', description: 'Disable usage analytics collection' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
              <div>
                <div className="font-medium text-capas-ocean-dark">{item.label}</div>
                <div className="text-sm text-capas-ocean-dark/70">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.privacy[item.key as keyof typeof settings.privacy] as boolean}
                  onChange={(e) => updateSetting('privacy', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Theme</h4>
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'light', label: 'Light', icon: SunIcon },
            { value: 'dark', label: 'Dark', icon: MoonIcon },
            { value: 'auto', label: 'Auto', icon: ComputerDesktopIcon }
          ].map(theme => (
            <label key={theme.value} className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              settings.appearance.theme === theme.value 
                ? 'border-capas-turquoise bg-capas-turquoise/5' 
                : 'border-capas-sand-light hover:border-capas-turquoise/50'
            }`}>
              <input
                type="radio"
                name="theme"
                value={theme.value}
                checked={settings.appearance.theme === theme.value}
                onChange={(e) => updateSetting('appearance', 'theme', e.target.value)}
                className="sr-only"
              />
              <div className="text-center">
                <theme.icon className="h-8 w-8 mx-auto mb-2 text-capas-ocean-dark" />
                <div className="font-medium text-capas-ocean-dark">{theme.label}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Display Options</h4>
        <div className="space-y-4">
          <div className="p-4 bg-capas-sand-light/30 rounded-lg">
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">Font Size</label>
            <select
              value={settings.appearance.fontSize}
              onChange={(e) => updateSetting('appearance', 'fontSize', e.target.value)}
              className="input-capas w-full"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="extra-large">Extra Large</option>
            </select>
          </div>
          
          {[
            { key: 'highContrast', label: 'High Contrast', description: 'Increase contrast for better visibility' },
            { key: 'reducedMotion', label: 'Reduced Motion', description: 'Minimize animations and transitions' },
            { key: 'compactMode', label: 'Compact Mode', description: 'Show more content in less space' }
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-capas-sand-light/30 rounded-lg">
              <div>
                <div className="font-medium text-capas-ocean-dark">{item.label}</div>
                <div className="text-sm text-capas-ocean-dark/70">{item.description}</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance[item.key as keyof typeof settings.appearance] as boolean}
                  onChange={(e) => updateSetting('appearance', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="p-4 bg-capas-coral/10 border border-capas-coral/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral mt-0.5" />
          <div>
            <h4 className="font-medium text-capas-coral mb-1">Security Notice</h4>
            <p className="text-sm text-capas-coral/80">
              Protect your account with strong security settings. Enable two-factor authentication for enhanced protection.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Account Security</h4>
        <div className="space-y-4">
          <div className="p-4 bg-capas-sand-light/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-capas-ocean-dark">Two-Factor Authentication</div>
                <div className="text-sm text-capas-ocean-dark/70">Add an extra layer of security to your account</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorEnabled}
                  onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
            {!settings.security.twoFactorEnabled && (
              <button className="btn-capas-primary text-sm">
                Set Up Two-Factor Authentication
              </button>
            )}
          </div>

          <div className="p-4 bg-capas-sand-light/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-capas-ocean-dark">Login Alerts</div>
                <div className="text-sm text-capas-ocean-dark/70">Get notified of new login attempts</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.loginAlerts}
                  onChange={(e) => updateSetting('security', 'loginAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-capas-turquoise/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-capas-turquoise"></div>
              </label>
            </div>
          </div>

          <div className="p-4 bg-capas-sand-light/30 rounded-lg">
            <label className="block text-sm font-medium text-capas-ocean-dark mb-2">Session Timeout (minutes)</label>
            <select
              value={settings.security.sessionTimeout}
              onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
              className="input-capas w-full"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="0">Never</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium text-capas-ocean-dark mb-4">Quick Actions</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <button className="p-4 border border-capas-turquoise text-capas-turquoise rounded-lg hover:bg-capas-turquoise hover:text-white transition-colors">
            <KeyIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Change Password</div>
            <div className="text-sm opacity-80">Last changed: {settings.security.passwordLastChanged}</div>
          </button>
          
          <button className="p-4 border border-capas-coral text-capas-coral rounded-lg hover:bg-capas-coral hover:text-white transition-colors">
            <DevicePhoneMobileIcon className="h-6 w-6 mx-auto mb-2" />
            <div className="font-medium">Manage Devices</div>
            <div className="text-sm opacity-80">{settings.security.trustedDevices} trusted devices</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'notifications':
        return renderNotificationsSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return (
          <div className="text-center py-12">
            <InformationCircleIcon className="h-16 w-16 text-capas-ocean-dark/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">Settings Section</h3>
            <p className="text-capas-ocean-dark/70">Select a section from the sidebar to view settings.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-capas-ocean to-capas-turquoise rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z" fill="currentColor" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <CogIcon className="h-8 w-8" />
                <h1 className="font-display text-3xl md:text-4xl font-bold">
                  Settings
                </h1>
                <SparklesIcon className="h-6 w-6" />
              </div>
              <p className="text-white/90 text-lg mb-4">
                Customize your CAPAS experience to match your island lifestyle 🏝️
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center space-x-2">
                  <ShieldCheckIcon className="h-5 w-5" />
                  <span>Secure Account</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BellIcon className="h-5 w-5" />
                  <span>Notifications Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GlobeAltIcon className="h-5 w-5" />
                  <span>Nassau Time Zone</span>
                </div>
              </div>
            </div>
            
            {hasChanges && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={saveSettings}
                  className="flex items-center space-x-2 px-4 py-2 bg-capas-palm text-white rounded-lg hover:bg-capas-palm/90 transition-colors"
                >
                  <CheckIcon className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setHasChanges(false)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                  <span>Discard</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Settings Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:w-1/3 xl:w-1/4"
        >
          <div className="card-capas p-6">
            <h3 className="font-display text-lg font-semibold text-capas-ocean-dark mb-4">
              Settings Categories
            </h3>
            <nav className="space-y-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-capas-turquoise text-white'
                      : 'text-capas-ocean-dark hover:bg-capas-sand-light'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{section.name}</div>
                      <div className={`text-xs ${
                        activeSection === section.id ? 'text-white/80' : 'text-capas-ocean-dark/60'
                      }`}>
                        {section.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <div className="card-capas p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-capas-ocean-dark">
                {settingsSections.find(s => s.id === activeSection)?.name}
              </h3>
              <button
                onClick={resetToDefaults}
                className="text-sm text-capas-ocean-dark/60 hover:text-capas-turquoise transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
            
            {renderSectionContent()}
          </div>
        </motion.div>
      </div>

      {/* Bottom Spacer for Mobile Navigation */}
      <div className="h-20 lg:h-0"></div>
    </div>
  );
}