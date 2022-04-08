import * as React from 'react';
import {useState} from 'react';
import './pageHeaderExpander.scss';

export const PageHeaderExpander = () => {
  const [isOpen, setIsOpen] = useState(false);

  const switcher = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div onClick={switcher} className='expanderWrapper'>
      <svg className={`defaultIconFill ${isOpen && 'rotatedExpander'}`} viewBox="0 0 8 6"
           fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0.94 0.393311L4 3.44664L7.06 0.393311L8 1.33331L4 5.33331L0 1.33331L0.94 0.393311Z"/>
      </svg>
    </div>
  );
};
