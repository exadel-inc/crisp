import * as React from 'react';
import './pill.scss';
import {useState} from 'react';
import {CheckedIcon} from '../checkedIcon/checkedIcon';
import {CloseIcon} from '../closeIcon/closeIcon';
import {DEFAULT_PROJECT_PAGE_NAME} from '../../constants/constants';

export const Pill = ({pageName = DEFAULT_PROJECT_PAGE_NAME}) => {
  const [isActive, setIsActive] = useState(false);
  const [isRemove, setIsRemove] = useState(false);

  const changeActiveStatus = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    !isRemove ?
      <div onClick={changeActiveStatus} className={isActive ? 'pill active' : 'pill'}>
        <p>{pageName}</p>
        {isActive ? <CheckedIcon/> : <CloseIcon setIsRemove={setIsRemove}/>}
      </div>
      : null);
};
