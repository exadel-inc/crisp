import * as React from 'react';
import {useState} from 'react';
import {Expander} from '../expander/expander';
import {OpenTableElement} from '../openTableElemet/openTableElement';
import {Button} from '../button/button';
import {TABLE_BUTTON_NAME} from '../../constants/constants';
import {DeleteComponent} from '../deletComponent/deleteComponent';
import './tableElement.scss';

export const TableElement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {DELETE, EDIT, INSERT} = TABLE_BUTTON_NAME;

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
          {isOpen ? <>
            <Button buttonName={EDIT} action={() => {
            }} iconClass='tableEditButton'/>
            <Button buttonName={INSERT} action={() => {
            }} iconClass='tableInsertButton'/>
            <Button buttonName={DELETE} action={() => {
            }} iconClass='tableDeleteButton'/>
          </> : <>
            <p>avt</p>
            <p>not displayed</p>
            <DeleteComponent style='tableDeleteIcon'/>
          </>
          }
          <Expander isOpen={isOpen} changeState={changeState}/>
        </div>
      </div>
      {isOpen ? <OpenTableElement isOpen={isOpen}/> : null}
    </div>
  );
};
