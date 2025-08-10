import React, { useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InteractiveButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  alwaysActive?: boolean;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
}

export default function InteractiveButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  alwaysActive = false,
  className = '',
  onClick,
  tooltip
}: InteractiveButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Override disabled state when alwaysActive is true
  const isDisabled = alwaysActive ? false : (disabled || loading);
  const variants = {
    primary: `bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-lg hover:shadow-xl ${alwaysActive ? 'ring-2 ring-yellow-300 ring-opacity-50' : ''}`,
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm hover:shadow-md',
    success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
    warning: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const handleClick = () => {
    if (!isDisabled && onClick) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);
      try {
        onClick();
      } catch (error) {
        console.error('Button click handler error:', error);
        setIsPressed(false);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <button
        className={`
          font-semibold rounded-md transition-all duration-150 transform !font-semibold
          ${variants[variant]}
          ${sizes[size]}
          ${isPressed ? 'scale-98' : 'hover:scale-102'}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${alwaysActive ? 'animate-pulse-glow' : ''}
          ${className}
        `}
        disabled={isDisabled}
        aria-label={alwaysActive ? `${children} - Always available` : children?.toString()}
        aria-pressed={isPressed}
        onMouseEnter={() => tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            handleClick();
          }
        }}
        onFocus={() => {
          // Announce button state to screen readers
          if (alwaysActive) {
            const announcement = `${children} button, always available`;
            // In a real app, you might use a live region for announcements
          }
        }}
        onClick={handleClick}
      >
        <div className="flex items-center justify-center space-x-2">
          {loading ? (
            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : Icon ? (
            <Icon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} transition-transform duration-150 ${isPressed ? 'scale-95' : ''} ${alwaysActive ? 'animate-bounce' : ''}`} />
          ) : null}
          <span className={`transition-transform duration-150 ${isPressed ? 'scale-98' : ''}`}>
            {children}
          </span>
        </div>
      </button>
      
    </div>
  );
}