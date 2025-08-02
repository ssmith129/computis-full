import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface FloatingAction {
  label: string;
  icon: React.ComponentType<any>;
  onClick: () => void;
  color?: string;
}

interface FloatingActionButtonProps {
  actions: FloatingAction[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
}

export default function FloatingActionButton({ 
  actions, 
  position = 'bottom-right',
  size = 'md'
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4'
  };

  const sizeClasses = {
    sm: { main: 'w-10 h-10', action: 'w-8 h-8', icon: 'w-4 h-4', offset: 50 },
    md: { main: 'w-12 h-12', action: 'w-10 h-10', icon: 'w-5 h-5', offset: 60 },
    lg: { main: 'w-16 h-16', action: 'w-12 h-12', icon: 'w-6 h-6', offset: 70 }
  };

  const getActionPosition = (index: number) => {
    const offset = (index + 1) * sizeClasses[size].offset;
    switch (position) {
      case 'bottom-right':
      case 'bottom-left':
        return { bottom: `${offset}px` };
      case 'top-right':
      case 'top-left':
        return { top: `${offset}px` };
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Action Buttons */}
      {isOpen && actions.map((action, index) => (
        <div
          key={index}
          className="absolute"
          style={getActionPosition(index)}
        >
          <div className="flex items-center space-x-2 mb-2">
            {(position.includes('right')) && (
              <span className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap font-sans">
                {action.label}
              </span>
            )}
            <button
              className={`
                ${sizeClasses[size].action} rounded-full shadow-md transition-all duration-200 hover:scale-105
                ${action.color || 'bg-blue-600 hover:bg-blue-700'} text-white
              `}
              onClick={action.onClick}
            >
              <action.icon className={`${sizeClasses[size].icon} mx-auto`} />
            </button>
            {(position.includes('left')) && (
              <span className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap font-sans">
                {action.label}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Main FAB */}
      <button
        className={`
          ${sizeClasses[size].main} bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full shadow-lg 
          transition-all duration-200 hover:scale-105
          ${isOpen ? 'rotate-45' : ''}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className={`${sizeClasses[size].icon} mx-auto transition-transform duration-200`} />
        ) : (
          <Plus className={`${sizeClasses[size].icon} mx-auto transition-transform duration-200`} />
        )}
      </button>
    </div>
  );
}