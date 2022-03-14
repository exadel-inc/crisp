import * as React from 'react';

export const SettingsIcon = ({className}: { className: string }) => {
  return (
    <svg className={`navigationIconSize ${className}`} viewBox="0 0 5 22" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path className="nav-svg" d="M0 22H4.125V18.3333H0V22ZM0 12.8333H4.125V9.16667H0V12.8333ZM0 0V3.66667H4.125V0H0Z"
      />
    </svg>);
};
