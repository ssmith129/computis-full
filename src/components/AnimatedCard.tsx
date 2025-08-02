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
        bg-white rounded-lg border border-gray-200 transition-all duration-200
        ${hover ? 'hover:shadow-md' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${isHovered ? 'shadow-lg' : 'shadow-sm'}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="transition-all duration-200">
        {children}
      </div>
    </div>
  );
}