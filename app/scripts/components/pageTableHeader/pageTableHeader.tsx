import * as React from 'react';
import {PAGE_TABLE_HEADER_COLUMN} from '../../constants/constants';
import './pageTableHeader.scss';


export const PageTableHeader = () => {
  const {ELEMENT, PATTERN, PARAMETER, ACTIONS} = PAGE_TABLE_HEADER_COLUMN;

  return (
    <div className='pageTableHeader'>
      <p>{ELEMENT}</p>
      <p>{PATTERN}</p>
      <p>{PARAMETER}</p>
      <p>{ACTIONS}</p>
      <div>
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.94 0.393311L4 3.44664L7.06 0.393311L8 1.33331L4 5.33331L0 1.33331L0.94 0.393311Z" fill="#C9C9C9"/>
        </svg>
      </div>
    </div>
  );
};
