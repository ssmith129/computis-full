import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Copy, Eye, Download, Share, Archive } from 'lucide-react';

interface ActionMenuProps {
  actions: Array<{
    label: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
    variant?: 'default' | 'danger' | 'success';
    disabled?: boolean;
  }>;
  position?: 'left' | 'right';
}

export default function ActionMenu({ actions, position = 'right' }: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getActionClass = (variant?: string) => {
    switch (variant) {
      case 'danger':
        return 'text-red-600 hover:bg-red-50 hover:text-red-700';
      case 'success':
        return 'text-green-600 hover:bg-green-50 hover:text-green-700';
      default:
        return 'text-gray-700 hover:bg-gray-50 hover:text-gray-900';
    }
  };

  return (
    <div className="relative">
      <button
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className={`
            absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-20 animate-bounce-in
            ${position === 'left' ? 'right-0' : 'left-0'}
          `}>
            {actions.map((action, index) => (
              <button
                key={index}
                disabled={action.disabled}
                className={`
                  w-full flex items-center px-4 py-3 text-sm transition-all duration-200 font-sans
                  ${getActionClass(action.variant)}
                  ${action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                `}
                onClick={() => {
                  if (!action.disabled) {
                    action.onClick();
                    setIsOpen(false);
                  }
                }}
              >
                <action.icon className="w-4 h-4 mr-3" />
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}