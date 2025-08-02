import React, { useState } from 'react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  float?: boolean;
  onClick?: () => void;
}

export default function AnimatedCard({
  children,
  className = '',
  hover = true,
  glow = false,
  float = false,
  onClick
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-200 transition-all duration-300
        ${hover ? 'hover:shadow-xl hover:scale-105 hover:-translate-y-1' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${float ? 'animate-float' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${isHovered ? 'shadow-2xl' : 'shadow-sm'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        {children}
      </div>
    </div>
  );
}