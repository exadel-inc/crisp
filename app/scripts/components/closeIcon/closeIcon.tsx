import * as React from 'react';

export const CloseIcon = ({setIsRemove}: { setIsRemove: any }) => {
  return (
    <svg onClick={setIsRemove} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.83429 4L8 7.16571V8H7.16571L4 4.83429L0.834286 8H0V7.16571L3.16571 4L0 0.834286V0H0.834286L4 3.16571L7.16571 0H8V0.834286L4.83429 4Z"/>
    </svg>
  );
};
