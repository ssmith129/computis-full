import React from 'react';
import { Filter, Upload, Plus, History } from 'lucide-react';

interface PageHeaderProps {
  onAuditTrailToggle: () => void;
}

export default function PageHeader({ onAuditTrailToggle }: PageHeaderProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-900 font-display">AI-Enhanced Crypto Transaction Management</h2>
          <p className="text-gray-600 mt-1 font-sans text-xs">Review and manage AI-classified transactions</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150 font-sans text-xs">
            <Filter className="w-3 h-3 mr-1" />
            <span>Filters</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150 font-sans text-xs">
            <Plus className="w-3 h-3 mr-1" />
            <span>Bulk Tag</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-102 transition-all duration-150 font-sans font-semibold text-xs">
            <Upload className="w-3 h-3 mr-1" />
            <span>AI Classify</span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3 mt-2">
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium font-display">Confidence:</span>
          <button className="px-2 py-1 text-xs bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">All</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">High</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Medium</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Low</button>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs font-medium font-display">Status:</span>
          <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Confirmed</button>
          <button className="px-2 py-1 text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Suggested</button>
          <button className="px-2 py-1 text-xs bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Flagged</button>
        </div>
        <div className="flex items-center space-x-2 ml-auto">
          <button 
            onClick={onAuditTrailToggle}
            className="text-xs text-blue-600 hover:underline flex items-center hover:scale-102 transition-all duration-150 font-sans font-semibold"
          >
            <History className="w-3 h-3 mr-1" />
            <span>View Audit Trail</span>
          </button>
        </div>
      </div>
    </div>
  );
}