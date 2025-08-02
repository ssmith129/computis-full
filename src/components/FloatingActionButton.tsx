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
}

export default function FloatingActionButton({ 
  actions, 
  position = 'bottom-right' 
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8'
  };

  const getActionPosition = (index: number) => {
    const offset = (index + 1) * 70;
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
          className="absolute animate-bounce-in"
          style={getActionPosition(index)}
        >
          <div className="flex items-center space-x-3 mb-3">
            {(position.includes('right')) && (
              <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap animate-slide-in-right font-sans">
                {action.label}
              </span>
            )}
            <button
              className={`
                w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl
                ${action.color || 'bg-blue-600 hover:bg-blue-700'} text-white
                animate-float
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <action.icon className="w-6 h-6 mx-auto" />
            </button>
            {(position.includes('left')) && (
              <span className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap animate-slide-in-right font-sans">
                {action.label}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Main FAB */}
      <button
        className={`
          w-16 h-16 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full shadow-xl 
          transition-all duration-300 hover:scale-110 hover:shadow-2xl
          ${isOpen ? 'rotate-45' : 'hover:rotate-12'}
          animate-pulse-glow
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-8 h-8 mx-auto transition-transform duration-300" />
        ) : (
          <Plus className="w-8 h-8 mx-auto transition-transform duration-300" />
        )}
      </button>
    </div>
  );
}