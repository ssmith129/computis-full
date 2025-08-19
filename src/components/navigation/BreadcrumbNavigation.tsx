import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function BreadcrumbNavigation({ 
  items, 
  showHome = true, 
  className = '' 
}: BreadcrumbNavigationProps) {
  
  const handleClick = (item: BreadcrumbItem, event: React.MouseEvent) => {
    if (item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  };

  const handleKeyDown = (item: BreadcrumbItem, event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && item.onClick) {
      event.preventDefault();
      item.onClick();
    }
  };

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className={`flex items-center space-x-2 text-sm ${className}`}
      role="navigation"
    >
      {showHome && (
        <>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center text-neutral-500 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md p-1"
            aria-label="Navigate to home"
          >
            <Home className="w-4 h-4" />
          </button>
          {items.length > 0 && (
            <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
          )}
        </>
      )}
      
      <ol className="flex items-center space-x-2" role="list">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            )}
            
            {item.current ? (
              <span 
                className="text-neutral-900 font-medium text-body"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={(e) => handleClick(item, e)}
                onKeyDown={(e) => handleKeyDown(item, e)}
                className="text-neutral-500 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-md px-1 py-0.5 text-body"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Helper hook for managing breadcrumb state
export function useBreadcrumb() {
  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbItem[]>([]);

  const addBreadcrumb = (item: BreadcrumbItem) => {
    setBreadcrumbs(prev => [...prev, item]);
  };

  const setBreadcrumbPath = (items: BreadcrumbItem[]) => {
    setBreadcrumbs(items);
  };

  const clearBreadcrumbs = () => {
    setBreadcrumbs([]);
  };

  const goBack = () => {
    setBreadcrumbs(prev => prev.slice(0, -1));
  };

  return {
    breadcrumbs,
    addBreadcrumb,
    setBreadcrumbPath,
    clearBreadcrumbs,
    goBack
  };
}

// Common breadcrumb patterns for the application
export const createDashboardBreadcrumb = (): BreadcrumbItem => ({
  label: 'Dashboard',
  onClick: () => window.location.href = '#dashboard'
});

export const createTransactionsBreadcrumb = (): BreadcrumbItem => ({
  label: 'Transactions',
  onClick: () => window.location.href = '#transactions'
});

export const createClientsBreadcrumb = (): BreadcrumbItem => ({
  label: 'Clients',
  onClick: () => window.location.href = '#clients'
});

export const createClientDetailBreadcrumb = (clientName: string, clientId: string): BreadcrumbItem => ({
  label: clientName,
  onClick: () => window.location.href = `#clients/${clientId}`
});

export const createTransactionDetailBreadcrumb = (transactionId: string): BreadcrumbItem => ({
  label: `Transaction ${transactionId.slice(0, 8)}...`,
  current: true
});
