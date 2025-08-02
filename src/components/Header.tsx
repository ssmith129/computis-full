import React from 'react';
import { Coins, FileText, User, ChevronDown } from 'lucide-react';
import { NotificationBell } from './NotificationSystem';
import { useNotifications } from './NotificationSystem';

export default function Header() {
  const { addNotification } = useNotifications();

  const handleExport = () => {
    addNotification({
      type: 'info',
      title: 'Export Started',
      message: 'Your transaction export is being prepared...',
      duration: 3000
    });
    
    // Simulate export completion
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Export Complete',
        message: 'Your transaction export is ready for download.',
        action: {
          label: 'Download',
          onClick: () => console.log('Download export')
        }
      });
    }, 3000);
  };

  return (
    <header className="text-white h-20 flex items-center justify-between px-10 fixed w-full z-50 top-0" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="flex items-center space-x-2">
        <img 
          src="/computis_v2_1.png" 
          alt="Computis Logo" 
          className="h-12 w-auto"
        />
      </div>
      <div className="flex items-center space-x-8">
        <button 
          className="flex items-center justify-center text-gray-900 bg-yellow-400 hover:bg-yellow-300 hover:scale-105 px-6 h-10 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md font-sans text-sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          Export
        </button>
        <div className="flex items-center h-10">
          <NotificationBell />
        </div>
        <div className="flex items-center justify-center space-x-3 hover:bg-gray-800 px-4 rounded-lg transition-colors duration-200 cursor-pointer h-10">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans text-sm">John Smith</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
        </div>
      </div>
    </header>
  );
}