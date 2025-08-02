import React, { useState } from 'react';
import { Save, Key, Shield, CreditCard, User, Mail, Phone, MapPin, Building } from 'lucide-react';
import FormSection from './FormSection';
import Badge from './Badge';

export default function AccountSettings() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    company: 'Smith Tax Services',
    title: 'Senior Tax Advisor',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States'
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    backupCodes: ['ABC123', 'DEF456', 'GHI789'],
    lastLogin: '2023-12-15 10:30 AM',
    activeSessions: 3
  });

  const [billing, setBilling] = useState({
    plan: 'Professional',
    billingCycle: 'monthly',
    nextBilling: '2024-01-15',
    paymentMethod: '**** **** **** 1234',
    billingEmail: 'billing@smithtax.com'
  });

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving account settings');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Account Settings</h1>
          <p className="text-gray-600 mt-1 font-sans">Manage your profile, security, and billing information</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <FormSection 
          title="Profile Information" 
          description="Update your personal and professional details"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleProfileChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleProfileChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Company</label>
              <input
                type="text"
                value={profile.company}
                onChange={(e) => handleProfileChange('company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Job Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => handleProfileChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
          </div>
        </FormSection>

        {/* Address Information */}
        <FormSection 
          title="Address Information" 
          description="Your business or billing address"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Street Address</label>
            <input
              type="text"
              value={profile.address}
              onChange={(e) => handleProfileChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => handleProfileChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">State/Province</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => handleProfileChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">ZIP/Postal Code</label>
              <input
                type="text"
                value={profile.zipCode}
                onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Country</label>
              <select
                value={profile.country}
                onChange={(e) => handleProfileChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
        </FormSection>

        {/* Security Settings */}
        <FormSection 
          title="Security & Authentication" 
          description="Manage your account security"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Current Password</label>
            <input
              type="password"
              value={security.currentPassword}
              onChange={(e) => setSecurity(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
              placeholder="Enter current password"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">New Password</label>
              <input
                type="password"
                value={security.newPassword}
                onChange={(e) => setSecurity(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Confirm Password</label>
              <input
                type="password"
                value={security.confirmPassword}
                onChange={(e) => setSecurity(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium text-gray-700 font-sans">Two-Factor Authentication</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 font-sans">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={security.twoFactorEnabled ? 'success' : 'warning'}>
                {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
              <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">
                {security.twoFactorEnabled ? 'Manage' : 'Enable'}
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600 font-sans">
            <div className="flex justify-between">
              <span>Last login:</span>
              <span>{security.lastLogin}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Active sessions:</span>
              <span>{security.activeSessions}</span>
            </div>
          </div>
        </FormSection>

        {/* Billing Information */}
        <FormSection 
          title="Billing & Subscription" 
          description="Manage your subscription and payment details"
        >
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-md">
            <div>
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-yellow-600 mr-2" />
                <span className="text-sm font-medium text-gray-700 font-sans">Current Plan</span>
              </div>
              <p className="text-lg font-semibold text-gray-900 mt-1 font-sans">{billing.plan}</p>
            </div>
            <button className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-105 transition-all duration-200 font-sans">
              Upgrade Plan
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Billing Cycle</label>
            <select
              value={billing.billingCycle}
              onChange={(e) => setBilling(prev => ({ ...prev, billingCycle: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly (Save 20%)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Payment Method</label>
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                <span className="text-sm font-sans">{billing.paymentMethod}</span>
              </div>
              <button className="text-sm text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">
                Update
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Billing Email</label>
            <input
              type="email"
              value={billing.billingEmail}
              onChange={(e) => setBilling(prev => ({ ...prev, billingEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:border-gray-400 transition-colors duration-200 font-sans"
            />
          </div>

          <div className="text-sm text-gray-600 font-sans">
            <div className="flex justify-between">
              <span>Next billing date:</span>
              <span>{billing.nextBilling}</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
              View Billing History
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-105 transition-all duration-200 font-sans">
              Download Invoice
            </button>
          </div>
        </FormSection>
      </div>
    </div>
  );
}