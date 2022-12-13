import * as React from 'react';
import {NavigationTabType} from '../header/navigationTypes';
import {useDispatch} from 'react-redux';
import {NavigateAction} from '../../redux/reducers/navigation/navigation.actions';
import './logoComponent.scss';

export const LogoComponent = () => {
  const dispatch = useDispatch();

  const handleTabClick = (tab: NavigationTabType) => {
    dispatch({...new NavigateAction(tab)});
  };

  return (
    <div onClick={() => handleTabClick(NavigationTabType.MAIN)}
      className="logo">
      <span className='firstPart'>Cri</span>
      <span className='lastPart'>sp</span>
    </div>
  );
};
