import React from 'react';

export const Expander = ({isOpen, changeState}: { isOpen: boolean; changeState: () => {} }) => {
  return (
    isOpen ? <svg onClick={changeState} className='defaultIconFill navigationIconSize hoverIconFill' viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
        <path d="M10.59 7.99994L6 3.41994L1.41 7.99994L1.23266e-07 6.58994L6 0.589939L12 6.58994L10.59 7.99994Z"/>
      </svg>
      : <svg onClick={changeState} className='defaultIconFill navigationIconSize hoverIconFill' viewBox="0 0 12 8"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
        <path d="M1.41 0.589966L6 5.16997L10.59 0.589966L12 1.99997L6 7.99997L0 1.99997L1.41 0.589966Z"/>
      </svg>
  );
};
