import React from 'react';
import { Coins, FileText, User, ChevronDown } from 'lucide-react';
import { NotificationBell } from './NotificationSystem';
import { useNotifications } from './NotificationSystem';
import InteractiveButton from './InteractiveButton';

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
    <header className="text-white h-24 flex items-center justify-between px-12 fixed w-full z-50 top-0" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="flex items-center space-x-2">
        <img 
          src="/computis_v2_1.png" 
          alt="Computis Logo" 
          className="h-16 w-auto hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex items-center space-x-10">
        <InteractiveButton 
          variant="primary" 
          size="md" 
          icon={FileText}
          tooltip="Export transaction data and reports"
        >
          Export
        </InteractiveButton>
        <InteractiveButton 
          variant="success" 
          size="md"
          tooltip="Import transaction data from exchanges and wallets"
        >
          Import Data
        </InteractiveButton>
        <div className="flex items-center h-12">
          <NotificationBell />
        </div>
        <div className="flex items-center justify-center space-x-4 hover:bg-gray-800 px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 group">
          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="font-sans text-base">John Smith</span>
          <ChevronDown className="w-5 h-5 transition-transform duration-200 group-hover:rotate-180" />
        </div>
      </div>
    </header>
  );
}