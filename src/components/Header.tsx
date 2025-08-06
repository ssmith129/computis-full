import React from 'react';
import { Coins, FileText, User, ChevronDown } from 'lucide-react';
import { NotificationBell } from './NotificationSystem';
import { useNotifications } from './NotificationSystem';
import InteractiveButton from './InteractiveButton';

interface HeaderProps {
  onWorkflowOpen?: (workflow: string) => void;
}

export default function Header({ onWorkflowOpen }: HeaderProps) {
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
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white border-b border-gray-800 h-16 z-50 flex items-center justify-between px-6">
      <div className="flex items-center space-x-2">
        <h1 className="sr-only">Computis - Professional Crypto Tax Management Platform</h1>
        <img 
          src="/computis_v2_1.png" 
          alt="Computis Logo" 
          className="h-6 w-auto hover:scale-102 transition-transform duration-200"
        />
      </div>
      <div className="flex items-center space-x-3">
        <InteractiveButton 
          variant="primary" 
          size="sm" 
          icon={FileText}
          className="text-xs"
          onClick={handleExport}
        >
          Export
        </InteractiveButton>
        <InteractiveButton 
          variant="success" 
          size="sm"
          alwaysActive={true}
          className="text-xs"
          onClick={() => onWorkflowOpen?.('import-transactions')}
          tooltip="Start import workflow - always available"
        >
          Review & Import
        </InteractiveButton>
        <div className="flex items-center h-6">
          <NotificationBell />
        </div>
        <div className="flex items-center justify-center space-x-1 hover:bg-gray-800 px-2 py-1 rounded-md transition-all duration-200 cursor-pointer group">
          <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="font-sans font-semibold text-xs">John Smith</span>
          <ChevronDown className="w-3 h-3 transition-transform duration-150 group-hover:rotate-180" />
        </div>
      </div>
    </header>
  );
}