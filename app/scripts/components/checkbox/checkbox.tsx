import React, {useState} from 'react';
import {DEFAULT_SELECT_COUNT, MAIN_CHECKBOX_LABEL} from '../../constants/constants';
import './chechbox.scss';

export const Checkbox = ({checkedValue = false, count = DEFAULT_SELECT_COUNT, clickHandler = (...arg: any) => {}}) => {
  const [checked, setChecked] = useState(checkedValue);

  return (
    <div className='checkBoxWrapper' onClick={(e: any) => {
      setChecked(prevState => !prevState);
      clickHandler(e, checked);
    }}>
      {count ? `${MAIN_CHECKBOX_LABEL} ${count}`: ''}
      {checked ?
        <div className='checkboxSquare checked'>
          <svg viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.01493 9.49254L1.25373 5.73134L0 6.98507L5.01493 12L15.7612 1.25373L14.5075 0L5.01493 9.49254Z"/>
          </svg>
        </div>
        : <div className='checkboxSquare'/>
      }
    </div>
  );
};
