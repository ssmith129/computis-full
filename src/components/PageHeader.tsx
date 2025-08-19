import React from 'react';
import { Filter, Upload, Plus, History } from 'lucide-react';

interface PageHeaderProps {
  onAuditTrailToggle: () => void;
}

export default function PageHeader({ onAuditTrailToggle }: PageHeaderProps) {
  return (
    <div className="container-padding section-spacing border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center" style={{ margin: '0 0 20px 20px' }}>
        <div>
          <h2 className="text-lg font-bold text-gray-900 font-display">AI-Enhanced Crypto Transaction Management</h2>
          <p className="text-gray-600 margin-micro font-sans text-xs">Review and manage AI-classified transactions</p>
        </div>
        <div className="flex gap-sm">
          <button className="flex items-center btn-spacing-md bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150 font-sans text-xs">
            <Filter className="w-3 h-3 icon-spacing-sm" />
            <span>Filters</span>
          </button>
          <button className="flex items-center btn-spacing-md bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150 font-sans text-xs">
            <Plus className="w-3 h-3 icon-spacing-sm" />
            <span>Bulk Tag</span>
          </button>
          <button className="flex items-center btn-spacing-md bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-102 transition-all duration-150 font-sans font-semibold text-xs">
            <Upload className="w-3 h-3 icon-spacing-sm" />
            <span>AI Classify</span>
          </button>
        </div>
      </div>
      
      <div className="flex gap-md margin-element">
        <div className="flex items-center gap-micro">
          <span className="text-xs font-medium font-display">Confidence:</span>
          <button className="btn-spacing-sm text-xs bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">All</button>
          <button className="btn-spacing-sm text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">High</button>
          <button className="btn-spacing-sm text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Medium</button>
          <button className="btn-spacing-sm text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Low</button>
        </div>
        <div className="flex items-center gap-micro">
          <span className="text-xs font-medium font-display">Status:</span>
          <button className="btn-spacing-sm text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Confirmed</button>
          <button className="btn-spacing-sm text-xs hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Suggested</button>
          <button className="btn-spacing-sm text-xs bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-sans font-semibold">Flagged</button>
        </div>
        <div className="flex items-center gap-sm ml-auto">
          <button 
            onClick={onAuditTrailToggle}
            className="text-xs text-blue-600 hover:underline flex items-center hover:scale-102 transition-all duration-150 font-sans font-semibold"
          >
            <History className="w-3 h-3 icon-spacing-sm" />
            <span>View Audit Trail</span>
          </button>
        </div>
      </div>
    </div>
  );
}
