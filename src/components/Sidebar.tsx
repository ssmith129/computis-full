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
  { icon: Settings, label: 'General', key: 'settings' },
  { icon: Sliders, label: 'Preferences', key: 'preferences' },
  { icon: GitBranch, label: 'Rule Engine', key: 'rules' },
  { icon: Users, label: 'Account', key: 'account' },
];

  return (
    <nav className="fixed left-0 top-12 h-[calc(100vh-3rem)] w-48 text-white pt-3 overflow-y-auto" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="px-3 mb-3">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-200 font-sans"
          />
          <Search className="w-3 h-3 absolute left-2 top-2.5 text-gray-400 transition-colors duration-150" />
        </div>
      </div>
      
      <div className="space-y-1 px-2">
        <div className="px-2 py-1 text-xs text-gray-400 uppercase font-medium font-display tracking-wide">Main</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className={`flex items-center py-2 px-3 rounded-md cursor-pointer transition-all duration-200 font-sans text-xs group ${
              activeModule === item.key ? 'bg-gray-800 border-r-2 border-yellow-400' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-2 transition-all duration-150 ${activeModule === item.key ? 'text-yellow-400' : 'group-hover:text-yellow-400'}`} />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-2 py-1 text-xs text-gray-400 uppercase font-medium mt-3 font-display tracking-wide">Reports</div>
        {reportItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-150 font-sans text-xs"
          >
            <item.icon className="w-5 h-5 mr-2 transition-colors duration-150 group-hover:text-yellow-400" />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-6 py-4 text-sm text-gray-400 uppercase font-medium mt-8 font-display tracking-wider">Settings</div>
        {settingItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-150 font-sans text-xs group"
          >
            <item.icon className="w-5 h-5 mr-2 transition-colors duration-150 group-hover:text-yellow-400" />
            <span>{item.label}</span>
          </div>
        ))}
        <div className="px-2 py-1 text-xs text-gray-400 uppercase font-medium mt-3 font-display tracking-wide">Settings</div>
      </div>
      <div className="absolute bottom-0 w-full p-2 border-t border-gray-800">
        <div className="flex items-center justify-between hover:bg-gray-800 p-2 rounded-md transition-all duration-200 group">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-yellow-400 flex items-center justify-center text-gray-900 group-hover:scale-105 transition-transform duration-150">
              <Crown className="w-3 h-3" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-display">Pro</div>
              <div className="text-xs font-sans font-medium">14 days</div>
            </div>
          </div>
          <InteractiveButton variant="primary" size="sm" className="text-xs px-2 py-1">
            Upgrade
          </InteractiveButton>
        </div>
      </div>
    </nav>
  );
}