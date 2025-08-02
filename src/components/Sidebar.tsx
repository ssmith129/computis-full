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
    <nav className="fixed left-0 top-24 h-[calc(100vh-6rem)] w-80 text-white pt-10 overflow-y-auto" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="px-8 mb-10">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-xl py-4 pl-12 pr-6 text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-300 font-sans hover:scale-105"
          />
          <Search className="w-5 h-5 absolute left-4 top-4 text-gray-400 transition-colors duration-200 peer-focus:text-yellow-400" />
        </div>
      </div>
      
      <div className="space-y-3 px-6">
        <div className="px-6 py-4 text-sm text-gray-400 uppercase font-medium font-display tracking-wider">Main</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className={`flex items-center py-4 px-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:translate-x-2 hover:scale-105 font-sans text-base group ${
              activeModule === item.key ? 'bg-gray-800 border-r-4 border-yellow-400 shadow-lg' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-6 h-6 mr-5 transition-all duration-200 group-hover:scale-110 ${activeModule === item.key ? 'text-yellow-400 animate-pulse' : 'group-hover:text-yellow-400'}`} />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-6 py-4 text-sm text-gray-400 uppercase font-medium mt-8 font-display tracking-wider">Reports</div>
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
            className="flex items-center py-4 px-6 rounded-xl hover:bg-gray-800 cursor-pointer transition-all duration-300 transform hover:translate-x-2 hover:scale-105 font-sans text-base group"
          >
            <item.icon className="w-6 h-6 mr-5 transition-all duration-200 group-hover:scale-110 group-hover:text-yellow-400" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 w-full p-8 border-t border-gray-800">
        <div className="flex items-center justify-between hover:bg-gray-800 p-4 rounded-xl transition-all duration-300 hover:scale-105 group">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-xl bg-yellow-400 flex items-center justify-center text-gray-900 animate-pulse-glow group-hover:scale-110 transition-transform duration-200">
              <Crown className="w-5 h-5" />
            </div>
            <div className="ml-4">
              <div className="text-sm text-gray-400 font-display">Pro Plan</div>
              <div className="text-base font-sans font-medium">14 days left</div>
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