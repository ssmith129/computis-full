import React from 'react';
import { CheckCircle, Clock, AlertTriangle, XCircle, Loader } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'pending' | 'warning' | 'error' | 'loading';
  label: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusIndicator({ 
  status, 
  label, 
  animated = true, 
  size = 'md' 
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          className: 'bg-green-100 text-green-800 border-green-200',
          iconClass: 'text-green-600',
          animation: ''
        };
      case 'pending':
        return {
          icon: Clock,
          className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          iconClass: 'text-yellow-600',
          animation: ''
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          className: 'bg-orange-100 text-orange-800 border-orange-200',
          iconClass: 'text-orange-600',
          animation: ''
        };
      case 'error':
        return {
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200',
          iconClass: 'text-red-600',
          animation: ''
        };
      case 'loading':
        return {
          icon: Loader,
          className: 'bg-blue-100 text-blue-800 border-blue-200',
          iconClass: 'text-blue-600',
          animation: 'animate-spin'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium border transition-all duration-150
      ${config.className}
      ${sizeClasses[size]}
      ${config.animation}
    `}>
      <Icon className={`${iconSizes[size]} mr-1 ${config.iconClass} ${config.animation}`} />
      {label}
    </span>
  );
}