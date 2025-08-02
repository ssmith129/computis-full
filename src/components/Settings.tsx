import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Bell, Globe, Palette, Database, Key } from 'lucide-react';
import FormSection from './FormSection';
import Badge from './Badge';

export default function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Computis Tax Solutions',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'English',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    anomalyAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    
    // Display Settings
    theme: 'light',
    compactMode: false,
    showTooltips: true,
    animationsEnabled: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save settings logic
    console.log('Saving settings:', settings);
  };

  const handleReset = () => {
    // Reset to defaults
    console.log('Resetting to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">General Settings</h1>
          <p className="text-gray-600 mt-1 font-sans">Configure your application preferences and account settings</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <FormSection 
          title="General Settings" 
          description="Basic application configuration"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => handleSettingChange('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date Format</label>
              <select
                value={settings.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (C$)</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Notification Settings */}
        <FormSection 
          title="Notifications" 
          description="Configure how you receive updates"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Email Notifications</label>
                <p className="text-xs text-gray-600 font-sans">Receive updates via email</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.emailNotifications ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.emailNotifications ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Push Notifications</label>
                <p className="text-xs text-gray-600 font-sans">Browser notifications</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.pushNotifications}
                  onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.pushNotifications ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.pushNotifications ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Weekly Reports</label>
                <p className="text-xs text-gray-600 font-sans">Summary emails every Monday</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.weeklyReports}
                  onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.weeklyReports ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('weeklyReports', !settings.weeklyReports)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.weeklyReports ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Anomaly Alerts</label>
                <p className="text-xs text-gray-600 font-sans">Immediate alerts for unusual activity</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.anomalyAlerts}
                  onChange={(e) => handleSettingChange('anomalyAlerts', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.anomalyAlerts ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('anomalyAlerts', !settings.anomalyAlerts)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.anomalyAlerts ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Security Settings */}
        <FormSection 
          title="Security" 
          description="Account security and access control"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Two-Factor Authentication</label>
                <p className="text-xs text-gray-600 font-sans">Add extra security to your account</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={settings.twoFactorAuth ? 'success' : 'warning'}>
                  {settings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                </Badge>
                <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">
                  Configure
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Session Timeout (minutes)</label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="0">Never</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Password Expiry (days)</label>
              <select
                value={settings.passwordExpiry}
                onChange={(e) => handleSettingChange('passwordExpiry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
                <option value="180">180 days</option>
                <option value="0">Never</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Display Settings */}
        <FormSection 
          title="Display & Interface" 
          description="Customize your user experience"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Theme</label>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleSettingChange('theme', 'light')}
                  className={`flex items-center px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 font-sans ${
                    settings.theme === 'light' 
                      ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Light
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'dark')}
                  className={`flex items-center px-3 py-2 rounded-md border transition-all duration-200 hover:scale-105 font-sans ${
                    settings.theme === 'dark' 
                      ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  Dark
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Compact Mode</label>
                <p className="text-xs text-gray-600 font-sans">Reduce spacing for more content</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.compactMode}
                  onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.compactMode ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('compactMode', !settings.compactMode)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.compactMode ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Show Tooltips</label>
                <p className="text-xs text-gray-600 font-sans">Display helpful hints on hover</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.showTooltips}
                  onChange={(e) => handleSettingChange('showTooltips', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.showTooltips ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('showTooltips', !settings.showTooltips)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.showTooltips ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 font-sans">Enable Animations</label>
                <p className="text-xs text-gray-600 font-sans">Smooth transitions and effects</p>
              </div>
              <div className="relative inline-block w-10 h-6">
                <input 
                  type="checkbox" 
                  checked={settings.animationsEnabled}
                  onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`absolute inset-0 rounded-full transition-colors cursor-pointer hover:scale-105 transition-all duration-200 ${
                    settings.animationsEnabled ? 'bg-yellow-400' : 'bg-gray-300'
                  }`}
                  onClick={() => handleSettingChange('animationsEnabled', !settings.animationsEnabled)}
                >
                  <div className={`absolute h-5 w-5 bg-white rounded-full transition-transform duration-200 top-0.5 ${
                    settings.animationsEnabled ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </div>
  );
}