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
    <header className="text-white h-16 flex items-center justify-between px-8 fixed w-full z-50 top-0" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="flex items-center space-x-2">
        <img 
          src="/computis_v2_1.png" 
          alt="Computis Logo" 
          className="h-10 w-auto"
        />
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-gray-900 bg-yellow-400 hover:bg-yellow-300 hover:scale-105 px-4 py-2 rounded-md font-medium flex items-center transition-all duration-200 shadow-sm hover:shadow-md font-sans">
          onClick={handleExport}
          <FileText className="w-4 h-4 mr-2" />
          Export
        </button>
        <NotificationBell />
        <div className="flex items-center space-x-2 hover:bg-gray-800 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans">John Smith</span>
          <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
        </div>
      </div>
    </header>
  );
}