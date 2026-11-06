import React from 'react';

interface TrelloLogoProps {
  className?: string;
  variant?: 'blue' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const TrelloLogo: React.FC<TrelloLogoProps> = ({
  className = '',
  variant = 'blue',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const iconBg = variant === 'blue' ? 'fill-[#0052CC]' : 'fill-white';
  const barFill = variant === 'blue' ? 'fill-white' : 'fill-[#0052CC]';
  const textColor = variant === 'blue' ? 'text-[#172B4D]' : 'text-white';

  return (
    <div className={`flex items-center gap-2 font-bold tracking-tight select-none ${className}`}>
      {/* Authentic Trello Icon */}
      <svg
        className={iconSizes[size]}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="24" height="24" rx="4.5" className={iconBg} />
        {/* Left card bar (longer) */}
        <rect x="4.5" y="4.5" width="6.5" height="13" rx="1.5" className={barFill} />
        {/* Right card bar (shorter) */}
        <rect x="13" y="4.5" width="6.5" height="8.5" rx="1.5" className={barFill} />
      </svg>
      {showText && (
        <span className={`${textSizes[size]} font-bold tracking-tight font-sans ${textColor}`}>
          Trello
        </span>
      )}
    </div>
  );
};
