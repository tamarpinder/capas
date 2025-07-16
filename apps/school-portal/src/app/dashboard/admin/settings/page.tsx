'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  CogIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  BellIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function AdminSettingsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);

  const settingTabs = [
    { id: 'general', name: 'General Settings', icon: CogIcon },
    { id: 'academic', name: 'Academic Settings', icon: AcademicCapIcon },
    { id: 'users', name: 'User Management', icon: UserGroupIcon },
    { id: 'security', name: 'Security & Privacy', icon: ShieldCheckIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'integrations', name: 'Integrations', icon: GlobeAltIcon },
  ];

  const [generalSettings, setGeneralSettings] = useState({
    institutionName: 'Caribbean Academy of Performing Arts & Sciences',
    institutionCode: 'CAPAS',
    timezone: 'America/Nassau',
    language: 'English',
    currency: 'BSD',
    academicYear: '2024-2025',
    semesterSystem: 'traditional',
    weatherAlerts: true,
    hurricaneProtocols: true,
    culturalEvents: true
  });

  const [academicSettings, setAcademicSettings] = useState({
    gradeScale: '4.0',
    passingGrade: 'D',
    attendancePolicy: 'required',
    maxCredits: 18,
    minCredits: 12,
    withdrawalDeadline: '60%',
    incompletePolicy: '30 days',
    graduationRequirements: 120,
    honorsRequirement: 3.5
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordComplexity: 'medium',
    sessionTimeout: 120,
    twoFactorAuth: false,
    loginAttempts: 5,
    dataRetention: '7 years',
    auditLogging: true,
    ipRestriction: false,
    ssoEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weatherAlerts: true,
    emergencyAlerts: true,
    gradeNotifications: true,
    attendanceAlerts: true,
    deadlineReminders: true,
    systemMaintenance: true
  });

  const handleSaveSettings = () => {
    // In a real application, this would save to backend
    setHasChanges(false);
    // Show success toast
  };

  const handleDiscardChanges = () => {
    // Reset all settings to original values
    setHasChanges(false);
    // Show discard confirmation
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            System Settings
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Configure institutional settings and system preferences
          </p>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDiscardChanges}
              className="btn-capas-secondary flex items-center gap-2"
            >
              <XMarkIcon className="h-4 w-4" />
              Discard Changes
            </button>
            <button 
              onClick={handleSaveSettings}
              className="btn-capas-primary flex items-center gap-2"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Settings Navigation */}
      <div className="card-capas">
        <div className="border-b border-capas-ocean-light/20">
          <nav className="flex space-x-8 px-6">
            {settingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-capas-turquoise text-capas-turquoise'
                    : 'border-transparent text-capas-ocean-dark/70 hover:text-capas-ocean-dark hover:border-capas-ocean-light'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Institution Information</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      value={generalSettings.institutionName}
                      onChange={(e) => {
                        setGeneralSettings({...generalSettings, institutionName: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Institution Code
                    </label>
                    <input
                      type="text"
                      value={generalSettings.institutionCode}
                      onChange={(e) => {
                        setGeneralSettings({...generalSettings, institutionCode: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Time Zone
                    </label>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => {
                        setGeneralSettings({...generalSettings, timezone: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    >
                      <option value="America/Nassau">Nassau (EST/EDT)</option>
                      <option value="America/New_York">New York (EST/EDT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Default Language
                    </label>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => {
                        setGeneralSettings({...generalSettings, language: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Bahamian Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Weather Alerts</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Enable hurricane and storm notifications</p>
                    </div>
                    <button
                      onClick={() => {
                        setGeneralSettings({...generalSettings, weatherAlerts: !generalSettings.weatherAlerts});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.weatherAlerts ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.weatherAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Hurricane Protocols</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Automatic class cancellation and safety procedures</p>
                    </div>
                    <button
                      onClick={() => {
                        setGeneralSettings({...generalSettings, hurricaneProtocols: !generalSettings.hurricaneProtocols});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.hurricaneProtocols ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.hurricaneProtocols ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Cultural Events Integration</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Include Junkanoo, Independence Day, and other Bahamian holidays</p>
                    </div>
                    <button
                      onClick={() => {
                        setGeneralSettings({...generalSettings, culturalEvents: !generalSettings.culturalEvents});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        generalSettings.culturalEvents ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          generalSettings.culturalEvents ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Academic Settings */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Grading System</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Grade Scale
                    </label>
                    <select
                      value={academicSettings.gradeScale}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, gradeScale: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    >
                      <option value="4.0">4.0 Scale</option>
                      <option value="100">100 Point Scale</option>
                      <option value="letter">Letter Grades Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Minimum Passing Grade
                    </label>
                    <select
                      value={academicSettings.passingGrade}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, passingGrade: e.target.value});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    >
                      <option value="D">D (60%)</option>
                      <option value="C">C (70%)</option>
                      <option value="C+">C+ (75%)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Credit Hours</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Maximum Credits per Semester
                    </label>
                    <input
                      type="number"
                      value={academicSettings.maxCredits}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, maxCredits: parseInt(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Minimum Credits per Semester
                    </label>
                    <input
                      type="number"
                      value={academicSettings.minCredits}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, minCredits: parseInt(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Graduation Requirements</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Total Credits Required
                    </label>
                    <input
                      type="number"
                      value={academicSettings.graduationRequirements}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, graduationRequirements: parseInt(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Honors GPA Requirement
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={academicSettings.honorsRequirement}
                      onChange={(e) => {
                        setAcademicSettings({...academicSettings, honorsRequirement: parseFloat(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Authentication</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Two-Factor Authentication</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Require 2FA for all administrative accounts</p>
                    </div>
                    <button
                      onClick={() => {
                        setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.twoFactorAuth ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Audit Logging</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Log all administrative actions</p>
                    </div>
                    <button
                      onClick={() => {
                        setSecuritySettings({...securitySettings, auditLogging: !securitySettings.auditLogging});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        securitySettings.auditLogging ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Session Management</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => {
                        setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-capas-ocean-dark mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      value={securitySettings.loginAttempts}
                      onChange={(e) => {
                        setSecuritySettings({...securitySettings, loginAttempts: parseInt(e.target.value)});
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">System Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Email Notifications</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Send notifications via email</p>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.emailNotifications ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Weather Alerts</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Hurricane and severe weather notifications</p>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationSettings({...notificationSettings, weatherAlerts: !notificationSettings.weatherAlerts});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.weatherAlerts ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.weatherAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-capas-ocean-dark">Emergency Alerts</h4>
                      <p className="text-sm text-capas-ocean-dark/70">Critical campus and safety notifications</p>
                    </div>
                    <button
                      onClick={() => {
                        setNotificationSettings({...notificationSettings, emergencyAlerts: !notificationSettings.emergencyAlerts});
                        setHasChanges(true);
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notificationSettings.emergencyAlerts ? 'bg-capas-turquoise' : 'bg-capas-ocean-light'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notificationSettings.emergencyAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Banner */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-capas-turquoise text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">You have unsaved changes</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDiscardChanges}
              className="text-white/80 hover:text-white px-3 py-1 rounded text-sm"
            >
              Discard
            </button>
            <button 
              onClick={handleSaveSettings}
              className="bg-white text-capas-turquoise px-3 py-1 rounded text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}