import * as React from 'react';
import './pill.scss';
import {useState} from 'react';

export const Pill = ({pageName ='string'}) => {
  const [isActive, setIsActive] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const changeActiveStatus = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    !isRemove ? <div onClick={changeActiveStatus} className={isActive ? 'pill active' : 'pill'}>
      <p>{pageName}</p>
      {
        isActive ?
          <svg viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.73333 7.06667L0.933333 4.26667L0 5.2L3.73333 8.93333L11.7333 0.933333L10.8 0L3.73333 7.06667Z"/>
          </svg>
          : <svg onClick={() => setIsRemove(true)} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.83429 4L8 7.16571V8H7.16571L4 4.83429L0.834286 8H0V7.16571L3.16571 4L0 0.834286V0H0.834286L4 3.16571L7.16571 0H8V0.834286L4.83429 4Z"/>
          </svg>}
    </div> : null);
};
