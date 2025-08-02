import React from 'react';
import { CheckCircle, AlertTriangle, HelpCircle, Clock } from 'lucide-react';

interface BadgeProps {
  variant: 'high' | 'medium' | 'low' | 'pending' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  tooltip?: string;
  showIcon?: boolean;
}

export default function Badge({ variant, children, tooltip, showIcon = false }: BadgeProps) {
  const variants = {
    high: {
      className: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    medium: {
      className: 'bg-yellow-100 text-yellow-800',
      icon: AlertTriangle
    },
    low: {
      className: 'bg-red-100 text-red-800',
      icon: HelpCircle
    },
    pending: {
      className: 'bg-gray-100 text-gray-800',
      icon: Clock
    },
    success: {
      className: 'bg-green-100 text-green-800',
      icon: CheckCircle
    },
    warning: {
      className: 'bg-yellow-100 text-yellow-800',
      icon: AlertTriangle
    },
    error: {
      className: 'bg-red-100 text-red-800',
      icon: HelpCircle
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-sans hover:scale-105 transition-transform duration-200 ${config.className}`}
      title={tooltip}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {children}
    </span>
  );
}