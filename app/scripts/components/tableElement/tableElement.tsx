import * as React from 'react';
import {useState} from 'react';
import {Expander} from '../expander/expander';
import {OpenTableElement} from '../openTableElemet/openTableElement';
import './tableElement.scss';

export const TableElement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const changeState = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <div className='tableElementWrapper'>
      <div className={`tableElement ${isOpen && 'openTable'}`}>
        <div className='coloredPart'>
          <svg viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 16H3V13.3333H0V16ZM0 9.33333H3V6.66667H0V9.33333ZM0 0V2.66667H3V0H0Z"/>
          </svg>
        </div>
        <div className='infoSection'>
          <p>avt</p>
          <p>not displayed</p>
          <Expander isOpen={isOpen} changeState={changeState}/>
        </div>
      </div>
      {isOpen ? <OpenTableElement isOpen={isOpen}/> : null}
    </div>
  );
};
