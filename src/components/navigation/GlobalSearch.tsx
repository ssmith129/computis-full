import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, ArrowUpRight, User, CreditCard, FileText, Wallet } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'transaction' | 'client' | 'wallet' | 'report';
  url: string;
  metadata?: {
    amount?: string;
    date?: string;
    status?: string;
  };
}

interface GlobalSearchProps {
  onResultSelect?: (result: SearchResult) => void;
  onClose?: () => void;
  isOpen?: boolean;
  placeholder?: string;
}

// Mock search data - in real app this would come from API
const mockSearchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Bitcoin Purchase - Coinbase',
    description: 'Transaction from Coinbase Pro',
    type: 'transaction',
    url: '/transactions/tx123',
    metadata: { amount: '$5,247.82', date: '2024-01-15', status: 'Confirmed' }
  },
  {
    id: '2',
    title: 'John Smith',
    description: 'Active client since 2023',
    type: 'client',
    url: '/clients/john-smith',
    metadata: { status: 'Active' }
  },
  {
    id: '3',
    title: 'Q4 2024 Tax Report',
    description: 'Quarterly tax report for review',
    type: 'report',
    url: '/reports/q4-2024',
    metadata: { date: '2024-12-31', status: 'Draft' }
  },
  {
    id: '4',
    title: 'Personal Bitcoin Wallet',
    description: 'Main Bitcoin storage wallet',
    type: 'wallet',
    url: '/wallets/btc-main',
    metadata: { amount: '2.5 BTC' }
  }
];

const recentSearches = [
  'Bitcoin transactions',
  'John Smith client',
  'Q3 tax report',
  'Ethereum wallet'
];

export default function GlobalSearch({ 
  onResultSelect, 
  onClose, 
  isOpen = false,
  placeholder = "Search transactions, clients, reports..."
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when search opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle search query changes
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockSearchResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onClose?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultSelect(results[selectedIndex]);
        }
        break;
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect?.(result);
    setQuery('');
    setResults([]);
    onClose?.();
  };

  const getResultIcon = (type: SearchResult['type']) => {
    const iconClass = "w-4 h-4 text-neutral-500";
    switch (type) {
      case 'transaction':
        return <CreditCard className={iconClass} />;
      case 'client':
        return <User className={iconClass} />;
      case 'wallet':
        return <Wallet className={iconClass} />;
      case 'report':
        return <FileText className={iconClass} />;
      default:
        return <Search className={iconClass} />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'active':
        return 'text-success-600 bg-success-50';
      case 'pending':
      case 'draft':
        return 'text-warning-600 bg-warning-50';
      case 'failed':
      case 'inactive':
        return 'text-error-600 bg-error-50';
      default:
        return 'text-neutral-600 bg-neutral-50';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="flex items-start justify-center pt-16 px-4">
        <div 
          className="w-full max-w-2xl bg-white rounded-lg shadow-xl border border-neutral-200"
          onClick={e => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center px-4 py-3 border-b border-neutral-200">
            <Search className="w-5 h-5 text-neutral-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-body placeholder:text-neutral-500 bg-transparent outline-none"
              aria-label="Search input"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-neutral-500 bg-neutral-100 rounded border">
              ESC
            </kbd>
          </div>

          {/* Search Results */}
          <div ref={resultsRef} className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-8 text-center">
                <div className="inline-flex items-center text-neutral-500">
                  <Search className="w-4 h-4 mr-2 animate-pulse" />
                  <span className="text-secondary">Searching...</span>
                </div>
              </div>
            ) : query.length > 0 && results.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <div className="text-neutral-500">
                  <Search className="w-8 h-8 mx-auto mb-2 text-neutral-300" />
                  <p className="text-secondary">No results found for "{query}"</p>
                  <p className="text-small text-neutral-400 mt-1">
                    Try searching for transactions, clients, or reports
                  </p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full px-4 py-3 text-left hover:bg-neutral-50 transition-colors duration-150 ${
                      selectedIndex === index ? 'bg-primary-50 border-r-2 border-primary-500' : ''
                    }`}
                    aria-label={`Select ${result.title}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-body font-medium text-neutral-900 truncate">
                            {result.title}
                          </h4>
                          <ArrowUpRight className="w-3 h-3 text-neutral-400 ml-2 flex-shrink-0" />
                        </div>
                        <p className="text-secondary text-neutral-600 truncate">
                          {result.description}
                        </p>
                        {result.metadata && (
                          <div className="flex items-center space-x-3 mt-2">
                            {result.metadata.amount && (
                              <span className="text-small font-medium text-neutral-700">
                                {result.metadata.amount}
                              </span>
                            )}
                            {result.metadata.date && (
                              <span className="text-small text-neutral-500">
                                {result.metadata.date}
                              </span>
                            )}
                            {result.metadata.status && (
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(result.metadata.status)}`}>
                                {result.metadata.status}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Recent Searches */
              <div className="py-4">
                <div className="px-4 mb-3">
                  <h3 className="text-small font-medium text-neutral-700 uppercase tracking-wide">
                    Recent Searches
                  </h3>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="w-full px-4 py-2 text-left hover:bg-neutral-50 transition-colors duration-150 flex items-center space-x-3"
                      aria-label={`Search for ${search}`}
                    >
                      <Clock className="w-4 h-4 text-neutral-400" />
                      <span className="text-body text-neutral-600">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {query.length === 0 && (
            <div className="px-4 py-3 border-t border-neutral-200 bg-neutral-50">
              <div className="text-small text-neutral-600">
                <strong>Tips:</strong> Search by transaction ID, client name, wallet address, or report type.
                Use <kbd className="px-1 py-0.5 bg-white border rounded text-xs">↑↓</kbd> to navigate and{' '}
                <kbd className="px-1 py-0.5 bg-white border rounded text-xs">Enter</kbd> to select.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook for managing global search state
export function useGlobalSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        openSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isSearchOpen,
    openSearch,
    closeSearch
  };
}
