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
    <nav className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 text-white pt-8 overflow-y-auto" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="px-6 mb-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-200 font-sans"
          />
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-gray-400 transition-colors duration-200 peer-focus:text-yellow-400" />
        </div>
      </div>
      
      <div className="space-y-2 px-4">
        <div className="px-4 py-3 text-xs text-gray-400 uppercase font-medium font-display tracking-wider">Main</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans text-sm ${
              activeModule === item.key ? 'bg-gray-800 border-r-2 border-yellow-400' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-4 transition-colors duration-200 ${activeModule === item.key ? 'text-yellow-400' : ''}`} />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-4 py-3 text-xs text-gray-400 uppercase font-medium mt-6 font-display tracking-wider">Reports</div>
        {reportItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans text-sm"
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans"
          >
            <item.icon className="w-5 h-5 mr-4" />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-4 py-3 text-xs text-gray-400 uppercase font-medium mt-6 font-display tracking-wider">Settings</div>
        {settingItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans text-sm"
          >
            <item.icon className="w-5 h-5 mr-4" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 w-full p-6 border-t border-gray-800">
        <div className="flex items-center justify-between hover:bg-gray-800 p-3 rounded-lg transition-colors duration-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-yellow-400 flex items-center justify-center text-gray-900 animate-pulse">
              <Crown className="w-4 h-4" />
            </div>
            <div className="ml-3">
              <div className="text-xs text-gray-400 font-display">Pro Plan</div>
              <div className="text-sm font-sans font-medium">14 days left</div>
            </div>
          </div>
          <button className="text-sm text-yellow-400 hover:underline hover:scale-105 transition-all duration-200 font-sans font-medium">Upgrade</button>
        </div>
      </div>
    </nav>
  );
}