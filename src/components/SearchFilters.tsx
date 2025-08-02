import React, { useState } from 'react';
import { Search, Filter, Calendar, X, ChevronDown } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: any) => void;
  onWorkflowOpen?: (workflow: string) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFiltersChange, onWorkflowOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    transactionType: '',
    asset: '',
    classification: '',
    status: '',
    confidenceLevel: '',
    amountMin: '',
    amountMax: '',
    tags: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      dateFrom: '',
      dateTo: '',
      transactionType: '',
      asset: '',
      classification: '',
      status: '',
      confidenceLevel: '',
      amountMin: '',
      amountMax: '',
      tags: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  const handleQuickFilter = (filterType: string) => {
    let newFilters = { ...filters };
    
    switch (filterType) {
      case 'high-confidence':
        newFilters.confidenceLevel = 'high';
        break;
      case 'needs-review':
        newFilters.status = 'flagged';
        break;
      case 'flagged':
        newFilters.status = 'flagged';
        break;
      case 'this-month':
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        newFilters.dateFrom = firstDay.toISOString().split('T')[0];
        newFilters.dateTo = now.toISOString().split('T')[0];
        break;
      case 'large-amounts':
        newFilters.amountMin = '10000';
        break;
    }
    
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Search Bar */}
      <div className="px-10 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, addresses, or transaction IDs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
            />
          </div>
          
          <button
            className={`flex items-center px-4 py-2 border rounded-lg transition-colors duration-200 font-sans ${
              isExpanded 
                ? 'bg-yellow-400 text-gray-900 border-yellow-400' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} />
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-sans"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="px-10 py-6 bg-gray-50 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                />
              </div>
            </div>

            {/* Transaction Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Transaction Type</label>
              <select
                value={filters.transactionType}
                onChange={(e) => handleFilterChange('transactionType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              >
                <option value="">All Types</option>
                <option value="receive">Receive</option>
                <option value="send">Send</option>
                <option value="swap">Swap</option>
                <option value="merge">Merge</option>
              </select>
            </div>

            {/* Asset */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Asset</label>
              <select
                value={filters.asset}
                onChange={(e) => handleFilterChange('asset', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              >
                <option value="">All Assets</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="USDC">USD Coin (USDC)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>

            {/* Classification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Classification</label>
              <select
                value={filters.classification}
                onChange={(e) => handleFilterChange('classification', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              >
                <option value="">All Classifications</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="trade">Trade</option>
                <option value="transfer">Transfer</option>
                <option value="gift">Gift</option>
                <option value="unclassified">Unclassified</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="suggested">Suggested</option>
                <option value="flagged">Flagged</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Confidence Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">AI Confidence</label>
              <select
                value={filters.confidenceLevel}
                onChange={(e) => handleFilterChange('confidenceLevel', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              >
                <option value="">All Levels</option>
                <option value="high">High (90%+)</option>
                <option value="medium">Medium (70-89%)</option>
                <option value="low">Low (&lt;70%)</option>
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Amount Range (USD)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.amountMin}
                  onChange={(e) => handleFilterChange('amountMin', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.amountMax}
                  onChange={(e) => handleFilterChange('amountMax', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tags</label>
              <input
                type="text"
                placeholder="Enter tags..."
                value={filters.tags}
                onChange={(e) => handleFilterChange('tags', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
              />
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 font-sans">Quick filters:</span>
            <button 
              onClick={() => handleQuickFilter('high-confidence')}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200 font-sans"
            >
              High Confidence
            </button>
            <button 
              onClick={() => handleQuickFilter('needs-review')}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm hover:bg-yellow-200 transition-colors duration-200 font-sans"
            >
              Needs Review
            </button>
            <button 
              onClick={() => handleQuickFilter('flagged')}
              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors duration-200 font-sans"
            >
              Flagged
            </button>
            <button 
              onClick={() => handleQuickFilter('this-month')}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors duration-200 font-sans"
            >
              This Month
            </button>
            <button 
              onClick={() => handleQuickFilter('large-amounts')}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors duration-200 font-sans"
            >
              Large Amounts
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;