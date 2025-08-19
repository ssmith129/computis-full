import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet, Laptop, AlertTriangle, CheckCircle } from 'lucide-react';

interface LayoutTesterProps {
  children: React.ReactNode;
  showDebugMode?: boolean;
}

export default function LayoutTester({ children, showDebugMode = false }: LayoutTesterProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState('');
  const [layoutIssues, setLayoutIssues] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setCurrentBreakpoint('mobile');
      else if (width < 768) setCurrentBreakpoint('sm');
      else if (width < 1024) setCurrentBreakpoint('md');
      else if (width < 1280) setCurrentBreakpoint('lg');
      else setCurrentBreakpoint('xl');
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const validateLayout = () => {
    setIsValidating(true);
    const issues: string[] = [];

    // Check for layout issues
    const elements = document.querySelectorAll('*');
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      
      // Check for horizontal overflow
      if (rect.width > window.innerWidth) {
        issues.push(`Element ${el.tagName} causes horizontal overflow`);
      }
      
      // Check for small touch targets on mobile
      if (window.innerWidth < 768) {
        const isInteractive = el.matches('button, a, [role="button"], input, select, textarea');
        if (isInteractive && (rect.height < 44 || rect.width < 44)) {
          issues.push(`Touch target too small: ${el.tagName} (${Math.round(rect.width)}x${Math.round(rect.height)}px)`);
        }
      }
      
      // Check for inconsistent spacing
      const styles = window.getComputedStyle(el);
      const padding = styles.padding;
      if (padding && !padding.includes('var(--space-')) {
        // Only flag if it's not using design tokens and has custom padding
        const hasPadding = padding !== '0px';
        const hasCustomClass = el.className.includes('p-') && !el.className.includes('card-spacing') && !el.className.includes('btn-spacing');
        if (hasPadding && hasCustomClass) {
          issues.push(`Inconsistent padding on ${el.tagName}: ${padding}`);
        }
      }
    });

    setLayoutIssues(issues.slice(0, 10)); // Limit to 10 issues
    setIsValidating(false);
  };

  const getBreakpointIcon = () => {
    switch (currentBreakpoint) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'sm': return <Smartphone className="w-4 h-4" />;
      case 'md': return <Tablet className="w-4 h-4" />;
      case 'lg': return <Laptop className="w-4 h-4" />;
      case 'xl': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const breakpointNames = {
    mobile: 'Mobile (<640px)',
    sm: 'Small (640px+)',
    md: 'Medium (768px+)',
    lg: 'Large (1024px+)',
    xl: 'X-Large (1280px+)'
  };

  if (!showDebugMode) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Debug Controls */}
      <div className="fixed top-20 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 card-spacing-sm">
        <div className="space-y-3">
          {/* Current Breakpoint */}
          <div className="flex items-center gap-sm">
            {getBreakpointIcon()}
            <div>
              <div className="text-xs font-medium text-gray-900">
                {breakpointNames[currentBreakpoint as keyof typeof breakpointNames] || 'Unknown'}
              </div>
              <div className="text-xs text-gray-500">{window.innerWidth}px</div>
            </div>
          </div>

          {/* Validation Button */}
          <button
            onClick={validateLayout}
            disabled={isValidating}
            className="btn-spacing-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 text-xs font-medium w-full"
          >
            {isValidating ? 'Validating...' : 'Validate Layout'}
          </button>

          {/* Layout Issues */}
          {layoutIssues.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-micro text-red-600">
                <AlertTriangle className="w-3 h-3" />
                <span className="text-xs font-medium">{layoutIssues.length} Issues Found</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {layoutIssues.map((issue, index) => (
                  <div key={index} className="text-xs text-red-700 bg-red-50 list-item-spacing rounded">
                    {issue}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Good State */}
          {layoutIssues.length === 0 && !isValidating && (
            <div className="flex items-center gap-micro text-green-600">
              <CheckCircle className="w-3 h-3" />
              <span className="text-xs font-medium">Layout Validated</span>
            </div>
          )}

          {/* Debug Toggles */}
          <div className="pt-2 border-t border-gray-200 space-y-2">
            <div className="text-xs font-medium text-gray-700">Debug Mode</div>
            <div className="space-y-1">
              <label className="flex items-center gap-micro text-xs">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    document.body.classList.toggle('debug-grid', e.target.checked);
                  }}
                />
                Show Grid
              </label>
              <label className="flex items-center gap-micro text-xs">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    document.body.classList.toggle('validate-spacing', e.target.checked);
                  }}
                />
                Highlight Spacing Issues
              </label>
              <label className="flex items-center gap-micro text-xs">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    document.body.classList.toggle('validate-touch-targets', e.target.checked);
                  }}
                />
                Validate Touch Targets
              </label>
              <label className="flex items-center gap-micro text-xs">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={(e) => {
                    document.body.classList.toggle('responsive-test', e.target.checked);
                  }}
                />
                Show Breakpoint Info
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={showDebugMode ? 'layout-check' : ''}>
        {children}
      </div>
    </div>
  );
}

// Hook for using layout validation in components
export function useLayoutValidation() {
  const [isValid, setIsValid] = useState(true);
  const [issues, setIssues] = useState<string[]>([]);

  const validate = () => {
    const newIssues: string[] = [];
    
    // Add validation logic here
    const hasOverflow = document.body.scrollWidth > document.body.clientWidth;
    if (hasOverflow) {
      newIssues.push('Horizontal overflow detected');
    }

    setIssues(newIssues);
    setIsValid(newIssues.length === 0);
    
    return {
      isValid: newIssues.length === 0,
      issues: newIssues
    };
  };

  return { isValid, issues, validate };
}

// Component for inline layout validation
export function LayoutValidationBadge() {
  const { isValid, issues, validate } = useLayoutValidation();

  useEffect(() => {
    validate();
  }, []);

  if (isValid) {
    return (
      <div className="inline-flex items-center gap-micro btn-spacing-sm bg-green-100 text-green-800 rounded-full text-xs">
        <CheckCircle className="w-3 h-3" />
        Layout Valid
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-micro btn-spacing-sm bg-red-100 text-red-800 rounded-full text-xs">
      <AlertTriangle className="w-3 h-3" />
      {issues.length} Issue{issues.length !== 1 ? 's' : ''}
    </div>
  );
}
