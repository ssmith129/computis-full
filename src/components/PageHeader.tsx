import React from 'react';
import { Filter, Upload, Plus, History } from 'lucide-react';

interface PageHeaderProps {
  onAuditTrailToggle: () => void;
}

export default function PageHeader({ onAuditTrailToggle }: PageHeaderProps) {
  return (
    <div className="px-10 py-8 border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">AI-Enhanced Transactions</h1>
          <p className="text-gray-600 mt-2 font-sans text-base">Review and manage AI-classified crypto transactions</p>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans">
            <Filter className="w-4 h-4 mr-2" />
            <span>Filters</span>
          </button>
          <button className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200 font-sans">
            <Plus className="w-4 h-4 mr-2" />
            <span>Bulk Tag</span>
          </button>
          <button className="flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 hover:scale-105 hover:shadow-lg transition-all duration-200 font-sans font-medium">
            <Upload className="w-4 h-4 mr-2" />
            <span>AI Classify</span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-6 mt-8">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium font-display">Confidence:</span>
          <button className="px-4 py-2 text-sm bg-yellow-400 text-gray-900 rounded-lg hover:scale-105 transition-all duration-200 font-sans font-medium">All</button>
          <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg hover:scale-105 transition-all duration-200 font-sans">High</button>
          <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg hover:scale-105 transition-all duration-200 font-sans">Medium</button>
          <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg hover:scale-105 transition-all duration-200 font-sans">Low</button>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium font-display">Status:</span>
          <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg hover:scale-105 transition-all duration-200 font-sans">Confirmed</button>
          <button className="px-4 py-2 text-sm hover:bg-gray-100 rounded-lg hover:scale-105 transition-all duration-200 font-sans">Suggested</button>
          <button className="px-4 py-2 text-sm bg-yellow-400 text-gray-900 rounded-lg hover:scale-105 transition-all duration-200 font-sans font-medium">Flagged</button>
        </div>
        <div className="flex items-center space-x-3 ml-auto">
          <button 
            onClick={onAuditTrailToggle}
            className="text-sm text-blue-600 hover:underline flex items-center hover:scale-105 transition-all duration-200 font-sans font-medium"
          >
            <History className="w-4 h-4 mr-1" />
            <span>View Audit Trail</span>
          </button>
        </div>
      </div>
    </div>
  );
}