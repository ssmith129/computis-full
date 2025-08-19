import React from 'react';
import { Filter, Upload, Plus, History } from 'lucide-react';

interface PageHeaderProps {
  onAuditTrailToggle: () => void;
}

export default function PageHeader({ onAuditTrailToggle }: PageHeaderProps) {
  return (
    <div className="optimized-page-header">
      <div className="header-container">
        <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
          <div>
            {/* Semantic H1 with proper typography */}
            <h1 className="heading-2">AI-Enhanced Crypto Transaction Management</h1>
            <p className="text-secondary">Review and manage AI-classified transactions</p>
          </div>
          <div className="flex gap-sm">
            <button className="btn-typography-sm flex items-center bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150">
              <Filter className="w-3 h-3 icon-spacing-sm" />
              <span>Filters</span>
            </button>
            <button className="btn-typography-sm flex items-center bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:scale-102 transition-all duration-150">
              <Plus className="w-3 h-3 icon-spacing-sm" />
              <span>Bulk Tag</span>
            </button>
            <button className="btn-typography-md flex items-center bg-yellow-400 text-gray-900 rounded-md hover:bg-yellow-300 hover:scale-102 transition-all duration-150 font-semibold">
              <Upload className="w-3 h-3 icon-spacing-sm" />
              <span>AI Classify</span>
            </button>
          </div>
        </div>
        
        <div className="flex gap-md margin-element">
          <div className="flex items-center gap-micro">
            <span className="label-typography">Confidence:</span>
            <button className="btn-typography-sm bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-semibold">All</button>
            <button className="btn-typography-sm hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-semibold">High</button>
            <button className="btn-typography-sm hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-semibold">Medium</button>
            <button className="btn-typography-sm hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-semibold">Low</button>
          </div>
          <div className="flex items-center gap-micro">
            <span className="label-typography">Status:</span>
            <button className="btn-typography-sm hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-semibold">Confirmed</button>
            <button className="btn-typography-sm hover:bg-gray-100 rounded-md hover:scale-102 transition-all duration-150 font-semibold">Suggested</button>
            <button className="btn-typography-sm bg-yellow-400 text-gray-900 rounded-md hover:scale-102 transition-all duration-150 font-semibold">Flagged</button>
          </div>
          <div className="flex items-center gap-sm ml-auto">
            <button 
              onClick={onAuditTrailToggle}
              className="btn-typography-sm text-blue-600 hover:underline flex items-center hover:scale-102 transition-all duration-150 font-semibold"
            >
              <History className="w-3 h-3 icon-spacing-sm" />
              <span>View Audit Trail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
