import React from 'react';
import { 
  Search, 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  Users, 
  FileText, 
  TrendingUp, 
  FileSpreadsheet,
  Settings,
  Sliders,
  GitBranch,
  Crown
} from 'lucide-react';
import InteractiveButton from './InteractiveButton';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

export default function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
    { icon: ArrowLeftRight, label: 'Transactions', key: 'transactions' },
    { icon: Wallet, label: 'Wallets', key: 'wallets' },
    { icon: Users, label: 'Clients', key: 'clients' },
  ];
  const reportItems = [
    { icon: FileText, label: 'Reports', key: 'reports' },
    { icon: TrendingUp, label: 'Analytics', key: 'analytics' },
    { icon: FileSpreadsheet, label: 'Exports', key: 'exports' },
  ];

  const settingItems = [
    { icon: Sliders, label: 'Preferences', key: 'preferences' },
    { icon: GitBranch, label: 'Rule Engine', key: 'rules' },
    { icon: Crown, label: 'Account', key: 'account' },
  ];

  const handleNavigation = (moduleKey: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    onModuleChange(moduleKey);
  };

  const handleKeyboardNavigation = (moduleKey: string, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onModuleChange(moduleKey);
    }
  };
  return (
    <nav 
      className="fixed left-0 top-16 h-full w-64 bg-gray-900 text-white z-40 overflow-y-auto flex flex-col"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="px-3 mb-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-200 font-sans"
            aria-label="Search navigation items"
          />
          <Search className="w-3 h-3 absolute left-2 top-2.5 text-gray-400 transition-colors duration-150" />
        </div>
      </div>
      
      <div className="space-y-1 px-2">
        <div 
          className="px-2 py-1 text-xs text-gray-400 uppercase font-medium font-display tracking-wide"
          role="heading"
          aria-level={2}
        >
          Main
        </div>
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.key}`}
            onClick={(e) => handleNavigation(item.key, e)}
            onKeyDown={(e) => handleKeyboardNavigation(item.key, e)}
            className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 font-sans text-xs group relative focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset ${
              activeModule === item.key 
                ? 'bg-gray-800 text-yellow-400 border-r-2 border-yellow-400 shadow-lg' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            role="menuitem"
            aria-current={activeModule === item.key ? 'page' : undefined}
            tabIndex={0}
          >
            <item.icon className={`w-5 h-5 mr-2 transition-all duration-150 ${
              activeModule === item.key ? 'text-yellow-400' : 'group-hover:text-yellow-400 group-focus:text-yellow-400'
            }`} />
            <span className="font-medium">{item.label}</span>
            {activeModule === item.key && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l" />
            )}
          </a>
        ))}
        
        <div 
          className="px-2 py-1 text-xs text-gray-400 uppercase font-medium mt-3 font-display tracking-wide"
          role="heading"
          aria-level={2}
        >
          Reports
        </div>
        {reportItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.key}`}
            onClick={(e) => handleNavigation(item.key, e)}
            onKeyDown={(e) => handleKeyboardNavigation(item.key, e)}
            className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 font-sans text-xs group relative focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset ${
              activeModule === item.key 
                ? 'bg-gray-800 text-yellow-400 border-r-2 border-yellow-400 shadow-lg' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            role="menuitem"
            aria-current={activeModule === item.key ? 'page' : undefined}
            tabIndex={0}
          >
            <item.icon className={`w-5 h-5 mr-2 transition-all duration-150 ${
              activeModule === item.key ? 'text-yellow-400' : 'group-hover:text-yellow-400 group-focus:text-yellow-400'
            }`} />
            <span className="font-medium">{item.label}</span>
            {activeModule === item.key && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l" />
            )}
          </a>
        ))}
        
        <div 
          className="px-2 py-1 text-xs text-gray-400 uppercase font-medium mt-3 font-display tracking-wide"
          role="heading"
          aria-level={2}
        >
          Settings
        </div>
        {settingItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.key}`}
            onClick={(e) => handleNavigation(item.key, e)}
            onKeyDown={(e) => handleKeyboardNavigation(item.key, e)}
            className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 font-sans text-xs group relative focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-inset ${
              activeModule === item.key 
                ? 'bg-gray-800 text-yellow-400 border-r-2 border-yellow-400 shadow-lg' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
            role="menuitem"
            aria-current={activeModule === item.key ? 'page' : undefined}
            tabIndex={0}
          >
            <item.icon className={`w-5 h-5 mr-2 transition-all duration-150 ${
              activeModule === item.key ? 'text-yellow-400' : 'group-hover:text-yellow-400 group-focus:text-yellow-400'
            }`} />
            <span className="font-medium">{item.label}</span>
            {activeModule === item.key && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-l" />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}