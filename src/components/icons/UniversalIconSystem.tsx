import React from 'react';
import {
  Home,
  Search,
  Menu,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Plus,
  Download,
  Upload,
  Settings,
  Bell,
  User,
  X,
  CreditCard,
  Users,
  Wallet,
  BarChart,
  FileText,
  Cpu,
  MapPin,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Icon size mapping
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconState = 'default' | 'hover' | 'active' | 'disabled';

const iconSizes: Record<IconSize, string> = {
  xs: 'w-3 h-3',    // 12px
  sm: 'w-4 h-4',    // 16px
  md: 'w-5 h-5',    // 20px
  lg: 'w-6 h-6',    // 24px
  xl: 'w-8 h-8'     // 32px
};

const iconStates: Record<IconState, string> = {
  default: 'text-neutral-600',
  hover: 'text-primary-600 transform scale-105',
  active: 'text-primary-500',
  disabled: 'text-neutral-300 opacity-60 cursor-not-allowed'
};

interface IconProps {
  size?: IconSize;
  state?: IconState;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
  role?: string;
}

// Core Navigation Icons
export const NavigationIcons = {
  Home: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Home 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Search: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Search 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Menu: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Menu 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ArrowLeft: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ArrowLeft 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ArrowRight: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ArrowRight 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ArrowUp: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ArrowUp 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  MapPin: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <MapPin 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  )
};

// Action Icons
export const ActionIcons = {
  Plus: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Plus 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Download: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Download 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Upload: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Upload 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Settings: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Settings 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Bell: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Bell 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  User: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <User 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  X: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <X 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  )
};

// Content Icons
export const ContentIcons = {
  CreditCard: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <CreditCard 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Users: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Users 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Wallet: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Wallet 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  BarChart: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <BarChart 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  FileText: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <FileText 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  Cpu: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <Cpu 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  )
};

// Chevron Icons for navigation and disclosure
export const ChevronIcons = {
  ChevronDown: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ChevronDown 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ChevronUp: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ChevronUp 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ChevronLeft: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ChevronLeft 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  ),
  
  ChevronRight: ({ size = 'md', state = 'default', className = '', ...props }: IconProps) => (
    <ChevronRight 
      className={`${iconSizes[size]} ${iconStates[state]} transition-all duration-200 ${className}`}
      {...props}
    />
  )
};

// Universal Icon component that handles all states and accessibility
interface UniversalIconProps extends IconProps {
  name: string;
  interactive?: boolean;
  badge?: boolean;
  badgeCount?: number;
}

export function UniversalIcon({
  name,
  size = 'md',
  state = 'default',
  interactive = false,
  badge = false,
  badgeCount,
  className = '',
  ...props
}: UniversalIconProps) {
  // Map icon names to components
  const iconMap: Record<string, React.ComponentType<IconProps>> = {
    // Navigation
    'home': NavigationIcons.Home,
    'search': NavigationIcons.Search,
    'menu': NavigationIcons.Menu,
    'arrow-left': NavigationIcons.ArrowLeft,
    'arrow-right': NavigationIcons.ArrowRight,
    'arrow-up': NavigationIcons.ArrowUp,
    'map-pin': NavigationIcons.MapPin,
    
    // Actions
    'plus': ActionIcons.Plus,
    'download': ActionIcons.Download,
    'upload': ActionIcons.Upload,
    'settings': ActionIcons.Settings,
    'bell': ActionIcons.Bell,
    'user': ActionIcons.User,
    'x': ActionIcons.X,
    
    // Content
    'credit-card': ContentIcons.CreditCard,
    'users': ContentIcons.Users,
    'wallet': ContentIcons.Wallet,
    'bar-chart': ContentIcons.BarChart,
    'file-text': ContentIcons.FileText,
    'cpu': ContentIcons.Cpu,
    
    // Chevrons
    'chevron-down': ChevronIcons.ChevronDown,
    'chevron-up': ChevronIcons.ChevronUp,
    'chevron-left': ChevronIcons.ChevronLeft,
    'chevron-right': ChevronIcons.ChevronRight
  };

  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in UniversalIcon system`);
    return null;
  }

  const iconElement = (
    <IconComponent
      size={size}
      state={state}
      className={`${interactive ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    />
  );

  // Add badge if needed
  if (badge) {
    return (
      <div className="relative inline-flex">
        {iconElement}
        {badgeCount !== undefined && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
        {badge && badgeCount === undefined && (
          <span className="absolute -top-1 -right-1 bg-error-500 rounded-full h-2 w-2"></span>
        )}
      </div>
    );
  }

  return iconElement;
}

// Icon button component that combines icon with proper button semantics
interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: string;
  iconSize?: IconSize;
  variant?: 'default' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  badge?: boolean;
  badgeCount?: number;
  'aria-label': string; // Required for accessibility
}

export function IconButton({
  icon,
  iconSize = 'md',
  variant = 'default',
  size = 'md',
  badge = false,
  badgeCount,
  className = '',
  disabled = false,
  ...props
}: IconButtonProps) {
  const buttonSizes = {
    sm: 'min-h-[44px] min-w-[44px] p-2',
    md: 'min-h-[48px] min-w-[48px] p-3',
    lg: 'min-h-[56px] min-w-[56px] p-4'
  };

  const buttonVariants = {
    default: 'bg-white border border-neutral-300 hover:bg-neutral-50 text-neutral-700',
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-neutral-500 hover:bg-neutral-600 text-white',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-600'
  };

  const iconState: IconState = disabled ? 'disabled' : 'default';

  return (
    <button
      className={`
        ${buttonSizes[size]}
        ${buttonVariants[variant]}
        rounded-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      <UniversalIcon
        name={icon}
        size={iconSize}
        state={iconState}
        badge={badge}
        badgeCount={badgeCount}
        aria-hidden="true"
      />
    </button>
  );
}

// Usage examples and documentation
export const IconSystemExamples = {
  // Basic icons
  basicUsage: (
    <div className="space-x-4">
      <UniversalIcon name="home" />
      <UniversalIcon name="search" size="lg" />
      <UniversalIcon name="bell" badge badgeCount={3} />
    </div>
  ),

  // Interactive icons
  interactiveUsage: (
    <div className="space-x-4">
      <UniversalIcon name="settings" interactive state="hover" />
      <UniversalIcon name="user" interactive state="active" />
    </div>
  ),

  // Icon buttons
  buttonUsage: (
    <div className="space-x-4">
      <IconButton icon="plus" aria-label="Add new item" />
      <IconButton icon="bell" variant="primary" badge badgeCount={5} aria-label="Notifications" />
      <IconButton icon="settings" variant="ghost" aria-label="Settings" />
    </div>
  ),

  // Different sizes
  sizesUsage: (
    <div className="flex items-center space-x-4">
      <UniversalIcon name="home" size="xs" />
      <UniversalIcon name="home" size="sm" />
      <UniversalIcon name="home" size="md" />
      <UniversalIcon name="home" size="lg" />
      <UniversalIcon name="home" size="xl" />
    </div>
  )
};

// Export all icons for convenient access
export const Icons = {
  ...NavigationIcons,
  ...ActionIcons,
  ...ContentIcons,
  ...ChevronIcons
};

export default UniversalIcon;
