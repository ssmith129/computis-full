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
    <nav className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 text-white pt-6 overflow-y-auto" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="px-6 mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-300 font-sans hover:scale-105"
          />
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400 transition-colors duration-200 peer-focus:text-yellow-400" />
        </div>
      </div>
      
      <div className="space-y-2 px-4">
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium font-display tracking-wider">Main</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:translate-x-1 hover:scale-105 font-sans text-sm group ${
              activeModule === item.key ? 'bg-gray-800 border-r-4 border-yellow-400 shadow-lg' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 transition-all duration-200 group-hover:scale-110 ${activeModule === item.key ? 'text-yellow-400 animate-pulse' : 'group-hover:text-yellow-400'}`} />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium mt-6 font-display tracking-wider">Reports</div>
        {reportItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center py-4 px-6 rounded-xl hover:bg-gray-800 cursor-pointer transition-all duration-300 transform hover:translate-x-2 hover:scale-105 font-sans text-base group"
            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans text-sm"
          >
            <item.icon className="w-6 h-6 mr-5 transition-all duration-200 group-hover:scale-110 group-hover:text-yellow-400" />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-6 py-4 text-sm text-gray-400 uppercase font-medium mt-8 font-display tracking-wider">Settings</div>
        {settingItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-300 transform hover:translate-x-1 hover:scale-105 font-sans text-sm group"
          >
            <item.icon className="w-5 h-5 mr-3 transition-all duration-200 group-hover:scale-110 group-hover:text-yellow-400" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium mt-6 font-display tracking-wider">Settings</div>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-lg transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-900 animate-pulse-glow group-hover:scale-110 transition-transform duration-200">
              <Crown className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <div className="text-xs text-gray-400 font-display">Pro Plan</div>
              <div className="text-sm font-sans font-medium">14 days left</div>
            </div>
          </div>
          <InteractiveButton variant="primary" size="sm">
            Upgrade
          </InteractiveButton>
        </div>
      </div>
    </nav>
  );
}