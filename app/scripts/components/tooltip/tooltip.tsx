import * as React from 'react';
import './tooltip.scss';

interface TooltipProps {
  children: React.ReactNode;
  position: 'top-left' | 'top' | 'top-right' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right' | 'left';
  text: string;
  tooltipStyle?: object;
};

/**
 * Tooltip Component
 */
export function Tooltip ({ position, text, tooltipStyle, children }: TooltipProps) {

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className='tooltipWrapper'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div
          className={`tooltipBox position-${position}`}
          style={tooltipStyle}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
};
