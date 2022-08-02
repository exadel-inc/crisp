import * as React from 'react';
import {useState} from 'react';
import './accordionComponent.scss';

export const AccordionComponent = ({name, children, additionalIcons}: { name: string; children?: any, additionalIcons?: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className={`accordionForm ${isOpen && 'accordionFormActive'}`}>
        {name}
        <div className='icons-section'>
          {additionalIcons}
          <svg onClick={() => setIsOpen(state => !state)} className='rotate-icon' width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.41 0L6 4.58L10.59 0L12 1.41L6 7.41L0 1.41L1.41 0Z" fill="white"/>
          </svg>
        </div>
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
