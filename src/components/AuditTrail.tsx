import React from 'react';
import { X } from 'lucide-react';

interface AuditTrailProps {
  isOpen: boolean;
  onClose: () => void;
}

const auditEvents = [
  {
    id: 1,
    type: 'Rule Created',
    description: 'New rule created for Bitcoin receives classified as Income',
    user: 'John Smith',
    time: 'Today, 10:23 AM',
    color: 'bg-green-500'
  },
  {
    id: 2,
    type: 'AI Suggestion Applied',
    description: 'Applied AI classification suggestion to 8 Ethereum transactions',
    user: 'System',
    time: 'Today, 9:45 AM',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    type: 'FMV Updated',
    description: 'Updated Fair Market Value for 3 Bitcoin transactions',
    user: 'John Smith',
    time: 'Yesterday, 3:12 PM',
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    type: 'Transaction Flagged',
    description: 'System flagged transaction as potential duplicate',
    user: 'System',
    time: 'Yesterday, 11:30 AM',
    color: 'bg-red-500'
  },
  {
    id: 5,
    type: 'Data Imported',
    description: 'Imported 124 transactions from Exchange CSV',
    user: 'John Smith',
    time: 'Oct 24, 2023',
    color: 'bg-purple-500'
  }
];

export default function AuditTrail({ isOpen, onClose }: AuditTrailProps) {
  return (
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 font-sans">Audit Trail</h2>
          <button 
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 hover:scale-110 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1 font-sans">Track changes and actions performed on your data</p>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-900 font-sans">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm text-gray-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">Filter</button>
            <button className="text-sm text-gray-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">Export Log</button>
          </div>
        </div>
        
        <div className="space-y-6">
          {auditEvents.map((event, index) => (
            <div key={event.id} className={`relative pl-6 hover:bg-gray-50 p-2 rounded-md transition-colors duration-200 ${index !== auditEvents.length - 1 ? 'pb-6 border-l-2 border-gray-200' : ''}`}>
              <div className={`absolute left-[-8px] top-2 h-4 w-4 rounded-full ${event.color} hover:scale-110 transition-transform duration-200`}></div>
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-900 font-sans">{event.type}</span>
                <span className="text-xs text-gray-500 font-sans">{event.time}</span>
              </div>
              <p className="text-sm mt-1 text-gray-700 font-sans">{event.description}</p>
              <div className="mt-2 text-xs text-gray-500 font-sans">
                <span>By: {event.user}</span>
                <span className="mx-2">•</span>
                <button className="text-blue-600 hover:underline hover:scale-105 transition-all duration-200 font-sans">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}