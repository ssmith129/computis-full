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
    <nav className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 text-white pt-6 overflow-y-auto" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="px-4 mb-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-gray-800 text-white rounded-md py-2 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-gray-700 transition-all duration-200 font-sans"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400 transition-colors duration-200 peer-focus:text-yellow-400" />
        </div>
      </div>
      
      <div className="space-y-1 px-2">
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium font-sans">Main</div>
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className={`flex items-center py-2 px-4 rounded-md cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans ${
              activeModule === item.key ? 'bg-gray-800 border-r-2 border-yellow-400' : 'hover:bg-gray-800'
            }`}
          >
            <item.icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${activeModule === item.key ? 'text-yellow-400' : ''}`} />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium mt-4 font-sans">Reports</div>
        {reportItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </div>
        ))}
        
        <div className="px-4 py-2 text-xs text-gray-400 uppercase font-medium mt-4 font-sans">Settings</div>
        {settingItems.map((item) => (
          <div
            key={item.label}
            onClick={() => onModuleChange(item.key)}
            className="flex items-center py-2 px-4 rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-200 transform hover:translate-x-1 font-sans"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <div className="flex items-center justify-between hover:bg-gray-800 p-2 rounded-md transition-colors duration-200">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-yellow-400 flex items-center justify-center text-gray-900 animate-pulse">
              <Crown className="w-4 h-4" />
            </div>
            <div className="ml-2">
              <div className="text-xs text-gray-400 font-sans">Pro Plan</div>
              <div className="text-sm font-sans">14 days left</div>
            </div>
          </div>
          <button className="text-xs text-yellow-400 hover:underline hover:scale-105 transition-all duration-200 font-sans">Upgrade</button>
        </div>
      </div>
    </nav>
  );
}